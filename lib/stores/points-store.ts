import { create } from "zustand";
import { persist } from "zustand/middleware";

const INSTALL_BONUS = 50;

interface PointsState {
  points: number;
  addPoints: (amount: number) => void;
  awardInstallBonus: () => void;
  reset: () => void;
}

export const usePointsStore = create<PointsState>()(
  persist(
    (set, get) => ({
      points: 0,

      addPoints: (amount) => set({ points: get().points + amount }),

      awardInstallBonus: () => set({ points: get().points + INSTALL_BONUS }),

      reset: () => set({ points: 0 }),
    }),
    {
      name: "clixhouse-points",
    }
  )
);
