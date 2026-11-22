# Bangla & English AI Text-to-Speech (TTS) Website — Roadmap

## 1. Project Vision & Core Requirements
Build a fast, clean, responsive web application where a user can type or paste Bangla, English, or mixed Bangla–English text and convert it into natural, accurate, studio-quality speech with instant playback and MP3 download.

### Must-Have Features (MVP)
- **Smart Bilingual Input**: Supports Unicode Bangla, English, and mixed Bangla–English text with automatic language detection.
- **Accurate Pronunciation**: Proper handling of Bangla punctuation (।), conjuncts (juktakkhor), numbers, and mixed-language sentences via SSML/text normalization.
- **Voice Selection**: Native Bangladeshi Bangla voices (`bn-BD` Male & Female) plus natural English voices (`en-US` / `en-GB`).
- **Voice Controls**: Adjustable speaking speed (0.5x to 2.0x) and pitch controls.
- **Audio Player & Download**: Built-in audio player (play, pause, seek, replay) and one-click .mp3 download.
- **Recent History**: Save the last 10 generated clips in the browser so users can replay or re-download them easily.

---

## 2. Recommended Tech Stack
- **Framework**: Next.js (App Router) + TypeScript
- **Styling & Fonts**: Tailwind CSS + Noto Sans Bengali & Inter
- **Primary TTS Engine**: Azure Speech / Edge Neural TTS (bn-BD-NabanitaNeural, bn-BD-PradeepNeural, en-US-AvaMultilingualNeural, etc.)
- **Alternative TTS Engines**: Gemini API TTS, ElevenLabs, Google Cloud TTS (modular provider adapter)
- **Storage**: Browser localStorage / IndexedDB for history
- **Deployment**: GitHub + Vercel

---

## 3. System Architecture
```
[User Browser (Next.js UI)]
  |-- Types Bangla / English text
  |-- Picks voice, speed, pitch
  v
[POST /api/tts (Next.js Route Handler)]
  |-- 1. Validate length & sanitize input
  |-- 2. Detect language (Bangla / English / Mixed)
  |-- 3. Normalize text & split long input into clean chunks
  |-- 4. Call TTS Provider Adapter (Azure Speech / Edge / Gemini / ElevenLabs)
  |-- 5. Return audio/mpeg stream or buffer + metadata
  v
[Browser Audio Player + MP3 Download + Local History]
```

---

## 4. Build Phases
- **Phase 1**: Project Scaffold & Bilingual UI Shell
- **Phase 2**: Text Preprocessing & Pronunciation Accuracy Engine
- **Phase 3**: Secure TTS Backend & Provider Adapter (Supports Free Edge-TTS & Azure/Gemini/ElevenLabs)
- **Phase 4**: Voice Controls, Custom Audio Player & Download
- **Phase 5**: History, UX Polish & Error Handling
- **Phase 6**: Pronunciation QA & GitHub / Vercel Deployment Prep
