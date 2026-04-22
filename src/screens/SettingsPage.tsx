interface SettingsPageProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export default function SettingsPage({ darkMode, onToggleDarkMode }: SettingsPageProps) {
  return (
    <div className="w-full flex flex-col gap-6">
      <h2 className="font-headline text-xl font-bold text-primary px-2">Ayarlar</h2>
      
      <div className="bg-surface-container-low rounded-xl p-4 flex flex-col gap-4">
        {/* Dark Mode Toggle */}
        <div className="flex justify-between items-center p-2">
          <div className="flex items-center gap-4">
            <div className="bg-surface-container w-10 h-10 rounded-full flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-xl">
                {darkMode ? 'light_mode' : 'dark_mode'}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-body font-semibold text-on-surface">Karanlık Tema</span>
              <span className="font-label text-xs text-outline">
                {darkMode ? 'Karanlık mod aktif' : 'Açık mod aktif'}
              </span>
            </div>
          </div>
          <button
            onClick={onToggleDarkMode}
            className={`w-12 h-6 rounded-full flex items-center p-1 transition-colors cursor-pointer ${
              darkMode ? 'bg-primary justify-end' : 'bg-outline justify-start'
            }`}
            aria-label={darkMode ? 'Açık moda geç' : 'Karanlık moda geç'}
          >
            <div className="w-4 h-4 rounded-full bg-white shadow-sm" />
          </button>
        </div>
      </div>

      <div className="bg-surface-container-low rounded-xl p-4">
        <div className="flex flex-col gap-2">
          <h3 className="font-headline font-bold text-on-surface">Sayaç Uygulaması</h3>
          <p className="font-label text-xs text-outline">Versiyon 0.1.0</p>
        </div>
      </div>
    </div>
  );
}
