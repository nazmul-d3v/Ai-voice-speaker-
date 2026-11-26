'use client';

import React, { useEffect } from 'react';
import { AlertCircle, RotateCcw, Home } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('App-level client error caught:', error);
  }, [error]);

  const handleClearCacheAndReset = () => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.clear();
        sessionStorage.clear();
      }
    } catch (e) {
      console.warn('Could not clear storage', e);
    }
    reset();
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-[#090b10] text-slate-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full rounded-2xl border border-rose-500/30 bg-slate-900/90 p-6 shadow-2xl backdrop-blur-md text-center space-y-4">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
          <AlertCircle className="h-7 w-7" />
        </div>

        <div>
          <h2 className="text-lg font-bold text-white">অ্যাপ্লিকেশন লোড করতে সাময়িক সমস্যা হয়েছে</h2>
          <p className="mt-1 text-xs text-slate-400">
            A client-side issue occurred while loading components. You can reset and reload safely.
          </p>
          {error?.message && (
            <div className="mt-3 rounded-lg bg-slate-950 p-2.5 font-mono text-[11px] text-rose-300 text-left overflow-x-auto border border-slate-800">
              {error.message}
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-2">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 px-4 py-2.5 text-xs font-bold text-slate-950 hover:opacity-90 transition-all shadow-md"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>আবার চেষ্টা করুন (Retry)</span>
          </button>

          <button
            onClick={handleClearCacheAndReset}
            className="w-full sm:w-auto flex items-center justify-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-xs font-semibold text-slate-200 hover:bg-slate-700 transition-all"
          >
            <Home className="h-3.5 w-3.5" />
            <span>ক্লিয়ার ক্যাশ ও রিস্টার্ট</span>
          </button>
        </div>
      </div>
    </div>
  );
}
