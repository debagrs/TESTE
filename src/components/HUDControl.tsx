import React from 'react';
import {
  Palette,
  Play,
  Pause,
  RotateCcw,
  Camera,
  MousePointer,
  Sliders,
  Info,
  Sparkles,
  Layers,
}
from 'lucide-react';
import { ColorPair, InteractionConfig, InteractionMode } from '../types';

interface HUDControlProps {
  colorPairs: ColorPair[];
  selectedPair: ColorPair;
  onSelectPair: (pair: ColorPair) => void;
  config: InteractionConfig;
  onChangeConfig: (updater: Partial<InteractionConfig>) => void;
  onResetParticles: () => void;
  onOpenAbout: () => void;
}

export const HUDControl: React.FC<HUDControlProps> = ({
  colorPairs,
  selectedPair,
  onSelectPair,
  config,
  onChangeConfig,
  onResetParticles,
  onOpenAbout,
}) => {
  const [showPaletteMenu, setShowPaletteMenu] = React.useState(false);
  const [showSettingsMenu, setShowSettingsMenu] = React.useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-30 p-4 pointer-events-none flex flex-col md:flex-row items-center justify-between gap-4">
      {/* Title & Brand */}
      <div className="pointer-events-auto bg-[#0f0f14]/80 backdrop-blur-md border border-white/10 px-4 py-2.5 rounded-2xl shadow-2xl flex items-center gap-3">
        <div className="w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: `rgb(${selectedPair.c1.join(',')})` }} />
        <h1 className="text-slate-100 font-bold tracking-wider text-lg uppercase font-mono">
          CONTRASTES <span className="text-xs text-slate-400 font-normal">| 5I's</span>
        </h1>
      </div>

      {/* Central / Right HUD Toolbar */}
      <nav className="pointer-events-auto bg-[#0f0f14]/80 backdrop-blur-md border border-white/10 p-2 rounded-2xl shadow-2xl flex items-center gap-2 flex-wrap justify-center">
        {/* Palette Selector Dropdown Toggle */}
        <div className="relative">
          <button
            onClick={() => {
              setShowPaletteMenu(!showPaletteMenu);
              setShowSettingsMenu(false);
            }}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 text-sm transition-colors border border-white/5"
            title="Escolher Paleta Ideológica"
          >
            <Palette className="w-4 h-4 text-rose-400" />
            <span className="hidden sm:inline font-medium">{selectedPair.name}</span>
          </button>

          {showPaletteMenu && (
            <div className="absolute top-full mt-2 left-0 w-64 bg-[#0f0f14]/95 backdrop-blur-xl border border-white/15 rounded-2xl shadow-2xl p-2 z-40 flex flex-col gap-1">
              <div className="text-xs font-mono text-slate-400 px-3 py-1 uppercase tracking-wider">
                Polos Ideológicos
              </div>
              {colorPairs.map((pair) => (
                <button
                  key={pair.id}
                  onClick={() => {
                    onSelectPair(pair);
                    setShowPaletteMenu(false);
                  }}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-all ${
                    selectedPair.id === pair.id
                      ? 'bg-white/15 text-white font-semibold'
                      : 'text-slate-300 hover:bg-white/5'
                  }`}
                >
                  <span>{pair.name}</span>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: `rgb(${pair.c1.join(',')})` }} />
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: `rgb(${pair.c2.join(',')})` }} />
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Interaction Mode Toggles */}
        <div className="flex items-center bg-black/30 rounded-xl p-1 border border-white/5">
          <button
            onClick={() => onChangeConfig({ mode: 'mouse' })}
            className={`p-2 rounded-lg text-sm transition-colors ${
              config.mode === 'mouse'
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'text-slate-400 hover:text-white'
            }`}
            title="Modo Mouse / Toque"
          >
            <MousePointer className="w-4 h-4" />
          </button>
          <button
            onClick={() => onChangeConfig({ mode: 'camera' })}
            className={`p-2 rounded-lg text-sm transition-colors ${
              config.mode === 'camera'
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'text-slate-400 hover:text-white'
            }`}
            title="Modo Câmera de Presença"
          >
            <Camera className="w-4 h-4" />
          </button>
        </div>

        {/* Impressionist Mode Toggle */}
        <button
          onClick={() => onChangeConfig({ impressionistMode: !config.impressionistMode })}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm transition-colors border ${
            config.impressionistMode
              ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
              : 'bg-white/5 text-slate-400 border-white/5 hover:bg-white/10'
          }`}
          title="Alternar Pinceladas Impressionistas"
        >
          <Sparkles className="w-4 h-4" />
          <span className="hidden lg:inline">Impressão</span>
        </button>

        {/* Pause / Play */}
        <button
          onClick={() => onChangeConfig({ isPaused: !config.isPaused })}
          className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 transition-colors border border-white/5"
          title={config.isPaused ? 'Retomar Obra' : 'Pausar Obra'}
        >
          {config.isPaused ? <Play className="w-4 h-4 text-emerald-400" /> : <Pause className="w-4 h-4 text-amber-400" />}
        </button>

        {/* Settings / Sliders Toggle */}
        <div className="relative">
          <button
            onClick={() => {
              setShowSettingsMenu(!showSettingsMenu);
              setShowPaletteMenu(false);
            }}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 transition-colors border border-white/5"
            title="Configurações de Partículas"
          >
            <Sliders className="w-4 h-4 text-cyan-400" />
          </button>

          {showSettingsMenu && (
            <div className="absolute top-full mt-2 right-0 w-72 bg-[#0f0f14]/95 backdrop-blur-xl border border-white/15 rounded-2xl shadow-2xl p-4 z-40 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">Parâmetros</span>
                <button
                  onClick={onResetParticles}
                  className="flex items-center gap-1 text-xs text-rose-400 hover:text-rose-300"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Resetar
                </button>
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Quantidade de Partículas</span>
                  <span className="font-mono">{config.particleCount}</span>
                </div>
                <input
                  type="range"
                  min="200"
                  max="3000"
                  step="100"
                  value={config.particleCount}
                  onChange={(e) => onChangeConfig({ particleCount: Number(e.target.value) })}
                  className="w-full accent-indigo-500 bg-white/10 rounded-lg appearance-none h-1.5"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Turbulência / Dinâmica</span>
                  <span className="font-mono">{config.turbulence.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="3.0"
                  step="0.1"
                  value={config.turbulence}
                  onChange={(e) => onChangeConfig({ turbulence: Number(e.target.value) })}
                  className="w-full accent-indigo-500 bg-white/10 rounded-lg appearance-none h-1.5"
                />
              </div>
            </div>
          )}
        </div>

        {/* About / Manifesto Modal Button */}
        <button
          onClick={onOpenAbout}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 transition-colors text-sm font-medium"
          title="Sobre a Obra e ODS"
        >
          <Info className="w-4 h-4" />
          <span className="hidden sm:inline">Manifesto</span>
        </button>
      </nav>
    </header>
  );
};
