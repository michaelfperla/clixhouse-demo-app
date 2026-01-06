"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useCartStore } from "@/lib/stores/cart-store";
import { usePointsStore } from "@/lib/stores/points-store";
import { Confetti } from "@/components/ui/Confetti";

export default function OrderPage() {
  const clearCart = useCartStore((state) => state.clearCart);
  const cartTotal = useCartStore((state) => state.subtotal());
  const cartPoints = useCartStore((state) => state.totalPoints());
  const { points: currentPoints, addPoints } = usePointsStore();

  const [showConfetti, setShowConfetti] = useState(false);
  const [animatedPoints, setAnimatedPoints] = useState(0);
  const [orderNumber] = useState(() => Math.floor(1000 + Math.random() * 9000));
  const hasProcessed = useRef(false);

  // Points earned from this order
  const earnedPoints = cartPoints;

  useEffect(() => {
    if (hasProcessed.current) return;
    hasProcessed.current = true;

    // Trigger confetti
    setShowConfetti(true);

    // Add points and clear cart
    if (earnedPoints > 0) {
      addPoints(earnedPoints);
    }
    clearCart();

    // Animate points counter
    const duration = 1500;
    const steps = 30;
    const stepValue = earnedPoints / steps;
    let current = 0;

    const interval = setInterval(() => {
      current += stepValue;
      if (current >= earnedPoints) {
        setAnimatedPoints(earnedPoints);
        clearInterval(interval);
      } else {
        setAnimatedPoints(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(interval);
  }, [earnedPoints, addPoints, clearCart]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {showConfetti && <Confetti />}

      {/* Success Circle */}
      <div className="relative mb-8">
        <div className="w-32 h-32 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center shadow-xl animate-bounce-in">
          <svg
            className="w-16 h-16 text-white animate-draw-check"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        {/* Glow ring */}
        <div className="absolute inset-0 w-32 h-32 bg-green-400/30 rounded-full animate-ping" />
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-900 mb-2 animate-fade-slide-up">
        ¡Pedido Enviado!
      </h1>
      <p
        className="text-gray-500 mb-8 animate-fade-slide-up"
        style={{ animationDelay: "100ms" }}
      >
        Orden #{orderNumber}
      </p>

      {/* Points Earned Card */}
      <div
        className="bg-gradient-to-br from-accent-400 to-accent-500 rounded-3xl p-6 w-full max-w-xs shadow-xl mb-8 animate-fade-slide-up"
        style={{ animationDelay: "200ms" }}
      >
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-4xl animate-star-sparkle">⭐</span>
          </div>
          <p className="text-white/80 text-sm mb-1">Puntos ganados</p>
          <p className="text-5xl font-bold text-white mb-3">
            +{animatedPoints}
          </p>
          <div className="bg-white/20 rounded-full px-4 py-2 inline-block">
            <p className="text-white text-sm">
              Total: <span className="font-bold">{currentPoints} pts</span>
            </p>
          </div>
        </div>
      </div>

      {/* Estimated Time */}
      <div
        className="bg-white rounded-2xl p-4 w-full max-w-xs shadow-sm mb-8 text-center animate-fade-slide-up"
        style={{ animationDelay: "300ms" }}
      >
        <p className="text-gray-500 text-sm">Tiempo estimado</p>
        <p className="text-xl font-bold text-gray-900">~15-20 minutos</p>
      </div>

      {/* CTA */}
      <Link
        href="/menu"
        className="w-full max-w-xs py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-full font-bold text-lg text-center shadow-glow animate-fade-slide-up block"
        style={{ animationDelay: "400ms" }}
      >
        Ver Menu
      </Link>
    </div>
  );
}
