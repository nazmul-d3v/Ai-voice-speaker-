import { VoiceOption } from './types';

export const SUPPORTED_VOICES: VoiceOption[] = [
  // ==========================================
  // 👨 REAL HUMAN MALE VOICES (বাস্তব পুরুষ কণ্ঠ)
  // ==========================================
  {
    id: 'bn-BD-PradeepStoryNeural',
    name: 'Deep Emotional Male (Bangla)',
    nativeName: 'Deep Emotional Male (Bangla) — প্রদীপ',
    gender: 'male',
    locale: 'bn-BD',
    languageLabel: 'বাংলা (Deep Emotional Storytelling)',
    badge: '🔥 Deep Emotional (-10% / -5Hz)',
    category: 'storyteller',
    defaultRate: 0.90, // rate="-10%"
    defaultPitch: -5,  // pitch="-5Hz"
    demoAudioUrl: '/audio/pradeep-storyteller-demo.mp3',
    description: 'Deep, warm, calm, emotional male storytelling voice using Microsoft Edge TTS (bn-BD-PradeepNeural) tuned to rate="-10%" & pitch="-5Hz" for a slower, deeper, emotional audiobook narration feel.',
    isRecommended: true,
    sampleText: 'ঝড় থেমে গেছে। চারপাশ নিস্তব্ধ। কিন্তু বুকের ভেতর জমে থাকা না-বলা কথাগুলো যেন আজও এক শান্ত নদীর মতো বয়ে চলেছে। মানুষের আসল শক্তি তার নীরব ধৈর্যে।',
  },

  {
    id: 'bn-IN-BashkarNeural',
    name: 'ভাস্কর (বাস্তব গল্পের কথক)',
    nativeName: 'ভাস্কর — বাস্তব গল্পের কথক (Storyteller Male)',
    gender: 'male',
    locale: 'bn-IN',
    languageLabel: 'বাংলা (গল্প ও অডিওবুক)',
    badge: '⭐ ১০০% বাস্তব মানুষের কণ্ঠ (Male)',
    category: 'storyteller',
    demoAudioUrl: '/audio/storyteller-male-demo.wav',
    description: 'আপনার দেওয়া অডিওর মতো শান্ত, গম্ভীর, নাটকীয় ও বাস্তবসম্মত মানুষের বাচনভঙ্গি (অডিওবুক, ড্রামা ও সাসপেন্সের জন্য সেরা)',
    isRecommended: true,
    sampleText: 'শেষ ভরসা। সেদিন একটা স্কুল বাসের ব্রেক কাজ করা বন্ধ করে দিয়েছিল। মানুষের কাছে নিজের পরিচয় মুখে বলতে হয় না, নিজের কাজই একদিন পরিচয় তৈরি করে দেয়।',
  },

  // ==========================================
  // 👩 REAL HUMAN FEMALE VOICES (বাস্তব নারী কণ্ঠ)
  // ==========================================
  {
    id: 'bn-BD-NabanitaNeural',
    name: 'নবনিতা (বাস্তব মিষ্টি নারী)',
    nativeName: 'নবনিতা — বাস্তব মিষ্টি নারী (Natural Female)',
    gender: 'female',
    locale: 'bn-BD',
    languageLabel: 'বাংলা (বাংলাদেশ)',
    badge: '🌸 ১০০% বাস্তব মানুষের কণ্ঠ (Female)',
    category: 'general',
    demoAudioUrl: '/audio/nabanita-female-demo.mp3',
    description: 'সম্পূর্ণ স্বাভাবিক, মিষ্টি, প্রাণবন্ত ও বাস্তবসম্মত বাংলাদেশি নারী কণ্ঠ (ভিডিও, অডিওবুক ও কন্টেন্ট তৈরি)',
    isRecommended: true,
    sampleText: 'নমস্কার। আমি নবনিতা। আমার কণ্ঠ সম্পূর্ণ প্রাকৃতিক, মিষ্টি এবং বাস্তবসম্মত মানুষের মতো বাচনভঙ্গিতে সাজানো।',
  },

  {
    id: 'bn-BD-PradeepNeural',
    name: 'প্রদীপ (সংবাদ ও উপস্থাপক)',
    nativeName: 'প্রদীপ — গম্ভীর সংবাদ ও উপস্থাপক',
    gender: 'male',
    locale: 'bn-BD',
    languageLabel: 'বাংলা (বাংলাদেশ)',
    badge: '🎙️ স্পষ্ট ও প্রফেশনাল',
    category: 'news',
    demoAudioUrl: '/audio/pradeep-male-demo.mp3',
    description: 'গম্ভীর, আত্মবিশ্বাসী ও অত্যন্ত স্পষ্ট প্রফেশনাল উপস্থাপক পুরুষ কণ্ঠ (সংবাদ, টিউটোরিয়াল ও ডকুমেন্টারি)',
    isRecommended: true,
    sampleText: 'আমি প্রদীপ। গম্ভীর, স্পষ্ট এবং পেশাদার উপস্থাপনার জন্য আমার কণ্ঠ মানুষের মতোই স্বাভাবিক ও স্পষ্ট।',
  },

  {
    id: 'bn-IN-TanishaaNeural',
    name: 'তানিশা (রেডিও উপস্থাপিকা)',
    nativeName: 'তানিশা — মার্জিত উপস্থাপিকা (Radio Presenter)',
    gender: 'female',
    locale: 'bn-IN',
    languageLabel: 'বাংলা (ভারত)',
    badge: '✨ মার্জিত ও মিষ্টি',
    category: 'news',
    description: 'শ্রুতিমধুর, স্পষ্ট ও বাস্তবসম্মত রেডিও উপস্থাপিকা বাচনভঙ্গি',
    sampleText: 'নমস্কার, আমি তানিশা। আপনার যেকোনো লেখার জন্য স্টুডিও মানের স্পষ্ট ও স্বাভাবিক কণ্ঠ।',
  },

  // ==========================================
  // ⚡ CARTESIA SONIC 3.5 VOICES (play.cartesia.ai)
  // ==========================================
  {
    id: '35b2cfc1-e6fb-4d69-a598-c1780612be4a',
    name: 'Darío (Steady Operator)',
    nativeName: 'Darío — Steady Operator (Cartesia Sonic 3.5)',
    gender: 'male',
    locale: 'en-US',
    languageLabel: 'Cartesia Sonic 3.5',
    badge: '⚡ Sonic 3.5 Featured',
    category: 'storyteller',
    defaultRate: 0.90, // speed=0.9 from user URL
    defaultPitch: 0,
    isRecommended: true,
    description: 'Cartesia Sonic 3.5 মডেলের স্টেডি ও গম্ভীর পুরুষ কণ্ঠ (Castilian/Multilingual Steady Operator)',
    sampleText: 'Welcome to the Cartesia Sonic playground. I am Darío, a steady and articulate voice operator designed for ultra-low latency, studio-quality speech generation.',
  },

  {
    id: '694f9389-aac1-45b6-b726-9d9369183238',
    name: 'Sarah (Helpful Conversationalist)',
    nativeName: 'Sarah — Conversational Host (Cartesia Sonic)',
    gender: 'female',
    locale: 'en-US',
    languageLabel: 'Cartesia Sonic 3.5',
    badge: '⚡ Cartesia Conversational',
    category: 'general',
    defaultRate: 1.0,
    defaultPitch: 0,
    isRecommended: true,
    description: 'Cartesia Sonic-এর মিষ্টি ও প্রাণবন্ত কথোপকথন নারী কণ্ঠ (Helpful & Friendly Conversationalist)',
    sampleText: 'Hello there! I am Sarah, a friendly conversational voice from the Cartesia Sonic model library, ready to assist you.',
  },

  {
    id: 'a0e99841-438c-4a64-b679-ae501e7d6091',
    name: 'Barbershop Man (Cinematic Narrator)',
    nativeName: 'Barbershop Man — Cinematic Narrator (Cartesia)',
    gender: 'male',
    locale: 'en-US',
    languageLabel: 'Cartesia Sonic 3.5',
    badge: '⚡ Cartesia Narrator',
    category: 'storyteller',
    defaultRate: 0.95,
    defaultPitch: -2,
    isRecommended: true,
    description: 'Cartesia Sonic-এর গভীর, উষ্ণ ও সিনেমাটিক গল্পের কথক (Warm & Rich Barbershop Storyteller)',
    sampleText: 'Gather around. Every great story begins with a single step into the unknown. Let me tell you about what happened that evening.',
  },

  {
    id: 'd8092b2a-281b-4e15-bfc4-299cec5eb1da',
    name: 'Daniel (Modern Assistant)',
    nativeName: 'Daniel — Modern Assistant (Cartesia)',
    gender: 'male',
    locale: 'en-US',
    languageLabel: 'Cartesia Sonic 3.5',
    badge: '⚡ Cartesia AI Assistant',
    category: 'general',
    defaultRate: 1.0,
    defaultPitch: 0,
    description: 'Cartesia Sonic-এর সাবলীল ও আধুনিক ভার্চুয়াল অ্যাসিস্ট্যান্ট (Clear, Crisp & Professional Male)',
    sampleText: 'Good day! I am Daniel, your AI assistant powered by Cartesia Sonic. How can I help you today?',
  },

  {
    id: '79a125e8-cd45-4c13-8a67-188112f4dd22',
    name: 'Brooke (Expressive Host)',
    nativeName: 'Brooke — Expressive Host (Cartesia)',
    gender: 'female',
    locale: 'en-US',
    languageLabel: 'Cartesia Sonic 3.5',
    badge: '⚡ Cartesia Host',
    category: 'news',
    defaultRate: 1.0,
    defaultPitch: 0,
    description: 'Cartesia Sonic-এর ডায়নামিক, স্পষ্ট ও আকর্ষণীয় নারী উপস্থাপক (Dynamic & Expressive Female Host)',
    sampleText: 'Welcome to today’s broadcast! We have some incredible technology and audio breakthroughs to share with you.',
  },

  {
    id: '820a3788-2b37-4d21-847a-b65d8a68c99a',
    name: 'Sofia (Mindful Meditation)',
    nativeName: 'Sofia — Mindful Meditation (Cartesia)',
    gender: 'female',
    locale: 'en-US',
    languageLabel: 'Cartesia Sonic 3.5',
    badge: '⚡ Cartesia Calm',
    category: 'calm',
    defaultRate: 0.85,
    defaultPitch: -2,
    description: 'Cartesia Sonic-এর শান্ত, শিথিল ও মাইন্ডফুল মেডিটেশন নারী কণ্ঠ (Soft, Gentle & Soothing Female)',
    sampleText: 'Take a deep breath in, hold it for a moment, and gently let it go. Relax your shoulders and find your peace.',
  },

  {
    id: 'en-US-AndrewMultilingualNeural',
    name: 'Andrew (Cinematic Male)',
    nativeName: 'Andrew — Ultra-Realistic Cinematic Male',
    gender: 'male',
    locale: 'en-US',
    languageLabel: 'English (US)',
    badge: '🎬 Studio Human Male',
    category: 'storyteller',
    description: 'Deep, cinematic, warm and resonant human-sounding male narrator for podcasts, stories, and documentaries',
    isRecommended: true,
    sampleText: 'Welcome back. In today’s episode, we explore the boundaries of artificial intelligence and sound.',
  },

  {
    id: 'en-US-AvaMultilingualNeural',
    name: 'Ava (Studio Female)',
    nativeName: 'Ava — Ultra-Realistic Studio Female',
    gender: 'female',
    locale: 'en-US',
    languageLabel: 'English (US)',
    badge: '🌐 Studio Human Female',
    category: 'general',
    description: 'Natural, expressive human-like multilingual studio voice with perfect cadence and breathing',
    isRecommended: true,
    sampleText: 'Hello! I am Ava. I can read your English and mixed text smoothly with natural human intonation.',
  },

  {
    id: 'bn-IN-SoumyaNeural',
    name: 'সৌম্য (শান্ত ও অনুপ্রেরণামূলক)',
    nativeName: 'সৌম্য — শান্ত ও অনুপ্রেরণামূলক',
    gender: 'male',
    locale: 'bn-IN',
    languageLabel: 'বাংলা (শান্ত বাচনভঙ্গি)',
    badge: '🌿 শান্ত ও মেডিটেশন',
    category: 'calm',
    description: 'ধীরস্থির, শান্ত ও অত্যন্ত শ্রুতিমধুর পুরুষ কণ্ঠ (মোটিভেশন, অডিওবুক ও মেডিটেশন)',
    sampleText: 'জীবনের প্রতিটি পদক্ষেপে ধৈর্য ও নিষ্ঠাই মানুষের সবচেয়ে বড় শক্তি। শান্ত মনে চেষ্টা চালিয়ে যান।',
  },

  {
    id: 'bn-BD-AnanyaNeural',
    name: 'অনন্যা (আবেগঘন ও আবৃত্তি)',
    nativeName: 'অনন্যা — আবেগঘন ও কবিতা আবৃত্তি',
    gender: 'female',
    locale: 'bn-BD',
    languageLabel: 'বাংলা (বাংলাদেশ)',
    badge: '📖 কবিতা ও অনুভূতি',
    category: 'calm',
    description: 'কোমল, আবেগঘন ও কাব্যিক বাচনভঙ্গি (কবিতা, রোমান্টিক গল্প ও স্মৃতিকথা)',
    sampleText: 'বৃষ্টিভেজা একাকী বিকেলে স্মৃতির জানালায় দাঁড়িয়ে থাকে একরাশ না বলা কথা।',
  },
];

export const DEFAULT_VOICE_ID = 'bn-IN-BashkarNeural'; // Default to the ultra-realistic storyteller male voice!

export function getVoiceById(voiceId: string): VoiceOption {
  const voice = SUPPORTED_VOICES.find((v) => v.id === voiceId);
  return voice || SUPPORTED_VOICES[0];
}
