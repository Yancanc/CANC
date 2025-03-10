"use client";

import { useState, useRef, useEffect, Dispatch, SetStateAction } from "react";
import Win98Window from "./Win98Window";

interface DesktopIconProps {
  name: string;
  svgIcon: React.ReactNode;
  onClick: () => void;
}

interface DesktopProps {
  showAboutWindow: boolean;
  setShowAboutWindow: Dispatch<SetStateAction<boolean>>;
  showProjectsWindow: boolean;
  setShowProjectsWindow: Dispatch<SetStateAction<boolean>>;
  showContactWindow: boolean;
  setShowContactWindow: Dispatch<SetStateAction<boolean>>;
  showSkillsWindow: boolean;
  setShowSkillsWindow: Dispatch<SetStateAction<boolean>>;
  showPortfolioWindow: boolean;
  setShowPortfolioWindow: Dispatch<SetStateAction<boolean>>;
}

const DesktopIcon: React.FC<DesktopIconProps> = ({
  name,
  svgIcon,
  onClick,
}) => {
  return (
    <div className="desktop-icon" onClick={onClick}>
      <div className="icon-image">{svgIcon}</div>
      <div className="icon-text">{name}</div>
    </div>
  );
};

// Ícones SVG do Windows 98
const ComputerIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="4" y="6" width="24" height="16" fill="#FFFFCC" />
    <rect x="8" y="10" width="16" height="8" fill="#000080" />
    <rect x="10" y="22" width="12" height="4" fill="#C0C0C0" />
    <rect x="14" y="22" width="4" height="1" fill="#FFFFFF" />
  </svg>
);

const FolderIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M4 8H14L16 10H28V24H4V8Z" fill="#FFCC66" />
    <path d="M4 8H14L16 10H28V11H4V8Z" fill="#FFFFFF" opacity="0.5" />
    <path d="M4 24H28V23H4V24Z" fill="#996600" opacity="0.5" />
  </svg>
);

const NetworkIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="4" y="6" width="10" height="8" fill="#C0C0C0" />
    <rect x="18" y="6" width="10" height="8" fill="#C0C0C0" />
    <rect x="11" y="18" width="10" height="8" fill="#C0C0C0" />
    <path d="M9 10L16 18M23 10L16 18" stroke="#000080" strokeWidth="1.5" />
  </svg>
);

// Novo ícone para Habilidades (Ferramentas/Engrenagens)
const SkillsIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="16" cy="16" r="10" fill="#C0C0C0" />
    <path
      d="M16 6V8M16 24V26M6 16H8M24 16H26M8.5 8.5L10 10M22 22L23.5 23.5M8.5 23.5L10 22M22 10L23.5 8.5"
      stroke="#000080"
      strokeWidth="1.5"
    />
    <circle cx="16" cy="16" r="4" fill="#000080" />
    <circle cx="16" cy="16" r="2" fill="#FFFFFF" />
  </svg>
);

const RecycleBinIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M10 8H22V24H10V8Z" fill="#FFFFFF" />
    <path d="M12 10V22M16 10V22M20 10V22" stroke="#000000" strokeWidth="1" />
    <path d="M8 8H24V10H8V8Z" fill="#C0C0C0" />
    <path d="M14 6H18V8H14V6Z" fill="#C0C0C0" />
  </svg>
);

const InternetExplorerIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="16" cy="16" r="12" fill="#0078D7" />
    <circle cx="16" cy="16" r="10" fill="#FFFFFF" />
    <path
      d="M8 16C8 11.6 11.6 8 16 8C20.4 8 24 11.6 24 16"
      stroke="#0078D7"
      strokeWidth="2"
    />
    <path d="M16 8V24M8 16H24" stroke="#0078D7" strokeWidth="2" />
  </svg>
);

