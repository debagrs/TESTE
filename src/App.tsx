import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ArtworkCanvas from './components/ArtworkCanvas';
import ControlPanel from './components/ControlPanel';
import ManifestoView from './components/ManifestoView';
import { useArtworkSettings } from './hooks/useArtworkSettings';
import { COLOR_PALETTES } from './constants/palettes';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<'canvas' | 'manifesto'>('canvas');
  const { settings, updateSettings, resetSettings } = useArtworkSettings();

  const activePalette =
    COLOR_PALETTES.find((p) => p.id === settings.activePaletteId) || COLOR_PALETTES[0];

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#0f0f14] text-[#f3f4f6] font-sans select-none">
      {/* Top Navbar */}
      <Navbar currentRoute={currentRoute} onNavigate={setCurrentRoute} />

      {/* Main Content Area */}
      {currentRoute === 'canvas' ? (
        <main className="relative w-full h-full">
          {/* P5 Interactive Canvas */}
          <ArtworkCanvas settings={settings} palette={activePalette} />

          {/* Floating Control Panel */}
          <ControlPanel
            settings={settings}
            onUpdateSettings={updateSettings}
            onReset={resetSettings}
          />
        </main>
      ) : (
        <ManifestoView />
      )}
    </div>
  );
}
