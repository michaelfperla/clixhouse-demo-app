"use client";

import { motion, type Variants } from "framer-motion";
import { Smartphone, Check } from "lucide-react";

interface OrderingScreenProps {
  isActive: boolean;
  onComplete?: () => void;
}

// Simple sequential animation - each item appears after the previous
const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const fadeItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" as const }
  },
};

export function OrderingScreen({ isActive }: OrderingScreenProps) {
  return (
    <motion.div
      className="flex flex-col items-center h-full px-6 pt-16 pb-8 bg-slate-50"
      variants={container}
      initial="hidden"
      animate={isActive ? "visible" : "hidden"}
    >
      {/* Illustration */}
      <motion.div
        className="w-[140px] h-[140px] bg-primary-100 rounded-full flex items-center justify-center shadow-md"
        variants={fadeItem}
      >
        <div className="relative">
          <Smartphone className="w-16 h-16 text-primary-600" strokeWidth={1.5} />
          <span className="absolute -top-1 -right-2 text-2xl">🌮</span>
        </div>
      </motion.div>

      {/* Headline */}
      <motion.h2
        className="mt-8 text-3xl font-heading font-bold text-slate-800 text-center"
        variants={fadeItem}
      >
        Pide sin filas
      </motion.h2>

      {/* Subheadline */}
      <motion.p
        className="mt-2 text-base text-slate-500 text-center max-w-[280px]"
        variants={fadeItem}
      >
        Ordena desde tu mesa o para llevar, sin esperar
      </motion.p>

      {/* Features list */}
      <div className="mt-10 space-y-4 w-full max-w-[300px]">
        <motion.div className="flex items-center gap-3" variants={fadeItem}>
          <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
            <Check className="w-4 h-4 text-white" strokeWidth={2.5} />
          </div>
          <span className="text-slate-600 font-medium">Ve el menú completo con fotos</span>
        </motion.div>

        <motion.div className="flex items-center gap-3" variants={fadeItem}>
          <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
            <Check className="w-4 h-4 text-white" strokeWidth={2.5} />
          </div>
          <span className="text-slate-600 font-medium">Paga seguro desde tu celular</span>
        </motion.div>

        <motion.div className="flex items-center gap-3" variants={fadeItem}>
          <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
            <Check className="w-4 h-4 text-white" strokeWidth={2.5} />
          </div>
          <span className="text-slate-600 font-medium">Recibe tu pedido en tu mesa</span>
        </motion.div>
      </div>
    </motion.div>
  );
}
