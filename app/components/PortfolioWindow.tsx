"use client";

import React from "react";
import { useLocale } from "../context/Locale";

const PortfolioWindow: React.FC = () => {
  const { t } = useLocale();
  return (
    <div className="portfolio-container">
      <div className="portfolio-content">
        <div className="section">
          <div className="section-title">
            {t("portfolio.section.contributions")}
          </div>
          <p className="portfolio-intro">{t("portfolio.intro")}</p>

          <div className="portfolio-stats">
            <div className="stat-item">
              <div className="stat-number">500+</div>
              <div className="stat-label">{t("portfolio.stats.commits")}</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">15+</div>
              <div className="stat-label">{t("portfolio.stats.projects")}</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">3000+</div>
              <div className="stat-label">{t("portfolio.stats.prs")}</div>
            </div>
          </div>

          <div className="contributions-image">
            <div className="section-title">
              {t("portfolio.section.contributionsHistory")}
            </div>
            <div className="image-container">
              <img
                src="/contribuitions.jpeg"
                alt="Contributions history"
                className="gitlab-contributions"
              />
            </div>
            <p className="image-caption">{t("portfolio.caption")}</p>
          </div>
        </div>

        <div className="section">
          <div className="section-title">{t("portfolio.section.featured")}</div>
          <div className="portfolio-projects">
            <div className="portfolio-project">
              <h3>{t("portfolio.kuruma.title")}</h3>
              <p>
                Desenvolvimento completo do site para a concessionária Toyota
                ES/BH/BSB:
                <ul>
                  <li>{t("portfolio.kuruma.desc.li1")}</li>
                  <li>{t("portfolio.kuruma.desc.li2")}</li>
                  <li>{t("portfolio.kuruma.desc.li3")}</li>
                  <li>{t("portfolio.kuruma.desc.li4")}</li>
                </ul>
              </p>
              <a
                href="https://kurumaveiculos.com.br"
                target="_blank"
                rel="noopener noreferrer"
                className="project-link"
              >
                {t("portfolio.visitSite")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioWindow;
