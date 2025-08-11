"use client";

import React from "react";
import { useLocale } from "../context/Locale";

interface ExperienceWindowProps {
  onClose: () => void;
  onMinimize: () => void;
  isMinimized: boolean;
}

export default function ExperienceWindow({
  onClose,
  onMinimize,
  isMinimized,
}: ExperienceWindowProps) {
  const { t } = useLocale();
  return (
    <div className="experience-container">
      <div className="experience-header">
        <h2>{t("title.experience")}</h2>
        <p>{t("exp.header.desc")}</p>
      </div>

      <div className="experience-timeline">
        <div className="experience-item">
          <div className="experience-title">
            <h3>{t("exp.live.title")}</h3>
            <span className="company">{t("exp.live.company")}</span>
            <span className="period">{t("exp.live.period")}</span>
          </div>
          <div className="experience-details">
            <ul className="experience-list">
              <li>{t("exp.live.li1")}</li>
              <li>{t("exp.live.li2")}</li>
              <li>{t("exp.live.li3")}</li>
              <li>{t("exp.live.li4")}</li>
              <li>{t("exp.live.li5")}</li>
            </ul>
          </div>
        </div>

        <div className="experience-item">
          <div className="experience-title">
            <h3>{t("exp.aguia.title")}</h3>
            <span className="company">{t("exp.aguia.company")}</span>
            <span className="period">{t("exp.aguia.period")}</span>
          </div>
          <div className="experience-details">
            <ul className="experience-list">
              <li>{t("exp.aguia.li1")}</li>
              <li>{t("exp.aguia.li2")}</li>
              <li>{t("exp.aguia.li3")}</li>
              <li>{t("exp.aguia.li4")}</li>
              <li>{t("exp.aguia.li5")}</li>
              <li>{t("exp.aguia.li6")}</li>
              <li>{t("exp.aguia.li7")}</li>
              <li>{t("exp.aguia.li8")}</li>
            </ul>
          </div>
        </div>

        <div className="experience-item">
          <div className="experience-title">
            <h3>{t("exp.globalsys.title")}</h3>
            <span className="company">{t("exp.globalsys.company")}</span>
            <span className="period">{t("exp.globalsys.period")}</span>
          </div>
          <div className="experience-details">
            <ul className="experience-list">
              <li>{t("exp.globalsys.li1")}</li>
              <li>{t("exp.globalsys.li2")}</li>
              <li>{t("exp.globalsys.li3")}</li>
              <li>{t("exp.globalsys.li4")}</li>
              <li>{t("exp.globalsys.li5")}</li>
            </ul>
          </div>
        </div>

        <div className="experience-item">
          <div className="experience-title">
            <h3>{t("exp.gruposuper.title")}</h3>
            <span className="company">{t("exp.gruposuper.company")}</span>
            <span className="period">{t("exp.gruposuper.period")}</span>
          </div>
          <div className="experience-details">
            <ul className="experience-list">
              <li>{t("exp.gruposuper.li1")}</li>
              <li>{t("exp.gruposuper.li2")}</li>
              <li>{t("exp.gruposuper.li3")}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
