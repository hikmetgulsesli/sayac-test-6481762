interface ActionButtonsProps {
  onIncrement: () => void;
  onDecrement: () => void;
}

export default function ActionButtons({ onIncrement, onDecrement }: ActionButtonsProps) {
  return (
    <div className="w-full grid grid-cols-2 gap-4">
      <button
        onClick={onDecrement}
        className="bg-primary-container text-on-primary-container rounded-xl py-6 flex items-center justify-center hover:bg-surface-dim transition-colors active:scale-95 cursor-pointer"
        aria-label="Azalt"
      >
        <span className="material-symbols-outlined text-4xl">remove</span>
      </button>
      <button
        onClick={onIncrement}
        className="bg-gradient-to-br from-primary to-primary-container text-on-primary rounded-xl py-6 flex items-center justify-center hover:opacity-90 transition-opacity active:scale-95 shadow-[0_8px_24px_rgba(36,47,65,0.06)] cursor-pointer"
        aria-label="Arttır"
      >
        <span className="material-symbols-outlined text-4xl">add</span>
      </button>
    </div>
  );
}

interface ResetButtonProps {
  onReset: () => void;
}

export function ResetButton({ onReset }: ResetButtonProps) {
  return (
    <button
      onClick={onReset}
      className="mt-8 text-primary font-label text-sm font-semibold tracking-wider uppercase flex items-center gap-2 hover:opacity-80 active:scale-95 transition-all cursor-pointer"
      aria-label="Sıfırla"
    >
      <span className="material-symbols-outlined text-xl">refresh</span>
      Sıfırla
    </button>
  );
}