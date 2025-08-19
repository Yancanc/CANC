"use client";

import React from "react";
import { useLocale } from "../context/Locale";

interface TutorialPopupProps {
  onClose: () => void;
}

const TutorialPopup: React.FC<TutorialPopupProps> = ({ onClose }) => {
  const { t } = useLocale();
  return (
    <div className="tutorial-popup-overlay">
      <div className="tutorial-popup">
        <div className="win98-title-bar">
          <div className="title">{t("tutorial.title")}</div>
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
            <h3>{t("tutorial.tips")}</h3>
            <ul>
              <li>
                <b>{t("tutorial.open")}</b> {t("tutorial.open.desc")}
              </li>
              <li>
                <b>{t("tutorial.close")}</b> {t("tutorial.close.desc")}
              </li>
              <li>
                <b>{t("tutorial.minimize")}</b> {t("tutorial.minimize.desc")}
              </li>
              <li>
                <b>{t("tutorial.restore")}</b> {t("tutorial.restore.desc")}
              </li>
              <li>
                <b>{t("tutorial.move")}</b> {t("tutorial.move.desc")}
              </li>
            </ul>
            <p className="tutorial-note">{t("tutorial.note")}</p>
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
            <span>{t("tutorial.dontShowAgain")}</span>
          </label>
          <button className="win98-button" onClick={onClose}>
            {t("tutorial.ok")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TutorialPopup;
