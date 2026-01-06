"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, Star, Plus, Minus, Check } from "lucide-react";
import { getMenuItemById } from "@/lib/menu-data";
import { useCartStore } from "@/lib/stores/cart-store";
import { usePointsStore } from "@/lib/stores/points-store";
import { spring, fadeUp, staggerContainer } from "@/lib/motion";

export default function ItemDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { points: actualPoints } = usePointsStore();
  const addItem = useCartStore((state) => state.addItem);
  const cartPoints = useCartStore((state) => state.totalPoints());

  const displayPoints = actualPoints + cartPoints;

  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const item = getMenuItemById(params.id as string);

  if (!item) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-500">Producto no encontrado</p>
          <button
            onClick={() => router.push("/menu")}
            className="mt-4 text-primary-600 underline"
          >
            Volver al menú
          </button>
        </div>
      </div>
    );
  }

  const totalPrice = item.price * quantity;
  const totalPoints = item.pointsEarned * quantity;

  const handleAddToCart = () => {
    setIsAdding(true);
    addItem(item, quantity);
    setTimeout(() => {
      router.push("/menu");
    }, 500);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Back Button - Fixed at top */}
      <button
        onClick={() => router.back()}
        className="fixed top-4 left-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg z-50"
      >
        <ChevronLeft className="w-6 h-6 text-slate-700" />
      </button>

      {/* Hero Image */}
      <div
        className="relative w-full flex-shrink-0 bg-slate-200 overflow-hidden"
        style={{ height: '224px', minHeight: '224px' }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            console.log('Image failed to load:', item.image);
            e.currentTarget.style.display = 'none';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

        {/* Points Badge */}
        <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full shadow-lg">
          <Star className="w-4 h-4 text-gold-500" fill="currentColor" />
          <span className="font-bold text-gold-600 text-sm">{displayPoints}</span>
        </div>

        {/* Popular Badge */}
        {item.popular && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2">
            <span className="bg-gold-500 text-white text-xs px-3 py-1 rounded-full font-medium shadow-lg flex items-center gap-1">
              <Star className="w-3 h-3" fill="currentColor" />
              Popular
            </span>
          </div>
        )}
      </div>

      {/* Content Card */}
      <motion.div
        className="flex-1 bg-white rounded-t-3xl -mt-4 relative z-10 px-5 pt-5 pb-28"
        variants={staggerContainer(0.08)}
        initial="hidden"
        animate="visible"
      >
        {/* Title and Price */}
        <motion.div className="flex justify-between items-start gap-3" variants={fadeUp}>
          <div className="flex-1">
            <h1 className="text-xl font-heading font-bold text-slate-800">{item.name}</h1>
            <p className="text-slate-500 text-sm mt-1">{item.description}</p>
          </div>
          <div className="text-right">
            <p className="text-xl font-bold text-primary-600">${item.price}</p>
            <p className="text-xs text-gold-600">+{item.pointsEarned} pts</p>
          </div>
        </motion.div>

        {/* Quantity */}
        <motion.div className="mt-6" variants={fadeUp}>
          <p className="text-sm font-medium text-slate-600 mb-3">Cantidad</p>
          <div className="flex items-center gap-4">
            <motion.button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-11 h-11 bg-slate-100 rounded-full flex items-center justify-center"
              whileTap={{ scale: 0.9 }}
            >
              <Minus className="w-5 h-5 text-slate-600" />
            </motion.button>
            <span className="text-2xl font-bold text-slate-800 w-10 text-center">
              {quantity}
            </span>
            <motion.button
              onClick={() => setQuantity(quantity + 1)}
              className="w-11 h-11 bg-primary-600 rounded-full flex items-center justify-center shadow"
              whileTap={{ scale: 0.9 }}
            >
              <Plus className="w-5 h-5 text-white" />
            </motion.button>
          </div>
        </motion.div>

        {/* Points Preview */}
        <motion.div
          className="mt-6 bg-gold-50 rounded-xl p-4 flex items-center gap-3"
          variants={fadeUp}
        >
          <div className="w-10 h-10 bg-gold-100 rounded-full flex items-center justify-center">
            <Star className="w-5 h-5 text-gold-600" fill="currentColor" />
          </div>
          <div>
            <p className="text-xs text-slate-500">Ganarás</p>
            <p className="font-bold text-gold-600">{totalPoints} puntos</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Fixed CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-100 z-20">
        <motion.button
          onClick={handleAddToCart}
          disabled={isAdding}
          className={`w-full py-4 rounded-full font-bold text-lg flex items-center justify-center gap-2 text-white shadow-lg ${
            isAdding ? "bg-green-500" : "bg-gradient-cta"
          }`}
          whileTap={{ scale: 0.98 }}
        >
          <AnimatePresence mode="wait">
            {isAdding ? (
              <motion.span
                key="added"
                className="flex items-center gap-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <Check className="w-5 h-5" />
                Agregado
              </motion.span>
            ) : (
              <motion.span
                key="add"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                Agregar ${totalPrice}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </div>
  );
}
