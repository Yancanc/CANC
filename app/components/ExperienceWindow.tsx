"use client";

import React from "react";

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
  return (
    <div className="experience-container">
      <div className="experience-header">
        <h2>Experiência Profissional</h2>
        <p>
          Minha trajetória profissional como desenvolvedor full stack, com foco
          em tecnologias web modernas e soluções escaláveis.
        </p>
      </div>

      <div className="experience-timeline">
        <div className="experience-item">
          <div className="experience-title">
            <h3>Desenvolvedor Full Stack Pleno</h3>
            <span className="company">Grupo Águia Branca</span>
            <span className="period">Julho de 2023 – Março de 2025</span>
          </div>
          <div className="experience-details">
            <ul className="experience-list">
              <li>
                Desenvolvimento e manutenção de APIs e websites utilizando
                TypeScript, Node.js e Next.js.
              </li>
              <li>
                Líder no desenvolvimento e manutenção do site BYD Vitória Motors
                (vitoriamotorsbyd.com.br) e do site Toyota ES/BH/BSB
                (https://www.kurumaveiculos.com.br).
              </li>
              <li>
                Criação e liderança de um CMS integrado para gerenciamento de
                banners em ambos os sites.
              </li>
              <li>
                Desenvolvimento de uma API robusta com:
                <ul>
                  <li>Sistema de autenticação seguro.</li>
                  <li>CRUD completo.</li>
                  <li>
                    Integração com Followize para envio e sanitização de dados
                    de formulários.
                  </li>
                </ul>
              </li>
              <li>
                Implementação de scripts em Python para:
                <ul>
                  <li>
                    Processos de conversão de imagens para WebP e
                    redimensionamento em massa.
                  </li>
                  <li>Bate-bases e validação de informações de clientes.</li>
                </ul>
              </li>
              <li>
                Manutenção de sistemas legados em PHP, incluindo correções e
                criação de novas páginas.
              </li>
              <li>
                Redução de 40% no tempo de carregamento do site Toyota ES/BH/BSB
                após otimizações.
              </li>
              <li>
                Experiência em infraestrutura com Microsoft Azure para
                implementação e manutenção de sistemas.
              </li>
            </ul>
          </div>
        </div>

        <div className="experience-item">
          <div className="experience-title">
            <h3>Desenvolvedor Full Stack Júnior</h3>
            <span className="company">Globalsys</span>
            <span className="period">Junho 2022 – Julho de 2023</span>
          </div>
          <div className="experience-details">
            <ul className="experience-list">
              <li>
                Criação e manutenção de soluções utilizando Vue.js, React, PHP e
                GraphQL.
              </li>
              <li>
                Identificação e correção de falhas para garantir alta qualidade
                e desempenho das aplicações.
              </li>
              <li>
                Automação e otimização de processos, aumentando a eficiência da
                equipe.
              </li>
              <li>
                Desenvolvimento de soluções para clientes como Jurong e GVBus,
                atendendo demandas específicas de cada negócio.
              </li>
              <li>
                Criação de sites como o Happn (plataforma imobiliária), com
                integração de APIs e interfaces otimizadas.
              </li>
              <li>
                Implementação de soluções interativas e eficientes para garantir
                maior engajamento e satisfação dos usuários finais.
              </li>
            </ul>
          </div>
        </div>

        <div className="experience-item">
          <div className="experience-title">
            <h3>Desenvolvedor Full Stack Estagiário</h3>
            <span className="company">Grupo Super</span>
            <span className="period">Março de 2022 – Junho de 2022</span>
          </div>
          <div className="experience-details">
            <ul className="experience-list">
              <li>
                Desenvolvimento de páginas em PHP para o sistema interno do
                Grupo Super.
              </li>
              <li>
                Colaboração em projetos de otimização e manutenção de
                funcionalidades.
              </li>
              <li>
                Desenvolvimento de módulo de relatórios em PHP que reduziu o
                tempo de processamento em 20%.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
