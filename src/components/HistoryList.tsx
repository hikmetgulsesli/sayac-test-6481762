import type { HistoryEntry } from '@/types';
import HistoryItem from './HistoryItem';

interface HistoryListProps {
  history: HistoryEntry[];
}

export default function HistoryList({ history }: HistoryListProps) {
  return (
    <div className="w-full flex flex-col gap-4">
      <h2 className="font-headline text-xl font-bold text-primary px-2">Son İşlemler</h2>
      <div className="bg-surface-container-low rounded-xl p-2 flex flex-col gap-1">
        {history.map((entry) => (
          <HistoryItem key={entry.id} entry={entry} />
        ))}
      </div>
    </div>
  );
}