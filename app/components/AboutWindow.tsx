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
          <strong>Desenvolvedor Full Stack Pleno</strong> - Live! - Empresa
          Têxtil
        </p>
        <p>
          <em>Junho de 2024 – Atual</em>
        </p>
        <ul className="experience-list">
          <li>
            Desenvolvimento e manutenção de sistemas utilizando MongoDB,
            PostgreSQL, PHP, Laravel, Node.js, JavaScript e Next.js
          </li>
          <li>
            Criação de painéis de CRM personalizados para gestão de clientes
          </li>
          <li>Manutenção e evolução dos sites e sistemas da empresa</li>
          <li>
            Implementação de soluções escaláveis para gestão de produção têxtil
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
