"use client";

import React from "react";

const AboutWindow: React.FC = () => {
  return (
    <div className="about-me-content">
      <h2>Yan Cancella Barros Pereira</h2>
      <p className="text-blue font-bold">Desenvolvedor Full Stack </p>

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
          tecnologias como React.js, Next.js, Vue, Angular, PHP, além de
          integração de APIs RESTful e gerenciamento de bancos de dados MySQL e
          PostgreSQL.
        </p>
      </div>

      <div className="section">
        <div className="section-title">Ultima Experiência</div>
        <p>
          <strong>Desenvolvedor Full Stack Pleno</strong> - Grupo Águia Branca
        </p>
        <p>
          <em>Julho de 2023 – Março de 2025</em>
        </p>
        <ul className="experience-list">
          <li>
            Desenvolvimento e manutenção de APIs e websites utilizando
            TypeScript, PHP, Node.js e Next.js
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

      <div className="section">
        <div className="section-title">Trajetória Pessoal</div>
        <p>
          Minha jornada profissional começou na área criativa, onde atuei como
          designer antes de me dedicar à programação. Desenvolvi projetos de
          UX/UI, criando interfaces intuitivas e experiências de usuário
          envolventes, além de trabalhar com montagens gráficas e animações 3D
          que me permitiram explorar minha criatividade.
        </p>
        <p>
          Paralelamente, sempre nutri uma forte curiosidade pela cibersegurança,
          estudando vulnerabilidades e métodos de proteção de sistemas. Em
          determinado momento, percebi a necessidade de uma transição de
          carreira da área artística para a tecnologia, unindo minha visão
          estética com habilidades técnicas.
        </p>
        <p>
          Esta mudança representou um ponto de virada na minha vida
          profissional, onde finalmente encontrei minha verdadeira vocação. A
          combinação de conhecimentos em design, segurança e desenvolvimento me
          proporciona uma perspectiva única na criação de soluções tecnológicas,
          permitindo-me desenvolver sistemas que são não apenas funcionais e
          seguros, mas também esteticamente harmoniosos e centrados no usuário.
        </p>
      </div>
    </div>
  );
};

export default AboutWindow;
