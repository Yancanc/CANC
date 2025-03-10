"use client";

import { useState, useEffect } from "react";
import Desktop from "../components/Desktop";
import Win98Loading from "../components/XPLoading";

interface Window {
  id: string;
  title: string;
  isMinimized: boolean;
}

export default function DesktopPage() {
  const [loading, setLoading] = useState(true);
  const [showDesktop, setShowDesktop] = useState(false);

  const handleLoadingComplete = () => {
    setLoading(false);

    // Mostrar o desktop com uma pequena pausa para a animação
    setTimeout(() => {
      setShowDesktop(true);
    }, 300);
  };

  if (loading) {
    return (
      <Win98Loading
        onLoadingComplete={handleLoadingComplete}
        loadingTime={5000}
      />
    );
  }

  return (
    <div
      className={
        showDesktop ? "desktop-container fade-in" : "desktop-container"
      }
    >
      <Desktop />

      <style jsx>{`
        .desktop-container {
          width: 100%;
          height: 100vh;
          overflow: hidden;
          opacity: 0;
          transition: opacity 0.5s ease-in-out;
        }

        .fade-in {
          opacity: 1;
        }
      `}</style>
    </div>
  );
}
