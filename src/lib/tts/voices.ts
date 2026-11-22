import { VoiceOption } from './types';

export const SUPPORTED_VOICES: VoiceOption[] = [
  // ==========================================
  // ⚡ CARTESIA SONIC 3.5 FEATURED VOICE (Matching user URL)
  // ==========================================
  {
    id: '35b2cfc1-e6fb-4d69-a598-c1780612be4a',
    name: 'Darío (Steady Operator)',
    nativeName: 'Darío — Steady Operator (Cartesia Sonic 3.5)',
    gender: 'male',
    locale: 'en-US',
    languageLabel: 'Cartesia Sonic 3.5',
    badge: '⚡ Sonic 3.5 (Selected)',
    category: 'storyteller',
    isRecommended: true,
    description: 'Cartesia Sonic 3.5 মডেলের শান্ত, গম্ভীর ও অত্যন্ত সাবলীল স্টেডি পুরুষ কণ্ঠ (Speed 1.1x, Volume 2.0)',
    sampleText: 'Welcome to the Cartesia Sonic voice studio. Ultra-fast, ultra-natural neural speech synthesis.',
  },

  // ==========================================
  // 👨 BANGLA MALE VOICES (পুরুষ কণ্ঠ)
  // ==========================================
  {
    id: 'bn-IN-BashkarNeural',
    name: 'Bashkar (গল্পের কথক)',
    nativeName: 'ভাস্কর — গল্পের কথক (Storyteller)',
    gender: 'male',
    locale: 'bn-IN',
    languageLabel: 'বাংলা (গল্প ও অডিওবুক)',
    badge: '⭐ আপনার অডিও ডেমো',
    category: 'storyteller',
    demoAudioUrl: '/audio/storyteller-male-demo.wav',
    description: 'আপনার আপলোড করা অডিওর মতো শান্ত, গম্ভীর, নাটকীয় ও অত্যন্ত সাবলীল গল্পের কথক পুরুষ কণ্ঠ (অডিওবুক, ড্রামা ও সাসপেন্সের জন্য সেরা)',
    isRecommended: true,
    sampleText: 'শেষ ভরসা। সেদিন একটা স্কুল বাসের ব্রেক কাজ করা বন্ধ করে দিয়েছিল। মানুষের কাছে নিজের পরিচয় মুখে বলতে হয় না, নিজের কাজই একদিন পরিচয় তৈরি করে দেয়।',
  },

  {
    id: 'bn-BD-PradeepNeural',
    name: 'Pradeep',
    nativeName: 'প্রদীপ — গম্ভীর ও সংবাদ উপস্থাপক',
    gender: 'male',
    locale: 'bn-BD',
    languageLabel: 'বাংলা (বাংলাদেশ)',
    badge: '🎙️ সংবাদ ও উপস্থাপন',
    category: 'news',
    description: 'গম্ভীর, আত্মবিশ্বাসী ও পেশাদার পুরুষ কণ্ঠ (সংবাদ, উপস্থাপনা ও টিউটোরিয়ালের জন্য দারুণ)',
    isRecommended: true,
    sampleText: 'আমি প্রদীপ। প্রফেশনাল ও গম্ভীর বাংলা ভয়েস ওভারের জন্য আমার ভয়েস ব্যবহার করতে পারেন।',
  },

  {
    id: 'bn-IN-SoumyaNeural',
    name: 'Soumya',
    nativeName: 'সৌম্য — শান্ত ও অনুপ্রেরণামূলক',
    gender: 'male',
    locale: 'bn-IN',
    languageLabel: 'বাংলা (শান্ত বাচনভঙ্গি)',
    badge: '🌿 শান্ত ও ইতিবাচক',
    category: 'calm',
    description: 'ধীরস্থির, শান্ত ও অত্যন্ত শ্রুতিমধুর পুরুষ কণ্ঠ (মোটিভেশন, অডিওবুক ও মেডিটেশনের জন্য সেরা)',
    sampleText: 'জীবনের প্রতিটি পদক্ষেপে ধৈর্য ও নিষ্ঠাই মানুষের সবচেয়ে বড় শক্তি। শান্ত মনে চেষ্টা চালিয়ে যান।',
  },

  {
    id: 'bn-BD-ArjunNeural',
    name: 'Arjun',
    nativeName: 'অর্জুন — তারুণ্যদীপ্ত ও ভ্লগার',
    gender: 'male',
    locale: 'bn-BD',
    languageLabel: 'বাংলা (বাংলাদেশ)',
    badge: '⚡ উদ্যমী ও আধুনিক',
    category: 'energetic',
    description: 'চটপটে, উদ্যমী ও প্রাণবন্ত তরুণ কণ্ঠ (ইউটিউব ভিডিও, ভ্লগ ও বিজ্ঞাপনের জন্য উপযুক্ত)',
    sampleText: 'হ্যালো বন্ধুরা! আজকের ভিডিওতে আমরা দেখতে যাচ্ছি দারুণ একটি প্রযুক্তি, যা আপনার কাজকে সহজ করে তুলবে।',
  },

  {
    id: 'en-US-AndrewMultilingualNeural',
    name: 'Andrew (Multilingual)',
    nativeName: 'Andrew — Cinematic Male Narrator',
    gender: 'male',
    locale: 'en-US',
    languageLabel: 'English (US)',
    badge: '🎬 Cinematic Narrator',
    category: 'storyteller',
    description: 'Deep, cinematic, warm and resonant male narrator for podcasts, stories, and documentaries',
    isRecommended: true,
    sampleText: 'Welcome back. In today’s episode, we explore the boundaries of artificial intelligence and sound.',
  },

  // ==========================================
  // 👩 BANGLA & ENGLISH FEMALE VOICES (নারী কণ্ঠ)
  // ==========================================
  {
    id: 'bn-BD-NabanitaNeural',
    name: 'Nabanita',
    nativeName: 'নবনিতা — মিষ্টি ও সাবলীল নারী',
    gender: 'female',
    locale: 'bn-BD',
    languageLabel: 'বাংলা (বাংলাদেশ)',
    badge: '🌸 মিষ্টি ও স্পষ্ট',
    category: 'general',
    description: 'স্বাভাবিক, মিষ্টি ও অত্যন্ত স্পষ্ট নারী কণ্ঠ (ভিডিও, অডিওবুক ও বর্ণনার জন্য সেরা)',
    isRecommended: true,
    sampleText: 'আমি নবনিতা। সুন্দর ও স্পষ্ট বাংলা ভয়েস দিয়ে আপনার কনটেন্টকে আকর্ষণীয় করে তুলুন।',
  },

  {
    id: 'bn-IN-TanishaaNeural',
    name: 'Tanishaa',
    nativeName: 'তানিশা — মার্জিত উপস্থাপিকা',
    gender: 'female',
    locale: 'bn-IN',
    languageLabel: 'বাংলা (ভারত)',
    badge: '✨ স্পষ্ট উপস্থাপনা',
    category: 'news',
    description: 'শ্রুতিমধুর ও সাবলীল রেডিও উপস্থাপিকা বাচনভঙ্গি',
    sampleText: 'নমস্কার, আমি তানিশা। আপনার যেকোনো লেখার জন্য স্টুডিও মানের স্পষ্ট কন্ঠ।',
  },

  {
    id: 'bn-BD-AnanyaNeural',
    name: 'Ananya',
    nativeName: 'অনন্যা — আবেগঘন ও কবিতা আবৃত্তি',
    gender: 'female',
    locale: 'bn-BD',
    languageLabel: 'বাংলা (বাংলাদেশ)',
    badge: '📖 কবিতা ও গল্প',
    category: 'calm',
    description: 'কোমল, আবেগঘন ও কাব্যিক বাচনভঙ্গি (কবিতা, রোমান্টিক গল্প ও স্মৃতিকথার জন্য সেরা)',
    sampleText: 'বৃষ্টিভেজা একাকী বিকেলে স্মৃতির জানালায় দাঁড়িয়ে থাকে একরাশ না বলা কথা।',
  },

  {
    id: 'en-US-AvaMultilingualNeural',
    name: 'Ava (Multilingual)',
    nativeName: 'Ava — Multilingual Studio Female',
    gender: 'female',
    locale: 'en-US',
    languageLabel: 'English (US)',
    badge: '🌐 Multilingual Studio',
    category: 'general',
    description: 'Natural, expressive multilingual studio voice with perfect cadence',
    isRecommended: true,
    sampleText: 'Hello! I am Ava. I can read your English and mixed text smoothly with natural intonation.',
  },
];

export const DEFAULT_VOICE_ID = '35b2cfc1-e6fb-4d69-a598-c1780612be4a'; // Matches Cartesia URL default!

export function getVoiceById(voiceId: string): VoiceOption {
  const voice = SUPPORTED_VOICES.find((v) => v.id === voiceId);
  return voice || SUPPORTED_VOICES[0];
}
