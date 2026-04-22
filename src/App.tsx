import { Routes, Route } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import type { CounterState, CounterAction, HistoryEntry } from '@/types';
import { loadState, saveState } from '@/utils/storage';
import { generateId } from '@/utils/time';
import CounterPage from '@/screens/CounterPage';
import HistoryPage from '@/screens/HistoryPage';
import SettingsPage from '@/screens/SettingsPage';

export default function App() {
  const [state, setState] = useState<CounterState>(() => loadState());
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return false;
  });

  useEffect(() => {
    saveState(state);
  }, [state]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const addHistoryEntry = useCallback((action: CounterAction, value: number) => {
    const entry: HistoryEntry = {
      id: generateId(),
      action,
      value,
      timestamp: Date.now(),
    };
    setState(prev => ({
      count: value,
      history: [entry, ...prev.history].slice(0, 10),
    }));
  }, []);

  const increment = useCallback(() => {
    setState(prev => {
      const newValue = prev.count + 1;
      addHistoryEntry('increment', newValue);
      return { ...prev, count: newValue };
    });
  }, [addHistoryEntry]);

  const decrement = useCallback(() => {
    setState(prev => {
      const newValue = Math.max(0, prev.count - 1);
      addHistoryEntry('decrement', newValue);
      return { ...prev, count: newValue };
    });
  }, [addHistoryEntry]);

  const reset = useCallback(() => {
    setState(prev => {
      addHistoryEntry('reset', 0);
      return { ...prev, count: 0 };
    });
  }, [addHistoryEntry]);

  const toggleDarkMode = useCallback(() => {
    setDarkMode(prev => !prev);
  }, []);

  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col">
      <header className="flex justify-between items-center px-6 py-4 w-full bg-surface dark:bg-slate-950 font-headline font-bold tracking-tight sticky top-0 z-40">
        <h1 className="text-2xl font-black text-primary dark:text-primary-fixed">Sayaç</h1>
        <button
          onClick={toggleDarkMode}
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
                count={state.count}
                onIncrement={increment}
                onDecrement={decrement}
                onReset={reset}
              />
            }
          />
          <Route
            path="/history"
            element={<HistoryPage history={state.history} />}
          />
          <Route
            path="/settings"
            element={<SettingsPage darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />}
          />
        </Routes>
      </main>

      <BottomNav />
    </div>
  );
}

function BottomNav() {
  const [activePath, setActivePath] = useState('/');

  return (
    <>
      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-surface/80 dark:bg-slate-950/80 backdrop-blur-xl rounded-t-3xl shadow-[0_-8px_24px_rgba(70,71,211,0.06)] md:hidden z-50">
        <div className="flex justify-around items-center py-3 px-4">
          <button
            onClick={() => setActivePath('/')}
            className={`flex flex-col items-center justify-center px-4 py-2 font-label text-[11px] font-medium uppercase tracking-widest active:scale-90 transition-transform duration-150 cursor-pointer rounded-2xl ${
              activePath === '/'
                ? 'bg-primary/10 text-primary dark:bg-primary-fixed/10 dark:text-primary-fixed'
                : 'text-slate-400 dark:text-slate-500'
            }`}
            aria-label="Sayaç"
          >
            <span className="material-symbols-outlined mb-1">exposure</span>
            <span>Sayaç</span>
          </button>
          <button
            onClick={() => setActivePath('/history')}
            className={`flex flex-col items-center justify-center px-4 py-2 font-label text-[11px] font-medium uppercase tracking-widest active:scale-90 transition-transform duration-150 cursor-pointer rounded-2xl ${
              activePath === '/history'
                ? 'bg-primary/10 text-primary dark:bg-primary-fixed/10 dark:text-primary-fixed'
                : 'text-slate-400 dark:text-slate-500'
            }`}
            aria-label="Geçmiş"
          >
            <span className="material-symbols-outlined mb-1">history</span>
            <span>Geçmiş</span>
          </button>
          <button
            onClick={() => setActivePath('/settings')}
            className={`flex flex-col items-center justify-center px-4 py-2 font-label text-[11px] font-medium uppercase tracking-widest active:scale-90 transition-transform duration-150 cursor-pointer rounded-2xl ${
              activePath === '/settings'
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
            onClick={() => setActivePath('/')}
            className={`p-3 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
              activePath === '/'
                ? 'bg-primary-fixed/20 text-primary-fixed'
                : 'text-slate-500 hover:text-primary-fixed'
            }`}
            aria-label="Sayaç"
          >
            <span className="material-symbols-outlined fill-icon">exposure</span>
          </button>
          <button
            onClick={() => setActivePath('/history')}
            className={`p-3 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
              activePath === '/history'
                ? 'bg-primary-fixed/20 text-primary-fixed'
                : 'text-slate-500 hover:text-primary-fixed'
            }`}
            aria-label="Geçmiş"
          >
            <span className="material-symbols-outlined">history</span>
          </button>
          <button
            onClick={() => setActivePath('/settings')}
            className={`p-3 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
              activePath === '/settings'
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
