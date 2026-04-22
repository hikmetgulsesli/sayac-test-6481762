import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useCounter } from '@/hooks/useCounter';
import { useTheme } from '@/hooks/useTheme';
import CounterPage from '@/screens/CounterPage';
import HistoryPage from '@/screens/HistoryPage';
import SettingsPage from '@/screens/SettingsPage';

export default function App() {
  const { count, history, increment, decrement, reset } = useCounter();
  const { darkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const handleIncrement = () => { increment(); };
  const handleDecrement = () => { decrement(); };
  const handleReset = () => { reset(); };

  useEffect(() => {
    if (location.pathname === '/') return;
    navigate(location.pathname);
  }, [location.pathname, navigate]);

  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col">
      <header className="flex justify-between items-center px-6 py-4 w-full bg-surface dark:bg-slate-950 font-headline font-bold tracking-tight sticky top-0 z-40">
        <h1 className="text-2xl font-black text-primary dark:text-primary-fixed">Sayaç</h1>
        <button
          onClick={toggleTheme}
          className="text-primary dark:text-primary-fixed hover:bg-surface-variant dark:hover:bg-slate-800 transition-colors rounded-full p-2 active:scale-95 duration-200 ease-out flex items-center justify-center cursor-pointer"
          aria-label="Tema Değiştir"
        >
          <span className="material-symbols-outlined">
            {darkMode ? 'light_mode' : 'dark_mode'}
          </span>
        </button>
      </header>

      <main className="flex-grow flex flex-col items-center px-4 pt-12 pb-8 max-w-lg mx-auto w-full">
        <Routes>
          <Route
            path="/"
            element={
              <CounterPage
                count={count}
                onIncrement={handleIncrement}
                onDecrement={handleDecrement}
                onReset={handleReset}
              />
            }
          />
          <Route
            path="/history"
            element={<HistoryPage history={history} />}
          />
          <Route
            path="/settings"
            element={<SettingsPage darkMode={darkMode} onToggleDarkMode={toggleTheme} />}
          />
        </Routes>
      </main>

      <BottomNav />
    </div>
  );
}

function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <>
      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-surface/80 dark:bg-slate-950/80 backdrop-blur-xl rounded-t-3xl shadow-[0_-8px_24px_rgba(70,71,211,0.06)] md:hidden z-50">
        <div className="flex justify-around items-center py-3 px-4">
          <button
            onClick={() => navigate('/')}
            className={`flex flex-col items-center justify-center px-4 py-2 font-label text-[11px] font-medium uppercase tracking-widest active:scale-90 transition-transform duration-150 cursor-pointer rounded-2xl ${
              location.pathname === '/'
                ? 'bg-primary/10 text-primary dark:bg-primary-fixed/10 dark:text-primary-fixed'
                : 'text-slate-400 dark:text-slate-500'
            }`}
            aria-label="Sayaç"
          >
            <span className="material-symbols-outlined mb-1">exposure</span>
            <span>Sayaç</span>
          </button>
          <button
            onClick={() => navigate('/history')}
            className={`flex flex-col items-center justify-center px-4 py-2 font-label text-[11px] font-medium uppercase tracking-widest active:scale-90 transition-transform duration-150 cursor-pointer rounded-2xl ${
              location.pathname === '/history'
                ? 'bg-primary/10 text-primary dark:bg-primary-fixed/10 dark:text-primary-fixed'
                : 'text-slate-400 dark:text-slate-500'
            }`}
            aria-label="Geçmiş"
          >
            <span className="material-symbols-outlined mb-1">history</span>
            <span>Geçmiş</span>
          </button>
          <button
            onClick={() => navigate('/settings')}
            className={`flex flex-col items-center justify-center px-4 py-2 font-label text-[11px] font-medium uppercase tracking-widest active:scale-90 transition-transform duration-150 cursor-pointer rounded-2xl ${
              location.pathname === '/settings'
                ? 'bg-primary/10 text-primary dark:bg-primary-fixed/10 dark:text-primary-fixed'
                : 'text-slate-400 dark:text-slate-500'
            }`}
            aria-label="Ayarlar"
          >
            <span className="material-symbols-outlined mb-1">settings</span>
            <span>Ayarlar</span>
          </button>
        </div>
      </nav>

      {/* Desktop Side Nav */}
      <nav className="hidden md:flex fixed top-1/2 right-6 -translate-y-1/2 h-auto items-center justify-center z-40">
        <div className="flex flex-col gap-3 bg-surface dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl p-3 shadow-lg">
          <button
            onClick={() => navigate('/')}
            className={`p-3 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
              location.pathname === '/'
                ? 'bg-primary-fixed/20 text-primary-fixed'
                : 'text-slate-500 hover:text-primary-fixed'
            }`}
            aria-label="Sayaç"
          >
            <span className="material-symbols-outlined fill-icon">exposure</span>
          </button>
          <button
            onClick={() => navigate('/history')}
            className={`p-3 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
              location.pathname === '/history'
                ? 'bg-primary-fixed/20 text-primary-fixed'
                : 'text-slate-500 hover:text-primary-fixed'
            }`}
            aria-label="Geçmiş"
          >
            <span className="material-symbols-outlined">history</span>
          </button>
          <button
            onClick={() => navigate('/settings')}
            className={`p-3 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
              location.pathname === '/settings'
                ? 'bg-primary-fixed/20 text-primary-fixed'
                : 'text-slate-500 hover:text-primary-fixed'
            }`}
            aria-label="Ayarlar"
          >
            <span className="material-symbols-outlined">settings</span>
          </button>
        </div>
      </nav>
    </>
  );
}
