"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Plus, Check, X, Utensils, Beef, Cookie, Coffee, Cake } from "lucide-react";
import { usePointsStore } from "@/lib/stores/points-store";
import { useOnboardingStore } from "@/lib/stores/onboarding-store";
import { useCartStore } from "@/lib/stores/cart-store";
import { CATEGORIES, MENU_ITEMS, type Category, type MenuItem } from "@/lib/menu-data";
import { BottomNav } from "@/components/navigation/BottomNav";
import { fadeUp, scaleIn, staggerContainer, spring, liftable, pressable } from "@/lib/motion";

const PROMO_DISMISSED_KEY = "clixhouse-promo-dismissed";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Utensils,
  Beef,
  Cookie,
  Coffee,
  Cake,
};

export default function MenuPage() {
  const { points: actualPoints } = usePointsStore();
  const { reset } = useOnboardingStore();
  const { reset: resetPoints } = usePointsStore();
  const { reset: resetCart } = useCartStore();
  const addItem = useCartStore((state) => state.addItem);
  const cartPoints = useCartStore((state) => state.totalPoints());

  const displayPoints = actualPoints + cartPoints;

  const [activeCategory, setActiveCategory] = useState<Category>("todos");
  const [addedItemId, setAddedItemId] = useState<string | null>(null);
  const [pointsAnimating, setPointsAnimating] = useState(false);
  const [showPromo, setShowPromo] = useState(false);
  const prevPointsRef = useRef(displayPoints);

  useEffect(() => {
    const dismissed = localStorage.getItem(PROMO_DISMISSED_KEY);
    if (!dismissed) {
      setShowPromo(true);
    }
  }, []);

  const handleDismissPromo = () => {
    setShowPromo(false);
    localStorage.setItem(PROMO_DISMISSED_KEY, "true");
  };

  useEffect(() => {
    if (displayPoints > prevPointsRef.current) {
      setPointsAnimating(true);
      const timer = setTimeout(() => setPointsAnimating(false), 400);
      return () => clearTimeout(timer);
    }
    prevPointsRef.current = displayPoints;
  }, [displayPoints]);

  const handleResetDemo = () => {
    reset();
    resetPoints();
    resetCart();
    localStorage.removeItem(PROMO_DISMISSED_KEY);
    window.location.href = "/";
  };

  const handleAddToCart = (e: React.MouseEvent, item: MenuItem) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(item);
    setAddedItemId(item.id);
    setTimeout(() => setAddedItemId(null), 600);
  };

  const filteredItems =
    activeCategory === "todos"
      ? MENU_ITEMS
      : MENU_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-heading font-bold text-slate-800">Tu Restaurante</h1>
            <p className="text-sm text-slate-500">Menú del día</p>
          </div>
          <Link href="/points">
            <motion.div
              className="flex items-center gap-2 bg-gold-50 px-3 py-1 rounded-full"
              animate={pointsAnimating ? { scale: 1.1 } : { scale: 1 }}
              transition={spring.bouncy}
            >
              <motion.div
                animate={pointsAnimating ? { rotate: [0, -10, 10, 0] } : {}}
                transition={spring.bouncy}
              >
                <Star className="w-5 h-5 text-gold-500" fill="currentColor" />
              </motion.div>
              <span className="font-bold text-gold-600">{displayPoints}</span>
              <span className="text-sm text-gold-600">pts</span>
            </motion.div>
          </Link>
        </div>
      </header>

      {/* Promo Banner */}
      <AnimatePresence>
        {showPromo && (
          <motion.div
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            transition={spring.snappy}
            className="mx-4 mt-4"
          >
            <div className="bg-gradient-cta rounded-lg p-3 shadow-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🎉</span>
                  <span className="text-white font-semibold text-sm">
                    ¡10% OFF en tu primera orden!
                  </span>
                </div>
                <motion.button
                  onClick={handleDismissPromo}
                  className="text-white/70 hover:text-white p-1"
                  whileTap={{ scale: 0.9 }}
                  aria-label="Cerrar promoción"
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Menu Content */}
      <main className="px-4 py-6 bg-slate-100/50">
        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
          {CATEGORIES.map((cat) => {
            const IconComponent = ICON_MAP[cat.icon];
            const isActive = activeCategory === cat.id;
            return (
              <motion.button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full whitespace-nowrap flex items-center gap-2 ${
                  isActive
                    ? "bg-primary-600 text-white shadow"
                    : "bg-white text-slate-600 border border-slate-200"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={spring.snappy}
              >
                {IconComponent && <IconComponent className="w-4 h-4" />}
                {cat.label}
              </motion.button>
            );
          })}
        </div>

        {/* Menu Items Grid */}
        <motion.div
          className="grid grid-cols-2 gap-4 mt-4"
          variants={staggerContainer(0.04)}
          initial="hidden"
          animate="visible"
          key={activeCategory}
        >
          {filteredItems.map((item) => (
            <motion.div key={item.id} variants={fadeUp} transition={spring.snappy}>
              <Link href={`/item/${item.id}`}>
                <motion.div
                  className="bg-white rounded-2xl overflow-hidden shadow-md border border-slate-100"
                  {...liftable}
                >
                  <div className="h-[120px] relative overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 200px"
                    />
                    {item.popular && (
                      <motion.span
                        className="absolute top-2 left-2 bg-gold-500 text-white text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, ...spring.bouncy }}
                      >
                        <Star className="w-3 h-3" fill="currentColor" />
                        Popular
                      </motion.span>
                    )}
                  </div>
                  <div className="p-3">
                    <h3 className="font-semibold text-slate-800 text-sm leading-tight">
                      {item.name}
                    </h3>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-primary-600 font-bold">${item.price}</span>
                      <motion.button
                        onClick={(e) => handleAddToCart(e, item)}
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          addedItemId === item.id
                            ? "bg-green-500"
                            : "bg-primary-600"
                        } text-white`}
                        whileTap={{ scale: 0.85 }}
                        animate={addedItemId === item.id ? { scale: [1, 1.2, 1] } : {}}
                        transition={spring.bouncy}
                      >
                        <AnimatePresence mode="wait">
                          {addedItemId === item.id ? (
                            <motion.div
                              key="check"
                              initial={{ scale: 0, rotate: -180 }}
                              animate={{ scale: 1, rotate: 0 }}
                              exit={{ scale: 0 }}
                              transition={spring.bouncy}
                            >
                              <Check className="w-5 h-5" />
                            </motion.div>
                          ) : (
                            <motion.div
                              key="plus"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              exit={{ scale: 0 }}
                            >
                              <Plus className="w-5 h-5" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Demo Reset Button */}
        <div className="mt-12 text-center">
          <button
            onClick={handleResetDemo}
            className="text-sm text-slate-400 underline"
          >
            Reiniciar demo (volver a onboarding)
          </button>
        </div>
      </main>

      <BottomNav activeTab="menu" />
    </div>
  );
}
