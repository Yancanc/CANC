"use client";

import React from "react";

const AboutWindow: React.FC = () => {
  return (
    <div className="about-me-content">
      <h2>Yan Cancella Barros Pereira</h2>
      <p className="text-blue font-bold">Desenvolvedor Full Stack - Pleno</p>

      <div className="section">
        <div className="section-title">Contato</div>
        <div className="contact-info">
          <p>
            <strong>Email:</strong> yan.cancella@outlook.com
          </p>
          <p>
            <strong>LinkedIn:</strong>{" "}
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
        <div className="section-title">Resumo Profissional</div>
        <p>
          Desenvolvedor Full Stack com sólida experiência no desenvolvimento e
          manutenção de sistemas web escaláveis, com foco em automação de
          tarefas, otimização de desempenho e segurança. Possuo expertise em
          tecnologias como React.js, Next.js e PHP, além de integração de APIs
          RESTful e gerenciamento de bancos de dados MySQL e PostgreSQL.
        </p>
      </div>

      <div className="section">
        <div className="section-title">Experiência Atual</div>
        <p>
          <strong>Desenvolvedor Full Stack Pleno</strong> - Grupo Águia Branca
        </p>
        <p>
          <em>Julho de 2023 – Atual</em>
        </p>
        <ul className="experience-list">
          <li>
            Desenvolvimento e manutenção de APIs e websites utilizando
            TypeScript, Node.js e Next.js
          </li>
          <li>
            Líder no desenvolvimento e manutenção do site Lexus ES/BH/BSB e do
            site Toyota ES/BH/BSB
          </li>
          <li>
            Criação e liderança de um CMS integrado para gerenciamento de
            banners
          </li>
          <li>
            Desenvolvimento de API robusta com sistema de autenticação seguro e
            integração com Followize
          </li>
          <li>
            Implementação de scripts em Python para otimização de imagens e
            validação de dados
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AboutWindow;
