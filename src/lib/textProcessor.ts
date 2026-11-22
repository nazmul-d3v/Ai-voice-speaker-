export type DetectedLanguage = 'bn' | 'en' | 'mixed' | 'unknown';

export interface TextChunk {
  text: string;
  lang: 'bn-BD' | 'en-US';
}

/**
 * Unicode range for Bengali script: \u0980 - \u09FF
 */
const BENGALI_REGEX = /[\u0980-\u09FF]/;
const ENGLISH_REGEX = /[a-zA-Z]/;

/**
 * Detects whether the given text is primarily Bengali, English, or Mixed.
 */
export function detectLanguage(text: string): DetectedLanguage {
  if (!text || text.trim().length === 0) return 'unknown';

  let bengaliChars = 0;
  let englishChars = 0;

  for (const char of text) {
    if (BENGALI_REGEX.test(char)) {
      bengaliChars++;
    } else if (ENGLISH_REGEX.test(char)) {
      englishChars++;
    }
  }

  const total = bengaliChars + englishChars;
  if (total === 0) return 'unknown';

  const bnRatio = bengaliChars / total;
  const enRatio = englishChars / total;

  if (bnRatio >= 0.8) return 'bn';
  if (enRatio >= 0.8) return 'en';
  return 'mixed';
}

/**
 * Normalizes text: cleans extraneous whitespace, preserves Bengali punctuation (।),
 * converts multiple spaces to single space, and keeps correct paragraph spacing.
 */
export function normalizeText(text: string): string {
  if (!text) return '';
  return text
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/**
 * Enhances text cadence for ultra-realistic, natural human-like speech.
 * Eliminates robotic rushing by:
 * 1. Ensuring natural micro-pauses after Bengali Dari (।), commas (,), periods (.), and question marks (?).
 * 2. Normalizing dashes and ellipses into smooth natural pauses.
 * 3. Cleaning repetitive punctuation that can cause synthetic audio glitches.
 */
export function humanizeSpeechCadence(text: string): string {
  if (!text) return '';

  return text
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    // Replace em-dash / long hyphens with comma for natural breath pause
    .replace(/[—–]/g, ', ')
    .replace(/\s*--\s*/g, ', ')
    // Normalize multiple punctuation marks (e.g. "।।", "??", "!!") to single
    .replace(/।{2,}/g, '।')
    .replace(/\?{2,}/g, '?')
    .replace(/!{2,}/g, '!')
    .replace(/\.{3,}/g, '...')
    // Remove awkward whitespace directly before punctuation
    .replace(/\s+([।,?!;:.])/g, '$1')
    // Ensure space after Bengali Dari (।) if immediately followed by another character
    .replace(/।([^\s\d])/g, '। $1')
    // Ensure space after comma, question mark, exclamation if followed by another character
    .replace(/([,?!;:।])([^\s\d"'»])/g, '$1 $2')
    // Collapse multiple spaces
    .replace(/[ \t]+/g, ' ')
    // Preserve natural paragraph breaks
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/**
 * Splits text into natural sentence chunks based on Bengali Dari (।),
 * periods (.), exclamation marks (!), question marks (?), or linebreaks.
 * Ensures sentence integrity and natural pauses without breaking Bengali conjuncts.
 */
export function splitIntoSentences(text: string, maxChunkLength: number = 250): string[] {
  const normalized = normalizeText(text);
  if (!normalized) return [];

  // Match sentences ending in Bengali Dari (।), '.', '?', '!', or newline
  const sentenceDelimiters = /([^।?!.\n]+[।?!.\n]*)/g;
  const rawMatches = normalized.match(sentenceDelimiters) || [normalized];

  const chunks: string[] = [];
  let currentChunk = '';

  for (const match of rawMatches) {
    const trimmed = match.trim();
    if (!trimmed) continue;

    if (currentChunk.length + trimmed.length + 1 <= maxChunkLength) {
      currentChunk = currentChunk ? `${currentChunk} ${trimmed}` : trimmed;
    } else {
      if (currentChunk) chunks.push(currentChunk);
      if (trimmed.length > maxChunkLength) {
        // If an individual sentence is too long, split on space/comma boundaries
        const words = trimmed.split(' ');
        let temp = '';
        for (const w of words) {
          if (temp.length + w.length + 1 <= maxChunkLength) {
            temp = temp ? `${temp} ${w}` : w;
          } else {
            if (temp) chunks.push(temp);
            temp = w;
          }
        }
        currentChunk = temp;
      } else {
        currentChunk = trimmed;
      }
    }
  }

  if (currentChunk) {
    chunks.push(currentChunk);
  }

  return chunks;
}

/**
 * Parses mixed-language text into language-tagged segments for natural bilingual TTS narration.
 */
export function segmentBilingualText(text: string, defaultVoiceLang: 'bn-BD' | 'en-US' = 'bn-BD'): TextChunk[] {
  const words = text.split(/(\s+)/);
  const segments: TextChunk[] = [];
  let currentSegment = '';
  let currentLang: 'bn-BD' | 'en-US' = defaultVoiceLang;

  for (const part of words) {
    if (!part) continue;
    if (/^\s+$/.test(part)) {
      if (currentSegment) currentSegment += part;
      continue;
    }

    const hasBengali = BENGALI_REGEX.test(part);
    const hasEnglish = ENGLISH_REGEX.test(part);

    const partLang: 'bn-BD' | 'en-US' = hasBengali
      ? 'bn-BD'
      : hasEnglish
      ? 'en-US'
      : currentLang;

    if (partLang === currentLang || !currentSegment) {
      currentSegment += part;
      currentLang = partLang;
    } else {
      segments.push({ text: currentSegment.trim(), lang: currentLang });
      currentSegment = part;
      currentLang = partLang;
    }
  }

  if (currentSegment.trim()) {
    segments.push({ text: currentSegment.trim(), lang: currentLang });
  }

  return segments.length > 0 ? segments : [{ text, lang: defaultVoiceLang }];
}
