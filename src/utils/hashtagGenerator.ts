/**
 * Gerador inteligente de hashtags otimizadas para YouTube com base no título do vídeo.
 * Funciona 100% no cliente (sem depender de APIs externas para funcionar no Cloudflare Pages).
 */

interface NicheRule {
  keywords: string[];
  tags: string[];
}

const NICHE_DATABASE: NicheRule[] = [
  {
    keywords: ['iphone', 'samsung', 'xiaomi', 'celular', 'smartphone', 'tech', 'review', 'analise', 'setup', 'pc', 'notebook', 'hardware', 'gpu', 'processador', 'camera', 'fone', 'apple', 'android', 'unboxing', 'vale a pena', 'teste'],
    tags: ['#Tecnologia', '#TechBrasil', '#Review', '#Smartphones', '#Unboxing', '#Gadgets', '#ValeAPena', '#Setup', '#Inovacao', '#Hardware'],
  },
  {
    keywords: ['game', 'gameplay', 'jogo', 'jogando', 'chefao', 'speedrun', 'playstation', 'ps5', 'xbox', 'nintendo', 'gta', 'minecraft', 'roblox', 'fortnite', 'valorant', 'lol', 'dificuldade', 'zerando', 'dicas'],
    tags: ['#Games', '#Gameplay', '#Gamer', '#Jogos', '#GamingBrasil', '#GamePass', '#ProPlayer', '#DicasDeJogos', '#GameplayBR', '#Streamer'],
  },
  {
    keywords: ['investir', 'investimento', 'dinheiro', 'renda', 'mil', 'reais', 'financas', 'economia', 'acoes', 'bolsa', 'cripto', 'bitcoin', 'lucro', 'carteira', 'tesouro', 'dividendos', 'poupanca', 'rico'],
    tags: ['#Financas', '#Investimentos', '#EducacaoFinanceira', '#Dinheiro', '#RendaExtra', '#BolsaDeValores', '#Economia', '#Cripto', '#PlanejamentoFinanceiro', '#LiberdadeFinanceira'],
  },
  {
    keywords: ['viagem', 'viajar', 'perdido', '24h', '24 horas', 'rotina', 'vlog', 'tour', 'dia a dia', 'toquio', 'cidade', 'pais', 'mundo', 'desafio', 'turismo', 'experiencia', 'restaurante', 'comida'],
    tags: ['#Vlog', '#Viagem', '#Turismo', '#VlogDeViagem', '#Aventura', '#Experiencia', '#Cultura', '#PeloMundo', '#DiaADia', '#Rotina'],
  },
  {
    keywords: ['thumbnail', 'thumb', 'ctr', 'youtube', 'canal', 'inscritos', 'visualizacoes', 'algoritmo', 'views', 'edicao', 'audiencia', 'video', 'design', 'photoshop', 'canva'],
    tags: ['#YouTubeBrasil', '#Thumbnails', '#DicasParaYouTube', '#CriadoresDeConteudo', '#MarketingDigital', '#DesignGrafico', '#CrescerNoYouTube', '#CTR', '#EdicaoDeVideo', '#YouTubeStudio'],
  },
  {
    keywords: ['tutorial', 'como fazer', 'passo a passo', 'guia', 'completo', 'do zero', 'iniciante', 'aprenda', 'curso', 'facil', 'dica', 'truque'],
    tags: ['#Tutorial', '#ComoFazer', '#PassoAPasso', '#GuiaCompleto', '#AprendaRapido', '#DicasPraticas', '#Iniciantes', '#DoZero'],
  },
];

const GENERAL_POPULAR_TAGS = [
  '#YouTube',
  '#Viral',
  '#EmAlta',
  '#Brasil',
  '#VideoNovo',
  '#Conteudo',
];

// Transforma uma palavra ou frase em formato PascalCase válido para hashtag
function toHashtag(str: string): string {
  const clean = str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove acentos
    .replace(/[^a-zA-Z0-9]/g, ''); // apenas alfanuméricos
  if (!clean || clean.length < 2) return '';
  return `#${clean.charAt(0).toUpperCase()}${clean.slice(1)}`;
}

export function generateHashtagsFromTitle(title: string): string[] {
  if (!title || title.trim().length === 0) {
    return ['#YouTube', '#VideoNovo', '#CriadoresDeConteudo'];
  }

  const normalizedTitle = title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  const words = title
    .replace(/[^\w\s]/gi, ' ')
    .split(/\s+/)
    .filter((w) => w.length >= 3 && !['com', 'para', 'sem', 'dos', 'das', 'uma', 'que', 'mais', 'como', 'esse', 'esta', 'este'].includes(w.toLowerCase()));

  const foundTags = new Set<string>();

  // 1. Tags extraídas diretamente dos termos do título
  words.slice(0, 4).forEach((word) => {
    const tag = toHashtag(word);
    if (tag && tag.length >= 3 && tag.length <= 20) {
      foundTags.add(tag);
    }
  });

  // 2. Busca por nicho no banco de regras
  NICHE_DATABASE.forEach((rule) => {
    const matchesNiche = rule.keywords.some((kw) => normalizedTitle.includes(kw));
    if (matchesNiche) {
      rule.tags.forEach((tag) => foundTags.add(tag));
    }
  });

  // 3. Completa com tags gerais se necessário
  GENERAL_POPULAR_TAGS.forEach((tag) => {
    if (foundTags.size < 10) {
      foundTags.add(tag);
    }
  });

  return Array.from(foundTags).slice(0, 12);
}
