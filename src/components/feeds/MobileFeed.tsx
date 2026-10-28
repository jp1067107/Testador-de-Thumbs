import React from 'react';
import {
  Cast,
  Bell,
  Search,
  MoreVertical,
  Home,
  Compass,
  PlusCircle,
  Tv,
  User,
  Wifi,
  Battery,
  AlertCircle,
} from 'lucide-react';
import { VideoData, SafeZoneSettings, VisualFilter, ThemeMode } from '../../types';
import { SafeZoneOverlay } from '../SafeZoneOverlay';

interface MobileFeedProps {
  userVideo: VideoData;
  competitors: VideoData[];
  safeSettings: SafeZoneSettings;
  filter: VisualFilter;
  theme: ThemeMode;
}

export const MobileFeed: React.FC<MobileFeedProps> = ({
  userVideo,
  competitors,
  safeSettings,
  filter,
  theme,
}) => {
  const isDark = theme === 'dark';

  // Cores nativas do YouTube Mobile
  const bgMain = isDark ? 'bg-[#0f0f0f]' : 'bg-[#ffffff]';
  const textPrimary = isDark ? 'text-[#f1f1f1]' : 'text-[#0f0f0f]';
  const textSecondary = isDark ? 'text-[#aaaaaa]' : 'text-[#606060]';
  const borderSubtle = isDark ? 'border-[#272727]' : 'border-[#e5e5e5]';
  const chipBg = isDark ? 'bg-[#272727]' : 'bg-[#f2f2f2]';
  const chipBgActive = isDark ? 'bg-[#ffffff] text-black' : 'bg-[#0f0f0f] text-white';

  const filterClass =
    filter === 'grayscale'
      ? 'grayscale'
      : filter === 'blur'
      ? 'blur-[3px] transition-all duration-300'
      : '';

  const isTitleLong = userVideo.title.length > 55;

  return (
    <div className="flex flex-col items-center justify-center p-2 sm:p-6 select-none">
      {/* Moldura de Smartphone Elegante */}
      <div
        className={`w-full max-w-[390px] h-[780px] rounded-[44px] shadow-2xl border-[8px] border-neutral-800 flex flex-col overflow-hidden relative ${bgMain} transition-colors duration-200`}
      >
        {/* Notch / Dynamic Island */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-4 bg-black rounded-full z-40" />

        {/* Status Bar */}
        <div className="pt-2 px-6 pb-1 flex items-center justify-between text-[11px] font-semibold text-neutral-400 z-30">
          <span>19:42</span>
          <div className="flex items-center gap-1.5">
            <Wifi className="w-3.5 h-3.5" />
            <span className="text-[10px]">5G</span>
            <Battery className="w-4 h-4" />
          </div>
        </div>

        {/* Header do App YouTube */}
        <div
          className={`flex items-center justify-between px-4 py-2 border-b ${borderSubtle}`}
        >
          {/* Logo do YouTube */}
          <div className="flex items-center gap-1.5">
            <div className="w-7 h-5 bg-red-600 rounded-md flex items-center justify-center shadow-sm">
              <div className="w-0 h-0 border-t-[4px] border-t-transparent border-l-[7px] border-l-white border-b-[4px] border-b-transparent ml-0.5" />
            </div>
            <span
              className={`font-bold tracking-tighter text-lg font-sans ${textPrimary}`}
            >
              YouTube
            </span>
          </div>

          {/* Ícones de topo */}
          <div className={`flex items-center gap-4 ${textPrimary}`}>
            <Cast className="w-5 h-5 opacity-90" />
            <Bell className="w-5 h-5 opacity-90" />
            <Search className="w-5 h-5 opacity-90" />
            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-red-500 to-amber-500 text-white flex items-center justify-center text-[10px] font-bold">
              U
            </div>
          </div>
        </div>

        {/* Chips de Categorias */}
        <div className="flex items-center gap-2 px-3 py-2 overflow-x-auto no-scrollbar shrink-0">
          <button
            className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap ${chipBgActive}`}
          >
            Tudo
          </button>
          <button
            className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap ${chipBg} ${textPrimary}`}
          >
            Vídeos Novos
          </button>
          <button
            className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap ${chipBg} ${textPrimary}`}
          >
            Tecnologia
          </button>
          <button
            className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap ${chipBg} ${textPrimary}`}
          >
            Podcasts
          </button>
        </div>

        {/* Feed Scrollável */}
        <div className="flex-1 overflow-y-auto divide-y divide-transparent">
          {/* VÍDEO DO USUÁRIO EM TESTE */}
          <div className="pb-4">
            {/* Tag sutil de identificação da thumbnail testada */}
            <div className="px-3 py-1 bg-red-600/10 border-b border-red-500/20 flex items-center justify-between text-[11px] text-red-500 font-medium">
              <span>Seu Vídeo (Em Teste)</span>
              {safeSettings.showOverlays && isTitleLong && (
                <span className="flex items-center gap-1 text-[10px] text-amber-500 font-semibold">
                  <AlertCircle className="w-3 h-3" /> Título pode truncar
                </span>
              )}
            </div>

            {/* Thumbnail com 16:9 estrito */}
            <div
              className={`relative aspect-video w-full overflow-hidden bg-black ${filterClass}`}
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

            {/* Metadados do Vídeo no Mobile */}
            <div className="px-3 pt-3 flex items-start gap-3">
              <img
                src={userVideo.channelAvatar}
                alt={userVideo.channelName}
                className="w-9 h-9 rounded-full object-cover shrink-0 mt-0.5 border border-black/10"
                referrerPolicy="no-referrer"
              />

              <div className="flex-1 min-w-0 pr-1">
                <h3
                  className={`text-sm font-semibold leading-snug line-clamp-2 ${textPrimary} ${
                    safeSettings.showOverlays && isTitleLong
                      ? 'bg-amber-500/10 rounded px-1 -mx-1'
                      : ''
                  }`}
                  title={userVideo.title}
                >
                  {userVideo.title}
                </h3>
                <div
                  className={`text-[12px] ${textSecondary} mt-0.5 flex items-center flex-wrap gap-1 leading-tight`}
                >
                  <span>{userVideo.channelName}</span>
                  <span>·</span>
                  <span>{userVideo.views}</span>
                  <span>·</span>
                  <span>{userVideo.timeAgo}</span>
                </div>
              </div>

              <button
                className={`p-1 -mr-1 ${textSecondary} hover:${textPrimary}`}
                aria-label="Opções do vídeo"
              >
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* VÍDEO CONCORRENTE 1 NO FEED PARA COMPARAR CONTRASTE */}
          {competitors.slice(0, 3).map((video) => (
            <div key={video.id} className="py-3">
              <div
                className={`relative aspect-video w-full overflow-hidden bg-black ${filterClass}`}
              >
                <img
                  src={video.thumbnailUrl}
                  alt={video.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-2 right-2 bg-black/85 text-white font-medium text-[11px] leading-none px-1.5 py-1 rounded tracking-tight font-mono">
                  {video.duration}
                </div>
              </div>

              <div className="px-3 pt-3 flex items-start gap-3">
                <img
                  src={video.channelAvatar}
                  alt={video.channelName}
                  className="w-9 h-9 rounded-full object-cover shrink-0 mt-0.5"
                  referrerPolicy="no-referrer"
                />
                <div className="flex-1 min-w-0 pr-1">
                  <h3
                    className={`text-sm font-semibold leading-snug line-clamp-2 ${textPrimary}`}
                  >
                    {video.title}
                  </h3>
                  <div
                    className={`text-[12px] ${textSecondary} mt-0.5 flex items-center flex-wrap gap-1 leading-tight`}
                  >
                    <span>{video.channelName}</span>
                    <span>·</span>
                    <span>{video.views}</span>
                    <span>·</span>
                    <span>{video.timeAgo}</span>
                  </div>
                </div>
                <button
                  className={`p-1 -mr-1 ${textSecondary}`}
                  aria-label="Opções do vídeo"
                >
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Barra de Navegação Inferior do YouTube Mobile */}
        <div
          className={`px-4 py-2.5 border-t ${borderSubtle} flex items-center justify-around text-[10px] ${textSecondary}`}
        >
          <div className={`flex flex-col items-center gap-0.5 ${textPrimary}`}>
            <Home className="w-5 h-5" />
            <span className="font-medium">Início</span>
          </div>
          <div className="flex flex-col items-center gap-0.5">
            <Compass className="w-5 h-5" />
            <span>Shorts</span>
          </div>
          <div className="flex flex-col items-center gap-0.5">
            <PlusCircle className="w-6 h-6 text-red-500" />
          </div>
          <div className="flex flex-col items-center gap-0.5">
            <Tv className="w-5 h-5" />
            <span>Inscrições</span>
          </div>
          <div className="flex flex-col items-center gap-0.5">
            <User className="w-5 h-5" />
            <span>Você</span>
          </div>
        </div>

        {/* Barra de gesto inferior iOS */}
        <div className="pb-1.5 flex justify-center">
          <div className="w-32 h-1 bg-neutral-500/60 rounded-full" />
        </div>
      </div>
    </div>
  );
};
