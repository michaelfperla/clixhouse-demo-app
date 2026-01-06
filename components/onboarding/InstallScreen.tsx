"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Smartphone, Download, Check, Star } from "lucide-react";
import { usePWAInstall } from "@/hooks/usePWAInstall";
import { useOnboardingStore } from "@/lib/stores/onboarding-store";
import { usePointsStore } from "@/lib/stores/points-store";
import { IOSInstallGuide } from "./IOSInstallGuide";
import { Confetti } from "@/components/ui/Confetti";
import { spring, fadeUp, staggerContainer, scaleIn, popIn } from "@/lib/motion";

interface InstallScreenProps {
  isActive: boolean;
  onComplete: () => void;
}

export function InstallScreen({ isActive, onComplete }: InstallScreenProps) {
  const { isInstallable, isIOS, prompt } = usePWAInstall();
  const { markInstalled } = useOnboardingStore();
  const { awardInstallBonus } = usePointsStore();
  const [isInstalling, setIsInstalling] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInstall = async () => {
    setIsInstalling(true);
    const accepted = await prompt();

    if (accepted) {
      markInstalled();
      awardInstallBonus();
      setShowSuccess(true);
    } else {
      setIsInstalling(false);
    }
  };

  if (isIOS) {
    return <IOSInstallGuide isActive={isActive} onComplete={onComplete} />;
  }

  if (showSuccess) {
    return (
      <>
        <Confetti isActive={showSuccess} />
        <motion.div
          className="flex flex-col items-center justify-center h-full px-6 bg-slate-50"
          variants={staggerContainer(0.15)}
          initial="hidden"
          animate="visible"
        >
          {/* Success checkmark */}
          <motion.div variants={popIn} transition={spring.bouncy}>
            <div className="w-[112px] h-[112px] bg-gradient-cta rounded-full flex items-center justify-center shadow-lg">
              <motion.div
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Check className="w-14 h-14 text-white" strokeWidth={3} />
              </motion.div>
            </div>
          </motion.div>

          <motion.h2
            className="mt-8 text-3xl font-heading font-bold text-slate-800 text-center"
            variants={fadeUp}
          >
            ¡Instalado!
          </motion.h2>

          {/* Points badge */}
          <motion.div
            className="mt-4 inline-flex items-center gap-2 bg-gold-400 px-5 py-2 rounded-full shadow"
            variants={scaleIn}
            transition={spring.bouncy}
          >
            <span className="text-2xl font-bold text-white">+50</span>
            <span className="text-white/90 font-semibold">puntos</span>
          </motion.div>

          <motion.p
            className="mt-4 text-slate-500 text-center"
            variants={fadeUp}
          >
            Cierra este navegador y abre la app desde tu pantalla de inicio
          </motion.p>

          {/* Visual hint */}
          <motion.div
            className="mt-6 flex items-center gap-3 bg-white rounded-lg px-5 py-4 shadow"
            variants={fadeUp}
          >
            <div className="w-12 h-12 bg-gradient-cta rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">CX</span>
            </div>
            <div className="text-left">
              <p className="font-semibold text-slate-800">CLIXHOUSE</p>
              <p className="text-xs text-slate-400">Busca este icono</p>
            </div>
          </motion.div>

          {/* Continue button */}
          <motion.button
            onClick={onComplete}
            className="mt-8 px-8 py-3 bg-slate-100 text-slate-600 rounded-full font-medium hover:bg-slate-200 transition-colors"
            variants={fadeUp}
            whileTap={{ scale: 0.98 }}
          >
            Entendido
          </motion.button>
        </motion.div>
      </>
    );
  }

  return (
    <motion.div
      className="flex flex-col items-center justify-center h-full px-6 bg-slate-50"
      variants={staggerContainer(0.12)}
      initial="hidden"
      animate={isActive ? "visible" : "hidden"}
    >
      {/* Phone illustration */}
      <motion.div
        className="w-[160px] h-[160px] bg-primary-100 rounded-full flex items-center justify-center shadow-md"
        variants={scaleIn}
        transition={spring.bouncy}
      >
        <div className="relative">
          <Smartphone className="w-16 h-16 text-primary-600" strokeWidth={1.5} />
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            animate={{ y: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <Download className="w-6 h-6 text-primary-500" strokeWidth={2.5} />
          </motion.div>
        </div>
      </motion.div>

      <motion.h2
        className="mt-10 text-3xl font-heading font-bold text-slate-800 text-center"
        variants={fadeUp}
      >
        Agrega a tu pantalla
      </motion.h2>

      {/* Bonus points */}
      <motion.div
        className="mt-4 inline-flex items-center gap-2 bg-gold-400 px-4 py-2 rounded-full shadow-sm"
        variants={scaleIn}
        transition={spring.bouncy}
      >
        <Star className="w-5 h-5 text-white" fill="currentColor" />
        <span className="text-xl font-bold text-white">+50</span>
        <span className="text-white/90 font-medium">puntos gratis</span>
      </motion.div>

      <motion.p
        className="mt-4 text-slate-500 text-center max-w-[280px]"
        variants={fadeUp}
      >
        Acceso rápido sin buscar en el navegador
      </motion.p>

      {/* Buttons */}
      <motion.div
        className="mt-10 w-full max-w-[280px] space-y-3"
        variants={fadeUp}
      >
        {isInstallable ? (
          <motion.button
            onClick={handleInstall}
            disabled={isInstalling}
            className="w-full py-4 bg-gradient-cta text-white rounded-full text-lg font-semibold shadow disabled:opacity-50"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={spring.snappy}
          >
            {isInstalling ? "Instalando..." : "Instalar App"}
          </motion.button>
        ) : (
          <motion.button
            onClick={onComplete}
            className="w-full py-4 bg-gradient-cta text-white rounded-full text-lg font-semibold shadow"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={spring.snappy}
          >
            Continuar
          </motion.button>
        )}

        <motion.button
          onClick={onComplete}
          className="w-full py-3 text-slate-400 text-center font-medium hover:text-slate-500 transition-colors"
          whileTap={{ scale: 0.98 }}
        >
          Ahora no
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
