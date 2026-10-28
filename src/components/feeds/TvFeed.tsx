import React from 'react';
import {
  Search,
  Home,
  Tv,
  Library,
  Settings,
  Flame,
  Radio,
  SlidersHorizontal,
} from 'lucide-react';
import { VideoData, SafeZoneSettings, VisualFilter, ThemeMode } from '../../types';
import { SafeZoneOverlay } from '../SafeZoneOverlay';

interface TvFeedProps {
  userVideo: VideoData;
  userVideoB?: VideoData;
  isCompareActive?: boolean;
  competitors: VideoData[];
  safeSettings: SafeZoneSettings;
  filter: VisualFilter;
  theme: ThemeMode;
}

export const TvFeed: React.FC<TvFeedProps> = ({
  userVideo,
  userVideoB,
  isCompareActive = true,
  competitors,
  safeSettings,
  filter,
  theme,
}) => {
  const isDark = theme === 'dark';

  const bgMain = isDark ? 'bg-[#0f0f0f]' : 'bg-[#181818]';
  const textPrimary = 'text-[#ffffff]';
  const textSecondary = 'text-[#aaaaaa]';

  const filterClass =
    filter === 'grayscale'
      ? 'grayscale'
      : filter === 'blur'
      ? 'blur-[3px] transition-all duration-300'
      : '';

  return (
    <div className="w-full h-full flex flex-col select-none overflow-hidden rounded-2xl border-4 border-neutral-900 shadow-2xl relative bg-black">
      {/* Moldura de Smart TV (Bezel preto fino) */}
      <div className="absolute top-2 right-4 text-[10px] text-neutral-500 font-mono flex items-center gap-2 z-30">
        <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
        <span>YouTube TV 4K (Visão de Sala a 3 Metros)</span>
      </div>

      <div className={`flex flex-1 overflow-hidden ${bgMain} p-6 gap-6`}>
        {/* Barra Lateral do YouTube TV */}
        <div className="w-14 flex flex-col items-center py-4 justify-between bg-black/40 rounded-2xl border border-white/5 shrink-0">
          <div className="flex flex-col items-center gap-6 text-neutral-400">
            <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white font-bold text-xs shadow-lg">
              ▶
            </div>
            <button className="p-2 hover:text-white transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button className="p-2.5 rounded-xl bg-white/10 text-white shadow-md">
              <Home className="w-5 h-5" />
            </button>
            <button className="p-2 hover:text-white transition-colors">
              <Flame className="w-5 h-5" />
            </button>
            <button className="p-2 hover:text-white transition-colors">
              <Tv className="w-5 h-5" />
            </button>
            <button className="p-2 hover:text-white transition-colors">
              <Radio className="w-5 h-5" />
            </button>
            <button className="p-2 hover:text-white transition-colors">
              <Library className="w-5 h-5" />
            </button>
          </div>

          <button className="p-2 text-neutral-400 hover:text-white">
            <Settings className="w-5 h-5" />
          </button>
        </div>

        {/* Conteúdo da TV: Linha de Destaques em Alta Resolução */}
        <div className="flex-1 flex flex-col justify-center overflow-y-auto">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <span className="text-xs uppercase tracking-widest text-red-500 font-bold">
                Recomendados Para Você
              </span>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Simulação da Interface de TV
              </h2>
            </div>
            <div className="text-xs text-neutral-400 flex items-center gap-2">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Navegue com Controle Remoto</span>
            </div>
          </div>

          {/* Carrossel de Vídeos TV */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {/* VÍDEO DO USUÁRIO EM FOCO (Como se o cursor do controle estivesse nele) */}
            <div className="flex flex-col rounded-2xl p-3 bg-white/5 border-2 border-white/90 shadow-[0_0_25px_rgba(255,255,255,0.2)] transform scale-[1.02] transition-transform">
              <div className="mb-2 flex items-center justify-between text-xs font-bold text-white">
                <span className="bg-red-600 text-white px-2 py-0.5 rounded text-[10px]">
                  FOCO DO CONTROLE
                </span>
                <span className="text-[11px] text-neutral-300">
                  {userVideo.channelName}
                </span>
              </div>

              {/* Thumbnail 16:9 */}
              <div
                className={`relative aspect-video w-full rounded-xl overflow-hidden bg-black ${filterClass}`}
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

              {/* Título Grande legível a 3 metros */}
              <div className="mt-3">
                <h3
                  className={`text-base font-bold leading-snug line-clamp-2 ${textPrimary}`}
                >
                  {userVideo.title}
                </h3>
                <div
                  className={`text-xs ${textSecondary} mt-1.5 flex items-center gap-2 font-medium`}
                >
                  <span>{userVideo.views}</span>
                  <span>·</span>
                  <span>{userVideo.timeAgo}</span>
                </div>
              </div>
            </div>

            {/* VÍDEO 2: THUMB B (SE ATIVA) OU CONCORRENTE 1 */}
            {isCompareActive && userVideoB ? (
              <div className="flex flex-col rounded-2xl p-3 bg-blue-500/5 border-2 border-blue-500/60 shadow-[0_0_20px_rgba(59,130,246,0.15)] transform hover:scale-[1.01] transition-transform">
                <div className="mb-2 flex items-center justify-between text-xs font-bold text-blue-400">
                  <span className="bg-blue-600 text-white px-2 py-0.5 rounded text-[10px]">
                    THUMB B (COMPARAÇÃO)
                  </span>
                  <span className="text-[11px] text-neutral-300">
                    {userVideoB.channelName}
                  </span>
                </div>

                <div
                  className={`relative aspect-video w-full rounded-xl overflow-hidden bg-black ${filterClass}`}
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

                <div className="mt-3">
                  <h3
                    className={`text-base font-bold leading-snug line-clamp-2 ${textPrimary}`}
                  >
                    {userVideoB.title}
                  </h3>
                  <div
                    className={`text-xs ${textSecondary} mt-1.5 flex items-center gap-2`}
                  >
                    <span>{userVideoB.views}</span>
                    <span>·</span>
                    <span>{userVideoB.timeAgo}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col rounded-2xl p-3 bg-white/5 border border-white/10 opacity-80 hover:opacity-100 transition-opacity">
                <div className="mb-2 flex items-center justify-between text-xs text-neutral-400">
                  <span className="text-[11px]">{competitors[0].channelName}</span>
                </div>

                <div
                  className={`relative aspect-video w-full rounded-xl overflow-hidden bg-black ${filterClass}`}
                >
                  <img
                    src={competitors[0].thumbnailUrl}
                    alt={competitors[0].title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-2 right-2 bg-black/85 text-white font-medium text-[11px] leading-none px-2 py-1 rounded font-mono">
                    {competitors[0].duration}
                  </div>
                </div>

                <div className="mt-3">
                  <h3
                    className={`text-base font-semibold leading-snug line-clamp-2 ${textPrimary}`}
                  >
                    {competitors[0].title}
                  </h3>
                  <div
                    className={`text-xs ${textSecondary} mt-1.5 flex items-center gap-2`}
                  >
                    <span>{competitors[0].views}</span>
                    <span>·</span>
                  </div>
                </div>
              </div>
            )}

            {/* VÍDEO CONCORRENTE 2 */}
            <div className="hidden lg:flex flex-col rounded-2xl p-3 bg-white/5 border border-white/10 opacity-70 hover:opacity-100 transition-opacity">
              <div className="mb-2 flex items-center justify-between text-xs text-neutral-400">
                <span className="text-[11px]">{competitors[1].channelName}</span>
              </div>

              <div
                className={`relative aspect-video w-full rounded-xl overflow-hidden bg-black ${filterClass}`}
              >
                <img
                  src={competitors[1].thumbnailUrl}
                  alt={competitors[1].title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-2 right-2 bg-black/85 text-white font-medium text-[11px] leading-none px-2 py-1 rounded font-mono">
                  {competitors[1].duration}
                </div>
              </div>

              <div className="mt-3">
                <h3
                  className={`text-base font-semibold leading-snug line-clamp-2 ${textPrimary}`}
                >
                  {competitors[1].title}
                </h3>
                <div
                  className={`text-xs ${textSecondary} mt-1.5 flex items-center gap-2`}
                >
                  <span>{competitors[1].views}</span>
                  <span>·</span>
                  <span>{competitors[1].timeAgo}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
