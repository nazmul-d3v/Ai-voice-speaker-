'use client';

import React, { useRef, useState, useEffect } from 'react';
import {
  Play,
  Pause,
  Square,
  RotateCcw,
  Download,
  Volume2,
  VolumeX,
  Sparkles,
  Loader2,
} from 'lucide-react';

interface AudioPlayerProps {
  audioUrl: string | null;
  textSnippet?: string;
  voiceName?: string;
  detectedLang?: string;
  isMaleVoice?: boolean;
  onDownload?: () => void;
  autoPlay?: boolean;
  isLoading?: boolean;
}

export function AudioPlayer({
  audioUrl,
  textSnippet,
  voiceName,
  detectedLang = 'bn',
  isMaleVoice = false,
  autoPlay = false,
  isLoading = false,
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1.0);

  useEffect(() => {
    if (audioRef.current && audioUrl) {
      audioRef.current.src = audioUrl;
      audioRef.current.playbackRate = playbackRate;
      if (autoPlay) {
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch((err) => console.log('Autoplay handled by browser policy:', err));
      }
    }
    setCurrentTime(0);
    setIsPlaying(false);
  }, [audioUrl, autoPlay]);

  const togglePlay = () => {
    if (!audioRef.current || !audioUrl) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.error('Play error', err));
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const cur = audioRef.current.currentTime;
      setCurrentTime(isFinite(cur) && !isNaN(cur) ? cur : 0);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      const d = audioRef.current.duration;
      setDuration(isFinite(d) && !isNaN(d) ? d : 0);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const handleStop = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setCurrentTime(0);
    setIsPlaying(false);
  };

  const handleReplay = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = 0;
    audioRef.current.play();
    setIsPlaying(true);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (audioRef.current) {
      audioRef.current.volume = val;
      setIsMuted(val === 0);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.muted = false;
        setIsMuted(false);
      } else {
        audioRef.current.muted = true;
        setIsMuted(true);
      }
    }
  };

  const changePlaybackRate = (rate: number) => {
    setPlaybackRate(rate);
    if (audioRef.current) {
      audioRef.current.playbackRate = rate;
    }
  };

  const handleDownload = () => {
    if (!audioUrl) return;
    const isWav = audioUrl.includes('.wav');
    const ext = isWav ? 'wav' : 'mp3';
    let dateStr = 'audio';
    try {
      dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    } catch {
      dateStr = 'audio';
    }
    const filename = `voice-${detectedLang}-${dateStr}-${Date.now().toString().slice(-4)}.${ext}`;
    const link = document.createElement('a');
    link.href = audioUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds < 0 || !isFinite(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-emerald-500/40 bg-slate-900/70 p-8 text-center text-slate-200 animate-pulse space-y-3 shadow-xl shadow-emerald-950/20">
        <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
        <div>
          <p className="text-sm font-semibold text-emerald-400">
            গভীর আবেগঘন অডিও তৈরি হচ্ছে (Synthesizing Audio)...
          </p>
          <p className="text-xs text-slate-400 mt-1">
            Microsoft Edge Neural TTS ইঞ্জিন থেকে ৯৬kbps স্টুডিও অডিও লোড হচ্ছে
          </p>
        </div>
      </div>
    );
  }

  if (!audioUrl) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-700/60 bg-slate-900/40 p-8 text-center text-slate-400">
        <Sparkles className="mx-auto mb-2 h-8 w-8 text-slate-600 animate-pulse" />
        <p className="text-sm font-medium">ভয়েস তৈরি করার পর এখানে অডিও প্লেয়ার ও ডাউনলোড অপশন দেখতে পাবেন।</p>
        <p className="text-xs text-slate-500 mt-1">Generated audio player with Play, Pause, Stop &amp; MP3 download will appear here.</p>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-slate-900 to-slate-950 p-6 shadow-2xl shadow-emerald-950/20">
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      />

      {/* Top info row */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
            স্টুডিও অডিও রেডি
          </span>
          {voiceName && (
            <span className="rounded-full bg-slate-800 px-2.5 py-0.5 text-xs text-slate-300">
              {isMaleVoice ? '👨' : '👩'} {voiceName}
            </span>
          )}
        </div>

        <button
          onClick={handleDownload}
          className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-2 text-xs font-semibold text-slate-950 transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-emerald-500/25 active:scale-[0.98]"
        >
          <Download className="h-4 w-4" />
          <span>অডিও ডাউনলোড করুন</span>
        </button>
      </div>

      {textSnippet && (
        <p className="mb-4 line-clamp-2 text-xs text-slate-400 italic font-bengali">
          &ldquo;{textSnippet}&rdquo;
        </p>
      )}

      {/* Animated waveform visualization */}
      <div className="mb-4 flex items-center justify-center gap-1 h-12 px-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
        {[20, 45, 75, 30, 90, 60, 40, 80, 100, 70, 50, 85, 35, 65, 95, 40, 60, 80, 50, 30].map(
          (height, idx) => (
            <div
              key={idx}
              className={`w-1.5 rounded-full transition-all duration-300 ${
                isPlaying
                  ? 'bg-gradient-to-t from-emerald-500 to-teal-300 animate-wave-bar'
                  : 'bg-slate-700'
              }`}
              style={{
                height: isPlaying ? `${Math.max(15, height)}%` : '20%',
                animationDelay: `${idx * 0.05}s`,
              }}
            />
          )
        )}
      </div>

      {/* Scrubber bar */}
      <div className="mb-4 space-y-1">
        <input
          type="range"
          min={0}
          max={isFinite(duration) && duration > 0 ? duration : 100}
          value={isFinite(currentTime) ? currentTime : 0}
          onChange={handleSeek}
          className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-800 accent-emerald-400 transition-all focus:outline-none"
        />
        <div className="flex justify-between text-[11px] font-mono text-slate-400">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Main playback control bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        <div className="flex items-center gap-2">
          {/* Play / Pause button */}
          <button
            onClick={togglePlay}
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/30 transition-transform hover:scale-105 active:scale-95"
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <Pause className="h-5 w-5 fill-current" />
            ) : (
              <Play className="h-5 w-5 fill-current translate-x-0.5" />
            )}
          </button>

          {/* Stop button */}
          <button
            onClick={handleStop}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-800 bg-slate-900 text-rose-400 shadow-sm transition-all hover:bg-rose-500/10 hover:border-rose-500/50 hover:text-rose-300 active:scale-95"
            title="Stop playback"
          >
            <Square className="h-4 w-4 fill-current" />
          </button>

          {/* Replay button */}
          <button
            onClick={handleReplay}
            className="rounded-xl border border-slate-700/70 p-2.5 text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
            title="Replay from start"
          >
            <RotateCcw className="h-4 w-4" />
          </button>

          {/* Speed selector */}
          <div className="flex items-center rounded-xl border border-slate-800 bg-slate-900 p-0.5 text-xs">
            {[0.75, 1.0, 1.25, 1.5].map((rate) => (
              <button
                key={rate}
                onClick={() => changePlaybackRate(rate)}
                className={`rounded-lg px-2 py-1 font-medium transition-colors ${
                  playbackRate === rate
                    ? 'bg-emerald-500/20 text-emerald-400 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {rate}x
              </button>
            ))}
          </div>
        </div>

        {/* Volume controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleMute}
            className="text-slate-400 transition-colors hover:text-white"
          >
            {isMuted || volume === 0 ? (
              <VolumeX className="h-4 w-4" />
            ) : (
              <Volume2 className="h-4 w-4" />
            )}
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="h-1.5 w-16 cursor-pointer appearance-none rounded-lg bg-slate-800 accent-emerald-400"
          />
        </div>
      </div>
    </div>
  );
}
