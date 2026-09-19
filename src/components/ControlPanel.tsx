import React, { useState } from 'react';
import { ArtworkSettings, ColorPair } from '../types';
import { COLOR_PALETTES } from '../constants/palettes';
import { Sliders, Camera, Palette, RefreshCw, ChevronUp, ChevronDown, Info } from 'lucide-react';

interface ControlPanelProps {
  settings: ArtworkSettings;
  onUpdateSettings: (newSettings: Partial<ArtworkSettings>) => void;
  activePalette: ColorPair;
  onSelectPalette: (paletteId: string) => void;
  stats: { fps: number; activeParticles: number };
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  settings,
  onUpdateSettings,
  activePalette,
  onSelectPalette,
  stats,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <aside className="fixed bottom-6 left-1/2 -translate-x-1/2 sm:translate-x-0 sm:left-6 z-40 w-[92%] sm:w-80 max-w-md">
      <div className="backdrop-blur-xl bg-neutral-900/85 border border-neutral-800/80 rounded-2xl shadow-2xl overflow-hidden text-neutral-100 transition-all">
        {/* Cabeçalho do Painel */}
        <div 
          onClick={() => setIsOpen(!isOpen)}
          className="px-4 py-3 bg-neutral-800/40 border-b border-neutral-800/60 flex items-center justify-between cursor-pointer hover:bg-neutral-800/60 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-pink-500" />
            <span className="font-semibold text-xs tracking-wider uppercase">
              Painel de Tensão & Polarização
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-neutral-400 bg-neutral-800 px-2 py-0.5 rounded-full">
              {stats.fps} FPS
            </span>
            {isOpen ? <ChevronDown className="w-4 h-4 text-neutral-400" /> : <ChevronUp className="w-4 h-4 text-neutral-400" />}
          </div>
        </div>

        {/* Conteúdo Expansível */}
        {isOpen && (
          <div className="p-4 space-y-4 max-h-[70vh] overflow-y-auto custom-scrollbar">
            {/* Seletor de Paletas */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-medium text-neutral-300 mb-2">
                <Palette className="w-3.5 h-3.5 text-pink-400" />
                <span>Pares Polares & Ideológicos</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {COLOR_PALETTES.map((pal) => {
                  const isSelected = pal.id === activePalette.id;
                  return (
                    <button
                      key={pal.id}
                      onClick={() => onSelectPalette(pal.id)}
                      className={`p-2.5 rounded-xl border text-left transition-all flex flex-col gap-1.5 ${
                        isSelected
                          ? 'bg-neutral-800 border-pink-500/60 shadow-[0_0_12px_rgba(236,72,153,0.2)]'
                          : 'bg-neutral-900/60 border-neutral-800 hover:border-neutral-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-neutral-200">
                          {pal.name}
                        </span>
                        <div className="flex -space-x-1.5">
                          <div
                            className="w-3.5 h-3.5 rounded-full border border-neutral-900"
                            style={{ backgroundColor: `rgb(${pal.color1.join(',')})` }}
                          />
                          <div
                            className="w-3.5 h-3.5 rounded-full border border-neutral-900"
                            style={{ backgroundColor: `rgb(${pal.color2.join(',')})` }}
                          />
                        </div>
                      </div>
                      <p className="text-[10px] text-neutral-400 line-clamp-1">
                        {pal.leftName} vs {pal.rightName}
                      </p>
                    </button>
                  );
                })}
              </div>
              <p className="text-[10px] text-neutral-400 mt-2 italic">
                {activePalette.description}
              </p>
            </div>

            <div className="h-[1px] bg-neutral-800/80" />

            {/* Controles deslizantes */}
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-neutral-300 font-medium">Densidade de Partículas</span>
                  <span className="text-neutral-400 font-mono">{settings.particleCount}</span>
                </div>
                <input
                  type="range"
                  min="200"
                  max="2000"
                  step="100"
                  value={settings.particleCount}
                  onChange={(e) => onUpdateSettings({ particleCount: Number(e.target.value) })}
                  className="w-full accent-pink-500 bg-neutral-800 h-1.5 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-neutral-300 font-medium">Força de Atração / Tensão</span>
                  <span className="text-neutral-400 font-mono">{settings.attractionForce.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="3.0"
                  step="0.1"
                  value={settings.attractionForce}
                  onChange={(e) => onUpdateSettings({ attractionForce: Number(e.target.value) })}
                  className="w-full accent-blue-500 bg-neutral-800 h-1.5 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-neutral-300 font-medium">Fluidez (Fricção)</span>
                  <span className="text-neutral-400 font-mono">{settings.friction.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0.80"
                  max="0.98"
                  step="0.01"
                  value={settings.friction}
                  onChange={(e) => onUpdateSettings({ friction: Number(e.target.value) })}
                  className="w-full accent-purple-500 bg-neutral-800 h-1.5 rounded-lg cursor-pointer"
                />
              </div>
            </div>

            <div className="h-[1px] bg-neutral-800/80" />

            {/* Alternância de Modo Câmera & Reset */}
            <div className="flex items-center justify-between pt-1">
              <button
                onClick={() => onUpdateSettings({ cameraMode: !settings.cameraMode })}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium border transition-all ${
                  settings.cameraMode
                    ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.2)]'
                    : 'bg-neutral-800/50 border-neutral-700/60 text-neutral-300 hover:bg-neutral-800'
                }`}
              >
                <Camera className="w-3.5 h-3.5" />
                <span>{settings.cameraMode ? 'Câmera Ativa' : 'Ativar Câmera'}</span>
              </button>

              <button
                onClick={() => onUpdateSettings({ particleCount: 800, attractionForce: 1.0, friction: 0.92, cameraMode: false })}
                title="Restaurar padrão"
                className="p-2 rounded-xl bg-neutral-800/50 border border-neutral-700/60 text-neutral-400 hover:text-white transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="bg-neutral-800/30 rounded-xl p-2.5 flex items-start gap-2 border border-neutral-800/50">
              <Info className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
              <p className="text-[11px] text-neutral-400 leading-relaxed">
                Mova o cursor ou toque na tela para tensionar as partículas polares. Explore o equilíbrio entre o conflito e a síntese.
              </p>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
