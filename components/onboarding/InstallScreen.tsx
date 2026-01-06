"use client";

import { useState, useEffect } from "react";
import { usePWAInstall } from "@/hooks/usePWAInstall";
import { useOnboardingStore } from "@/lib/stores/onboarding-store";
import { usePointsStore } from "@/lib/stores/points-store";
import { IOSInstallGuide } from "./IOSInstallGuide";
import { Confetti } from "@/components/ui/Confetti";

interface InstallScreenProps {
  isActive: boolean;
  onComplete: () => void;
}

export function InstallScreen({ isActive, onComplete }: InstallScreenProps) {
  const { isInstallable, isIOS, isInstalled, prompt } = usePWAInstall();

  // Debug info - remove after fixing
  const [swStatus, setSwStatus] = useState("checking...");

  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistration().then(reg => {
        setSwStatus(reg ? `SW: active` : "SW: none");
      }).catch(() => setSwStatus("SW: error"));
    } else {
      setSwStatus("SW: unsupported");
    }
  }, []);

  const debugInfo = `${swStatus}, installable: ${isInstallable}, iOS: ${isIOS}, prompt: ${typeof window !== 'undefined' && !!window.__pwaInstallPrompt}`;
  const { markInstalled } = useOnboardingStore();
  const { awardInstallBonus } = usePointsStore();
  const [isInstalling, setIsInstalling] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInstall = async () => {
    setIsInstalling(true);
    const accepted = await prompt();

    if (accepted) {
      markInstalled();
      awardInstallBonus();
      setShowSuccess(true);
      setTimeout(onComplete, 2500);
    } else {
      setIsInstalling(false);
    }
  };

  const handleSkipInstall = () => {
    onComplete();
  };

  // Show iOS-specific instructions
  if (isIOS) {
    return <IOSInstallGuide isActive={isActive} onComplete={onComplete} />;
  }

  // Show success state with confetti
  if (showSuccess) {
    return (
      <>
        <Confetti isActive={showSuccess} />
        <div className="flex flex-col items-center justify-center h-full px-8">
          {/* Success checkmark with gradient */}
          <div className="relative animate-bounce-in">
            {/* Glow behind */}
            <div className="absolute inset-0 bg-gradient-primary rounded-full blur-xl opacity-40 scale-125" />

            <div className="relative w-28 h-28 bg-gradient-primary rounded-full flex items-center justify-center shadow-elevated-lg">
              <svg
                className="w-14 h-14 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                  className="animate-draw-check"
                />
              </svg>
            </div>
          </div>

          <h2
            className="mt-8 text-3xl font-bold text-gray-900 text-center animate-fade-slide-up"
            style={{ animationDelay: "0.2s", animationFillMode: "backwards" }}
          >
            ¡Instalado!
          </h2>

          {/* Points badge with golden accent */}
          <div
            className="mt-5 animate-fade-slide-up"
            style={{ animationDelay: "0.4s", animationFillMode: "backwards" }}
          >
            <div className="inline-flex items-center gap-2 bg-gradient-accent px-5 py-2.5 rounded-full shadow-glow-accent">
              <span className="text-2xl font-bold text-white drop-shadow-sm">+50</span>
              <span className="text-white/90 font-semibold">puntos</span>
            </div>
          </div>

          <p
            className="mt-4 text-gray-500 text-center animate-fade-slide-up"
            style={{ animationDelay: "0.6s", animationFillMode: "backwards" }}
          >
            Encuentra la app en tu pantalla de inicio
          </p>
        </div>
      </>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-full px-8">
      {/* Phone illustration with download arrow */}
      <div
        className={`relative ${isActive ? "animate-fade-slide-up" : "opacity-0"}`}
        style={{ animationFillMode: "backwards" }}
      >
        {/* Glow behind */}
        <div className="absolute inset-0 bg-primary-200 rounded-full blur-2xl opacity-60 scale-110" />

        <div className="relative w-40 h-40 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center shadow-elevated">
          {/* Phone with download icon */}
          <div className="relative">
            <svg
              className="w-16 h-16 text-primary-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <rect x="5" y="2" width="14" height="20" rx="2" strokeWidth={1.5} />
              <line x1="12" y1="18" x2="12" y2="18.01" strokeWidth={2} strokeLinecap="round" />
            </svg>
            {/* Download arrow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <svg className="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <h2
        className={`mt-10 text-3xl font-bold text-gray-900 text-center ${
          isActive ? "animate-fade-slide-up" : "opacity-0"
        }`}
        style={{ animationDelay: "0.2s", animationFillMode: "backwards" }}
      >
        Agrega a tu pantalla
      </h2>

      {/* Bonus points highlight with golden accent */}
      <div
        className={`mt-4 ${isActive ? "animate-fade-slide-up" : "opacity-0"}`}
        style={{ animationDelay: "0.4s", animationFillMode: "backwards" }}
      >
        <div className="inline-flex items-center gap-2 bg-gradient-accent px-4 py-2 rounded-full shadow-sm">
          <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L14.09 8.26L20.5 9.27L15.75 13.97L16.82 20.5L12 17.77L7.18 20.5L8.25 13.97L3.5 9.27L9.91 8.26L12 2Z" />
          </svg>
          <span className="text-xl font-bold text-white">+50</span>
          <span className="text-white/90 font-medium">puntos gratis</span>
        </div>
      </div>

      <p
        className={`mt-4 text-gray-500 text-center max-w-xs ${
          isActive ? "animate-fade-slide-up" : "opacity-0"
        }`}
        style={{ animationDelay: "0.6s", animationFillMode: "backwards" }}
      >
        Acceso rápido sin buscar en el navegador
      </p>

      {/* Buttons */}
      <div
        className={`mt-10 w-full max-w-xs space-y-3 ${
          isActive ? "animate-fade-slide-up" : "opacity-0"
        }`}
        style={{ animationDelay: "0.8s", animationFillMode: "backwards" }}
      >
        {isInstallable ? (
          <button
            onClick={handleInstall}
            disabled={isInstalling}
            className="w-full py-4 bg-gradient-primary text-white rounded-full text-lg font-semibold shadow-glow btn-press animate-glow-pulse disabled:opacity-50 disabled:animate-none"
          >
            {isInstalling ? "Instalando..." : "Instalar App"}
          </button>
        ) : (
          <button
            onClick={onComplete}
            className="w-full py-4 bg-gradient-primary text-white rounded-full text-lg font-semibold shadow-glow btn-press"
          >
            Continuar
          </button>
        )}

        <button
          onClick={handleSkipInstall}
          className="w-full py-3 text-gray-400 text-center font-medium hover:text-gray-500 transition-colors"
        >
          Ahora no
        </button>

        {/* Debug info - remove after fixing */}
        <p className="mt-4 text-xs text-gray-300 text-center break-all">
          {debugInfo}
        </p>
      </div>
    </div>
  );
}
