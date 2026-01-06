"use client";

import { motion } from "framer-motion";
import { spring, fadeUp, staggerContainer, popIn } from "@/lib/motion";

interface WelcomeScreenProps {
  isActive: boolean;
  onComplete?: () => void;
}

export function WelcomeScreen({ isActive }: WelcomeScreenProps) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center h-full px-6 bg-slate-50"
      variants={staggerContainer(0.15)}
      initial="hidden"
      animate={isActive ? "visible" : "hidden"}
    >
      {/* Logo */}
      <motion.div variants={popIn} transition={spring.bouncy}>
        <motion.div
          className="w-[144px] h-[144px] bg-gradient-cta rounded-xl flex items-center justify-center shadow-lg"
          animate={isActive ? { y: [0, -8, 0] } : {}}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        >
          <span className="text-5xl font-black text-white tracking-tight">CX</span>
        </motion.div>
      </motion.div>

      {/* Text content */}
      <motion.div className="mt-10 text-center" variants={fadeUp}>
        <p className="text-lg font-medium text-slate-500 tracking-wide">
          Bienvenido a
        </p>
      </motion.div>

      <motion.h1
        className="mt-1 text-4xl font-heading font-bold text-primary-600"
        variants={fadeUp}
        transition={spring.gentle}
      >
        CLIXHOUSE
      </motion.h1>

      <motion.p
        className="text-sm font-medium text-slate-400 tracking-widest uppercase"
        variants={fadeUp}
      >
        Restaurant
      </motion.p>
    </motion.div>
  );
}
