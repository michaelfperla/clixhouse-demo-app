"use client";

import Link from "next/link";
import { useCartStore } from "@/lib/stores/cart-store";

interface BottomNavProps {
  activeTab: "menu" | "cart" | "points";
}

export function BottomNav({ activeTab }: BottomNavProps) {
  const totalItems = useCartStore((state) => state.totalItems());

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3 z-40">
      <div className="flex justify-around">
        <Link
          href="/menu"
          className={`flex flex-col items-center ${
            activeTab === "menu" ? "text-primary-500" : "text-gray-400"
          }`}
        >
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
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          <span className="text-xs mt-1">Menu</span>
        </Link>

        <Link
          href="/cart"
          className={`flex flex-col items-center relative ${
            activeTab === "cart" ? "text-primary-500" : "text-gray-400"
          }`}
        >
          <div className="relative">
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
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold animate-bounce-in">
                {totalItems > 9 ? "9+" : totalItems}
              </span>
            )}
          </div>
          <span className="text-xs mt-1">Carrito</span>
        </Link>

        <Link
          href="/points"
          className={`flex flex-col items-center ${
            activeTab === "points" ? "text-primary-500" : "text-gray-400"
          }`}
        >
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
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            />
          </svg>
          <span className="text-xs mt-1">Puntos</span>
        </Link>
      </div>
    </nav>
  );
}
