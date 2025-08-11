"use client";

import React from "react";

export default function CVWindow() {
  const pdfPath = "/Curriculum 2025 - PT.pdf";
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ marginBottom: 8, display: "flex", gap: 8 }}>
        <button
          className="win98-button"
          onClick={() => window.open(pdfPath, "_blank", "noopener,noreferrer")}
        >
          Baixar PDF
        </button>
      </div>
      <div style={{ flex: 1, border: "1px solid #808080", background: "#fff" }}>
        <iframe
          src={pdfPath}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          title="Currículo"
        />
      </div>
    </div>
  );
}
