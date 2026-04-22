import { useState, useCallback } from 'react';
import type { CounterState } from '@/types';
import { loadState, saveState } from '@/utils/storage';

const MAX_HISTORY = 50;

export function useCounter() {
  const [state, setState] = useState<CounterState>(() => loadState());

  const increment = useCallback((amount: number = 1) => {
    setState(prev => {
      const next = {
        count: prev.count + amount,
        history: [
          { id: crypto.randomUUID(), action: 'increment' as const, value: prev.count + amount, timestamp: Date.now() },
          ...prev.history,
        ].slice(0, MAX_HISTORY),
      };
      saveState(next);
      return next;
    });
  }, []);

  const decrement = useCallback(() => {
    setState(prev => {
      const next = {
        count: prev.count - 1,
        history: [
          { id: crypto.randomUUID(), action: 'decrement' as const, value: prev.count - 1, timestamp: Date.now() },
          ...prev.history,
        ].slice(0, MAX_HISTORY),
      };
      saveState(next);
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    setState(prev => {
      const next = {
        count: 0,
        history: [
          { id: crypto.randomUUID(), action: 'reset' as const, value: 0, timestamp: Date.now() },
          ...prev.history,
        ].slice(0, MAX_HISTORY),
      };
      saveState(next);
      return next;
    });
  }, []);

  return {
    count: state.count,
    history: state.history,
    increment,
    decrement,
    reset,
  };
}
