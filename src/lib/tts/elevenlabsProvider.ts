import { TTSRequest, TTSResult } from './types';

export function isElevenLabsConfigured(): boolean {
  return Boolean(process.env.ELEVENLABS_API_KEY && process.env.ELEVENLABS_API_KEY.trim() !== '');
}

/**
 * ElevenLabs TTS Adapter:
 * Uses ElevenLabs Multilingual v2 model.
 */
export async function synthesizeElevenLabs(req: TTSRequest): Promise<TTSResult> {
  const apiKey = process.env.ELEVENLABS_API_KEY?.trim();
  if (!apiKey) {
    throw new Error('ElevenLabs API Key (ELEVENLABS_API_KEY) is missing in .env.local.');
  }

  // Voice ID mapping or default multilingual voice
  const voiceId = process.env.ELEVENLABS_VOICE_ID?.trim() || '21m00Tcm4TlvDq8ikWAM'; // Rachel / Multilingual

  const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'xi-api-key': apiKey,
    },
    body: JSON.stringify({
      text: req.text,
      model_id: 'eleven_multilingual_v2',
      voice_settings: {
        stability: 0.5,
        similarity_boost: 0.75,
      },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`ElevenLabs TTS failed (${response.status}): ${errorText}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  return {
    audioBuffer: Buffer.from(arrayBuffer),
    contentType: 'audio/mpeg',
    provider: 'elevenlabs',
  };
}
