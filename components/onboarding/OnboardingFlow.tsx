"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { useOnboardingStore } from "@/lib/stores/onboarding-store";
import { WelcomeScreen } from "./WelcomeScreen";
import { OrderingScreen } from "./OrderingScreen";
import { RewardsScreen } from "./RewardsScreen";
import { InstallScreen } from "./InstallScreen";
import { ProgressDots } from "./ProgressDots";
import { SkipButton } from "./SkipButton";

const SCREENS = [WelcomeScreen, OrderingScreen, RewardsScreen, InstallScreen];
const SWIPE_THRESHOLD = 50;
const SWIPE_VELOCITY = 500;

// Slide variants for page transitions - snappy feel
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
  }),
};

// Fast transition for screen changes
const screenTransition = {
  type: "tween" as const,
  duration: 0.25,
  ease: "easeOut" as const,
};

export function OnboardingFlow() {
  const router = useRouter();
  const [[currentScreen, direction], setPage] = useState([0, 0]);
  const { skipOnboarding, completeOnboarding } = useOnboardingStore();

  const totalScreens = SCREENS.length;

  const paginate = useCallback((newDirection: number) => {
    const nextScreen = currentScreen + newDirection;
    if (nextScreen >= 0 && nextScreen < totalScreens) {
      setPage([nextScreen, newDirection]);
    }
  }, [currentScreen, totalScreens]);

  const handleComplete = useCallback(() => {
    completeOnboarding();
    router.push("/menu");
  }, [completeOnboarding, router]);

  const handleSkip = useCallback(() => {
    skipOnboarding(currentScreen);
    router.push("/menu");
  }, [currentScreen, skipOnboarding, router]);

  const handleDragEnd = useCallback(
    (e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      const { offset, velocity } = info;

      // Swipe left (next screen)
      if (offset.x < -SWIPE_THRESHOLD || velocity.x < -SWIPE_VELOCITY) {
        if (currentScreen < totalScreens - 1) {
          paginate(1);
        }
      }
      // Swipe right (previous screen)
      else if (offset.x > SWIPE_THRESHOLD || velocity.x > SWIPE_VELOCITY) {
        if (currentScreen > 0) {
          paginate(-1);
        }
      }
    },
    [currentScreen, totalScreens, paginate]
  );

  const CurrentScreenComponent = SCREENS[currentScreen];

  return (
    <div className="fixed inset-0 bg-slate-50 z-50 overflow-hidden">
      {/* Skip button (hidden on last screen) */}
      {currentScreen < totalScreens - 1 && <SkipButton onClick={handleSkip} />}

      {/* Swipeable screens */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentScreen}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={screenTransition}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.15}
          onDragEnd={handleDragEnd}
          className="absolute inset-0 cursor-grab active:cursor-grabbing"
        >
          <CurrentScreenComponent
            isActive={true}
            onComplete={handleComplete}
          />
        </motion.div>
      </AnimatePresence>

      {/* Progress dots (shown between first and last screens) */}
      {currentScreen > 0 && currentScreen < totalScreens - 1 && (
        <ProgressDots total={totalScreens - 2} current={currentScreen - 1} />
      )}

      {/* Swipe hint on welcome screen */}
      {currentScreen === 0 && (
        <motion.div
          className="absolute bottom-10 left-0 right-0 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <motion.div
            className="flex items-center gap-1 text-slate-400 text-sm"
            animate={{ x: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <span>Desliza</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
