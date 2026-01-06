"use client";

interface IOSInstallGuideProps {
  isActive: boolean;
  onComplete: () => void;
}

export function IOSInstallGuide({ isActive, onComplete }: IOSInstallGuideProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full px-8">
      <h2
        className={`text-2xl font-bold text-gray-900 text-center ${
          isActive ? "animate-fade-slide-up" : "opacity-0"
        }`}
        style={{ animationFillMode: "backwards" }}
      >
        Agregar a Pantalla de Inicio
      </h2>

      <p
        className={`mt-2 text-gray-500 text-center ${
          isActive ? "animate-fade-slide-up" : "opacity-0"
        }`}
        style={{ animationDelay: "0.1s", animationFillMode: "backwards" }}
      >
        Sigue estos pasos en Safari:
      </p>

      {/* Steps */}
      <div
        className={`mt-8 space-y-5 w-full max-w-xs ${
          isActive ? "animate-fade-slide-up" : "opacity-0"
        }`}
        style={{ animationDelay: "0.2s", animationFillMode: "backwards" }}
      >
        <StepItem
          number={1}
          title="Toca el botón Compartir"
          description="El icono de cuadro con flecha arriba"
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
          }
        />
        <StepItem
          number={2}
          title='Selecciona "Agregar a Inicio"'
          description="Desliza hacia abajo si no lo ves"
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          }
        />
        <StepItem
          number={3}
          title="Toca Agregar"
          description="¡Encontrarás la app en tu pantalla!"
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          }
        />
      </div>

      {/* Bonus reminder with golden accent */}
      <div
        className={`mt-8 w-full max-w-xs ${
          isActive ? "animate-fade-slide-up" : "opacity-0"
        }`}
        style={{ animationDelay: "0.35s", animationFillMode: "backwards" }}
      >
        <div className="bg-gradient-to-r from-accent-50 to-accent-100 border border-accent-200 rounded-2xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-accent rounded-full flex items-center justify-center shadow-sm flex-shrink-0">
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L14.09 8.26L20.5 9.27L15.75 13.97L16.82 20.5L12 17.77L7.18 20.5L8.25 13.97L3.5 9.27L9.91 8.26L12 2Z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-accent-700">
              +50 puntos gratis
            </p>
            <p className="text-xs text-accent-600">
              Al agregar la app
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={onComplete}
        className={`mt-8 w-full max-w-xs py-4 bg-gradient-primary text-white rounded-full text-lg font-semibold shadow-glow btn-press ${
          isActive ? "animate-fade-slide-up" : "opacity-0"
        }`}
        style={{ animationDelay: "0.45s", animationFillMode: "backwards" }}
      >
        Entendido
      </button>
    </div>
  );
}

function StepItem({
  number,
  title,
  description,
  icon,
}: {
  number: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-11 h-11 bg-gradient-primary rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
        <span className="text-white font-bold">{number}</span>
      </div>
      <div className="flex-1 pt-0.5">
        <p className="font-semibold text-gray-900">{title}</p>
        <p className="text-sm text-gray-500 mt-0.5">{description}</p>
      </div>
      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 flex-shrink-0">
        {icon}
      </div>
    </div>
  );
}
