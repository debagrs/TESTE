import { ColorPair } from '../types';

export const COLOR_PALETTES: ColorPair[] = [
  {
    id: 'bw',
    name: 'Monolítico (Preto & Branco)',
    leftName: 'Dogma / Ordem',
    rightName: 'Caos / Vazio',
    color1: [240, 240, 245],
    color2: [25, 25, 30],
    description: 'O dualismo clássico entre a luz absoluta e a sombra. A pureza formal que desafia a nuance.'
  },
  {
    id: 'red-blue',
    name: 'Polarização Partidária (Vermelho & Azul)',
    leftName: 'Esquerda / Coletivo',
    rightName: 'Direita / Mercado',
    color1: [239, 68, 68],
    color2: [59, 130, 246],
    description: 'A tensão clássica das arenas democráticas modernas. O choque entre solidariedade estrutural e liberdade individual.'
  },
  {
    id: 'yellow-purple',
    name: 'Alquimia Ideológica (Amarelo & Roxo)',
    leftName: 'Iluminismo / Razão',
    rightName: 'Tradição / Mistério',
    color1: [234, 179, 8],
    color2: [168, 85, 247],
    description: 'O contraste entre o brilho da razão instrumental e a profundidade dos saberes ancestrais e institucionais.'
  },
  {
    id: 'green-magenta',
    name: 'Tecnodiversidade (Verde & Magenta)',
    leftName: 'Ecologia / Biosfera',
    rightName: 'Tecnologia / Cibernética',
    color1: [34, 197, 94],
    color2: [236, 72, 153],
    description: 'Inspirado em Yuk Hui: a negociação necessária entre a urgência ecológica e a aceleração digital.'
  }
];

export const DEFAULT_SETTINGS = {
  particleCount: 800,
  attractionForce: 0.5,
  friction: 0.92,
  cameraMode: false,
  soundEnabled: false,
  activePaletteId: 'red-blue'
};
