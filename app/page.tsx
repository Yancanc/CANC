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
