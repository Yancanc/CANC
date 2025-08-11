## Plano de Evolução — Portfólio Yandows 98

Objetivo: elevar estética, dinamismo e UX mantendo a vibe Win98, com performance/SEO/a11y sólidos e experiência fluida em desktop e mobile (especialmente iOS).

Indicadores de sucesso:

- Lighthouse: Performance ≥ 90, Acessibilidade ≥ 90, Best Practices ≥ 95, SEO ≥ 95
- LCP ≤ 2.5s em 4G, CLS ≤ 0.1, TBT ≤ 200ms
- Zero erros de console e links quebrados

Guia de uso:

- Cada fase tem checklist, arquivos impactados e critérios de aceitação (CA).
- No fim de cada fase, rodar checkups: testes manuais, Lighthouse, cross-device.

---

### Fase 0 — Quick Wins e Correções

- [x] Corrigir URL inválida em `app/components/ProjectsWindow.tsx` ("viajecomaguia.com.brr" → "viajecomaguia.com.br").
- [ ] Ajustar referência de imagem em `app/components/PortfolioWindow.tsx` se o arquivo for renomeado para `contributions.jpeg` ou padronizar nome do arquivo no `public/`.
- [x] Garantir `rel="noopener noreferrer"` em todos `window.open`/links externos (ex.: `Taskbar.tsx`).
- [ ] Adicionar entrada do Media Player no desktop/menu (ícone + janela) e um SCSS dedicado (consistência visual). (Removido por decisão)

Arquivos: `ProjectsWindow.tsx`, `PortfolioWindow.tsx`, `Taskbar.tsx`, `app/styles/*.scss`, `public/`.

CA:

- Links externos seguros e válidos; imagens carregam sem 404; nenhum erro no console.

Checkups:

- Lighthouse rápido (SEO e Best Practices), varrer console, validar links.

---

- [x] Criar `WindowManager` (Context) para controlar: `openWindows`, `minimized`, `focusedWindowId`, `zOrder`, persistência no `localStorage`.
- [x] Ajustar `Desktop.tsx` para usar o contexto, remover estados duplicados (mantidos apenas extras WebCam/Snake).
- [x] Implementar foco/z-index: ao `onMouseDown` na janela → traz para frente e define foco.
- [x] Taskbar toggle: clique no botão da janela alterna minimizar/restaurar e foca a janela.
  - [x] Alternar minimizar/restaurar pela taskbar implementado (inclusive para extras WebCam/Snake)
  - [x] Foco/z-order ao clicar/arrastar janela corrigido (mantém no topo após soltar)
- [x] Suportar deep-link: `/?w=projects,skills` abrindo/restaurando janelas por query.
- [x] Persistir posição/tamanho/minimização por `id` com TTL simples (p.ex. 7 dias) no `localStorage`.
  - [x] Persistir posição e tamanho por `id` (TTL 7 dias) — feito via `WindowManager` (boundsById)

Arquivos: `app/components/Desktop.tsx`, `app/components/Win98Window.tsx`, `app/components/Taskbar.tsx`, `app/components/*Window.tsx`, `app/context/WindowManager.tsx` (novo).

CA:

- Alternar foco e ordem visual funciona; taskbar reflete estado real; refresh mantém janelas; abrir com query funciona.

Checkups:

- Teste teclado (Tab/Shift+Tab), mouse e touch; sem regressões de performance.

---

### Fase 2 — Conteúdo e Apelo Visual

- [ ] Projetos/casos: adicionar imagens (antes/depois), métricas, desafios e soluções em `ProjectsWindow`.
  - [x] Placeholder para seção de Resultados (métricas/imagens) adicionado
  - [x] Estrutura para Desafios e Soluções adicionada (sem métricas internas)
- [x] Criar `CVWindow.tsx` com preview do PDF `public/Curriculum 2025 - PT.pdf` e ação de download.
- [ ] Padronizar ícones: mover imagens externas para `public/icons/*` e usar localmente (desktop icons)
  - [x] Decisão: manter ícones do Win98 Icons (CDN) por preferência estética
- [ ] Melhorar tipografia: opção de alternar fonte (bitmap/pixel vs Sans Serif) via menu.
  - [x] Toggle de tipografia na tela de login (MS Sans Serif/Tahoma) com persistência
- [x] Internacionalização (i18n) completa
  - [x] Base i18n e dicionário (pt/en)
  - [x] Tela de login com seleção de idioma e tipografia
  - [x] Menu (Taskbar) com traduções
  - [x] Títulos de janelas e labels internos (About/Skills/Experience/Contact/Projects)

Arquivos: `ProjectsWindow.tsx`, `PortfolioWindow.tsx`, `CVWindow.tsx` (novo), `Desktop.tsx`, `Taskbar.tsx`, `public/icons/*`, `app/styles/*`.

CA:

