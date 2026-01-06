"use client";

import { motion } from "framer-motion";
import { spring } from "@/lib/motion";

interface SkipButtonProps {
  onClick: () => void;
}

export function SkipButton({ onClick }: SkipButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className="absolute top-4 right-4 z-10 px-4 py-2 text-sm font-medium text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      Saltar
    </motion.button>
  );
}
