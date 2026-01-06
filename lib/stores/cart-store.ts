import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { MenuItem } from "../menu-data";

export interface CartItem {
  id: string;
  menuItem: MenuItem;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (item: MenuItem, quantity?: number) => void;
  removeItem: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  reset: () => void;
  totalItems: () => number;
  subtotal: () => number;
  totalPoints: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (menuItem, quantity = 1) => {
        const { items } = get();
        const existingItem = items.find(
          (item) => item.menuItem.id === menuItem.id
        );

        if (existingItem) {
          set({
            items: items.map((item) =>
              item.id === existingItem.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
          });
        } else {
          set({
            items: [
              ...items,
              {
                id: `${menuItem.id}-${Date.now()}`,
                menuItem,
                quantity,
              },
            ],
          });
        }
      },

      removeItem: (cartItemId) => {
        set({
          items: get().items.filter((item) => item.id !== cartItemId),
        });
      },

      updateQuantity: (cartItemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(cartItemId);
          return;
        }
        set({
          items: get().items.map((item) =>
            item.id === cartItemId ? { ...item, quantity } : item
          ),
        });
      },

      clearCart: () => set({ items: [] }),
      reset: () => set({ items: [] }),

      totalItems: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },

      subtotal: () => {
        return get().items.reduce(
          (sum, item) => sum + item.menuItem.price * item.quantity,
          0
        );
      },

      totalPoints: () => {
        return get().items.reduce(
          (sum, item) => sum + item.menuItem.pointsEarned * item.quantity,
          0
        );
      },
    }),
    {
      name: "clixhouse-cart",
    }
  )
);
