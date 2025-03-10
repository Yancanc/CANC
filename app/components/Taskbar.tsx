"use client";

import { useState, useEffect, useRef } from "react";
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
  openWindows: Window[];
  onWindowRestore: (id: string) => void;
}

export default function Taskbar({
  onAboutClick,
  onProjectsClick,
  onContactClick,
  onSkillsClick,
  onPortfolioClick,
  openWindows,
  onWindowRestore,
}: TaskbarProps) {
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const startMenuRef = useRef<HTMLDivElement>(null);
  const startButtonRef = useRef<HTMLButtonElement>(null);

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

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [startMenuOpen]);

  return (
    <>
      <div className="win98-taskbar">
        <button
          className="win98-start-button"
          onClick={toggleStartMenu}
          ref={startButtonRef}
        >
          <img
            src="/icons/team.png"
            alt="Start"
            width="20"
            height="20"
            style={{ marginRight: "4px" }}
          />
          <span>Start</span>
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
            >
              {window.title}
            </button>
          ))}
        </div>

        <TaskbarClock />
      </div>

      {/* Start Menu */}
      {startMenuOpen && (
        <div className="start-menu active" ref={startMenuRef}>
          <div className="start-menu-header">Yandows 98</div>
          <div className="start-menu-items">
            <div
              className="menu-item"
              onClick={() => handleMenuItemClick(onAboutClick)}
            >
              <img
                src="/icons/team.png"
                alt="Currículo"
                width="16"
                height="16"
                style={{ marginRight: "8px" }}
              />
              <span>Currículo</span>
            </div>

            <div
              className="menu-item"
              onClick={() => handleMenuItemClick(onProjectsClick)}
            >
              <img
                src="/icons/open-folder.png"
                alt="Projetos"
                width="16"
                height="16"
                style={{ marginRight: "8px" }}
              />
              <span>Projetos</span>
            </div>

            <div
              className="menu-item"
              onClick={() => handleMenuItemClick(onContactClick)}
            >
              <img
                src="/icons/phone.png"
                alt="Contato"
                width="16"
                height="16"
                style={{ marginRight: "8px" }}
              />
              <span>Contato</span>
            </div>

            <div
              className="menu-item"
              onClick={() => handleMenuItemClick(onSkillsClick)}
            >
              <img
                src="/icons/search.png"
                alt="Habilidades"
                width="16"
                height="16"
                style={{ marginRight: "8px" }}
              />
              <span>Habilidades</span>
            </div>

            <div
              className="menu-item"
              onClick={() => handleMenuItemClick(onPortfolioClick)}
            >
              <img
                src="/icons/world.png"
                alt="Portfólio"
                width="16"
                height="16"
                style={{ marginRight: "8px" }}
              />
              <span>Portfólio</span>
            </div>

            <div className="menu-divider"></div>

            <div
              className="menu-item"
              onClick={() =>
                window.open("https://github.com/yancancella", "_blank")
              }
            >
              <img
                src="/icons/team.png"
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
                  "https://www.linkedin.com/in/yan-rodrigues-3b4a5a1b8/",
                  "_blank"
                )
              }
            >
              <img
                src="/icons/team.png"
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
              onClick={() => window.open("/Curriculum 2025 - PT.pdf", "_blank")}
            >
              <img
                src="/icons/player.png"
                alt="Baixar CV"
                width="16"
                height="16"
                style={{ marginRight: "8px" }}
              />
              <span>Baixar CV</span>
            </div>

            <div
              className="menu-item"
              onClick={() => (window.location.href = "/login")}
            >
              <img
                src="/icons/camera.png"
                alt="Sair"
                width="16"
                height="16"
                style={{ marginRight: "8px" }}
              />
              <span>Sair</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
