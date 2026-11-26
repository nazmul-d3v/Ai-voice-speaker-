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
    // Darío (Steady Operator): if English use studio Andrew Multilingual, if Bengali use deep steady Bashkar
    targetVoice = lang === 'en' ? 'en-US-AndrewMultilingualNeural' : 'bn-IN-BashkarNeural';
  } else if (targetVoice === 'db6b0ed5-d5d3-463d-ae85-518a07d3c2b4') {
    // Skylar (Friendly Guide)
    targetVoice = lang === 'en' ? 'en-US-AvaMultilingualNeural' : 'bn-BD-NabanitaNeural';
  } else if (targetVoice === '694f9389-aac1-45b6-b726-9d9369183238') {
    // Sarah (Helpful Conversationalist): natural human female
    targetVoice = lang === 'en' ? 'en-US-AvaMultilingualNeural' : 'bn-BD-NabanitaNeural';
  } else if (targetVoice === 'a0e99841-438c-4a64-b679-ae501e7d6091') {
    // Barbershop Man: rich resonant narrator
    targetVoice = lang === 'en' ? 'en-US-BrianMultilingualNeural' : 'bn-IN-BashkarNeural';
  } else if (targetVoice === '47c38ca4-5f35-497b-b1a3-415245fb35e1' || targetVoice === 'd8092b2a-281b-4e15-bfc4-299cec5eb1da') {
    // Daniel (Modern Assistant): clear crisp male assistant
    targetVoice = lang === 'en' ? 'en-US-GuyNeural' : 'bn-BD-PradeepNeural';
  } else if (targetVoice === 'ef191366-f52f-447a-a398-ed8c0f2943a1') {
    // Archie: British male conversationalist
    targetVoice = lang === 'en' ? 'en-GB-RyanNeural' : 'bn-IN-BashkarNeural';
  } else if (targetVoice === '62ae83ad-4f6a-430b-af41-a9bede9286ca') {
    // Gemma: British female agent
    targetVoice = lang === 'en' ? 'en-GB-SoniaNeural' : 'bn-IN-TanishaaNeural';
  } else if (targetVoice === 'a5136bf9-224c-4d76-b823-52bd5efcffcc') {
    // Jameson: easygoing male support
    targetVoice = lang === 'en' ? 'en-US-ChristopherNeural' : 'bn-IN-BashkarNeural';
  } else if (targetVoice === '9626c31c-bec5-4cca-baa8-f8ba9e84c8bc') {
    // Jacqueline: reassuring female agent
    targetVoice = lang === 'en' ? 'en-US-JennyNeural' : 'bn-BD-NabanitaNeural';
  } else if (targetVoice === 'f786b574-daa5-4673-aa0c-cbe3e8534c02') {
    // Parker: conversational male
    targetVoice = lang === 'en' ? 'en-US-EricNeural' : 'bn-BD-PradeepNeural';
  } else if (targetVoice === 'a167e0f3-df7e-4d52-a9c3-f949145efdab') {
    // Corey: crisp tech male
    targetVoice = lang === 'en' ? 'en-US-RogerNeural' : 'bn-BD-PradeepNeural';
  } else if (targetVoice === '79a125e8-cd45-4c13-8a67-188112f4dd22') {
    // Brooke (Expressive Host): dynamic female announcer
    targetVoice = lang === 'en' ? 'en-US-EmmaMultilingualNeural' : 'bn-IN-TanishaaNeural';
  } else if (targetVoice === '820a3788-2b37-4d21-847a-b65d8a68c99a') {
    // Sofia (Mindful Meditation): soft gentle female
    targetVoice = lang === 'en' ? 'en-US-JennyNeural' : 'bn-BD-NabanitaNeural';
  } else if (targetVoice === '248be419-c632-4f23-adf1-5324ed7dbf10') {
    // Emma: corporate host
    targetVoice = lang === 'en' ? 'en-US-EmmaMultilingualNeural' : 'bn-IN-TanishaaNeural';
  } else if (targetVoice === '87748186-23bb-4158-a1eb-332911b0b708') {
    // Lauren: articulate presenter
    targetVoice = lang === 'en' ? 'en-US-AvaMultilingualNeural' : 'bn-BD-NabanitaNeural';
  } else if (targetVoice === 'b7d50908-b17c-442d-ad8d-810c63997ed9') {
    // Brandon: emotive storyteller
    targetVoice = lang === 'en' ? 'en-US-AndrewMultilingualNeural' : 'bn-IN-BashkarNeural';
  } else if (targetVoice === '13444458-963e-4286-9a25-2e11893c834a') {
    // Cory: casual male companion
    targetVoice = lang === 'en' ? 'en-US-GuyNeural' : 'bn-BD-PradeepNeural';
  } else if (targetVoice === '50d6beb4-80ea-4802-8387-6c948fb84209') {
    // Alec: deep character
    targetVoice = lang === 'en' ? 'en-US-BrianMultilingualNeural' : 'bn-IN-BashkarNeural';
  } else if (targetVoice === 'e90c6678-f0d3-4767-9783-d73d573d6990') {
    // Lucy: bright companion
    targetVoice = lang === 'en' ? 'en-US-AnaNeural' : 'bn-BD-NabanitaNeural';
  } else if (targetVoice === 'c45bc5ec-5968-4f0b-80cb-02202b37072a') {
    // Ariana: emotional character
    targetVoice = lang === 'en' ? 'en-US-MichelleNeural' : 'bn-BD-NabanitaNeural';
  } else if (targetVoice === '79f8b5fb-2cc8-479a-80df-29f7a7cf1a3e') {
    // Dorothy: storybook narrator
    targetVoice = lang === 'en' ? 'en-US-JennyNeural' : 'bn-BD-NabanitaNeural';
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
