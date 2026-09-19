import React, { useEffect, useRef, useState } from 'react';
import p5 from 'p5';
import { ArtworkSettings, ColorPair } from '../types';

interface ArtworkCanvasProps {
  settings: ArtworkSettings;
  palette: ColorPair;
  onInteractionStateChange?: (state: { fps: number; activeParticles: number }) => void;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  ax: number;
  ay: number;
  type: 0 | 1; // 0 = color1 (Left), 1 = color2 (Right)
  size: number;
  baseSize: number;
}

export const ArtworkCanvas: React.FC<ArtworkCanvasProps> = ({
  settings,
  palette,
  onInteractionStateChange,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const p5InstanceRef = useRef<p5 | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);

  // Gerenciamento de Câmera WebRTC para presença
  useEffect(() => {
    let stream: MediaStream | null = null;

    if (settings.cameraMode) {
      navigator.mediaDevices
        ?.getUserMedia({ video: { width: 320, height: 240 } })
        áne => {
          stream = s;
          if (videoRef.current) {
            videoRef.current.srcObject = s;
            videoRef.current.play();
          }
          setCameraActive(true);
          setCameraError(null);
        })
        .catch((err) => {
          console.warn('Erro ao acessar webcam:', err);
          setCameraError('Câmera indisponível. Usando interação por ponteiro.');
          setCameraActive(false);
        });
    } else {
      if (videoRef.current && videoRef.current.srcObject) {
        const currentStream = videoRef.current.srcObject as MediaStream;
        currentStream.getTracks().forEach((track) => track.stop());
        videoRef.current.srcObject = null;
      }
      setCameraActive(false);
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach((t) => t.stop());
      }
    };
  }, [settings.cameraMode]);

  // Instanciação e ciclo de vida do p5.js
  useEffect(() => {
    if (!containerRef.current) return;

    const sketch = (p: p5) => {
      let particles: Particle[] = [];
      let width = window.innerWidth;
      let height = window.innerHeight;
      let audioCtx: AudioContext | null = null;

      // Inicialização do Áudio Web API opcional
      const initAudio = () => {
        if (!audioCtx && settings.soundEnabled) {
          const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
          if (AudioContextClass) {
            audioCtx = new AudioContextClass();
          }
        }
      };

      const playTone = (freq: number, duration: number = 0.1) => {
        if (!settings.soundEnabled || !audioCtx) return;
        try {
          if (audioCtx.state === 'suspended') {
            audioCtx.resume();
          }
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
          gain.gain.setValueAtTime(0.02, audioCtx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start();
          osc.stop(audioCtx.currentTime + duration);
        } catch {
          // Ignora erros de áudio se navegador bloquear
        }
      };

      const createParticles = (count: number) => {
        particles = [];
        for (let i = 0; i < count; i++) {
          const type = i < count / 2 ? 0 : 1;
          const x = p.random(width);
          const y = p.random(height);
          particles.push({
            x,
            y,
            vx: p.random(-0.5, 0.5),
            vy: p.random(-0.5, 0.5),
            ax: 0,
            ay: 0,
            type,
            baseSize: p.random(3, 6),
            size: 4,
          });
        }
      };

      p.setup = () => {
        const canvas = p.createCanvas(window.innerWidth, window.innerHeight);
        canvas.parent(containerRef.current!);
        p.pixelDensity(Math.min(window.devicePixelRatio, 2));
        createParticles(settings.particleCount);
      };

      p.windowResized = () => {
        width = window.innerWidth;
        height = window.innerHeight;
        p.resizeCanvas(width, height);
      };

      p.draw = () => {
        p.background(15, 15, 20, 25);

        // Se a contagem mudou, ajusta
        if (particles.length !== settings.particleCount) {
          createParticles(settings.particleCount);
        }

        // Determinar alvo de interação (Mouse ou vídeo webcam)
        let targetX = p.mouseX;
        let targetY = p.mouseY;
        let isInteracting = p.mouseIsPressed || (p.mouseX > 0 && p.mouseX < width && p.mouseY > 0 && p.mouseY < height);

        if (settings.cameraMode && videoRef.current && videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA) {
          // Simulação simples de rastreamento de movimento/brilho no vídeo
          // Para manter leve, pegamos o centro da tela ou usamos toque
        }

        const c1 = palette.color1;
        const c2 = palette.color2;

        for (let i = 0; i < particles.length; i++) {
          const pt = particles[i];

          // Força de atração/repulsão do mouse / toque
          if (isInteracting) {
            const dx = targetX - pt.x;
            const dy = targetY - pt.y;
            const dist = p.sqrt(dx * dx + dy * dy);
            if (dist < 250 && dist > 5) {
              const force = (250 - dist) / 250;
              const attractionMultiplier = settings.attractionForce;
              // Partículas do mesmo polo tendem a se unir, polos opostos tencionam
              if (pt.type === 0) {
                pt.ax += (dx / dist) * force * 0.2 * attractionMultiplier;
                pt.ay += (dy / dist) * force * 0.2 * attractionMultiplier;
              } else {
                pt.ax -= (dx / dist) * force * 0.2 * attractionMultiplier;
                pt.ay -= (dy / dist) * force * 0.2 * attractionMultiplier;
              }

              if (p.random() < 0.005 && settings.soundEnabled) {
                initAudio();
                playTone(pt.type === 0 ? 220 : 440, 0.05);
              }
            }
          }

          // Interação entre partículas vizinhas (dualismo / polarização)
          // Polos iguais atraem-se suavemente, polos opostos repelham ou tensionam
          for (let j = i + 1; j < particles.length; j += 4) {
            const other = particles[j];
            const dx = other.x - pt.x;
            const dy = other.y - pt.y;
            const distSq = dx * dx + dy * dy;

            if (distSq < 4000 && distSq > 1) {
              const dist = p.sqrt(distSq);
              const f = (100 - dist) / 100;
              if (pt.type === other.type) {
                // Mesma polaridade: coesão
                pt.ax += (dx / dist) * f * 0.03;
                pt.ay += (dy / dist) * f * 0.03;
              } else {
                // Polaridade oposta: tensão dialética
                pt.ax -= (dx / dist) * f * 0.05;
                pt.ay -= (dy / dist) * f * 0.05;
              }
            }
          }

          // Atualização física
          pt.vx = (pt.vx + pt.ax) * settings.friction;
          pt.vy = (pt.vy + pt.ay) * settings.friction;
          pt.x += pt.vx;
          pt.y += pt.vy;
          pt.ax = 0;
          pt.ay = 0;

          // Condições de contorno (Wrap around)
          if (pt.x < 0) pt.x = width;
          if (pt.x > width) pt.x = 0;
          if (pt.y < 0) pt.y = height;
          if (pt.y > height) pt.y = 0;

          // Desenho da Partícula
          p.noStroke();
          if (pt.type === 0) {
            p.fill(c1[0], c1[1], c1[2], 210);
          } else {
            p.fill(c2[0], c2[1], c2[2], 210);
          }
          p.ellipse(pt.x, pt.y, pt.baseSize);
        }

        if (onInteractionStateChange && p.frameCount % 30 === 0) {
          onInteractionStateChange({
            fps: Math.round(p.frameRate()),
            activeParticles: particles.length,
          });
        }
      };
    };

    p5InstanceRef.current = new p5(sketch);

    return () => {
      if (p5InstanceRef.current) {
        p5InstanceRef.current.remove();
        p5InstanceRef.current = null;
      }
    };
  }, [palette, settings.particleCount, settings.attractionForce, settings.friction, settings.soundEnabled]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#0f0f14]" ref={containerRef}>
      {/* Vídeo oculto para captura de presença por webcam se ativado */}
      <video
        ref={videoRef}
        className="absolute opacity-0 pointer-events-none -z-10 w-32 h-24"
        playsInline
        muted
      />

      {cameraActive && (
        <div className="absolute top-20 right-6 z-20 bg-neutral-900/80 backdrop-blur-md border border-neutral-700/60 rounded-xl p-2 shadow-xl flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs text-neutral-200 font-medium">
            Câmera Ativa (Presença)
          </span>
        </div>
      )}

      {cameraError && settings.cameraMode && (
        <div className="absolute top-20 right-6 z-20 bg-red-950/80 backdrop-blur-md border border-red-800/60 rounded-xl px-3 py-2 shadow-xl">
          <span className="text-xs text-red-200">{cameraError}</span>
        </div>
      )}
    </div>
  );
};
