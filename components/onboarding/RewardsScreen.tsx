"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import { Star, Coffee, UtensilsCrossed, Gift } from "lucide-react";
import { spring as springPresets, fadeUp, staggerContainer, scaleIn } from "@/lib/motion";

interface RewardsScreenProps {
  isActive: boolean;
  onComplete?: () => void;
}

export function RewardsScreen({ isActive }: RewardsScreenProps) {
  const [hasAnimated, setHasAnimated] = useState(false);

  // Spring-based number animation
  const springValue = useSpring(0, { stiffness: 50, damping: 20 });
  const displayPoints = useTransform(springValue, (value) => Math.round(value));
  const [points, setPoints] = useState(0);

  useEffect(() => {
    if (isActive && !hasAnimated) {
      setHasAnimated(true);
      springValue.set(150);
    }
  }, [isActive, hasAnimated, springValue]);

  useEffect(() => {
    const unsubscribe = displayPoints.on("change", (v) => setPoints(v));
    return () => unsubscribe();
  }, [displayPoints]);

  return (
    <motion.div
      className="flex flex-col items-center justify-center h-full px-6 bg-slate-50"
      variants={staggerContainer(0.12)}
      initial="hidden"
      animate={isActive ? "visible" : "hidden"}
    >
      {/* Points display - golden circle */}
      <motion.div className="relative" variants={scaleIn} transition={springPresets.bouncy}>
        <motion.div
          className="w-[176px] h-[176px] bg-gold-400 rounded-full flex flex-col items-center justify-center shadow-lg"
          animate={isActive ? { scale: [1, 1.02, 1] } : {}}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <span className="text-5xl font-bold text-white">{points}</span>
          <span className="text-sm font-semibold text-white/80 uppercase tracking-wider">
            puntos
          </span>
        </motion.div>

        {/* Sparkle decorations */}
        <motion.div
          className="absolute -top-2 -right-1"
          animate={{ rotate: [0, 15, 0], scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <Star className="w-8 h-8 text-gold-400" fill="currentColor" />
        </motion.div>
        <motion.div
          className="absolute -bottom-1 -left-2"
          animate={{ rotate: [0, -15, 0], scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", delay: 0.5 }}
        >
          <Star className="w-6 h-6 text-gold-500" fill="currentColor" />
        </motion.div>
      </motion.div>

      {/* Headline */}
      <motion.h2
        className="mt-10 text-3xl font-heading font-bold text-slate-800 text-center"
        variants={fadeUp}
      >
        Gana puntos
      </motion.h2>

      {/* Subheadline */}
      <motion.p
        className="mt-2 text-lg text-slate-500 text-center max-w-[280px]"
        variants={fadeUp}
      >
        Cada compra suma puntos canjeables por premios
      </motion.p>

      {/* Rewards preview */}
      <motion.div
        className="mt-8 flex gap-4"
        variants={staggerContainer(0.08)}
      >
        <RewardCard icon={Coffee} points={50} label="Bebida" />
        <RewardCard icon={UtensilsCrossed} points={100} label="Taco" />
        <RewardCard icon={Gift} points={200} label="Plato" />
      </motion.div>
    </motion.div>
  );
}

function RewardCard({
  icon: Icon,
  points,
  label,
}: {
  icon: React.ComponentType<{ className?: string }>;
  points: number;
  label: string;
}) {
  return (
    <motion.div
      className="flex flex-col items-center"
      variants={fadeUp}
      whileHover={{ y: -4 }}
      transition={springPresets.snappy}
    >
      <motion.div
        className="w-16 h-16 bg-white rounded-lg flex items-center justify-center shadow border border-slate-100"
        whileHover={{ scale: 1.05 }}
        transition={springPresets.snappy}
      >
        <Icon className="w-8 h-8 text-gold-600" />
      </motion.div>
      <div className="mt-2 text-center">
        <span className="block text-xs font-bold text-gold-600">{points} pts</span>
        <span className="block text-xs text-slate-400">{label}</span>
      </div>
    </motion.div>
  );
}
