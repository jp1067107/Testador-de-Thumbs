import { VideoData } from '../types';

// SVGs estilizados de alta qualidade como data URIs garantem zero quebras de imagem
function createThumbSvg(
  bgGradient: [string, string],
  titleLine1: string,
  titleLine2: string,
  accentColor: string,
  category: string,
  emojiOrBadge: string
): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="1280" height="720">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${bgGradient[0]}" />
        <stop offset="100%" stop-color="${bgGradient[1]}" />
      </linearGradient>
      <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="${accentColor}" />
        <stop offset="100%" stop-color="#ffffff" />
      </linearGradient>
      <radialGradient id="glow" cx="80%" cy="30%" r="50%">
        <stop offset="0%" stop-color="${accentColor}" stop-opacity="0.3" />
        <stop offset="100%" stop-color="#000000" stop-opacity="0" />
      </radialGradient>
    </defs>
    <rect width="1280" height="720" fill="url(#bg)"/>
    <rect width="1280" height="720" fill="url(#glow)"/>
    <!-- Grid decorativa sutil -->
    <path d="M0 180 H1280 M0 360 H1280 M0 540 H1280 M320 0 V720 M640 0 V720 M960 0 V720" stroke="rgba(255,255,255,0.04)" stroke-width="2"/>
    
    <!-- Elemento gráfico lateral -->
    <circle cx="1020" cy="380" r="220" fill="rgba(255,255,255,0.06)" stroke="${accentColor}" stroke-width="6"/>
    <text x="1020" y="440" font-family="system-ui, sans-serif" font-weight="900" font-size="140" fill="#ffffff" text-anchor="middle">${emojiOrBadge}</text>

    <!-- Tag Categoria -->
    <rect x="90" y="100" width="220" height="56" rx="10" fill="${accentColor}"/>
    <text x="200" y="138" font-family="system-ui, sans-serif" font-weight="800" font-size="28" fill="#000000" text-anchor="middle" letter-spacing="2">${category}</text>

    <!-- Título Principal da Thumb -->
    <text x="90" y="270" font-family="system-ui, sans-serif" font-weight="900" font-size="82" fill="#ffffff" filter="drop-shadow(0 6px 12px rgba(0,0,0,0.8))">${titleLine1}</text>
    <text x="90" y="380" font-family="system-ui, sans-serif" font-weight="900" font-size="94" fill="url(#accent)" filter="drop-shadow(0 8px 16px rgba(0,0,0,0.9))">${titleLine2}</text>
    
    <!-- Destaque visual inferior -->
    <rect x="90" y="440" width="460" height="12" rx="6" fill="${accentColor}"/>
    <text x="90" y="520" font-family="system-ui, sans-serif" font-weight="700" font-size="34" fill="#e2e8f0">ATENÇÃO AOS DETALHES</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

// SVGs 9:16 para simular Thumbnails verticais de Shorts com alta definição
function createShortSvg(
  bgGradient: [string, string],
  headline: string,
  sub: string,
  accentColor: string,
  badge: string,
  emoji: string
): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 1280" width="720" height="1280">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="${bgGradient[0]}" />
        <stop offset="100%" stop-color="${bgGradient[1]}" />
      </linearGradient>
      <radialGradient id="glow" cx="50%" cy="38%" r="48%">
        <stop offset="0%" stop-color="${accentColor}" stop-opacity="0.4" />
        <stop offset="100%" stop-color="#000000" stop-opacity="0" />
      </radialGradient>
    </defs>
    <rect width="720" height="1280" fill="url(#bg)"/>
    <rect width="720" height="1280" fill="url(#glow)"/>
    
    <!-- Elemento central de destaque -->
    <circle cx="360" cy="500" r="160" fill="rgba(255,255,255,0.06)" stroke="${accentColor}" stroke-width="6"/>
    <text x="360" y="560" font-family="system-ui, sans-serif" font-weight="900" font-size="140" fill="#ffffff" text-anchor="middle">${emoji}</text>

    <!-- Tag Categoria Superior (acima dos botões laterais) -->
    <rect x="250" y="240" width="220" height="54" rx="27" fill="${accentColor}"/>
    <text x="360" y="276" font-family="system-ui, sans-serif" font-weight="800" font-size="24" fill="#000000" text-anchor="middle" letter-spacing="2">${badge}</text>

    <!-- Título Principal Vertical no Centro Seguro -->
    <text x="360" y="750" font-family="system-ui, sans-serif" font-weight="900" font-size="62" fill="#ffffff" text-anchor="middle" filter="drop-shadow(0 6px 12px rgba(0,0,0,0.8))">${headline}</text>
    <text x="360" y="830" font-family="system-ui, sans-serif" font-weight="900" font-size="54" fill="${accentColor}" text-anchor="middle" filter="drop-shadow(0 8px 16px rgba(0,0,0,0.9))">${sub}</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export const PRESET_THUMBNAILS = [
  {
    id: 'tech',
    label: 'Tecnologia / Review',
    title: 'iPhone 16 Pro: 30 Dias Depois! Vale a Pena em 2026?',
    channelName: 'Tech Brasil Análise',
    channelAvatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=techbr',
    duration: '14:32',
    views: '245 mil visualizações',
    timeAgo: 'há 2 dias',
    url: createThumbSvg(['#090d16', '#1a2333'], 'NÃO COMPRE ANTES', 'DE VER ISSO!', '#38bdf8', 'ANÁLISE', '⚡'),
  },
  {
    id: 'gaming',
    label: 'Games / Gameplay',
    title: 'DERROTEI O CHEFÃO SECRETO NA DIFICULDADE IMPOSSÍVEL!',
    channelName: 'PixelMaster Games',
    channelAvatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=pixelmaster',
    duration: '28:15',
    views: '512 mil visualizações',
    timeAgo: 'há 18 horas',
    url: createThumbSvg(['#18062b', '#3b0764'], 'O MAIOR DESAFIO', 'DO JOGO!', '#c084fc', 'GAMEPLAY', '🎮'),
  },
  {
    id: 'finance',
    label: 'Finanças / Investimentos',
    title: 'Como Investir R$ 1.000 em 2026: Guia Completo Passo a Passo',
    channelName: 'Finanças com Estratégia',
    channelAvatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=financas',
    duration: '19:48',
    views: '189 mil visualizações',
    timeAgo: 'há 4 dias',
    url: createThumbSvg(['#052e16', '#14532d'], 'R$ 1.000 HOJE', 'VALEM QUANTO?', '#4ade80', 'FINANÇAS', '📈'),
  },
  {
    id: 'travel',
    label: 'Vlog / Viagem',
    title: '24 Horas Perdido no Bairro Mais Tecnológico de Tóquio',
    channelName: 'Lucas Pelo Mundo',
    channelAvatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=lucasviaja',
    duration: '22:05',
    views: '830 mil visualizações',
    timeAgo: 'há 1 semana',
    url: createThumbSvg(['#450a0a', '#7f1d1d'], '24H PERDIDO', 'EM TÓQUIO!', '#f87171', 'VIAGEM', '✈️'),
  },
];

