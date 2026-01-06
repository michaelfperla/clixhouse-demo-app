"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ConfettiProps {
  isActive: boolean;
  duration?: number;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  rotation: number;
  scale: number;
  velocityX: number;
  velocityY: number;
  rotationSpeed: number;
}

const COLORS = [
  "#ea5a45", // primary-500 (coral-red)
  "#d63f2a", // primary-600
  "#facc15", // gold-400
  "#eab308", // gold-500
  "#f87171", // red-400
  "#fbbf24", // amber-400
];

export function Confetti({ isActive, duration = 4000 }: ConfettiProps) {
  const [show, setShow] = useState(false);

  // Generate particles once when component becomes active
  const particles = useMemo<Particle[]>(() => {
    if (!isActive) return [];

    const newParticles: Particle[] = [];
    for (let i = 0; i < 60; i++) {
      // Particles start from center-top area and burst outward
      const angle = Math.random() * Math.PI - Math.PI / 2; // -90 to 90 degrees
      const speed = 300 + Math.random() * 400;

      newParticles.push({
        id: i,
        x: 40 + Math.random() * 20, // Start near center (40-60% of width)
        y: -5 - Math.random() * 10, // Start just above viewport
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        rotation: Math.random() * 360,
        scale: 0.6 + Math.random() * 0.6,
        velocityX: Math.cos(angle) * speed * (Math.random() > 0.5 ? 1 : -1),
        velocityY: Math.sin(angle) * speed * 0.5 + 100,
        rotationSpeed: (Math.random() - 0.5) * 720,
      });
    }
    return newParticles;
  }, [isActive]);

  useEffect(() => {
    if (isActive) {
      setShow(true);
      const timer = setTimeout(() => setShow(false), duration);
      return () => clearTimeout(timer);
    } else {
      setShow(false);
    }
  }, [isActive, duration]);

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute"
              initial={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                rotate: particle.rotation,
                scale: 0,
                opacity: 1,
              }}
              animate={{
                left: `${particle.x + particle.velocityX / 10}%`,
                top: `120%`,
                rotate: particle.rotation + particle.rotationSpeed,
                scale: particle.scale,
                opacity: [1, 1, 1, 0],
              }}
              transition={{
                duration: 2.5 + Math.random() * 1,
                ease: [0.25, 0.46, 0.45, 0.94], // Custom easing for gravity feel
              }}
              style={{
                width: `${8 * particle.scale}px`,
                height: `${12 * particle.scale}px`,
                backgroundColor: particle.color,
                borderRadius: "2px",
              }}
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}
