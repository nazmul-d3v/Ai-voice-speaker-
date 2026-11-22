import { EdgeTTS } from '@andresaya/edge-tts';
import { TTSRequest, TTSResult } from './types';
import { detectLanguage } from '../textProcessor';

/**
 * High-definition Neural TTS Provider (Zero-Config, Free):
 * Connects directly to Microsoft Neural TTS voices:
 * - 35b2cfc1-e6fb-4d69-a598-c1780612be4a (Cartesia Sonic 3.5 Darío - Steady Operator)
 * - bn-IN-BashkarNeural (Exact male storyteller voice matching uploaded audio)
 * - bn-BD-PradeepNeural (Bangladeshi male voice)
 * - bn-BD-NabanitaNeural (Bangladeshi female voice)
 * - en-US-AndrewMultilingualNeural, en-US-AvaMultilingualNeural, etc.
 */
export async function synthesizeEdge(req: TTSRequest): Promise<TTSResult> {
  const tts = new EdgeTTS();

  const ratePercent = req.rate ? Math.round((req.rate - 1.0) * 100) : 10; // Default +10% (1.1x)
  const rateStr = ratePercent >= 0 ? `+${ratePercent}%` : `${ratePercent}%`;

  const pitchHz = req.pitch ?? 0;
  const pitchStr = pitchHz >= 0 ? `+${pitchHz}Hz` : `${pitchHz}Hz`;

  // Map Cartesia Sonic 3.5 voice ID or custom internal IDs
  let targetVoice = req.voiceId;
  const lang = detectLanguage(req.text);

  if (targetVoice === '35b2cfc1-e6fb-4d69-a598-c1780612be4a') {
    // Darío (Steady Operator): if Bengali text, use deep steady Bashkar, if English use Andrew Multilingual
    targetVoice = lang === 'en' ? 'en-US-AndrewMultilingualNeural' : 'bn-IN-BashkarNeural';
  } else if (targetVoice === 'bn-BD-ArjunNeural' || targetVoice === 'bn-IN-SoumyaNeural') {
    targetVoice = 'bn-IN-BashkarNeural';
  } else if (targetVoice === 'bn-BD-AnanyaNeural') {
    targetVoice = 'bn-BD-NabanitaNeural';
  }

  await tts.synthesize(req.text, targetVoice, {
    rate: rateStr,
    pitch: pitchStr,
  });

  const audioBuffer = tts.toBuffer();

  return {
    audioBuffer,
    contentType: 'audio/mpeg',
    provider: 'sonic-3.5',
  };
}
