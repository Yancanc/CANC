"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import "../styles/login.scss";

export default function Login() {
  const router = useRouter();
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [startTransition, setStartTransition] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const videoRef = useRef<HTMLIFrameElement>(null);
  const [showRickRoll, setShowRickRoll] = useState(false);

  // Atualizar o relógio a cada minuto
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const handleUserSelect = (user: string) => {
    setSelectedUser(user);
    setError("");
  };

  // Função para abrir o Rick Roll
  const openRickRoll = () => {
    // Mostrar o vídeo incorporado na própria página
    setShowRickRoll(true);

    // Tentar abrir em uma nova aba também (como fallback)
    try {
      const newWindow = window.open(
        "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        "_blank"
      );

      // Se o navegador bloqueou o pop-up, newWindow será null
      if (
        !newWindow ||
        newWindow.closed ||
        typeof newWindow.closed === "undefined"
      ) {
        console.log("Pop-up bloqueado, usando apenas o vídeo incorporado");
      }
    } catch (e) {
      console.error("Erro ao abrir o vídeo:", e);
    }
  };

  const handleLogin = () => {
    setError("");

    if (!selectedUser) {
      setError("Por favor, selecione um usuário");
      return;
    }

    // Easter egg: Se alguém digitar qualquer senha, abrir o Rick Roll
    if (password.length > 0) {
      openRickRoll();
      return;
    }

    // Apenas o usuário CANC pode entrar sem senha
    if (selectedUser === "admin") {
      setError("Senha incorreta");
      return;
    }

    setLoading(true);

    // Iniciar a transição
    setStartTransition(true);

    // Simular carregamento
    setTimeout(() => {
      router.push("/desktop");
    }, 2000);
  };

  // Função para lidar com o envio de senha pelo Enter
  const handlePasswordKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (password.length > 0) {
        openRickRoll();
      } else {
        handleLogin();
      }
    }
  };

  // Formatar a data no estilo do Windows 98
  const formattedDate = currentTime.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Formatar a hora no estilo do Windows 98
  const formattedTime = currentTime.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={`login-screen ${startTransition ? "fade-out" : ""}`}>
      {showRickRoll && (
        <div className="rick-roll-overlay">
          <iframe
            ref={videoRef}
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
            title="Rick Astley - Never Gonna Give You Up"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}

      <div className="login-logo">
        <h1>Yandows 98</h1>
        <p>Microloft® Yandows 98</p>
      </div>

      <div className="login-window slide-up">
        <div className="login-title-bar">
          <div className="title">Logon do Yandows</div>
          <div className="controls">
            <button aria-label="Close">×</button>
          </div>
        </div>

        <div className="login-content">
          <div className="login-header">
            <h2>Digite seu nome de usuário e senha</h2>
            <p>Conectar ao Yandows</p>
          </div>

          <div className="login-users">
            <div
              className={`user-option ${
                selectedUser === "admin" ? "selected" : ""
              }`}
              onClick={() => handleUserSelect("admin")}
            >
              <div className="user-icon admin"></div>
              <div className="user-name">Admin</div>
            </div>

            <div
              className={`user-option ${
                selectedUser === "canc" ? "selected" : ""
              }`}
              onClick={() => handleUserSelect("canc")}
            >
              <div className="user-icon guest"></div>
              <div className="user-name">CANC</div>
            </div>
          </div>

          {selectedUser === "admin" && (
            <div className="password-input">
              <label htmlFor="password">Senha:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder=""
                onKeyDown={handlePasswordKeyDown}
              />
              {error && <div className="error-message">{error}</div>}
            </div>
          )}

          <div className="login-actions">
            <button
              className="win98-button"
              onClick={() => setSelectedUser(null)}
            >
              Cancelar
            </button>

            <button
              className="win98-button"
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? "Entrando..." : "OK"}
            </button>
          </div>
        </div>
      </div>

      <div className="login-footer">
        <div>{formattedDate}</div>
        <div>{formattedTime}</div>
      </div>

      <style jsx>{`
        .fade-out {
          animation: fadeOut 2s forwards;
        }

        @keyframes fadeOut {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }

        .rick-roll-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 9999;
          background-color: #000;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </div>
  );
}
