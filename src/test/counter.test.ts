import { describe, it, expect, beforeEach } from 'vitest';
import { loadState, saveState } from '@/utils/storage';
import { formatTimestamp, generateId } from '@/utils/time';
import type { CounterState, CounterAction } from '@/types';

describe('storage utils', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('loads empty state when no data', () => {
    const state = loadState();
    expect(state.count).toBe(0);
    expect(state.history).toEqual([]);
  });

  it('saves and loads state', () => {
    const state: CounterState = {
      count: 5,
      history: [],
    };
    saveState(state);
    const loaded = loadState();
    expect(loaded.count).toBe(5);
  });

  it('loads history entries', () => {
    const state: CounterState = {
      count: 3,
      history: [
        { id: '1', action: 'increment', value: 3, timestamp: Date.now() },
      ],
    };
    saveState(state);
    const loaded = loadState();
    expect(loaded.history.length).toBe(1);
    expect(loaded.history[0].value).toBe(3);
  });
});

describe('time utils', () => {
  it('generates unique ids', () => {
    const id1 = generateId();
    const id2 = generateId();
    expect(id1).not.toBe(id2);
  });

  it('formatTimestamp formats today correctly', () => {
    const now = Date.now();
    const result = formatTimestamp(now);
    expect(result).toContain('Bugün');
  });
});

describe('counter logic', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('starts at zero', () => {
    const state = loadState();
    expect(state.count).toBe(0);
  });

  it('stores history entries without limit in storage', () => {
    const entries = Array.from({ length: 55 }, (_, i) => ({
      id: String(i),
      action: 'increment' as CounterAction,
      value: i,
      timestamp: Date.now() + i,
    }));
    const state: CounterState = { count: 54, history: entries };
    saveState(state);
    const loaded = loadState();
    // storage itself does not limit — limit is in useCounter
    expect(loaded.history.length).toBe(55);
  });
});
