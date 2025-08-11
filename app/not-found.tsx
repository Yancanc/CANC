"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function NotFound() {
  const [lang, setLang] = useState<"pt" | "en">("pt");

  useEffect(() => {
    try {
      const stored = (localStorage.getItem("lang") as "pt" | "en") || "pt";
      setLang(stored);
    } catch {}
  }, []);

  const t = (pt: string, en: string) => (lang === "pt" ? pt : en);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        background: "#008080",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="win98-window" style={{ width: 420 }}>
        <div className="win98-title-bar">
          <div className="title">{t("Erro", "Error")}</div>
          <div className="controls">
            <button aria-label="close">×</button>
          </div>
        </div>
        <div
          className="win98-window-content"
          style={{ display: "flex", gap: 12, alignItems: "flex-start" }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              background: "#fff",
              border: "2px solid #000",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            !
          </div>
          <div style={{ flex: 1 }}>
            <h2 style={{ marginTop: 0 }}>
              {t("Página não encontrada (404)", "Page not found (404)")}
            </h2>
            <p style={{ marginTop: 6 }}>
              {t(
                "Este programa executou uma operação ilegal e será fechado.",
                "This program has performed an illegal operation and will be closed."
              )}
            </p>
            <p style={{ fontSize: 12, opacity: 0.85 }}>
              {t(
                "Se o problema persistir, contate o administrador do sistema.",
                "If the problem persists, contact your system administrator."
              )}
            </p>
            <div
              style={{
                marginTop: 12,
                display: "flex",
                gap: 8,
                justifyContent: "flex-end",
              }}
            >
              <Link href="/" className="win98-button" prefetch>
                {t("Voltar ao Desktop", "Return to Desktop")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
