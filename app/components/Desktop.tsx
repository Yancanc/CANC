"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import { gsap } from "gsap";
import DesktopIcon from "./DesktopIcon";
import Image from "next/image";
import Win98Window from "./Win98Window";
import AboutWindow from "./AboutWindow";
import ContactWindow from "./ContactWindow";
import PortfolioWindow from "./PortfolioWindow";
import ProjectsWindow from "./ProjectsWindow";
import SkillsWindow from "./SkillsWindow";
import ExperienceWindow from "./ExperienceWindow";
import CVWindow from "./CVWindow";
import TutorialPopup from "./TutorialPopup";
import Taskbar from "./Taskbar";
import dynamic from "next/dynamic";
const WebCam = dynamic(() => import("./WebCam"), { ssr: false });
const SnakeGame = dynamic(() => import("./SnakeGame"), { ssr: false });
const ScreenSaver = dynamic(() => import("./ScreenSaver"), { ssr: false });
// MediaPlayer removido
import { useWindowManager } from "../context/WindowManager";
import { useLocale } from "../context/Locale";

export default function Desktop() {
  const gridRef = useRef<HTMLDivElement>(null);
  const {
    windows: wmWindows,
    focusedWindowId,
    openWindow,
    closeWindow,
    minimizeWindow,
    restoreWindow,
    toggleMinimize,
    focusWindow,
    isMobile: ctxIsMobile,
  } = useWindowManager();
  const { t } = useLocale();
  const [windowDimensions, setWindowDimensions] = useState({
    width: 1024,
    height: 768,
  });
  const [minimizedWindows, setMinimizedWindows] = useState<string[]>([]); // apenas extras (webcam/snake)
  const [showWebCam, setShowWebCam] = useState(false);
  const [showSnakeGame, setShowSnakeGame] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [isScreenSaver, setIsScreenSaver] = useState(false);
  const screenSaverTimeoutRef = useRef<number | null>(null);

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

  // Screensaver: ativa após 60s de inatividade
  useEffect(() => {
    const schedule = () => {
      if (screenSaverTimeoutRef.current)
        window.clearTimeout(screenSaverTimeoutRef.current);
      screenSaverTimeoutRef.current = window.setTimeout(
        () => setIsScreenSaver(true),
        60000
      );
    };
    const reset = () => {
      if (isScreenSaver) return; // quando ativo, ignore; ele sai com primeiro input
      schedule();
    };
    schedule();
    window.addEventListener("mousemove", reset);
    window.addEventListener("keydown", reset);
    window.addEventListener("mousedown", reset);
    window.addEventListener("touchstart", reset);
    return () => {
      if (screenSaverTimeoutRef.current)
        window.clearTimeout(screenSaverTimeoutRef.current);
      window.removeEventListener("mousemove", reset);
      window.removeEventListener("keydown", reset);
      window.removeEventListener("mousedown", reset);
      window.removeEventListener("touchstart", reset);
    };
  }, [isScreenSaver]);

  useEffect(() => {
    if (!gridRef.current) return;
    const icons = gridRef.current.querySelectorAll(".desktop-icon");
    gsap.fromTo(
      icons,
      { autoAlpha: 0, y: 6, scale: 0.98 },
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.2,
        ease: "power2.out",
        stagger: 0.02,
      }
    );
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.altKey && e.key === "Tab") {
        e.preventDefault();
        const visible = wmWindows.filter((w) => !w.isMinimized);
        if (visible.length === 0) return;
        const currentIdx = visible.findIndex((w) => w.id === focusedWindowId);
        const nextIdx = e.shiftKey
          ? (currentIdx - 1 + visible.length) % visible.length
          : (currentIdx + 1) % visible.length;
        const next = visible[nextIdx] || visible[0];
        focusWindow(next.id);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [wmWindows, focusedWindowId, focusWindow]);

  // Verificar se deve mostrar o tutorial ou não
  useEffect(() => {
    // Pequeno atraso para garantir que o localStorage esteja disponível
    const timer = setTimeout(() => {
      const dontShowTutorial = localStorage.getItem("dontShowTutorial");
      if (dontShowTutorial !== "true") {
        setShowTutorial(true);
      }
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // Abrir About Me automaticamente ao montar o componente
  useEffect(() => {
    // Pequeno atraso para garantir que o componente esteja completamente montado
    const timer = setTimeout(() => {
      handleOpenWindow("about");
    }, 500);

    return () => clearTimeout(timer);
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
      projects: { x: 300, y: 150 },
      webcam: { x: 350, y: 150 },
      "snake-game": { x: 400, y: 200 },
      experience: { x: 175, y: 125 },
      cv: { x: 220, y: 140 },
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
      projects: { width: defaultWidth, height: defaultHeight },
      webcam: { width: 500, height: 450 },
      "snake-game": { width: 450, height: 500 },
      experience: { width: defaultWidth, height: defaultHeight },
      cv: { width: defaultWidth, height: defaultHeight },
    };

    return sizes[windowName] || { width: defaultWidth, height: defaultHeight };
  };

  // Verificar se estamos em um dispositivo móvel (UI sizing)
  const isMobile = () => windowDimensions.width < 768;

  // Função para limitar o número de janelas abertas em dispositivos móveis
  const handleOpenWindow = (windowName: string) => {
    // Não permitir abrir o Snake Game em dispositivos móveis
    if (windowName === "snake-game" && isMobile()) {
      return;
    }
    // Extras: fechar componentes não relacionados em mobile
    if (isMobile()) {
      if (windowName !== "webcam" && showWebCam) setShowWebCam(false);
      if (showSnakeGame) setShowSnakeGame(false);
    }
    openWindow(windowName);
  };

  const handleCloseWindow = (windowName: string) => closeWindow(windowName);

  const handleMinimizeWindow = (windowName: string) =>
    minimizeWindow(windowName);

  const handleRestoreWindow = (windowName: string) => restoreWindow(windowName);

  const toggleWebCam = () => setShowWebCam(!showWebCam);

  // Modificar a função toggleSnakeGame para verificar se é mobile
  const toggleSnakeGame = () => {
    // Se for mobile, não faz nada
    if (isMobile()) {
      return;
    }
    setShowSnakeGame(!showSnakeGame);
  };

  // Sem sincronização com provider aqui; Taskbar usará lista combinada

  // Sem espelhamento de minimização para provider

  // Adicionar um efeito para fechar o Snake Game em dispositivos móveis
  useEffect(() => {
    if (isMobile() && showSnakeGame) {
      setShowSnakeGame(false);
    }
  }, [windowDimensions]);

  useEffect(() => {
    if (!gridRef.current) return;
    const icons = gridRef.current.querySelectorAll(".desktop-icon");
    gsap.fromTo(
      icons,
      { autoAlpha: 0, y: 6, scale: 0.98 },
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.2,
        ease: "power2.out",
        stagger: 0.02,
      }
    );
  }, []);

  return (
    <div className="desktop">
      <div className="win98-desktop">
        <div className="desktop-icons-container" ref={gridRef}>
          <DesktopIcon
            name={t("menu.about")}
            svgIcon={
              <Image
                src="https://win98icons.alexmeub.com/icons/png/computer-4.png"
                alt="Currículo"
                width={40}
                height={40}
                priority
              />
            }
            onClick={() => handleOpenWindow("about")}
          />
          <DesktopIcon
            name={t("menu.projects")}
            svgIcon={
              <Image
                src="https://win98icons.alexmeub.com/icons/png/directory_network_conn-5.png"
                alt="Projetos"
                width={40}
                height={40}
                priority
              />
            }
            onClick={() => handleOpenWindow("projects")}
          />
          <DesktopIcon
            name={t("menu.skills")}
            svgIcon={
              <Image
                src="https://win98icons.alexmeub.com/icons/png/help_book_cool-4.png"
                alt="Habilidades"
                width={40}
                height={40}
                priority
              />
            }
            onClick={() => handleOpenWindow("skills")}
          />
          <DesktopIcon
            name={t("menu.portfolio")}
            svgIcon={
              <Image
                src="https://win98icons.alexmeub.com/icons/png/msn_cool-3.png"
                alt="Portfólio"
                width={40}
                height={40}
                priority
              />
            }
            onClick={() => handleOpenWindow("portfolio")}
          />
          <DesktopIcon
            name={t("menu.contact")}
            svgIcon={
              <Image
                src="https://win98icons.alexmeub.com/icons/png/modem-5.png"
                alt="Contato"
                width={40}
                height={40}
                priority
              />
            }
            onClick={() => handleOpenWindow("contact")}
          />
          <DesktopIcon
            name={t("title.webcam")}
            svgIcon={
              <Image
                src="https://win98icons.alexmeub.com/icons/png/camera-0.png"
                alt="WebCam"
                width={40}
                height={40}
                priority
              />
            }
            onClick={toggleWebCam}
          />

          {/* Media Player removido */}

          {/* Mostrar o ícone do Snake Game apenas em desktop */}
          {!isMobile() && (
            <DesktopIcon
              name={t("title.snake")}
              svgIcon={
                <Image
                  src="https://win98icons.alexmeub.com/icons/png/joystick-0.png"
                  alt="Snake Game"
                  width={40}
                  height={40}
                  priority
                />
              }
              onClick={toggleSnakeGame}
            />
          )}

          <DesktopIcon
            name={t("title.experience")}
            svgIcon={
              <Image
                src="https://win98icons.alexmeub.com/icons/png/briefcase-3.png"
                alt="Experiência"
                width={40}
                height={40}
                priority
              />
            }
            onClick={() => handleOpenWindow("experience")}
          />

          <DesktopIcon
            name={t("title.cv")}
            svgIcon={
              <Image
                src="https://win98icons.alexmeub.com/icons/png/notepad_file_gear-2.png"
                alt="Currículo"
                width={40}
                height={40}
                priority
              />
            }
            onClick={() => handleOpenWindow("cv")}
          />
        </div>
      </div>
      <div
        aria-live="polite"
        role="status"
        style={{
          position: "absolute",
          width: 1,
          height: 1,
          overflow: "hidden",
          clip: "rect(0 0 0 0)",
        }}
      >
        {(() => {
          const w = wmWindows.find((w) => w.id === focusedWindowId);
          if (!w) return "";
          const keys: Record<string, string> = {
            about: "title.about",
            contact: "title.contact",
            skills: "title.skills",
            portfolio: "title.portfolio",
            projects: "title.projects",
            experience: "title.experience",
            cv: "title.cv",
          };
          const k = keys[w.id];
          return k ? t(k) : w.title;
        })()}
      </div>

      {/* Janelas */}
      {wmWindows.some((w) => w.id === "about") && (
        <Win98Window
          id="about"
          title={t("title.about")}
          onFocus={(id) => handleRestoreWindow(id)}
          onClose={() => handleCloseWindow("about")}
          onMinimize={() => handleMinimizeWindow("about")}
          isMinimized={!!wmWindows.find((w) => w.id === "about")?.isMinimized}
          initialPosition={getInitialPosition("about")}
          initialSize={getInitialSize("about")}
          zIndex={wmWindows.findIndex((w) => w.id === "about") + 10}
        >
          <AboutWindow />
        </Win98Window>
      )}

      {wmWindows.some((w) => w.id === "contact") && (
        <Win98Window
          id="contact"
          title={t("title.contact")}
          onFocus={(id) => handleRestoreWindow(id)}
          onClose={() => handleCloseWindow("contact")}
          onMinimize={() => handleMinimizeWindow("contact")}
          isMinimized={!!wmWindows.find((w) => w.id === "contact")?.isMinimized}
          initialPosition={getInitialPosition("contact")}
          initialSize={getInitialSize("contact")}
          zIndex={wmWindows.findIndex((w) => w.id === "contact") + 10}
        >
          <ContactWindow />
        </Win98Window>
      )}

      {wmWindows.some((w) => w.id === "skills") && (
        <Win98Window
          id="skills"
          title={t("title.skills")}
          onFocus={(id) => handleRestoreWindow(id)}
          onClose={() => handleCloseWindow("skills")}
          onMinimize={() => handleMinimizeWindow("skills")}
          isMinimized={!!wmWindows.find((w) => w.id === "skills")?.isMinimized}
          initialPosition={getInitialPosition("skills")}
          initialSize={getInitialSize("skills")}
          zIndex={wmWindows.findIndex((w) => w.id === "skills") + 10}
        >
          <SkillsWindow
            onClose={() => handleCloseWindow("skills")}
            onMinimize={() => handleMinimizeWindow("skills")}
            isMinimized={
              !!wmWindows.find((w) => w.id === "skills")?.isMinimized
            }
          />
        </Win98Window>
      )}

      {wmWindows.some((w) => w.id === "projects") && (
        <Win98Window
          id="projects"
          title={t("title.projects")}
          onFocus={(id) => handleRestoreWindow(id)}
          onClose={() => handleCloseWindow("projects")}
          onMinimize={() => handleMinimizeWindow("projects")}
          isMinimized={
            !!wmWindows.find((w) => w.id === "projects")?.isMinimized
          }
          initialPosition={getInitialPosition("projects")}
          initialSize={getInitialSize("projects")}
          zIndex={wmWindows.findIndex((w) => w.id === "projects") + 10}
        >
          <ProjectsWindow
            onClose={() => handleCloseWindow("projects")}
            onMinimize={() => handleMinimizeWindow("projects")}
            isMinimized={
              !!wmWindows.find((w) => w.id === "projects")?.isMinimized
            }
          />
        </Win98Window>
      )}

      {wmWindows.some((w) => w.id === "portfolio") && (
        <Win98Window
          id="portfolio"
          title={t("title.portfolio")}
          onFocus={(id) => handleRestoreWindow(id)}
          onClose={() => handleCloseWindow("portfolio")}
          onMinimize={() => handleMinimizeWindow("portfolio")}
          isMinimized={
            !!wmWindows.find((w) => w.id === "portfolio")?.isMinimized
          }
          initialPosition={getInitialPosition("portfolio")}
          initialSize={getInitialSize("portfolio")}
          zIndex={wmWindows.findIndex((w) => w.id === "portfolio") + 10}
        >
          <PortfolioWindow />
        </Win98Window>
      )}

      {showWebCam && (
        <Win98Window
          id="webcam"
          title="WebCam"
          onFocus={(id) => handleRestoreWindow(id)}
          onClose={toggleWebCam}
          onMinimize={() => handleMinimizeWindow("webcam")}
          isMinimized={minimizedWindows.includes("webcam")}
          initialPosition={getInitialPosition(2, 1)}
          initialSize={getInitialSize(500, 400)}
        >
          <WebCam />
        </Win98Window>
      )}

      {/* Mostrar a janela do Snake Game apenas em desktop */}
      {showSnakeGame && !isMobile() && (
        <Win98Window
          id="snake-game"
          title="Snake Game"
          onFocus={(id) => handleRestoreWindow(id)}
          onClose={toggleSnakeGame}
          onMinimize={() => handleMinimizeWindow("snake-game")}
          isMinimized={minimizedWindows.includes("snake-game")}
          initialPosition={getInitialPosition(3, 1)}
          initialSize={getInitialSize("snake-game")}
        >
          <SnakeGame />
        </Win98Window>
      )}

      {wmWindows.some((w) => w.id === "experience") && (
        <Win98Window
          id="experience"
          title={t("title.experience")}
          onFocus={(id) => handleRestoreWindow(id)}
          onClose={() => handleCloseWindow("experience")}
          onMinimize={() => handleMinimizeWindow("experience")}
          isMinimized={
            !!wmWindows.find((w) => w.id === "experience")?.isMinimized
          }
          initialPosition={getInitialPosition("experience")}
          initialSize={getInitialSize("experience")}
          zIndex={wmWindows.findIndex((w) => w.id === "experience") + 10}
        >
          <ExperienceWindow
            onClose={() => handleCloseWindow("experience")}
            onMinimize={() => handleMinimizeWindow("experience")}
            isMinimized={
              !!wmWindows.find((w) => w.id === "experience")?.isMinimized
            }
          />
        </Win98Window>
      )}

      {wmWindows.some((w) => w.id === "cv") && (
        <Win98Window
          id="cv"
          title={t("title.cv")}
          onFocus={(id) => handleRestoreWindow(id)}
          onClose={() => handleCloseWindow("cv")}
          onMinimize={() => handleMinimizeWindow("cv")}
          isMinimized={!!wmWindows.find((w) => w.id === "cv")?.isMinimized}
          initialPosition={getInitialPosition("cv")}
          initialSize={getInitialSize("cv")}
          zIndex={wmWindows.findIndex((w) => w.id === "cv") + 10}
        >
          <CVWindow />
        </Win98Window>
      )}

      {/* Media Player removido */}

      {/* Tutorial Popup */}
      {showTutorial && <TutorialPopup onClose={() => setShowTutorial(false)} />}

      {/** Lista combinada para a taskbar: provider + extras */}
      <Taskbar
        openWindows={useMemo(() => {
          const extras = [] as {
            id: string;
            title: string;
            isMinimized: boolean;
          }[];
          if (showWebCam) {
            extras.push({
              id: "webcam",
              title: t("title.webcam"),
              isMinimized: minimizedWindows.includes("webcam"),
            });
          }
          if (!isMobile() && showSnakeGame) {
            extras.push({
              id: "snake-game",
              title: t("title.snake"),
              isMinimized: minimizedWindows.includes("snake-game"),
            });
          }
          const mapTitle = (id: string, def: string) => {
            const keys: Record<string, string> = {
              about: "title.about",
              contact: "title.contact",
              skills: "title.skills",
              portfolio: "title.portfolio",
              projects: "title.projects",
              experience: "title.experience",
              cv: "title.cv",
            };
            const k = keys[id];
            return k ? t(k) : def;
          };
          const translated = wmWindows.map((w) => ({
            ...w,
            title: mapTitle(w.id, w.title),
          }));
          return [...translated, ...extras];
        }, [
          wmWindows,
          showWebCam,
          showSnakeGame,
          minimizedWindows,
          windowDimensions,
          t,
        ])}
        onAboutClick={() => handleOpenWindow("about")}
        onProjectsClick={() => handleOpenWindow("projects")}
        onContactClick={() => handleOpenWindow("contact")}
        onSkillsClick={() => handleOpenWindow("skills")}
        onPortfolioClick={() => handleOpenWindow("portfolio")}
        onCVClick={() => handleOpenWindow("cv")}
        onWindowRestore={(id) => {
          if (id === "webcam" || id === "snake-game") {
            if (minimizedWindows.includes(id)) {
              setMinimizedWindows(minimizedWindows.filter((n) => n !== id));
            } else {
              setMinimizedWindows([...minimizedWindows, id]);
            }
          } else {
            toggleMinimize(id);
          }
        }}
      />

      {isScreenSaver && <ScreenSaver onExit={() => setIsScreenSaver(false)} />}
    </div>
  );
}
