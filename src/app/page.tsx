'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Header } from '../components/Header';
import { AudioPlayer } from '../components/AudioPlayer';
import { HistoryList } from '../components/HistoryList';
import { SUPPORTED_VOICES, DEFAULT_VOICE_ID, getVoiceById } from '../lib/tts/voices';
import { detectLanguage, DetectedLanguage } from '../lib/textProcessor';
import { loadHistory, saveHistoryItem, deleteHistoryItem, clearAllHistory, HistoryItem } from '../lib/storage';
import { VoiceOption } from '../lib/tts/types';
import {
  Volume2,
  Mic,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  SlidersHorizontal,
  AlertCircle,
  FileText,
  Trash2,
  ClipboardPaste,
  Radio,
  Play,
  Pause,
  BookOpen,
  Headphones,
  CheckCircle2,
  User,
  Users,
  Zap,
  Cpu,
  Code2,
} from 'lucide-react';

// Samples
const SAMPLE_PRADEEP_STORY = `ঝড় থেমে গেছে। চারপাশ নিস্তব্ধ। কিন্তু বুকের ভেতর জমে থাকা না-বলা কথাগুলো যেন আজও এক শান্ত নদীর মতো বয়ে চলেছে। মানুষের আসল শক্তি তার নীরব ধৈর্যে। জীবনের কঠিন সময়ে যিনি শান্ত থাকতে পারেন, শেষ বিজয় তারই হয়।`;

const SAMPLE_STORY = `শেষ ভরসা। সেদিন একটা স্কুল বাসের ব্রেক কাজ করা বন্ধ করে দিয়েছিল। বাসের ভেতরে তখন ১৫টি শিশু। বাইরে প্রচণ্ড বৃষ্টি, কেউ এগিয়ে আসার সাহস পাচ্ছিল না। ঠিক তখনই এগিয়ে এলো আশা। পেশায় সে একজন তরুণী মেকানিক। কিন্তু বাসচালক তাকে দেখে বলল, তুমি পারবে তো? এত বড় বাস ঠিক করা কি তোমার কাজ? আশা কোনো উত্তর দিল না। সে দ্রুত বাসের নিচে গিয়ে পরীক্ষা শুরু করল। মানুষের কাছে নিজের পরিচয় মুখে বলতে হয় না, নিজের কাজই একদিন পরিচয় তৈরি করে দেয়।`;

const SAMPLE_FEMALE = `নমস্কার। আমি নবনিতা। আমার কণ্ঠ সম্পূর্ণ প্রাকৃতিক, মিষ্টি এবং বাস্তবসম্মত মানুষের মতো বাচনভঙ্গিতে সাজানো। যেকোনো ভিডিও, অডিওবুক বা উপস্থাপনার জন্য এই কণ্ঠ আপনার লেখার প্রাণবন্ত ভাব বজায় রাখবে।`;

const SAMPLE_DARIO = `Welcome to the Cartesia Sonic playground. I am Darío, a steady and articulate voice operator designed for ultra-low latency, studio-quality speech generation.`;

const SAMPLE_SARAH = `Hello there! I am Sarah, a friendly conversational voice from the Cartesia Sonic model library, ready to assist you.`;

const SAMPLE_BARBERSHOP = `Gather around. Every great story begins with a single step into the unknown. Let me tell you about what happened that evening.`;

const SAMPLE_BANGLA = `আজকের দিনে কৃত্রিম বুদ্ধিমত্তা আমাদের ভাষাকে নতুন মাত্রা দিয়েছে। আপনি চাইলে সহজেই যেকোনো বাংলা লেখা থেকে স্টুডিও মানের স্পষ্ট ও প্রাকৃতিক ভয়েস তৈরি করতে পারেন। ২০২৬ সালের এই নতুন প্রযুক্তি আপনার কনটেন্টকে আরও আকর্ষণীয় করবে।`;

const SAMPLE_ENGLISH = `Artificial intelligence is transforming how we communicate across borders and languages. With cutting-edge neural voice synthesis, you can generate crystal-clear, studio-quality speech for your videos, podcasts, and digital content effortlessly.`;

const MAX_CHARS = 3000;

