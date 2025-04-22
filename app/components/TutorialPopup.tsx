"use client";

import React, { useState } from "react";

interface TutorialPopupProps {
  onClose: () => void;
}

const TutorialPopup: React.FC<TutorialPopupProps> = ({ onClose }) => {
  return (
    <div className="tutorial-popup-overlay">
      <div className="tutorial-popup">
        <div className="win98-title-bar">
          <div className="title">Bem-vindo ao Yandows 98</div>
          <div className="controls">
            <button onClick={onClose} className="close-btn" aria-label="Close">
              ×
            </button>
          </div>
        </div>
        <div className="tutorial-popup-content">
          <div className="tutorial-icon">
            <img
              src="https://win98icons.alexmeub.com/icons/png/help_book_cool-0.png"
              alt="Tutorial"
              width="32"
              height="32"
            />
          </div>
          <div className="tutorial-message">
            <h3>Dicas de Navegação</h3>
            <ul>
              <li>
                <b>Abrir programas:</b> Clique nos ícones da área de trabalho ou
                na barra de tarefas.
              </li>
              <li>
                <b>Fechar janelas:</b> Clique no botão{" "}
                <span className="fake-close-btn">×</span> no canto superior
                direito de cada janela.
              </li>
              <li>
                <b>Minimizar janelas:</b> Clique no botão{" "}
                <span className="fake-minimize-btn">_</span> para minimizar para
                a barra de tarefas.
              </li>
              <li>
                <b>Restaurar janelas:</b> Clique no ícone da janela na barra de
                tarefas para restaurá-la.
              </li>
              <li>
                <b>Mover janelas:</b> Clique e arraste a barra de título da
                janela.
              </li>
            </ul>
            <p className="tutorial-note">
              Explore meu portfólio clicando nos diferentes ícones da área de
              trabalho!
            </p>
          </div>
        </div>
        <div className="tutorial-popup-footer">
          <label className="dont-show-again">
            <input
              type="checkbox"
              onChange={(e) => {
                if (e.target.checked) {
                  localStorage.setItem("dontShowTutorial", "true");
                } else {
                  localStorage.removeItem("dontShowTutorial");
                }
              }}
            />
            <span>Não mostrar novamente</span>
          </label>
          <button className="win98-button" onClick={onClose}>
            Entendi
          </button>
        </div>
      </div>
    </div>
  );
};

export default TutorialPopup;
