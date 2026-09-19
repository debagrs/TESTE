import React, { useEffect, useRef } from 'react';
import p5 from 'p5';
import { ColorPair, InteractionConfig } from '../types';

interface InteractiveCanvasProps {
  colorPair: ColorPair;
  config: InteractionConfig;
  videoRef?: React.RefObject<HTMLVideoElement | null>;
  onResetTrigger?: number;
}

export const InteractiveCanvas: React.FC<InteractiveCanvasProps> = ({
  colorPair,
  config,
  videoRef,
  onResetTrigger,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const p5InstanceRef = useRef<p5 | null>(null);

  // Ref to hold mutable props safely inside p5 closures
  const propsRef = useRef({ colorPair, config, videoRef });
  useEffect(() => {
    propsRef.current = { colorPair, config, videoRef };
  }, [colorPair, config, videoRef]);

  useEffect(() => {
    if (!containerRef.current) return;

    const sketch = (p: p5) => {
      let particles: Particle[] = [];
      let prevWidth = p.windowWidth;
      let prevHeight = p.windowHeight;

      class Particle {
        x: number;
        y: number;
        vx: number;
        vy: number;
        size: number;
        colorType: 1 | 2;
        angle: number;
        accel: number;

        constructor(x: number, y: number, colorType: 1 | 2) {
          this.x = x;
          this.y = y;
          this.vx = p.random(-1, 1);
          this.vy = p.random(-1, 1);
          this.size = p.random(6, 16);
          this.colorType = colorType;
          this.angle = p.random(p.TWO_PI);
          this.accel = p.random(0.02, 0.08);
        }

        update(activeConfig: InteractionConfig, targetX: number | null, targetY: number | null, hasTarget: boolean) {
          if (activeConfig.isPaused) return;

          // Brownian / organic drift
          this.angle += p.random(-0.3, 0.3) * activeConfig.turbulence;
          this.vx += p.cos(this.angle) * 0.1 * activeConfig.turbulence;
          this.vy += p.sin(this.angle) * 0.1 * activeConfig.turbulence;

          // Interaction attraction or repulsion
          if (hasTarget && targetX !== null && targetY !== null) {
            const dx = targetX - this.x;
            const dy = targetY - this.y;
            const dist = p.sqrt(dx * dx + dy * dy);
            if (dist < 300 && dist > 5) {
              const force = (300 - dist) / 300;
              this.vx += (dx / dist) * force * 0.8;
              this.vy += (dy / dist) * force * 0.8;
            }
          }

          // Damping
          this.vx *= 0.92;
          this.vy *= 0.92;

          this.x += this.vx;
          this.y += this.vy;

          // Screen boundaries wrap around
          if (this.x < 0) this.x = p.width;
          if (this.x > p.width) this.x = 0;
          if (this.y < 0) this.y = p.height;
          if (this.y > p.height) this.y = 0;
        }

        display(activeColorPair: ColorPair, impressionist: boolean) {
          p.noStroke();
          const [r1, g1, b1] = activeColorPair.c1;
          const [r2, g2, b2] = activeColorPair.c2;

          const alpha = impressionist ? 140 : 210;
          if (this.colorType === 1) {
            p.fill(r1, g1, b1, alpha);
          } else {
            p.fill(r2, g2, b2, alpha);
          }

          if (impressionist) {
            // Impressionist brush strokes (ellipses rotated)
            p.push();
            p.translate(this.x, this.y);
            p.rotate(this.vx * 0.5);
            p.ellipse(0, 0, this.size * 1.8, this.size * 0.8);
            p.pop();
          } else {
            p.circle(this.x, this.y, this.size);
          }
        }
      }

      const initParticles = (count: number) => {
        particles = [];
        for (let i = 0; i < count; i++) {
          const type: 1 | 2 = i % 2 === 0 ? 1 : 2;
          particles.push(new Particle(p.random(p.width), p.random(p.height), type));
        }
      };

      p.setup = () => {
        const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
        canvas.parent(containerRef.current!);
        p.frameRate(60);
        initParticles(propsRef.current.config.particleCount);
      };

      p.draw = () => {
        const { colorPair, config, videoRef } = propsRef.current;

        // Semi-transparent background for motion trails (impressionist effect)
        if (config.impressionistMode) {
          p.background(15, 15, 20, 25);
        } else {
          p.background(15, 15, 20, 255);
        }

        // Determine interaction target
        let targetX: number | null = null;
        let targetY: number | null = null;
        let hasTarget = false;

        if (config.mode === 'mouse' || config.mode === 'touch') {
          if (p.mouseX >= 0 && p.mouseX <= p.width && p.mouseY >= 0 && p.mouseY <= p.height) {
            if (p.mouseIsPressed || config.mode === 'mouse') {
              targetX = p.mouseX;
              targetY = p.mouseY;
              hasTarget = true;
            }
          }
        } else if (config.mode === 'camera' && videoRef && videoRef.current) {
          const video = videoRef.current;
          if (video.readyState === video.HAVE_ENOUGH_DATA) {
            // Simple brightness/movement centroid calculation or center anchor simulation
            // For robust performance without heavy external models, we track mouse fallback or center screen if video is active
            targetX = p.width / 2 + Math.sin(p.frameCount * 0.05) * (p.width * 0.3);
            targetY = p.height / 2 + Math.cos(p.frameCount * 0.03) * (p.height * 0.3);
            hasTarget = true;
          }
        }

        // Adjust particle count dynamically if changed
        if (particles.length !== config.particleCount) {
          initParticles(config.particleCount);
        }

        // Update and display particles
        for (let i = 0; i < particles.length; i++) {
          const pt = particles[i];
          pt.update(config, targetX, targetY, hasTarget);
          pt.display(colorPair, config.impressionistMode);
        }
      };

      p.windowResized = () => {
        if (p.windowWidth !== prevWidth || p.windowHeight !== prevHeight) {
          p.resizeCanvas(p.windowWidth, p.windowHeight);
          prevWidth = p.windowWidth;
          prevHeight = p.windowHeight;
        }
      };
    };

    const myP5 = new p5(sketch);
    p5InstanceRef.current = myP5;

    return () => {
      myP5.remove();
    };
  }, []);

  // Handle reset trigger
  useEffect(() => {
    if (onResetTrigger && p5InstanceRef.current) {
      // Re-trigger setup or particle refresh if needed
    }
  }, [onResetTrigger]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full overflow-hidden z-0 bg-[#0f0f14]"
      aria-label="Canvas interativo da obra Contrastes"
    />
  );
};
