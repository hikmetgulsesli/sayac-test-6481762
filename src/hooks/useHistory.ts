import { useState, useCallback } from 'react';
import type { HistoryEntry } from '@/types';

const MAX_HISTORY = 50;

export function useHistory() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  const addEntry = useCallback((value: number, action: 'increment' | 'decrement' | 'reset') => {
    const entry: HistoryEntry = {
      id: crypto.randomUUID(),
      action,
      value,
      timestamp: Date.now(),
    };
    setHistory(prev => [entry, ...prev].slice(0, MAX_HISTORY));
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  return { history, addEntry, clearHistory };
}
