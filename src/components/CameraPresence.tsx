import React, { useEffect, useRef } from 'react';
import { Video, VideoOff, AlertCircle } from 'lucide-react';

interface CameraPresenceProps {
  active: boolean;
  onMotionDetected: (x: number, y: number, intensity: number) => void;
  onError?: (error: string) => void;
}

export const CameraPresence: React.FC<CameraPresenceProps> = ({ active, onMotionDetected }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const prevFrameRef = useRef<ImageData | null>(null);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  useEffect(() => {
    if (!active) {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
        videoRef.current.srcObject = null;
      }
      return;
    }

    let stream: MediaStream | null = null;
    let animationFrameId: number;

    async function setupCamera() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 320, height: 240, frameRate: { ideal: 30 } },
          audio: false,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
        setErrorMsg(null);
        processFrame();
      } catch (err: any) {
        console.error('Erro ao acessar webcam:', err);
        setErrorMsg('Não foi possível acessar a câmera. Verifique as permissões.');
      }
    }

    const processFrame = () => {
      if (!videoRef.current || !canvasRef.current || !active) return;

      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });

      if (!ctx) return;

      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        const w = 160;
        const h = 120;
        canvas.width = w;
        canvas.height = h;

        // Desenha espelhado para naturalidade
        ctx.save();
        ctx.scale(-1, 1);
        ctx.drawImage(video, -w, 0, w, h);
        ctx.restore();

        const currentData = ctx.getImageData(0, 0, w, h);
        const prevData = prevFrameRef.current;

        if (prevData) {
          let diffX = 0;
          let diffY = 0;
          let totalDiff = 0;
          let count = 0;

          const step = 4;
          for (let y = 0; y < h; y += step) {
            for (let x = 0; x < w; x += step) {
              const i = (y * w + x) * 4;
              const rDiff = Math.abs(currentData.data[i] - prevData.data[i]);
              const gDiff = Math.abs(currentData.data[i + 1] - prevData.data[i + 1]);
              const bDiff = Math.abs(currentData.data[i + 2] - prevData.data[i + 2]);

              const delta = (rDiff + gDiff + bDiff) / 3;
              if (delta > 35) {
                diffX += x;
                diffY += y;
                totalDiff += delta;
                count++;
              }
            }
          }

          if (count > 15) {
            const avgX = diffX / count;
            const avgY = diffY / count;
            // Mapeia para coordenadas de tela relativas
            const screenX = (avgX / w) * window.innerWidth;
            const screenY = (avgY / h) * window.innerHeight;
            const intensity = Math.min(totalDiff / (count * 50), 3);

            onMotionDetected(screenX, screenY, intensity);
          }
        }

        prevFrameRef.current = currentData;
      }

      animationFrameId = requestAnimationFrame(processFrame);
    };

    setupCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [active, onMotionDetected]);

  if (!active) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end pointer-events-none">
      {errorMsg ? (
        <div className="pointer-events-auto flex items-center gap-2 px-3 py-2 bg-red-950/80 border border-red-500/30 rounded-xl text-red-300 text-xs shadow-lg backdrop-blur-md">
          <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-400" />
          <span>{errorMsg}</span>
        </div>
      ) : (
        <div className="relative w-32 h-24 rounded-xl overflow-hidden border border-white/20 shadow-2xl bg-black/40 backdrop-blur-md">
          <video
            ref={videoRef}
            playsInline
            muted
            className="w-full h-full object-cover transform -scale-x-100 opacity-70"
          />
          <div className="absolute top-2 left-2 flex items-center gap-1 px-1.5 py-0.5 rounded bg-black/60 text-[10px] text-emerald-400 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            CAMERA ATIVA
          </div>
          <canvas ref={canvasRef} className="hidden" />
        </div>
      )}
    </div>
  );
};
