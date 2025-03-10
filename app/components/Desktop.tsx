"use client";

import { useState, useEffect } from "react";
import DesktopIcon from "./DesktopIcon";
import Win98Window from "./Win98Window";
import AboutWindow from "./AboutWindow";
import ContactWindow from "./ContactWindow";
import PortfolioWindow from "./PortfolioWindow";
import ProjectsWindow from "./ProjectsWindow";
import SkillsWindow from "./SkillsWindow";
import Taskbar from "./Taskbar";
import WebCam from "./WebCam";
import SnakeGame from "./SnakeGame";

// Interface para o tipo Window usado na Taskbar
interface Window {
  id: string;
  title: string;
  isMinimized: boolean;
}

export default function Desktop() {
  const [windowDimensions, setWindowDimensions] = useState({
    width: 1024,
    height: 768,
  });
  const [openWindows, setOpenWindows] = useState<Window[]>([]);
  const [minimizedWindows, setMinimizedWindows] = useState<string[]>([]);
  const [showWebCam, setShowWebCam] = useState(false);
  const [showSnakeGame, setShowSnakeGame] = useState(false);

  useEffect(() => {
    // Update window dimensions on client side
    setWindowDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getInitialPosition = (
    windowName: string | number,
    offsetY: number = 0
  ) => {
    const isMobile = windowDimensions.width < 768;

    // Default positions for desktop
    const positions: Record<string, { x: number; y: number }> = {
      about: { x: 100, y: 50 },
      contact: { x: 150, y: 100 },
      skills: { x: 200, y: 150 },
      portfolio: { x: 250, y: 200 },
      webcam: { x: 350, y: 150 },
      "snake-game": { x: 400, y: 200 },
    };

    // Para coordenadas numéricas
    if (typeof windowName === "number") {
      const baseX = 100 + windowName * 50;
      const baseY = 50 + offsetY * 50;
      return isMobile ? { x: 10, y: 10 } : { x: baseX, y: baseY };
    }

    // For mobile, center the windows
    if (isMobile) {
      return { x: 10, y: 10 };
    }

    return positions[windowName] || { x: 50, y: 50 };
  };

  const getInitialSize = (windowName: string | number, height: number = 0) => {
    const isMobile = windowDimensions.width < 768;
    const defaultWidth = isMobile ? windowDimensions.width - 20 : 600;
    const defaultHeight = isMobile ? windowDimensions.height - 100 : 400;

    // Para dimensões numéricas
    if (typeof windowName === "number") {
      return {
        width: windowName,
        height: height || defaultHeight,
      };
    }

    // Specific sizes for different windows
    const sizes: Record<string, { width: number; height: number }> = {
      about: { width: defaultWidth, height: defaultHeight },
      contact: { width: defaultWidth, height: defaultHeight },
      skills: { width: defaultWidth, height: defaultHeight },
      portfolio: { width: defaultWidth, height: defaultHeight },
      webcam: { width: 500, height: 450 },
      "snake-game": { width: 450, height: 500 },
    };

    return sizes[windowName] || { width: defaultWidth, height: defaultHeight };
  };

  const handleOpenWindow = (windowName: string) => {
    const windowTitles: Record<string, string> = {
      about: "Sobre Mim",
      contact: "Contato",
      skills: "Habilidades",
      portfolio: "Portfólio",
    };

    if (!openWindows.some((w) => w.id === windowName)) {
      setOpenWindows([
        ...openWindows,
        {
          id: windowName,
          title: windowTitles[windowName] || windowName,
          isMinimized: false,
        },
      ]);
    }

    // Se a janela estiver minimizada, restaurá-la
    if (minimizedWindows.includes(windowName)) {
      setMinimizedWindows(
        minimizedWindows.filter((name) => name !== windowName)
      );
    }
  };

  const handleCloseWindow = (windowName: string) => {
    setOpenWindows(openWindows.filter((window) => window.id !== windowName));
    setMinimizedWindows(minimizedWindows.filter((name) => name !== windowName));
  };

  const handleMinimizeWindow = (windowName: string) => {
    if (!minimizedWindows.includes(windowName)) {
      setMinimizedWindows([...minimizedWindows, windowName]);
    }
  };

  const handleRestoreWindow = (windowName: string) => {
    setMinimizedWindows(minimizedWindows.filter((name) => name !== windowName));
  };

  const toggleWebCam = () => setShowWebCam(!showWebCam);
  const toggleSnakeGame = () => setShowSnakeGame(!showSnakeGame);

  // Atualizar a taskbar quando os componentes extras são abertos/fechados
  useEffect(() => {
    const updateOpenWindows = () => {
      const newOpenWindows = [...openWindows];

      // Verificar e atualizar WebCam
      const webcamIndex = newOpenWindows.findIndex((w) => w.id === "webcam");
      if (showWebCam && webcamIndex === -1) {
        newOpenWindows.push({
          id: "webcam",
          title: "WebCam",
          isMinimized: minimizedWindows.includes("webcam"),
        });
      } else if (!showWebCam && webcamIndex !== -1) {
        newOpenWindows.splice(webcamIndex, 1);
      }

      // Verificar e atualizar Snake Game
      const snakeGameIndex = newOpenWindows.findIndex(
        (w) => w.id === "snake-game"
      );
      if (showSnakeGame && snakeGameIndex === -1) {
        newOpenWindows.push({
          id: "snake-game",
          title: "Snake Game",
          isMinimized: minimizedWindows.includes("snake-game"),
        });
      } else if (!showSnakeGame && snakeGameIndex !== -1) {
        newOpenWindows.splice(snakeGameIndex, 1);
      }

      // Atualizar o estado apenas se houver mudanças
      if (JSON.stringify(newOpenWindows) !== JSON.stringify(openWindows)) {
        setOpenWindows(newOpenWindows);
      }
    };

    updateOpenWindows();
  }, [showWebCam, showSnakeGame, minimizedWindows]);

  // Atualizar o estado isMinimized das janelas quando minimizedWindows mudar
  useEffect(() => {
    setOpenWindows(
      openWindows.map((window) => ({
        ...window,
        isMinimized: minimizedWindows.includes(window.id),
      }))
    );
  }, [minimizedWindows]);

  return (
    <div className="desktop">
      <div className="win98-desktop">
        <div className="desktop-icons-container">
          <DesktopIcon
            name="Currículo"
            svgIcon={
              <img
                src="/icons/computer.png"
                alt="Currículo"
                width="32"
                height="32"
              />
            }
            onClick={() => handleOpenWindow("about")}
          />
          <DesktopIcon
            name="Projetos"
            svgIcon={
              <img
                src="/icons/open-folder.png"
                alt="Projetos"
                width="32"
                height="32"
              />
            }
            onClick={() => handleOpenWindow("projects")}
          />
          <DesktopIcon
            name="Contato"
            svgIcon={
              <img
                src="/icons/phone.png"
                alt="Contato"
                width="32"
                height="32"
              />
            }
            onClick={() => handleOpenWindow("contact")}
          />
          <DesktopIcon
            name="Habilidades"
            svgIcon={
              <img
                src="/icons/search.png"
                alt="Habilidades"
                width="32"
                height="32"
              />
            }
            onClick={() => handleOpenWindow("skills")}
          />
          <DesktopIcon
            name="Portfólio"
            svgIcon={
              <img
                src="/icons/world.png"
                alt="Portfólio"
                width="32"
                height="32"
              />
            }
            onClick={() => handleOpenWindow("portfolio")}
          />
          <DesktopIcon
            name="WebCam"
            svgIcon={
              <img
                src="/icons/camera.png"
                alt="WebCam"
                width="32"
                height="32"
              />
            }
            onClick={toggleWebCam}
          />
          <DesktopIcon
            name="Snake Game"
            svgIcon={
              <img
                src="/icons/team.png"
                alt="Snake Game"
                width="32"
                height="32"
              />
            }
            onClick={toggleSnakeGame}
          />
        </div>
      </div>

      {openWindows.some((w) => w.id === "about") && (
        <Win98Window
          id="about"
          title="Sobre Mim"
          onClose={() => handleCloseWindow("about")}
          onMinimize={() => handleMinimizeWindow("about")}
          isMinimized={minimizedWindows.includes("about")}
          initialPosition={getInitialPosition("about")}
          initialSize={getInitialSize("about")}
        >
          <AboutWindow />
        </Win98Window>
      )}

      {openWindows.some((w) => w.id === "contact") && (
        <Win98Window
          id="contact"
          title="Contato"
          onClose={() => handleCloseWindow("contact")}
          onMinimize={() => handleMinimizeWindow("contact")}
          isMinimized={minimizedWindows.includes("contact")}
          initialPosition={getInitialPosition("contact")}
          initialSize={getInitialSize("contact")}
        >
          <ContactWindow />
        </Win98Window>
      )}

      {openWindows.some((w) => w.id === "skills") && (
        <Win98Window
          id="skills"
          title="Habilidades"
          onClose={() => handleCloseWindow("skills")}
          onMinimize={() => handleMinimizeWindow("skills")}
          isMinimized={minimizedWindows.includes("skills")}
          initialPosition={getInitialPosition("skills")}
          initialSize={getInitialSize("skills")}
        >
          <SkillsWindow
            onClose={() => handleCloseWindow("skills")}
            onMinimize={() => handleMinimizeWindow("skills")}
            isMinimized={minimizedWindows.includes("skills")}
          />
        </Win98Window>
      )}

      {openWindows.some((w) => w.id === "projects") && (
        <ProjectsWindow
          onClose={() => handleCloseWindow("projects")}
          onMinimize={() => handleMinimizeWindow("projects")}
          isMinimized={minimizedWindows.includes("projects")}
        />
      )}

      {openWindows.some((w) => w.id === "portfolio") && (
        <Win98Window
          id="portfolio"
          title="Portfólio"
          onClose={() => handleCloseWindow("portfolio")}
          onMinimize={() => handleMinimizeWindow("portfolio")}
          isMinimized={minimizedWindows.includes("portfolio")}
          initialPosition={getInitialPosition("portfolio")}
          initialSize={getInitialSize("portfolio")}
        >
          <PortfolioWindow />
        </Win98Window>
      )}

      {showWebCam && (
        <Win98Window
          id="webcam"
          title="WebCam"
          onClose={toggleWebCam}
          onMinimize={() => handleMinimizeWindow("webcam")}
          isMinimized={minimizedWindows.includes("webcam")}
          initialPosition={getInitialPosition(2, 1)}
          initialSize={getInitialSize(500, 400)}
        >
          <WebCam />
        </Win98Window>
      )}

      {showSnakeGame && (
        <Win98Window
          id="snake-game"
          title="Snake Game"
          onClose={toggleSnakeGame}
          onMinimize={() => handleMinimizeWindow("snake-game")}
          isMinimized={minimizedWindows.includes("snake-game")}
          initialPosition={getInitialPosition(3, 1)}
          initialSize={getInitialSize(400, 500)}
        >
          <SnakeGame />
        </Win98Window>
      )}

      <Taskbar
        openWindows={openWindows}
        onAboutClick={() => handleOpenWindow("about")}
        onProjectsClick={() => handleOpenWindow("projects")}
        onContactClick={() => handleOpenWindow("contact")}
        onSkillsClick={() => handleOpenWindow("skills")}
        onPortfolioClick={() => handleOpenWindow("portfolio")}
        onWindowRestore={handleRestoreWindow}
      />
    </div>
  );
}
