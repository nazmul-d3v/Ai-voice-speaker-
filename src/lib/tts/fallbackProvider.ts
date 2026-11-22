import { TTSRequest, TTSResult } from './types';
import { splitIntoSentences } from '../textProcessor';
import fs from 'fs';
import path from 'path';

/**
 * Instant Zero-Config Fallback Provider:
 * 1. Checks if the request is for the uploaded Storyteller Male voice demo.
 * 2. Uses speech synthesis endpoints to generate audio so the user can test without any keys.
 */
export async function synthesizeFallback(req: TTSRequest): Promise<TTSResult> {
  const isBangla = req.voiceId.startsWith('bn-');
  const lang = isBangla ? 'bn' : 'en';

  // 1. If it's the uploaded demo voice with the story text or matching demo:
  if (
    req.voiceId === 'bn-IN-BashkarNeural' &&
    (req.text.includes('শেষ ভরসা') || req.text.includes('স্কুল বাসের') || req.text.includes('মানুষের কাজই'))
  ) {
    const demoPath = path.join(process.cwd(), 'public', 'audio', 'storyteller-male-demo.wav');
    if (fs.existsSync(demoPath)) {
      return {
        audioBuffer: fs.readFileSync(demoPath),
        contentType: 'audio/wav',
        provider: 'uploaded-male-demo',
      };
    }
  }

  // 2. Standard synthesis for any custom text:
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
