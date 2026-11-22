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
  Sliders,
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
} from 'lucide-react';

// Samples
const SAMPLE_STORY = `শেষ ভরসা। সেদিন একটা স্কুল বাসের ব্রেক কাজ করা বন্ধ করে দিয়েছিল। বাসের ভেতরে তখন ১৫টি শিশু। বাইরে প্রচণ্ড বৃষ্টি, কেউ এগিয়ে আসার সাহস পাচ্ছিল না। ঠিক তখনই এগিয়ে এলো আশা। পেশায় সে একজন তরুণী মেকানিক। কিন্তু বাসচালক তাকে দেখে বলল, তুমি পারবে তো? এত বড় বাস ঠিক করা কি তোমার কাজ? আশা কোনো উত্তর দিল না। সে দ্রুত বাসের নিচে গিয়ে পরীক্ষা শুরু করল। মানুষের কাছে নিজের পরিচয় মুখে বলতে হয় না, নিজের কাজই একদিন পরিচয় তৈরি করে দেয়।`;

const SAMPLE_BANGLA = `আজকের দিনে কৃত্রিম বুদ্ধিমত্তা আমাদের ভাষাকে নতুন মাত্রা দিয়েছে। আপনি চাইলে সহজেই যেকোনো বাংলা লেখা থেকে স্টুডিও মানের স্পষ্ট ও প্রাকৃতিক ভয়েস তৈরি করতে পারেন। ২০২৬ সালের এই নতুন প্রযুক্তি আপনার কনটেন্টকে আরও আকর্ষণীয় করবে।`;

const SAMPLE_ENGLISH = `Artificial intelligence is transforming how we communicate across borders and languages. With cutting-edge neural voice synthesis, you can generate crystal-clear, studio-quality speech for your videos, podcasts, and digital content effortlessly.`;

const SAMPLE_MIXED = `Ami Next.js and Tailwind CSS diye ekta notun AI Text to Speech project banacchi. আজকের weather খুব সুন্দর, তাই studio-quality natural voice generation test korchi!`;

const MAX_CHARS = 3000;

