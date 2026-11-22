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
    return parsed.filter(
      (item) => item && typeof item === 'object' && typeof item.id === 'string' && typeof item.text === 'string'
    );
  } catch (e) {
    console.error('Failed to load history from localStorage', e);
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
