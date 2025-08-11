"use client";

import React from "react";
import { useLocale } from "../context/Locale";

const AboutWindow: React.FC = () => {
  const { t } = useLocale();
  return (
    <div className="about-me-content">
      <h2>{t("about.name")}</h2>
      <p className="text-blue font-bold">{t("about.role")} </p>

      <div className="section">
        <div className="section-title">{t("about.section.contact")}</div>
        <div className="contact-info">
          <p>
            <strong>{t("label.email")}</strong> yan.cancella@outlook.com
          </p>
          <p>
            <strong>{t("label.linkedin")}</strong>{" "}
            <a
              href="https://www.linkedin.com/in/yancanc/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue"
            >
              https://www.linkedin.com/in/yancanc/
            </a>
          </p>
        </div>
      </div>

      <div className="section">
        <div className="section-title">{t("about.section.summary")}</div>
        <p>{t("about.summary")}</p>
      </div>

      <div className="section">
        <div className="section-title">{t("about.section.lastExp")}</div>
        <p>
          <strong>{t("about.lastExp.role")}</strong>
        </p>
        <p>
          <em>{t("about.lastExp.period")}</em>
        </p>
        <ul className="experience-list">
          <li>{t("about.lastExp.li1")}</li>
          <li>{t("about.lastExp.li2")}</li>
          <li>{t("about.lastExp.li3")}</li>
          <li>{t("about.lastExp.li4")}</li>
        </ul>
      </div>

      <div className="section">
        <div className="section-title">{t("about.section.journey")}</div>
        <p>{t("about.journey.p1")}</p>
        <p>{t("about.journey.p2")}</p>
        <p>{t("about.journey.p3")}</p>
        <p>{t("about.journey.p4")}</p>
      </div>
    </div>
  );
};

export default AboutWindow;