export default function Home() {
  const [text, setText] = useState('');
  const [selectedVoiceId, setSelectedVoiceId] = useState(DEFAULT_VOICE_ID);
  const [rate, setRate] = useState(0.95);
  const [pitch, setPitch] = useState(-2);
  const [detectedLang, setDetectedLang] = useState<DetectedLanguage>('unknown');
  const [languageFilter, setLanguageFilter] = useState<'all' | 'bn' | 'en'>('all');
  
  // UI states
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  
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

    // If auto-detected language is primarily English and current voice is Bangla, switch to English
    if (detected === 'en' && selectedVoiceId.startsWith('bn-')) {
      setSelectedVoiceId('en-US-AvaMultilingualNeural');
    } else if (detected === 'bn' && selectedVoiceId.startsWith('en-')) {
      setSelectedVoiceId('bn-IN-BashkarNeural');
    }
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
  }, [text, selectedVoiceId, rate, pitch, isLoading]);

  const selectedVoice = getVoiceById(selectedVoiceId);

  // Filter voices based on tab
  const filteredVoices = SUPPORTED_VOICES.filter((voice) => {
    if (languageFilter === 'bn') return voice.locale.startsWith('bn-');
    if (languageFilter === 'en') return voice.locale.startsWith('en-');
    return true;
  });

  const applyVoicePreset = (preset: 'storyteller' | 'news' | 'female' | 'english') => {
    if (preset === 'storyteller') {
      setSelectedVoiceId('bn-IN-BashkarNeural');
      setRate(0.95);
      setPitch(-2);
    } else if (preset === 'news') {
      setSelectedVoiceId('bn-BD-PradeepNeural');
      setRate(1.0);
      setPitch(0);
    } else if (preset === 'female') {
      setSelectedVoiceId('bn-BD-NabanitaNeural');
      setRate(1.0);
      setPitch(0);
    } else if (preset === 'english') {
      setSelectedVoiceId('en-US-AvaMultilingualNeural');
      setRate(1.0);
      setPitch(0);
    }
  };

  const handlePreviewVoice = async (voice: VoiceOption, e: React.MouseEvent) => {
    e.stopPropagation();

    // If already playing this voice, stop it
    if (previewVoiceId === voice.id && previewAudioRef.current && !previewAudioRef.current.paused) {
      previewAudioRef.current.pause();
      setPreviewVoiceId(null);
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
          rate: voice.id === 'bn-IN-BashkarNeural' ? 0.95 : 1.0,
          pitch: voice.id === 'bn-IN-BashkarNeural' ? -2 : 0,
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
          rate,
          pitch,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Error ${response.status}: Failed to synthesize speech.`);
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      
      // Convert blob to base64 for persistent localStorage history
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
      const clipText = await navigator.clipboard.readText();
      if (clipText) {
        setText(clipText);
      }
    } catch (err) {
      console.warn('Could not read clipboard', err);
    }
  };

  const handleCopy = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-300">
      <Header />

      <main className="mx-auto max-w-6xl w-full px-4 py-8 sm:px-6 flex-1 space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-1 text-xs font-medium text-emerald-400">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Bangla & English Neural Voice Generation</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            লেখা থেকে তৈরি করুন <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">জীবন্ত গল্প ও অডিওবুক ভয়েস</span>
          </h2>
          <p className="max-w-2xl mx-auto text-xs sm:text-sm text-slate-400 font-bengali">
            গল্পের কথক, সংবাদ উপস্থাপনা বা স্বাভাবিক কণ্ঠ—যেকোনো বাংলা ও ইংরেজি লেখাকে মুহূর্তের মধ্যে স্টুডিও কোয়ালিটি MP3 তে রূপান্তর করুন।
          </p>
        </div>

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

        {/* Main Grid: Left Editor | Right Controls & Player */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Text Input & Preprocessing (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 shadow-xl backdrop-blur-sm space-y-3">
              {/* Textarea Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-emerald-400" />
                  <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    ইনপুট টেক্সট
                  </span>
                  
                  {/* Language Detection Badge */}
                  {detectedLang !== 'unknown' && (
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold border ${
                        detectedLang === 'bn'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                          : detectedLang === 'en'
                          ? 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                          : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                      }`}
                    >
                      {detectedLang === 'bn' && '🇧🇩 বাংলা সনাক্ত হয়েছে'}
                      {detectedLang === 'en' && '🇺🇸 English Detected'}
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
                    {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
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
                  placeholder="এখানে আপনার গল্প, প্রবন্ধ, ভিডিও স্ক্রিপ্ট বা যেকোনো বাংলা ও ইংরেজি টেক্সট লিখুন বা পেস্ট করুন... (যেমন: সেদিন একটা স্কুল বাসের ব্রেক কাজ করা বন্ধ করে দিয়েছিল...)"
                  rows={8}
                  className="w-full resize-none rounded-xl border border-slate-800 bg-slate-950/80 p-4 text-sm text-slate-100 placeholder:text-slate-600 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 font-bengali leading-relaxed"
                />
              </div>

              {/* Counters & Sample prompts */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <span className="font-mono">
                    অক্ষর: <strong className={text.length > MAX_CHARS ? 'text-rose-400' : 'text-slate-300'}>{text.length}</strong> / {MAX_CHARS}
                  </span>
                  <span>•</span>
                  <span>শব্দ: {text.trim() ? text.trim().split(/\s+/).length : 0}</span>
                </div>

                {/* Sample buttons */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[11px] text-slate-500">নমুনা:</span>
                  <button
                    onClick={() => {
                      setText(SAMPLE_STORY);
                      applyVoicePreset('storyteller');
                    }}
                    className="flex items-center gap-1 rounded-lg bg-emerald-500/20 border border-emerald-500/30 px-2 py-0.5 text-[11px] font-semibold text-emerald-300 hover:bg-emerald-500/30 transition-colors"
                    title="Load sample story with matching Storyteller voice"
                  >
                    <BookOpen className="h-3 w-3" />
                    <span>📖 গল্পের নমুনা (Story)</span>
                  </button>
                  <button
                    onClick={() => setText(SAMPLE_BANGLA)}
                    className="rounded-lg bg-slate-800/80 px-2 py-0.5 text-[11px] text-slate-300 hover:bg-slate-700 hover:text-emerald-400 transition-colors"
                  >
                    বাংলা
                  </button>
                  <button
                    onClick={() => setText(SAMPLE_ENGLISH)}
                    className="rounded-lg bg-slate-800/80 px-2 py-0.5 text-[11px] text-slate-300 hover:bg-slate-700 hover:text-blue-400 transition-colors"
                  >
                    English
                  </button>
                  <button
                    onClick={() => setText(SAMPLE_MIXED)}
                    className="rounded-lg bg-slate-800/80 px-2 py-0.5 text-[11px] text-slate-300 hover:bg-slate-700 hover:text-amber-400 transition-colors"
                  >
                    বাংলিশ
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
              autoPlay={true}
            />

            {/* Recent History Component */}
            <HistoryList
              items={history}
              onSelect={handleSelectHistoryItem}
              onDelete={handleDeleteHistory}
              onClearAll={handleClearAllHistory}
            />
          </div>

          {/* Right Column: Voice Selection & Tuning Controls (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 shadow-xl backdrop-blur-sm space-y-5">
              
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Radio className="h-4 w-4 text-emerald-400" />
                  <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
                    ভয়েস নির্বাচন ও স্টাইল
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
                    সব
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
                        ? 'bg-blue-500/20 text-blue-300 font-semibold'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    🇺🇸 English
                  </button>
                </div>
              </div>

              {/* 1-Click Voice Style Presets Bar */}
              <div className="space-y-2">
                <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1.5">
                  <Headphones className="h-3 w-3 text-emerald-400" />
                  <span>১-ক্লিকে ভয়েস মুড সিলেক্ট করুন (Voice Presets):</span>
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    onClick={() => applyVoicePreset('storyteller')}
                    className={`flex items-center gap-1.5 rounded-xl border p-2 text-left transition-all ${
                      selectedVoiceId === 'bn-IN-BashkarNeural'
                        ? 'border-emerald-500 bg-emerald-500/20 text-emerald-200 font-bold shadow-md shadow-emerald-500/20 ring-1 ring-emerald-500'
                        : 'border-slate-800 bg-slate-950/60 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
                    }`}
                  >
                    <BookOpen className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                    <div className="min-w-0">
                      <div className="truncate text-[11px] font-bold">গল্পের কথক (Story)</div>
                      <div className="text-[9px] text-emerald-400/80">আপলোড করা অডিওর মতো</div>
                    </div>
                  </button>

                  <button
                    onClick={() => applyVoicePreset('news')}
                    className={`flex items-center gap-1.5 rounded-xl border p-2 text-left transition-all ${
                      selectedVoiceId === 'bn-BD-PradeepNeural'
                        ? 'border-emerald-500 bg-emerald-500/20 text-emerald-200 font-bold shadow-md shadow-emerald-500/20 ring-1 ring-emerald-500'
                        : 'border-slate-800 bg-slate-950/60 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
                    }`}
                  >
                    <Radio className="h-4 w-4 text-teal-400 flex-shrink-0" />
                    <div className="min-w-0">
                      <div className="truncate text-[11px] font-bold">সংবাদ ও উপস্থাপন</div>
                      <div className="text-[9px] text-slate-500">প্রদীপ (পুরুষ)</div>
                    </div>
                  </button>

                  <button
                    onClick={() => applyVoicePreset('female')}
                    className={`flex items-center gap-1.5 rounded-xl border p-2 text-left transition-all ${
                      selectedVoiceId === 'bn-BD-NabanitaNeural'
                        ? 'border-emerald-500 bg-emerald-500/20 text-emerald-200 font-bold shadow-md shadow-emerald-500/20 ring-1 ring-emerald-500'
                        : 'border-slate-800 bg-slate-950/60 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
                    }`}
                  >
                    <Sparkles className="h-4 w-4 text-pink-400 flex-shrink-0" />
                    <div className="min-w-0">
                      <div className="truncate text-[11px] font-bold">মিষ্টি নারী কণ্ঠ</div>
                      <div className="text-[9px] text-slate-500">নবনিতা (নারী)</div>
                    </div>
                  </button>

                  <button
                    onClick={() => applyVoicePreset('english')}
                    className={`flex items-center gap-1.5 rounded-xl border p-2 text-left transition-all ${
                      selectedVoiceId === 'en-US-AvaMultilingualNeural'
                        ? 'border-emerald-500 bg-emerald-500/20 text-emerald-200 font-bold shadow-md shadow-emerald-500/20 ring-1 ring-emerald-500'
                        : 'border-slate-800 bg-slate-950/60 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
                    }`}
                  >
                    <Volume2 className="h-4 w-4 text-blue-400 flex-shrink-0" />
                    <div className="min-w-0">
                      <div className="truncate text-[11px] font-bold">English Studio</div>
                      <div className="text-[9px] text-slate-500">Ava (Multilingual)</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Voice Cards List */}
              <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                {filteredVoices.map((voice) => {
                  const isSelected = voice.id === selectedVoiceId;
                  const isPreviewPlaying = previewVoiceId === voice.id;
                  const isPreviewLoading = previewLoadingId === voice.id;

                  return (
                    <div
                      key={voice.id}
                      onClick={() => setSelectedVoiceId(voice.id)}
                      className={`group relative rounded-xl border p-3.5 transition-all cursor-pointer ${
                        isSelected
                          ? 'border-emerald-500 bg-emerald-500/10 shadow-md shadow-emerald-500/10 ring-1 ring-emerald-500/40'
                          : 'border-slate-800/80 bg-slate-950/60 hover:border-slate-700 hover:bg-slate-900/80'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-semibold text-xs text-white">
                              {voice.nativeName}
                            </span>
                            {voice.badge && (
                              <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[9px] font-bold text-emerald-300 border border-emerald-500/30">
                                {voice.badge}
                              </span>
                            )}
                            {isSelected && (
                              <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-semibold">
                                <CheckCircle2 className="h-3 w-3" />
                                <span>সিলেক্টেড</span>
                              </span>
                            )}
                          </div>
                          <p className="mt-1 text-[11px] text-slate-400 font-bengali leading-relaxed">
                            {voice.description}
                          </p>
                        </div>

                        {/* Voice Actions: Preview audio button & Gender Tag */}
                        <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                          <button
                            onClick={(e) => handlePreviewVoice(voice, e)}
                            disabled={isPreviewLoading}
                            className={`flex items-center gap-1 rounded-lg px-2 py-1 text-[10px] font-semibold transition-all ${
                              isPreviewPlaying
                                ? 'bg-emerald-500 text-slate-950 shadow-md'
                                : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                            }`}
                            title="কণ্ঠের নমুনা শুনুন"
                          >
                            {isPreviewLoading ? (
                              <div className="h-2.5 w-2.5 animate-spin rounded-full border border-slate-400 border-t-transparent" />
                            ) : isPreviewPlaying ? (
                              <Pause className="h-2.5 w-2.5 fill-current" />
                            ) : (
                              <Play className="h-2.5 w-2.5 fill-current translate-x-0.5" />
                            )}
                            <span>{isPreviewPlaying ? 'থামান' : 'শুনুন'}</span>
                          </button>

                          <span className="text-[10px] text-slate-500 uppercase">
                            {voice.gender === 'female' ? 'নারী' : 'পুরুষ'}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Tuning Controls: Speed & Pitch */}
              <div className="space-y-4 rounded-xl border border-slate-800/80 bg-slate-950/50 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                    <Sliders className="h-3.5 w-3.5 text-emerald-400" />
                    <span>কথা বলার গতি ও পিচ (Voice Controls)</span>
                  </div>
                  <button
                    onClick={() => {
                      setRate(selectedVoiceId === 'bn-IN-BashkarNeural' ? 0.95 : 1.0);
                      setPitch(selectedVoiceId === 'bn-IN-BashkarNeural' ? -2 : 0);
                    }}
                    className="flex items-center gap-1 text-[11px] text-slate-500 hover:text-slate-300"
                    title="Reset to defaults"
                  >
                    <RotateCcw className="h-3 w-3" />
                    <span>রিসেট</span>
                  </button>
                </div>

                {/* Speed Slider */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">গতি (Speed):</span>
                    <span className="font-mono font-semibold text-emerald-400">{rate.toFixed(2)}x</span>
                  </div>
                  <input
                    type="range"
                    min={0.5}
                    max={2.0}
                    step={0.05}
                    value={rate}
                    onChange={(e) => setRate(parseFloat(e.target.value))}
                    className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-slate-800 accent-emerald-400"
                  />
                  <div className="flex justify-between text-[10px] text-slate-600">
                    <span>ধীর (0.5x)</span>
                    <span>স্বাভাবিক (1.0x)</span>
                    <span>দ্রুত (2.0x)</span>
                  </div>
                </div>

                {/* Pitch Slider */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">পিচ (Pitch):</span>
                    <span className="font-mono font-semibold text-teal-400">
                      {pitch > 0 ? `+${pitch}%` : `${pitch}%`}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={-10}
                    max={10}
                    step={1}
                    value={pitch}
                    onChange={(e) => setPitch(parseInt(e.target.value, 10))}
                    className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-slate-800 accent-teal-400"
                  />
                  <div className="flex justify-between text-[10px] text-slate-600">
                    <span>ভারী (-10%)</span>
                    <span>স্বাভাবিক (0%)</span>
                    <span>চিকন (+10%)</span>
                  </div>
                </div>
              </div>

              {/* Primary Action Button */}
              <button
                onClick={handleGenerateSpeech}
                disabled={isLoading || !text.trim()}
                className={`relative w-full overflow-hidden rounded-xl py-3.5 px-4 font-semibold text-sm transition-all shadow-xl ${
                  isLoading || !text.trim()
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-slate-950 hover:opacity-95 hover:shadow-emerald-500/25 active:scale-[0.99]'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  {isLoading ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-950 border-t-transparent" />
                      <span>ভয়েস তৈরি হচ্ছে... (Generating Audio)</span>
                    </>
                  ) : (
                    <>
                      <Mic className="h-4 w-4" />
                      <span>ভয়েস তৈরি করুন (Convert to Speech)</span>
                    </>
                  )}
                </div>
              </button>

              <div className="text-center">
                <span className="text-[11px] text-slate-500">
                  শর্টকাট: <kbd className="rounded bg-slate-800 px-1.5 py-0.5 font-mono text-[10px] text-slate-400 border border-slate-700">Ctrl</kbd> + <kbd className="rounded bg-slate-800 px-1.5 py-0.5 font-mono text-[10px] text-slate-400 border border-slate-700">Enter</kbd>
                </span>
              </div>
            </div>

            {/* Quick tips & Features card */}
            <div className="rounded-2xl border border-slate-800/80 bg-slate-900/30 p-4 text-xs space-y-2 text-slate-400 font-bengali">
              <h4 className="font-semibold text-slate-300 flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
                <span>উচ্চারণ ও ব্যবহারের নির্দেশিকা:</span>
              </h4>
              <ul className="list-disc list-inside space-y-1 text-[11px] text-slate-400 pl-1">
                <li><strong>গল্প ও অডিওবুকের জন্য:</strong> &quot;ভাস্কর (গল্পের কথক)&quot; সিলেক্ট করুন। এটি আপনার আপলোড করা নমুনার মতো গম্ভীর ও আকর্ষণীয়।</li>
                <li>দাঁড়ি (।), কমা (,) ও প্রশ্নবোধক চিহ্ন দিলে আবৃত্তি ও বর্ণনার বিরতি অত্যন্ত বাস্তবসম্মত শোনায়।</li>
                <li>যেকোনো মোবাইল ও কম্পিউটারে ব্রাউজার থেকে সরাসরি উচ্চমানের MP3 ফাইল ডাউনলোড করুন।</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-6 text-center text-xs text-slate-500 font-bengali">
        <p>
          Ai-Spicker &copy; {new Date().getFullYear()} — Bangla & English AI Text-to-Speech Platform. Ready for Vercel deployment.
        </p>
      </footer>
    </div>
  );
}
