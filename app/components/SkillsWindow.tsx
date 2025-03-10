"use client";

import React from "react";

interface SkillsWindowProps {
  onClose: () => void;
  onMinimize: () => void;
  isMinimized: boolean;
}

export default function SkillsWindow({
  onClose,
  onMinimize,
  isMinimized,
}: SkillsWindowProps) {
  return (
    <div className="skills-container">
      <div className="skills-header">
        <h2>Minhas Habilidades</h2>
        <p>
          Ao longo da minha carreira, desenvolvi um conjunto diversificado de
          habilidades técnicas. Abaixo estão as principais tecnologias e
          ferramentas com as quais trabalho.
        </p>
      </div>

      <div className="skills-categories">
        <div className="skills-category">
          <div className="category-title">Linguagens de Programação</div>
          <div className="skills-list">
            <div className="skill-item">JavaScript</div>
            <div className="skill-item">TypeScript</div>
            <div className="skill-item">Python</div>
            <div className="skill-item">PHP</div>
            <div className="skill-item">Java</div>
            <div className="skill-item">C#</div>
          </div>
        </div>

        <div className="skills-category">
          <div className="category-title">Frontend</div>
          <div className="skills-list">
            <div className="skill-item">React</div>
            <div className="skill-item">Next.js</div>
            <div className="skill-item">HTML5/CSS3</div>
            <div className="skill-item">SASS/SCSS</div>
            <div className="skill-item">Tailwind CSS</div>
            <div className="skill-item">Bootstrap</div>
            <div className="skill-item">Angular</div>
            <div className="skill-item">Vue.js</div>
          </div>
        </div>

        <div className="skills-category">
          <div className="category-title">Backend & Banco de Dados</div>
          <div className="skills-list">
            <div className="skill-item">Node.js</div>
            <div className="skill-item">Express</div>
            <div className="skill-item">MySQL</div>
            <div className="skill-item">PostgreSQL</div>
            <div className="skill-item">MongoDB</div>
            <div className="skill-item">SQLite</div>
            <div className="skill-item">Redis</div>
            <div className="skill-item">Django</div>
            <div className="skill-item">Flask</div>
          </div>
        </div>

        <div className="skills-category">
          <div className="category-title">DevOps & Ferramentas</div>
          <div className="skills-list">
            <div className="skill-item">Git</div>
            <div className="skill-item">Docker</div>
            <div className="skill-item">AWS</div>
            <div className="skill-item">Azure</div>
            <div className="skill-item">CI/CD</div>
            <div className="skill-item">Linux</div>
            <div className="skill-item">Nginx</div>
            <div className="skill-item">Jenkins</div>
          </div>
        </div>
      </div>
    </div>
  );
}
