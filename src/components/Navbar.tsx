import React from 'react';
import { Sparkles, BookOpen, Layers, Volume2, VolumeX } from 'lucide-react';

interface NavbarProps {
  activeView: 'canvas' | 'manifesto';
  onViewChange: (view: 'canvas' | 'manifesto') => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  onViewChange,
  soundEnabled,
  onToggleSound,
}) => {
  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-4xl">
      <nav className="backdrop-blur-md bg-neutral-900/80 border border-neutral-800/80 shadow-2xl rounded-full px-6 py-3 flex items-center justify-between text-neutral-100">
        <div 
          onClick={() => onViewChange('canvas')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-pink-500 via-purple-500 to-blue-500 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
            <Layers className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold tracking-wider text-sm sm:text-base bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent">
              CONTRASTES
            </h1>
            <p className="text-[10px] text-neutral-400 tracking-widest uppercase">
              Obra Interativa • ODS 3, 4 & 8
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onToggleSound}
            title={soundEnabled ? 'Desativar som harmônico' : 'Ativar som harmônico'}
            className={`p-2.5 rounded-full border transition-all ${
              soundEnabled
                ? 'bg-pink-500/20 border-pink-500/50 text-pink-400 shadow-[0_0_15px_rgba(236,72,153,0.3)]'
                : 'bg-neutral-800/60 border-neutral-700 text-neutral-400 hover:text-white'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <div className="h-5 w-[1px] bg-neutral-800 mx-1" />

          <button
            onClick={() => onViewChange('canvas')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all ${
              activeView === 'canvas'
                ? 'bg-neutral-100 text-neutral-900 shadow-md'
                : 'text-neutral-300 hover:text-white hover:bg-neutral-800/60'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Simulação</span>
          </button>

          <button
            onClick={() => onViewChange('manifesto')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all ${
              activeView === 'manifesto'
                ? 'bg-neutral-100 text-neutral-900 shadow-md'
                : 'text-neutral-300 hover:text-white hover:bg-neutral-800/60'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Manifesto & ODS</span>
          </button>
        </div>
      </nav>
    </header>
  );
};
