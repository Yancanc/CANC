"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type Language = "pt" | "en";

type Dictionary = Record<string, Record<Language, string>>;

const dict: Dictionary = {
  "login.title": { pt: "Logon do Yandows", en: "Yandows Logon" },
  "login.subtitle": { pt: "Conectar ao Yandows", en: "Connect to Yandows" },
  "login.username": { pt: "Selecione o usuário", en: "Select user" },
  "login.password": { pt: "Senha:", en: "Password:" },
  "login.ok": { pt: "OK", en: "OK" },
  "login.cancel": { pt: "Cancelar", en: "Cancel" },
  "login.lang": { pt: "Idioma", en: "Language" },
  "login.font": { pt: "Tipografia", en: "Typography" },
  "menu.about": { pt: "Sobre Mim", en: "About Me" },
  "menu.projects": { pt: "Projetos", en: "Projects" },
  "menu.contact": { pt: "Contato", en: "Contact" },
  "menu.skills": { pt: "Habilidades", en: "Skills" },
  "menu.portfolio": { pt: "Portfólio", en: "Portfolio" },
  "menu.cv": { pt: "Currículo", en: "Resume" },
  "menu.downloadCV": { pt: "Baixar CV", en: "Download CV" },
  "menu.exit": { pt: "Sair", en: "Sign out" },
  "start.menu": { pt: "Menu", en: "Start" },
  "title.about": { pt: "Sobre Mim", en: "About Me" },
  "title.projects": { pt: "Projetos", en: "Projects" },
  "title.contact": { pt: "Contato", en: "Contact" },
  "title.skills": { pt: "Habilidades", en: "Skills" },
  "title.portfolio": { pt: "Portfólio", en: "Portfolio" },
  "title.experience": {
    pt: "Experiência Profissional",
    en: "Professional Experience",
  },
  "title.webcam": { pt: "WebCam", en: "WebCam" },
  "title.snake": { pt: "Snake Game", en: "Snake Game" },
  "title.cv": { pt: "Currículo", en: "Resume" },
  "projects.tip": {
    pt: "Dica: após abrir um projeto, você verá descrição, contribuição, tecnologias e link.",
    en: "Tip: after opening a project you will see description, contribution, technologies and link.",
  },
  "projects.results": { pt: "Resultados (prévia)", en: "Results (preview)" },
  "projects.noMetrics": {
    pt: "Sem acesso aos dados internos atuais. Listei desafios e soluções aplicadas; imagens e métricas podem ser adicionadas sob demanda.",
    en: "No access to current internal data. I've listed challenges and solutions; images and metrics can be added on demand.",
  },
  "projects.description": { pt: "Descrição", en: "Description" },
  "projects.contribution": { pt: "Minha Contribuição", en: "My Contribution" },
  "projects.tech": { pt: "Tecnologias Utilizadas", en: "Technologies Used" },
  "projects.url": { pt: "URL", en: "URL" },
  "projects.challenges": { pt: "Desafios", en: "Challenges" },
  "projects.solutions": { pt: "Soluções", en: "Solutions" },
  "projects.back": { pt: "Voltar", en: "Back" },
  "projects.visit": { pt: "Visitar Site", en: "Visit Site" },
  "projects.selectPrompt": {
    pt: "Selecione um projeto para ver detalhes:",
    en: "Select a project to see details:",
  },

  // About
  "about.name": {
    pt: "Yan Cancella Barros Pereira",
    en: "Yan Cancella Barros Pereira",
  },
  "about.role": { pt: "Desenvolvedor Full Stack", en: "Full Stack Developer" },
  "about.section.contact": { pt: "Contato", en: "Contact" },
  "about.section.summary": {
    pt: "Resumo Profissional",
    en: "Professional Summary",
  },
  "about.summary": {
    pt: "Desenvolvedor Full Stack com sólida experiência no desenvolvimento e manutenção de sistemas web escaláveis, com foco em automação de tarefas, otimização de desempenho e segurança. Possuo expertise em tecnologias como React.js, Next.js, Vue, Angular, PHP, além de integração de APIs RESTful e gerenciamento de bancos de dados MySQL e PostgreSQL.",
    en: "Full Stack Developer with solid experience building and maintaining scalable web systems, focusing on task automation, performance optimization, and security. Skilled with React.js, Next.js, Vue, Angular, PHP, RESTful APIs, and database management using MySQL and PostgreSQL.",
  },
  "about.section.lastExp": {
    pt: "Ultima Experiência",
    en: "Latest Experience",
  },
  "about.lastExp.role": {
    pt: "Desenvolvedor Full Stack Pleno - Live! - Empresa Têxtil",
    en: "Mid-level Full Stack Developer - Live! - Textile Company",
  },
  "about.lastExp.period": {
    pt: "Junho de 2024 – Atual",
    en: "June 2024 – Present",
  },
  "about.lastExp.li1": {
    pt: "Desenvolvimento e manutenção de sistemas utilizando MongoDB, PostgreSQL, PHP, Laravel, Node.js, JavaScript e Next.js",
    en: "Develop and maintain systems using MongoDB, PostgreSQL, PHP, Laravel, Node.js, JavaScript, and Next.js",
  },
  "about.lastExp.li2": {
    pt: "Criação de painéis de CRM personalizados para gestão de clientes",
    en: "Created custom CRM dashboards for customer management",
  },
  "about.lastExp.li3": {
    pt: "Manutenção e evolução dos sites e sistemas da empresa",
    en: "Maintained and evolved company websites and systems",
  },
  "about.lastExp.li4": {
    pt: "Implementação de soluções escaláveis para gestão de produção têxtil",
    en: "Implemented scalable solutions for textile production management",
  },

  "about.section.journey": { pt: "Trajetória Pessoal", en: "Personal Journey" },
  "about.journey.p1": {
    pt: "Minha jornada profissional começou na área criativa, onde atuei como designer antes de me dedicar à programação.",
    en: "My professional journey began in the creative field, where I worked as a designer before moving into programming.",
  },
  "about.journey.p2": {
    pt: "Desenvolvi projetos de UX/UI, criando interfaces intuitivas e experiências envolventes, além de trabalhar com montagens gráficas e animações 3D.",
    en: "I developed UX/UI projects, crafting intuitive interfaces and engaging experiences, and worked with graphic compositions and 3D animations.",
  },
  "about.journey.p3": {
    pt: "Sempre tive forte interesse por cibersegurança, estudando vulnerabilidades e proteção de sistemas.",
    en: "I have always had a strong interest in cybersecurity, studying vulnerabilities and system protection.",
  },
  "about.journey.p4": {
    pt: "A transição uniu visão estética com habilidades técnicas, permitindo criar soluções funcionais, seguras e centradas no usuário.",
    en: "This transition combined aesthetic vision with technical skills, enabling me to build solutions that are functional, secure, and user-centered.",
  },

  // Contact
  "contact.role": {
    pt: "Desenvolvedor Full Stack - Pleno",
    en: "Full Stack Developer - Mid-level",
  },
  "label.email": { pt: "Email:", en: "Email:" },
  "label.linkedin": { pt: "LinkedIn:", en: "LinkedIn:" },
  "label.location": { pt: "Localização:", en: "Location:" },
  "label.github": { pt: "GitHub:", en: "GitHub:" },
  "contact.locationValue": {
    pt: "Curitiba, Paraná - Brasil",
    en: "Curitiba, Paraná - Brazil",
  },

  // Skills
  "skills.title": { pt: "Minhas Habilidades", en: "My Skills" },
  "skills.intro": {
    pt: "Ao longo da minha carreira, desenvolvi um conjunto diversificado de habilidades técnicas. Abaixo estão as principais tecnologias e ferramentas com as quais trabalho.",
    en: "Throughout my career I have developed a diverse set of technical skills. Below are the main technologies and tools I work with.",
  },
  "skills.cat.languages": {
    pt: "Linguagens de Programação",
    en: "Programming Languages",
  },
  "skills.cat.frontend": { pt: "Frontend", en: "Frontend" },
  "skills.cat.backend": {
    pt: "Backend & Banco de Dados",
    en: "Backend & Databases",
  },
  "skills.cat.devops": { pt: "DevOps & Ferramentas", en: "DevOps & Tools" },

  // Experience
  "exp.header.desc": {
    pt: "Minha trajetória profissional como desenvolvedor full stack, com foco em tecnologias web modernas e soluções escaláveis.",
    en: "My professional path as a full stack developer, focusing on modern web technologies and scalable solutions.",
  },
  "exp.live.title": {
    pt: "Desenvolvedor Full Stack Pleno",
    en: "Mid-level Full Stack Developer",
  },
  "exp.live.company": {
    pt: "Live! - Empresa Têxtil",
    en: "Live! - Textile Company",
  },
  "exp.live.period": { pt: "Junho de 2024 – Atual", en: "June 2024 – Present" },
  "exp.live.li1": {
    pt: "Desenvolvimento e manutenção de sistemas utilizando MongoDB, PostgreSQL, PHP, Laravel, Node.js, JavaScript e Next.js.",
    en: "Developed and maintained systems using MongoDB, PostgreSQL, PHP, Laravel, Node.js, JavaScript and Next.js.",
  },
  "exp.live.li2": {
    pt: "Criação de painéis de CRM personalizados para gestão de clientes e processos internos.",
    en: "Created custom CRM dashboards for customer and process management.",
  },
  "exp.live.li3": {
    pt: "Manutenção e evolução dos sites e sistemas da empresa.",
    en: "Maintained and evolved company websites and systems.",
  },
  "exp.live.li4": {
    pt: "Implementação de soluções escaláveis para gestão de produção têxtil.",
    en: "Implemented scalable solutions for textile production management.",
  },
  "exp.live.li5": {
    pt: "Desenvolvimento de APIs para integração entre sistemas internos.",
    en: "Developed APIs to integrate internal systems.",
  },

  "exp.aguia.title": {
    pt: "Desenvolvedor Full Stack Pleno",
    en: "Mid-level Full Stack Developer",
  },
  "exp.aguia.company": { pt: "Grupo Águia Branca", en: "Grupo Águia Branca" },
  "exp.aguia.period": {
    pt: "Julho de 2023 – Maio de 2024",
    en: "July 2023 – May 2024",
  },
  "exp.aguia.li1": {
    pt: "Desenvolvimento e manutenção de APIs e websites utilizando TypeScript, Node.js e Next.js.",
    en: "Developed and maintained APIs and websites using TypeScript, Node.js and Next.js.",
  },
  "exp.aguia.li2": {
    pt: "Líder no desenvolvimento e manutenção do site BYD Vitória Motors (vitoriamotorsbyd.com.br) e do site Toyota ES/BH/BSB (https://www.kurumaveiculos.com.br).",
    en: "Led development and maintenance of BYD Vitória Motors site (vitoriamotorsbyd.com.br) and Toyota ES/BH/BSB site (https://www.kurumaveiculos.com.br).",
  },
  "exp.aguia.li3": {
    pt: "Criação e liderança de um CMS integrado para gerenciamento de banners em ambos os sites.",
    en: "Created and led an integrated CMS for banner management across both sites.",
  },
  "exp.aguia.li4": {
    pt: "Desenvolvimento de uma API robusta com sistema de autenticação, CRUD completo e integração com Followize.",
    en: "Developed a robust API with authentication, full CRUD and Followize integration.",
  },
  "exp.aguia.li5": {
    pt: "Implementação de scripts em Python para conversão de imagens para WebP e redimensionamento em massa; bate-bases e validação.",
    en: "Implemented Python scripts for WebP conversion and bulk resizing; dataset matching and validation.",
  },
  "exp.aguia.li6": {
    pt: "Manutenção de sistemas legados em PHP, incluindo correções e criação de novas páginas.",
    en: "Maintained legacy PHP systems, including fixes and new pages.",
  },
  "exp.aguia.li7": {
    pt: "Redução de 40% no tempo de carregamento do site Toyota ES/BH/BSB após otimizações.",
    en: "Reduced Toyota ES/BH/BSB site's load time by 40% after optimizations.",
  },
  "exp.aguia.li8": {
    pt: "Experiência em infraestrutura com Microsoft Azure para implementação e manutenção de sistemas.",
    en: "Experience with Microsoft Azure infrastructure for system deployment and maintenance.",
  },

  "exp.globalsys.title": {
    pt: "Desenvolvedor Full Stack Júnior",
    en: "Junior Full Stack Developer",
  },
  "exp.globalsys.company": { pt: "Globalsys", en: "Globalsys" },
  "exp.globalsys.period": {
    pt: "Junho 2022 – Julho de 2023",
    en: "June 2022 – July 2023",
  },
  "exp.globalsys.li1": {
    pt: "Criação e manutenção de soluções utilizando Vue.js, React, PHP e GraphQL.",
    en: "Created and maintained solutions using Vue.js, React, PHP and GraphQL.",
  },
  "exp.globalsys.li2": {
    pt: "Identificação e correção de falhas para garantir alta qualidade e desempenho.",
    en: "Identified and fixed defects to ensure high quality and performance.",
  },
  "exp.globalsys.li3": {
    pt: "Automação e otimização de processos, aumentando a eficiência da equipe.",
    en: "Automated and optimized processes, increasing team efficiency.",
  },
  "exp.globalsys.li4": {
    pt: "Desenvolvimento para clientes como Jurong e GVBus, atendendo demandas específicas.",
    en: "Development for clients such as Jurong and GVBus, meeting specific demands.",
  },
  "exp.globalsys.li5": {
    pt: "Criação do site Happn (plataforma imobiliária), com integração de APIs.",
    en: "Created Happn (real estate platform) site with API integrations.",
  },

  "exp.gruposuper.title": {
    pt: "Desenvolvedor Full Stack Estagiário",
    en: "Full Stack Intern",
  },
  "exp.gruposuper.company": { pt: "Grupo Super", en: "Grupo Super" },
  "exp.gruposuper.period": {
    pt: "Março de 2022 – Junho de 2022",
    en: "March 2022 – June 2022",
  },
  "exp.gruposuper.li1": {
    pt: "Desenvolvimento de páginas em PHP para o sistema interno do Grupo Super.",
    en: "Developed PHP pages for Grupo Super's internal system.",
  },
  "exp.gruposuper.li2": {
    pt: "Colaboração em projetos de otimização e manutenção de funcionalidades.",
    en: "Collaborated on optimization projects and feature maintenance.",
  },
  "exp.gruposuper.li3": {
    pt: "Desenvolvimento de módulo de relatórios em PHP que reduziu o tempo de processamento em 20%.",
    en: "Developed a PHP reporting module that reduced processing time by 20%.",
  },

  // Portfolio
  "portfolio.section.contributions": {
    pt: "Contribuições e Projetos",
    en: "Contributions and Projects",
  },
  "portfolio.intro": {
    pt: "Ao longo da minha carreira no Grupo Águia Branca, contribuí ativamente para diversos projetos significativos, demonstrando minha capacidade de desenvolver soluções robustas e escaláveis. Abaixo estão algumas das minhas contribuições mais relevantes:",
    en: "Throughout my career at Grupo Águia Branca, I actively contributed to several significant projects, demonstrating my ability to build robust and scalable solutions. Below are some of the most relevant contributions:",
  },
  "portfolio.stats.commits": { pt: "Commits", en: "Commits" },
  "portfolio.stats.projects": { pt: "Projetos", en: "Projects" },
  "portfolio.stats.prs": { pt: "Pull Requests", en: "Pull Requests" },
  "portfolio.section.contributionsHistory": {
    pt: "Meu Histórico de Contribuições",
    en: "My Contributions History",
  },
  "portfolio.caption": {
    pt: "Histórico de contribuições em projetos no GitLab, demonstrando consistência e comprometimento ao longo do tempo.",
    en: "Contributions history in GitLab projects, demonstrating consistency and commitment over time.",
  },
  "portfolio.section.featured": {
    pt: "Projetos Destacados",
    en: "Featured Projects",
  },
  "portfolio.kuruma.title": { pt: "Kuruma Veículos", en: "Kuruma Veículos" },
  "portfolio.kuruma.desc.li1": {
    pt: "Arquitetura front-end com Next.js e TypeScript",
    en: "Front-end architecture with Next.js and TypeScript",
  },
  "portfolio.kuruma.desc.li2": {
    pt: "Implementação de sistema de busca avançada de veículos",
    en: "Implemented advanced vehicle search system",
  },
  "portfolio.kuruma.desc.li3": {
    pt: "Otimizações que reduziram o tempo de carregamento em 40%",
    en: "Optimizations that reduced load time by 40%",
  },
  "portfolio.kuruma.desc.li4": {
    pt: "Integração com APIs de estoque e precificação",
    en: "Integration with inventory and pricing APIs",
  },
  "portfolio.visitSite": { pt: "Visitar Site", en: "Visit Site" },

  // Snake game
  "snake.length": { pt: "Comprimento", en: "Length" },
  "snake.pause": { pt: "⏸ Pausar", en: "⏸ Pause" },
  "snake.resume": { pt: "▶ Continuar", en: "▶ Resume" },
  "snake.gameOver": { pt: "GAME OVER", en: "GAME OVER" },
  "snake.score": { pt: "Pontuação", en: "Score" },
  "snake.paused": { pt: "PAUSADO", en: "PAUSED" },
  "snake.desktopInstructions": {
    pt: "Use as setas ou WASD para mover a cobra. Pressione ESPAÇO para pausar/continuar.",
    en: "Use arrow keys or WASD to move. Press SPACE to pause/resume.",
  },
  "snake.mobileInstructions": {
    pt: "Use os botões de direção para jogar.",
    en: "Use the direction buttons to play.",
  },
  "snake.restart": { pt: "REINICIAR", en: "RESTART" },
  "snake.pauseBtn": { pt: "PAUSAR", en: "PAUSE" },
  "snake.resumeBtn": { pt: "CONTINUAR", en: "RESUME" },

  // WebCam
  "webcam.filter": { pt: "Filtro:", en: "Filter:" },
  "webcam.filter.retro": { pt: "Retrô", en: "Retro" },
  "webcam.filter.vhs": { pt: "VHS", en: "VHS" },
  "webcam.filter.pixel": { pt: "Pixelado", en: "Pixelated" },
  "webcam.filter.crt": { pt: "Monitor CRT", en: "CRT Monitor" },
  "webcam.filter.none": { pt: "Sem Filtro", en: "No Filter" },
  "webcam.toggle": {
    pt: "Iniciar / Trocar Câmera",
    en: "Start / Switch Camera",
  },
  "webcam.start": { pt: "Iniciar câmera", en: "Start camera" },
  "webcam.stop": { pt: "Parar câmera", en: "Stop camera" },
  "webcam.loading": { pt: "Carregando câmera...", en: "Loading camera..." },
  "webcam.retry": { pt: "Tentar Novamente", en: "Try Again" },
  "webcam.takePhoto": { pt: "Tirar Foto", en: "Take Photo" },
  "webcam.newPhoto": { pt: "Nova Foto", en: "New Photo" },
  "webcam.download": { pt: "Baixar", en: "Download" },
  "webcam.ready": {
    pt: "Câmera pronta com filtro {filter}.",
    en: "Camera ready with {filter} filter.",
  },
  "webcam.captured": {
    pt: "Foto capturada com filtro {filter}.",
    en: "Photo captured with {filter} filter.",
  },
  "webcam.filter.disabled": { pt: "desativado", en: "disabled" },
  "webcam.permissionTip": {
    pt: "Para iniciar a câmera no iOS, toque no botão abaixo e permita o acesso.",
    en: "To start the camera on iOS, tap the button below and allow access.",
  },
  "webcam.mirror": { pt: "Espelhar imagem", en: "Mirror image" },
  "webcam.lastPhoto": { pt: "Última foto", en: "Last photo" },
  "webcam.open": { pt: "Abrir", en: "Open" },
};

