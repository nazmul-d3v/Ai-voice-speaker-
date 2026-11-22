import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { synthesizeSpeech } from '../../../lib/tts';
import { detectLanguage, normalizeText } from '../../../lib/textProcessor';

// Input validation schema
const ttsRequestSchema = z.object({
  text: z
    .string()
    .min(1, 'Text cannot be empty.')
    .max(3000, 'Text cannot exceed 3,000 characters per request.'),
  voiceId: z.string().default('bn-BD-NabanitaNeural'),
  rate: z.number().min(0.5).max(2.0).default(1.0),
  pitch: z.number().min(-10).max(10).default(0),
});

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.json();
    const parseResult = ttsRequestSchema.safeParse(rawBody);

    if (!parseResult.success) {
      const errorMsg = parseResult.error.errors.map((e) => e.message).join(', ');
      return NextResponse.json({ error: errorMsg }, { status: 400 });
    }

    const { text, voiceId, rate, pitch } = parseResult.data;
    const cleanText = normalizeText(text);

    if (!cleanText) {
      return NextResponse.json({ error: 'Text contains no readable characters.' }, { status: 400 });
    }

    const detectedLang = detectLanguage(cleanText);

    // Synthesize audio using the modular provider adapter
    const result = await synthesizeSpeech({
      text: cleanText,
      voiceId,
      rate,
      pitch,
      language: detectedLang,
    });

    return new Response(result.audioBuffer as unknown as BodyInit, {
      status: 200,
      headers: {
        'Content-Type': result.contentType || 'audio/mpeg',
        'Content-Length': result.audioBuffer.length.toString(),
        'Cache-Control': 'public, max-age=86400, s-maxage=86400',
        'x-detected-language': detectedLang,
        'x-tts-provider': result.provider,
      },
    });
  } catch (error: unknown) {
    console.error('TTS Route Error:', error);
    const message = error instanceof Error ? error.message : 'Failed to generate voice audio.';
    return NextResponse.json(
      {
        error: message,
      },
      { status: 500 }
    );
  }
}
