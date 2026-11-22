import { VoiceOption } from './types';

export const SUPPORTED_VOICES: VoiceOption[] = [
  // 1. Bangla Storyteller & Audiobook Narrator (Matches the user's uploaded story narration)
  {
    id: 'bn-IN-BashkarNeural',
    name: 'Bashkar (গল্পের কথক)',
    nativeName: 'ভাস্কর — গল্পের কথক (Storyteller)',
    gender: 'male',
    locale: 'bn-IN',
    languageLabel: 'Bangla (গল্প ও অডিওবুক)',
    badge: '⭐ গল্পের কথক (অডিওবুক)',
    category: 'storyteller',
    description: 'আপনার আপলোড করা অডিওর মতো শান্ত, গম্ভীর, নাটকীয় ও অত্যন্ত সাবলীল গল্পের কথক কণ্ঠ (অডিওবুক, রোমাঞ্চ ও ড্রামার জন্য সেরা)',
    isRecommended: true,
    sampleText: 'শেষ ভরসা। সেদিন একটা স্কুল বাসের ব্রেক কাজ করা বন্ধ করে দিয়েছিল... মানুষের কাজই একদিন তার পরিচয় তৈরি করে দেয়।',
  },

  // 2. Bangla (Bangladesh) Studio Voices
  {
    id: 'bn-BD-NabanitaNeural',
    name: 'Nabanita',
    nativeName: 'নবনিতা (নারী কণ্ঠ)',
    gender: 'female',
    locale: 'bn-BD',
    languageLabel: 'Bangla (Bangladesh)',
    badge: '🌸 মিষ্টি ও স্পষ্ট',
    category: 'general',
    description: 'স্বাভাবিক, মিষ্টি ও অত্যন্ত স্পষ্ট নারী কণ্ঠ (ভিডিও, অডিওবুক ও বর্ণনার জন্য সেরা)',
    isRecommended: true,
    sampleText: 'আমি নবনিতা। সুন্দর ও স্পষ্ট বাংলা ভয়েস দিয়ে আপনার কনটেন্টকে আকর্ষণীয় করে তুলুন।',
  },
  {
    id: 'bn-BD-PradeepNeural',
    name: 'Pradeep',
    nativeName: 'প্রদীপ (পুরুষ কণ্ঠ)',
    gender: 'male',
    locale: 'bn-BD',
    languageLabel: 'Bangla (Bangladesh)',
    badge: '🎙️ গম্ভীর ও সংবাদ',
    category: 'news',
    description: 'গম্ভীর, আত্মবিশ্বাসী ও পেশাদার পুরুষ কণ্ঠ (সংবাদ, উপস্থাপনা ও টিউটোরিয়ালের জন্য দারুণ)',
    isRecommended: true,
    sampleText: 'আমি প্রদীপ। প্রফেশনাল ও গম্ভীর বাংলা ভয়েস ওভারের জন্য আমার ভয়েস ব্যবহার করতে পারেন।',
  },

  // 3. Bangla (India) Melodious Female
  {
    id: 'bn-IN-TanishaaNeural',
    name: 'Tanishaa',
    nativeName: 'তানিশা (নারী কণ্ঠ)',
    gender: 'female',
    locale: 'bn-IN',
    languageLabel: 'Bangla (India)',
    badge: '✨ সাবলীল কণ্ঠ',
    category: 'general',
    description: 'শ্রুতিমধুর ও সাবলীল ভারতীয় বাংলা বাচনভঙ্গি',
    sampleText: 'নমস্কার, আমি তানিশা। আপনার যেকোনো লেখার জন্য স্টুডিও মানের স্পষ্ট কন্ঠ।',
  },

  // 4. English (US) Voices - Studio Quality
  {
    id: 'en-US-AvaMultilingualNeural',
    name: 'Ava (Multilingual)',
    nativeName: 'Ava (Female)',
    gender: 'female',
    locale: 'en-US',
    languageLabel: 'English (US)',
    badge: '🌐 Multilingual',
    category: 'general',
    description: 'Natural, expressive multilingual studio voice with perfect cadence',
    isRecommended: true,
    sampleText: 'Hello! I am Ava. I can read your English and mixed text smoothly with natural intonation.',
  },
  {
    id: 'en-US-AndrewMultilingualNeural',
    name: 'Andrew (Multilingual)',
    nativeName: 'Andrew (Male)',
    gender: 'male',
    locale: 'en-US',
    languageLabel: 'English (US)',
    badge: '🎙️ Studio Narrator',
    category: 'storyteller',
    description: 'Warm, confident, and engaging male voice for podcasts, narration, and video',
    isRecommended: true,
    sampleText: 'Welcome! I am Andrew. Turn your scripts and articles into lifelike audio in seconds.',
  },
  {
    id: 'en-US-JennyNeural',
    name: 'Jenny',
    nativeName: 'Jenny (Female)',
    gender: 'female',
    locale: 'en-US',
    languageLabel: 'English (US)',
    category: 'general',
    description: 'Clear, cheerful, and versatile female narrator',
    sampleText: 'Hi there, I am Jenny. Ready to bring your written ideas to life.',
  },
  {
    id: 'en-US-GuyNeural',
    name: 'Guy',
    nativeName: 'Guy (Male)',
    gender: 'male',
    locale: 'en-US',
    languageLabel: 'English (US)',
    category: 'general',
    description: 'Casual, conversational, and friendly male narrator',
    sampleText: 'Hey everyone, Guy here! Creating audio content has never been this straightforward.',
  },

  // 5. English (UK) Voices
  {
    id: 'en-GB-SoniaNeural',
    name: 'Sonia',
    nativeName: 'Sonia (Female)',
    gender: 'female',
    locale: 'en-GB',
    languageLabel: 'English (UK)',
    category: 'general',
    description: 'Crisp, articulate British English female voice',
    sampleText: 'Good day! I am Sonia, delivering polished British narration for your projects.',
  },
  {
    id: 'en-GB-RyanNeural',
    name: 'Ryan',
    nativeName: 'Ryan (Male)',
    gender: 'male',
    locale: 'en-GB',
    languageLabel: 'English (UK)',
    category: 'storyteller',
    description: 'Sophisticated and smooth British English male narrator',
    sampleText: 'Greetings, I am Ryan. Ready to produce studio quality voiceovers for you.',
  },
];

export const DEFAULT_VOICE_ID = 'bn-IN-BashkarNeural'; // Default to the storyteller voice!

export function getVoiceById(voiceId: string): VoiceOption {
  const voice = SUPPORTED_VOICES.find((v) => v.id === voiceId);
  return voice || SUPPORTED_VOICES[0];
}
