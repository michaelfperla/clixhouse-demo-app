"use client";

import { usePointsStore } from "@/lib/stores/points-store";
import { BottomNav } from "@/components/navigation/BottomNav";

const REWARDS = [
  {
    id: "bebida",
    name: "Bebida Gratis",
    description: "Agua fresca o refresco",
    emoji: "🥤",
    points: 50,
  },
  {
    id: "taco",
    name: "Taco Gratis",
    description: "Cualquier taco del menú",
    emoji: "🌮",
    points: 100,
  },
  {
    id: "postre",
    name: "Postre Gratis",
    description: "Churros o flan",
    emoji: "🍩",
    points: 150,
  },
  {
    id: "plato",
    name: "Plato Gratis",
    description: "Hasta $65 MXN de valor",
    emoji: "🍽️",
    points: 250,
  },
];

export default function PointsPage() {
  const { points } = usePointsStore();

  return (
    <div className="min-h-screen bg-primary-50 pb-20">
      {/* Header */}
      <header className="bg-gradient-to-br from-accent-400 to-accent-500 px-4 pt-8 pb-16">
        <h1 className="text-white text-xl font-bold mb-8">Mis Puntos</h1>

        {/* Points Display */}
        <div className="text-center">
          <div className="inline-block relative">
            <span className="text-7xl font-bold text-white animate-bounce-in">
              {points}
            </span>
            <span className="absolute -top-2 -right-6 text-3xl animate-star-sparkle">
              ⭐
            </span>
          </div>
          <p className="text-white/80 text-lg mt-2">PUNTOS</p>
        </div>
      </header>

      {/* Rewards Section */}
      <main className="px-4 -mt-8">
        <div className="bg-white rounded-3xl shadow-elevated p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Canjear Premios
          </h2>

          <div className="space-y-4">
            {REWARDS.map((reward, index) => {
              const canRedeem = points >= reward.points;
              const progress = Math.min((points / reward.points) * 100, 100);

              return (
                <div
                  key={reward.id}
                  className="animate-fade-slide-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-center gap-4">
                    {/* Emoji */}
                    <div
                      className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                        canRedeem
                          ? "bg-gradient-to-br from-accent-100 to-accent-200"
                          : "bg-gray-100"
                      }`}
                    >
                      <span className="text-3xl">{reward.emoji}</span>
                    </div>

                    {/* Details */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-900">
                          {reward.name}
                        </h3>
                        <span
                          className={`text-sm font-bold ${
                            canRedeem ? "text-accent-600" : "text-gray-400"
                          }`}
                        >
                          {reward.points} pts
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mb-2">
                        {reward.description}
                      </p>

                      {/* Progress or Button */}
                      {canRedeem ? (
                        <button className="w-full py-2 bg-gradient-to-r from-accent-400 to-accent-500 text-white rounded-full text-sm font-semibold shadow-sm active:scale-[0.98] transition-transform">
                          Canjear
                        </button>
                      ) : (
                        <div>
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-accent-400 to-accent-500 rounded-full transition-all duration-500"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                          <p className="text-xs text-gray-400 mt-1">
                            {points}/{reward.points} puntos
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* How to Earn */}
        <div className="mt-6 bg-white rounded-3xl shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            ¿Cómo ganar puntos?
          </h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🛒</span>
              <p className="text-gray-600 text-sm">
                Gana puntos con cada pedido
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">📱</span>
              <p className="text-gray-600 text-sm">
                +50 puntos por instalar la app
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">🎂</span>
              <p className="text-gray-600 text-sm">
                Puntos dobles en tu cumpleaños
              </p>
            </div>
          </div>
        </div>
      </main>

      <BottomNav activeTab="points" />
    </div>
  );
}