interface LocaleContextValue {
  lang: Language;
  setLang: (l: Language) => void;
  t: (key: string) => string;
  isAltFont: boolean;
  setAltFont: (v: boolean) => void;
}

const LocaleContext = createContext<LocaleContextValue | undefined>(undefined);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>("pt");
  const [isAltFont, setIsAltFont] = useState(false);

  useEffect(() => {
    const stored = (localStorage.getItem("lang") as Language) || "pt";
    setLangState(stored);
    const storedFont = localStorage.getItem("fontAlt") === "true";
    setIsAltFont(storedFont);
    document.body.classList.toggle("font-alt", storedFont);
  }, []);

  const setLang = useCallback((l: Language) => {
    setLangState(l);
    try {
      localStorage.setItem("lang", l);
    } catch {}
  }, []);

  const setAltFont = useCallback((v: boolean) => {
    setIsAltFont(v);
    document.body.classList.toggle("font-alt", v);
    try {
      localStorage.setItem("fontAlt", String(v));
    } catch {}
  }, []);

  const t = useCallback(
    (key: string) => {
      const entry = dict[key];
      if (!entry) return key;
      return entry[lang] ?? entry.pt ?? key;
    },
    [lang]
  );

  const value = useMemo(
    () => ({ lang, setLang, t, isAltFont, setAltFont }),
    [lang, setLang, t, isAltFont, setAltFont]
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx)
    throw new Error("useLocale deve ser usado dentro de LocaleProvider");
  return ctx;
}
