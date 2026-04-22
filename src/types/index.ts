export type CounterAction = 'increment' | 'decrement' | 'reset';

export interface HistoryEntry {
  id: string;
  action: CounterAction;
  value: number;
  timestamp: number;
}

export interface CounterState {
  count: number;
  history: HistoryEntry[];
}
