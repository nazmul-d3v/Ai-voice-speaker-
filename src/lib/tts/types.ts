export type VoiceGender = 'female' | 'male';
export type VoiceLocale = 'bn-BD' | 'bn-IN' | 'en-US' | 'en-GB';
export type TTSProviderType = 'azure' | 'edge' | 'gemini' | 'elevenlabs';

export interface VoiceOption {
  id: string;
  name: string;
  nativeName: string;
  gender: VoiceGender;
  locale: VoiceLocale;
  languageLabel: string;
  description: string;
  isRecommended?: boolean;
  sampleText: string;
}

export interface TTSRequest {
  text: string;
  voiceId: string;
  rate?: number; // 0.5 to 2.0 (default 1.0)
  pitch?: number; // -10 to 10 (default 0)
  language?: string;
}

export interface TTSResult {
  audioBuffer: Buffer;
  contentType: string;
  provider: string;
}

export interface TTSProvider {
  name: string;
  isConfigured: () => boolean;
  synthesize: (req: TTSRequest) => Promise<TTSResult>;
}
