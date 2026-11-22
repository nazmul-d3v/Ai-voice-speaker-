# 🎙️ Ai-Spicker Sonic Play — Ultra-Realistic Bangla & English AI Voice Generator

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-15.5-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)
![Vercel Ready](https://img.shields.io/badge/Vercel-Deploy%20Ready-000000?style=for-the-badge&logo=vercel)
![License](https://img.shields.io/badge/License-MIT-success?style=for-the-badge)

**বাংলা ও ইংরেজি বাস্তবসম্মত মানুষের মতো স্টুডিও কোয়ালিটি টেক্সট-টু-স্পিচ (TTS) প্ল্যাটফর্ম**  
*Inspired by Cartesia Sonic 3.5 Playground & Neural Speech Synthesis*

[লাইভ ডেমো ও ফিচারসমূহ](#-মূল-বৈশিষ্ট্যসমূহ) • [লোকাল সেটআপ](#-লোকাল-সেটআপ-গাইড) • [গিটহাব ও ভার্সেল ডেপ্লয়](#-গিটহাব--ভার্সেল-ডেপ্লয়-গাইড) • [এপিআই ডকুমেন্টেশন](#-api-ব্যবহারের-নিয়ম)

</div>

---

## 🌟 ওভারভিউ (Project Overview)

**Ai-Spicker** হলো একটি আধুনিক ফুল-স্ট্যাক ওয়েব অ্যাপ্লিকেশন, যার মাধ্যমে যেকোনো বাংলা, ইংরেজি বা বাংলিশ (Mixed Bangla-English) টেক্সটকে **রোবোটিক কৃত্রিমতা ছাড়া একদম রক্ত-মাংসের মানুষের মতো বাস্তবসম্মত স্টুডিও কণ্ঠে** রূপান্তর করা যায়। 

এতে কার্তেসিয়া সোনিক ৩.৫ (Cartesia Sonic 3.5) প্লে-গ্রাউন্ডের আদলে আল্ট্রা-লো লেটেন্সি ডিজাইন, ৯৬kbps স্টুডিও এইচডি অডিও, মানুষের স্বাভাবিক শ্বাস-প্রশ্বাসের বিরতি (Human Breath & Pause Engine) এবং এক-ক্লিকে MP3 ডাউনলোড সুবিধা অন্তর্ভুক্ত রয়েছে।

---

## ✨ মূল বৈশিষ্ট্যসমূহ (Key Features)

### 🎙️ ১০০% বাস্তব মানুষের কণ্ঠ (Zero-Robotic Sound)
- **👨 ভাস্কর — বাস্তব গল্পের কথক (Storyteller Male):** গভীর, শান্ত, নাটকীয় ও অত্যন্ত সাবলীল পুরুষ কণ্ঠ (অডিওবুক, সাসপেন্স ও ড্রামা ভিডিওর জন্য সেরা—"শেষ ভরসা" গল্পের স্টাইলের কণ্ঠ)।
- **🌸 নবনিতা — বাস্তব মিষ্টি ও সাবলীল নারী (Natural Female):** মিষ্টি, প্রাণবন্ত ও বাস্তবসম্মত বাংলাদেশি নারী কণ্ঠ (ভিডিও ডাবিং, প্রেজেন্টেশন ও রিলস/শর্টসের জন্য আদর্শ)।
- **🎙️ প্রদীপ — প্রফেশনাল সংবাদ ও উপস্থাপক (News & Presenter):** আত্মবিশ্বাসী ও গম্ভীর সংবাদ উপস্থাপনা পুরুষ কণ্ঠ।
- **⚡ Darío (Cartesia Sonic 3.5):** কার্তেসিয়া সোনিক ৩.৫ মডেলের সাবলীল স্টেডি পুরুষ কণ্ঠ।
- **🎬 Andrew & Ava (Multilingual Studio):** আন্তর্জাতিক মানের সিনেমাটিক ইংলিশ ও মাল্টিলিঙ্গুয়াল মেল এবং ফিমেল কণ্ঠ।

### ⚡ কার্তেসিয়া সোনিক ৩.৫ প্লে-গ্রাউন্ড ইন্টারফেস
- **৯৬kbps Studio HD Audio:** সাধারণ ৪৮kbps-এর পরিবর্তে ৯৬kbps হাই-বিটরেট স্টুডিও অডিও, যা রোবোটিক টিনটিনে নয়েজ দূর করে গভীর ও স্পষ্ট সাউন্ড দেয়।
- **Human Speech Cadence Engine:** দাঁড়ি (`।`), কমা (`,`), প্রশ্নবোধক (`?`) এবং অনুচ্ছেদ বিভাজনের পর স্বয়ংক্রিয়ভাবে স্বাভাবিক মানুষের মতো মাইক্রো-পজ (breath pauses) তৈরি করে।
- **রিয়েলিজম প্রিসেট চিপস:**
  - 🎙️ **বাস্তব মানুষ (Natural):** `1.00x` Speed, `1.0` Volume (স্বাভাবিক মানুষের বাচনভঙ্গি)
  - 📖 **গভীর কথক (Story):** `0.95x` Speed, `1.0` Volume (রহস্য ও গল্পের গভীরতা)
  - ⚡ **সোনিক ফাস্ট (Sonic 1.1x):** `1.10x` Speed, `2.0` Volume (কার্তেসিয়া দ্রুত মোড)

### 🎛️ অ্যাডভান্সড প্লেয়ার ও ম্যানেজমেন্ট
- **কাস্টম অডিও প্লেয়ার:** প্লে/পজ, লাইভ অডিও ওয়েভফর্ম অ্যানিমেশন, স্ক্রাবার সিক-বার এবং রি-প্লে সুবিধা।
- **১-ক্লিক MP3 ডাউনলোড:** কোনো ওয়াটারমার্ক ছাড়াই সরাসরি হাই-কোয়ালিটি `.mp3` ফাইল ডাউনলোড।
- **লোকাল হিস্টোরি (Recent 10 Clips):** ব্রাউজার রিলোড করলেও শেষ ১০টি অডিও সেভ থাকে; যেকোনো সময় পুনরায় প্লে ও ডাউনলোড করা যায়।
- **প্লাগেবল ইঞ্জিন আর্কিটেকচার:** কোনো API Key ছাড়াই স্বয়ংক্রিয়ভাবে Edge Neural TTS দিয়ে লাইভ চলবে। প্রয়োজনে `.env.local` থেকে Azure Speech, Gemini API বা ElevenLabs-এ সুইচ করা সম্ভব।

---

## 🛠️ টেক স্ট্যাক (Tech Stack)

| Layer | Technology | Details |
| :--- | :--- | :--- |
| **Framework** | **Next.js 15 (App Router)** | সার্ভার ও ক্লায়েন্ট সাইড রেন্ডারিং |
| **Language** | **TypeScript 5** | টাইপ-সেফ ও বাগ-ফ্রি কোডবেস |
| **Styling** | **Tailwind CSS** | ডার্ক থিম, প্রিমিয়াম গ্লাস-মরফিজম ও অ্যানিমেশন |
| **Icons** | **Lucide React** | মিনিমালিস্ট আধুনিক ভেক্টর আইকন |
| **TTS Core Engine** | **Edge Neural TTS (96kbps HD)** | জিরো-কনফিগ, ফ্রি ও আনলিমিটেড স্টুডিও কোয়ালিটি |
| **Alternative Engines** | **Azure Speech / Gemini / ElevenLabs**| মডুলার অ্যাডাপ্টার প্যাটার্ন |
| **Audio Processing**| **HTML5 Audio + Webpack Native ws** | ক্র্যাশ-প্রুফ অডিও প্লেব্যাক ও স্ট্রিমিং |
| **Deployment** | **Vercel + GitHub** | অটোমেটিক সিআই/সিডি প্রোডাকশন ডেপ্লয়মেন্ট |

---

## 🚀 লোকাল সেটআপ গাইড (How to Run Locally)

### ১. রিপোজিটরি ক্লোন করুন
```bash
git clone https://github.com/your-username/Ai-Spicker.git
cd Ai-Spicker
```

### ২. ডিপেন্ডেন্সি ইনস্টল করুন
```bash
npm install
```

### ৩. এনভায়রনমেন্ট ফাইল কনফিগারেশন (ঐচ্ছিক)
অ্যাপ্লিকেশনটিতে জিরো-কনফিগারেশন মোড চালু আছে, তাই কোনো API Key ছাড়াই এটি সম্পূর্ণ ফ্রি-তে ৯৬kbps স্টুডিও সাউন্ড তৈরি করতে পারে।  
তবে আপনি চাইলে প্রজেক্টের রুটে `.env.local` ফাইলে অন্যান্য প্রোভাইডার সেট করতে পারেন:
```env
# ডিফল্ট ফ্রি স্টুডিও ইঞ্জিন (edge) অথবা azure, gemini, elevenlabs
TTS_PROVIDER=edge

# ঐচ্ছিক Azure Speech সেটিংস (যদি Azure ব্যবহার করতে চান)
AZURE_SPEECH_KEY=your_azure_speech_key_here
AZURE_SPEECH_REGION=eastus

# ঐচ্ছিক Google Gemini API Key
GEMINI_API_KEY=your_gemini_api_key_here

# ঐচ্ছিক ElevenLabs Key
ELEVENLABS_API_KEY=your_elevenlabs_api_key_here
```

### ৪. ডেভেলপমেন্ট অথবা প্রোডাকশন সার্ভার চালু করুন
```bash
# ডেভেলপমেন্ট মোড
npm run dev

# অথবা প্রোডাকশন বিল্ড ও রান
npm run build
npm start
```

ব্রাউজারে **[http://localhost:3000](http://localhost:3000)** ওপেন করলেই ওয়েবসাইটটি দেখতে পাবেন।

---

## 🌐 গিটহাব ও ভার্সেল ডেপ্লয় গাইড (GitHub & Vercel Deployment)

এই ওয়েবসাইটটি সরাসরি গিটহাব এবং ভার্সেলে ডেপ্লয় করার জন্য ১০০% প্রস্তুত।

### ধাপ ১: GitHub-এ কোড পুশ করুন
```bash
git add .
git commit -m "feat: launch ultra-realistic Ai-Spicker Sonic TTS"
git branch -M main
git remote add origin https://github.com/<your-username>/Ai-Spicker.git
git push -u origin main
```

### ধাপ ২: Vercel-এ ১-ক্লিকে ডেপ্লয় করুন
1. [Vercel](https://vercel.com)-এ যান এবং GitHub অ্যাকাউন্ট দিয়ে সাইন-ইন করুন।
2. **"Add New..."** বাটনে ক্লিক করে **"Project"** সিলেক্ট করুন।
3. আপনার `Ai-Spicker` রিপোজিটরিটি সিলেক্ট করে **"Import"**-এ ক্লিক করুন।
4. **Build and Output Settings** স্বয়ংক্রিয়ভাবে `Next.js` শনাক্ত করবে।
5. **"Deploy"** বাটনে ক্লিক করুন।  
   ১-২ মিনিটের মধ্যে আপনার ওয়েবসাইট বিশ্বব্যাপী দ্রুতগতির ফ্রি ডোমেইনে লাইভ হয়ে যাবে! 🎉

---

## 🔌 API ব্যবহারের নিয়ম (REST API Usage)

Ai-Spicker ব্যাকএন্ডে একটি সুরক্ষিত ও দ্রুতগতির TTS এন্ডপয়েন্ট রয়েছে যা যেকোনো অ্যাপ, মোবাইল প্রজেক্ট বা পাইথন স্ক্রিপ্ট থেকে ব্যবহার করা যায়।

### cURL কমান্ড উদাহরণ:
```bash
curl -X POST "http://localhost:3000/api/tts" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "শেষ ভরসা। নিজের কাজই মানুষের আসল পরিচয় তৈরি করে দেয়।",
    "voiceId": "bn-IN-BashkarNeural",
    "rate": 1.0,
    "volume": 1.0,
    "pitch": 0
  }' \
  --output speech.mp3
```

### রিকোয়েস্ট প্যারামিটারসমূহ:
| ফিল্ড | টাইপ | ডিফল্ট | বিবরণ |
| :--- | :--- | :--- | :--- |
| `text` | `string` | *(আবশ্যক)* | বাংলা বা ইংরেজি টেক্সট (সর্বোচ্চ ৩,০০০ অক্ষর) |
| `voiceId` | `string` | `bn-IN-BashkarNeural` | কণ্ঠের আইডি (যেমন: `bn-IN-BashkarNeural`, `bn-BD-NabanitaNeural`) |
| `rate` | `number` | `1.0` | পড়ার গতি (`0.5` থেকে `2.0`, মানুষের স্বাভাবিক গতি `1.0`) |
| `volume` | `number` | `1.0` | শব্দের তীব্রতা (`0.5` থেকে `2.5`, স্বাভাবিক `1.0`) |
| `pitch` | `number` | `0` | গলার সুর (`-10` থেকে `+10`) |

---

## 📂 প্রজেক্ট ফাইল স্ট্রাকচার (Project Structure)

```
Ai-Spicker/
├── public/
│   ├── audio/
│   │   ├── storyteller-male-demo.wav   # শেষ ভরসা অডিও ডেমো (ভাস্কর)
│   │   ├── nabanita-female-demo.mp3    # নবনিতা রিয়েল ফিমেল ডেমো
│   │   └── pradeep-male-demo.mp3       # প্রদীপ সংবাদ ডেমো
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── tts/
│   │   │       └── route.ts            # Secure Next.js TTS Route Handler
│   │   ├── globals.css                 # Custom fonts, animations & styling
│   │   ├── layout.tsx                  # Root layout with suppressHydration
│   │   └── page.tsx                    # Cartesia Sonic Studio UI
│   ├── components/
│   │   ├── AudioPlayer.tsx             # Crash-proof HTML5 waveform player
│   │   ├── Header.tsx                  # Top branding & latency status
│   │   └── HistoryList.tsx             # Saved clips manager
│   └── lib/
│       ├── storage.ts                  # LocalStorage persistent store
│       ├── textProcessor.ts            # Human speech cadence & punctuation
│       ├── ssmlBuilder.ts              # W3C SSML generator
│       └── tts/
│           ├── types.ts                # TypeScript interfaces & types
│           ├── voices.ts               # Supported voices list & presets
│           ├── edgeProvider.ts         # 96kbps HD Neural TTS Provider
│           ├── azureProvider.ts        # Azure Speech SDK Provider
│           ├── geminiProvider.ts       # Gemini API TTS Provider
│           ├── elevenlabsProvider.ts   # ElevenLabs Provider
│           └── index.ts                # Master Pluggable Provider Router
├── next.config.mjs                     # ServerExternalPackages for Webpack
├── ROADMAP.md                          # 6-phase engineering roadmap
└── README.md                           # Documentation
```

---

## 🤝 অবদান ও লাইসেন্স (Contribution & License)

যেকোনো বাগ রিপোর্ট, পুল রিকোয়েস্ট বা নতুন ফিচারের আইডিয়া স্বাগত জানানো হচ্ছে।  
এই প্রজেক্টটি [MIT License](LICENSE)-এর অধীনে মুক্তভাবে ব্যবহার ও পরিবর্ধনযোগ্য।

<div align="center">
  <sub>Made with ❤️ for Bangla & English Content Creators. Inspired by Cartesia Sonic 3.5.</sub>
</div>
