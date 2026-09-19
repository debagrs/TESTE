export type RGBColor = [number, number, number];

export interface ColorPair {
  id: string;
  name: string;
  leftName: string;
  rightName: string;
  color1: RGBColor;
  color2: RGBColor;
  description: string;
}

export interface ArtworkSettings {
  particleCount: number;
  attractionForce: number;
  friction: number;
  cameraMode: boolean;
  soundEnabled: boolean;
  activePaletteId: string;
}

export interface ParticleData {
  x: number;
  y: number;
  vx: number;
  vy: number;
  type: 0 | 1;
  size: number;
  baseColor: RGBColor;
}
