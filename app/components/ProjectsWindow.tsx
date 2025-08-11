"use client";

import { useState } from "react";
import { useLocale } from "../context/Locale";

interface ProjectsWindowProps {
  onClose: () => void;
  onMinimize: () => void;
  isMinimized: boolean;
}

interface Project {
  id: string;
  title: string;
  url: string;
  description: string;
  contribution: string;
  technologies: string[];
  challenges?: string[];
  solutions?: string[];
}

export default function ProjectsWindow({
  onClose,
  onMinimize,
  isMinimized,
}: ProjectsWindowProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { t } = useLocale();

  const projects: Project[] = [
    {
      id: "vitoriamotors",
      title: "BYD Vitória Motors",
      url: "https://vitoriamotorsbyd.com.br",
      description:
        "Site institucional da concessionária BYD Vitória Motors, com foco em apresentação de veículos, agendamento de test drive e contato com a concessionária.",
      contribution:
        "Desenvolvimento da primeira versão do site utilizando PHP. Integração com sistema Followize para processamento de formulários e leads.",
      technologies: ["TypeScript", "PHP", "Node.js", "MySQL"],
    },
    {
      id: "kuruma",
      title: "Kuruma Veículos",
      url: "https://kurumaveiculos.com.br",
      description:
        "Site institucional da concessionária Toyota ES/BH/BSB, com catálogo de veículos, sistema de agendamento e área de ofertas.",
      contribution:
        "Desenvolvimento completo em Next.js/TypeScript, criação de CMS de banners e otimizações de front-end e imagens.",
      technologies: ["Next.js", "TypeScript", "Node.js", "SQL Server"],
      challenges: [
        "Tempo de publicação de banners e destaques era lento e manual",
        "Necessidade de padronizar imagens e reduzir tamanho sem perder qualidade",
      ],
      solutions: [
        "CMS de banners com fluxo simples para o time de marketing",
        "Pipeline de otimização de imagens (conversão e dimensionamento)",
      ],
    },
    {
      id: "lexusvitoria",
      title: "Lexus Vitória",
      url: "https://lexusvitoria.com.br",
      description:
        "Site institucional da concessionária Lexus Vitória, com apresentação de veículos de luxo, agendamento de serviços e área de contato.",
      contribution:
        "Desenvolvimento completo do site utilizando Next.js e TypeScript. Implementação de animações e transições para melhorar a experiência do usuário. Integração com APIs para exibição de estoque em tempo real.",
      technologies: ["Next.js", "TypeScript", "Node.js", "SQL Server"],
    },
    {
      id: "osaka",
      title: "Osaka Veículos",
      url: "https://osakaveiculos.com.br",
      description:
        "Site institucional da concessionária Osaka Veículos, com catálogo de veículos, sistema de agendamento e área de ofertas.",
      contribution:
        "Desenvolvimento completo do site utilizando Next.js e TypeScript. Implementação de otimizações que reduziram o tempo de carregamento em 40%. Criação de sistema de gerenciamento de conteúdo para equipe de marketing.",
      technologies: ["Next.js", "TypeScript", "Node.js", "SQL Server"],
    },
    {
      id: "kyoto",
      title: "Toyota Kyoto",
      url: "https://toyotakyoto.com.br",
      description:
        "Site institucional da concessionária Toyota Kyoto, com apresentação de veículos, agendamento de serviços e área de contato.",
      contribution:
        "Desenvolvimento completo do site utilizando Next.js e TypeScript. Implementação de otimizações que reduziram o tempo de carregamento em 40%. Criação de sistema de gerenciamento de conteúdo para equipe de marketing.",
      technologies: ["Next.js", "TypeScript", "Node.js", "SQL Server"],
    },
    {
      id: "lexusbh",
      title: "Lexus BH",
      url: "https://lexusbh.com.br",
      description:
        "Site institucional da concessionária Lexus BH, com apresentação de veículos de luxo, agendamento de serviços e área de contato.",
      contribution:
        "Desenvolvimento completo do site utilizando Next.js e TypeScript. Implementação de recursos de acessibilidade e otimização para mecanismos de busca (SEO).",
      technologies: ["Next.js", "TypeScript", "Node.js", "SQL Server"],
    },
    {
      id: "lexusbsb",
      title: "Lexus Brasília",
      url: "https://lexusbrasilia.com.br",
      description:
        "Site institucional da concessionária Lexus Brasília, com apresentação de veículos de luxo, agendamento de serviços e área de contato.",
      contribution:
        "Desenvolvimento completo do site utilizando Next.js e TypeScript. Implementação de sistema de agendamento de test drive e integração com CRM da empresa.",
      technologies: ["Next.js", "TypeScript", "Node.js", "SQL Server"],
    },
    {
      id: "voucher",
      title: "Agaxtur",
      url: "https://viajecomaguia.com.br",
      description: "Site institucional da empresa Viaje com a Águia.",
      contribution:
        "Desenvolvimento completo do site utilizando Next.js e TypeScript. Implementação de sistema de agendamento de test drive e integração com CRM da empresa.",
      technologies: ["Next.js", "TypeScript", "Node.js", "SQL Server"],
    },
  ];

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
  };

  const handleVisitSite = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="projects-container">
      {!selectedProject ? (
        <>
          <div className="projects-header">
            <p className="mb-2">{t("projects.selectPrompt")}</p>
            <div className="projects-note">
              <p className="note-text">{t("projects.tip")}</p>
            </div>
          </div>
          <div className="projects-grid">
            {projects.map((project) => (
              <div
                key={project.id}
                className="project-item"
                onClick={() => handleProjectClick(project)}
              >
                <div className="project-icon">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M4 8H14L16 10H28V24H4V8Z" fill="#FFCC66" />
                    <path
                      d="M4 8H14L16 10H28V11H4V8Z"
                      fill="#FFFFFF"
                      opacity="0.5"
                    />
                    <path d="M4 24H28V23H4V24Z" fill="#996600" opacity="0.5" />
                  </svg>
                </div>
                <div className="project-title">{project.title}</div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="project-details">
          <div className="project-details-header">
            <h3>{selectedProject.title}</h3>
            <div className="project-actions">
              <button
                className="win98-button back-button"
                onClick={() => setSelectedProject(null)}
              >
                {t("projects.back")}
              </button>
              <button
                className="win98-button visit-button"
                onClick={() => handleVisitSite(selectedProject.url)}
              >
                {t("projects.visit")}
              </button>
            </div>
          </div>
          <div className="project-details-content">
            <div className="detail-section">
              <div className="section-title">{t("projects.results")}</div>
              <p>{t("projects.noMetrics")}</p>
            </div>
            <div className="detail-section">
              <div className="section-title">{t("projects.description")}</div>
              <p>{selectedProject.description}</p>
            </div>
            {selectedProject.challenges &&
              selectedProject.challenges.length > 0 && (
                <div className="detail-section">
                  <div className="section-title">
                    {t("projects.challenges")}
                  </div>
                  <ul>
                    {selectedProject.challenges.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </div>
              )}
            {selectedProject.solutions &&
              selectedProject.solutions.length > 0 && (
                <div className="detail-section">
                  <div className="section-title">{t("projects.solutions")}</div>
                  <ul>
                    {selectedProject.solutions.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>
              )}
            <div className="detail-section">
              <div className="section-title">{t("projects.contribution")}</div>
              <p>{selectedProject.contribution}</p>
            </div>
            <div className="detail-section">
              <div className="section-title">{t("projects.tech")}</div>
              <div className="technology-tags">
                {selectedProject.technologies.map((tech, index) => (
                  <span key={index} className="technology-tag">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div className="detail-section">
              <div className="section-title">{t("projects.url")}</div>
              <p className="project-url">
                <a
                  href={selectedProject.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {selectedProject.url}
                </a>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
