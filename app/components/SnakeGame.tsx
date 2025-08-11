"use client";

import { useState, useEffect, useRef } from "react";
import { useLocale } from "../context/Locale";

// Polyfill para o método roundRect do canvas
if (typeof window !== "undefined") {
  if (!CanvasRenderingContext2D.prototype.roundRect) {
    CanvasRenderingContext2D.prototype.roundRect = function (
      x: number,
      y: number,
      width: number,
      height: number,
      radius: number | number[]
    ) {
      if (typeof radius === "number") {
        radius = [radius, radius, radius, radius];
      } else if (radius.length === 1) {
        radius = [radius[0], radius[0], radius[0], radius[0]];
      } else if (radius.length === 2) {
        radius = [radius[0], radius[1], radius[0], radius[1]];
      } else if (radius.length === 3) {
        radius = [radius[0], radius[1], radius[2], radius[1]];
      }

      const [tl, tr, br, bl] = radius;

      this.beginPath();
      this.moveTo(x + tl, y);
      this.lineTo(x + width - tr, y);
      this.quadraticCurveTo(x + width, y, x + width, y + tr);
      this.lineTo(x + width, y + height - br);
      this.quadraticCurveTo(x + width, y + height, x + width - br, y + height);
      this.lineTo(x + bl, y + height);
      this.quadraticCurveTo(x, y + height, x, y + height - bl);
      this.lineTo(x, y + tl);
      this.quadraticCurveTo(x, y, x + tl, y);
      this.closePath();

      return this;
    };
  }
}

// Direções do jogo
enum Direction {
  UP = "UP",
  DOWN = "DOWN",
  LEFT = "LEFT",
  RIGHT = "RIGHT",
}

// Tipo para representar uma posição no grid
interface Position {
  x: number;
  y: number;
}

