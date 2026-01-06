"use client";

import { usePointsStore } from "@/lib/stores/points-store";
import { useOnboardingStore } from "@/lib/stores/onboarding-store";

export default function MenuPage() {
  const { points } = usePointsStore();
  const { reset } = useOnboardingStore();
  const { reset: resetPoints } = usePointsStore();

  const handleResetDemo = () => {
    reset();
    resetPoints();
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-primary-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Tu Restaurante</h1>
            <p className="text-sm text-gray-500">Menu del dia</p>
          </div>
          <div className="flex items-center gap-2 bg-primary-100 px-3 py-1.5 rounded-full">
            <span className="text-lg">⭐</span>
            <span className="font-bold text-primary-700">{points}</span>
            <span className="text-sm text-primary-600">pts</span>
          </div>
        </div>
      </header>

      {/* Menu Content */}
      <main className="px-4 py-6">
        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
          {["Todos", "Tacos", "Bebidas", "Postres"].map((cat, i) => (
            <button
              key={cat}
              className={`px-4 py-2 rounded-full whitespace-nowrap ${
                i === 0
                  ? "bg-primary-500 text-white"
                  : "bg-white text-gray-700 border border-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          {menuItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm"
            >
              <div className="h-32 bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                <span className="text-5xl">{item.emoji}</span>
              </div>
              <div className="p-3">
                <h3 className="font-semibold text-gray-900">{item.name}</h3>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-primary-600 font-bold">
                    ${item.price}
                  </span>
                  <button className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center">
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
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
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

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3">
        <div className="flex justify-around">
          <button className="flex flex-col items-center text-primary-500">
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
          </button>
          <button className="flex flex-col items-center text-gray-400">
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
            <span className="text-xs mt-1">Carrito</span>
          </button>
          <button className="flex flex-col items-center text-gray-400">
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
          </button>
        </div>
      </nav>
    </div>
  );
}

// Sample menu items
const menuItems = [
  { id: 1, name: "Tacos al Pastor", price: 45, emoji: "🌮" },
  { id: 2, name: "Quesadilla", price: 35, emoji: "🧀" },
  { id: 3, name: "Burrito", price: 55, emoji: "🌯" },
  { id: 4, name: "Agua Fresca", price: 25, emoji: "🥤" },
  { id: 5, name: "Nachos", price: 40, emoji: "🫓" },
  { id: 6, name: "Churros", price: 30, emoji: "🍩" },
];
