"use client";

import React from "react";

const PortfolioWindow: React.FC = () => {
  return (
    <div className="portfolio-content">
      <div className="section">
        <div className="section-title">Contribuições e Projetos</div>
        <p className="portfolio-intro">
          Ao longo da minha carreira no Grupo Águia Branca, tenho contribuído
          ativamente para diversos projetos significativos, demonstrando minha
          capacidade de desenvolver soluções robustas e escaláveis. Abaixo estão
          algumas das minhas contribuições mais relevantes:
        </p>

        <div className="portfolio-stats">
          <div className="stat-item">
            <div className="stat-number">500+</div>
            <div className="stat-label">Commits</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">15+</div>
            <div className="stat-label">Projetos</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">30+</div>
            <div className="stat-label">Pull Requests</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">95%</div>
            <div className="stat-label">Código Aprovado</div>
          </div>
        </div>

        <div className="contributions-image">
          <div className="section-title">Meu Histórico de Contribuições</div>
          <div className="image-container">
            <img
              src="/contribuitions.jpeg"
              alt="Histórico de contribuições no GitLab"
              className="gitlab-contributions"
            />
          </div>
          <p className="image-caption">
            Histórico de contribuições em projetos no GitLab, demonstrando
            consistência e comprometimento ao longo do tempo.
          </p>
        </div>
      </div>

      <div className="section">
        <div className="section-title">Projetos Destacados</div>
        <div className="portfolio-projects">
          <div className="portfolio-project">
            <h3>Kuruma Veículos</h3>
            <p>
              Desenvolvimento completo do site para a concessionária Toyota
              ES/BH/BSB:
              <ul>
                <li>Arquitetura front-end com Next.js e TypeScript</li>
                <li>Implementação de sistema de busca avançada de veículos</li>
                <li>
                  Otimizações que reduziram o tempo de carregamento em 40%
                </li>
                <li>Integração com APIs de estoque e precificação</li>
              </ul>
            </p>
            <a
              href="https://kurumaveiculos.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="project-link"
            >
              Visitar Site
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioWindow;
