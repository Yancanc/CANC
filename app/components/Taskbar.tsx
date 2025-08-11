"use client";

import { useState, useEffect, useRef } from "react";
import { useLocale } from "../context/Locale";
import TaskbarClock from "./TaskbarClock";

interface Window {
  id: string;
  title: string;
  isMinimized: boolean;
}

interface TaskbarProps {
  onAboutClick: () => void;
  onProjectsClick: () => void;
  onContactClick: () => void;
  onSkillsClick: () => void;
  onPortfolioClick: () => void;
  onCVClick: () => void;
  openWindows: Window[];
  onWindowRestore: (id: string) => void;
}

export default function Taskbar({
  onAboutClick,
  onProjectsClick,
  onContactClick,
  onSkillsClick,
  onPortfolioClick,
  onCVClick,
  openWindows,
  onWindowRestore,
}: TaskbarProps) {
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const startMenuRef = useRef<HTMLDivElement>(null);
  const startButtonRef = useRef<HTMLButtonElement>(null);
  const { t } = useLocale();

  const toggleStartMenu = () => {
    setStartMenuOpen(!startMenuOpen);
  };

  const handleMenuItemClick = (action: () => void) => {
    action();
    setStartMenuOpen(false);
  };

  const handleWindowButtonClick = (id: string) => {
    onWindowRestore(id);
  };

  // Fechar o menu Start quando o usuário clicar fora dele
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        startMenuOpen &&
        startMenuRef.current &&
        !startMenuRef.current.contains(event.target as Node) &&
        startButtonRef.current &&
        !startButtonRef.current.contains(event.target as Node)
      ) {
        setStartMenuOpen(false);
      }
    };

    // Adicionar evento para cliques
    document.addEventListener("mousedown", handleClickOutside);
    // Adicionar evento para toques (importante para dispositivos móveis)
    document.addEventListener(
      "touchstart",
      handleClickOutside as EventListener
    );

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener(
        "touchstart",
        handleClickOutside as EventListener
      );
    };
  }, [startMenuOpen]);

  // Detectar se estamos em um dispositivo iOS
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Detectar iOS
    const detectIOS = () => {
      const userAgent = window.navigator.userAgent.toLowerCase();
      return /iphone|ipad|ipod/.test(userAgent);
    };

    const isIOSDevice = detectIOS();
    setIsIOS(isIOSDevice);

    // Ajustar viewport para iOS
    if (isIOSDevice) {
      // Força um reflow para garantir que o viewport seja aplicado corretamente
      document.body.style.display = "none";
      setTimeout(() => {
        document.body.style.display = "";
      }, 0);

      // Ajusta a altura do viewport para iOS
      const setVh = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty("--vh", `${vh}px`);
      };

      setVh();
      window.addEventListener("resize", setVh);
      window.addEventListener("orientationchange", setVh);

      return () => {
        window.removeEventListener("resize", setVh);
        window.removeEventListener("orientationchange", setVh);
      };
    }
  }, []);

  return (
    <>
      <div className={`win98-taskbar ${isIOS ? "ios-device" : ""}`}>
        <button
          className="win98-start-button"
          onClick={toggleStartMenu}
          ref={startButtonRef}
        >
          <img
            src="https://win98icons.alexmeub.com/icons/png/windows_update_large-2.png"
            alt="Start"
            width="20"
            height="20"
            style={{ marginRight: "4px" }}
          />
          <span>{t("start.menu")}</span>
        </button>

        <div className="taskbar-divider"></div>

        {/* Janelas abertas */}
        <div className="taskbar-windows">
          {openWindows.map((window) => (
            <button
              key={window.id}
              className={`taskbar-window-button ${
                !window.isMinimized ? "active" : ""
              }`}
              onClick={() => handleWindowButtonClick(window.id)}
              aria-pressed={!window.isMinimized}
              aria-label={window.title}
            >
              {window.title}
            </button>
          ))}
        </div>

        <TaskbarClock />
      </div>

      {/* Start Menu - Renderizado fora da taskbar para evitar problemas de posicionamento */}
      {startMenuOpen && (
        <div
          className={`start-menu active ${isIOS ? "ios-device" : ""}`}
          ref={startMenuRef}
          style={{
            position: "fixed",
            bottom: isIOS
              ? `calc(30px + env(safe-area-inset-bottom, 0))`
              : window.innerWidth <= 480
              ? "30px"
              : "40px",
            left: 0,
            zIndex: 9999,
            display: "block",
            transform: isIOS ? "translateZ(0)" : "none",
            WebkitTransform: isIOS ? "translateZ(0)" : "none",
            WebkitBackfaceVisibility: isIOS ? "hidden" : "visible",
            backfaceVisibility: isIOS ? "hidden" : "visible",
            WebkitPerspective: isIOS ? 1000 : "none",
            perspective: isIOS ? 1000 : "none",
            maxHeight: isIOS
              ? "calc(var(--vh, 1vh) * 60)"
              : window.innerWidth <= 480
              ? "60vh"
              : "70vh",
            overflowY: "auto",
            WebkitOverflowScrolling: "touch",
          }}
        >
          <div className="start-menu-header">Yandows 98</div>
          <div
            className="start-menu-items"
            style={{
              overflowY: "auto",
              WebkitOverflowScrolling: "touch",
              maxHeight: isIOS
                ? "calc(var(--vh, 1vh) * 55)"
                : "calc(100% - 10px)",
            }}
          >
            <div
              className="menu-item"
              onClick={() => handleMenuItemClick(onAboutClick)}
            >
              <img
                src="https://win98icons.alexmeub.com/icons/png/computer-4.png"
                alt="Currículo"
                width="16"
                height="16"
                style={{ marginRight: "8px" }}
              />
              <span>{t("menu.about")}</span>
            </div>

            <div
              className="menu-item"
              onClick={() => handleMenuItemClick(onProjectsClick)}
            >
              <img
                src="https://win98icons.alexmeub.com/icons/png/directory_network_conn-5.png"
                alt="Projetos"
                width="16"
                height="16"
                style={{ marginRight: "8px" }}
              />
              <span>{t("menu.projects")}</span>
            </div>

            <div
              className="menu-item"
              onClick={() => handleMenuItemClick(onContactClick)}
            >
              <img
                src="https://win98icons.alexmeub.com/icons/png/modem-5.png"
                alt="Contato"
                width="16"
                height="16"
                style={{ marginRight: "8px" }}
              />
              <span>{t("menu.contact")}</span>
            </div>

            <div
              className="menu-item"
              onClick={() => handleMenuItemClick(onSkillsClick)}
            >
              <img
                src="https://win98icons.alexmeub.com/icons/png/help_book_cool-4.png"
                alt="Habilidades"
                width="16"
                height="16"
                style={{ marginRight: "8px" }}
              />
              <span>{t("menu.skills")}</span>
            </div>

            <div
              className="menu-item"
              onClick={() => handleMenuItemClick(onPortfolioClick)}
            >
              <img
                src="https://win98icons.alexmeub.com/icons/png/msn_cool-3.png"
                alt="Portfólio"
                width="16"
                height="16"
                style={{ marginRight: "8px" }}
              />
              <span>{t("menu.portfolio")}</span>
            </div>

            <div
              className="menu-item"
              onClick={() => handleMenuItemClick(onCVClick)}
            >
              <img
                src="https://win98icons.alexmeub.com/icons/png/notepad_file_gear-2.png"
                alt="Currículo"
                width="16"
                height="16"
                style={{ marginRight: "8px" }}
              />
              <span>{t("menu.cv")}</span>
            </div>

            <div className="menu-divider"></div>

            <div
              className="menu-item"
              onClick={() =>
                window.open(
                  "https://github.com/Yancanc",
                  "_blank",
                  "noopener,noreferrer"
                )
              }
            >
              <img
                src="https://win98icons.alexmeub.com/icons/png/monitor_windows.png"
                alt="GitHub"
                width="16"
                height="16"
                style={{ marginRight: "8px" }}
              />
              <span>GitHub</span>
            </div>

            <div
              className="menu-item"
              onClick={() =>
                window.open(
                  "https://www.linkedin.com/in/yancanc/",
                  "_blank",
                  "noopener,noreferrer"
                )
              }
            >
              <img
                src="https://win98icons.alexmeub.com/icons/png/monitor_windows.png"
                alt="LinkedIn"
                width="16"
                height="16"
                style={{ marginRight: "8px" }}
              />
              <span>LinkedIn</span>
            </div>

            <div className="menu-divider"></div>

            <div
              className="menu-item"
              onClick={() =>
                window.open(
                  "/Curriculum 2025 - PT.pdf",
                  "_blank",
                  "noopener,noreferrer"
                )
              }
            >
              <img
                src="https://win98icons.alexmeub.com/icons/png/notepad_file_gear-2.png"
                alt="Baixar CV"
                width="16"
                height="16"
                style={{ marginRight: "8px" }}
              />
              <span>{t("menu.downloadCV")}</span>
            </div>

            <div
              className="menu-item"
              onClick={() => (window.location.href = "/login")}
            >
              <img
                src="https://win98icons.alexmeub.com/icons/png/msg_error-0.png"
                alt="Sair"
                width="16"
                height="16"
                style={{ marginRight: "8px" }}
              />
              <span>{t("menu.exit")}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