export const INITIAL_USER_VIDEO: VideoData = {
  id: 'user-tested-video',
  title: 'COMO CRIAR THUMBNAILS DE ALTO CTR NO YOUTUBE (O Segredo Revelado)',
  channelName: 'Seu Canal no YouTube',
  channelAvatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=creatorstudio',
  views: '124 mil visualizações',
  timeAgo: 'há 3 horas',
  duration: '15:20',
  thumbnailUrl: PRESET_THUMBNAILS[0].url,
  isLive: false,
  verified: true,
  progressPercent: 35,
};

export const INITIAL_USER_VIDEO_B: VideoData = {
  id: 'user-tested-video-b',
  title: 'COMO CRIAR THUMBNAILS DE ALTO CTR NO YOUTUBE (O Segredo Revelado)',
  channelName: 'Seu Canal no YouTube',
  channelAvatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=creatorstudio',
  views: '124 mil visualizações',
  timeAgo: 'há 3 horas',
  duration: '15:20',
  thumbnailUrl: PRESET_THUMBNAILS[1].url,
  isLive: false,
  verified: true,
  progressPercent: 35,
};

// Vídeos simulados de feed ao redor para criar o ambiente realista do YouTube
export const FEED_COMPETITOR_VIDEOS: VideoData[] = [
  {
    id: 'comp-1',
    title: 'Construí um Setup Minimalista do Zero com R$ 5.000',
    channelName: 'Studio Tech Life',
    channelAvatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=studiotech',
    views: '420 mil visualizações',
    timeAgo: 'há 1 dia',
    duration: '18:04',
    thumbnailUrl: createThumbSvg(['#111827', '#1f2937'], 'SETUP MINIMALISTA', 'POR R$ 5.000', '#f59e0b', 'SETUP', '🖥️'),
    verified: true,
  },
  {
    id: 'comp-2',
    title: 'A Verdade Chocante Sobre Inteligência Artificial em 2026',
    channelName: 'Futuro Conectado',
    channelAvatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=futuro',
    views: '1,2 mi de visualizações',
    timeAgo: 'há 3 dias',
    duration: '31:40',
    thumbnailUrl: createThumbSvg(['#030712', '#0f172a'], 'A IA MUDOU TUDO', 'O QUE ESPERAR?', '#38bdf8', 'TECNOLOGIA', '🤖'),
    verified: true,
  },
  {
    id: 'comp-3',
    title: 'AO VIVO: Finais do Campeonato Mundial de Speedrun 2026',
    channelName: 'Global Esports BR',
    channelAvatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=esportsbr',
    views: '45 mil assistindo agora',
    timeAgo: 'Ao vivo',
    duration: 'AO VIVO',
    thumbnailUrl: createThumbSvg(['#450a0a', '#1e1b4b'], 'FINAIS DO MUNDIAL', 'AO VIVO AGORA!', '#ef4444', 'ESPORTS', '🏆'),
    isLive: true,
    verified: true,
  },
  {
    id: 'comp-4',
    title: '5 Hábitos Que Mudaram Minha Produtividade para Sempre',
    channelName: 'Mentalidade Ágil',
    channelAvatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=mentalaudio',
    views: '315 mil visualizações',
    timeAgo: 'há 5 dias',
    duration: '11:15',
    thumbnailUrl: createThumbSvg(['#064e3b', '#022c22'], '5 HÁBITOS DE OURO', 'PRODUTIVIDADE', '#10b981', 'FOCO', '⏱️'),
  },
  {
    id: 'comp-5',
    title: 'Testei a Câmera Mais Cara do Mundo: Vale a Pena?',
    channelName: 'Cineastas Sem Fronteiras',
    channelAvatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=cinema',
    views: '670 mil visualizações',
    timeAgo: 'há 1 semana',
    duration: '24:50',
    thumbnailUrl: createThumbSvg(['#1c1917', '#292524'], 'CÂMERA DE 50 MIL', 'IMAGEM DE CINEMA', '#eab308', 'CINEMA', '🎥'),
    verified: true,
  },
  {
    id: 'comp-6',
    title: 'React aos Piores Comerciais da História da TV Brasileira',
    channelName: 'Canal Nostalgia Pop',
    channelAvatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=nostalgiapop',
    views: '950 mil visualizações',
    timeAgo: 'há 2 semanas',
    duration: '16:42',
    thumbnailUrl: createThumbSvg(['#312e81', '#1e1b4b'], 'COMERCIAIS BIZARROS', 'COMO APROVARAM?', '#818cf8', 'REACT', '🤣'),
  },
];

