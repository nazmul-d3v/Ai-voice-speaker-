import { TTSRequest, TTSResult } from './types';

export function isGeminiConfigured(): boolean {
  return Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim() !== '');
}

/**
 * Gemini API TTS Adapter:
 * Uses Gemini Multimodal Speech / Audio Generation API.
 */
export async function synthesizeGemini(req: TTSRequest): Promise<TTSResult> {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey) {
    throw new Error('Gemini API Key (GEMINI_API_KEY) is missing in .env.local.');
  }

  const prompt = `Read the following text aloud with natural pronunciation, clear pacing, and proper emphasis for ${
    req.voiceId.startsWith('bn-') ? 'Bangla (Bangladesh)' : 'English'
  }:\n\n${req.text}`;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          responseModalities: ['AUDIO'],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: {
                voiceName: req.voiceId.startsWith('bn-') ? 'Puck' : 'Aoede',
              },
            },
          },
        },
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini Speech API failed (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  const part = data.candidates?.[0]?.content?.parts?.[0];
  const audioBase64 = part?.inlineData?.data;

  if (!audioBase64) {
    throw new Error('No audio data received from Gemini API.');
  }

  const audioBuffer = Buffer.from(audioBase64, 'base64');
  return {
    audioBuffer,
    contentType: part.inlineData.mimeType || 'audio/mp3',
    provider: 'gemini',
  };
}
