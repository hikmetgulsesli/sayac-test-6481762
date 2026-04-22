import type { CounterState } from '@/types';

const STORAGE_KEY = 'sayac-state';

export function loadState(): CounterState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch {
    // ignore
  }
  return { count: 0, history: [] };
}

export function saveState(state: CounterState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore
  }
}
