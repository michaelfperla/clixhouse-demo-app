"use client";

import { useState } from "react";
import Link from "next/link";
import { usePointsStore } from "@/lib/stores/points-store";
import { useOnboardingStore } from "@/lib/stores/onboarding-store";
import { useCartStore } from "@/lib/stores/cart-store";
import { CATEGORIES, MENU_ITEMS, type Category, type MenuItem } from "@/lib/menu-data";
import { BottomNav } from "@/components/navigation/BottomNav";

export default function MenuPage() {
  const { points } = usePointsStore();
  const { reset } = useOnboardingStore();
  const { reset: resetPoints } = usePointsStore();
  const { reset: resetCart } = useCartStore();
  const addItem = useCartStore((state) => state.addItem);

  const [activeCategory, setActiveCategory] = useState<Category>("todos");
  const [addedItemId, setAddedItemId] = useState<string | null>(null);

  const handleResetDemo = () => {
    reset();
    resetPoints();
    resetCart();
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
    <div className="min-h-screen bg-primary-50 pb-20">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Tu Restaurante</h1>
            <p className="text-sm text-gray-500">Menu del dia</p>
          </div>
          <Link
            href="/points"
            className="flex items-center gap-2 bg-accent-100 px-3 py-1.5 rounded-full"
          >
            <span className="text-lg">⭐</span>
            <span className="font-bold text-accent-700">{points}</span>
            <span className="text-sm text-accent-600">pts</span>
          </Link>
        </div>
      </header>

      {/* Menu Content */}
      <main className="px-4 py-6">
        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-all duration-200 ${
                activeCategory === cat.id
                  ? "bg-primary-500 text-white shadow-md"
                  : "bg-white text-gray-700 border border-gray-200"
              }`}
            >
              <span className="mr-1">{cat.emoji}</span>
              {cat.label}
            </button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          {filteredItems.map((item, index) => (
            <Link
              key={item.id}
              href={`/item/${item.id}`}
              className="bg-white rounded-2xl overflow-hidden shadow-sm active:scale-[0.98] transition-transform animate-fade-slide-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="h-32 bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center relative">
                <span className="text-5xl">{item.emoji}</span>
                {item.popular && (
                  <span className="absolute top-2 left-2 bg-accent-500 text-white text-xs px-2 py-0.5 rounded-full font-medium">
                    Popular
                  </span>
                )}
              </div>
              <div className="p-3">
                <h3 className="font-semibold text-gray-900 text-sm leading-tight">
                  {item.name}
                </h3>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-primary-600 font-bold">${item.price}</span>
                  <button
                    onClick={(e) => handleAddToCart(e, item)}
                    className={`w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center transition-all duration-200 active:scale-90 ${
                      addedItemId === item.id ? "bg-green-500 scale-110" : ""
                    }`}
                  >
                    {addedItemId === item.id ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Demo Reset Button */}
        <div className="mt-12 text-center">
          <button
            onClick={handleResetDemo}
            className="text-sm text-gray-400 underline"
          >
            Reiniciar demo (volver a onboarding)
          </button>
        </div>
      </main>

      <BottomNav activeTab="menu" />
    </div>
  );
}