export default function Home() {
  const [text, setText] = useState(SAMPLE_PRADEEP_STORY);
  const [selectedVoiceId, setSelectedVoiceId] = useState('bn-BD-PradeepStoryNeural');
  
  // Human Realism parameters: deep storytelling default (speed=0.90x / -10%, volume=1.0, pitch=-5Hz)
  const [selectedModel, setSelectedModel] = useState<'sonic-3.5' | 'sonic-multilingual' | 'azure-neural'>('sonic-3.5');
  const [speed, setSpeed] = useState(0.90);
  const [volume, setVolume] = useState(1.0);
  const [pitch, setPitch] = useState(-5);
  
  const [detectedLang, setDetectedLang] = useState<DetectedLanguage>('bn');
  
  // Filters: Gender ('all' | 'male' | 'female') & Category/Lang ('all' | 'bn' | 'en' | 'cartesia')
  const [genderFilter, setGenderFilter] = useState<'all' | 'male' | 'female'>('all');
  const [languageFilter, setLanguageFilter] = useState<'all' | 'bn' | 'en' | 'cartesia'>('all');
  
  // UI states
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showCodeSnippet, setShowCodeSnippet] = useState(false);
  
  // Audio state
  const [currentAudioUrl, setCurrentAudioUrl] = useState<string | null>(null);
  const [currentTextSnippet, setCurrentTextSnippet] = useState<string>('');
  const [history, setHistory] = useState<HistoryItem[]>([]);

  // Voice Preview state
  const [previewVoiceId, setPreviewVoiceId] = useState<string | null>(null);
  const [previewLoadingId, setPreviewLoadingId] = useState<string | null>(null);
  const previewAudioRef = useRef<HTMLAudioElement | null>(null);

  // Load history from localStorage on mount
  useEffect(() => {
    setHistory(loadHistory());
  }, []);

  // Update language detection when text changes
  useEffect(() => {
    if (!text.trim()) {
      setDetectedLang('unknown');
      return;
    }
    const detected = detectLanguage(text);
    setDetectedLang(detected);
  }, [text]);

  // Keyboard shortcut Ctrl/Cmd + Enter to generate
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        handleGenerateSpeech();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [text, selectedVoiceId, speed, pitch, volume, isLoading]);

  const selectedVoice = getVoiceById(selectedVoiceId);

  // Filter voices based on Gender & Language/Cartesia tabs
  const filteredVoices = SUPPORTED_VOICES.filter((voice) => {
    if (genderFilter !== 'all' && voice.gender !== genderFilter) return false;
    if (languageFilter === 'bn' && !voice.locale.startsWith('bn-')) return false;
    if (languageFilter === 'en' && !voice.locale.startsWith('en-')) return false;
    if (
      languageFilter === 'cartesia' &&
      !voice.languageLabel?.includes('Cartesia') &&
      !voice.badge?.includes('Sonic') &&
      !voice.badge?.includes('Cartesia')
    ) {
      return false;
    }
    return true;
  });

  const handlePreviewVoice = async (voice: VoiceOption, e: React.MouseEvent) => {
    e.stopPropagation();

    if (previewVoiceId === voice.id && previewAudioRef.current && !previewAudioRef.current.paused) {
      previewAudioRef.current.pause();
      setPreviewVoiceId(null);
      return;
    }

    if (voice.demoAudioUrl) {
      if (!previewAudioRef.current) {
        previewAudioRef.current = new Audio();
      }
      previewAudioRef.current.src = voice.demoAudioUrl;
      previewAudioRef.current.onended = () => setPreviewVoiceId(null);
      await previewAudioRef.current.play();
      setPreviewVoiceId(voice.id);
      return;
    }

    setPreviewLoadingId(voice.id);
    try {
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: voice.sampleText,
          voiceId: voice.id,
          rate: speed,
          pitch,
          volume,
        }),
      });

      if (!res.ok) throw new Error('Preview failed');
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);

      if (!previewAudioRef.current) {
        previewAudioRef.current = new Audio();
      }

      previewAudioRef.current.src = url;
      previewAudioRef.current.onended = () => {
        setPreviewVoiceId(null);
      };
      await previewAudioRef.current.play();
      setPreviewVoiceId(voice.id);
    } catch (err) {
      console.warn('Voice preview error:', err);
    } finally {
      setPreviewLoadingId(null);
    }
  };

  const handleGenerateSpeech = async () => {
    const trimmed = text.trim();
    if (!trimmed) {
      setError('অনুগ্রহ করে কিছু টেক্সট লিখুন বা পেস্ট করুন (Please enter some text).');
      return;
    }

    if (trimmed.length > MAX_CHARS) {
      setError(`টেক্সট ${MAX_CHARS} অক্ষরের বেশি হতে পারবে না (Exceeds character limit).`);
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: trimmed,
          voiceId: selectedVoiceId,
          rate: speed,
          pitch,
          volume,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Error ${response.status}: Failed to synthesize speech.`);
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        const base64data = reader.result as string;
        const updated = saveHistoryItem({
          text: trimmed.slice(0, 120),
          voiceId: selectedVoice.id,
          voiceName: selectedVoice.name,
          language: detectedLang,
          audioBase64: base64data,
        });
        setHistory(updated);
      };

      setCurrentAudioUrl(url);
      setCurrentTextSnippet(trimmed);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'অডিও তৈরি করতে সমস্যা হয়েছে।';
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaste = async () => {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.readText) {
        const clipText = await navigator.clipboard.readText();
        if (clipText) setText(clipText);
      }
    } catch (err) {
      console.warn('Could not read clipboard', err);
    }
  };

  const handleCopy = async () => {
    if (!text) return;
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      console.warn('Could not write to clipboard', err);
    }
  };

  const handleClear = () => {
    setText('');
    setError(null);
  };

  const handleSelectHistoryItem = (item: HistoryItem) => {
    setCurrentAudioUrl(item.audioBase64);
    setCurrentTextSnippet(item.text);
    setSelectedVoiceId(item.voiceId);
  };

  const handleDeleteHistory = (id: string) => {
    const updated = deleteHistoryItem(id);
    setHistory(updated);
  };

  const handleClearAllHistory = () => {
    clearAllHistory();
    setHistory([]);
  };

  return (
    <div className="min-h-screen bg-[#090b10] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-300">
      <Header />

      {/* Cartesia Studio Top Control Strip */}
      <div className="border-b border-slate-800/60 bg-slate-900/40 px-4 py-2.5 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Active Model Indicator */}
          <div className="flex items-center gap-2">
            <span className="text-slate-400">Model:</span>
            <div className="inline-flex items-center gap-1.5 rounded-lg border border-cyan-500/30 bg-cyan-950/40 px-2.5 py-1 text-xs font-semibold text-cyan-300">
              <Zap className="h-3 w-3 text-cyan-400" />
              <span>{selectedModel}</span>
              <span className="text-[10px] text-cyan-400/70 font-mono">(Sonic 3.5)</span>
            </div>
          </div>

          {/* Active Voice Tag */}
          <div className="flex items-center gap-2">
            <span className="text-slate-400">Voice:</span>
            <span className="rounded-lg border border-slate-800 bg-slate-950/80 px-2.5 py-1 font-semibold text-slate-200 flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span>{selectedVoice.name}</span>
              <span className="text-[10px] text-slate-500 font-mono">({selectedVoice.locale})</span>
            </span>
          </div>

          {/* Parameters badge */}
          <div className="flex items-center gap-3 font-mono text-[11px] text-slate-400">
            <span>Speed: <strong className="text-emerald-400">{speed.toFixed(2)}x</strong></span>
            <span>Volume: <strong className="text-cyan-400">{volume.toFixed(1)}</strong></span>
            <button
              onClick={() => setShowCodeSnippet(!showCodeSnippet)}
              className="flex items-center gap-1 rounded-lg border border-slate-800 bg-slate-900 px-2 py-1 text-slate-300 hover:text-white transition-colors"
            >
              <Code2 className="h-3 w-3 text-cyan-400" />
              <span>{showCodeSnippet ? 'Hide Code' : 'API Code'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Code Snippet Drawer */}
      {showCodeSnippet && (
        <div className="border-b border-cyan-500/20 bg-slate-950/90 p-4">
          <div className="mx-auto max-w-7xl font-mono text-xs space-y-2">
            <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-1">
              <span>Cartesia Sonic API / cURL Implementation</span>
              <button onClick={() => setShowCodeSnippet(false)} className="text-rose-400">✕ Close</button>
            </div>
            <pre className="overflow-x-auto rounded-lg bg-slate-900 p-3 text-cyan-300">
{`curl -X POST "http://localhost:3000/api/tts" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model_id": "${selectedModel}",
    "voiceId": "${selectedVoiceId}",
    "rate": ${speed},
    "volume": ${volume},
    "text": "${text.replace(/"/g, '\\"').slice(0, 60)}..."
  }' --output speech.mp3`}
            </pre>
          </div>
        </div>
      )}

      <main className="mx-auto max-w-7xl w-full px-4 py-6 sm:px-6 flex-1 space-y-6">
        {/* Error banner */}
        {error && (
          <div className="flex items-center gap-3 rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-rose-300 text-sm animate-shake">
            <AlertCircle className="h-5 w-5 flex-shrink-0 text-rose-400" />
            <p className="flex-1 font-medium">{error}</p>
            <button
              onClick={() => setError(null)}
              className="text-xs text-rose-400 hover:text-white"
            >
              ✕ বন্ধ করুন
            </button>
          </div>
        )}

        {/* Main Cartesia Workspace: Left Text Editor | Right Voice & Settings Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Script / Text Area & Integrated Player (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="rounded-2xl border border-slate-800/90 bg-[#0e111a] p-5 shadow-2xl backdrop-blur-sm space-y-3">
              {/* Textarea Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-cyan-400" />
                  <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Text to Speech Script
                  </span>
                  
                  {/* Language Detection Badge */}
                  {detectedLang !== 'unknown' && (
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold border ${
                        detectedLang === 'bn'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                          : detectedLang === 'en'
                          ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30'
                          : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                      }`}
                    >
                      {detectedLang === 'bn' && '🇧🇩 বাংলা'}
                      {detectedLang === 'en' && '🇺🇸 English'}
                      {detectedLang === 'mixed' && '🌐 Mixed (Bangla + English)'}
                    </span>
                  )}
                </div>

                {/* Quick actions: Paste, Copy, Clear */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={handlePaste}
                    className="flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-colors"
                    title="Paste from clipboard"
                  >
                    <ClipboardPaste className="h-3.5 w-3.5" />
                    <span>পেস্ট</span>
                  </button>

                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-colors"
                    title="Copy text"
                  >
                    {copied ? <Check className="h-3.5 w-3.5 text-cyan-400" /> : <Copy className="h-3.5 w-3.5" />}
                    <span>{copied ? 'কপি হয়েছে' : 'কপি'}</span>
                  </button>

                  <button
                    onClick={handleClear}
                    className="flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs text-slate-400 hover:bg-slate-800 hover:text-rose-400 transition-colors"
                    title="Clear text"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    <span>মুছুন</span>
                  </button>
                </div>
              </div>

              {/* Textarea */}
              <div className="relative">
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Type or paste text here to convert into studio speech..."
                  rows={9}
                  className="w-full resize-none rounded-xl border border-slate-800/80 bg-slate-950/70 p-4 text-sm text-slate-100 placeholder:text-slate-600 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 font-bengali leading-relaxed"
                />
              </div>

              {/* Counters & Sample prompts */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <span className="font-mono">
                    Characters: <strong className={text.length > MAX_CHARS ? 'text-rose-400' : 'text-slate-300'}>{text.length}</strong> / {MAX_CHARS}
                  </span>
                  <span>•</span>
                  <span>Words: {text.trim() ? text.trim().split(/\s+/).length : 0}</span>
                </div>

                {/* Sample buttons */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[11px] text-slate-500">বাস্তব কণ্ঠ প্রিসেট:</span>
                  <button
                    onClick={() => {
                      setText(SAMPLE_PRADEEP_STORY);
                      setSelectedVoiceId('bn-BD-PradeepStoryNeural');
                      setSpeed(0.90);
                      setVolume(1.0);
                      setPitch(-5);
                    }}
                    className="flex items-center gap-1 rounded-lg bg-amber-500/15 border border-amber-500/40 px-2 py-0.5 text-[11px] font-semibold text-amber-300 hover:bg-amber-500/25 transition-colors"
                  >
                    <BookOpen className="h-3 w-3 text-amber-400" />
                    <span>🔥 Deep Emotional Male (-10% / -5Hz)</span>
                  </button>
                  <button
                    onClick={() => {
                      setText(SAMPLE_STORY);
                      setSelectedVoiceId('bn-IN-BashkarNeural');
                      setSpeed(1.0);
                      setVolume(1.0);
                      setPitch(0);
                    }}
                    className="flex items-center gap-1 rounded-lg bg-emerald-500/15 border border-emerald-500/40 px-2 py-0.5 text-[11px] font-semibold text-emerald-300 hover:bg-emerald-500/25 transition-colors"
                  >
                    <BookOpen className="h-3 w-3" />
                    <span>⭐ বাস্তব পুরুষ (ভাস্কর)</span>
                  </button>
                  <button
                    onClick={() => {
                      setText(SAMPLE_FEMALE);
                      setSelectedVoiceId('bn-BD-NabanitaNeural');
                      setSpeed(1.0);
                      setVolume(1.0);
                      setPitch(0);
                    }}
                    className="flex items-center gap-1 rounded-lg bg-pink-500/15 border border-pink-500/40 px-2 py-0.5 text-[11px] font-semibold text-pink-300 hover:bg-pink-500/25 transition-colors"
                  >
                    <Sparkles className="h-3 w-3" />
                    <span>🌸 বাস্তব নারী (নবনিতা)</span>
                  </button>
                  <button
                    onClick={() => {
                      setText(SAMPLE_BANGLA);
                      setSelectedVoiceId('bn-BD-PradeepNeural');
                      setSpeed(1.0);
                      setVolume(1.0);
                      setPitch(0);
                    }}
                    className="flex items-center gap-1 rounded-lg bg-cyan-500/15 border border-cyan-500/40 px-2 py-0.5 text-[11px] font-semibold text-cyan-300 hover:bg-cyan-500/25 transition-colors"
                  >
                    <Mic className="h-3 w-3" />
                    <span>🎙️ সংবাদ পুরুষ (প্রদীপ)</span>
                  </button>
                  <button
                    onClick={() => {
                      setText(SAMPLE_DARIO);
                      setSelectedVoiceId('35b2cfc1-e6fb-4d69-a598-c1780612be4a');
                      setSpeed(0.9);
                      setVolume(1.8);
                      setPitch(0);
                    }}
                    className="flex items-center gap-1 rounded-lg bg-cyan-500/15 border border-cyan-500/40 px-2 py-0.5 text-[11px] font-semibold text-cyan-300 hover:bg-cyan-500/25 transition-colors"
                  >
                    <Zap className="h-3 w-3 text-cyan-400" />
                    <span>⚡ Darío (Sonic 0.9x / 1.8 Vol)</span>
                  </button>
                  <button
                    onClick={() => {
                      setText(SAMPLE_SARAH);
                      setSelectedVoiceId('694f9389-aac1-45b6-b726-9d9369183238');
                      setSpeed(1.0);
                      setVolume(1.0);
                      setPitch(0);
                    }}
                    className="flex items-center gap-1 rounded-lg bg-pink-500/15 border border-pink-500/30 px-2 py-0.5 text-[11px] text-pink-300 hover:bg-pink-500/25 transition-colors"
                  >
                    <Sparkles className="h-3 w-3" />
                    <span>⚡ Sarah (Conversational)</span>
                  </button>
                  <button
                    onClick={() => {
                      setText(SAMPLE_BARBERSHOP);
                      setSelectedVoiceId('a0e99841-438c-4a64-b679-ae501e7d6091');
                      setSpeed(0.95);
                      setVolume(1.0);
                      setPitch(-2);
                    }}
                    className="flex items-center gap-1 rounded-lg bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 text-[11px] text-amber-300 hover:bg-amber-500/25 transition-colors"
                  >
                    <BookOpen className="h-3 w-3" />
                    <span>⚡ Barbershop (Narrator)</span>
                  </button>
                  <button
                    onClick={() => {
                      setText(SAMPLE_ENGLISH);
                      setSelectedVoiceId('en-US-AndrewMultilingualNeural');
                      setSpeed(1.0);
                      setVolume(1.0);
                      setPitch(0);
                    }}
                    className="rounded-lg bg-slate-800/80 px-2 py-0.5 text-[11px] text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
                  >
                    English (Studio)
                  </button>
                </div>
              </div>
            </div>

            {/* Audio Player Component */}
            <AudioPlayer
              audioUrl={currentAudioUrl}
              textSnippet={currentTextSnippet}
              voiceName={selectedVoice.nativeName}
              detectedLang={detectedLang === 'unknown' ? 'bn' : detectedLang}
              isMaleVoice={selectedVoice.gender === 'male'}
              autoPlay={true}
              isLoading={isLoading}
            />

            {/* Recent History Component */}
            <HistoryList
              items={history}
              onSelect={handleSelectHistoryItem}
              onDelete={handleDeleteHistory}
              onClearAll={handleClearAllHistory}
            />
          </div>

          {/* Right Column: Cartesia Voice & Settings Sidebar (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-2xl border border-slate-800/90 bg-[#0e111a] p-5 shadow-2xl backdrop-blur-sm space-y-4">
              
              {/* Voice & Filters Header */}
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                <div className="flex items-center gap-2">
                  <Radio className="h-4 w-4 text-cyan-400" />
                  <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
                    Voice Selection
                  </h3>
                </div>

                {/* Language tab filter */}
                <div className="flex items-center rounded-lg bg-slate-950 p-0.5 text-xs">
                  <button
                    onClick={() => setLanguageFilter('all')}
                    className={`rounded-md px-2 py-1 text-[11px] font-medium transition-colors ${
                      languageFilter === 'all'
                        ? 'bg-slate-800 text-white'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setLanguageFilter('bn')}
                    className={`rounded-md px-2 py-1 text-[11px] font-medium transition-colors ${
                      languageFilter === 'bn'
                        ? 'bg-emerald-500/20 text-emerald-300 font-semibold'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    🇧🇩 বাংলা
                  </button>
                  <button
                    onClick={() => setLanguageFilter('en')}
                    className={`rounded-md px-2 py-1 text-[11px] font-medium transition-colors ${
                      languageFilter === 'en'
                        ? 'bg-cyan-500/20 text-cyan-300 font-semibold'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    🇺🇸 English
                  </button>
                  <button
                    onClick={() => setLanguageFilter('cartesia')}
                    className={`rounded-md px-2 py-1 text-[11px] font-medium transition-colors ${
                      languageFilter === 'cartesia'
                        ? 'bg-gradient-to-r from-cyan-500/20 to-teal-500/20 text-cyan-300 font-bold border border-cyan-500/40'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    ⚡ Cartesia
                  </button>
                </div>
              </div>

              {/* Gender Filter Chips */}
              <div className="grid grid-cols-3 gap-1.5 rounded-xl bg-slate-950 p-1 border border-slate-800/80">
                <button
                  onClick={() => setGenderFilter('all')}
                  className={`flex items-center justify-center gap-1 rounded-lg py-1.5 text-xs font-semibold transition-all ${
                    genderFilter === 'all'
                      ? 'bg-slate-800 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span>🌟 All</span>
                </button>
                <button
                  onClick={() => setGenderFilter('male')}
                  className={`flex items-center justify-center gap-1 rounded-lg py-1.5 text-xs font-semibold transition-all ${
                    genderFilter === 'male'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <User className="h-3 w-3 text-cyan-400" />
                  <span>👨 Male</span>
                </button>
                <button
                  onClick={() => setGenderFilter('female')}
                  className={`flex items-center justify-center gap-1 rounded-lg py-1.5 text-xs font-semibold transition-all ${
                    genderFilter === 'female'
                      ? 'bg-pink-500/20 text-pink-300 border border-pink-500/30 font-bold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <User className="h-3 w-3 text-pink-400" />
                  <span>👩 Female</span>
                </button>
              </div>

              {/* Voice Cards List */}
              <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                {filteredVoices.map((voice) => {
                  const isSelected = voice.id === selectedVoiceId;
                  const isPreviewPlaying = previewVoiceId === voice.id;
                  const isPreviewLoading = previewLoadingId === voice.id;

                  return (
                    <div
                      key={voice.id}
                      onClick={() => {
                        setSelectedVoiceId(voice.id);
                        if (voice.defaultRate !== undefined) setSpeed(voice.defaultRate);
                        if (voice.defaultPitch !== undefined) setPitch(voice.defaultPitch);
                      }}
                      className={`group relative rounded-xl border p-3 transition-all cursor-pointer ${
                        isSelected
                          ? 'border-cyan-500 bg-cyan-950/25 shadow-lg shadow-cyan-950/30 ring-1 ring-cyan-500/40'
                          : 'border-slate-800/70 bg-slate-950/50 hover:border-slate-700 hover:bg-slate-900/60'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="font-bold text-xs text-white">
                              {voice.name}
                            </span>
                            {voice.badge && (
                              <span className={`rounded-full px-2 py-0.2 text-[9px] font-bold border ${
                                voice.languageLabel.includes('Cartesia') || voice.badge.includes('Cartesia') || voice.id.includes('35b2cfc1')
                                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                                  : voice.gender === 'male'
                                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                                  : 'bg-pink-500/20 text-pink-300 border-pink-500/30'
                              }`}>
                                {voice.badge}
                              </span>
                            )}
                            {isSelected && (
                              <span className="flex items-center gap-1 text-[10px] text-cyan-400 font-semibold">
                                <CheckCircle2 className="h-3 w-3" />
                              </span>
                            )}
                          </div>
                          <p className="mt-1 text-[11px] text-slate-400 font-bengali leading-relaxed line-clamp-2">
                            {voice.description}
                          </p>
                        </div>

                        {/* Actions: Preview & Tag */}
                        <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                          <button
                            onClick={(e) => handlePreviewVoice(voice, e)}
                            disabled={isPreviewLoading}
                            className={`flex items-center gap-1 rounded-lg px-2 py-1 text-[10px] font-semibold transition-all ${
                              isPreviewPlaying
                                ? 'bg-cyan-500 text-slate-950 shadow-md'
                                : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                            }`}
                            title="Play sample preview"
                          >
                            {isPreviewLoading ? (
                              <div className="h-2.5 w-2.5 animate-spin rounded-full border border-slate-400 border-t-transparent" />
                            ) : isPreviewPlaying ? (
                              <Pause className="h-2.5 w-2.5 fill-current" />
                            ) : (
                              <Play className="h-2.5 w-2.5 fill-current translate-x-0.5" />
                            )}
                            <span>{isPreviewPlaying ? 'Pause' : 'Sample'}</span>
                          </button>

                          <span className={`text-[9px] uppercase font-semibold ${
                            voice.gender === 'male' ? 'text-cyan-400' : 'text-pink-400'
                          }`}>
                            {voice.gender === 'male' ? 'Male' : 'Female'}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Realism Tuning Controls: Speed, Volume & Pitch */}
              <div className="space-y-3.5 rounded-xl border border-slate-800/80 bg-slate-950/60 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
                    <SlidersHorizontal className="h-3.5 w-3.5 text-cyan-400" />
                    <span>কণ্ঠ নিয়ন্ত্রণ ও বাস্তবতা (Realism Tuning)</span>
                  </div>
                  <button
                    onClick={() => {
                      setSpeed(1.0);
                      setVolume(1.0);
                      setPitch(0);
                    }}
                    className="flex items-center gap-1 text-[11px] text-emerald-400 hover:text-emerald-300 font-semibold"
                    title="Reset to 100% natural human voice settings"
                  >
                    <RotateCcw className="h-3 w-3" />
                    <span>বাস্তব মানব কণ্ঠ (1.0x / 1.0)</span>
                  </button>
                </div>

                {/* Realism Mode Quick Chips */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 pt-1">
                  <button
                    onClick={() => {
                      setSpeed(0.90);
                      setPitch(-5);
                      setVolume(1.0);
                    }}
                    className={`rounded-lg py-1 px-1.5 text-[10px] font-semibold transition-all border ${
                      speed === 0.90 && pitch === -5
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-sm'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    🔥 গভীর কথক (-10% / -5Hz)
                  </button>
                  <button
                    onClick={() => {
                      setSpeed(1.0);
                      setVolume(1.0);
                      setPitch(0);
                    }}
                    className={`rounded-lg py-1 px-1.5 text-[10px] font-semibold transition-all border ${
                      speed === 1.0 && pitch === 0
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-sm'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    🎙️ বাস্তব মানুষ (Natural)
                  </button>
                  <button
                    onClick={() => {
                      setSpeed(0.95);
                      setVolume(1.0);
                      setPitch(0);
                    }}
                    className={`rounded-lg py-1 px-1.5 text-[10px] font-semibold transition-all border ${
                      speed === 0.95 && pitch === 0
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-sm'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    📖 অডিওবুক (Story)
                  </button>
                  <button
                    onClick={() => {
                      setSpeed(0.9);
                      setVolume(1.8);
                      setPitch(0);
                      setSelectedVoiceId('35b2cfc1-e6fb-4d69-a598-c1780612be4a');
                    }}
                    className={`rounded-lg py-1 px-1.5 text-[10px] font-semibold transition-all border ${
                      speed === 0.9 && volume === 1.8
                        ? 'bg-cyan-500/25 text-cyan-300 border-cyan-500/60 shadow-sm'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    ⚡ Cartesia Play (0.9x / 1.8 Vol)
                  </button>
                </div>

                {/* Speed Slider */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Speed (গতি — কথকের জন্য 0.90x বা -10% সেরা):</span>
                    <span className="font-mono font-bold text-emerald-400">{speed.toFixed(2)}x</span>
                  </div>
                  <input
                    type="range"
                    min={0.5}
                    max={2.0}
                    step={0.05}
                    value={speed}
                    onChange={(e) => setSpeed(parseFloat(e.target.value))}
                    className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-slate-800 accent-emerald-400"
                  />
                  <div className="flex justify-between text-[10px] text-slate-600">
                    <span>0.5x</span>
                    <span className="text-amber-400 font-semibold">0.90x (-10% কথক)</span>
                    <span className="text-emerald-400 font-semibold">1.0x (স্বাভাবিক)</span>
                    <span>2.0x</span>
                  </div>
                </div>

                {/* Volume Slider */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Volume (শব্দের মাত্রা — স্বাভাবিক 1.0 রাখুন):</span>
                    <span className="font-mono font-bold text-cyan-400">{volume.toFixed(1)}</span>
                  </div>
                  <input
                    type="range"
                    min={0.5}
                    max={2.5}
                    step={0.1}
                    value={volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-slate-800 accent-cyan-400"
                  />
                  <div className="flex justify-between text-[10px] text-slate-600">
                    <span>0.5</span>
                    <span className="text-cyan-400 font-semibold">1.0 (স্টুডিও নরমাল)</span>
                    <span>2.0 (Sonic Boost)</span>
                    <span>2.5</span>
                  </div>
                </div>

                {/* Pitch Slider */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Pitch (গলার সুর — গভীর কথকের জন্য -5Hz):</span>
                    <span className="font-mono font-bold text-amber-400">
                      {pitch > 0 ? `+${pitch}Hz` : `${pitch}Hz`}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={-10}
                    max={10}
                    step={1}
                    value={pitch}
                    onChange={(e) => setPitch(parseInt(e.target.value, 10))}
                    className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-slate-800 accent-amber-400"
                  />
                  <div className="flex justify-between text-[10px] text-slate-600">
                    <span>-10Hz (খুব গম্ভীর)</span>
                    <span className="text-amber-400 font-semibold">-5Hz (আবেগঘন কথক)</span>
                    <span>0Hz (নরমাল)</span>
                    <span>+10Hz</span>
                  </div>
                </div>
              </div>

              {/* Primary Cartesia Action Button */}
              <button
                onClick={handleGenerateSpeech}
                disabled={isLoading || !text.trim()}
                className={`relative w-full overflow-hidden rounded-xl py-3.5 px-4 font-bold text-sm transition-all shadow-xl ${
                  isLoading || !text.trim()
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-500 text-slate-950 hover:opacity-95 hover:shadow-cyan-500/25 active:scale-[0.99]'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  {isLoading ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-950 border-t-transparent" />
                      <span>Generating Speech (Sonic 3.5)...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="h-4 w-4 fill-current" />
                      <span>Generate Speech (Sonic 3.5)</span>
                    </>
                  )}
                </div>
              </button>

              <div className="text-center">
                <span className="text-[11px] text-slate-500">
                  Shortcut: <kbd className="rounded bg-slate-800 px-1.5 py-0.5 font-mono text-[10px] text-slate-400 border border-slate-700">Ctrl</kbd> + <kbd className="rounded bg-slate-800 px-1.5 py-0.5 font-mono text-[10px] text-slate-400 border border-slate-700">Enter</kbd>
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-[#07090e] py-6 text-center text-xs text-slate-500 font-bengali">
        <p>
          Ai-Spicker Sonic Studio &copy; 2026 — Inspired by Cartesia Sonic 3.5 &amp; Azure Neural Speech. Ready for Vercel deployment.
        </p>
      </footer>
    </div>
  );
}
