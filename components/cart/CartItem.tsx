"use client";

import { useCartStore, type CartItem as CartItemType } from "@/lib/stores/cart-store";

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  const lineTotal = item.menuItem.price * item.quantity;

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm">
      <div className="flex gap-4">
        {/* Emoji */}
        <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl flex items-center justify-center flex-shrink-0">
          <span className="text-3xl">{item.menuItem.emoji}</span>
        </div>

        {/* Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-gray-900">{item.menuItem.name}</h3>
              <p className="text-sm text-gray-500">${item.menuItem.price} c/u</p>
            </div>
            <button
              onClick={() => removeItem(item.id)}
              className="text-gray-400 hover:text-red-500 transition-colors p-1"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Quantity and Total */}
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center active:scale-95 transition-transform"
              >
                <svg
                  className="w-4 h-4 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 12H4"
                  />
                </svg>
              </button>
              <span className="text-lg font-bold text-gray-900 w-6 text-center">
                {item.quantity}
              </span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center active:scale-95 transition-transform"
              >
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </button>
            </div>
            <p className="text-lg font-bold text-primary-600">${lineTotal}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
