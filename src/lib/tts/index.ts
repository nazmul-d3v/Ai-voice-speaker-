import { TTSRequest, TTSResult } from './types';
import { synthesizeAzure, isAzureConfigured } from './azureProvider';
import { synthesizeGemini, isGeminiConfigured } from './geminiProvider';
import { synthesizeElevenLabs, isElevenLabsConfigured } from './elevenlabsProvider';
import { synthesizeEdge } from './edgeProvider';
import { synthesizeFallback } from './fallbackProvider';

/**
 * Master TTS Engine Adapter:
 * 1. If Azure Speech Key is set in .env.local -> Uses official Azure Speech SDK
 * 2. If Gemini API Key is set -> Uses Gemini API
 * 3. If ElevenLabs Key is set -> Uses ElevenLabs
 * 4. DEFAULT (Zero-Config) -> Uses Edge Neural TTS for genuine studio-quality bn-IN-BashkarNeural & bn-BD-PradeepNeural male voices!
 * 5. If network blocks Edge -> Uses fallback
 */
export async function synthesizeSpeech(req: TTSRequest): Promise<TTSResult> {
  const preferredProvider = process.env.TTS_PROVIDER?.toLowerCase() || 'edge';

  // 1. Azure Speech (if explicitly configured with key)
  if (isAzureConfigured() && preferredProvider === 'azure') {
    try {
      return await synthesizeAzure(req);
    } catch (azureError) {
      console.warn('Azure TTS error, falling back to Edge Neural:', azureError);
    }
  }

  // 2. Gemini API (if key configured)
  if (isGeminiConfigured() && preferredProvider === 'gemini') {
    try {
      return await synthesizeGemini(req);
    } catch (geminiError) {
      console.warn('Gemini TTS error, falling back to Edge Neural:', geminiError);
    }
  }

  // 3. ElevenLabs (if key configured)
  if (isElevenLabsConfigured() && preferredProvider === 'elevenlabs') {
    try {
      return await synthesizeElevenLabs(req);
    } catch (elevenError) {
      console.warn('ElevenLabs TTS error, falling back to Edge Neural:', elevenError);
    }
  }

  // 4. Primary Free Studio Engine: Edge Neural TTS (Real studio male & female voices!)
  try {
    return await synthesizeEdge(req);
  } catch (edgeError) {
    console.warn('Edge Neural TTS error, falling back to Google Translate TTS:', edgeError);
    return await synthesizeFallback(req);
  }
}
