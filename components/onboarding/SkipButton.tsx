"use client";

interface SkipButtonProps {
  onClick: () => void;
}

export function SkipButton({ onClick }: SkipButtonProps) {
  return (
    <button
      onClick={onClick}
      className="absolute top-4 right-4 px-4 py-2 text-sm font-medium text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100/50 active:bg-gray-100"
    >
      Saltar
    </button>
  );
}
