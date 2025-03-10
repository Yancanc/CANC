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
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ marginRight: "4px" }}
          >
            <rect width="9" height="9" fill="#FF0000" />
            <rect x="11" width="9" height="9" fill="#00FF00" />
            <rect y="11" width="9" height="9" fill="#0000FF" />
            <rect x="11" y="11" width="9" height="9" fill="#FFFF00" />
          </svg>
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
              <svg
                width="16"
                height="16"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ marginRight: "8px" }}
              >
                <rect x="4" y="6" width="24" height="16" fill="#FFFFCC" />
                <rect x="8" y="10" width="16" height="8" fill="#000080" />
                <rect x="10" y="22" width="12" height="4" fill="#C0C0C0" />
                <rect x="14" y="22" width="4" height="1" fill="#FFFFFF" />
              </svg>
              <span>Currículo</span>
            </div>

            <div
              className="menu-item"
              onClick={() => handleMenuItemClick(onProjectsClick)}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ marginRight: "8px" }}
              >
                <path d="M4 8H14L16 10H28V24H4V8Z" fill="#FFCC66" />
                <path
                  d="M4 8H14L16 10H28V11H4V8Z"
                  fill="#FFFFFF"
                  opacity="0.5"
                />
                <path d="M4 24H28V23H4V24Z" fill="#996600" opacity="0.5" />
              </svg>
              <span>Projetos</span>
            </div>

            <div
              className="menu-item"
              onClick={() => handleMenuItemClick(onContactClick)}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ marginRight: "8px" }}
              >
                <rect x="4" y="6" width="10" height="8" fill="#C0C0C0" />
                <rect x="18" y="6" width="10" height="8" fill="#C0C0C0" />
                <rect x="11" y="18" width="10" height="8" fill="#C0C0C0" />
                <path
                  d="M9 10L16 18M23 10L16 18"
                  stroke="#000080"
                  strokeWidth="1.5"
                />
              </svg>
              <span>Contato</span>
            </div>

            <div
              className="menu-item"
              onClick={() => handleMenuItemClick(onSkillsClick)}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ marginRight: "8px" }}
              >
                <circle cx="16" cy="16" r="10" fill="#C0C0C0" />
                <path
                  d="M16 6V8M16 24V26M6 16H8M24 16H26M8.5 8.5L10 10M22 22L23.5 23.5M8.5 23.5L10 22M22 10L23.5 8.5"
                  stroke="#000080"
                  strokeWidth="1.5"
                />
                <circle cx="16" cy="16" r="4" fill="#000080" />
                <circle cx="16" cy="16" r="2" fill="#FFFFFF" />
              </svg>
              <span>Habilidades</span>
            </div>

            <div
              className="menu-item"
              onClick={() => handleMenuItemClick(onPortfolioClick)}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ marginRight: "8px" }}
              >
                <circle cx="16" cy="16" r="12" fill="#0078D7" />
                <circle cx="16" cy="16" r="10" fill="#FFFFFF" />
                <path
                  d="M8 16C8 11.6 11.6 8 16 8C20.4 8 24 11.6 24 16"
                  stroke="#0078D7"
                  strokeWidth="2"
                />
                <path d="M16 8V24M8 16H24" stroke="#0078D7" strokeWidth="2" />
              </svg>
              <span>Portfólio</span>
            </div>

            <div className="menu-divider"></div>

            <div
              className="menu-item"
              onClick={() =>
                window.open("https://github.com/yancancella", "_blank")
              }
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ marginRight: "8px" }}
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z"
                  fill="#333333"
                />
              </svg>
              <span>GitHub</span>
            </div>

            <div
              className="menu-item"
              onClick={() =>
                window.open("https://www.linkedin.com/in/yancanc/", "_blank")
              }
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ marginRight: "8px" }}
              >
                <path
                  d="M0 1.146C0 0.513 0.526 0 1.175 0H14.825C15.474 0 16 0.513 16 1.146V14.854C16 15.487 15.474 16 14.825 16H1.175C0.526 16 0 15.487 0 14.854V1.146ZM4.943 13.394V6.169H2.542V13.394H4.943ZM3.743 5.182C4.58 5.182 5.101 4.628 5.101 3.934C5.086 3.225 4.58 2.686 3.758 2.686C2.937 2.686 2.4 3.226 2.4 3.934C2.4 4.628 2.922 5.182 3.727 5.182H3.743ZM8.651 13.394V9.359C8.651 9.143 8.667 8.927 8.731 8.773C8.904 8.342 9.299 7.895 9.963 7.895C10.832 7.895 11.179 8.557 11.179 9.529V13.394H13.58V9.25C13.58 7.03 12.396 5.998 10.816 5.998C9.542 5.998 8.971 6.698 8.651 7.191V7.216H8.635C8.64 7.208 8.645 7.2 8.651 7.191V6.169H6.252C6.284 6.847 6.252 13.394 6.252 13.394H8.651Z"
                  fill="#0077B5"
                />
              </svg>
              <span>LinkedIn</span>
            </div>

            <div className="menu-divider"></div>

            <div
              className="menu-item"
              onClick={() => window.open("/Curriculum 2025 - PT.pdf", "_blank")}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ marginRight: "8px" }}
              >
                <path
                  d="M14 4.5V14C14 14.5523 13.5523 15 13 15H3C2.44772 15 2 14.5523 2 14V2C2 1.44772 2.44772 1 3 1H10.5L14 4.5Z"
                  fill="#E44D26"
                  stroke="#333333"
                  strokeWidth="0.5"
                />
                <path d="M10 1V5H14" stroke="#333333" strokeWidth="0.5" />
                <rect x="4" y="7" width="8" height="1" fill="#333333" />
                <rect x="4" y="9" width="8" height="1" fill="#333333" />
                <rect x="4" y="11" width="8" height="1" fill="#333333" />
              </svg>
              <span>Baixar CV</span>
            </div>

            <div
              className="menu-item"
              onClick={() => (window.location.href = "/login")}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ marginRight: "8px" }}
              >
                <path
                  d="M8 1C4.1 1 1 4.1 1 8C1 11.9 4.1 15 8 15C11.9 15 15 11.9 15 8C15 4.1 11.9 1 8 1ZM8 3C9.1 3 10 3.9 10 5C10 6.1 9.1 7 8 7C6.9 7 6 6.1 6 5C6 3.9 6.9 3 8 3ZM8 13C6.3 13 4.8 12.2 3.9 10.9C3.9 9.3 6.7 8.5 8 8.5C9.3 8.5 12.1 9.3 12.1 10.9C11.2 12.2 9.7 13 8 13Z"
                  fill="#FF4500"
                />
              </svg>
              <span>Sair</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
