"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Minus, Plus, X } from "lucide-react";
import { useCartStore, type CartItem as CartItemType } from "@/lib/stores/cart-store";
import { spring } from "@/lib/motion";

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  const lineTotal = item.menuItem.price * item.quantity;

  return (
    <motion.div
      className="bg-white rounded-2xl p-4 shadow"
      whileHover={{ y: -2 }}
      transition={spring.snappy}
    >
      <div className="flex gap-4">
        {/* Food Image */}
        <div className="w-16 h-16 relative rounded-xl overflow-hidden flex-shrink-0">
          <Image
            src={item.menuItem.image}
            alt={item.menuItem.name}
            fill
            className="object-cover"
            sizes="64px"
          />
        </div>

        {/* Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-slate-800">{item.menuItem.name}</h3>
              <p className="text-sm text-slate-500">${item.menuItem.price} c/u</p>
            </div>
            <motion.button
              onClick={() => removeItem(item.id)}
              className="text-slate-400 hover:text-red-500 transition-colors p-1"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Quantity and Total */}
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-3">
              <motion.button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={spring.snappy}
              >
                <Minus className="w-4 h-4 text-slate-600" />
              </motion.button>
              <motion.span
                className="text-lg font-bold text-slate-800 w-6 text-center"
                key={item.quantity}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={spring.snappy}
              >
                {item.quantity}
              </motion.span>
              <motion.button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={spring.snappy}
              >
                <Plus className="w-4 h-4 text-white" />
              </motion.button>
            </div>
            <motion.p
              className="text-lg font-bold text-primary-600"
              key={lineTotal}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={spring.snappy}
            >
              ${lineTotal}
            </motion.p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
