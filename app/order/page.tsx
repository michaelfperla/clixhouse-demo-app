"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { motion, useSpring, useTransform } from "framer-motion";
import { Check, Star } from "lucide-react";
import { useCartStore } from "@/lib/stores/cart-store";
import { usePointsStore } from "@/lib/stores/points-store";
import { Confetti } from "@/components/ui/Confetti";
import { spring, fadeUp, staggerContainer, scaleIn, popIn } from "@/lib/motion";

export default function OrderPage() {
  const clearCart = useCartStore((state) => state.clearCart);
  const cartPoints = useCartStore((state) => state.totalPoints());
  const { points: currentPoints, addPoints } = usePointsStore();

  const [showConfetti, setShowConfetti] = useState(false);
  const [orderNumber] = useState(() => Math.floor(1000 + Math.random() * 9000));
  const hasProcessed = useRef(false);

  const earnedPoints = cartPoints;

  // Spring-based points animation
  const springValue = useSpring(0, { stiffness: 40, damping: 15 });
  const animatedPoints = useTransform(springValue, (value) => Math.round(value));
  const [displayPoints, setDisplayPoints] = useState(0);

  useEffect(() => {
    const unsubscribe = animatedPoints.on("change", (v) => setDisplayPoints(v));
    return () => unsubscribe();
  }, [animatedPoints]);

  useEffect(() => {
    if (hasProcessed.current) return;
    hasProcessed.current = true;

    setShowConfetti(true);

    if (earnedPoints > 0) {
      addPoints(earnedPoints);
    }
    clearCart();

    // Animate points after a short delay
    setTimeout(() => {
      springValue.set(earnedPoints);
    }, 500);
  }, [earnedPoints, addPoints, clearCart, springValue]);

  return (
    <motion.div
      className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Confetti isActive={showConfetti} />

      <motion.div
        variants={staggerContainer(0.15)}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center"
      >
        {/* Success Circle */}
        <motion.div className="relative mb-8" variants={popIn} transition={spring.bouncy}>
          <motion.div
            className="w-32 h-32 bg-green-500 rounded-full flex items-center justify-center shadow-lg"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={spring.bouncy}
          >
            <motion.div
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <Check className="w-16 h-16 text-white" strokeWidth={3} />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-3xl font-heading font-bold text-slate-800 mb-2"
          variants={fadeUp}
        >
          ¡Pedido Enviado!
        </motion.h1>
        <motion.p className="text-slate-500 mb-8" variants={fadeUp}>
          Orden #{orderNumber}
        </motion.p>

        {/* Points Earned Card */}
        <motion.div
          className="bg-gold-400 rounded-3xl p-6 w-full max-w-xs shadow-lg mb-8"
          variants={scaleIn}
          transition={spring.bouncy}
        >
          <div className="text-center">
            <motion.div
              className="flex items-center justify-center gap-2 mb-2"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <Star className="w-10 h-10 text-white" fill="currentColor" />
            </motion.div>
            <p className="text-white/80 text-sm mb-1">Puntos ganados</p>
            <motion.p className="text-5xl font-bold text-white mb-3">
              +{displayPoints}
            </motion.p>
            <div className="bg-white/20 rounded-full px-4 py-2 inline-block">
              <p className="text-white text-sm">
                Total: <span className="font-bold">{currentPoints} pts</span>
              </p>
            </div>
          </div>
        </motion.div>

        {/* Estimated Time */}
        <motion.div
          className="bg-white rounded-2xl p-4 w-full max-w-xs shadow mb-8 text-center"
          variants={fadeUp}
        >
          <p className="text-slate-500 text-sm">Tiempo estimado</p>
          <p className="text-xl font-bold text-slate-800">~15-20 minutos</p>
        </motion.div>

        {/* CTA */}
        <motion.div variants={fadeUp} className="w-full max-w-xs">
          <Link href="/menu">
            <motion.span
              className="w-full py-4 bg-gradient-cta text-white rounded-full font-bold text-lg text-center shadow block"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={spring.snappy}
            >
              Ver Menú
            </motion.span>
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
