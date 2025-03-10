"use client";

import React, { useState, useEffect } from "react";

interface MediaPlayerWindowProps {
  onClose: () => void;
  onMinimize: () => void;
  isMinimized: boolean;
}

const MediaPlayerWindow: React.FC<MediaPlayerWindowProps> = ({
  onClose,
  onMinimize,
  isMinimized,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Playlist do Spotify com tema Windows 95 Aesthetic
  const spotifyPlaylistId = "37i9dQZF1DXb0AsvHMF4aM";

  // Simular tempo de carregamento para efeito nostálgico
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Parar a reprodução quando a janela for minimizada
  useEffect(() => {
    if (isMinimized) {
      // Lógica para pausar a reprodução se necessário
    }
  }, [isMinimized]);

  if (error) {
    return (
      <div className="media-player-container">
        <div className="media-player-header">
          <div className="player-title">Windows Media Player</div>
          <div className="player-subtitle">Erro ao carregar mídia</div>
        </div>
        <div className="media-error">
          <p>{error}</p>
          <button
            className="win98-button"
            onClick={() => {
              setError(null);
              setIsLoading(true);
              setTimeout(() => setIsLoading(false), 1500);
            }}
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="media-player-container">
        <div className="media-player-header">
          <div className="player-title">Windows Media Player</div>
          <div className="player-subtitle">Carregando mídia...</div>
        </div>
        <div className="media-loading">
          <div className="loading-icon"></div>
          <p>Carregando sua playlist...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="media-player-container">
      <div className="media-player-header">
        <div className="player-title">Windows Media Player</div>
        <div className="player-subtitle">Windows 95 Aesthetic Playlist</div>
      </div>

      <div className="spotify-container">
        <iframe
          src={`https://open.spotify.com/embed/playlist/${spotifyPlaylistId}?utm_source=generator&theme=0`}
          width="100%"
          height="100%"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        ></iframe>
      </div>

      <div className="media-player-footer">
        <div className="player-controls">
          <button className="control-button">⏮</button>
          <button className="control-button">⏯</button>
          <button className="control-button">⏭</button>
          <button className="control-button">🔄</button>
          <div className="volume-control">
            <span>Vol:</span>
            <div className="volume-slider">
              <div className="volume-level"></div>
            </div>
          </div>
        </div>
        <div className="player-status">
          Reproduzindo: Windows 95 Aesthetic Playlist
        </div>
      </div>
    </div>
  );
};

export default MediaPlayerWindow;
