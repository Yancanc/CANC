"use client";

import { useState, useEffect, ReactNode, useRef } from "react";
import { gsap } from "gsap";
import { useWindowManager } from "../context/WindowManager";

interface Win98WindowProps {
  title: string;
  children: ReactNode;
  initialPosition?: { x: number; y: number };
  initialSize?: { width: number; height: number };
  onClose?: () => void;
  onMinimize?: () => void;
  onFocus?: (id: string) => void;
  isMinimized?: boolean;
  id: string;
  zIndex?: number;
}

export default function Win98Window({
  title,
  children,
  initialPosition = { x: 50, y: 50 },
  initialSize = { width: 400, height: 300 },
  onClose,
  onMinimize,
  onFocus,
  isMinimized = false,
  id,
  zIndex = 10,
}: Win98WindowProps) {
  const { setWindowBounds, getWindowBounds } = useWindowManager();
  const persisted = getWindowBounds(id);
  const [position, setPosition] = useState(
    persisted?.position || initialPosition
  );
  const [size, setSize] = useState(persisted?.size || initialSize);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isMaximized, setIsMaximized] = useState(false);
  const [preMaximizeState, setPreMaximizeState] = useState({
    position: initialPosition,
    size: initialSize,
  });
  const [isClosing, setIsClosing] = useState(false);
  const [isOpening, setIsOpening] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const minimizeBtnRef = useRef<HTMLButtonElement>(null);
  const maximizeBtnRef = useRef<HTMLButtonElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const touchStartRef = useRef<{ x: number; y: number; t: number } | null>(
    null
  );
  const [windowDimensions, setWindowDimensions] = useState({
    width: 1024,
    height: 768,
  });

  // Atualizar dimensões da janela apenas no cliente
  useEffect(() => {
    const updateDimensions = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Definir dimensões iniciais
    updateDimensions();

    // Adicionar listener para redimensionamento
    window.addEventListener("resize", updateDimensions);

    // Limpar listener
    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  // Verificar se estamos em um dispositivo móvel
  const isMobile = () => {
    return windowDimensions.width < 768;
  };

  // Verificar se estamos em um dispositivo iOS
  const isIOS = () => {
    if (typeof navigator === "undefined") return false;
    return (
      /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
    );
  };

  // Efeito para animação de abertura com GSAP
  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    gsap.fromTo(
      el,
      { autoAlpha: 0, scale: 0.9, y: -8 },
      { autoAlpha: 1, scale: 1, y: 0, duration: 0.22, ease: "power2.out" }
    );
    const t = setTimeout(() => setIsOpening(false), 240);
    return () => clearTimeout(t);
  }, []);

  // Efeito para ajustar posição e tamanho em dispositivos móveis
  useEffect(() => {
    if (isMobile()) {
      // Em dispositivos móveis, sempre maximizar a janela
      setIsMaximized(true);
      setPosition({ x: 0, y: 0 });

      // Altura ajustada para iOS e outros dispositivos
      if (isIOS()) {
        // No iOS, usamos valores absolutos em vez de vh
        setSize({
          width: windowDimensions.width,
          height:
            windowDimensions.height - (windowDimensions.width <= 480 ? 30 : 40),
        });
      } else {
        setSize({
          width: windowDimensions.width,
          height:
            windowDimensions.height - (windowDimensions.width <= 480 ? 30 : 40),
        });
      }
    }
  }, [windowDimensions]);

  const handleDragStart = (e: React.MouseEvent) => {
    // Desativar arrastar em dispositivos móveis
    if (isMaximized || isMobile()) return;

    if (onFocus) {
      onFocus(id);
    }

    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  // Também lidar com eventos de toque para iOS
  const handleTouchStart = (e: React.TouchEvent) => {
    if (isMobile()) {
      const t = e.touches[0];
      touchStartRef.current = { x: t.clientX, y: t.clientY, t: Date.now() };
      return;
    }
    if (isMaximized) return;

    if (onFocus) {
      onFocus(id);
    }

    const touch = e.touches[0];
    setIsDragging(true);
    setDragOffset({
      x: touch.clientX - position.x,
      y: touch.clientY - position.y,
    });
  };

  const handleDragMove = (e: MouseEvent) => {
    if (isDragging && !isMobile()) {
      // Limitar a posição dentro da tela
      const newX = Math.max(
        0,
        Math.min(e.clientX - dragOffset.x, windowDimensions.width - 100)
      );
      const newY = Math.max(
        0,
        Math.min(e.clientY - dragOffset.y, windowDimensions.height - 100)
      );

      setPosition({
        x: newX,
        y: newY,
      });
    }
  };

  // Também lidar com eventos de toque para iOS
  const handleTouchMove = (e: TouchEvent) => {
    if (isDragging && !isMobile()) {
      const touch = e.touches[0];

      // Limitar a posição dentro da tela
      const newX = Math.max(
        0,
        Math.min(touch.clientX - dragOffset.x, windowDimensions.width - 100)
      );
      const newY = Math.max(
        0,
        Math.min(touch.clientY - dragOffset.y, windowDimensions.height - 100)
      );

      setPosition({
        x: newX,
        y: newY,
      });

      // Prevenir o comportamento padrão para evitar rolagem da página
      e.preventDefault();
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    // Persistir posição após arraste
    try {
      setWindowBounds(id, { position, size });
    } catch {}
  };

  // Também lidar com eventos de toque para iOS
  const handleTouchEnd = () => {
    // Swipe down para minimizar (mobile)
    if (isMobile() && touchStartRef.current) {
      const start = touchStartRef.current;
      touchStartRef.current = null;
      const now = Date.now();
      const dt = now - start.t;
      // pegar a última posição conhecida do dedo pelo position? não temos; considerar delta por posição atual do window? simplificar: se houve start, usar event from window
      // Sem o evento final, não calculamos; manter apenas via title bar handler abaixo
    }
    setIsDragging(false);
    try {
      setWindowBounds(id, { position, size });
    } catch {}
  };

  // Adicionar e remover event listeners para eventos de toque
  useEffect(() => {
    document.addEventListener("mousemove", handleDragMove);
    document.addEventListener("mouseup", handleDragEnd);
    document.addEventListener("touchmove", handleTouchMove as EventListener, {
      passive: false,
    });
    document.addEventListener("touchend", handleTouchEnd);

    return () => {
      document.removeEventListener("mousemove", handleDragMove);
      document.removeEventListener("mouseup", handleDragEnd);
      document.removeEventListener(
        "touchmove",
        handleTouchMove as EventListener
      );
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isDragging]);

  const handleMaximize = () => {
    // Em dispositivos móveis, alternar entre tamanho normal e maximizado
    if (isMobile()) {
      if (!isMaximized) {
        // Salvar estado atual antes de maximizar
        setPreMaximizeState({
          position,
          size,
        });

        // Maximizar para ocupar toda a área disponível
        setPosition({ x: 0, y: 0 });

        // Altura ajustada para iOS e outros dispositivos
        if (isIOS()) {
          // No iOS, usamos valores absolutos em vez de vh
          setSize({
            width: windowDimensions.width,
            height:
              windowDimensions.height -
              (windowDimensions.width <= 480 ? 30 : 40),
          });
        } else {
          setSize({
            width: windowDimensions.width,
            height:
              windowDimensions.height -
              (windowDimensions.width <= 480 ? 30 : 40),
          });
        }

        setIsMaximized(true);
      } else {
        // Restaurar para o tamanho anterior
        const mobileWidth = windowDimensions.width * 0.9;

        // Altura ajustada para iOS e outros dispositivos
        let mobileHeight;
        if (isIOS()) {
          // No iOS, usamos valores absolutos em vez de vh
          mobileHeight = windowDimensions.height * 0.75; // 75% da altura da tela
        } else {
          mobileHeight =
            (windowDimensions.height -
              (windowDimensions.width <= 480 ? 40 : 50)) *
            0.85;
        }

        setPosition({
          x: (windowDimensions.width - mobileWidth) / 2,
          y:
            (windowDimensions.height -
              mobileHeight -
              (windowDimensions.width <= 480 ? 30 : 40)) /
            2,
        });

        setSize({
          width: mobileWidth,
          height: mobileHeight,
        });

        setIsMaximized(false);
      }
      return;
    }

    // Utilitário para medir a taskbar real
    const getTaskbarHeight = (): number => {
      const el = document.querySelector(".win98-taskbar") as HTMLElement | null;
      return el
        ? Math.round(el.getBoundingClientRect().height)
        : windowDimensions.width <= 480
        ? 30
        : 40;
    };

    // Comportamento normal para desktop
    if (!isMaximized) {
      // Animar até o estado maximizado
      const taskbarHeight = getTaskbarHeight();
      const targetPos = { x: 0, y: 0 };
      const borderComp = 2; // compensa borda superior quando maximizado
      const targetSize = {
        width: windowDimensions.width,
        height: windowDimensions.height - taskbarHeight - borderComp,
      };
      setPreMaximizeState({ position, size });
      const startPos = { ...position };
      const startSize = { ...size };
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      tl.to(
        {},
        {
          duration: 0.22,
          onUpdate: () => {
            const p = tl.progress();
            setPosition({
              x: startPos.x + (targetPos.x - startPos.x) * p,
              y: startPos.y + (targetPos.y - startPos.y) * p,
            });
            setSize({
              width: startSize.width + (targetSize.width - startSize.width) * p,
              height:
                startSize.height + (targetSize.height - startSize.height) * p,
            });
          },
        }
      ).to(containerRef.current, {
        scale: 1.01,
        duration: 0.06,
        yoyo: true,
        repeat: 1,
      });
      setTimeout(() => setIsMaximized(true), 230);
    } else {
      // Snap com GSAP
      const targetPos = preMaximizeState.position;
      const targetSize = preMaximizeState.size;
      const startPos = { ...position };
      const startSize = { ...size };
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      tl.to(
        {},
        {
          duration: 0.2,
          onUpdate: () => {
            const p = tl.progress();
            setPosition({
              x: startPos.x + (targetPos.x - startPos.x) * p,
              y: startPos.y + (targetPos.y - startPos.y) * p,
            });
            setSize({
              width: startSize.width + (targetSize.width - startSize.width) * p,
              height:
                startSize.height + (targetSize.height - startSize.height) * p,
            });
          },
        }
      ).to(containerRef.current, {
        scale: 1.01,
        duration: 0.06,
        yoyo: true,
        repeat: 1,
      });
      setTimeout(() => setIsMaximized(false), 220);
    }
  };

  const handleMinimize = () => {
    if (onMinimize) {
      // Animação robusta: fade+scale (evita cálculos de posição que podem falhar em maximizadas)
      if (containerRef.current) {
        gsap.to(containerRef.current, {
          duration: 0.16,
          scale: 0.9,
          autoAlpha: 0,
          ease: "power2.in",
          onComplete: () => onMinimize(),
        });
      } else onMinimize();
    }
  };

  // Gestos de swipe down (mobile) na title bar e conteúdo
  const onTouchStartGesture = (e: React.TouchEvent) => {
    if (!isMobile()) return;
    const t = e.touches[0];
    touchStartRef.current = { x: t.clientX, y: t.clientY, t: Date.now() };
  };
  const onTouchEndGesture = (e: React.TouchEvent) => {
    if (!isMobile() || !touchStartRef.current) return;
    const start = touchStartRef.current;
    touchStartRef.current = null;
    const t = e.changedTouches[0];
    const dy = t.clientY - start.y;
    const dx = Math.abs(t.clientX - start.x);
    const dt = Date.now() - start.t;
    if (dy > 50 && dx < 40 && dt < 500) {
      handleMinimize();
    }
  };

  // Atalhos de teclado: ESC minimizar, Alt+F4 fechar, Alt+Space foca controles
  const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.altKey && e.key.toLowerCase() === "f4") {
      e.preventDefault();
      handleClose();
      return;
    }
    if (e.key === "Escape") {
      e.preventDefault();
      handleMinimize();
      return;
    }
    if (e.altKey && e.code === "Space") {
      e.preventDefault();
      // foca a área de controles
      (
        minimizeBtnRef.current ||
        maximizeBtnRef.current ||
        closeBtnRef.current
      )?.focus();
      return;
    }
  };

  const handleClose = () => {
    setIsClosing(true);
    // Aguardar a animação terminar antes de fechar a janela
    setTimeout(() => {
      if (onClose) onClose();
    }, 300);
  };

  // Efeito para atualizar o tamanho da janela quando maximizada
  useEffect(() => {
    const handleResize = () => {
      if (isMaximized) {
        const taskbarHeight = windowDimensions.width <= 480 ? 30 : 40;
        setSize({
          width: windowDimensions.width,
          height: windowDimensions.height - taskbarHeight,
        });
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMaximized, windowDimensions]);

  // Aplicar estilos específicos para dispositivos móveis
  const getWindowStyle = () => {
    const baseStyle: React.CSSProperties = {
      position: "absolute",
      left: `${position.x}px`,
      top: `${position.y}px`,
      width: `${size.width}px`,
      height: `${size.height}px`,
      zIndex: isDragging ? zIndex + 1000 : zIndex,
      display: isMinimized ? "none" : "flex",
      flexDirection: "column",
      opacity: isClosing ? 0 : 1,
      transform: isOpening ? "scale(0.95)" : "scale(1)",
      transition:
        isClosing || isOpening
          ? "all 0.2s ease-out"
          : "transform 0.12s ease-out",
      WebkitTransform: isOpening ? "scale(0.95)" : "scale(1)", // Para iOS
      WebkitTransition: isClosing || isOpening ? "all 0.2s ease-out" : "none", // Para iOS
    };

    // Em dispositivos móveis, sempre usar tela cheia
    if (isMobile()) {
      if (isIOS()) {
        // Estilo específico para iOS
        return {
          ...baseStyle,
          position: "fixed" as "fixed", // Corrigido para o TypeScript
          left: "0",
          top: "0",
          width: "100%",
          height: `${
            windowDimensions.height - (windowDimensions.width <= 480 ? 30 : 40)
          }px`,
          transform: "translate3d(0, 0, 0)", // Força aceleração de hardware no iOS
          WebkitTransform: "translate3d(0, 0, 0)",
        } as React.CSSProperties;
      } else {
        // Estilo para outros dispositivos móveis
        return {
          ...baseStyle,
          left: "0",
          top: "0",
          width: "100%",
          height: `calc(100vh - ${windowDimensions.width <= 480 ? 30 : 40}px)`,
        };
      }
    }

    // Quando maximizado em desktop, forçar 100% do container
    if (!isMobile() && isMaximized) {
      return {
        ...baseStyle,
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
      } as React.CSSProperties;
    }

    // Ajustes específicos para iOS em desktop
    if (isIOS() && !isMobile()) {
      return {
        ...baseStyle,
        transform: isOpening ? "scale(0.95)" : "translate3d(0, 0, 0)",
        WebkitTransform: isOpening ? "scale(0.95)" : "translate3d(0, 0, 0)",
      };
    }

    return baseStyle;
  };

  if (isMinimized) {
    return null;
  }

  return (
    <>
      <div
        className={`win98-window ${isMaximized ? "maximized" : ""} ${
          isClosing ? "window-closing" : ""
        } ${isOpening ? "window-opening" : ""} ${isIOS() ? "ios-device" : ""}`}
        style={getWindowStyle()}
        ref={containerRef}
        data-window-id={id}
        role="dialog"
        aria-label={title}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onMouseDown={() => onFocus && onFocus(id)}
      >
        <div
          className="win98-title-bar"
          onMouseDown={handleDragStart}
          onTouchStart={(e) => {
            handleTouchStart(e);
            onTouchStartGesture(e);
          }}
          onTouchEnd={onTouchEndGesture}
        >
          <div className="title">{title}</div>
          <div className="controls">
            <button
              className="minimize-button"
              onClick={handleMinimize}
              aria-label="Minimizar"
              ref={minimizeBtnRef}
            >
              _
            </button>
            <button
              className="maximize-button"
              onClick={handleMaximize}
              aria-label={isMaximized ? "Restaurar" : "Maximizar"}
              aria-pressed={isMaximized}
              ref={maximizeBtnRef}
            >
              □
            </button>
            <button
              className="close-button"
              onClick={handleClose}
              aria-label="Fechar"
              ref={closeBtnRef}
            >
              ×
            </button>
          </div>
        </div>
        <div
          className="win98-window-content"
          style={{ flex: 1, overflow: "auto" }}
          onTouchStart={onTouchStartGesture}
          onTouchEnd={onTouchEndGesture}
        >
          {children}
        </div>
      </div>

      <style jsx>{`
        .window-opening {
          /* Abertura controlada por GSAP */
        }

        .window-closing {
          animation: windowClose 0.2s ease-out forwards;
        }

        @keyframes windowOpen {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
          }
        }

        @keyframes windowClose {
          0% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(0.95);
          }
          100% {
            opacity: 0;
            transform: scale(0.9);
          }
        }
      `}</style>
    </>
  );
}
