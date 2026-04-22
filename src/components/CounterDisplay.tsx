interface CounterDisplayProps {
  count: number;
}

export default function CounterDisplay({ count }: CounterDisplayProps) {
  return (
    <div className="w-full bg-surface-container-highest rounded-xl p-12 flex flex-col items-center justify-center relative overflow-hidden transition-transform duration-200 active:scale-[0.98]">
      <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-surface-container-low text-on-surface-variant font-label text-sm px-4 py-1.5 rounded-full tracking-wider uppercase">
        Genel
      </div>
      <div className="text-[6rem] leading-none font-display font-black text-on-surface tracking-tighter mt-8 mb-4 select-none">
        {count}
      </div>
    </div>
  );
}