"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ShoppingCart, Star } from "lucide-react";
import { useCartStore } from "@/lib/stores/cart-store";
import { BottomNav } from "@/components/navigation/BottomNav";
import { CartItem } from "@/components/cart/CartItem";
import { spring, fadeUp, staggerContainer, scaleIn } from "@/lib/motion";

export default function CartPage() {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const subtotal = useCartStore((state) => state.subtotal());
  const totalPoints = useCartStore((state) => state.totalPoints());

  const handleCheckout = () => {
    router.push("/order");
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-32">
      {/* Header */}
      <motion.header
        className="bg-white shadow-sm sticky top-0 z-10"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={spring.snappy}
      >
        <div className="px-4 py-4 flex items-center">
          <motion.button
            onClick={() => router.back()}
            className="w-10 h-10 -ml-2 flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft className="w-6 h-6 text-slate-700" />
          </motion.button>
          <h1 className="text-xl font-heading font-bold text-slate-800 ml-2">Carrito</h1>
          <AnimatePresence>
            {items.length > 0 && (
              <motion.span
                className="ml-2 bg-primary-100 text-primary-700 text-sm px-2 py-0.5 rounded-full"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={spring.bouncy}
              >
                {items.length} {items.length === 1 ? "item" : "items"}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      {/* Content */}
      <main className="px-4 py-6">
        <AnimatePresence mode="wait">
          {items.length === 0 ? (
            <motion.div
              key="empty"
              className="flex flex-col items-center justify-center py-16"
              variants={staggerContainer(0.1)}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6"
                variants={scaleIn}
                transition={spring.bouncy}
              >
                <ShoppingCart className="w-12 h-12 text-slate-400" />
              </motion.div>
              <motion.h2
                className="text-xl font-heading font-bold text-slate-800 mb-2"
                variants={fadeUp}
              >
                Tu carrito está vacío
              </motion.h2>
              <motion.p
                className="text-slate-500 mb-6 text-center"
                variants={fadeUp}
              >
                Agrega algunos platillos deliciosos
              </motion.p>
              <motion.div variants={fadeUp}>
                <Link
                  href="/menu"
                  className="inline-block bg-primary-600 text-white px-8 py-3 rounded-full font-semibold shadow"
                >
                  Ver Menú
                </Link>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="items"
              className="space-y-4"
              variants={staggerContainer(0.05)}
              initial="hidden"
              animate="visible"
            >
              <AnimatePresence>
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    variants={fadeUp}
                    exit={{ opacity: 0, x: -100, height: 0 }}
                    transition={spring.snappy}
                    layout
                  >
                    <CartItem item={item} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Fixed Bottom Summary */}
      <AnimatePresence>
        {items.length > 0 && (
          <motion.div
            className="fixed bottom-16 left-0 right-0 bg-white border-t border-slate-100 p-4 z-30"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={spring.snappy}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-slate-500 text-sm">Subtotal</p>
                <motion.p
                  className="text-2xl font-bold text-slate-800"
                  key={subtotal}
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={spring.snappy}
                >
                  ${subtotal}
                </motion.p>
              </div>
              <div className="text-right">
                <p className="text-slate-500 text-sm">Ganarás</p>
                <motion.p
                  className="text-lg font-bold text-gold-600 flex items-center gap-1 justify-end"
                  key={totalPoints}
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={spring.snappy}
                >
                  +{totalPoints} pts
                  <Star className="w-4 h-4" fill="currentColor" />
                </motion.p>
              </div>
            </div>

            <motion.button
              onClick={handleCheckout}
              className="w-full py-4 bg-gradient-cta text-white rounded-full font-bold text-lg shadow"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={spring.snappy}
            >
              Ordenar ${subtotal}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <BottomNav activeTab="cart" />
    </div>
  );
}
