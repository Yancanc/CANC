"use client";

import { useState, useEffect } from "react";
import Desktop from "./components/Desktop";
import VirusBSOD from "./components/VirusBSOD";
import { WindowManagerProvider } from "./context/WindowManager";
import { LocaleProvider } from "./context/Locale";
import Win98Loading from "./components/XPLoading";

// (Login removido)

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [showDesktop, setShowDesktop] = useState(false);
  const [forceReboot, setForceReboot] = useState(false);

  // Verificar se o usuário já estava logado (para desenvolvimento)
  useEffect(() => {
    // Sempre começar com loading ao recarregar a página
    setIsLoggedIn(true);
    setIsLoading(true);
    setShowDesktop(false);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setIsLoading(true);
  };

  const handleLoadingComplete = () => {
    setIsLoading(false);

    // Mostrar o desktop com uma pequena pausa para a animação
    setTimeout(() => {
      setShowDesktop(true);
    }, 300);
  };

  // Atalho Win+R abre /run; sequência "virus" dispara BSOD e reboot
  useEffect(() => {
    const buffer: string[] = [];
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "r" && (e.metaKey || e.ctrlKey)) {
        // em Win, metaKey pode ser a tecla Windows; em outros, Ctrl R
        window.location.assign("/run");
      }
      buffer.push(e.key.toLowerCase());
      if (buffer.length > 5) buffer.shift();
      if (buffer.join("") === "virus") {
        setForceReboot(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <LocaleProvider>
      {isLoading ? (
        <Win98Loading
          onLoadingComplete={handleLoadingComplete}
          loadingTime={5000}
        />
      ) : (
        <WindowManagerProvider>
          <div
            className={
              showDesktop ? "desktop-container fade-in" : "desktop-container"
            }
          >
            <Desktop />
            {forceReboot && (
              <VirusBSOD
                onDone={() => {
                  // volta para a tela de loading simulando reboot
                  setForceReboot(false);
                  setIsLoading(true);
                  setShowDesktop(false);
                }}
              />
            )}
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
        </WindowManagerProvider>
      )}
    </LocaleProvider>
  );
}
