"use client";

import { useState, useEffect, ReactNode } from "react";

interface Win98WindowProps {
  title: string;
  children: ReactNode;
  initialPosition?: { x: number; y: number };
  initialSize?: { width: number; height: number };
  onClose?: () => void;
  onMinimize?: () => void;
  isMinimized?: boolean;
  id: string;
}

export default function Win98Window({
  title,
  children,
  initialPosition = { x: 50, y: 50 },
  initialSize = { width: 400, height: 300 },
  onClose,
  onMinimize,
  isMinimized = false,
  id,
}: Win98WindowProps) {
  const [position, setPosition] = useState(initialPosition);
  const [size, setSize] = useState(initialSize);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isMaximized, setIsMaximized] = useState(false);
  const [preMaximizeState, setPreMaximizeState] = useState({
    position: initialPosition,
    size: initialSize,
  });
  const [isClosing, setIsClosing] = useState(false);
  const [isOpening, setIsOpening] = useState(true);
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

  // Efeito para animação de abertura
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpening(false);
    }, 300);
    return () => clearTimeout(timer);
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

    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  // Também lidar com eventos de toque para iOS
  const handleTouchStart = (e: React.TouchEvent) => {
    if (isMaximized || isMobile()) return;

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
  };

  // Também lidar com eventos de toque para iOS
  const handleTouchEnd = () => {
    setIsDragging(false);
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

    // Comportamento normal para desktop
    if (!isMaximized) {
      setPreMaximizeState({
        position,
        size,
      });
      setPosition({ x: 0, y: 0 });
      // Ajuste para considerar a altura da taskbar
      const taskbarHeight = windowDimensions.width <= 480 ? 30 : 40; // Responsivo para mobile
      setSize({
        width: windowDimensions.width,
        height: windowDimensions.height - taskbarHeight,
      });
      setIsMaximized(true);
    } else {
      setPosition(preMaximizeState.position);
      setSize(preMaximizeState.size);
      setIsMaximized(false);
    }
  };

  const handleMinimize = () => {
    if (onMinimize) {
      onMinimize();
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
      zIndex: isDragging ? 1000 : 10,
      display: isMinimized ? "none" : "flex",
      flexDirection: "column",
      opacity: isClosing ? 0 : 1,
      transform: isOpening ? "scale(0.95)" : "scale(1)",
      transition: isClosing || isOpening ? "all 0.2s ease-out" : "none",
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
        data-window-id={id}
      >
        <div
          className="win98-title-bar"
          onMouseDown={handleDragStart}
          onTouchStart={handleTouchStart}
        >
          <div className="title">{title}</div>
          <div className="controls">
            <button className="minimize-button" onClick={handleMinimize}>
              _
            </button>
            <button className="maximize-button" onClick={handleMaximize}>
              □
            </button>
            <button className="close-button" onClick={handleClose}>
              ×
            </button>
          </div>
        </div>
        <div
          className="win98-window-content"
          style={{ flex: 1, overflow: "auto" }}
        >
          {children}
        </div>
      </div>

      <style jsx>{`
        .window-opening {
          animation: windowOpen 0.3s ease-out;
        }

        .window-closing {
          animation: windowClose 0.3s ease-out forwards;
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
            transform: scale(0.8);
          }
        }
      `}</style>
    </>
  );
}
