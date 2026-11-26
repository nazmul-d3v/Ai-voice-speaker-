'use client';

import React from 'react';
import { HistoryItem } from '../lib/storage';
import { Clock, Play, Download, Trash2 } from 'lucide-react';

interface HistoryListProps {
  items: HistoryItem[];
  onSelect: (item: HistoryItem) => void;
  onDelete: (id: string) => void;
  onClearAll: () => void;
}

export function HistoryList({
  items,
  onSelect,
  onDelete,
  onClearAll,
}: HistoryListProps) {
  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-800/80 bg-slate-900/30 p-6 text-center text-slate-500">
        <Clock className="mx-auto mb-2 h-6 w-6 text-slate-600" />
        <p className="text-xs">এখনও কোনো হিস্টোরি সংরক্ষিত নেই।</p>
        <p className="text-[11px] text-slate-600">আপনার সাম্প্রতিক ১০টি তৈরি অডিও ক্লিপ এখানে সেভ থাকবে।</p>
      </div>
    );
  }

  const formatHistoryDate = (timestamp: number) => {
    try {
      if (!timestamp || isNaN(timestamp)) return 'এখনই';
      const d = new Date(timestamp);
      if (isNaN(d.getTime())) return 'এখনই';
      return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch {
      return 'এখনই';
    }
  };

  const downloadHistoryClip = (item: HistoryItem, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const link = document.createElement('a');
      link.href = item.audioBase64;
      let datePart = 'clip';
      try {
        const d = new Date(item.createdAt);
        if (!isNaN(d.getTime())) {
          datePart = d.toISOString().slice(0, 10);
        }
      } catch {
        datePart = 'clip';
      }
      link.download = `voice-${item.language || 'bn'}-${datePart}.mp3`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Download history error:', err);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-800/80 bg-slate-900/40 p-5 backdrop-blur-sm">
      <div className="mb-4 flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-emerald-400" />
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
            সাম্প্রতিক অডিও হিস্টোরি ({items.length}/10)
          </h3>
        </div>
        <button
          onClick={onClearAll}
          className="text-xs text-rose-400/80 hover:text-rose-300 transition-colors"
        >
          সব মুছুন
        </button>
      </div>

      <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelect(item)}
            className="group flex items-center justify-between gap-3 rounded-xl border border-slate-800/60 bg-slate-950/40 p-3 transition-all hover:border-emerald-500/40 hover:bg-slate-850 cursor-pointer"
          >
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-medium text-slate-200 font-bengali">
                {item.text}
              </p>
              <div className="mt-1 flex items-center gap-2 text-[11px] text-slate-500">
                <span className="rounded bg-slate-800 px-1.5 py-0.5 text-slate-300">
                  🎙️ {item.voiceName}
                </span>
                <span>•</span>
                <span>{formatHistoryDate(item.createdAt)}</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect(item);
                }}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-slate-950 transition-colors"
                title="প্লে করুন"
              >
                <Play className="h-3.5 w-3.5 fill-current translate-x-0.5" />
              </button>

              <button
                onClick={(e) => downloadHistoryClip(item, e)}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
                title="ডাউনলোড MP3"
              >
                <Download className="h-3.5 w-3.5" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(item.id);
                }}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-rose-500/10 hover:text-rose-400 transition-colors"
                title="ডিলিট"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
