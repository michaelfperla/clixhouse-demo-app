"use client";

import { useEffect, useState } from "react";

interface RewardsScreenProps {
  isActive: boolean;
}

export function RewardsScreen({ isActive }: RewardsScreenProps) {
  const [displayPoints, setDisplayPoints] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  // Animate points counter when screen becomes active
  useEffect(() => {
    if (!isActive || hasAnimated) {
      return;
    }

    setHasAnimated(true);
    const targetPoints = 150;
    const duration = 1200;
    const steps = 30;
    const increment = targetPoints / steps;
    const stepDuration = duration / steps;

    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= targetPoints) {
        setDisplayPoints(targetPoints);
        clearInterval(timer);
      } else {
        setDisplayPoints(Math.floor(current));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isActive, hasAnimated]);

  return (
    <div className="flex flex-col items-center justify-center h-full px-8">
      {/* Points display with golden accent */}
      <div
        className={`relative ${isActive ? "animate-fade-slide-up" : "opacity-0"}`}
        style={{ animationFillMode: "backwards" }}
      >
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-accent rounded-full blur-2xl opacity-40 scale-125" />

        {/* Main counter circle */}
        <div className="relative w-44 h-44 bg-gradient-accent rounded-full flex flex-col items-center justify-center shadow-elevated-lg">
          {/* Points number */}
          <span className="text-5xl font-bold text-white drop-shadow-sm">
            {displayPoints}
          </span>
          <span className="text-sm font-semibold text-accent-100 uppercase tracking-wider">
            puntos
          </span>
        </div>

        {/* Sparkle decorations */}
        <div className="absolute -top-2 -right-1 animate-star-sparkle">
          <svg className="w-8 h-8 text-accent-300" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L14.09 8.26L20.5 9.27L15.75 13.97L16.82 20.5L12 17.77L7.18 20.5L8.25 13.97L3.5 9.27L9.91 8.26L12 2Z" />
          </svg>
        </div>
        <div className="absolute -bottom-1 -left-2 animate-star-sparkle" style={{ animationDelay: "0.5s" }}>
          <svg className="w-6 h-6 text-accent-400" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L14.09 8.26L20.5 9.27L15.75 13.97L16.82 20.5L12 17.77L7.18 20.5L8.25 13.97L3.5 9.27L9.91 8.26L12 2Z" />
          </svg>
        </div>
      </div>

      {/* Headline */}
      <h2
        className={`mt-10 text-3xl font-bold text-gray-900 text-center ${
          isActive ? "animate-fade-slide-up" : "opacity-0"
        }`}
        style={{ animationDelay: "0.1s", animationFillMode: "backwards" }}
      >
        Gana puntos
      </h2>

      {/* Subheadline */}
      <p
        className={`mt-3 text-lg text-gray-500 text-center max-w-xs ${
          isActive ? "animate-fade-slide-up" : "opacity-0"
        }`}
        style={{ animationDelay: "0.2s", animationFillMode: "backwards" }}
      >
        Cada compra suma puntos canjeables por premios
      </p>

      {/* Rewards preview - Polished cards */}
      <div
        className={`mt-8 flex gap-3 ${
          isActive ? "animate-fade-slide-up" : "opacity-0"
        }`}
        style={{ animationDelay: "0.35s", animationFillMode: "backwards" }}
      >
        <RewardCard emoji="🥤" points={50} label="Bebida" />
        <RewardCard emoji="🌮" points={100} label="Taco" />
        <RewardCard emoji="🍽️" points={200} label="Plato" />
      </div>
    </div>
  );
}

function RewardCard({
  emoji,
  points,
  label,
}: {
  emoji: string;
  points: number;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-18 h-18 bg-white rounded-2xl flex items-center justify-center shadow-elevated border border-gray-100 p-4">
        <span className="text-3xl">{emoji}</span>
      </div>
      <div className="mt-2 text-center">
        <span className="block text-xs font-bold text-accent-600">{points} pts</span>
        <span className="block text-xs text-gray-400">{label}</span>
      </div>
    </div>
  );
}
