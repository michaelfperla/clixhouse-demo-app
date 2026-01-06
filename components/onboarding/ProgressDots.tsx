"use client";

import { motion } from "framer-motion";
import { spring } from "@/lib/motion";

interface ProgressDotsProps {
  total: number;
  current: number;
}

export function ProgressDots({ total, current }: ProgressDotsProps) {
  return (
    <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2">
      {Array.from({ length: total }).map((_, index) => {
        const isActive = index === current;
        const isPast = index < current;

        return (
          <motion.div
            key={index}
            className="h-2 rounded-full"
            animate={{
              width: isActive ? 24 : 8,
              backgroundColor: isActive
                ? "#d63f2a"
                : isPast
                ? "#f87171"
                : "#cbd5e1",
            }}
            transition={spring.snappy}
          />
        );
      })}
    </div>
  );
}
