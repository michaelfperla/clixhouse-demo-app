"use client";

interface ProgressDotsProps {
  total: number;
  current: number;
}

export function ProgressDots({ total, current }: ProgressDotsProps) {
  return (
    <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2.5">
      {Array.from({ length: total }).map((_, index) => {
        const isActive = index === current;
        const isPast = index < current;

        return (
          <div
            key={index}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              isActive
                ? "w-8 dot-active shadow-sm"
                : isPast
                ? "w-2.5 bg-primary-300"
                : "w-2.5 dot-inactive"
            }`}
            style={{
              transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          />
        );
      })}
    </div>
  );
}
