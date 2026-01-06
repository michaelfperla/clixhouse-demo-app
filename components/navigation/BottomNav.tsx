"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Home, ShoppingBag, Star } from "lucide-react";
import { useCartStore } from "@/lib/stores/cart-store";
import { spring } from "@/lib/motion";

interface BottomNavProps {
  activeTab: "menu" | "cart" | "points";
}

const tabs = [
  { id: "menu", href: "/menu", icon: Home, label: "Menú" },
  { id: "cart", href: "/cart", icon: ShoppingBag, label: "Carrito" },
  { id: "points", href: "/points", icon: Star, label: "Puntos" },
] as const;

export function BottomNav({ activeTab }: BottomNavProps) {
  const totalItems = useCartStore((state) => state.totalItems());

  return (
    <motion.nav
      className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-6 py-3 z-40"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={spring.snappy}
    >
      <div className="flex justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <Link
              key={tab.id}
              href={tab.href}
              className="flex flex-col items-center relative"
            >
              <motion.div
                className="relative"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={spring.snappy}
              >
                <motion.div
                  animate={{
                    color: isActive ? "#d63f2a" : "#94a3b8",
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <Icon className="w-6 h-6" />
                </motion.div>

                {/* Cart badge */}
                {tab.id === "cart" && (
                  <AnimatePresence>
                    {totalItems > 0 && (
                      <motion.span
                        className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={spring.bouncy}
                        key={totalItems}
                      >
                        {totalItems > 9 ? "9+" : totalItems}
                      </motion.span>
                    )}
                  </AnimatePresence>
                )}
              </motion.div>

              <motion.span
                className="text-xs mt-1"
                animate={{
                  color: isActive ? "#d63f2a" : "#94a3b8",
                }}
                transition={{ duration: 0.2 }}
              >
                {tab.label}
              </motion.span>

              {/* Active indicator */}
              {isActive && (
                <motion.div
                  className="absolute -bottom-3 w-1 h-1 bg-primary-600 rounded-full"
                  layoutId="activeTab"
                  transition={spring.snappy}
                />
              )}
            </Link>
          );
        })}
      </div>
    </motion.nav>
  );
}
