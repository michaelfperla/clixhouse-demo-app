"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/lib/stores/cart-store";
import { BottomNav } from "@/components/navigation/BottomNav";
import { CartItem } from "@/components/cart/CartItem";

export default function CartPage() {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const subtotal = useCartStore((state) => state.subtotal());
  const totalPoints = useCartStore((state) => state.totalPoints());

  const handleCheckout = () => {
    router.push("/order");
  };

  return (
    <div className="min-h-screen bg-primary-50 pb-32">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="px-4 py-4 flex items-center">
          <button
            onClick={() => router.back()}
            className="w-10 h-10 -ml-2 flex items-center justify-center"
          >
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <h1 className="text-xl font-bold text-gray-900 ml-2">Carrito</h1>
          {items.length > 0 && (
            <span className="ml-2 bg-primary-100 text-primary-700 text-sm px-2 py-0.5 rounded-full">
              {items.length} {items.length === 1 ? "item" : "items"}
            </span>
          )}
        </div>
      </header>

      {/* Content */}
      <main className="px-4 py-6">
        {items.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <span className="text-5xl">🛒</span>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Tu carrito está vacío
            </h2>
            <p className="text-gray-500 mb-6 text-center">
              Agrega algunos platillos deliciosos
            </p>
            <Link
              href="/menu"
              className="bg-primary-500 text-white px-8 py-3 rounded-full font-semibold shadow-md active:scale-95 transition-transform"
            >
              Ver Menu
            </Link>
          </div>
        ) : (
          /* Cart Items */
          <div className="space-y-4">
            {items.map((item, index) => (
              <div
                key={item.id}
                className="animate-fade-slide-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <CartItem item={item} />
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Fixed Bottom Summary */}
      {items.length > 0 && (
        <div className="fixed bottom-16 left-0 right-0 bg-white border-t border-gray-100 p-4 z-30">
          {/* Summary */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-gray-500 text-sm">Subtotal</p>
              <p className="text-2xl font-bold text-gray-900">${subtotal}</p>
            </div>
            <div className="text-right">
              <p className="text-gray-500 text-sm">Ganarás</p>
              <p className="text-lg font-bold text-accent-600">+{totalPoints} pts ⭐</p>
            </div>
          </div>

          {/* Checkout Button */}
          <button
            onClick={handleCheckout}
            className="w-full py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-full font-bold text-lg shadow-glow animate-glow-pulse active:scale-[0.98] transition-transform"
          >
            Ordenar ${subtotal}
          </button>
        </div>
      )}

      <BottomNav activeTab="cart" />
    </div>
  );
}
