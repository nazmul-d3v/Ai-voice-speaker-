'use client';

import React from 'react';
import { Volume2, Sparkles, Github, Globe, Cpu, Zap } from 'lucide-react';

export function Header() {
  return (
    <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Logo and brand */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-cyan-500 via-teal-500 to-emerald-400 shadow-md shadow-emerald-500/20">
            <Volume2 className="h-5 w-5 text-slate-950" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm sm:text-base font-bold text-white tracking-tight flex items-center gap-1.5">
                <span>Ai-Spicker</span>
                <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent font-extrabold">
                  Sonic Play
                </span>
              </h1>
              <span className="inline-flex items-center gap-1 rounded-full bg-cyan-500/10 px-2 py-0.5 text-[10px] font-semibold text-cyan-300 border border-cyan-500/25">
                <Zap className="h-2.5 w-2.5 text-cyan-400" />
                sonic-3.5
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-bengali">
              Cartesia Sonic 3.5 & Neural বাংলা-ইংরেজি ভয়েস স্টুডিও
            </p>
          </div>
        </div>

        {/* Status badges & Links */}
        <div className="flex items-center gap-2.5">
          <div className="hidden md:flex items-center gap-1.5 rounded-full border border-slate-800 bg-slate-900/80 px-2.5 py-1 text-[11px] text-slate-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>&lt;90ms Ultra-low Latency</span>
          </div>

          <div className="hidden sm:flex items-center gap-1 rounded-full border border-slate-800 bg-slate-900/60 px-2.5 py-1 text-[11px] text-slate-300">
            <Globe className="h-3 w-3 text-cyan-400" />
            <span>Bangla 🇧🇩 &amp; Multilingual</span>
          </div>

          <a
            href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fnazmul-d3v%2FAi-voice-speaker-"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 rounded-xl border border-cyan-500/30 bg-cyan-950/40 px-3 py-1.5 text-xs font-semibold text-cyan-300 transition-all hover:bg-cyan-900/50 hover:text-white"
          >
            <span>▲ Deploy Vercel</span>
          </a>

          <a
            href="https://github.com/nazmul-d3v/Ai-voice-speaker-"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-300 transition-all hover:border-slate-700 hover:text-white"
          >
            <Github className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </div>
      </div>
    </header>
  );
}
