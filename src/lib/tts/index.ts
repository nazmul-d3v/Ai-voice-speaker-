import { TTSRequest, TTSResult } from './types';
import { synthesizeAzure, isAzureConfigured } from './azureProvider';
import { synthesizeGemini, isGeminiConfigured } from './geminiProvider';
import { synthesizeElevenLabs, isElevenLabsConfigured } from './elevenlabsProvider';
import { synthesizeFallback } from './fallbackProvider';

/**
 * Master TTS Engine Adapter:
 * Automatically selects the configured TTS engine based on .env configuration:
 * 1. Azure Speech (Primary - Studio Neural bn-BD-NabanitaNeural & bn-BD-PradeepNeural)
 * 2. Gemini API TTS
 * 3. ElevenLabs
 * 4. Fallback (Free, zero-config real speech synthesis)
 */
export async function synthesizeSpeech(req: TTSRequest): Promise<TTSResult> {
  const preferredProvider = process.env.TTS_PROVIDER?.toLowerCase() || 'azure';

  // 1. If explicit Azure or default Azure with keys configured
  if (preferredProvider === 'azure' || isAzureConfigured()) {
    if (isAzureConfigured()) {
      try {
        return await synthesizeAzure(req);
      } catch (azureError) {
        console.warn('Azure TTS encountered an error, trying fallback:', azureError);
        // Fall back gracefully if Azure key is expired or invalid
        return await synthesizeFallback(req);
      }
    }
  }

  // 2. Gemini API
  if (preferredProvider === 'gemini' && isGeminiConfigured()) {
    try {
      return await synthesizeGemini(req);
    } catch (geminiError) {
      console.warn('Gemini TTS error, falling back:', geminiError);
      return await synthesizeFallback(req);
    }
  }

  // 3. ElevenLabs
  if (preferredProvider === 'elevenlabs' && isElevenLabsConfigured()) {
    try {
      return await synthesizeElevenLabs(req);
    } catch (elevenError) {
      console.warn('ElevenLabs TTS error, falling back:', elevenError);
      return await synthesizeFallback(req);
    }
  }

  // 4. Default to Fallback (zero-config, always works!)
  return await synthesizeFallback(req);
}
