"use client";

import { motion } from "framer-motion";
import { Share, Plus, Check, Star } from "lucide-react";
import { spring, fadeUp, staggerContainer, scaleIn } from "@/lib/motion";

interface IOSInstallGuideProps {
  isActive: boolean;
  onComplete: () => void;
}

export function IOSInstallGuide({ isActive, onComplete }: IOSInstallGuideProps) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center h-full px-6 bg-slate-50"
      variants={staggerContainer(0.1)}
      initial="hidden"
      animate={isActive ? "visible" : "hidden"}
    >
      <motion.h2
        className="text-2xl font-heading font-bold text-slate-800 text-center"
        variants={fadeUp}
      >
        Agregar a Pantalla de Inicio
      </motion.h2>

      <motion.p
        className="mt-2 text-slate-500 text-center"
        variants={fadeUp}
      >
        Sigue estos pasos en Safari:
      </motion.p>

      {/* Steps */}
      <motion.div
        className="mt-8 space-y-5 w-full max-w-[280px]"
        variants={staggerContainer(0.08)}
      >
        <StepItem
          number={1}
          title="Toca el botón Compartir"
          description="El icono de cuadro con flecha arriba"
          icon={<Share className="w-5 h-5" />}
        />
        <StepItem
          number={2}
          title='"Agregar a Inicio"'
          description="Desliza hacia abajo si no lo ves"
          icon={<Plus className="w-5 h-5" />}
        />
        <StepItem
          number={3}
          title="Toca Agregar"
          description="¡Encontrarás la app en tu pantalla!"
          icon={<Check className="w-5 h-5" />}
        />
      </motion.div>

      {/* Bonus reminder */}
      <motion.div
        className="mt-8 w-full max-w-[280px]"
        variants={fadeUp}
      >
        <div className="bg-gold-50 border border-gold-100 rounded-lg p-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-gold-400 rounded-full flex items-center justify-center flex-shrink-0">
            <Star className="w-5 h-5 text-white" fill="currentColor" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gold-600">+50 puntos gratis</p>
            <p className="text-xs text-gold-500">Al agregar la app</p>
          </div>
        </div>
      </motion.div>

      <motion.button
        onClick={onComplete}
        className="mt-8 w-full max-w-[280px] py-4 bg-gradient-cta text-white rounded-full text-lg font-semibold shadow"
        variants={fadeUp}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={spring.snappy}
      >
        Entendido
      </motion.button>
    </motion.div>
  );
}

function StepItem({
  number,
  title,
  description,
  icon,
}: {
  number: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <motion.div
      className="flex items-start gap-4"
      variants={fadeUp}
    >
      <motion.div
        className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center flex-shrink-0"
        whileHover={{ scale: 1.05 }}
        transition={spring.snappy}
      >
        <span className="text-white font-bold">{number}</span>
      </motion.div>
      <div className="flex-1">
        <p className="font-semibold text-slate-800">{title}</p>
        <p className="text-sm text-slate-500 mt-0.5">{description}</p>
      </div>
      <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400 flex-shrink-0">
        {icon}
      </div>
    </motion.div>
  );
}
