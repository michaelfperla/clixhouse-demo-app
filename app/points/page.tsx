"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import { Star, ShoppingCart, Smartphone, Cake, Gift, Coffee, UtensilsCrossed } from "lucide-react";
import { usePointsStore } from "@/lib/stores/points-store";
import { useCartStore } from "@/lib/stores/cart-store";
import { BottomNav } from "@/components/navigation/BottomNav";
import { spring as springPresets, fadeUp, staggerContainer, scaleIn } from "@/lib/motion";

const REWARDS = [
  {
    id: "bebida",
    name: "Bebida Gratis",
    description: "Agua fresca o refresco",
    icon: Coffee,
    points: 50,
  },
  {
    id: "taco",
    name: "Taco Gratis",
    description: "Cualquier taco del menú",
    icon: UtensilsCrossed,
    points: 100,
  },
  {
    id: "postre",
    name: "Postre Gratis",
    description: "Churros o flan",
    icon: Cake,
    points: 150,
  },
  {
    id: "plato",
    name: "Plato Gratis",
    description: "Hasta $65 MXN de valor",
    icon: Gift,
    points: 250,
  },
];

export default function PointsPage() {
  const { points: actualPoints } = usePointsStore();
  const cartPoints = useCartStore((state) => state.totalPoints());
  const displayPoints = actualPoints + cartPoints;

  // Spring-based number animation
  const springValue = useSpring(0, { stiffness: 50, damping: 20 });
  const animatedPoints = useTransform(springValue, (value) => Math.round(value));
  const [points, setPoints] = useState(0);

  useEffect(() => {
    springValue.set(displayPoints);
  }, [displayPoints, springValue]);

  useEffect(() => {
    const unsubscribe = animatedPoints.on("change", (v) => setPoints(v));
    return () => unsubscribe();
  }, [animatedPoints]);

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header - Gold theme */}
      <motion.header
        className="bg-gold-400 px-4 pt-8 pb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <motion.h1
          className="text-white text-xl font-heading font-bold mb-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={springPresets.snappy}
        >
          Mis Puntos
        </motion.h1>

        <div className="text-center">
          <motion.div
            className="inline-block relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={springPresets.bouncy}
          >
            <span className="text-7xl font-bold text-white">
              {points}
            </span>
            <motion.div
              className="absolute -top-2 -right-8"
              animate={{ rotate: [0, 15, 0], scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <Star className="w-8 h-8 text-white" fill="currentColor" />
            </motion.div>
          </motion.div>
          <motion.p
            className="text-white/80 text-lg mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            PUNTOS
          </motion.p>
          {cartPoints > 0 && (
            <motion.p
              className="text-white/60 text-sm mt-1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              (+{cartPoints} pendientes en carrito)
            </motion.p>
          )}
        </div>
      </motion.header>

      {/* Rewards Section */}
      <main className="px-4 -mt-8">
        <motion.div
          className="bg-white rounded-3xl shadow-lg p-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ ...springPresets.snappy, delay: 0.1 }}
        >
          <h2 className="text-lg font-heading font-bold text-slate-800 mb-4">
            Canjear Premios
          </h2>

          <motion.div
            className="space-y-4"
            variants={staggerContainer(0.08)}
            initial="hidden"
            animate="visible"
          >
            {REWARDS.map((reward) => {
              const IconComponent = reward.icon;
              const canRedeem = actualPoints >= reward.points;
              const progress = Math.min((displayPoints / reward.points) * 100, 100);

              return (
                <motion.div
                  key={reward.id}
                  className="flex items-center gap-4"
                  variants={fadeUp}
                >
                  <motion.div
                    className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                      canRedeem ? "bg-gold-400" : "bg-slate-100"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    transition={springPresets.snappy}
                  >
                    <IconComponent
                      className={`w-7 h-7 ${canRedeem ? "text-white" : "text-slate-400"}`}
                    />
                  </motion.div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-slate-800">{reward.name}</h3>
                      <span
                        className={`text-sm font-bold ${
                          canRedeem ? "text-gold-600" : "text-slate-400"
                        }`}
                      >
                        {reward.points} pts
                      </span>
                    </div>
                    <p className="text-sm text-slate-500 mb-2">{reward.description}</p>

                    {canRedeem ? (
                      <motion.button
                        className="w-full py-2 bg-gold-400 text-white rounded-full text-sm font-semibold shadow-sm"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        transition={springPresets.snappy}
                      >
                        Canjear
                      </motion.button>
                    ) : (
                      <div>
                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gold-400 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                          />
                        </div>
                        <p className="text-xs text-slate-400 mt-1">
                          {displayPoints}/{reward.points} puntos
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* How to Earn */}
        <motion.div
          className="mt-6 bg-white rounded-3xl shadow p-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ ...springPresets.snappy, delay: 0.2 }}
        >
          <h2 className="text-lg font-heading font-bold text-slate-800 mb-4">
            ¿Cómo ganar puntos?
          </h2>
          <motion.div
            className="space-y-3"
            variants={staggerContainer(0.1)}
            initial="hidden"
            animate="visible"
          >
            <motion.div className="flex items-center gap-3" variants={fadeUp}>
              <motion.div
                className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                transition={springPresets.snappy}
              >
                <ShoppingCart className="w-5 h-5 text-primary-600" />
              </motion.div>
              <p className="text-slate-600 text-sm">Gana puntos con cada pedido</p>
            </motion.div>
            <motion.div className="flex items-center gap-3" variants={fadeUp}>
              <motion.div
                className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                transition={springPresets.snappy}
              >
                <Smartphone className="w-5 h-5 text-primary-600" />
              </motion.div>
              <p className="text-slate-600 text-sm">+50 puntos por instalar la app</p>
            </motion.div>
            <motion.div className="flex items-center gap-3" variants={fadeUp}>
              <motion.div
                className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                transition={springPresets.snappy}
              >
                <Cake className="w-5 h-5 text-primary-600" />
              </motion.div>
              <p className="text-slate-600 text-sm">Puntos dobles en tu cumpleaños</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </main>

      <BottomNav activeTab="points" />
    </div>
  );
}
