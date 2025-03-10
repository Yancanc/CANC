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

  // Efeito para animação de abertura
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpening(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const handleDragStart = (e: React.MouseEvent) => {
    if (isMaximized) return;
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleDragMove = (e: MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
      });
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleMaximize = () => {
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

  // Add event listeners for drag
  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleDragMove);
      window.addEventListener("mouseup", handleDragEnd);
    }

    return () => {
      window.removeEventListener("mousemove", handleDragMove);
      window.removeEventListener("mouseup", handleDragEnd);
    };
  }, [isDragging]);

  // Ajustar tamanho da janela quando a tela for redimensionada e a janela estiver maximizada
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
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMaximized, windowDimensions]);

  if (isMinimized) {
    return null;
  }

  return (
    <div
      className={`win98-window ${isClosing ? "window-closing" : ""} ${
        isOpening ? "window-opening" : ""
      }`}
      style={{
        position: "absolute",
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${size.width}px`,
        height: `${size.height}px`,
        zIndex: 10,
        display: "flex",
        flexDirection: "column",
      }}
      data-window-id={id}
    >
      <div className="win98-title-bar" onMouseDown={handleDragStart}>
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
    </div>
  );
}
