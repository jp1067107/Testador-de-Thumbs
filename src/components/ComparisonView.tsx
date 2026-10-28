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
  Layers,
} from 'lucide-react';
import { VideoData, SafeZoneSettings, VisualFilter, ThemeMode, FocalPoint } from '../types';
import { SafeZoneOverlay } from './SafeZoneOverlay';

interface ComparisonViewProps {
  userVideo: VideoData;
  userVideoB?: VideoData;
  safeSettings: SafeZoneSettings;
  filter: VisualFilter;
  theme: ThemeMode;
}

export const ComparisonView: React.FC<ComparisonViewProps> = ({
  userVideo,
  userVideoB,
  safeSettings,
  filter,
  theme,
}) => {
  const isDark = theme === 'dark';
  const [focalPoint, setFocalPoint] = useState<FocalPoint>({ x: 50, y: 50 });
  const [isInspecting, setIsInspecting] = useState<boolean>(true);
  const [selectedThumb, setSelectedThumb] = useState<'A' | 'B'>('A');
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

  const activeVideo = selectedThumb === 'B' && userVideoB ? userVideoB : userVideo;

  // Manipulador de clique para definir ponto focal
  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return;
    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    setFocalPoint({ x, y });
  };

  // Verifica se o ponto focal atual está perto da área de duração
  const isFocalNearDanger = focalPoint.x > 68 && focalPoint.y > 68;

  return (
    <div className="w-full flex flex-col gap-6 select-none pb-12">
      {/* 1. SELETOR INTERATIVO DE PONTO FOCAL & LUPA */}
      <div
        className={`p-4 sm:p-5 rounded-2xl border ${borderCard} ${bgCard} shadow-sm transition-colors`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-red-500 shrink-0" />
            <div>
              <h3 className={`text-sm font-bold ${textPrimary}`}>
                Inspeção de Ponto Focal & Detalhes
              </h3>
              <p className={`text-xs ${textSecondary}`}>
                Clique ou toque na imagem para verificar a legibilidade na Versão {selectedThumb}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Seletor Thumb A / Thumb B para inspeção */}
            {userVideoB && (
              <div className="flex items-center p-0.5 rounded-lg border border-neutral-700/60 bg-neutral-800 text-xs">
                <button
                  onClick={() => setSelectedThumb('A')}
                  className={`px-2.5 py-1 rounded-md font-bold text-xs transition-colors ${
                    selectedThumb === 'A'
                      ? 'bg-red-600 text-white'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Thumb A
                </button>
                <button
                  onClick={() => setSelectedThumb('B')}
                  className={`px-2.5 py-1 rounded-md font-bold text-xs transition-colors ${
                    selectedThumb === 'B'
                      ? 'bg-blue-600 text-white'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Thumb B
                </button>
              </div>
            )}

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
              src={activeVideo.thumbnailUrl}
              alt={activeVideo.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />

            <SafeZoneOverlay
              duration={activeVideo.duration}
              isLive={activeVideo.isLive}
              progressPercent={activeVideo.progressPercent}
              settings={safeSettings}
              device="compare"
            />

            {/* Badge indicadora de qual thumb está sendo inspecionada */}
            <div className="absolute top-2 left-2 pointer-events-none">
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded shadow ${
                  selectedThumb === 'A'
                    ? 'bg-red-600 text-white'
                    : 'bg-blue-600 text-white'
                }`}
              >
                Inspecionando: Thumb {selectedThumb}
              </span>
            </div>

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

              {/* Janela de Zoom 2.8x centrada no ponto focal */}
              <div className="relative aspect-video w-full rounded-lg overflow-hidden border border-neutral-700/60 shadow-inner bg-black">
                <div
                  className="w-full h-full"
                  style={{
                    backgroundImage: `url(${activeVideo.thumbnailUrl})`,
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
                  ? 'Atenção: Seu ponto de destaque está no canto inferior direito, onde o selo de duração cobrirá esse detalhe.'
                  : 'Posicionamento livre: Este elemento fica afastado dos selos e controles da interface do YouTube.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. COMPARAÇÃO SIMULTÂNEA DAS 2 THUMBS NOS DISPOSITIVOS */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className={`text-base font-bold ${textPrimary}`}>
              Comparação A/B em Cada Dispositivo
            </h3>
            <p className={`text-xs ${textSecondary}`}>
              Avalie o impacto visual e a atratividade da Thumb A vs Thumb B em telas reais
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-medium text-neutral-400">
            <Layers className="w-4 h-4 text-red-500" />
            <span>Versão A vs Versão B</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {/* DISPOSITIVO 1: SMARTPHONE */}
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

            {/* Thumb A no Mobile */}
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-red-500 block">
                Thumb A (Principal)
              </span>
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
            </div>

            {/* Thumb B no Mobile (se ativa) */}
            {userVideoB && (
              <div className="space-y-1 pt-2 border-t border-neutral-500/10">
                <span className="text-[10px] font-bold text-blue-500 block">
                  Thumb B (Comparação)
                </span>
                <div
                  className={`relative aspect-video w-full rounded-lg overflow-hidden bg-black shadow ${filterClass}`}
                >
                  <img
                    src={userVideoB.thumbnailUrl}
                    alt={userVideoB.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <SafeZoneOverlay
                    duration={userVideoB.duration}
                    isLive={userVideoB.isLive}
                    progressPercent={userVideoB.progressPercent}
                    settings={safeSettings}
                    device="mobile"
                  />
                </div>
              </div>
            )}
          </div>

          {/* DISPOSITIVO 2: COMPUTADOR */}
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

            {/* Thumb A no Desktop */}
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-red-500 block">
                Thumb A (Principal)
              </span>
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
            </div>

            {/* Thumb B no Desktop (se ativa) */}
            {userVideoB && (
              <div className="space-y-1 pt-2 border-t border-neutral-500/10">
                <span className="text-[10px] font-bold text-blue-500 block">
                  Thumb B (Comparação)
                </span>
                <div
                  className={`relative aspect-video w-full rounded-lg overflow-hidden bg-black shadow ${filterClass}`}
                >
                  <img
                    src={userVideoB.thumbnailUrl}
                    alt={userVideoB.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <SafeZoneOverlay
                    duration={userVideoB.duration}
                    isLive={userVideoB.isLive}
                    progressPercent={userVideoB.progressPercent}
                    settings={safeSettings}
                    device="desktop"
                  />
                </div>
              </div>
            )}
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

            {/* Thumb A na TV */}
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-red-500 block">
                Thumb A (Principal)
              </span>
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
            </div>

            {/* Thumb B na TV (se ativa) */}
            {userVideoB && (
              <div className="space-y-1 pt-2 border-t border-neutral-500/10">
                <span className="text-[10px] font-bold text-blue-500 block">
                  Thumb B (Comparação)
                </span>
                <div
                  className={`relative aspect-video w-full rounded-lg overflow-hidden bg-black shadow ${filterClass}`}
                >
                  <img
                    src={userVideoB.thumbnailUrl}
                    alt={userVideoB.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <SafeZoneOverlay
                    duration={userVideoB.duration}
                    isLive={userVideoB.isLive}
                    progressPercent={userVideoB.progressPercent}
                    settings={safeSettings}
                    device="tv"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
