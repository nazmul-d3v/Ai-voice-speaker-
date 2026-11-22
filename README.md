# 🎙️ Ai-Spicker — Bangla & English AI Voice Generator (TTS)

> **বাংলা ও ইংরেজি স্টুডিও কোয়ালিটি টেক্সট-টু-স্পিচ (TTS) ওয়েব অ্যাপ্লিকেশন**  
> Built with Next.js (App Router), TypeScript, Tailwind CSS, Azure Speech Neural Voices, and a pluggable multi-provider architecture.

![License](https://img.shields.io/badge/license-MIT-green.svg)
![Next.js](https://img.shields.io/badge/Next.js-15-black.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue.svg)
![Vercel Ready](https://img.shields.io/badge/Vercel-Deployment%20Ready-success.svg)

---

## ✨ Features (মূল সুবিধাসমূহ)

- 🇧🇩 **Smart Bilingual Input**: বাংলা, English এবং মিশ্রিত বাংলিশ (Mixed Bangla–English) টেক্সট স্বয়ংক্রিয়ভাবে শনাক্ত (Auto Language Detection) করে।
- 🎙️ **Studio Quality Voices**:
  - **Bangla (Bangladesh)**: `bn-BD-NabanitaNeural` (নারী কণ্ঠ) & `bn-BD-PradeepNeural` (পুরুষ কণ্ঠ)।
  - **Bangla (India)**: `bn-IN-TanishaaNeural` & `bn-IN-BashkarNeural`।
  - **English (US/UK)**: `en-US-AvaMultilingualNeural`, `en-US-AndrewMultilingualNeural`, `en-GB-SoniaNeural` ইত্যাদি।
- 🎛️ **Voice Speed & Pitch Controls**: গতি (0.5x থেকে 2.0x) এবং পিচ (-10% থেকে +10%) সহজে পরিবর্তনযোগ্য।
- 🎵 **Studio Audio Player**: কাস্টম ওয়েভফর্ম এনিমেশন, সিকবার, রি-প্লে, ভলিউম কন্ট্রোল এবং প্লে-স্পিড অপশন।
- 💾 **One-Click MP3 Download**: নিখুঁত স্টুডিও মানের `.mp3` ফাইল এক ক্লিকে সরাসরি ডাউনলোড করার সুবিধা।
- 📜 **Recent History**: ব্রাউজারে শেষ ১০টি তৈরি অডিও ক্লিপ স্বয়ংক্রিয়ভাবে সংরক্ষিত থাকে যা রিলোড করার পরেও প্লে ও রি-ডাউনলোড করা যায়।
- ⚡ **Instant Zero-Config Fallback**: কোনো API কি (Key) ছাড়াই তাৎক্ষণিকভাবে কাজ করে; পরবর্তীতে Azure Speech / Gemini Key বসালে সর্বোচ্চ স্টুডিও কোয়ালিটিতে আপগ্রেড হয়।
- ⌨️ **Keyboard Shortcut**: `Ctrl + Enter` (বা Mac এ `Cmd + Enter`) চাপলে সাথে সাথে ভয়েস তৈরি হয়।

---

## 🚀 How to Run Locally (কম্পিউটারে চালানোর নিয়ম)

### ১. রিপোজিটরি ক্লোন বা ফোল্ডারে প্রবেশ করুন:
```bash
git clone https://github.com/your-username/Ai-Spicker.git
cd Ai-Spicker
```

### ২. ডিপেন্ডেন্সি ইনস্টল করুন:
```bash
npm install
```

### ৩. এনভায়রনমেন্ট ভেরিয়েবল সেটআপ করুন (ঐচ্ছিক):
প্রজেক্টের রুটে `.env.local` ফাইল রয়েছে। আপনি চাইলে Azure Speech বা Gemini API কি বসাতে পারেন (না বসালেও স্বয়ংক্রিয় ফলব্যাক ভয়েস কাজ করবে):
```env
TTS_PROVIDER=azure
AZURE_SPEECH_KEY=your_azure_speech_key_here
AZURE_SPEECH_REGION=eastus
```

### ৪. লোকাল সার্ভার চালু করুন:
```bash
npm run dev
```
ব্রাউজারে [http://localhost:3000](http://localhost:3000) ওপেন করলেই ওয়েবসাইটটি দেখতে পাবেন।

---

## 🌐 Deploy to GitHub & Vercel (গিটহাব ও ভার্সেলে ডিপ্লয় করার নিয়ম)

### ধাপ ১: GitHub-এ কোড আপলোড করুন

১. টার্মিনালে নিচের কমান্ডগুলো চালান:
```bash
git init
git add .
git commit -m "feat: complete Bangla & English AI TTS platform"
git branch -M main
```

২. [GitHub.com](https://github.com)-এ গিয়ে একটি নতুন Repository তৈরি করুন (নাম দিন `Ai-Spicker` বা আপনার পছন্দমতো)।

৩. গিটহাবের রিমোট লিঙ্কটি যুক্ত করে পুশ করুন:
```bash
git remote add origin https://github.com/<your-username>/Ai-Spicker.git
git push -u origin main
```

---

### ধাপ ২: Vercel-এ ১-ক্লিকে ডিপ্লয় করুন

১. [Vercel.com](https://vercel.com)-এ যান এবং আপনার GitHub অ্যাকাউন্ট দিয়ে লগইন করুন।
২. **"Add New..."** বাটনে ক্লিক করে **"Project"** সিলেক্ট করুন।
৩. আপনার GitHub রিপোজিটরি (`Ai-Spicker`) সিলেক্ট করে **"Import"**-এ ক্লিক করুন।
৪. **Environment Variables** সেকশনে আপনার কিগুলো যোগ করুন (যদি Azure Speech ব্যবহার করতে চান):
   - `TTS_PROVIDER`: `azure`
   - `AZURE_SPEECH_KEY`: আপনার অ্যাজিউর কি
   - `AZURE_SPEECH_REGION`: যেমন `eastus`
   *(যদি কোনো কি না দেন, তবে অ্যাপটি ফ্রি ফলব্যাক মোডে স্বয়ংক্রিয়ভাবে কাজ করবে!)*
৫. **"Deploy"** বাটনে ক্লিক করুন। ২ মিনিটের মধ্যে আপনার লাইভ ওয়েবসাইট লিংক পেয়ে যাবেন! 🎉

---

## 📁 Project Structure (প্রজেক্ট কাঠামো)

```
Ai-Spicker/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── tts/
│   │   │       └── route.ts        # Secure Next.js TTS Route Handler
│   │   ├── globals.css             # Tailwind CSS & animations
│   │   ├── layout.tsx              # Root Layout with Bangla typography
│   │   └── page.tsx                # Main bilingual studio UI
│   ├── components/
│   │   ├── AudioPlayer.tsx         # Waveform audio player with MP3 download
│   │   ├── Header.tsx              # Navbar with logo & branding
│   │   └── HistoryList.tsx         # Saved clips with inline playback
│   └── lib/
│       ├── storage.ts              # LocalStorage persistent clip manager
│       ├── textProcessor.ts        # Language detector, punctuation & chunking
│       ├── ssmlBuilder.ts          # W3C SSML generator with <lang> tags
│       └── tts/
│           ├── types.ts            # Pluggable TTS interfaces
│           ├── voices.ts           # Bangla & English voice definitions
│           ├── azureProvider.ts    # Official Azure Speech SDK adapter
│           ├── geminiProvider.ts   # Google Gemini API adapter
│           ├── elevenlabsProvider.ts # ElevenLabs adapter
│           ├── fallbackProvider.ts # Instant zero-config MP3 adapter
│           └── index.ts            # Master TTS Provider Router
├── .env.example                    # Environment variable template
├── .env.local                      # Local keys configuration
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

---

## 🔑 Getting an Azure Speech Key (বিনামূল্যে অ্যাজিউর কি পাওয়ার নিয়ম)

১. [Microsoft Azure Portal](https://portal.azure.com)-এ যান।  
২. **Speech Services** সার্চ করুন এবং একটি ফ্রি F0 টিয়ার রিসোর্স তৈরি করুন।  
৩. রিসোর্সের **Keys and Endpoint** মেনু থেকে `Key 1` এবং `Region` কপি করে আপনার `.env.local` অথবা Vercel Environment Variables-এ বসিয়ে দিন।  

---

## 📄 License
This project is open source and available under the [MIT License](LICENSE).