export default function Desktop({
  showAboutWindow,
  setShowAboutWindow,
  showProjectsWindow,
  setShowProjectsWindow,
  showContactWindow,
  setShowContactWindow,
  showSkillsWindow,
  setShowSkillsWindow,
  showPortfolioWindow,
  setShowPortfolioWindow,
}: DesktopProps) {
  return (
    <div className="win98-desktop">
      <div className="desktop-icons-container">
        <DesktopIcon
          name="Currículo"
          svgIcon={<ComputerIcon />}
          onClick={() => setShowAboutWindow(true)}
        />
        <DesktopIcon
          name="Projetos"
          svgIcon={<FolderIcon />}
          onClick={() => setShowProjectsWindow(true)}
        />
        <DesktopIcon
          name="Contato"
          svgIcon={<NetworkIcon />}
          onClick={() => setShowContactWindow(true)}
        />
        <DesktopIcon
          name="Habilidades"
          svgIcon={<SkillsIcon />}
          onClick={() => setShowSkillsWindow(true)}
        />
        <DesktopIcon
          name="Portfólio"
          svgIcon={<InternetExplorerIcon />}
          onClick={() => setShowPortfolioWindow(true)}
        />
      </div>

      {showAboutWindow && (
        <Win98Window
          id="about"
          title="Sobre Mim"
          onClose={() => setShowAboutWindow(false)}
          onMinimize={() => setShowAboutWindow(false)}
          isMinimized={false}
          initialPosition={{ x: 100, y: 50 }}
          initialSize={{ width: 500, height: 400 }}
        >
          <div className="about-me-content">
            <h2>Yan Cancella Barros Pereira</h2>
            <p className="text-blue font-bold">
              Desenvolvedor Full Stack - Pleno
            </p>

            <div className="section">
              <div className="section-title">Contato</div>
              <div className="contact-info">
                <p>
                  <strong>Email:</strong> yan.cancella@outlook.com
                </p>
                <p>
                  <strong>LinkedIn:</strong>{" "}
                  <a
                    href="https://https://www.linkedin.com/in/yancanc/"
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
                Desenvolvedor Full Stack com sólida experiência no
                desenvolvimento e manutenção de sistemas web escaláveis, com
                foco em automação de tarefas, otimização de desempenho e
                segurança. Possuo expertise em tecnologias como React.js,
                Next.js e PHP, além de integração de APIs RESTful e
                gerenciamento de bancos de dados MySQL e PostgreSQL.
              </p>
            </div>

            <div className="section">
              <div className="section-title">Experiência Atual</div>
              <p>
                <strong>Desenvolvedor Full Stack Pleno</strong> - Grupo Águia
                Branca
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
                  Líder no desenvolvimento e manutenção do site Lexus ES/BH/BSB
                  e do site Toyota ES/BH/BSB
                </li>
                <li>
                  Criação e liderança de um CMS integrado para gerenciamento de
                  banners
                </li>
                <li>
                  Desenvolvimento de API robusta com sistema de autenticação
                  seguro e integração com Followize
                </li>
                <li>
                  Implementação de scripts em Python para otimização de imagens
                  e validação de dados
                </li>
              </ul>
            </div>
          </div>
        </Win98Window>
      )}

      {showContactWindow && (
        <Win98Window
          id="contact"
          title="Contato"
          onClose={() => setShowContactWindow(false)}
          onMinimize={() => setShowContactWindow(false)}
          isMinimized={false}
          initialPosition={{ x: 150, y: 100 }}
          initialSize={{ width: 450, height: 350 }}
        >
          <div className="contact-content">
            <div className="section">
              <div className="section-title">Informações de Contato</div>
              <div className="contact-card">
                <div className="contact-header">
                  <h3>Yan Cancella Barros Pereira</h3>
                  <p className="contact-title">
                    Desenvolvedor Full Stack - Pleno
                  </p>
                </div>

                <div className="contact-details">
                  <div className="contact-item">
                    <div className="contact-icon">✉️</div>
                    <div className="contact-text">
                      <strong>Email:</strong>
                      <p>yan.cancella@outlook.com</p>
                    </div>
                  </div>

                  <div className="contact-item">
                    <div className="contact-icon">🔗</div>
                    <div className="contact-text">
                      <strong>LinkedIn:</strong>
                      <p>
                        <a
                          href="https://www.linkedin.com/in/yancanc/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue"
                        >
                          www.linkedin.com/in/yancanc/
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="contact-item">
                    <div className="contact-icon">📍</div>
                    <div className="contact-text">
                      <strong>Localização:</strong>
                      <p>Vitória, Espírito Santo - Brasil</p>
                    </div>
                  </div>

                  <div className="contact-item">
                    <div className="contact-icon">💻</div>
                    <div className="contact-text">
                      <strong>GitHub:</strong>
                      <p>
                        <a
                          href="https://github.com/yancancella"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue"
                        >
                          github.com/yancancella
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="section">
              <div className="section-title">Disponibilidade</div>
              <div className="contact-form">
                <p className="contact-note">
                  Atualmente estou disponível para novos projetos e
                  oportunidades de trabalho. Sinta-se à vontade para entrar em
                  contato comigo através dos canais acima para discutir
                  possibilidades de colaboração.
                </p>
              </div>
            </div>
          </div>
        </Win98Window>
      )}

      {showSkillsWindow && (
        <Win98Window
          id="skills"
          title="Habilidades"
          onClose={() => setShowSkillsWindow(false)}
          onMinimize={() => setShowSkillsWindow(false)}
          isMinimized={false}
          initialPosition={{ x: 200, y: 150 }}
          initialSize={{ width: 500, height: 400 }}
        >
          <div className="skills-content">
            <div className="skill-category">
              <h3>Linguagens de Programação</h3>
              <div className="skill-tags">
                <span className="skill-tag">TypeScript</span>
                <span className="skill-tag">JavaScript</span>
                <span className="skill-tag">Python</span>
                <span className="skill-tag">PHP</span>
                <span className="skill-tag">HTML</span>
                <span className="skill-tag">CSS</span>
                <span className="skill-tag">SQL</span>
              </div>
            </div>

            <div className="skill-category">
              <h3>Frameworks e Bibliotecas</h3>
              <div className="skill-tags">
                <span className="skill-tag">Next.js</span>
                <span className="skill-tag">Node.js</span>
                <span className="skill-tag">React.js</span>
                <span className="skill-tag">Express</span>
                <span className="skill-tag">Laravel</span>
                <span className="skill-tag">Vue.js</span>
                <span className="skill-tag">Tailwind CSS</span>
                <span className="skill-tag">Bootstrap</span>
                <span className="skill-tag">SASS/SCSS</span>
              </div>
            </div>

            <div className="skill-category">
              <h3>Bancos de Dados</h3>
              <div className="skill-tags">
                <span className="skill-tag">MySQL</span>
                <span className="skill-tag">MongoDB</span>
                <span className="skill-tag">PostgreSQL</span>
                <span className="skill-tag">Redis</span>
                <span className="skill-tag">Firebase</span>
              </div>
            </div>

            <div className="skill-category">
              <h3>Ferramentas e Infraestrutura</h3>
              <div className="skill-tags">
                <span className="skill-tag">Git</span>
                <span className="skill-tag">Docker</span>
                <span className="skill-tag">Microsoft Azure</span>
                <span className="skill-tag">AWS</span>
                <span className="skill-tag">CI/CD</span>
                <span className="skill-tag">Vercel</span>
                <span className="skill-tag">Netlify</span>
                <span className="skill-tag">Heroku</span>
              </div>
            </div>

            <div className="skill-category">
              <h3>Metodologias e Práticas</h3>
              <div className="skill-tags">
                <span className="skill-tag">Scrum</span>
                <span className="skill-tag">Kanban</span>
                <span className="skill-tag">TDD</span>
                <span className="skill-tag">Clean Code</span>
                <span className="skill-tag">RESTful APIs</span>
                <span className="skill-tag">Microserviços</span>
              </div>
            </div>

            <div className="skill-category">
              <h3>Soft Skills</h3>
              <div className="skill-tags">
                <span className="skill-tag">Trabalho em Equipe</span>
                <span className="skill-tag">Comunicação</span>
                <span className="skill-tag">Resolução de Problemas</span>
                <span className="skill-tag">Adaptabilidade</span>
                <span className="skill-tag">Gestão de Tempo</span>
                <span className="skill-tag">Liderança</span>
              </div>
            </div>
          </div>
        </Win98Window>
      )}

      {showPortfolioWindow && (
        <Win98Window
          id="portfolio"
          title="Portfólio"
          onClose={() => setShowPortfolioWindow(false)}
          onMinimize={() => setShowPortfolioWindow(false)}
          isMinimized={false}
          initialPosition={{ x: 250, y: 100 }}
          initialSize={{ width: 600, height: 450 }}
        >
          <div className="portfolio-content">
            <div className="section">
              <div className="section-title">Contribuições e Projetos</div>
              <p className="portfolio-intro">
                Ao longo da minha carreira no Grupo Águia Branca, tenho
                contribuído ativamente para diversos projetos significativos,
                demonstrando minha capacidade de desenvolver soluções robustas e
                escaláveis. Abaixo estão algumas das minhas contribuições mais
                relevantes:
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
                <div className="section-title">
                  Meu Histórico de Contribuições
                </div>
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
                  <h3>BYD Vitória Motors</h3>
                  <p>
                    Desenvolvimento completo do site para a concessionária BYD,
                    incluindo:
                    <ul>
                      <li>
                        Migração de PHP para Next.js para melhor performance
                      </li>
                      <li>
                        Implementação de CMS personalizado para gestão de
                        conteúdo
                      </li>
                      <li>Integração com sistemas de formulários e CRM</li>
                      <li>
                        Otimização SEO resultando em aumento de 35% no tráfego
                        orgânico
                      </li>
                    </ul>
                  </p>
                  <a
                    href="https://vitoriamotorsbyd.com.br"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    Visitar Site
                  </a>
                </div>

                <div className="portfolio-project">
                  <h3>Kuruma Veículos</h3>
                  <p>
                    Desenvolvimento completo do site para a concessionária
                    Toyota ES/BH/BSB:
                    <ul>
                      <li>Arquitetura front-end com Next.js e TypeScript</li>
                      <li>
                        Implementação de sistema de busca avançada de veículos
                      </li>
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

                <div className="portfolio-project">
                  <h3>Azul Agro Máquinas</h3>
                  <p>
                    Desenvolvimento do site institucional com foco em
                    usabilidade:
                    <ul>
                      <li>
                        Design responsivo otimizado para todos os dispositivos
                      </li>
                      <li>Implementação de catálogo digital de produtos</li>
                      <li>Sistema de agendamento de demonstrações</li>
                      <li>Integração com Google Analytics e Tag Manager</li>
                    </ul>
                  </p>
                  <a
                    href="https://azulagromaquinas.com.br"
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
        </Win98Window>
      )}
    </div>
  );
}
