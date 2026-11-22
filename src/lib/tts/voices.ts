import { VoiceOption } from './types';

export const SUPPORTED_VOICES: VoiceOption[] = [
  // Bangla (Bangladesh) Voices - Studio Quality
  {
    id: 'bn-BD-NabanitaNeural',
    name: 'Nabanita',
    nativeName: 'নবনিতা (নারী)',
    gender: 'female',
    locale: 'bn-BD',
    languageLabel: 'Bangla (Bangladesh)',
    description: 'স্বাভাবিক, মিষ্টি ও অত্যন্ত স্পষ্ট নারী কণ্ঠ (ভিডিও, অডিওবুক ও বর্ণনার জন্য সেরা)',
    isRecommended: true,
    sampleText: 'আমি নবনিতা। সুন্দর ও স্পষ্ট বাংলা ভয়েস দিয়ে আপনার কনটেন্টকে আকর্ষণীয় করে তুলুন।',
  },
  {
    id: 'bn-BD-PradeepNeural',
    name: 'Pradeep',
    nativeName: 'প্রদীপ (পুরুষ)',
    gender: 'male',
    locale: 'bn-BD',
    languageLabel: 'Bangla (Bangladesh)',
    description: 'গম্ভীর, আত্মবিশ্বাসী ও পেশাদার পুরুষ কণ্ঠ (সংবাদ, উপস্থাপনা ও টিউটোরিয়ালের জন্য দারুণ)',
    isRecommended: true,
    sampleText: 'আমি প্রদীপ। প্রফেশনাল ও গম্ভীর বাংলা ভয়েস ওভারের জন্য আমার ভয়েস ব্যবহার করতে পারেন।',
  },

  // Bangla (India) Voices
  {
    id: 'bn-IN-TanishaaNeural',
    name: 'Tanishaa',
    nativeName: 'তানিশা (নারী)',
    gender: 'female',
    locale: 'bn-IN',
    languageLabel: 'Bangla (India)',
    description: 'শ্রুতিমধুর ও সাবলীল ভারতীয় বাংলা বাচনভঙ্গি',
    sampleText: 'নমস্কার, আমি তানিশা। আপনার যেকোনো লেখার জন্য স্টুডিও মানের স্পষ্ট কন্ঠ।',
  },
  {
    id: 'bn-IN-BashkarNeural',
    name: 'Bashkar',
    nativeName: 'ভাস্কর (পুরুষ)',
    gender: 'male',
    locale: 'bn-IN',
    languageLabel: 'Bangla (India)',
    description: 'স্পষ্ট ও সাবলীল ভারতীয় বাংলা পুরুষ কণ্ঠ',
    sampleText: 'নমস্কার, আমি ভাস্কর। আজকের দিনে কৃত্রিম বুদ্ধিমত্তা দিয়ে ভয়েস তৈরি করা অত্যন্ত সহজ।',
  },

  // English (US) Voices - Studio Quality
  {
    id: 'en-US-AvaMultilingualNeural',
    name: 'Ava (Multilingual)',
    nativeName: 'Ava (Female)',
    gender: 'female',
    locale: 'en-US',
    languageLabel: 'English (US)',
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
    description: 'Casual, conversational, and friendly male narrator',
    sampleText: 'Hey everyone, Guy here! Creating audio content has never been this straightforward.',
  },

  // English (UK) Voices
  {
    id: 'en-GB-SoniaNeural',
    name: 'Sonia',
    nativeName: 'Sonia (Female)',
    gender: 'female',
    locale: 'en-GB',
    languageLabel: 'English (UK)',
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
    description: 'Sophisticated and smooth British English male narrator',
    sampleText: 'Greetings, I am Ryan. Ready to produce studio quality voiceovers for you.',
  },
];

export const DEFAULT_VOICE_ID = 'bn-BD-NabanitaNeural';

export function getVoiceById(voiceId: string): VoiceOption {
  const voice = SUPPORTED_VOICES.find((v) => v.id === voiceId);
  return voice || SUPPORTED_VOICES[0];
}
