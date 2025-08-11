"use client";

import { useState, useEffect } from "react";
import { useLocale } from "../context/Locale";

interface Win98LoadingProps {
  onLoadingComplete?: () => void;
  loadingTime?: number;
}

export default function Win98Loading({
  onLoadingComplete,
  loadingTime = 3000,
}: Win98LoadingProps) {
  const { lang } = useLocale();
  const [loadingText, setLoadingText] = useState("Iniciando o Yandows...");
  const [loadingStep, setLoadingStep] = useState(0);

  const loadingMessages =
    lang === "en"
      ? [
          "Starting Yandows...",
          "Loading settings...",
          "Preparing desktop...",
          "Loading system components...",
          "Welcome to Yandows",
        ]
      : [
          "Iniciando o Yandows...",
          "Carregando configurações...",
          "Preparando área de trabalho...",
          "Carregando componentes do sistema...",
          "Bem-vindo ao Yandows",
        ];

  useEffect(() => {
    // Simular diferentes etapas de carregamento
    const interval = setInterval(() => {
      setLoadingStep((prev) => {
        const nextStep = prev + 1;
        if (nextStep < loadingMessages.length) {
          setLoadingText(loadingMessages[nextStep]);
          return nextStep;
        }
        clearInterval(interval);
        return prev;
      });
    }, loadingTime / loadingMessages.length);

    // Chamar o callback quando o carregamento estiver completo
    const timer = setTimeout(() => {
      if (onLoadingComplete) {
        onLoadingComplete();
      }
    }, loadingTime);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [loadingTime, onLoadingComplete]);

  return (
    <div className="xp-loading-screen">
      <div className="xp-loading-logo">
        <div className="logo-image"></div>
        <div className="logo-text">
          Yandows 98
          <span>Microloft®</span>
        </div>
      </div>

      <div className="xp-loading-bar-container">
        <div className="xp-loading-bar"></div>
      </div>

      <div className="xp-loading-text">
        <p>{loadingText}</p>
      </div>

      <div className="xp-loading-footer">
        Copyright © Microloft Corporation. Todos os direitos reservados.
      </div>
    </div>
  );
}
