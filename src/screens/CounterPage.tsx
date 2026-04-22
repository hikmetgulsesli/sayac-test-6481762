interface CounterPageProps {
  count: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onReset: () => void;
}

export default function CounterPage({ count, onIncrement, onDecrement, onReset }: CounterPageProps) {
  return (
    <div className="w-full flex flex-col items-center gap-12">
      <section className="w-full flex flex-col items-center relative">
        <div className="w-full bg-surface-container-highest rounded-xl p-12 flex flex-col items-center justify-center relative overflow-hidden transition-transform duration-200 active:scale-[0.98]">
          <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-surface-container-low text-on-surface-variant font-label text-sm px-4 py-1.5 rounded-full tracking-wider uppercase">
            Genel
          </div>
          <div className="text-[6rem] leading-none font-display font-black text-on-surface tracking-tighter mt-8 mb-4 select-none">
            {count}
          </div>
        </div>

        <div className="w-full grid grid-cols-2 gap-4 mt-8">
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

        <button
          onClick={onReset}
          className="mt-8 text-primary font-label text-sm font-semibold tracking-wider uppercase flex items-center gap-2 hover:opacity-80 active:scale-95 transition-all cursor-pointer"
          aria-label="Sıfırla"
        >
          <span className="material-symbols-outlined text-xl">refresh</span>
          Sıfırla
        </button>
      </section>
    </div>
  );
}
