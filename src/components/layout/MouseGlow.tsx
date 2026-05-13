import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type Particle = {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  phase: number;
  speed: number;
  wander: number;
};

const createParticles = (width: number, height: number, count: number): Particle[] => {
  return Array.from({ length: count }, (_, index) => {
    const seed = index + 1;
    const colorIndex = seed % 6;
    const color =
      colorIndex === 0 || colorIndex === 3
        ? "245, 158, 11"
        : colorIndex === 1 || colorIndex === 4
          ? "125, 211, 252"
          : "255, 255, 255";

    return {
      x: Math.random() * width,
      y: Math.random() * height,
      originX: Math.random() * width,
      originY: Math.random() * height,
      vx: 0,
      vy: 0,
      size: 0.7 + Math.random() * 2.6,
      color,
      alpha: 0.2 + Math.random() * 0.55,
      phase: Math.random() * Math.PI * 2,
      speed: 0.35 + Math.random() * 0.8,
      wander: 5 + Math.random() * 20,
    };
  }).map((particle) => ({
    ...particle,
    x: particle.originX,
    y: particle.originY,
  }));
};

export const MouseGlow = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const softX = useSpring(mouseX, { stiffness: 90, damping: 24, mass: 0.8 });
  const softY = useSpring(mouseY, { stiffness: 90, damping: 24, mass: 0.8 });
  const sharpX = useSpring(mouseX, { stiffness: 180, damping: 30, mass: 0.5 });
  const sharpY = useSpring(mouseY, { stiffness: 180, damping: 30, mass: 0.5 });
  const ringX = useSpring(mouseX, { stiffness: 240, damping: 34, mass: 0.45 });
  const ringY = useSpring(mouseY, { stiffness: 240, damping: 34, mass: 0.45 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (!canvas || !context) {
      return;
    }

    const cursor = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      active: false,
    };

    let frameId = 0;
    let width = 0;
    let height = 0;
    let particles: Particle[] = [];

    const setCanvasSize = () => {
      width = window.innerWidth;
      height = window.innerHeight;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      const particleCount = Math.min(260, Math.max(150, Math.floor((width * height) / 9000)));
      particles = createParticles(width, height, particleCount);
    };

    const drawParticle = (particle: Particle) => {
      context.beginPath();
      context.arc(particle.x, particle.y, particle.size * 3.8, 0, Math.PI * 2);
      context.fillStyle = `rgba(${particle.color}, ${particle.alpha * 0.08})`;
      context.fill();

      context.beginPath();
      context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      context.fillStyle = `rgba(${particle.color}, ${particle.alpha})`;
      context.fill();
    };

    const animate = (time: number) => {
      context.clearRect(0, 0, width, height);

      for (const particle of particles) {
        const wave = time * 0.00025 * particle.speed + particle.phase;
        const targetX = particle.originX + Math.cos(wave) * particle.wander;
        const targetY = particle.originY + Math.sin(wave * 1.17) * particle.wander;

        particle.vx += (targetX - particle.x) * 0.01;
        particle.vy += (targetY - particle.y) * 0.01;

        if (cursor.active) {
          const dx = particle.x - cursor.x;
          const dy = particle.y - cursor.y;
          const distance = Math.hypot(dx, dy);
          const radius = 120;

          if (distance < radius) {
            const force = (1 - distance / radius) * 1.8;
            const safeDistance = distance || 1;
            particle.vx += (dx / safeDistance) * force;
            particle.vy += (dy / safeDistance) * force;
          }
        }

        particle.vx *= 0.94;
        particle.vy *= 0.94;
        particle.x += particle.vx;
        particle.y += particle.vy;

        drawParticle(particle);
      }

      frameId = window.requestAnimationFrame(animate);
    };

    const handleMove = (event: MouseEvent) => {
      cursor.x = event.clientX;
      cursor.y = event.clientY;
      cursor.active = true;
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
    };

    const handleLeave = () => {
      cursor.active = false;
    };

    mouseX.set(cursor.x);
    mouseY.set(cursor.y);
    setCanvasSize();
    frameId = window.requestAnimationFrame(animate);

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("resize", setCanvasSize);
    window.addEventListener("mouseout", handleLeave);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("resize", setCanvasSize);
      window.removeEventListener("mouseout", handleLeave);
    };
  }, [mouseX, mouseY]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <canvas ref={canvasRef} className="particle-canvas" aria-hidden />

      <motion.div
        aria-hidden
        className="cursor-blob cursor-blob-primary"
        style={{
          x: softX,
          y: softY,
        }}
      />
      <motion.div
        aria-hidden
        className="cursor-blob cursor-blob-secondary"
        style={{
          x: sharpX,
          y: sharpY,
        }}
      />
      <motion.div
        aria-hidden
        className="cursor-blob cursor-blob-tertiary"
        style={{
          x: softX,
          y: sharpY,
        }}
      />
      <motion.div
        aria-hidden
        className="cursor-bubble cursor-bubble-ring"
        style={{
          x: ringX,
          y: ringY,
        }}
      />
      <motion.div
        aria-hidden
        className="cursor-bubble cursor-bubble-core"
        style={{
          x: sharpX,
          y: sharpY,
        }}
      />
      <motion.div
        aria-hidden
        className="cursor-bubble cursor-bubble-trail"
        style={{
          x: softX,
          y: softY,
        }}
      />
    </div>
  );
};
