import React, { useState, useEffect } from 'react';
import TransparentLogo from './TransparentLogo.jsx';

export default function LoadingScreen({ onComplete }) {
  const [isExiting, setIsExiting] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);

  useEffect(() => {
    // Prevent scrolling during loading
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Fast and simple loader: ~800ms
    const timer = setTimeout(() => {
      setIsExiting(true);

      setTimeout(() => {
        setIsRemoved(true);
        document.body.style.overflow = originalOverflow;
        if (onComplete) onComplete();
      }, 800); // 400ms fade-out transition
    }, 2000);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = originalOverflow;
    };
  }, [onComplete]);

  if (isRemoved) return null;

  return (
    <div
      aria-label="Chargement..."
      role="status"
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#faf6f0] transition-opacity duration-400 ease-out select-none ${
        isExiting ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center gap-5">
        {/* Logo Nexora */}
        <TransparentLogo
          src="/assets/nexora.webp"
          alt="Nexora"
          width={160}
          height={38}
          className="h-10 w-auto object-contain mix-blend-multiply"
        />

        {/* Minimalist spinner */}
        <div className="w-6 h-6 rounded-full border-2 border-[#4a7c59]/20 border-t-[#4a7c59] animate-spin" />
      </div>
    </div>
  );
}
