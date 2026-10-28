import React from 'react';
import { SafeZoneSettings } from '../types';

interface SafeZoneOverlayProps {
  duration: string;
  isLive?: boolean;
  progressPercent?: number;
  settings: SafeZoneSettings;
  device?: 'mobile' | 'desktop' | 'tv' | 'compare';
}

export const SafeZoneOverlay: React.FC<SafeZoneOverlayProps> = ({
  duration,
  isLive = false,
  progressPercent = 0,
  settings,
  device = 'desktop',
}) => {
  if (!settings.showOverlays) {
    // Modo padrão autêntico do YouTube (apenas os elementos reais)
    return (
      <div className="absolute inset-0 pointer-events-none select-none">
        {/* Barra de progresso real do YouTube (se houver) */}
        {progressPercent > 0 && !isLive && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/40">
            <div
              className="h-full bg-red-600"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        )}

        {/* Badge de Duração / Ao Vivo do YouTube */}
        {isLive ? (
          <div className="absolute bottom-2 right-2 bg-red-600 text-white font-bold text-[11px] leading-tight px-1.5 py-0.5 rounded tracking-wide flex items-center gap-1 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            AO VIVO
          </div>
        ) : (
          <div className="absolute bottom-2 right-2 bg-black/85 text-white font-medium text-[11px] leading-none px-1.5 py-1 rounded tracking-tight shadow-sm font-mono">
            {duration}
          </div>
        )}
      </div>
    );
  }

  // MODO SAFE-AREAS ATIVADO (Inspeção visual limpa sem legendas obstrutivas)
  return (
    <div className="absolute inset-0 pointer-events-none select-none z-20">
      {/* 1. Safe Zone Recomendada (Área Verde Central 80% do espaço - borda tracejada limpa) */}
      {settings.highlightSafeZone && (
        <div className="absolute inset-[10%] border-2 border-emerald-400/80 border-dashed rounded-lg bg-emerald-500/5" />
      )}

      {/* 2. Zona de Duração (Canto Inferior Direito - contorno vermelho de risco) */}
      {settings.highlightTimeBadge && (
        <div className="absolute bottom-1 right-1 w-[26%] max-w-[85px] h-[20%] max-h-[34px] min-h-[24px] bg-red-600/35 border-2 border-red-500 rounded flex items-center justify-center p-0.5 shadow-sm">
          {isLive ? (
            <div className="bg-red-600 text-white font-bold text-[10px] leading-tight px-1.5 py-0.5 rounded tracking-wide flex items-center gap-1 shadow">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              AO VIVO
            </div>
          ) : (
            <div className="bg-black/90 text-white font-medium text-[10px] px-1.5 py-0.5 rounded font-mono shadow">
              {duration}
            </div>
          )}
        </div>
      )}

      {/* 3. Zona Superior Direita (Ações no Hover no Desktop - contorno sutil) */}
      {device === 'desktop' && (
        <div className="absolute top-1.5 right-1.5 w-[18%] max-w-[55px] h-[30%] max-h-[50px] bg-amber-500/20 border border-amber-400/70 border-dashed rounded" />
      )}

      {/* 4. Barra de Progresso Vermelha na Base */}
      {settings.highlightProgressBar && (
        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-red-600/90" />
      )}
    </div>
  );
};
