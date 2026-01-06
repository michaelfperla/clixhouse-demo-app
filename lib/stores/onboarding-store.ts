import { create } from "zustand";
import { persist } from "zustand/middleware";

interface OnboardingState {
  hasCompleted: boolean;
  wasInstalled: boolean;
  skippedAtScreen: number | null;
  installDismissedAt: number | null;

  completeOnboarding: () => void;
  markInstalled: () => void;
  skipOnboarding: (atScreen: number) => void;
  dismissInstall: () => void;
  shouldRepromptInstall: () => boolean;
  reset: () => void;
}

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set, get) => ({
      hasCompleted: false,
      wasInstalled: false,
      skippedAtScreen: null,
      installDismissedAt: null,

      completeOnboarding: () => set({ hasCompleted: true }),

      markInstalled: () => set({ wasInstalled: true }),

      skipOnboarding: (atScreen) =>
        set({
          hasCompleted: true,
          skippedAtScreen: atScreen,
        }),

      dismissInstall: () =>
        set({
          installDismissedAt: Date.now(),
        }),

      shouldRepromptInstall: () => {
        const state = get();
        if (state.wasInstalled) return false;
        if (!state.installDismissedAt) return true;
        // Allow re-prompt if they skipped onboarding
        return state.skippedAtScreen !== null;
      },

      reset: () =>
        set({
          hasCompleted: false,
          wasInstalled: false,
          skippedAtScreen: null,
          installDismissedAt: null,
        }),
    }),
    {
      name: "clixhouse-onboarding",
    }
  )
);
