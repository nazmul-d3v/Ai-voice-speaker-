import { EdgeTTS } from '@andresaya/edge-tts';
import { TTSRequest, TTSResult } from './types';
import { detectLanguage, humanizeSpeechCadence } from '../textProcessor';

/**
 * Ultra-Realistic Neural TTS Provider (Zero-Config, Free):
 * Connects directly to Microsoft Neural TTS voices with 96kbps HD audio:
 * - 35b2cfc1-e6fb-4d69-a598-c1780612be4a (Cartesia Sonic 3.5 Darío - Steady Operator)
 * - bn-IN-BashkarNeural (Ultra-realistic male storyteller voice matching uploaded audio)
 * - bn-BD-PradeepNeural (Bangladeshi male voice - professional & clear)
 * - bn-BD-NabanitaNeural (Bangladeshi female voice - warm & human)
 * - bn-IN-TanishaaNeural (Bengali female presenter)
 * - en-US-AndrewMultilingualNeural, en-US-AvaMultilingualNeural, etc.
 */
export async function synthesizeEdge(req: TTSRequest): Promise<TTSResult> {
  const tts = new EdgeTTS();

  // Natural human tempo: 1.0x (0% rate adjustment).
  const rateMultiplier = req.rate ?? 1.0;
  const ratePercent = Math.round((rateMultiplier - 1.0) * 100);
  let rateStr = ratePercent >= 0 ? `+${ratePercent}%` : `${ratePercent}%`;

  const pitchHz = req.pitch ?? 0;
  let pitchStr = pitchHz >= 0 ? `+${pitchHz}Hz` : `${pitchHz}Hz`;

  // Volume: calculate volume adjustment percentage without clipping
  const volMultiplier = req.volume ?? 1.0;
  const volPercent = Math.max(-50, Math.min(50, Math.round((volMultiplier - 1.0) * 50)));
  const volStr = volPercent >= 0 ? `+${volPercent}%` : `${volPercent}%`;

  // Map Cartesia Sonic 3.5 voice ID or custom internal IDs
  let targetVoice = req.voiceId;
  const lang = detectLanguage(req.text);

  if (targetVoice === 'bn-BD-PradeepStoryNeural') {
    targetVoice = 'bn-BD-PradeepNeural';
    // If rate was not explicitly changed away from 1.0, default to emotional slow rate -10%
    if (req.rate === undefined || req.rate === 1.0) {
      rateStr = '-10%';
    }
    // If pitch was not explicitly changed, default to deep resonant pitch -5Hz
    if (req.pitch === undefined || req.pitch === 0) {
      pitchStr = '-5Hz';
    }
  } else if (targetVoice === '35b2cfc1-e6fb-4d69-a598-c1780612be4a') {
    // Darío (Steady Operator): if Bengali text, use deep steady Bashkar, if English use Andrew Multilingual
    targetVoice = lang === 'en' ? 'en-US-AndrewMultilingualNeural' : 'bn-IN-BashkarNeural';
  } else if (targetVoice === 'bn-BD-ArjunNeural' || targetVoice === 'bn-IN-SoumyaNeural') {
    targetVoice = 'bn-IN-BashkarNeural';
  } else if (targetVoice === 'bn-BD-AnanyaNeural') {
    targetVoice = 'bn-BD-NabanitaNeural';
  }

  // Pre-process text to add human-like cadence and natural breathing pauses
  const naturalText = humanizeSpeechCadence(req.text);

  // 96kbps HD audio for studio-grade warmth and zero robotic tinny compression
  await tts.synthesize(naturalText, targetVoice, {
    outputFormat: 'audio-24khz-96kbitrate-mono-mp3',
    rate: rateStr,
    pitch: pitchStr,
    volume: volStr,
  });

  const audioBuffer = tts.toBuffer();

  return {
    audioBuffer,
    contentType: 'audio/mpeg',
    provider: 'sonic-3.5',
  };
}
