import type { HistoryEntry, CounterAction } from '@/types';
import { formatTimestamp } from '@/utils/time';

interface HistoryPageProps {
  history: HistoryEntry[];
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

export default function HistoryPage({ history }: HistoryPageProps) {
  if (history.length === 0) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-16 gap-4">
        <div className="bg-surface-container-low w-16 h-16 rounded-full flex items-center justify-center">
          <span className="material-symbols-outlined text-3xl text-outline">history</span>
        </div>
        <h2 className="font-headline text-xl font-bold text-on-surface">Henüz işlem yok</h2>
        <p className="font-body text-sm text-on-surface-variant">Sayaç ile yaptığınız işlemler burada görünecek</p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-4">
      <h2 className="font-headline text-xl font-bold text-primary px-2">Son İşlemler</h2>
      <div className="bg-surface-container-low rounded-xl p-2 flex flex-col gap-1">
        {history.map((entry) => (
          <div
            key={entry.id}
            className="flex justify-between items-center bg-surface-container-lowest rounded-lg p-4 hover:bg-surface-container transition-colors"
          >
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
        ))}
      </div>
    </div>
  );
}
