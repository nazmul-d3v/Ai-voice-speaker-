import { segmentBilingualText } from './textProcessor';

export interface SSMLOptions {
  text: string;
  voiceName: string;
  rate?: number; // 0.5 to 2.0
  pitch?: number; // -50% to +50%
  enableMultilingualTags?: boolean;
}

/**
 * Converts a rate multiplier (e.g., 1.25) to SSML percentage string (e.g., "+25%")
 */
export function formatRateToSSML(rate: number = 1.0): string {
  const percentage = Math.round((rate - 1.0) * 100);
  if (percentage === 0) return '0%';
  return percentage > 0 ? `+${percentage}%` : `${percentage}%`;
}

/**
 * Converts a pitch value (-10 to 10) to SSML percentage string (e.g., "+5%")
 */
export function formatPitchToSSML(pitch: number = 0): string {
  if (pitch === 0) return '0%';
  return pitch > 0 ? `+${pitch}%` : `${pitch}%`;
}

/**
 * Escapes special XML characters for SSML safety.
 */
export function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Builds valid W3C SSML for Azure Speech & Edge Speech neural synthesis.
 * Seamlessly handles mixed Bangla and English text.
 */
export function buildSSML({
  text,
  voiceName,
  rate = 1.0,
  pitch = 0,
  enableMultilingualTags = false,
}: SSMLOptions): string {
  const isBanglaVoice = voiceName.startsWith('bn-');
  const defaultLang = isBanglaVoice ? 'bn-BD' : 'en-US';

  const rateStr = formatRateToSSML(rate);
  const pitchStr = formatPitchToSSML(pitch);

  let speechContent: string;

  if (enableMultilingualTags) {
    const segments = segmentBilingualText(text, defaultLang);
    speechContent = segments
      .map(
        (seg) =>
          `<lang xml:lang="${seg.lang}">${escapeXml(seg.text)}</lang>`
      )
      .join(' ');
  } else {
    speechContent = escapeXml(text);
  }

  return `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xmlns:mstts="https://www.w3.org/2001/mstts" xml:lang="${defaultLang}">
  <voice name="${voiceName}">
    <prosody rate="${rateStr}" pitch="${pitchStr}">
      ${speechContent}
    </prosody>
  </voice>
</speak>`;
}
