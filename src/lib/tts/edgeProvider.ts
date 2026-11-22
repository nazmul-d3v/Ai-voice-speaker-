import { EdgeTTS } from '@andresaya/edge-tts';
import { TTSRequest, TTSResult } from './types';

/**
 * High-definition Neural TTS Provider (Zero-Config, Free):
 * Connects directly to Microsoft Neural TTS voices:
 * - bn-IN-BashkarNeural (Exact male storyteller voice matching uploaded audio)
 * - bn-BD-PradeepNeural (Bangladeshi male voice)
 * - bn-BD-NabanitaNeural (Bangladeshi female voice)
 * - en-US-AndrewMultilingualNeural, en-US-AvaMultilingualNeural, etc.
 */
export async function synthesizeEdge(req: TTSRequest): Promise<TTSResult> {
  const tts = new EdgeTTS();

  const ratePercent = req.rate ? Math.round((req.rate - 1.0) * 100) : 0;
  const rateStr = ratePercent >= 0 ? `+${ratePercent}%` : `${ratePercent}%`;

  const pitchHz = req.pitch ?? 0;
  const pitchStr = pitchHz >= 0 ? `+${pitchHz}Hz` : `${pitchHz}Hz`;

  // Map any custom internal IDs to valid Edge Neural voice names
  let targetVoice = req.voiceId;
  if (targetVoice === 'bn-BD-ArjunNeural' || targetVoice === 'bn-IN-SoumyaNeural') {
    targetVoice = 'bn-IN-BashkarNeural'; // Use deep male neural voice
  } else if (targetVoice === 'bn-BD-AnanyaNeural') {
    targetVoice = 'bn-BD-NabanitaNeural'; // Use sweet female neural voice
  }

  await tts.synthesize(req.text, targetVoice, {
    rate: rateStr,
    pitch: pitchStr,
  });

  const audioBuffer = tts.toBuffer();

  return {
    audioBuffer,
    contentType: 'audio/mpeg',
    provider: 'edge-neural',
  };
}
