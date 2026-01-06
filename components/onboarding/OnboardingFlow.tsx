"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useOnboardingStore } from "@/lib/stores/onboarding-store";
import { WelcomeScreen } from "./WelcomeScreen";
import { OrderingScreen } from "./OrderingScreen";
import { RewardsScreen } from "./RewardsScreen";
import { InstallScreen } from "./InstallScreen";
import { ProgressDots } from "./ProgressDots";
import { SkipButton } from "./SkipButton";

export function OnboardingFlow() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentScreen, setCurrentScreen] = useState(0);
  const { skipOnboarding, completeOnboarding } = useOnboardingStore();

  const totalScreens = 4;

  // Navigate to menu after onboarding
  const handleComplete = useCallback(() => {
    completeOnboarding();
    router.push("/menu");
  }, [completeOnboarding, router]);

  // Handle skip button
  const handleSkip = useCallback(() => {
    skipOnboarding(currentScreen);
    router.push("/menu");
  }, [currentScreen, skipOnboarding, router]);

  // Track scroll position to update current screen
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const screenWidth = container.offsetWidth;
      const newScreen = Math.round(scrollLeft / screenWidth);
      setCurrentScreen(newScreen);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToScreen = (index: number) => {
    const container = containerRef.current;
    if (!container) return;

    container.scrollTo({
      left: index * container.offsetWidth,
      behavior: "smooth",
    });
  };

  return (
    <div className="fixed inset-0 bg-primary-50 z-50">
      {/* Skip button (hidden on last screen) */}
      {currentScreen < totalScreens - 1 && <SkipButton onClick={handleSkip} />}

      {/* Swipeable container with CSS scroll-snap */}
      <div
        ref={containerRef}
        className="flex h-full overflow-x-auto snap-x snap-mandatory scrollbar-hide"
        style={{ scrollBehavior: "smooth" }}
      >
        {/* Screen 1: Welcome */}
        <div className="flex-shrink-0 w-full h-full snap-center" style={{ scrollSnapStop: "always" }}>
          <WelcomeScreen isActive={currentScreen === 0} />
        </div>

        {/* Screen 2: Ordering */}
        <div className="flex-shrink-0 w-full h-full snap-center" style={{ scrollSnapStop: "always" }}>
          <OrderingScreen isActive={currentScreen === 1} />
        </div>

        {/* Screen 3: Rewards */}
        <div className="flex-shrink-0 w-full h-full snap-center" style={{ scrollSnapStop: "always" }}>
          <RewardsScreen isActive={currentScreen === 2} />
        </div>

        {/* Screen 4: Install */}
        <div className="flex-shrink-0 w-full h-full snap-center" style={{ scrollSnapStop: "always" }}>
          <InstallScreen
            isActive={currentScreen === 3}
            onComplete={handleComplete}
          />
        </div>
      </div>

      {/* Progress dots (shown after welcome screen, hidden on install screen) */}
      {currentScreen > 0 && currentScreen < totalScreens - 1 && (
        <ProgressDots total={totalScreens - 2} current={currentScreen - 1} />
      )}
    </div>
  );
}
