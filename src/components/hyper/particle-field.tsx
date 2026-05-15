"use client";

import { useEffect, useRef } from "react";

const CYAN = "rgba(29, 224, 177, 0.4)";
const LINE = "rgba(29, 224, 177, 0.05)";

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const drawCtx = ctx;

    let animationFrame = 0;
    const particles: Particle[] = [];
    const particleCount = 120;

    const c = canvas;

    class Particle {
      x = 0;
      y = 0;
      vx = 0;
      vy = 0;
      size = 0;

      constructor() {
        this.init();
      }
      init() {
        this.x = Math.random() * c.width;
        this.y = Math.random() * c.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;

        const dx = mouse.current.x - this.x;
        const dy = mouse.current.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 150) {
          this.x -= dx * 0.02;
          this.y -= dy * 0.02;
        }

        if (this.x < 0 || this.x > c.width) this.vx *= -1;
        if (this.y < 0 || this.y > c.height) this.vy *= -1;
      }
      draw() {
        drawCtx.fillStyle = CYAN;
        drawCtx.beginPath();
        drawCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        drawCtx.fill();
      }
    }

    const resize = () => {
      c.width = window.innerWidth;
      c.height = window.innerHeight;
    };

    for (let i = 0; i < particleCount; i++) particles.push(new Particle());

    const animate = () => {
      drawCtx.clearRect(0, 0, c.width, c.height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      drawCtx.strokeStyle = LINE;
      drawCtx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            drawCtx.beginPath();
            drawCtx.moveTo(particles[i].x, particles[i].y);
            drawCtx.lineTo(particles[j].x, particles[j].y);
            drawCtx.stroke();
          }
        }
      }
      animationFrame = requestAnimationFrame(animate);
    };

    const handleResize = () => resize();
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    resize();
    animate();

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden
    />
  );
}
