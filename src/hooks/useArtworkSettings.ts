import { useState, useEffect } from 'react';
import { ArtworkSettings } from '../types';
import { COLOR_PAIRS } from '../constants/palettes';

const STORAGE_KEY = 'contrastes_artwork_settings_v1';

const DEFAULT_SETTINGS: ArtworkSettings = {
  particleCount: 800,
  attractionForce: 1.0,
  friction: 0.92,
  cameraMode: false,
  soundEnabled: false,
  activePaletteId: COLOR_PAIRS[0].id,
};

export const useArtworkSettings = () => {
  const [settings, setSettings] = useState<ArtworkSettings>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return { ...DEFAULT_SETTINGS, ...parsed };
      }
    } catch (e) {
      console.error('Erro ao ler configurações do localStorage:', e);
    }
    return DEFAULT_SETTINGS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch (e) {
      console.error('Erro ao salvar configurações no localStorage:', e);
    }
  }, [settings]);

  const updateSetting = <K extends keyof ArtworkSettings>(key: K, value: ArtworkSettings[K]) => {
    setSettings(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
  };

  return {
    settings,
    updateSetting,
    resetSettings,
  };
};
