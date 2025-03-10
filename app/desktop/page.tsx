"use client";

import { useState, useEffect } from "react";
import Desktop from "../components/Desktop";
import Taskbar from "../components/Taskbar";
import Win98Loading from "../components/XPLoading";
import ProjectsWindow from "../components/ProjectsWindow";

interface Window {
  id: string;
  title: string;
  isMinimized: boolean;
}

export default function DesktopPage() {
  const [loading, setLoading] = useState(true);
  const [showDesktop, setShowDesktop] = useState(false);
  const [openWindows, setOpenWindows] = useState<Window[]>([]);

  const openAboutWindow = () => {
    // Verificar se a janela já está aberta
    const existingWindow = openWindows.find((window) => window.id === "about");

    if (existingWindow) {
      // Se estiver minimizada, restaurar
      if (existingWindow.isMinimized) {
        restoreWindow("about");
      }
    } else {
      // Se não estiver aberta, adicionar à lista
      setOpenWindows((prev) => [
        ...prev,
        {
          id: "about",
          title: "Sobre Mim",
          isMinimized: false,
        },
      ]);
    }
  };

  const openProjectsWindow = () => {
    // Verificar se a janela já está aberta
    const existingWindow = openWindows.find(
      (window) => window.id === "projects"
    );

    if (existingWindow) {
      // Se estiver minimizada, restaurar
      if (existingWindow.isMinimized) {
        restoreWindow("projects");
      }
    } else {
      // Se não estiver aberta, adicionar à lista
      setOpenWindows((prev) => [
        ...prev,
        {
          id: "projects",
          title: "Projetos",
          isMinimized: false,
        },
      ]);
    }
  };

  const openContactWindow = () => {
    // Verificar se a janela já está aberta
    const existingWindow = openWindows.find(
      (window) => window.id === "contact"
    );

    if (existingWindow) {
      // Se estiver minimizada, restaurar
      if (existingWindow.isMinimized) {
        restoreWindow("contact");
      }
    } else {
      // Se não estiver aberta, adicionar à lista
      setOpenWindows((prev) => [
        ...prev,
        {
          id: "contact",
          title: "Contato",
          isMinimized: false,
        },
      ]);
    }
  };

  const openSkillsWindow = () => {
    // Verificar se a janela já está aberta
    const existingWindow = openWindows.find((window) => window.id === "skills");

    if (existingWindow) {
      // Se estiver minimizada, restaurar
      if (existingWindow.isMinimized) {
        restoreWindow("skills");
      }
    } else {
      // Se não estiver aberta, adicionar à lista
      setOpenWindows((prev) => [
        ...prev,
        {
          id: "skills",
          title: "Habilidades",
          isMinimized: false,
        },
      ]);
    }
  };

  const openPortfolioWindow = () => {
    // Verificar se a janela já está aberta
    const existingWindow = openWindows.find(
      (window) => window.id === "portfolio"
    );

    if (existingWindow) {
      // Se estiver minimizada, restaurar
      if (existingWindow.isMinimized) {
        restoreWindow("portfolio");
      }
    } else {
      // Se não estiver aberta, adicionar à lista
      setOpenWindows((prev) => [
        ...prev,
        {
          id: "portfolio",
          title: "Portfólio",
          isMinimized: false,
        },
      ]);
    }
  };

  const closeWindow = (id: string) => {
    // Ao fechar a janela, remova-a completamente da lista de janelas abertas
    setOpenWindows((prev) => prev.filter((window) => window.id !== id));
  };

  const minimizeWindow = (id: string) => {
    setOpenWindows((prev) =>
      prev.map((window) =>
        window.id === id ? { ...window, isMinimized: true } : window
      )
    );
  };

  const restoreWindow = (id: string) => {
    setOpenWindows((prev) =>
      prev.map((window) =>
        window.id === id ? { ...window, isMinimized: false } : window
      )
    );
  };

  const handleLoadingComplete = () => {
    setLoading(false);

    // Mostrar o desktop com uma pequena pausa para a animação
    setTimeout(() => {
      setShowDesktop(true);

      // Abrir automaticamente a janela About Me após um pequeno delay
      setTimeout(() => {
        openAboutWindow();
      }, 800);
    }, 300);
  };

  // Verificar se a janela About está aberta e não minimizada
  const isAboutWindowVisible = openWindows.some(
    (w) => w.id === "about" && !w.isMinimized
  );

  // Verificar se a janela Projects está aberta e não minimizada
  const isProjectsWindowVisible = openWindows.some(
    (w) => w.id === "projects" && !w.isMinimized
  );

  // Verificar se a janela Contact está aberta e não minimizada
  const isContactWindowVisible = openWindows.some(
    (w) => w.id === "contact" && !w.isMinimized
  );

  // Verificar se a janela Skills está aberta e não minimizada
  const isSkillsWindowVisible = openWindows.some(
    (w) => w.id === "skills" && !w.isMinimized
  );

  // Verificar se a janela Portfolio está aberta e não minimizada
  const isPortfolioWindowVisible = openWindows.some(
    (w) => w.id === "portfolio" && !w.isMinimized
  );

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
      <Desktop
        showAboutWindow={isAboutWindowVisible}
        setShowAboutWindow={(show) => {
          if (!show) {
            // Se estamos fechando a janela
            const aboutWindow = openWindows.find((w) => w.id === "about");
            if (aboutWindow) {
              // Se a janela existe, minimizar em vez de fechar
              minimizeWindow("about");
            }
          } else {
            // Se estamos abrindo a janela
            openAboutWindow();
          }
        }}
        showProjectsWindow={isProjectsWindowVisible}
        setShowProjectsWindow={(show) => {
          if (!show) {
            // Se estamos fechando a janela
            const projectsWindow = openWindows.find((w) => w.id === "projects");
            if (projectsWindow) {
              // Se a janela existe, minimizar em vez de fechar
              minimizeWindow("projects");
            }
          } else {
            // Se estamos abrindo a janela
            openProjectsWindow();
          }
        }}
        showContactWindow={isContactWindowVisible}
        setShowContactWindow={(show) => {
          if (!show) {
            const contactWindow = openWindows.find((w) => w.id === "contact");
            if (contactWindow) {
              minimizeWindow("contact");
            }
          } else {
            openContactWindow();
          }
        }}
        showSkillsWindow={isSkillsWindowVisible}
        setShowSkillsWindow={(show) => {
          if (!show) {
            const skillsWindow = openWindows.find((w) => w.id === "skills");
            if (skillsWindow) {
              minimizeWindow("skills");
            }
          } else {
            openSkillsWindow();
          }
        }}
        showPortfolioWindow={isPortfolioWindowVisible}
        setShowPortfolioWindow={(show) => {
          if (!show) {
            const portfolioWindow = openWindows.find(
              (w) => w.id === "portfolio"
            );
            if (portfolioWindow) {
              minimizeWindow("portfolio");
            }
          } else {
            openPortfolioWindow();
          }
        }}
      />

      {/* Janela de Projetos */}
      {isProjectsWindowVisible && (
        <ProjectsWindow
          onClose={() => closeWindow("projects")}
          onMinimize={() => minimizeWindow("projects")}
          isMinimized={false}
        />
      )}

      <Taskbar
        onAboutClick={openAboutWindow}
        onProjectsClick={openProjectsWindow}
        onContactClick={openContactWindow}
        onSkillsClick={openSkillsWindow}
        onPortfolioClick={openPortfolioWindow}
        openWindows={openWindows}
        onWindowRestore={(id) => {
          restoreWindow(id);
        }}
      />

      <style jsx>{`
        .desktop-container {
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
