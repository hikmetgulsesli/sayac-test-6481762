import type { HistoryEntry, CounterAction } from '@/types';
import { formatTimestamp } from '@/utils/time';

interface HistoryItemProps {
  entry: HistoryEntry;
}

const actionIcons: Record<CounterAction, string> = {
  increment: 'add',
  decrement: 'remove',
  reset: 'refresh',
};

const actionLabels: Record<CounterAction, string> = {
  increment: 'Artırıldı',
  decrement: 'Azaltıldı',
  reset: 'Sıfırlandı',
};

export default function HistoryItem({ entry }: HistoryItemProps) {
  return (
    <div className="flex justify-between items-center bg-surface-container-lowest rounded-lg p-4 hover:bg-surface-container transition-colors">
      <div className="flex items-center gap-4">
        <div className="bg-primary-container w-10 h-10 rounded-full flex items-center justify-center text-primary">
          <span className="material-symbols-outlined text-xl">{actionIcons[entry.action]}</span>
        </div>
        <div className="flex flex-col">
          <span className="font-body font-semibold text-on-surface">{actionLabels[entry.action]}</span>
          <span className="font-label text-xs text-outline">{formatTimestamp(entry.timestamp)}</span>
        </div>
      </div>
      <span className="font-display font-bold text-lg text-on-surface">{entry.value}</span>
    </div>
  );
}