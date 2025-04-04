"use client";

import { useState, useEffect } from "react";
import Desktop from "./components/Desktop";
import Win98Loading from "./components/XPLoading";

// Componente de Login
function Login({ onLogin }: { onLogin: () => void }) {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [startTransition, setStartTransition] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showAdminPopup, setShowAdminPopup] = useState(false);

  // Atualizar o relógio a cada minuto
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const handleUserSelect = (user: string) => {
    if (user === "admin") {
      setShowAdminPopup(true);
      return;
    }
    setSelectedUser(user);
    setError("");
  };

  const handleLogin = () => {
    setError("");

    if (!selectedUser) {
      setError("Por favor, selecione um usuário");
      return;
    }

    if (selectedUser === "admin" && password !== "admin123") {
      setError("Senha incorreta");
      return;
    }

    setLoading(true);

    // Iniciar a transição
    setStartTransition(true);

    // Simular carregamento
    setTimeout(() => {
      onLogin();
    }, 2000);
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
      {showAdminPopup && (
        <div className="win98-popup-overlay">
          <div className="win98-popup">
            <div className="win98-popup-title-bar">
              <div className="title">Aviso</div>
              <div className="controls">
                <button
                  onClick={() => setShowAdminPopup(false)}
                  aria-label="Close"
                >
                  ×
                </button>
              </div>
            </div>
            <div className="win98-popup-content">
              <div className="win98-popup-icon">⚠️</div>
              <div className="win98-popup-message">
                Você com certeza não é o Admin!<br></br>
                Clique no CANC para continuar.
              </div>
              <div className="win98-popup-buttons">
                <button
                  className="win98-button"
                  onClick={() => setShowAdminPopup(false)}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
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
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
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

        .win98-popup-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }

        .win98-popup {
          background-color: #c0c0c0;
          border: 2px solid #000;
          box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.2);
          min-width: 300px;
          max-width: 400px;
        }

        .win98-popup-title-bar {
          background-color: #000080;
          color: white;
          padding: 2px 4px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .win98-popup-title-bar .controls button {
          background: none;
          border: none;
          color: white;
          font-size: 16px;
          cursor: pointer;
          padding: 0 4px;
        }

        .win98-popup-content {
          padding: 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }

        .win98-popup-icon {
          font-size: 32px;
        }

        .win98-popup-message {
          text-align: center;
          font-size: 14px;
        }

        .win98-popup-buttons {
          display: flex;
          justify-content: center;
          gap: 8px;
        }
      `}</style>
    </div>
  );
}

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showDesktop, setShowDesktop] = useState(false);

  // Verificar se o usuário já estava logado (para desenvolvimento)
  useEffect(() => {
    // Sempre começar com login ao recarregar a página
    setIsLoggedIn(false);
    setIsLoading(false);
    setShowDesktop(false);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setIsLoading(true);
  };

  const handleLoadingComplete = () => {
    setIsLoading(false);

    // Mostrar o desktop com uma pequena pausa para a animação
    setTimeout(() => {
      setShowDesktop(true);
    }, 300);
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  if (isLoading) {
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
      <Desktop />

      <style jsx>{`
        .desktop-container {
          width: 100%;
          height: 100vh;
          overflow: hidden;
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
