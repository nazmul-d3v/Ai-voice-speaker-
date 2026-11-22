import * as sdk from 'microsoft-cognitiveservices-speech-sdk';
import { TTSRequest, TTSResult } from './types';
import { buildSSML } from '../ssmlBuilder';

export function isAzureConfigured(): boolean {
  return Boolean(
    process.env.AZURE_SPEECH_KEY &&
    process.env.AZURE_SPEECH_KEY.trim() !== '' &&
    process.env.AZURE_SPEECH_REGION &&
    process.env.AZURE_SPEECH_REGION.trim() !== ''
  );
}

export async function synthesizeAzure(req: TTSRequest): Promise<TTSResult> {
  const speechKey = process.env.AZURE_SPEECH_KEY?.trim();
  const speechRegion = process.env.AZURE_SPEECH_REGION?.trim();

  if (!speechKey || !speechRegion) {
    throw new Error('Azure Speech API Key (AZURE_SPEECH_KEY) or Region (AZURE_SPEECH_REGION) is missing in .env.local.');
  }

  const speechConfig = sdk.SpeechConfig.fromSubscription(speechKey, speechRegion);
  speechConfig.speechSynthesisOutputFormat = sdk.SpeechSynthesisOutputFormat.Audio24Khz48KBitRateMonoMp3;
  speechConfig.speechSynthesisVoiceName = req.voiceId;

  // Use null as audio destination so SDK synthesizes into memory buffer
  const synthesizer = new sdk.SpeechSynthesizer(speechConfig, null as unknown as sdk.AudioConfig);

  const ssml = buildSSML({
    text: req.text,
    voiceName: req.voiceId,
    rate: req.rate ?? 1.0,
    pitch: req.pitch ?? 0,
    enableMultilingualTags: true,
  });

  return new Promise<TTSResult>((resolve, reject) => {
    synthesizer.speakSsmlAsync(
      ssml,
      (result) => {
        if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
          const audioBuffer = Buffer.from(result.audioData);
          synthesizer.close();
          resolve({
            audioBuffer,
            contentType: 'audio/mpeg',
            provider: 'azure',
          });
        } else {
          const errorDetails = result.errorDetails || 'Azure Speech synthesis failed';
          synthesizer.close();
          reject(new Error(`Azure Speech error: ${errorDetails}`));
        }
      },
      (err) => {
        synthesizer.close();
        reject(err instanceof Error ? err : new Error(String(err)));
      }
    );
  });
}
