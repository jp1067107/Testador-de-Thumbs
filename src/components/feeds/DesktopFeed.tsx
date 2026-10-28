import React from 'react';
import {
  Menu,
  Search,
  Mic,
  Video as VideoIcon,
  Bell,
  Home,
  Flame,
  Tv,
  CheckCircle2,
  MoreVertical,
  History,
  ThumbsUp,
} from 'lucide-react';
import { VideoData, SafeZoneSettings, VisualFilter, ThemeMode } from '../../types';
import { SafeZoneOverlay } from '../SafeZoneOverlay';

interface DesktopFeedProps {
  userVideo: VideoData;
  competitors: VideoData[];
  safeSettings: SafeZoneSettings;
  filter: VisualFilter;
  theme: ThemeMode;
}

export const DesktopFeed: React.FC<DesktopFeedProps> = ({
  userVideo,
  competitors,
  safeSettings,
  filter,
  theme,
}) => {
  const isDark = theme === 'dark';

  const bgMain = isDark ? 'bg-[#0f0f0f]' : 'bg-[#ffffff]';
  const textPrimary = isDark ? 'text-[#f1f1f1]' : 'text-[#0f0f0f]';
  const textSecondary = isDark ? 'text-[#aaaaaa]' : 'text-[#606060]';
  const borderSubtle = isDark ? 'border-[#272727]' : 'border-[#e5e5e5]';
  const chipBg = isDark ? 'bg-[#272727]' : 'bg-[#f2f2f2]';
  const chipBgActive = isDark ? 'bg-[#ffffff] text-black' : 'bg-[#0f0f0f] text-white';
  const searchBg = isDark ? 'bg-[#121212]' : 'bg-white';
  const searchBtnBg = isDark ? 'bg-[#222222]' : 'bg-[#f8f8f8]';

  const filterClass =
    filter === 'grayscale'
      ? 'grayscale'
      : filter === 'blur'
      ? 'blur-[3px] transition-all duration-300'
      : '';

  // Intercalamos o vídeo do usuário no feed na posição #2
  const allGridVideos = [
    competitors[0],
    userVideo,
    competitors[1],
    competitors[2],
    competitors[3],
    competitors[4],
  ];

  return (
    <div className="w-full h-full flex flex-col select-none overflow-hidden rounded-xl border border-neutral-700/40 shadow-xl">
      {/* Moldura de Janela de Navegador Desktop */}
      <div className="h-8 bg-neutral-900 border-b border-neutral-800 px-4 flex items-center justify-between text-xs text-neutral-400 shrink-0">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          </div>
          <span className="text-[11px] text-neutral-400 font-medium ml-3 hidden sm:inline">
            youtube.com / feed / recommend
          </span>
        </div>
        <span className="text-[10px] text-neutral-500 font-mono">
          Simulação Desktop (1920×1080 Viewport)
        </span>
      </div>

      {/* Header do YouTube Desktop */}
      <div
        className={`h-14 px-4 flex items-center justify-between border-b ${borderSubtle} ${bgMain} shrink-0 transition-colors`}
      >
        {/* Esquerda: Menu + Logo */}
        <div className="flex items-center gap-4">
          <button className={`p-2 rounded-full hover:bg-neutral-500/10 ${textPrimary}`}>
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-1">
            <div className="w-7 h-5 bg-red-600 rounded-md flex items-center justify-center">
              <div className="w-0 h-0 border-t-[4px] border-t-transparent border-l-[7px] border-l-white border-b-[4px] border-b-transparent ml-0.5" />
            </div>
            <span
              className={`font-bold tracking-tighter text-lg font-sans ${textPrimary}`}
            >
              YouTube
            </span>
            <span className={`text-[10px] self-start ml-0.5 ${textSecondary}`}>
              BR
            </span>
          </div>
        </div>

        {/* Centro: Barra de Busca Autêntica */}
        <div className="hidden md:flex items-center flex-1 max-w-xl mx-4">
          <div className="flex items-center w-full">
            <div
              className={`flex-1 flex items-center h-10 px-4 border border-r-0 ${borderSubtle} rounded-l-full ${searchBg}`}
            >
              <input
                type="text"
                placeholder="Pesquisar"
                readOnly
                value=""
                className={`w-full bg-transparent text-sm focus:outline-none ${textPrimary}`}
              />
            </div>
            <button
              className={`h-10 px-6 border ${borderSubtle} rounded-r-full flex items-center justify-center ${searchBtnBg} ${textPrimary}`}
            >
              <Search className="w-4 h-4 opacity-80" />
            </button>
          </div>
          <button
            className={`w-10 h-10 ml-3 rounded-full flex items-center justify-center ${chipBg} ${textPrimary}`}
          >
            <Mic className="w-4 h-4" />
          </button>
        </div>

        {/* Direita: Ações */}
        <div className={`flex items-center gap-3 ${textPrimary}`}>
          <button className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-500/10 hover:bg-neutral-500/20 text-xs font-semibold">
            <VideoIcon className="w-4 h-4" />
            <span>Criar</span>
          </button>
          <button className="p-2 rounded-full hover:bg-neutral-500/10 relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-600" />
          </button>
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-rose-500 text-white flex items-center justify-center text-xs font-bold">
            U
          </div>
        </div>
      </div>

      {/* Corpo com Mini-Sidebar e Grid de Vídeos */}
      <div className={`flex flex-1 overflow-hidden ${bgMain} transition-colors`}>
        {/* Sidebar Compacta Desktop */}
        <div
          className={`w-18 hidden lg:flex flex-col items-center py-3 border-r ${borderSubtle} shrink-0 text-[10px] ${textSecondary}`}
        >
          <div className={`flex flex-col items-center gap-1.5 py-3 w-16 rounded-xl hover:bg-neutral-500/10 ${textPrimary}`}>
            <Home className="w-5 h-5" />
            <span>Início</span>
          </div>
          <div className="flex flex-col items-center gap-1.5 py-3 w-16 rounded-xl hover:bg-neutral-500/10">
            <Flame className="w-5 h-5" />
            <span>Shorts</span>
          </div>
          <div className="flex flex-col items-center gap-1.5 py-3 w-16 rounded-xl hover:bg-neutral-500/10">
            <Tv className="w-5 h-5" />
            <span>Inscrições</span>
          </div>
          <div className="flex flex-col items-center gap-1.5 py-3 w-16 rounded-xl hover:bg-neutral-500/10">
            <History className="w-5 h-5" />
            <span>Histórico</span>
          </div>
          <div className="flex flex-col items-center gap-1.5 py-3 w-16 rounded-xl hover:bg-neutral-500/10">
            <ThumbsUp className="w-5 h-5" />
            <span>Gostei</span>
          </div>
        </div>

        {/* Área Principal de Rolagem */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {/* Chips de Categorias Desktop */}
          <div className="flex items-center gap-3 pb-6 overflow-x-auto no-scrollbar">
            <button className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap ${chipBgActive}`}>
              Tudo
            </button>
            <button className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap ${chipBg} ${textPrimary}`}>
              Vídeos em Alta
            </button>
            <button className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap ${chipBg} ${textPrimary}`}>
              Tecnologia
            </button>
            <button className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap ${chipBg} ${textPrimary}`}>
              Jogos
            </button>
            <button className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap ${chipBg} ${textPrimary}`}>
              Podcasts
            </button>
            <button className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap ${chipBg} ${textPrimary}`}>
              Ao vivo
            </button>
          </div>

          {/* Grid de Vídeos Desktop (2 a 3 colunas) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-8">
            {allGridVideos.map((video, idx) => {
              const isUser = video.id === userVideo.id;
              return (
                <div
                  key={`${video.id}-${idx}`}
                  className={`group flex flex-col relative transition-all duration-200 ${
                    isUser
                      ? 'ring-2 ring-red-500/50 p-2 rounded-2xl bg-red-500/5'
                      : ''
                  }`}
                >
                  {isUser && (
                    <div className="mb-2 flex items-center justify-between text-xs text-red-500 font-bold px-1">
                      <span>★ Sua Thumbnail em Teste</span>
                      <span className="text-[10px] text-neutral-400 font-normal">
                        Posição #2 do Feed
                      </span>
                    </div>
                  )}

                  {/* Thumbnail 16:9 */}
                  <div
                    className={`relative aspect-video w-full rounded-xl overflow-hidden bg-black/60 shadow-md ${filterClass}`}
                  >
                    <img
                      src={video.thumbnailUrl}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />

                    {isUser ? (
                      <SafeZoneOverlay
                        duration={userVideo.duration}
                        isLive={userVideo.isLive}
                        progressPercent={userVideo.progressPercent}
                        settings={safeSettings}
                        device="desktop"
                      />
                    ) : (
                      <div className="absolute bottom-2 right-2 bg-black/85 text-white font-medium text-[11px] leading-none px-1.5 py-1 rounded tracking-tight font-mono">
                        {video.duration}
                      </div>
                    )}
                  </div>

                  {/* Metadados Desktop */}
                  <div className="flex items-start gap-3 mt-3">
                    <img
                      src={video.channelAvatar}
                      alt={video.channelName}
                      className="w-9 h-9 rounded-full object-cover shrink-0 mt-0.5"
                      referrerPolicy="no-referrer"
                    />

                    <div className="flex-1 min-w-0 pr-1">
                      <h3
                        className={`text-sm font-semibold leading-snug line-clamp-2 ${textPrimary} group-hover:text-red-500 transition-colors`}
                        title={video.title}
                      >
                        {video.title}
                      </h3>

                      <div
                        className={`text-xs ${textSecondary} mt-1 flex items-center gap-1`}
                      >
                        <span className="hover:text-neutral-300 truncate">
                          {video.channelName}
                        </span>
                        {video.verified && (
                          <CheckCircle2 className="w-3.5 h-3.5 shrink-0 opacity-70" />
                        )}
                      </div>

                      <div
                        className={`text-xs ${textSecondary} flex items-center gap-1`}
                      >
                        <span>{video.views}</span>
                        <span>·</span>
                        <span>{video.timeAgo}</span>
                      </div>
                    </div>

                    <button
                      className={`opacity-0 group-hover:opacity-100 p-1 -mr-1 ${textSecondary} hover:${textPrimary} transition-opacity`}
                      aria-label="Opções"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
