import React, { useState, useRef } from 'react';
import {
  Smartphone,
  Monitor,
  Tv,
  Target,
  ZoomIn,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { VideoData, SafeZoneSettings, VisualFilter, ThemeMode, FocalPoint } from '../types';
import { SafeZoneOverlay } from './SafeZoneOverlay';

interface ComparisonViewProps {
  userVideo: VideoData;
  safeSettings: SafeZoneSettings;
  filter: VisualFilter;
  theme: ThemeMode;
}

export const ComparisonView: React.FC<ComparisonViewProps> = ({
  userVideo,
  safeSettings,
  filter,
  theme,
}) => {
  const isDark = theme === 'dark';
  const [focalPoint, setFocalPoint] = useState<FocalPoint>({ x: 50, y: 50 });
  const [isInspecting, setIsInspecting] = useState<boolean>(true);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const bgCard = isDark ? 'bg-[#181818]' : 'bg-white';
  const borderCard = isDark ? 'border-[#2a2a2a]' : 'border-neutral-200';
  const textPrimary = isDark ? 'text-white' : 'text-neutral-900';
  const textSecondary = isDark ? 'text-neutral-400' : 'text-neutral-600';

  const filterClass =
    filter === 'grayscale'
      ? 'grayscale'
      : filter === 'blur'
      ? 'blur-[3px]'
      : '';

  // Manipulador de clique para definir ponto focal
  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return;
    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    setFocalPoint({ x, y });
  };

  // Verifica se o ponto focal atual está perigosamente perto da área de duração (canto inferior direito)
  const isFocalNearDanger = focalPoint.x > 68 && focalPoint.y > 68;

  return (
    <div className="w-full flex flex-col gap-6 select-none pb-12">
      {/* 1. SELETOR INTERATIVO DE PONTO FOCAL */}
      <div
        className={`p-4 sm:p-5 rounded-2xl border ${borderCard} ${bgCard} shadow-sm transition-colors`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-red-500 shrink-0" />
            <div>
              <h3 className={`text-sm font-bold ${textPrimary}`}>
                Ponto de Destaque & Inspeção de Foco
              </h3>
              <p className={`text-xs ${textSecondary}`}>
                Clique ou toque na imagem para posicionar a mira no elemento principal (rosto, texto ou logo)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsInspecting(!isInspecting)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                isInspecting
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'bg-neutral-500/10 hover:bg-neutral-500/20 text-neutral-300'
              }`}
            >
              <ZoomIn className="w-3.5 h-3.5" />
              <span>{isInspecting ? 'Lupa Ativa' : 'Ativar Lupa'}</span>
            </button>
          </div>
        </div>

        {/* Imagem Principal Interativa com Mira */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div
            ref={imageContainerRef}
            onClick={handleImageClick}
            className={`lg:col-span-8 relative aspect-video w-full rounded-xl overflow-hidden bg-black cursor-crosshair shadow-md border ${borderCard} ${filterClass}`}
          >
            <img
              src={userVideo.thumbnailUrl}
              alt={userVideo.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />

            <SafeZoneOverlay
              duration={userVideo.duration}
              isLive={userVideo.isLive}
              progressPercent={userVideo.progressPercent}
              settings={safeSettings}
              device="compare"
            />

            {/* Mira do Ponto Focal Limpa */}
            <div
              className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-all duration-75"
              style={{ left: `${focalPoint.x}%`, top: `${focalPoint.y}%` }}
            >
              <div className="relative flex items-center justify-center">
                <span className="w-8 h-8 rounded-full border-2 border-red-500 animate-ping absolute opacity-40" />
                <span className="w-6 h-6 rounded-full border-2 border-white bg-red-600/70 shadow-lg flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                </span>
              </div>
            </div>
          </div>

          {/* Painel Lateral da Lupa de Ampliação */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            <div className={`p-3.5 rounded-xl border ${borderCard} bg-neutral-500/5`}>
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xs font-semibold ${textPrimary} flex items-center gap-1.5`}>
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Legibilidade do Ponto Focal</span>
                </span>
                {isFocalNearDanger ? (
                  <span className="flex items-center gap-1 text-[10px] font-bold text-red-500 bg-red-500/10 px-2 py-0.5 rounded">
                    <ShieldAlert className="w-3 h-3" /> Risco de Obstrução
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded">
                    <ShieldCheck className="w-3 h-3" /> Zona Livre
                  </span>
                )}
              </div>

              {/* Janela de Zoom 2.5x centrada no ponto focal */}
              <div className="relative aspect-video w-full rounded-lg overflow-hidden border border-neutral-700/60 shadow-inner bg-black">
                <div
                  className="w-full h-full"
                  style={{
                    backgroundImage: `url(${userVideo.thumbnailUrl})`,
                    backgroundPosition: `${focalPoint.x}% ${focalPoint.y}%`,
                    backgroundSize: '280%',
                    backgroundRepeat: 'no-repeat',
                    filter:
                      filter === 'grayscale'
                        ? 'grayscale(100%)'
                        : filter === 'blur'
                        ? 'blur(2px)'
                        : 'none',
                  }}
                />
                <div className="absolute inset-0 border border-white/20 pointer-events-none" />
                <span className="absolute bottom-1 right-1 bg-black/80 text-[9px] font-mono text-white px-1.5 py-0.5 rounded">
                  Zoom 2.8x
                </span>
              </div>

              <p className={`text-[11px] ${textSecondary} mt-2.5 leading-relaxed`}>
                {isFocalNearDanger
                  ? 'Atenção: Seu ponto de destaque está no canto inferior direito, onde o selo de duração (00:00) cobrirá esse detalhe.'
                  : 'Ótimo posicionamento: Este elemento fica afastado dos selos e controles da interface do YouTube.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. COMPARAÇÃO SIMULTÂNEA DAS 3 TELAS */}
      <div>
        <div className="mb-4">
          <h3 className={`text-base font-bold ${textPrimary}`}>
            Visualização Comparativa em Escala Real
          </h3>
          <p className={`text-xs ${textSecondary}`}>
            Como a proporção e a compressão visual afetam a percepção do espectador
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {/* DISPOSITIVO 1: SMARTPHONE (Aproximadamente 70% das visualizações) */}
          <div
            className={`p-4 rounded-2xl border ${borderCard} ${bgCard} shadow-sm flex flex-col gap-3`}
          >
            <div className="flex items-center justify-between pb-2 border-b border-neutral-500/10">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-red-500/10 text-red-500 flex items-center justify-center">
                  <Smartphone className="w-4 h-4" />
                </div>
                <div>
                  <h4 className={`text-xs font-bold ${textPrimary}`}>Celular</h4>
                  <span className="text-[10px] text-neutral-400 font-mono">
                    Feed Mobile (~320px)
                  </span>
                </div>
              </div>
              <span className="text-[10px] font-semibold text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                ~72% do Tráfego
              </span>
            </div>

            {/* Thumbnail em escala mobile */}
            <div
              className={`relative aspect-video w-full rounded-lg overflow-hidden bg-black shadow ${filterClass}`}
            >
              <img
                src={userVideo.thumbnailUrl}
                alt={userVideo.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <SafeZoneOverlay
                duration={userVideo.duration}
                isLive={userVideo.isLive}
                progressPercent={userVideo.progressPercent}
                settings={safeSettings}
                device="mobile"
              />
            </div>

            {/* Título no Mobile */}
            <div>
              <p
                className={`text-xs font-semibold leading-snug line-clamp-2 ${textPrimary}`}
              >
                {userVideo.title}
              </p>
              <p className={`text-[11px] ${textSecondary} mt-1`}>
                {userVideo.channelName} · {userVideo.views}
              </p>
            </div>
          </div>

          {/* DISPOSITIVO 2: DESKTOP PC */}
          <div
            className={`p-4 rounded-2xl border ${borderCard} ${bgCard} shadow-sm flex flex-col gap-3`}
          >
            <div className="flex items-center justify-between pb-2 border-b border-neutral-500/10">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center">
                  <Monitor className="w-4 h-4" />
                </div>
                <div>
                  <h4 className={`text-xs font-bold ${textPrimary}`}>Computador</h4>
                  <span className="text-[10px] text-neutral-400 font-mono">
                    Grid Desktop (~360px)
                  </span>
                </div>
              </div>
              <span className="text-[10px] font-semibold text-neutral-400 bg-neutral-500/10 px-1.5 py-0.5 rounded">
                Alta Resolução
              </span>
            </div>

            {/* Thumbnail em escala Desktop */}
            <div
              className={`relative aspect-video w-full rounded-lg overflow-hidden bg-black shadow ${filterClass}`}
            >
              <img
                src={userVideo.thumbnailUrl}
                alt={userVideo.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <SafeZoneOverlay
                duration={userVideo.duration}
                isLive={userVideo.isLive}
                progressPercent={userVideo.progressPercent}
                settings={safeSettings}
                device="desktop"
              />
            </div>

            {/* Título no Desktop */}
            <div>
              <p
                className={`text-xs font-semibold leading-snug line-clamp-2 ${textPrimary}`}
              >
                {userVideo.title}
              </p>
              <p className={`text-[11px] ${textSecondary} mt-1`}>
                {userVideo.channelName} · {userVideo.views}
              </p>
            </div>
          </div>

          {/* DISPOSITIVO 3: SMART TV */}
          <div
            className={`p-4 rounded-2xl border ${borderCard} ${bgCard} shadow-sm flex flex-col gap-3`}
          >
            <div className="flex items-center justify-between pb-2 border-b border-neutral-500/10">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-purple-500/10 text-purple-500 flex items-center justify-center">
                  <Tv className="w-4 h-4" />
                </div>
                <div>
                  <h4 className={`text-xs font-bold ${textPrimary}`}>Smart TV</h4>
                  <span className="text-[10px] text-neutral-400 font-mono">
                    Living Room (10 Pés)
                  </span>
                </div>
              </div>
              <span className="text-[10px] font-semibold text-purple-400 bg-purple-500/10 px-1.5 py-0.5 rounded">
                Distância Maior
              </span>
            </div>

            {/* Thumbnail em escala TV */}
            <div
              className={`relative aspect-video w-full rounded-lg overflow-hidden bg-black shadow ${filterClass}`}
            >
              <img
                src={userVideo.thumbnailUrl}
                alt={userVideo.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <SafeZoneOverlay
                duration={userVideo.duration}
                isLive={userVideo.isLive}
                progressPercent={userVideo.progressPercent}
                settings={safeSettings}
                device="tv"
              />
            </div>

            {/* Título na TV */}
            <div>
              <p
                className={`text-xs font-bold leading-snug line-clamp-2 ${textPrimary}`}
              >
                {userVideo.title}
              </p>
              <p className={`text-[11px] ${textSecondary} mt-1`}>
                {userVideo.channelName} · {userVideo.views}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