// Dados Iniciais de Shorts (9:16)
export const INITIAL_SHORTS_VIDEO: VideoData = {
  id: 'user-short-a',
  title: 'O ERRO QUE TODO CRIADOR COMETE NO YOUTUBE SHORTS! 🚨',
  channelName: 'Seu Canal no YouTube',
  channelAvatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=creatorstudio',
  views: '840 mil visualizações',
  timeAgo: 'há 1 dia',
  duration: '0:45',
  thumbnailUrl: createShortSvg(['#3b0764', '#1e053a'], 'O MAIOR ERRO', 'NOS SHORTS!', '#f43f5e', 'DICAS YT', '🔥'),
  isLive: false,
  verified: true,
  progressPercent: 60,
};

export const INITIAL_SHORTS_VIDEO_B: VideoData = {
  id: 'user-short-b',
  title: 'COMO CRESCER NO YOUTUBE SHORTS RÁPIDO EM 2026! 📈',
  channelName: 'Seu Canal no YouTube',
  channelAvatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=creatorstudio',
  views: '1.2M visualizações',
  timeAgo: 'há 1 dia',
  duration: '0:52',
  thumbnailUrl: createShortSvg(['#064e3b', '#022c22'], 'CRESÇA RÁPIDO', 'EM 2026!', '#34d399', 'ALGORITMO', '🚀'),
  isLive: false,
  verified: true,
  progressPercent: 45,
};

export const FEED_COMPETITOR_SHORTS: VideoData[] = [
  {
    id: 'comp-short-1',
    title: 'POV: Você comprou o celular mais barato da internet 📱',
    channelName: 'TecnoLab BR',
    channelAvatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=tecnolab',
    views: '2.4M visualizações',
    timeAgo: 'há 3 dias',
    duration: '0:35',
    thumbnailUrl: createShortSvg(['#1e1b4b', '#312e81'], 'CELULAR DE R$ 90', 'FUNCIONA MESMO?', '#818cf8', 'REVIEW', '📱'),
  },
  {
    id: 'comp-short-2',
    title: 'A ilusão de ótica que 99% das pessoas erram! 🤯',
    channelName: 'Curiosidades Máximas',
    channelAvatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=curioso',
    views: '4.8M visualizações',
    timeAgo: 'há 5 dias',
    duration: '0:28',
    thumbnailUrl: createShortSvg(['#701a75', '#4a044e'], 'ILUSÃO DE ÓTICA', 'OLHE BEM!', '#f472b6', 'MISTÉRIO', '👁️'),
  },
  {
    id: 'comp-short-3',
    title: 'Fazendo o hambúrguer mais crocante do mundo em 1 minuto 🍔',
    channelName: 'Cozinha Express',
    channelAvatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=cozinha',
    views: '1.9M visualizações',
    timeAgo: 'há 2 dias',
    duration: '0:58',
    thumbnailUrl: createShortSvg(['#78350f', '#451a03'], 'HAMBÚRGUER SUPREMO', 'MUITO QUEIJO', '#fbbf24', 'RECEITA', '🍔'),
  },
  {
    id: 'comp-short-4',
    title: 'Como escapar de qualquer armadilha no Minecraft Hardcore ⛏️',
    channelName: 'CraftMaster',
    channelAvatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=craft',
    views: '3.1M visualizações',
    timeAgo: 'há 1 semana',
    duration: '0:42',
    thumbnailUrl: createShortSvg(['#14532d', '#052e16'], 'SOBREVIVÊNCIA', 'HARDCORE!', '#22c55e', 'GAMES', '⚔️'),
  },
];

