"use client";

interface WelcomeScreenProps {
  isActive: boolean;
}

export function WelcomeScreen({ isActive }: WelcomeScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full px-8">
      {/* Floating logo with gradient and glow */}
      <div
        className={`${isActive ? "animate-bounce-in" : "opacity-0"}`}
      >
        <div className={`relative ${isActive ? "animate-float" : ""}`}>
          {/* Glow effect behind logo */}
          <div className="absolute inset-0 bg-gradient-primary rounded-[2rem] blur-xl opacity-40 scale-110" />

          {/* Main logo container */}
          <div className="relative w-36 h-36 bg-gradient-primary rounded-[2rem] flex items-center justify-center shadow-elevated-lg">
            {/* Fork and knife icon */}
            <svg
              className="w-20 h-20 text-white drop-shadow-sm"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {/* Fork */}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M7 3v4m0 0v14m0-14h2a2 2 0 002-2V3M7 7H5a2 2 0 00-2 2v2"
              />
              {/* Knife */}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M17 3v18m0-18c2 0 4 1.5 4 4s-2 4-4 4"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Restaurant name with better hierarchy */}
      <div className="mt-10 text-center">
        <p
          className={`text-lg font-medium text-gray-500 tracking-wide ${
            isActive ? "animate-fade-slide-up" : "opacity-0"
          }`}
          style={{ animationDelay: "0.4s", animationFillMode: "backwards" }}
        >
          Bienvenido a
        </p>

        <h1
          className={`mt-1 text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent ${
            isActive ? "animate-fade-slide-up" : "opacity-0"
          }`}
          style={{ animationDelay: "0.6s", animationFillMode: "backwards" }}
        >
          CLIXHOUSE
        </h1>
        <p
          className={`text-sm font-medium text-gray-400 tracking-widest uppercase ${
            isActive ? "animate-fade-slide-up" : "opacity-0"
          }`}
          style={{ animationDelay: "0.7s", animationFillMode: "backwards" }}
        >
          Restaurant
        </p>
      </div>

      {/* Swipe hint with animation */}
      <div
        className={`mt-12 flex flex-col items-center ${
          isActive ? "animate-fade-slide-up" : "opacity-0"
        }`}
        style={{ animationDelay: "1s", animationFillMode: "backwards" }}
      >
        <p className="text-sm text-gray-400 mb-2">
          Desliza para continuar
        </p>
        {/* Animated arrow */}
        <svg
          className="w-5 h-5 text-gray-300 animate-pulse"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </div>
  );
}
