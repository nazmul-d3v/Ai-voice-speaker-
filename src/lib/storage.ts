export interface HistoryItem {
  id: string;
  text: string;
  voiceId: string;
  voiceName: string;
  language: string;
  audioBlobUrl?: string;
  audioBase64: string;
  createdAt: number;
}

const STORAGE_KEY = 'bangla_tts_history_v1';
const MAX_HISTORY_ITEMS = 10;

export function loadHistory(): HistoryItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    
    return parsed
      .filter((item): item is HistoryItem => {
        return (
          item !== null &&
          typeof item === 'object' &&
          typeof item.id === 'string' &&
          typeof item.text === 'string' &&
          typeof item.audioBase64 === 'string'
        );
      })
      .map((item) => ({
        id: item.id,
        text: item.text,
        voiceId: typeof item.voiceId === 'string' ? item.voiceId : 'bn-BD-PradeepStoryNeural',
        voiceName: typeof item.voiceName === 'string' ? item.voiceName : 'বাস্তব কণ্ঠ',
        language: typeof item.language === 'string' ? item.language : 'bn',
        audioBase64: item.audioBase64,
        createdAt: typeof item.createdAt === 'number' && !isNaN(item.createdAt) ? item.createdAt : Date.now(),
      }));
  } catch (e) {
    console.error('Failed to load history from localStorage', e);
    // If corrupted, clear it safely so it doesn't break future loads
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    return [];
  }
}

export function saveHistoryItem(item: Omit<HistoryItem, 'id' | 'createdAt'>): HistoryItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const existing = loadHistory();
    const newItem: HistoryItem = {
      ...item,
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      createdAt: Date.now(),
    };

    // Keep only the most recent MAX_HISTORY_ITEMS items
    const updated = [newItem, ...existing.filter((i) => i.text !== item.text)].slice(0, MAX_HISTORY_ITEMS);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Failed to save item to localStorage', e);
    return loadHistory();
  }
}

export function deleteHistoryItem(id: string): HistoryItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const existing = loadHistory();
    const updated = existing.filter((item) => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Failed to delete history item', e);
    return loadHistory();
  }
}

export function clearAllHistory(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error('Failed to clear history', e);
  }
}
