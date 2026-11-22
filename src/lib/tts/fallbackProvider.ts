import { TTSRequest, TTSResult } from './types';
import { splitIntoSentences } from '../textProcessor';

/**
 * Instant Zero-Config Fallback Provider:
 * Uses standard speech endpoints to synthesize genuine Bangla and English audio
 * so the user can immediately test and download speech even before setting up Azure or Gemini API keys.
 */
export async function synthesizeFallback(req: TTSRequest): Promise<TTSResult> {
  const isBangla = req.voiceId.startsWith('bn-');
  const lang = isBangla ? 'bn' : 'en';

  // Split into chunks under 180 chars to avoid endpoint limits
  const sentences = splitIntoSentences(req.text, 180);
  const audioChunks: Buffer[] = [];

  for (const sentence of sentences) {
    const encoded = encodeURIComponent(sentence);
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&tl=${lang}&client=tw-ob&q=${encoded}`;

    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
    });

    if (!res.ok) {
      throw new Error(`Fallback TTS failed with HTTP ${res.status}`);
    }

    const chunkArrayBuffer = await res.arrayBuffer();
    audioChunks.push(Buffer.from(chunkArrayBuffer));
  }

  return {
    audioBuffer: Buffer.concat(audioChunks),
    contentType: 'audio/mpeg',
    provider: 'fallback',
  };
}
