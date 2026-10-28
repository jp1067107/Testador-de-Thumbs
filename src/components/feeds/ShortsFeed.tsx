import React, { useState } from 'react';
import {
  Smartphone,
  Grid,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { VideoData, SafeZoneSettings, VisualFilter, ThemeMode } from '../../types';
import { ShortsSafeZoneOverlay } from '../ShortsSafeZoneOverlay';

interface ShortsFeedProps {
  userShort: VideoData;
  userShortB?: VideoData;
  isCompareActive: boolean;
  competitors: VideoData[];
  safeSettings: SafeZoneSettings;
  filter: VisualFilter;
  theme: ThemeMode;
}

export const ShortsFeed: React.FC<ShortsFeedProps> = ({
  userShort,
  userShortB,
  isCompareActive,
  competitors,
  safeSettings,
  filter,
  theme,
}) => {
  const isDark = theme === 'dark';
  const [viewMode, setViewMode] = useState<'shelf' | 'player'>('shelf');
  const [selectedPlayerThumb, setSelectedPlayerThumb] = useState<'A' | 'B'>('A');

  const filterClass =
    filter === 'grayscale'
      ? 'grayscale'
      : filter === 'blur'
      ? 'blur-[2px]'
      : '';

  // Intercalamos Thumb A e Thumb B com os concorrentes
  const shelfList = isCompareActive && userShortB
    ? [
        { type: 'userA', video: userShort, label: '★ Thumb A (Principal)' },
        { type: 'comp', video: competitors[0] },
        { type: 'userB', video: userShortB, label: '⚡ Thumb B (Comparação)' },
        { type: 'comp', video: competitors[1] },
        { type: 'comp', video: competitors[2] },
        { type: 'comp', video: competitors[3] },
      ]
    : [
        { type: 'userA', video: userShort, label: '★ Thumb A (Principal)' },
        { type: 'comp', video: competitors[0] },
        { type: 'comp', video: competitors[1] },
        { type: 'comp', video: competitors[2] },
        { type: 'comp', video: competitors[3] },
      ];

  const activePlayerShort =
    selectedPlayerThumb === 'B' && userShortB ? userShortB : userShort;

  return (
    <div className="w-full flex flex-col gap-5 select-none pb-10">
      {/* Barra de Seleção de Modo do Shorts */}
      <div
        className={`p-3 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
          isDark ? 'bg-[#161616] border-neutral-800' : 'bg-white border-neutral-200'
        }`}
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-red-600/15 text-red-600 flex items-center justify-center font-bold">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M10 14.65v-5.3L15 12l-5 2.65zm7.82-7.85l-.8-.44c-.75-.41-1.6-.45-2.38-.11l.96-.53c1.78-.98 2.45-3.21 1.47-4.99-1-1.78-3.24-2.45-5.02-1.47L4.54 3.49C2.96 4.36 2.05 6 2.09 7.78c.04 1.77 1 3.39 2.58 4.26l.8.44c.75.41 1.6.45 2.38.11l-.96.53c-1.78.98-2.45 3.21-1.47 4.99 1 1.78 3.24 2.45 5.02 1.47l7.51-4.24c1.58-.87 2.49-2.51 2.45-4.29-.04-1.78-1-3.4-2.58-4.26z" />
            </svg>
          </div>
          <div>
            <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
              <span>Simulador de YouTube Shorts</span>
              <span className="text-[10px] font-normal text-neutral-400 font-mono">(9:16 Vertical)</span>
            </h3>
            <p className="text-[11px] text-neutral-400">
              Valide suas thumbnails verticais na prateleira do feed e no player imersivo
            </p>
          </div>
        </div>

        {/* Alternador: Grade do Feed vs Player de Shorts */}
        <div className="flex items-center gap-2">
          <div className="flex p-0.5 rounded-xl border border-neutral-700 bg-neutral-800 text-xs">
            <button
              onClick={() => setViewMode('shelf')}
              className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-colors ${
                viewMode === 'shelf'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>Grade do Feed</span>
            </button>
            <button
              onClick={() => setViewMode('player')}
              className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-colors ${
                viewMode === 'player'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Player Imersivo</span>
            </button>
          </div>
        </div>
      </div>

      {/* 1. MODO PRATELEIRA / GRID DO FEED DE SHORTS */}
      {viewMode === 'shelf' && (
        <div
          className={`p-4 sm:p-6 rounded-2xl border ${
            isDark ? 'bg-[#0f0f0f] border-neutral-800' : 'bg-white border-neutral-200'
          }`}
        >
          {/* Cabeçalho da Seção de Shorts do YouTube */}
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-neutral-800">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-red-600 fill-current" viewBox="0 0 24 24">
                <path d="M10 14.65v-5.3L15 12l-5 2.65zm7.82-7.85l-.8-.44c-.75-.41-1.6-.45-2.38-.11l.96-.53c1.78-.98 2.45-3.21 1.47-4.99-1-1.78-3.24-2.45-5.02-1.47L4.54 3.49C2.96 4.36 2.05 6 2.09 7.78c.04 1.77 1 3.39 2.58 4.26l.8.44c.75.41 1.6.45 2.38.11l-.96.53c-1.78.98-2.45 3.21-1.47 4.99 1 1.78 3.24 2.45 5.02 1.47l7.51-4.24c1.58-.87 2.49-2.51 2.45-4.29-.04-1.78-1-3.4-2.58-4.26z" />
              </svg>
              <h2 className="text-base font-bold text-white tracking-tight">Shorts</h2>
            </div>
            <span className="text-xs text-neutral-400">
              {isCompareActive && userShortB ? 'Comparando Thumb A e Thumb B' : 'Visualizando no Feed'}
            </span>
          </div>

          {/* Grid de Cards 9:16 Verticais */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5">
            {shelfList.map((item, idx) => {
              const isUser = item.type === 'userA' || item.type === 'userB';
              const vid = item.video;

              return (
                <div
                  key={`${vid.id}-${idx}`}
                  className={`flex flex-col group relative rounded-2xl overflow-hidden transition-all duration-200 ${
                    isUser
                      ? item.type === 'userA'
                        ? 'ring-2 ring-red-500 shadow-lg shadow-red-500/10'
                        : 'ring-2 ring-blue-500 shadow-lg shadow-blue-500/10'
                      : 'hover:brightness-105'
                  }`}
                >
                  {/* Badge superior indicando Thumb do Criador */}
                  {isUser && (
                    <div
                      className={`px-2 py-0.5 text-[9px] font-bold text-center tracking-wide text-white uppercase ${
                        item.type === 'userA' ? 'bg-red-600' : 'bg-blue-600'
                      }`}
                    >
                      {item.type === 'userA' ? 'Thumb A' : 'Thumb B (Comp.)'}
                    </div>
                  )}

                  {/* Thumbnail 9:16 Vertical */}
                  <div
                    className={`relative aspect-[9/16] w-full overflow-hidden bg-black ${filterClass}`}
                  >
                    <img
                      src={vid.thumbnailUrl}
                      alt={vid.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />

                    {/* Safe zone overlay do Shorts */}
                    {isUser && (
                      <ShortsSafeZoneOverlay
                        settings={safeSettings}
                        mode="shelf"
                      />
                    )}

                    {/* Título e Views sobrepostos na base do Short (estilo autêntico do YouTube) */}
                    <div className="absolute inset-x-0 bottom-0 p-2.5 bg-gradient-to-t from-black/95 via-black/60 to-transparent flex flex-col justify-end">
                      <h4
                        className="text-[11px] font-semibold text-white leading-tight line-clamp-2 drop-shadow"
                        title={vid.title}
                      >
                        {vid.title}
                      </h4>
                      <span className="text-[10px] text-neutral-300 mt-1 font-medium">
                        {vid.views}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. MODO PLAYER VERTICAL EM TELA CHEIA */}
      {viewMode === 'player' && (
        <div className="flex flex-col items-center gap-4">
          {/* Seletor de Thumb no Player se houver 2 thumbs ativas */}
          {userShortB && (
            <div className="flex items-center gap-2 p-1 rounded-xl border border-neutral-700 bg-neutral-800 text-xs">
              <button
                onClick={() => setSelectedPlayerThumb('A')}
                className={`px-3 py-1 rounded-lg font-bold transition-colors ${
                  selectedPlayerThumb === 'A'
                    ? 'bg-red-600 text-white'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Player com Thumb A
              </button>
              <button
                onClick={() => setSelectedPlayerThumb('B')}
                className={`px-3 py-1 rounded-lg font-bold transition-colors ${
                  selectedPlayerThumb === 'B'
                    ? 'bg-blue-600 text-white'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Player com Thumb B
              </button>
            </div>
          )}

          {/* Moldura de Smartphone com o Player 9:16 Vertical */}
          <div className="relative w-full max-w-[340px] aspect-[9/16] rounded-[36px] overflow-hidden border-[6px] border-neutral-800 shadow-2xl bg-black">
            {/* Notch da câmera frontal */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-4 bg-black rounded-full z-20 flex items-center justify-center">
              <span className="w-2.5 h-2.5 rounded-full bg-neutral-900 border border-neutral-700" />
            </div>

            {/* Imagem do Short em tela cheia */}
            <img
              src={activePlayerShort.thumbnailUrl}
              alt={activePlayerShort.title}
              className={`w-full h-full object-cover ${filterClass}`}
              referrerPolicy="no-referrer"
            />

            {/* Overlay com os botões reais do player de Shorts */}
            <ShortsSafeZoneOverlay
              settings={safeSettings}
              mode="player"
            />

            {/* Informações do Canal e Título no Player */}
            <div className="absolute bottom-4 left-3 right-16 z-10 pointer-events-none">
              <div className="flex items-center gap-2 mb-1.5">
                <img
                  src={activePlayerShort.channelAvatar}
                  alt={activePlayerShort.channelName}
                  className="w-8 h-8 rounded-full border border-white/20 object-cover"
                />
                <span className="text-xs font-bold text-white truncate shadow">
                  @{activePlayerShort.channelName.replace(/\s+/g, '').toLowerCase()}
                </span>
                <span className="bg-red-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                  Inscrever-se
                </span>
              </div>
              <h3 className="text-xs font-medium text-white line-clamp-2 leading-snug drop-shadow-md">
                {activePlayerShort.title}
              </h3>
            </div>
          </div>

          <div className="text-center max-w-md text-xs text-neutral-400">
            <span className="flex items-center justify-center gap-1 font-semibold text-emerald-400 mb-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Dica de Safe Zone para Shorts
            </span>
            Mantenha elementos de texto e rostos dentro da área central delimitada pela linha verde tracejada para evitar que sejam cobertos pelos botões de interação da direita ou pelo título na base.
          </div>
        </div>
      )}
    </div>
  );
};
