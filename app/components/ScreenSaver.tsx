"use client";

import React, { useEffect } from "react";

interface ScreenSaverProps {
  onExit: () => void;
}

export default function ScreenSaver({ onExit }: ScreenSaverProps) {
  useEffect(() => {
    const exit = () => onExit();
    window.addEventListener("mousemove", exit, { once: true });
    window.addEventListener("keydown", exit, { once: true });
    window.addEventListener("mousedown", exit, { once: true });
    window.addEventListener("touchstart", exit, { once: true });
    return () => {
      window.removeEventListener("mousemove", exit);
      window.removeEventListener("keydown", exit);
      window.removeEventListener("mousedown", exit);
      window.removeEventListener("touchstart", exit);
    };
  }, [onExit]);

  return (
    <div className="screensaver-overlay">
      <div className="screensaver-logo">Yandows 98</div>

      <style jsx>{`
        .screensaver-overlay {
          position: fixed;
          inset: 0;
          background: #000;
          z-index: 99999;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .screensaver-logo {
          color: #00ffff;
          font-family: "MS Sans Serif", Tahoma, Arial, sans-serif;
          font-size: 28px;
          text-shadow: 0 0 6px rgba(0, 255, 255, 0.8);
          animation: bounce 5s linear infinite;
          user-select: none;
        }
        @keyframes bounce {
          0% {
            transform: translate(-40vw, -35vh);
          }
          25% {
            transform: translate(35vw, -30vh);
          }
          50% {
            transform: translate(38vw, 30vh);
          }
          75% {
            transform: translate(-35vw, 30vh);
          }
          100% {
            transform: translate(-40vw, -35vh);
          }
        }
      `}</style>
    </div>
  );
}
