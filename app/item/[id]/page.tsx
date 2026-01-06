"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getMenuItemById } from "@/lib/menu-data";
import { useCartStore } from "@/lib/stores/cart-store";
import { usePointsStore } from "@/lib/stores/points-store";

export default function ItemDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { points } = usePointsStore();
  const addItem = useCartStore((state) => state.addItem);

  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const item = getMenuItemById(params.id as string);

  if (!item) {
    return (
      <div className="min-h-screen bg-primary-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500">Producto no encontrado</p>
          <button
            onClick={() => router.push("/menu")}
            className="mt-4 text-primary-500 underline"
          >
            Volver al menu
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
    }, 400);
  };

  return (
    <div className="min-h-screen bg-primary-50">
      {/* Hero Section */}
      <div className="relative h-72 bg-gradient-to-br from-primary-200 via-primary-300 to-primary-400">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="absolute top-4 left-4 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-lg z-10"
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

        {/* Points Badge */}
        <div className="absolute top-4 right-4 flex items-center gap-2 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full shadow-lg">
          <span className="text-lg">⭐</span>
          <span className="font-bold text-accent-700">{points}</span>
        </div>

        {/* Emoji */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-9xl animate-bounce-in drop-shadow-lg">
            {item.emoji}
          </span>
        </div>

        {/* Popular Badge */}
        {item.popular && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
            <span className="bg-accent-500 text-white text-sm px-4 py-1 rounded-full font-medium shadow-lg">
              ⭐ Popular
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="px-6 py-6 -mt-4 bg-primary-50 rounded-t-3xl relative">
        {/* Name and Price */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{item.name}</h1>
            <p className="text-gray-500 mt-1">{item.description}</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-primary-600">${item.price}</p>
            <p className="text-sm text-accent-600">+{item.pointsEarned} pts</p>
          </div>
        </div>

        {/* Quantity Selector */}
        <div className="mt-8">
          <p className="text-sm font-medium text-gray-700 mb-3">Cantidad</p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md active:scale-95 transition-transform"
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
                  d="M20 12H4"
                />
              </svg>
            </button>
            <span className="text-3xl font-bold text-gray-900 w-12 text-center">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center shadow-md active:scale-95 transition-transform"
            >
              <svg
                className="w-6 h-6 text-white"
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
        </div>

        {/* Points Preview */}
        <div className="mt-6 bg-accent-50 rounded-2xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent-200 rounded-full flex items-center justify-center">
              <span className="text-xl">⭐</span>
            </div>
            <div>
              <p className="text-sm text-gray-600">Ganarás</p>
              <p className="font-bold text-accent-700">{totalPoints} puntos</p>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100">
        <button
          onClick={handleAddToCart}
          disabled={isAdding}
          className={`w-full py-4 rounded-full font-bold text-lg flex items-center justify-center gap-2 transition-all duration-300 ${
            isAdding
              ? "bg-green-500 text-white"
              : "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-glow animate-glow-pulse"
          }`}
        >
          {isAdding ? (
            <>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Agregado
            </>
          ) : (
            <>
              Agregar ${totalPrice}
            </>
          )}
        </button>
      </div>
    </div>
  );
}
