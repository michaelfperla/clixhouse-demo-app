"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useOnboardingStore } from "@/lib/stores/onboarding-store";
import { OnboardingFlow } from "@/components/onboarding";

export default function Home() {
  const router = useRouter();
  const { hasCompleted } = useOnboardingStore();
  const [isHydrated, setIsHydrated] = useState(false);

  // Wait for Zustand to hydrate from localStorage
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Redirect to menu if onboarding already completed
  useEffect(() => {
    if (isHydrated && hasCompleted) {
      router.replace("/menu");
    }
  }, [isHydrated, hasCompleted, router]);

  // Show loading state while hydrating
  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-primary-50 flex items-center justify-center">
        <div className="w-16 h-16 bg-primary-500 rounded-2xl animate-pulse" />
      </div>
    );
  }

  // Show onboarding if not completed
  if (!hasCompleted) {
    return <OnboardingFlow />;
  }

  // This will only briefly show while redirecting
  return (
    <div className="min-h-screen bg-primary-50 flex items-center justify-center">
      <div className="w-16 h-16 bg-primary-500 rounded-2xl animate-pulse" />
    </div>
  );
}
