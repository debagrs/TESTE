export type RGBColor = [number, number, number];

export interface ColorPair {
  id: string;
  name: string;
  c1: RGBColor;
  c2: RGBColor;
  description: string;
}

export type InteractionMode = 'mouse' | 'touch' | 'camera';

export interface InteractionConfig {
  mode: InteractionMode;
  particleCount: number;
  turbulence: number;
  impressionistMode: boolean;
  isPaused: boolean;
}
