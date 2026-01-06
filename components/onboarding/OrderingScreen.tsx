"use client";

interface OrderingScreenProps {
  isActive: boolean;
}

export function OrderingScreen({ isActive }: OrderingScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full px-8">
      {/* Illustration - Phone with food order */}
      <div
        className={`relative ${isActive ? "animate-fade-slide-up" : "opacity-0"}`}
        style={{ animationFillMode: "backwards" }}
      >
        {/* Glow behind */}
        <div className="absolute inset-0 bg-primary-200 rounded-full blur-2xl opacity-60 scale-110" />

        {/* Main illustration circle */}
        <div className="relative w-44 h-44 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center shadow-elevated">
          {/* Phone icon with food */}
          <div className="relative">
            <svg
              className="w-20 h-20 text-primary-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <rect
                x="5"
                y="2"
                width="14"
                height="20"
                rx="2"
                strokeWidth={1.5}
              />
              <line x1="12" y1="18" x2="12" y2="18.01" strokeWidth={2} strokeLinecap="round" />
            </svg>
            {/* Food emoji overlay */}
            <span className="absolute -top-2 -right-3 text-3xl">🌮</span>
          </div>
        </div>
      </div>

      {/* Headline */}
      <h2
        className={`mt-10 text-3xl font-bold text-gray-900 text-center ${
          isActive ? "animate-fade-slide-up" : "opacity-0"
        }`}
        style={{ animationDelay: "0.1s", animationFillMode: "backwards" }}
      >
        Pide sin filas
      </h2>

      {/* Subheadline */}
      <p
        className={`mt-3 text-lg text-gray-500 text-center max-w-xs ${
          isActive ? "animate-fade-slide-up" : "opacity-0"
        }`}
        style={{ animationDelay: "0.2s", animationFillMode: "backwards" }}
      >
        Ordena desde tu mesa o para llevar, sin esperar
      </p>

      {/* Features list - Modern style */}
      <div
        className={`mt-8 space-y-4 ${
          isActive ? "animate-fade-slide-up" : "opacity-0"
        }`}
        style={{ animationDelay: "0.35s", animationFillMode: "backwards" }}
      >
        <FeatureItem
          icon={
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          }
          text="Ve el menu completo con fotos"
        />
        <FeatureItem
          icon={
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          }
          text="Paga seguro desde tu celular"
        />
        <FeatureItem
          icon={
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          }
          text="Recibe tu pedido en tu mesa"
        />
      </div>
    </div>
  );
}

function FeatureItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-7 h-7 bg-gradient-primary rounded-lg flex items-center justify-center shadow-sm">
        <span className="text-white">{icon}</span>
      </div>
      <span className="text-gray-700 font-medium">{text}</span>
    </div>
  );
}