- Páginas de projetos com conteúdo visual e métricas; CV abrindo em janela; ícones locais carregando rápido.

Checkups:

- Teste visual cross-device, validação de alt text e títulos.

---

### Fase 3 — Performance, Imagens e SEO/PWA

- [x] Migrar imagens para `next/image` (onde aplicável) e definir `next.config.ts` (remotePatterns apenas se necessário).
- [x] Code-splitting: import dinâmico de componentes pesados (ex.: `SnakeGame`, `WebCam`).
- [x] Preconnect/prefetch a domínios de terceiros (ícones Win98).
- [x] Metadados SEO: OpenGraph/Twitter, `alternates.canonical`, `robots` em `app/layout.tsx`.
- [x] Adicionar JSON-LD (Person + WebSite) no `<head>`.
- [x] PWA básico: `public/manifest.json`, ícones, meta `theme-color`. Registrar service worker opcional.

Arquivos: `next.config.ts`, `app/layout.tsx`, `app/page.tsx`, `app/components/*`, `public/manifest.json` (novo), `public/icons/*`.

CA:

- Lighthouse SEO/Best Practices ≥ 95; LCP ≤ 2.5s; imagens otimizadas; PWA instalável.

Checkups:

- Lighthouse desktop/mobile, WebPageTest em 4G, install prompt PWA.

---

### Fase 4 — Tema(s) e Sons (Dinamismo)

- [ ] Criar temas Win98/Win2000/XP (variáveis SCSS) e toggle no Menu.
- [ ] Sons de sistema (abrir/minimizar/erro) com opção de silenciar no Menu.
- [x] Animações de maximizar/restaurar/minimizar com GSAP (snap, bounce leve, minimizar para taskbar)

Arquivos: `app/styles/base.scss` (tokens por tema), `app/styles/*`, `Taskbar.tsx`, `Win98Window.tsx`, `public/sounds/*` (novo).

CA:

- Alternar tema e sons sem recarregar; preferências persistem; sem flicker.

Checkups:

- Teste de contraste por tema; acessibilidade com áudio desligado.

---

### Fase 5 — Acessibilidade e Mobile/iOS

- [ ] ARIA labels e estados em botões de janela/start/taskbar; foco visível.
- [ ] Navegação por teclado: abrir Menu (tecla), alternar janelas, fechar com ESC.
- [ ] Revisar script de `app/layout.tsx`: manter `--vh` e ajustes iOS, mas evitar bloquear zoom/gestos globalmente.
- [ ] Mobile: gesto “swipe down” para minimizar; botão voltar quando maximizado.

Arquivos: `Taskbar.tsx`, `Win98Window.tsx`, `Desktop.tsx`, `app/layout.tsx`, `app/styles/*`.

CA:

- Navegável por teclado; leitor de tela entende controles; mobile sem bloqueios agressivos.

Checkups:

- AXE/Accessibility Insights, VoiceOver/NVDA, testes em iOS/Android.

---

### Fase 6 — Polimento e Easter Eggs (opcional)

- [x] Screensaver após inatividade (desligável com primeiro input).
- [x] "Executar" com comandos que abrem janelas (rota `/[...easter]`).
- [x] Atalhos: Alt+Tab alterna janelas; ESC minimiza; Alt+F4 fecha; Alt+Space foca controles.
- [x] 404 temática Win98 (janela de erro, volta ao desktop).

CA:

- Recursos opcionais não degradam performance/UX básica.

---

## Backlog Técnico

- [ ] Handles de redimensionamento e snap a bordas/grade (desktop).
- [ ] Persistência com schema versionado para evitar estados quebrados após deploy.
- [ ] Testes unitários de WindowManager (foco/z-order/minimize/restore).

---

## Checkups por Fase (ritual)

1. QA manual rápido

- Abrir/fechar/minimizar/restaurar janelas
- Taskbar refletindo estados
- Mobile iOS/Android: rolagem, teclado, safe-area

2. Métricas

- Lighthouse (mobile/desktop) salvo em print/artefato
- Tamanho do bundle e number of requests

3. Acessibilidade

- AXE/NVDA/VoiceOver básico, foco visível

4. Regressões

- Console sem erros, 0 links quebrados

---

## Definição de Pronto (DoD)

- Critérios de aceitação de cada fase atendidos
- Sem erros de console; Lighthouse conforme metas; cross-device ok
- Código tipado sem TS errors, sem lint crítico
- Documentação (este roadmap) atualizada

---

## Próximas ações sugeridas

1. Rodar Fase 0 (30–60 min)

- Corrigir links/rel; adicionar entrada do Media Player; validar imagem de contribuições

2. Iniciar Fase 1 (2–4 h)

- Criar `WindowManager` e integrar `Desktop`/`Taskbar`/`Win98Window`

3. Fase 3 parcial (1–2 h)

- Next/Image em ícones/imagens, metadados SEO essenciais
