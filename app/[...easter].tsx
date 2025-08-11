"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function EasterEgg() {
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
      <div className="win98-window" style={{ width: 460 }}>
        <div className="win98-title-bar">
          <div className="title">{t("Executar", "Run")}</div>
          <div className="controls">
            <button aria-label="close">×</button>
          </div>
        </div>
        <div className="win98-window-content">
          <p style={{ marginTop: 0 }}>
            {t(
              "Digite um comando do Yandows: about, projects, contact, skills, portfolio, experience, cv",
              "Type a Yandows command: about, projects, contact, skills, portfolio, experience, cv"
            )}
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const data = new FormData(e.currentTarget as HTMLFormElement);
              const cmd = String(data.get("cmd") || "")
                .trim()
                .toLowerCase();
              const map: Record<string, string> = {
                about: "/?w=about",
                projects: "/?w=projects",
                contact: "/?w=contact",
                skills: "/?w=skills",
                portfolio: "/?w=portfolio",
                experience: "/?w=experience",
                cv: "/?w=cv",
              };
              const url = map[cmd];
              window.location.href = url || "/";
            }}
            style={{ display: "flex", gap: 8 }}
          >
            <input
              className="win98-inset"
              style={{ flex: 1, padding: 6 }}
              name="cmd"
              placeholder={t("Ex.: about", "Ex.: about")}
            />
            <button className="win98-button" type="submit">
              {t("OK", "OK")}
            </button>
            <Link href="/" className="win98-button">
              {t("Cancelar", "Cancel")}
            </Link>
          </form>
          <p style={{ fontSize: 12, opacity: 0.8, marginTop: 10 }}>
            {t(
              "Dica: você também pode acessar /about, /projects...",
              "Tip: you can also hit /about, /projects..."
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