export default function SnakeGame() {
  const { t } = useLocale();
  // Tamanho do grid e da célula
  const GRID_SIZE = 20;
  const CELL_SIZE = 15;
  const GAME_SPEED_DESKTOP = 8; // cells per second
  const GAME_SPEED_MOBILE = 6; // cells per second (mobile)

  // Referência para o canvas
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Estado do jogo
  const [snake, setSnake] = useState<Position[]>([
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 8, y: 10 },
  ]);
  const [food, setFood] = useState<Position>({ x: 15, y: 10 });
  const [direction, setDirection] = useState<Direction>(Direction.RIGHT);
  const [nextDirection, setNextDirection] = useState<Direction>(
    Direction.RIGHT
  );
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [snakeLength, setSnakeLength] = useState(3); // Comprimento da cobra
  const [isInitialized, setIsInitialized] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Referências para manter valores atualizados em callbacks
  const snakeRef = useRef(snake);
  const foodRef = useRef(food);
  const directionRef = useRef(direction);
  const nextDirectionRef = useRef(nextDirection);
  const isPausedRef = useRef(isPaused);
  const isGameOverRef = useRef(isGameOver);
  const snakeLengthRef = useRef(snakeLength);

  // Atualizar as referências quando os estados mudarem
  useEffect(() => {
    snakeRef.current = snake;
  }, [snake]);

  useEffect(() => {
    foodRef.current = food;
  }, [food]);

  useEffect(() => {
    directionRef.current = direction;
  }, [direction]);

  useEffect(() => {
    nextDirectionRef.current = nextDirection;
  }, [nextDirection]);

  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    isGameOverRef.current = isGameOver;
  }, [isGameOver]);

  useEffect(() => {
    snakeLengthRef.current = snakeLength;
  }, [snakeLength]);

  // Detectar se é um dispositivo móvel
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Referência para o intervalo do jogo
  const rafRef = useRef<number | null>(null);
  const lastTsRef = useRef<number>(0);
  const stepAccumRef = useRef<number>(0);

  // Efeito para inicializar o canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      // Ajustar o tamanho do canvas com base no tamanho da tela
      const containerWidth = canvas.parentElement?.clientWidth || 300;
      const containerHeight = canvas.parentElement?.clientHeight || 300;

      // Calcular o tamanho da célula para que o grid caiba na tela
      const cellSize = Math.min(
        Math.floor(containerWidth / GRID_SIZE),
        Math.floor(containerHeight / GRID_SIZE)
      );

      canvas.width = GRID_SIZE * cellSize;
      canvas.height = GRID_SIZE * cellSize;

      // Desenhar o jogo inicial
      drawGame(cellSize);
      setIsInitialized(true);
    }
  }, []);

  // Efeito para inicializar o jogo
  useEffect(() => {
    if (!isInitialized) return;

    // Iniciar o jogo
    startGame();

    // Configurar os event listeners para as teclas
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [isInitialized]);

  // Efeito para desenhar o jogo sempre que o estado mudar
  useEffect(() => {
    if (isInitialized) {
      const canvas = canvasRef.current;
      if (canvas) {
        const containerWidth = canvas.parentElement?.clientWidth || 300;
        const containerHeight = canvas.parentElement?.clientHeight || 300;

        const cellSize = Math.min(
          Math.floor(containerWidth / GRID_SIZE),
          Math.floor(containerHeight / GRID_SIZE)
        );

        drawGame(cellSize);
      }
    }
  }, [snake, food, isGameOver, isPaused, isInitialized]);

  // Função para iniciar o jogo
  const startGame = () => {
    // Resetar o estado do jogo
    const initialSnake = [
      { x: 10, y: 10 },
      { x: 9, y: 10 },
      { x: 8, y: 10 },
    ];

    setSnake(initialSnake);
    snakeRef.current = initialSnake;
    setSnakeLength(3);
    snakeLengthRef.current = 3;

    // Gerar comida inicial
    generateFood();

    // Resetar direção
    setDirection(Direction.RIGHT);
    directionRef.current = Direction.RIGHT;
    setNextDirection(Direction.RIGHT);
    nextDirectionRef.current = Direction.RIGHT;

    // Resetar estado do jogo
    setIsGameOver(false);
    isGameOverRef.current = false;
    setIsPaused(false);
    isPausedRef.current = false;

    // Iniciar o loop com requestAnimationFrame
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    lastTsRef.current = 0;
    stepAccumRef.current = 0;
    const speed = isMobile ? GAME_SPEED_MOBILE : GAME_SPEED_DESKTOP; // cells/sec
    const stepMs = 1000 / speed;
    const tick = (ts: number) => {
      if (!lastTsRef.current) lastTsRef.current = ts;
      const delta = ts - lastTsRef.current;
      lastTsRef.current = ts;
      if (!isPausedRef.current && !isGameOverRef.current) {
        stepAccumRef.current += delta;
        while (stepAccumRef.current >= stepMs) {
          updateGame();
          stepAccumRef.current -= stepMs;
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  };

  // Função para pausar/despausar o jogo
  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  // Função para gerar comida em uma posição aleatória
  const generateFood = () => {
    let newFood: Position;

    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      // Verificar se a comida não está na mesma posição que a cobra
    } while (
      snakeRef.current.some(
        (segment) => segment.x === newFood.x && segment.y === newFood.y
      )
    );

    setFood(newFood);
    foodRef.current = newFood;
  };

  // Função para atualizar o estado do jogo
  const updateGame = () => {
    if (isPausedRef.current || isGameOverRef.current) return;

    // Atualizar a direção
    const currentDirection = directionRef.current;
    const newDirection = nextDirectionRef.current;
    setDirection(newDirection);
    directionRef.current = newDirection;

    // Mover a cobra
    const currentSnake = [...snakeRef.current];
    const head = { ...currentSnake[0] };

    // Calcular a nova posição da cabeça com base na direção
    switch (newDirection) {
      case Direction.UP:
        head.y -= 1;
        break;
      case Direction.DOWN:
        head.y += 1;
        break;
      case Direction.LEFT:
        head.x -= 1;
        break;
      case Direction.RIGHT:
        head.x += 1;
        break;
    }

    // Verificar colisão com as bordas
    if (
      head.x < 0 ||
      head.x >= GRID_SIZE ||
      head.y < 0 ||
      head.y >= GRID_SIZE
    ) {
      gameOver();
      return;
    }

    // Verificar colisão com o próprio corpo
    if (
      currentSnake.some(
        (segment) => segment.x === head.x && segment.y === head.y
      )
    ) {
      gameOver();
      return;
    }

    // Criar uma nova cobra com a nova cabeça
    const newSnake = [head, ...currentSnake];

    // Verificar se a cobra comeu a comida
    const currentFood = foodRef.current;
    if (head.x === currentFood.x && head.y === currentFood.y) {
      // Aumentar o comprimento da cobra
      const newLength = snakeLengthRef.current + 1;
      setSnakeLength(newLength);
      snakeLengthRef.current = newLength;

      // Gerar nova comida
      generateFood();
    } else {
      // Remover o último segmento da cobra
      newSnake.pop();
    }

    // Atualizar o estado da cobra
    setSnake(newSnake);
    snakeRef.current = newSnake;
  };

  // Função para lidar com o fim do jogo
  const gameOver = () => {
    setIsGameOver(true);
    isGameOverRef.current = true;
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  };

  // Função para desenhar o jogo
  const drawGame = (cellSize: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Limpar o canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Desenhar o fundo do jogo no estilo Windows 98
    ctx.fillStyle = "#008080"; // Cor de fundo do Windows 98
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Desenhar uma grade sutil
    ctx.strokeStyle = "#20B2AA"; // Cor mais clara para a grade
    ctx.lineWidth = 0.5;

    for (let i = 0; i <= GRID_SIZE; i++) {
      // Linhas verticais
      ctx.beginPath();
      ctx.moveTo(i * cellSize, 0);
      ctx.lineTo(i * cellSize, canvas.height);
      ctx.stroke();

      // Linhas horizontais
      ctx.beginPath();
      ctx.moveTo(0, i * cellSize);
      ctx.lineTo(canvas.width, i * cellSize);
      ctx.stroke();
    }

    // Desenhar a comida
    ctx.fillStyle = "#FF0000"; // Vermelho para a comida
    ctx.beginPath();
    ctx.arc(
      foodRef.current.x * cellSize + cellSize / 2,
      foodRef.current.y * cellSize + cellSize / 2,
      cellSize / 2 - 2,
      0,
      Math.PI * 2
    );
    ctx.fill();

    // Adicionar brilho à comida
    ctx.fillStyle = "#FFFFFF";
    ctx.beginPath();
    ctx.arc(
      foodRef.current.x * cellSize + cellSize / 3,
      foodRef.current.y * cellSize + cellSize / 3,
      cellSize / 6,
      0,
      Math.PI * 2
    );
    ctx.fill();

    // Desenhar a cobra
    snakeRef.current.forEach((segment, index) => {
      // Cabeça da cobra em azul do Windows 98
      if (index === 0) {
        ctx.fillStyle = "#000080"; // Azul Windows 98
      } else {
        // Corpo da cobra em tons de azul mais claro
        ctx.fillStyle = "#0000CD";
      }

      // Desenhar segmento com bordas arredondadas
      ctx.beginPath();
      ctx.roundRect(
        segment.x * cellSize + 1,
        segment.y * cellSize + 1,
        cellSize - 2,
        cellSize - 2,
        4 // Raio do arredondamento
      );
      ctx.fill();

      // Adicionar brilho 3D ao segmento
      ctx.fillStyle = "#FFFFFF";
      ctx.beginPath();
      ctx.moveTo(segment.x * cellSize + 2, segment.y * cellSize + 2);
      ctx.lineTo(segment.x * cellSize + cellSize - 4, segment.y * cellSize + 2);
      ctx.lineTo(segment.x * cellSize + 2, segment.y * cellSize + cellSize - 4);
      ctx.fill();
    });

    // Desenhar texto de game over
    if (isGameOverRef.current) {
      ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#FFFFFF";
      ctx.font = 'bold 20px "MS Sans Serif", Arial';
      ctx.textAlign = "center";
      ctx.fillText(
        t("snake.gameOver"),
        canvas.width / 2,
        canvas.height / 2 - 15
      );
      ctx.font = 'bold 16px "MS Sans Serif", Arial';
      ctx.fillText(
        `${t("snake.score")}: ${snakeLengthRef.current - 3}`,
        canvas.width / 2,
        canvas.height / 2 + 15
      );
    }

    // Desenhar texto de pausa
    if (isPausedRef.current) {
      ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#FFFFFF";
      ctx.font = 'bold 20px "MS Sans Serif", Arial';
      ctx.textAlign = "center";
      ctx.fillText(t("snake.paused"), canvas.width / 2, canvas.height / 2);
    }
  };

  // Função para lidar com as teclas pressionadas
  const handleKeyPress = (e: KeyboardEvent) => {
    // Reiniciar o jogo se estiver em game over
    if (isGameOverRef.current && e.code === "Space") {
      startGame();
      return;
    }

    // Pausar/despausar o jogo
    if (e.code === "Space") {
      togglePause();
      return;
    }

    // Não mudar a direção se o jogo estiver pausado ou em game over
    if (isPausedRef.current || isGameOverRef.current) return;

    // Mudar a direção com base na tecla pressionada
    switch (e.code) {
      case "ArrowUp":
      case "KeyW":
        if (directionRef.current !== Direction.DOWN) {
          setNextDirection(Direction.UP);
          nextDirectionRef.current = Direction.UP;
        }
        break;
      case "ArrowDown":
      case "KeyS":
        if (directionRef.current !== Direction.UP) {
          setNextDirection(Direction.DOWN);
          nextDirectionRef.current = Direction.DOWN;
        }
        break;
      case "ArrowLeft":
      case "KeyA":
        if (directionRef.current !== Direction.RIGHT) {
          setNextDirection(Direction.LEFT);
          nextDirectionRef.current = Direction.LEFT;
        }
        break;
      case "ArrowRight":
      case "KeyD":
        if (directionRef.current !== Direction.LEFT) {
          setNextDirection(Direction.RIGHT);
          nextDirectionRef.current = Direction.RIGHT;
        }
        break;
    }
  };

  // Funções para controles de toque (mobile)
  const handleTouchUp = () => {
    if (
      directionRef.current !== Direction.DOWN &&
      !isPausedRef.current &&
      !isGameOverRef.current
    ) {
      setNextDirection(Direction.UP);
      nextDirectionRef.current = Direction.UP;
    }
  };

  const handleTouchDown = () => {
    if (
      directionRef.current !== Direction.UP &&
      !isPausedRef.current &&
      !isGameOverRef.current
    ) {
      setNextDirection(Direction.DOWN);
      nextDirectionRef.current = Direction.DOWN;
    }
  };

  const handleTouchLeft = () => {
    if (
      directionRef.current !== Direction.RIGHT &&
      !isPausedRef.current &&
      !isGameOverRef.current
    ) {
      setNextDirection(Direction.LEFT);
      nextDirectionRef.current = Direction.LEFT;
    }
  };

  const handleTouchRight = () => {
    if (
      directionRef.current !== Direction.LEFT &&
      !isPausedRef.current &&
      !isGameOverRef.current
    ) {
      setNextDirection(Direction.RIGHT);
      nextDirectionRef.current = Direction.RIGHT;
    }
  };

  return (
    <div className="snake-game-container">
      <div className="game-header">
        <div className="snake-info">
          <div className="snake-length">
            Comprimento: <span className="length-value">{snakeLength}</span>
          </div>
        </div>

        <button
          className="win98-button game-button"
          onClick={togglePause}
          disabled={isGameOver}
        >
          {isPaused ? "▶ Continuar" : "⏸ Pausar"}
        </button>
      </div>

      <div className="game-canvas-container">
        <canvas ref={canvasRef} className="game-canvas" />
      </div>

      {/* Controles simplificados para mobile */}
      {isMobile && (
        <div className="mobile-controls">
          <div className="controls-row">
            <button
              className="control-button up-button"
              onClick={handleTouchUp}
              onTouchStart={handleTouchUp}
            >
              ▲
            </button>
          </div>
          <div className="controls-row">
            <button
              className="control-button left-button"
              onClick={handleTouchLeft}
              onTouchStart={handleTouchLeft}
            >
              ◀
            </button>
            <button
              className="control-button right-button"
              onClick={handleTouchRight}
              onTouchStart={handleTouchRight}
            >
              ▶
            </button>
          </div>
          <div className="controls-row">
            <button
              className="control-button down-button"
              onClick={handleTouchDown}
              onTouchStart={handleTouchDown}
            >
              ▼
            </button>
          </div>

          <div className="action-buttons">
            {isGameOver ? (
              <button
                className="win98-button restart-button"
                onClick={startGame}
              >
                {t("snake.restart")}
              </button>
            ) : (
              <button
                className="win98-button pause-button"
                onClick={togglePause}
              >
                {isPaused ? t("snake.resumeBtn") : t("snake.pauseBtn")}
              </button>
            )}
          </div>
        </div>
      )}

      <div className="game-instructions">
        <p className="desktop-instructions">{t("snake.desktopInstructions")}</p>
        <p className="mobile-instructions">{t("snake.mobileInstructions")}</p>
        {isGameOver && (
          <p className="restart-instructions">
            {isMobile
              ? t("snake.restart") + ": " + t("snake.mobileInstructions")
              : t("snake.desktopInstructions")}
          </p>
        )}
      </div>

      <style jsx>{`
        .snake-game-container {
          display: flex;
          flex-direction: column;
          height: 100%;
          padding: 10px;
          background-color: #c0c0c0;
          border: 2px solid #dfdfdf;
          border-bottom-color: #808080;
          border-right-color: #808080;
          box-shadow: inset 1px 1px 0px #ffffff, inset -1px -1px 0px #000000;
          overflow: hidden;
          box-sizing: border-box;
        }

        .game-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          margin-bottom: 10px;
          padding: 8px;
          background-color: #c0c0c0;
          border: 1px solid #808080;
          border-top-color: #dfdfdf;
          border-left-color: #dfdfdf;
          box-sizing: border-box;
        }

        .snake-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .snake-length {
          font-size: 14px;
          font-weight: bold;
          color: #000080;
        }

        .length-value {
          font-weight: bold;
          font-size: 14px;
        }

        .game-button {
          min-width: 90px;
          padding: 4px 8px;
          font-size: 14px;
        }

        .game-canvas-container {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 10px 0;
          background-color: #c0c0c0;
          border-width: 2px;
          border-style: solid;
          border-color: #808080 #ffffff #ffffff #808080;
          box-shadow: inset 1px 1px 0px #000000;
          overflow: hidden;
          min-height: 200px;
          padding: 8px;
        }

        .game-canvas {
          max-width: 100%;
          max-height: 100%;
          display: block;
          border-width: 2px;
          border-style: solid;
          border-color: #000000 #dfdfdf #dfdfdf #000000;
        }

        /* Controles simplificados para mobile */
        .mobile-controls {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 15px;
          width: 100%;
        }

        .controls-row {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin: 5px 0;
        }

        .control-button {
          width: 60px;
          height: 60px;
          background-color: #c0c0c0;
          color: #000000;
          font-size: 24px;
          border-width: 2px;
          border-style: solid;
          border-color: #ffffff #808080 #808080 #ffffff;
          box-shadow: 1px 1px 0px #000000;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          user-select: none;
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
        }

        .control-button:active {
          border-color: #808080 #ffffff #ffffff #808080;
          box-shadow: none;
          transform: translateY(1px);
        }

        .action-buttons {
          display: flex;
          justify-content: center;
          margin-top: 15px;
        }

        .restart-button,
        .pause-button {
          min-width: 120px;
          height: 40px;
          font-size: 14px;
          font-weight: bold;
          text-transform: uppercase;
        }

        .game-instructions {
          margin-top: 10px;
          font-family: "MS Sans Serif", Arial, sans-serif;
          font-size: 12px;
          color: #000000;
          text-align: center;
          padding: 0 5px;
          box-sizing: border-box;
        }

        .mobile-instructions {
          display: none;
        }

        @media (max-width: 768px) {
          .game-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }

          .game-button {
            display: none;
          }

          .desktop-instructions {
            display: none;
          }

          .mobile-instructions {
            display: block;
          }

          .snake-game-container {
            padding: 5px;
          }

          .game-canvas-container {
            margin: 5px 0;
          }

          .control-button {
            width: 75px;
            height: 75px;
            font-size: 30px;
          }

          .restart-button,
          .pause-button {
            min-width: 160px;
            height: 55px;
            font-size: 16px;
          }
        }
      `}</style>
    </div>
  );
}
