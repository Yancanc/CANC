"use client";

import { useState, useEffect, useRef } from "react";

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
  // Tamanho do grid e da célula
  const GRID_SIZE = 20;
  const CELL_SIZE = 15;
  const GAME_SPEED = 150; // ms - velocidade inicial mais lenta para facilitar

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
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);

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
      // Limpar o intervalo quando o componente for desmontado
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
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

    // Iniciar o loop do jogo
    if (gameLoopRef.current) {
      clearInterval(gameLoopRef.current);
    }

    gameLoopRef.current = setInterval(() => {
      updateGame();
    }, GAME_SPEED);
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
    if (gameLoopRef.current) {
      clearInterval(gameLoopRef.current);
      gameLoopRef.current = null;
    }
  };

  // Função para desenhar o jogo no canvas
  const drawGame = (cellSize = CELL_SIZE) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Limpar o canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Desenhar o fundo do grid
    ctx.fillStyle = "#9bbc0f"; // Cor do GameBoy
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Desenhar a grade
    ctx.strokeStyle = "#0f380f"; // Cor escura do GameBoy
    ctx.lineWidth = 0.5;

    for (let i = 0; i <= GRID_SIZE; i++) {
      // Linhas verticais
      ctx.beginPath();
      ctx.moveTo(i * cellSize, 0);
      ctx.lineTo(i * cellSize, GRID_SIZE * cellSize);
      ctx.stroke();

      // Linhas horizontais
      ctx.beginPath();
      ctx.moveTo(0, i * cellSize);
      ctx.lineTo(GRID_SIZE * cellSize, i * cellSize);
      ctx.stroke();
    }

    // Desenhar a comida
    ctx.fillStyle = "#306230"; // Verde escuro do GameBoy
    ctx.fillRect(food.x * cellSize, food.y * cellSize, cellSize, cellSize);

    // Desenhar a cobra
    snake.forEach((segment, index) => {
      // Cabeça da cobra em uma cor diferente
      if (index === 0) {
        ctx.fillStyle = "#0f380f"; // Verde muito escuro do GameBoy
      } else {
        ctx.fillStyle = "#306230"; // Verde escuro do GameBoy
      }

      ctx.fillRect(
        segment.x * cellSize,
        segment.y * cellSize,
        cellSize,
        cellSize
      );

      // Adicionar borda aos segmentos da cobra
      ctx.strokeStyle = "#8bac0f"; // Verde claro do GameBoy
      ctx.lineWidth = 1;
      ctx.strokeRect(
        segment.x * cellSize,
        segment.y * cellSize,
        cellSize,
        cellSize
      );
    });

    // Desenhar mensagem de game over
    if (isGameOver) {
      ctx.fillStyle = "rgba(15, 56, 15, 0.7)"; // Verde escuro semi-transparente
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#9bbc0f"; // Verde claro do GameBoy
      ctx.font = '20px "Press Start 2P", "MS Sans Serif", Arial';
      ctx.textAlign = "center";
      ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2 - 20);
      ctx.font = '14px "Press Start 2P", "MS Sans Serif", Arial';
      ctx.fillText(
        `Comprimento: ${snakeLength}`,
        canvas.width / 2,
        canvas.height / 2 + 10
      );
      ctx.fillText(
        "Pressione ESPAÇO para reiniciar",
        canvas.width / 2,
        canvas.height / 2 + 40
      );
    }

    // Desenhar mensagem de pausa
    if (isPaused && !isGameOver) {
      ctx.fillStyle = "rgba(15, 56, 15, 0.7)"; // Verde escuro semi-transparente
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#9bbc0f"; // Verde claro do GameBoy
      ctx.font = '20px "Press Start 2P", "MS Sans Serif", Arial';
      ctx.textAlign = "center";
      ctx.fillText("PAUSADO", canvas.width / 2, canvas.height / 2);
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

      <div className={`gameboy-controls ${isMobile ? "visible" : ""}`}>
        <div className="gameboy-dpad">
          <button className="dpad-button dpad-up" onClick={handleTouchUp}>
            ▲
          </button>
          <button className="dpad-button dpad-left" onClick={handleTouchLeft}>
            ◀
          </button>
          <div className="dpad-center"></div>
          <button className="dpad-button dpad-right" onClick={handleTouchRight}>
            ▶
          </button>
          <button className="dpad-button dpad-down" onClick={handleTouchDown}>
            ▼
          </button>
        </div>

        <div className="gameboy-actions">
          {isGameOver ? (
            <button className="action-button" onClick={startGame}>
              RESTART
            </button>
          ) : (
            <button className="action-button" onClick={togglePause}>
              {isPaused ? "PLAY" : "PAUSE"}
            </button>
          )}
        </div>
      </div>

      <div className="game-instructions">
        <p className="desktop-instructions">
          Use as setas ou WASD para mover a cobra. Pressione ESPAÇO para
          pausar/continuar.
        </p>
        <p className="mobile-instructions">
          Use os controles na tela para jogar.
        </p>
        {isGameOver && (
          <p className="restart-instructions">
            {isMobile
              ? "Toque no botão RESTART para jogar novamente."
              : "Pressione ESPAÇO para reiniciar o jogo."}
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
          background-color: #9bbc0f; /* GameBoy screen color */
          border: 2px solid #808080;
          border-top-color: #000000;
          border-left-color: #000000;
          box-shadow: inset 1px 1px 0px #000000, inset -1px -1px 0px #dfdfdf;
          overflow: hidden;
          min-height: 200px;
        }

        .game-canvas {
          max-width: 100%;
          max-height: 100%;
          display: block;
        }

        /* GameBoy style controls */
        .gameboy-controls {
          display: none;
          margin: 15px auto;
          width: 100%;
          max-width: 320px;
          box-sizing: border-box;
        }

        .gameboy-controls.visible {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 15px;
        }

        .gameboy-dpad {
          position: relative;
          width: 150px;
          height: 150px;
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          grid-template-rows: 1fr 1fr 1fr;
        }

        .dpad-button {
          width: 50px;
          height: 50px;
          background-color: #2e3a59;
          color: white;
          border: none;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 20px;
          cursor: pointer;
          user-select: none;
          -webkit-tap-highlight-color: transparent;
        }

        .dpad-center {
          grid-column: 2;
          grid-row: 2;
          width: 50px;
          height: 50px;
          background-color: #2e3a59;
        }

        .dpad-up {
          grid-column: 2;
          grid-row: 1;
          border-radius: 8px 8px 0 0;
        }

        .dpad-left {
          grid-column: 1;
          grid-row: 2;
          border-radius: 8px 0 0 8px;
        }

        .dpad-right {
          grid-column: 3;
          grid-row: 2;
          border-radius: 0 8px 8px 0;
        }

        .dpad-down {
          grid-column: 2;
          grid-row: 3;
          border-radius: 0 0 8px 8px;
        }

        .dpad-button:active {
          background-color: #1e2a49;
          transform: scale(0.95);
        }

        .gameboy-actions {
          display: flex;
          justify-content: center;
          gap: 20px;
        }

        .action-button {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background-color: #a52a2a;
          color: white;
          border: none;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
          box-shadow: 0 4px 0 #8b0000;
          -webkit-tap-highlight-color: transparent;
        }

        .action-button:active {
          transform: translateY(4px);
          box-shadow: 0 0 0 #8b0000;
        }

        .touch-controls {
          display: none;
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

        .restart-button {
          margin-top: 10px;
          padding: 8px 16px;
          font-size: 14px;
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
        }
      `}</style>
    </div>
  );
}
