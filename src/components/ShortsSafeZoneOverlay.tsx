import React from 'react';
import { ThumbsUp, MessageSquare, Share2, Disc, Bell, Search, Camera } from 'lucide-react';
import { SafeZoneSettings } from '../types';

interface ShortsSafeZoneOverlayProps {
  settings: SafeZoneSettings;
  mode: 'player' | 'shelf' | 'compare';
}

export const ShortsSafeZoneOverlay: React.FC<ShortsSafeZoneOverlayProps> = ({
  settings,
  mode,
}) => {
  if (!settings.showOverlays) return null;

  if (mode === 'shelf') {
    // Modo de Prateleira do Feed (Grid de Shorts no YouTube)
    return (
      <div className="absolute inset-0 pointer-events-none select-none">
        {/* Zona Segura Central Recomendada */}
        {settings.highlightSafeZone && (
          <div className="absolute inset-x-[8%] inset-y-[12%] border-2 border-dashed border-emerald-400/60 rounded-xl" />
        )}

        {/* Gradiente inferior característico onde o título do feed fica sobreposto */}
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        {/* Ícone Shorts no canto superior esquerdo */}
        <div className="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur-sm px-1.5 py-0.5 rounded flex items-center gap-1 border border-white/20">
          <svg className="w-3 h-3 text-red-500 fill-current" viewBox="0 0 24 24">
            <path d="M10 14.65v-5.3L15 12l-5 2.65zm7.82-7.85l-.8-.44c-.75-.41-1.6-.45-2.38-.11l.96-.53c1.78-.98 2.45-3.21 1.47-4.99-1-1.78-3.24-2.45-5.02-1.47L4.54 3.49C2.96 4.36 2.05 6 2.09 7.78c.04 1.77 1 3.39 2.58 4.26l.8.44c.75.41 1.6.45 2.38.11l-.96.53c-1.78.98-2.45 3.21-1.47 4.99 1 1.78 3.24 2.45 5.02 1.47l7.51-4.24c1.58-.87 2.49-2.51 2.45-4.29-.04-1.78-1-3.4-2.58-4.26z" />
          </svg>
          <span className="text-[10px] font-bold text-white tracking-wider">SHORTS</span>
        </div>
      </div>
    );
  }

  // Modo Player Vertical em Tela Cheia (Simulação completa dos botões do YouTube Shorts)
  return (
    <div className="absolute inset-0 pointer-events-none select-none">
      {/* 1. TOPO: HEADER DO SHORTS */}
      <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-black/70 to-transparent flex items-center justify-between px-4 pt-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-white">Shorts</span>
        </div>
        <div className="flex items-center gap-3 text-white">
          <Search className="w-4 h-4" />
          <Camera className="w-4 h-4" />
          <Bell className="w-4 h-4" />
        </div>
      </div>

      {/* 2. ZONA SEGURA CENTRAL (ÁREA LIVRE DE BOTÕES E TEXTOS) */}
      {settings.highlightSafeZone && (
        <div className="absolute inset-x-[10%] top-[14%] bottom-[22%] border-2 border-dashed border-emerald-400/60 rounded-2xl">
          <div className="absolute top-2 left-2 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[9px] font-bold px-1.5 py-0.5 rounded">
            ÁREA LIVRE DE OBSTRUÇÃO
          </div>
        </div>
      )}

      {/* 3. COLUNA DIREITA: BOTÕES DE INTERAÇÃO DO SHORTS */}
      <div className="absolute right-2 bottom-20 flex flex-col items-center gap-3.5">
        {/* Like */}
        <div className="flex flex-col items-center gap-0.5">
          <div className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white">
            <ThumbsUp className="w-4 h-4" />
          </div>
          <span className="text-[9px] font-bold text-white shadow">128K</span>
        </div>

        {/* Dislike */}
        <div className="flex flex-col items-center gap-0.5">
          <div className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white">
            <ThumbsUp className="w-4 h-4 rotate-180" />
          </div>
          <span className="text-[9px] font-bold text-white shadow">Não gostei</span>
        </div>

        {/* Comentários */}
        <div className="flex flex-col items-center gap-0.5">
          <div className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white">
            <MessageSquare className="w-4 h-4" />
          </div>
          <span className="text-[9px] font-bold text-white shadow">1.4K</span>
        </div>

        {/* Compartilhar */}
        <div className="flex flex-col items-center gap-0.5">
          <div className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white">
            <Share2 className="w-4 h-4" />
          </div>
          <span className="text-[9px] font-bold text-white shadow">Compartilhar</span>
        </div>

        {/* Disco de Áudio Girando */}
        <div className="w-8 h-8 rounded-full bg-neutral-900 border-2 border-white/30 flex items-center justify-center text-white animate-spin">
          <Disc className="w-4 h-4 text-red-500" />
        </div>
      </div>

      {/* 4. BASE: GRADIENTE & INFORMAÇÕES DO CANAL */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end p-3 pb-3 pr-14">
        {/* Barra de Progresso do Short na Base */}
        {settings.highlightProgressBar && (
          <div className="absolute bottom-0 inset-x-0 h-1 bg-white/20">
            <div className="h-full bg-red-600 w-3/5" />
          </div>
        )}
      </div>
    </div>
  );
};
