"use client";

import { useState, useEffect, useRef } from "react";
import { useLocale } from "../context/Locale";

interface WebCamProps {
  onCapture?: (imageData: string) => void;
}

export default function WebCam({ onCapture }: WebCamProps) {
  const { t } = useLocale();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const filterCanvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [selectedFilter, setSelectedFilter] = useState("retro");
  const [isFilterPreviewActive, setIsFilterPreviewActive] = useState(true);
  const filterPreviewIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [isMirrored, setIsMirrored] = useState(true);
  const lastPhotoRef = useRef<string | null>(null);

  // Inicializar a webcam
  useEffect(() => {
    async function setupCamera() {
      try {
        setIsLoading(true);
        const constraints = {
          video: {
            width: { ideal: 1280 },
            height: { ideal: 720 },
            facingMode: { ideal: "user" },
            frameRate: { ideal: 30, max: 60 },
          },
          audio: false,
        };

        const mediaStream = await navigator.mediaDevices.getUserMedia(
          constraints
        );
        setStream(mediaStream);

        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          // Garantir que o vídeo seja reproduzido
          await videoRef.current.play().catch((err) => {
            console.error("Erro ao reproduzir vídeo:", err);
            throw err;
          });
          // No iOS, é necessário inline e sem som para autoplay
          videoRef.current.setAttribute("playsinline", "true");
          videoRef.current.muted = true;
          setIsRunning(true);
        }
      } catch (err) {
        console.error("Erro ao acessar a webcam:", err);
        setHasError(true);
        setErrorMessage(
          "Não foi possível acessar sua câmera. Verifique as permissões do navegador."
        );
      } finally {
        setIsLoading(false);
      }
    }

    // Não iniciar automaticamente em iOS; o botão abaixo inicia
    const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
    if (!isIOS) setupCamera();

    // Limpar o stream quando o componente for desmontado
    return () => {
      try {
        if (stream) {
          stream.getTracks().forEach((track) => track.stop());
        }
      } catch {}
      if (filterPreviewIntervalRef.current) {
        clearInterval(filterPreviewIntervalRef.current);
        filterPreviewIntervalRef.current = null;
      }
    };
  }, []);
  const startCamera = async () => {
    // Em iOS o getUserMedia deve ser acionado por gesto do usuário
    setHasError(false);
    setErrorMessage("");
    try {
      setIsLoading(true);
      const constraints = {
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: { ideal: "user" },
          frameRate: { ideal: 30, max: 60 },
        },
        audio: false,
      } as MediaStreamConstraints;
      const mediaStream = await navigator.mediaDevices.getUserMedia(
        constraints
      );
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.setAttribute("playsinline", "true");
        videoRef.current.muted = true;
        await videoRef.current.play();
        setIsRunning(true);
      }
    } catch (err) {
      console.error(err);
      setHasError(true);
      setErrorMessage(t("webcam.permissionTip"));
    } finally {
      setIsLoading(false);
    }
  };

  const stopCamera = () => {
    try {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      setStream(null);
      setIsRunning(false);
    } catch {}
  };

  // Efeito para iniciar a visualização do filtro em tempo real
  useEffect(() => {
    if (!isLoading && !hasError && !capturedImage && isFilterPreviewActive) {
      startFilterPreview();
    } else if (filterPreviewIntervalRef.current) {
      clearInterval(filterPreviewIntervalRef.current);
      filterPreviewIntervalRef.current = null;
    }

    return () => {
      if (filterPreviewIntervalRef.current) {
        clearInterval(filterPreviewIntervalRef.current);
        filterPreviewIntervalRef.current = null;
      }
    };
  }, [
    isLoading,
    hasError,
    capturedImage,
    selectedFilter,
    isFilterPreviewActive,
  ]);

  // Função para iniciar a visualização do filtro em tempo real
  const startFilterPreview = () => {
    if (filterPreviewIntervalRef.current) {
      clearInterval(filterPreviewIntervalRef.current);
    }

    filterPreviewIntervalRef.current = setInterval(() => {
      if (!videoRef.current || !filterCanvasRef.current || !stream) return;

      const video = videoRef.current;
      const canvas = filterCanvasRef.current;
      const ctx = canvas.getContext("2d");

      if (!ctx) return;

      // Ajustar o tamanho do canvas para corresponder ao vídeo
      if (video.videoWidth && video.videoHeight) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        // Desenhar o frame atual do vídeo no canvas (opção espelhada)
        if (isMirrored) {
          ctx.save();
          ctx.scale(-1, 1);
          ctx.drawImage(video, -canvas.width, 0, canvas.width, canvas.height);
          ctx.restore();
        } else {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        }

        // Aplicar o filtro selecionado
        if (selectedFilter !== "none") {
          applyFilter(ctx, canvas.width, canvas.height);
        }
      }
    }, 33); // ~30 FPS
  };

  // Função para aplicar filtros à imagem
  const applyFilter = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => {
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;

    switch (selectedFilter) {
      case "retro":
        // Filtro retrô (estilo anos 80/90)
        for (let i = 0; i < data.length; i += 4) {
          // Aumentar contraste
          data[i] = Math.min(255, data[i] * 1.2); // R
          data[i + 1] = Math.min(255, data[i + 1] * 1.1); // G
          data[i + 2] = Math.min(255, data[i + 2] * 0.9); // B

          // Adicionar um tom sépia suave
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          data[i] = Math.min(255, r * 0.393 + g * 0.769 + b * 0.189);
          data[i + 1] = Math.min(255, r * 0.349 + g * 0.686 + b * 0.168);
          data[i + 2] = Math.min(255, r * 0.272 + g * 0.534 + b * 0.131);
        }
        break;

      case "vhs":
        // Filtro VHS (com ruído e linhas)
        for (let i = 0; i < data.length; i += 4) {
          // Adicionar ruído aleatório
          const noise = Math.random() * 20 - 10;

          data[i] = Math.max(0, Math.min(255, data[i] + noise)); // R
          data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noise)); // G
          data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noise)); // B

          // Adicionar linhas horizontais (efeito VHS)
          const y = Math.floor(i / 4 / width);
          if (y % 4 === 0) {
            data[i] = Math.min(255, data[i] + 30);
            data[i + 1] = Math.min(255, data[i + 1] + 30);
            data[i + 2] = Math.min(255, data[i + 2] + 30);
          }
        }
        break;

      case "pixel":
        // Filtro pixelado (estilo 8-bit)
        const pixelSize = 8;
        for (let y = 0; y < height; y += pixelSize) {
          for (let x = 0; x < width; x += pixelSize) {
            // Obter a cor do primeiro pixel do bloco
            const i = (y * width + x) * 4;
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];

            // Aplicar a mesma cor a todo o bloco
            for (
              let blockY = 0;
              blockY < pixelSize && y + blockY < height;
              blockY++
            ) {
              for (
                let blockX = 0;
                blockX < pixelSize && x + blockX < width;
                blockX++
              ) {
                const blockI = ((y + blockY) * width + (x + blockX)) * 4;
                data[blockI] = r;
                data[blockI + 1] = g;
                data[blockI + 2] = b;
              }
            }
          }
        }
        break;

      case "crt":
        // Filtro CRT (monitor antigo)
        for (let i = 0; i < data.length; i += 4) {
          // Aumentar contraste e brilho
          data[i] = Math.min(255, data[i] * 1.2); // R
          data[i + 1] = Math.min(255, data[i + 1] * 1.2); // G
          data[i + 2] = Math.min(255, data[i + 2] * 1.2); // B

          // Adicionar linhas de scan
          const y = Math.floor(i / 4 / width);
          if (y % 2 === 0) {
            data[i] = Math.max(0, data[i] - 30);
            data[i + 1] = Math.max(0, data[i + 1] - 30);
            data[i + 2] = Math.max(0, data[i + 2] - 30);
          }

          // Adicionar efeito de aberração cromática nas bordas
          const x = (i / 4) % width;
          if (x < 20 || x > width - 20) {
            data[i] = Math.min(255, data[i] * 1.2); // Aumentar vermelho nas bordas
            data[i + 2] = Math.min(255, data[i + 2] * 0.8); // Diminuir azul nas bordas
          }
        }
        break;

      default:
        // Sem filtro
        break;
    }

    ctx.putImageData(imageData, 0, 0);
  };

  // Função para capturar uma foto
  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    // Iniciar contagem regressiva
    setCountdown(3);

    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(countdownInterval);

          // Tirar a foto quando a contagem chegar a zero
          if (prev === 1) {
            setTimeout(() => {
              if (!videoRef.current || !canvasRef.current) return;

              const video = videoRef.current;
              const canvas = canvasRef.current;
              const ctx = canvas.getContext("2d");

              if (!ctx) return;

              // Definir as dimensões do canvas para corresponder ao vídeo
              canvas.width = video.videoWidth || 640;
              canvas.height = video.videoHeight || 480;

              // Desenhar o frame do vídeo no canvas
              ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

              // Aplicar o filtro selecionado
              if (selectedFilter !== "none") {
                applyFilter(ctx, canvas.width, canvas.height);
              }

              // Obter a imagem como URL de dados
              const imageData = canvas.toDataURL("image/png");
              setCapturedImage(imageData);

              // Chamar o callback onCapture se fornecido
              if (onCapture) {
                onCapture(imageData);
              }
            }, 100);
          }

          return null;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Função para descartar a foto e voltar para a webcam
  const discardPhoto = () => {
    setCapturedImage(null);
    // Reiniciar a visualização do filtro em tempo real
    setIsFilterPreviewActive(true);
  };

  // Função para fazer download da foto
  const downloadPhoto = () => {
    if (!capturedImage) return;

    const link = document.createElement("a");
    link.href = capturedImage;
    link.download = `webcam-${selectedFilter}-${new Date().getTime()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    lastPhotoRef.current = capturedImage;
  };

  // Função para lidar com o carregamento do vídeo
  const handleVideoLoaded = () => {
    setIsLoading(false);
    setIsFilterPreviewActive(true);
  };

  // Função para alternar entre câmeras (frontal/traseira)
  const toggleCamera = async () => {
    if (!stream) return;

    // Parar a câmera atual
    stream.getTracks().forEach((track) => track.stop());

    // Determinar qual câmera usar
    const currentFacingMode = stream
      .getVideoTracks()[0]
      .getSettings().facingMode;
    const newFacingMode = currentFacingMode === "user" ? "environment" : "user";

    try {
      const newStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: newFacingMode,
          width: { ideal: 640 },
          height: { ideal: 480 },
        },
        audio: false,
      });

      setStream(newStream);

      if (videoRef.current) {
        videoRef.current.srcObject = newStream;
        await videoRef.current.play();
      }
    } catch (err) {
      console.error("Erro ao alternar câmera:", err);
      setErrorMessage("Não foi possível alternar entre as câmeras.");
      setHasError(true);
    }
  };

  return (
    <div className="webcam-container">
      <div className="webcam-header">
        <div className="filter-controls">
          <div className="filter-selector">
            <label htmlFor="filter-select"> {t("webcam.filter")}</label>
            <select
              id="filter-select"
              className="win98-select"
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              disabled={isLoading || hasError || capturedImage !== null}
            >
              <option value="retro">{t("webcam.filter.retro")}</option>
              <option value="vhs">{t("webcam.filter.vhs")}</option>
              <option value="pixel">{t("webcam.filter.pixel")}</option>
              <option value="crt">{t("webcam.filter.crt")}</option>
              <option value="none">{t("webcam.filter.none")}</option>
            </select>
          </div>
          <div className="mirror-toggle">
            <input
              id="mirror"
              type="checkbox"
              checked={isMirrored}
              onChange={(e) => setIsMirrored(e.target.checked)}
              style={{ marginRight: 6 }}
            />
            <label htmlFor="mirror">{t("webcam.mirror")}</label>
          </div>

          {!capturedImage && !isLoading && !hasError && (
            <button
              className="win98-button camera-toggle-button"
              onClick={toggleCamera}
              title={t("webcam.toggle")}
            >
              {t("webcam.toggle")}
            </button>
          )}
          {!isRunning && (
            <button
              className="win98-button camera-toggle-button"
              onClick={startCamera}
              title={t("webcam.start")}
              style={{ marginLeft: 8 }}
            >
              {t("webcam.start")}
            </button>
          )}
          {isRunning && (
            <button
              className="win98-button camera-toggle-button"
              onClick={stopCamera}
              title={t("webcam.stop")}
              style={{ marginLeft: 8 }}
            >
              {t("webcam.stop")}
            </button>
          )}
        </div>
      </div>

      <div className="webcam-content">
        {isLoading ? (
          <div className="media-loading">
            <div className="loading-icon"></div>
            <p>{t("webcam.loading")}</p>
          </div>
        ) : hasError ? (
          <div className="webcam-error">
            <p>{errorMessage}</p>
            <button
              className="win98-button"
              onClick={() => window.location.reload()}
            >
              {t("webcam.retry")}
            </button>
          </div>
        ) : capturedImage ? (
          <div className="captured-image-container">
            <img
              src={capturedImage}
              alt="Foto capturada"
              className="captured-image"
            />
            <div className="image-actions">
              <button className="win98-button" onClick={discardPhoto}>
                {t("webcam.newPhoto")}
              </button>
              <button className="win98-button" onClick={downloadPhoto}>
                {t("webcam.download")}
              </button>
            </div>
          </div>
        ) : (
          <div className="video-container">
            {/* Vídeo original (oculto) */}
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="webcam-video"
              style={{ display: "none" }}
              onLoadedMetadata={handleVideoLoaded}
              onCanPlay={handleVideoLoaded}
            />

            {/* Canvas para exibir o vídeo com filtro */}
            <canvas
              ref={filterCanvasRef}
              className={`filter-preview-canvas ${
                isMirrored ? "mirrored" : ""
              }`}
            />

            {countdown !== null && (
              <div className="countdown-overlay">
                <div className="countdown-number">{countdown}</div>
              </div>
            )}

            <button
              className="win98-button capture-button"
              onClick={capturePhoto}
              disabled={isLoading || hasError}
            >
              📸 {t("webcam.takePhoto")}
            </button>
            {lastPhotoRef.current && (
              <div
                className="thumbnail"
                title={t("webcam.lastPhoto") as string}
              >
                <img src={lastPhotoRef.current} alt={t("webcam.lastPhoto")} />
                <a
                  href={lastPhotoRef.current}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="thumb-open"
                >
                  {t("webcam.open")}
                </a>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="webcam-footer">
        <div className="webcam-status">
          {!isLoading && !hasError && !capturedImage
            ? t("webcam.ready").replace(
                "{filter}",
                selectedFilter === "none"
                  ? t("webcam.filter.disabled")
                  : selectedFilter
              )
            : capturedImage
            ? t("webcam.captured").replace(
                "{filter}",
                selectedFilter === "none"
                  ? t("webcam.filter.disabled")
                  : selectedFilter
              )
            : ""}
        </div>
      </div>

      {/* Canvas oculto para processamento de imagem */}
      <canvas
        ref={canvasRef}
        style={{ display: "none" }}
        width="640"
        height="480"
      />

      <style jsx>{`
        .webcam-container {
          display: flex;
          flex-direction: column;
          height: 100%;
          font-family: "MS Sans Serif", Arial, sans-serif;
        }

        .webcam-header {
          background-color: #c0c0c0;
          padding: 10px;
          border-bottom: 1px solid #808080;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .webcam-title {
          font-weight: bold;
          font-size: 1rem;
          color: #000080;
        }

        .filter-controls {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .filter-selector {
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .camera-toggle-button {
          font-size: 10px;
          width: 90px;
          height: 30px;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .webcam-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background-color: #000;
          position: relative;
          overflow: hidden;
        }

        .video-container {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          position: relative;
        }

        .filter-preview-canvas {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }
        .filter-preview-canvas.mirrored {
          transform: scaleX(1);
        }

        .capture-button {
          position: absolute;
          bottom: 20px;
          padding: 8px 16px;
          font-size: 16px;
          z-index: 10;
        }

        .thumbnail {
          position: absolute;
          right: 10px;
          bottom: 10px;
          width: 84px;
          height: 64px;
          border: 2px solid #000;
          background: #c0c0c0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 2px;
          z-index: 11;
        }
        .thumbnail img {
          max-width: 100%;
          max-height: 44px;
          object-fit: cover;
        }
        .thumb-open {
          font-size: 10px;
          text-decoration: underline;
        }

        .countdown-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 5;
        }

        .countdown-number {
          font-size: 5rem;
          color: white;
          font-weight: bold;
          animation: pulse 1s infinite;
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.8;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .captured-image-container {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background-color: #000;
        }

        .captured-image {
          max-width: 100%;
          max-height: calc(100% - 60px);
          object-fit: contain;
        }

        .image-actions {
          margin-top: 15px;
          display: flex;
          gap: 15px;
        }

        .webcam-footer {
          background-color: #c0c0c0;
          padding: 8px;
          border-top: 1px solid #808080;
        }

        .webcam-status {
          font-size: 0.8rem;
          text-align: center;
        }

        @media (max-width: 768px) {
          .webcam-header {
            flex-direction: column;
            gap: 10px;
            align-items: flex-start;
          }

          .filter-controls {
            width: 100%;
            justify-content: space-between;
          }

          .capture-button {
            bottom: 10px;
            padding: 6px 12px;
            font-size: 14px;
          }
        }
      `}</style>
    </div>
  );
}
