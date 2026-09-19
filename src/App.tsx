import React, { useState, useCallback } from 'react';
import InteractiveCanvas from './components/InteractiveCanvas';
import HUDControl from './components/HUDControl';
import AboutModal from './components/AboutModal';
import { ColorPair, InteractionConfig } from './types';
import { Info, Sparkles } from 'lucide-react';

const COLOR_PAIRS: ColorPair[] = [
  {
    id: 'classic',
    name: 'Preto & Branco',
    c1: [20, 20, 25],
    c2: [240, 240, 245],
    description: 'Dualidade primordial: luz e sombra, razão e instinto.'
  },
  {
    id: 'political',
    name: 'Vermelho & Azul',
    c1: [220, 38, 38],
    c2: [37, 99, 235],
    description: 'Polarização ideológica contemporânea em busca de síntese.'
  },
  {
    id: 'vibrant',
    name: 'Amarelo & Roxo',
    c1: [234, 179, 8],
    c2: [147, 51, 234],
    description: 'Contraste complementar de energia e contemplação.'
  },
  {
    id: 'organic',
    name: 'Verde & Magenta',
    c1: [16, 185, 129],
    c2: [236, 72, 153],
    description: 'Tensão entre natureza orgânica e exuberância digital.'
  }
];

export default function App() {
  const [currentPair, setCurrentPair] = useState<ColorPair>(COLOR_PAIRS[0]);
  const [config, setConfig] = useState<InteractionConfig>({
    mode: 'mouse',
    particleCount: 1500,
    turbulence: 1.2,
    impressionistMode: false,
    isPaused: false,
    cameraReady: false
  });
  const [isAboutOpen, setIsAboutOpen] = useState<boolean>(false);
  const [showNotification, setShowNotification] = useState<string | null>(
    'Mova o mouse ou toque na tela para misturar os polos ideológicos.'
  );

  React.useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => {
        setShowNotification(null);
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [showNotification]);

  const handlePairChange = useCallback((pair: ColorPair) => {
    setCurrentPair(pair);
  }, []);

  const handleConfigChange = useCallback((newConfig: Partial<InteractionConfig>) => {
    setConfig(prev => ({ ...prev, ...newConfig }));
  }, []);

  const handleReset = useCallback(() => {
    // Trigger canvas reset via state toggle
    setConfig(prev => ({ ...prev }));
  }, []);

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-[#0f0f14]">
      {/* Interactive Canvas Background / Main Stage */}
      <InteractiveCanvas
        colorPair={currentPair}
        config={config}
        onConfigChange={handleConfigChange}
      />

      {/* Top Header / Title Bar */}
      <header className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-4 bg-gradient-to-b from-[#0f0f14]/90 to-transparent pointer-events-none">
        <div className="flex items-center space-x-3 pointer-events-auto">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-red-500 to-blue-600 flex items-center justify-center shadow-lg shadow-black/50 border border-white/20">
            <Sparkles className="w-5 h-5 text-white animate-pulse" />
          </div>
          <div>
            <h1 className="font-cinzel text-xl md:text-2xl font-bold tracking-widest text-slate-100 drop-shadow">
              CONTRASTES
            </h1>
            <p className="text-[10px] md:text-xs text-slate-400 font-medium tracking-wider uppercase">
              Metodologia 5I's • Obra Interativa
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsAboutOpen(true)}
          className="pointer-events-auto flex items-center space-x-2 px-4 py-2 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-white/10 hover:border-white/30 backdrop-blur-md transition-all shadow-lg active:scale-95 group"
          title="Sobre a Obra e ODS"
        >
          <Info className="w-4 h-4 text-cyan-400 group-hover:rotate-12 transition-transform" />
          <span className="text-xs font-medium tracking-wide hidden sm:inline">Manifesto & ODS</span>
        </button>
      </header>

      {/* Notification Toast */}
      {showNotification && (
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-30 pointer-events-none transition-all animate-fade-in">
          <div className="px-5 py-2.5 rounded-2xl bg-slate-900/90 border border-white/15 backdrop-blur-md shadow-2xl text-slate-200 text-xs md:text-sm text-center flex items-center space-x-2">
            <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>{showNotification}</span>
          </div>
        </div>
      )}

      {/* HUD Control Floating Bar */}
      <HUDControl
        colorPairs={COLOR_PAIRS}
        currentPair={currentPair}
        onPairChange={handlePairChange}
        config={config}
        onConfigChange={handleConfigChange}
        onReset={handleReset}
      />

      {/* About & Manifesto Modal */}
      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
      />
    </main>
  );
}