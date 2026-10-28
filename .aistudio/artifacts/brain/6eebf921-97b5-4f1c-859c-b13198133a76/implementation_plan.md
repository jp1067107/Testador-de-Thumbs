# YouTube Thumbnail & Safe-Zone Tester (ThumbPreview Studio)

Ferramenta limpa, focada e completa para criadores testarem e validarem thumbnails e títulos do YouTube em feeds simulados (TV, Computador e Celular), com análise de safe areas e modo comparativo sem sobrecarga visual ou poluição na tela.

---

### User Review & Critical Decisions

> [!IMPORTANT]
> **Diretriz de Design Central do Usuário**:
> **Interface Limpa & Sem Excesso de Informação**: O foco visual deve ser 100% na thumbnail e na fidelidade do feed simulado. Todas as ferramentas e controles (upload, título, temas, safe areas e filtros) são organizados de forma discreta, elegante e recolhível, eliminando ruído visual, caixas desnecessárias e poluição de interface.

- **Layout Minimalista com Foco Total na Tela**:
  - Uma barra superior fina e translúcida com apenas os controles essenciais (seletor de dispositivo TV/PC/Celular, modo comparativo, tema claro/escuro, toggle de safe area e filtros visuais).
  - Painel de edição limpo e compacto (pode ser recolhido para visualização 100% imersiva em tela inteira do feed).
- **Safe Areas & Overlays Sem Poluição**:
  - Exibição sutil e inteligente das áreas críticas (badge de duração no canto inferior direito, badges ao vivo e quebra de título). As marcações só aparecem quando ativadas pelo usuário, sem interferir na visão limpa do feed.
- **Modo Comparativo de Foco**:
  - Comparação limpa e objetiva entre TV, Desktop e Celular lado a lado, com destaque para a região selecionada sem painéis de dados desnecessários.
- **Filtros Rápidos de Contraste**:
  - Alternância de 1 clique entre tema Claro / Escuro do YouTube.
  - Modos de teste de legibilidade: Normal, Escala de Cinza e Desfoque de Atenção (simulação de 3 segundos).

---

### 1. Overview & Core Concept

- **O que faz**: Permite testar thumbnails e títulos em um ambiente de simulação real do YouTube, eliminando adivinhações antes da publicação.
- **Experiência do Usuário**: 
  - **Zero Distração**: O usuário vê o feed exatamente como seu público verá, sem painéis de controle gigantes obstruindo a visão.
  - **Edição Direta**: Campo de título editável em linha ou no painel limpo, com preview instantâneo.
  - **Upload Instantâneo**: Arrastar e soltar a imagem em qualquer lugar, colar do clipboard (Ctrl+V) ou escolher uma thumbnail de amostra.

---

### 2. User Experience & Visual Architecture

#### A. Estrutura Visual Descomplicada
1. **Header Compacto (Altura de 56px)**:
   - Marca sutil à esquerda (`ThumbPreview`).
   - Seletor de dispositivo central em estilo segmented control limpo: `[ Celular | Computador | TV | Comparativo ]`.
   - Ações rápidas à direita:
     - `Safe Areas` (Interruptor discreto).
     - `Legibilidade` (Menu rápido: Normal, P&B, Desfoque).
     - `Tema` (Ícone sol/lua para Claro/Escuro do YouTube).
     - Botão discreto para recolher/expandir o painel de edição.
2. **Painel de Edição Discreto (Drawer/Barra Lateral Retrátil)**:
   - Área de upload de thumbnail elegante (área com drag & drop compacta e presets de 1 clique).
   - Input de Título do Vídeo com contagem de caracteres e alerta sutil de truncamento (> 55 caracteres no mobile).
   - Nome do Canal e Duração (ex: `12:45`).
   - Botão para ocultar a barra lateral e focar 100% no feed.
3. **Área de Visualização Principal (Canvas Focado)**:
   - Moldura realista do dispositivo selecionado com fundo neutro que não compete com a thumbnail.
   - Rolagem suave com vídeos concorrentes realistas para validar se a thumb do usuário realmente se destaca.

#### B. Safe Areas Inteligentes e Não Intrusivas
- As guias de Safe Area foram desenhadas com linhas elegantes e preenchimentos suaves, ativadas sob demanda:
  - **Canto Inferior Direito**: Destaque para a caixa preta de tempo do YouTube (`14:20`), o erro nº 1 de criadores.
  - **Barra Vermelha Inferior**: Linha de progresso que cobre os 4px inferiores.
  - **Canto Superior Direito**: Botões de hover e menu de 3 pontos.
  - **Zona Segura Central**: Área delimitada com linhas tênues para garantir que os elementos vitais fiquem visíveis em qualquer tela.

---

### 3. Key Product Decisions & Trade-Offs

- **Interface Retrátil vs Painéis Fixos**:
  - *Decisão*: O painel de controles pode ser recolhido com 1 clique (ou atalho de teclado), deixando 100% da tela para o feed simulado.
  - *Vantagem*: Atende diretamente ao requisito de não sobrecarregar a tela nem desviar a atenção visual.
- **Modo Comparativo Limpo**:
  - *Decisão*: Três cartões elegantes lado a lado mostrando a thumbnail em escala real (TV em escala reduzida proporcional, Desktop 16:9 padrão e Mobile miniatura), com opção de inspecionar detalhes com lente de aumento interativa sem encher a tela de gráficos ou números irrelevantes.
- **Ausência de Gráficos e Métricas Artificiais**:
  - *Decisão*: Não incluir pontuações fabricadas ("95% score") ou relatórios poluídos. Em vez disso, fornecer testes visuais objetivos (Escala de cinza e Desfoque).

---

### 4. Technical Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    ThumbPreview Studio                          │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ Slim Top Bar (Device Switcher, Safe Areas, Theme, Filters) │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌────────────────────────┬──────────────────────────────────┐  │
│  │ Compact Sidebar        │ Main Viewport                    │  │
│  │ (Collapsible)          │                                  │  │
│  │ - Quick Upload         │ - Clean Device Frame             │  │
│  │ - Video Title Input    │ - Authentic YouTube Feed         │  │
│  │ - Channel & Duration   │   (TV / Desktop / Mobile)        │  │
│  │ - Sample Presets       │ - Or Side-by-Side Comparison     │  │
│  │ - Safe Area Legend     │ - Non-intrusive Overlay Guides   │  │
│  └────────────────────────┴──────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

#### Módulos de Código
- `src/App.tsx`: Orquestração simples do estado e layout responsivo.
- `src/components/TopBar.tsx`: Barra de navegação enxuta com controles essenciais.
- `src/components/EditorSidebar.tsx`: Painel lateral limpo e recolhível com upload e inputs.
- `src/components/SafeZoneOverlay.tsx`: Camada SVG/CSS precisa das safe areas com toggle suave.
- `src/components/feeds/`:
  - `MobileFeed.tsx`: Simulação do app do YouTube mobile.
  - `DesktopFeed.tsx`: Simulação da home page do YouTube no computador.
  - `TvFeed.tsx`: Simulação da interface do YouTube para Smart TV.
- `src/components/ComparisonView.tsx`: Comparador limpo de dispositivos lado a lado com sincronização de foco.
- `src/types/index.ts`: Tipagens dos dados do vídeo e configurações.
