import React from 'react';
import {
  Smartphone,
  Monitor,
  Tv,
  SplitSquareVertical,
  Sun,
  Moon,
  Eye,
  PanelLeftClose,
  PanelLeftOpen,
  Sparkles,
} from 'lucide-react';
import { DeviceType, ContentFormat, VisualFilter, ThemeMode } from '../types';

interface TopBarProps {
  contentFormat: ContentFormat;
  onContentFormatChange: (format: ContentFormat) => void;
  activeDevice: DeviceType;
  onDeviceChange: (device: DeviceType) => void;
  safeAreasActive: boolean;
  onToggleSafeAreas: () => void;
  activeFilter: VisualFilter;
  onFilterChange: (filter: VisualFilter) => void;
  theme: ThemeMode;
  onToggleTheme: () => void;
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  contentFormat,
  onContentFormatChange,
  activeDevice,
  onDeviceChange,
  safeAreasActive,
  onToggleSafeAreas,
  activeFilter,
  onFilterChange,
  theme,
  onToggleTheme,
  isSidebarOpen,
  onToggleSidebar,
}) => {
  const isDark = theme === 'dark';

  return (
    <header
      className={`h-14 px-3 sm:px-6 border-b flex items-center justify-between gap-2 sm:gap-4 select-none shrink-0 transition-colors z-30 ${
        isDark
          ? 'bg-[#121212] border-[#272727] text-white'
          : 'bg-white border-neutral-200 text-neutral-900'
      }`}
    >
      {/* Zona 1: Menu Retrátil + Marca + Alternador de Formato (Vídeos vs Shorts) */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        <button
          onClick={onToggleSidebar}
          className={`p-2 rounded-lg transition-colors ${
            isDark
              ? 'hover:bg-neutral-800 text-neutral-300'
              : 'hover:bg-neutral-100 text-neutral-700'
          }`}
          title={isSidebarOpen ? 'Ocultar Painel de Edição' : 'Mostrar Painel de Edição'}
          aria-label="Alternar barra lateral"
        >
          {isSidebarOpen ? (
            <PanelLeftClose className="w-5 h-5" />
          ) : (
            <PanelLeftOpen className="w-5 h-5 text-red-500" />
          )}
        </button>

        <div className="flex items-center gap-2 mr-1">
          <div className="w-6 h-4.5 bg-red-600 rounded flex items-center justify-center shadow-sm">
            <div className="w-0 h-0 border-t-[3.5px] border-t-transparent border-l-[6px] border-l-white border-b-[3.5px] border-b-transparent ml-0.5" />
          </div>
          <span className="font-bold text-sm tracking-tight hidden lg:inline">
            ThumbPreview
          </span>
        </div>

        {/* Alternador Principal de Formato (Vídeos Longos 16:9 vs Shorts 9:16) */}
        <div
          className={`flex items-center p-0.5 rounded-xl border ${
            isDark
              ? 'bg-[#1e1e1e] border-neutral-800'
              : 'bg-neutral-100 border-neutral-200'
          }`}
        >
          <button
            onClick={() => onContentFormatChange('long')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
              contentFormat === 'long'
                ? 'bg-red-600 text-white shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
            title="Visualizar Thumbnails de Vídeos Tradicionais (16:9)"
          >
            <span>Vídeos (16:9)</span>
          </button>

          <button
            onClick={() => onContentFormatChange('shorts')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
              contentFormat === 'shorts'
                ? 'bg-red-600 text-white shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
            title="Visualizar Thumbnails verticais de YouTube Shorts (9:16)"
          >
            <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
              <path d="M10 14.65v-5.3L15 12l-5 2.65zm7.82-7.85l-.8-.44c-.75-.41-1.6-.45-2.38-.11l.96-.53c1.78-.98 2.45-3.21 1.47-4.99-1-1.78-3.24-2.45-5.02-1.47L4.54 3.49C2.96 4.36 2.05 6 2.09 7.78c.04 1.77 1 3.39 2.58 4.26l.8.44c.75.41 1.6.45 2.38.11l-.96.53c-1.78.98-2.45 3.21-1.47 4.99 1 1.78 3.24 2.45 5.02 1.47l7.51-4.24c1.58-.87 2.49-2.51 2.45-4.29-.04-1.78-1-3.4-2.58-4.26z" />
            </svg>
            <span>Shorts (9:16)</span>
          </button>
        </div>
      </div>

      {/* Zona 2: Seletor de Dispositivo (Aparece quando em modo Vídeos Longos) */}
      {contentFormat === 'long' ? (
        <div
          className={`flex items-center p-1 rounded-xl border ${
            isDark
              ? 'bg-[#1e1e1e] border-neutral-800'
              : 'bg-neutral-100 border-neutral-200'
          }`}
        >
          <button
            onClick={() => onDeviceChange('mobile')}
            className={`px-2.5 sm:px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeDevice === 'mobile'
                ? isDark
                  ? 'bg-neutral-800 text-white shadow-sm'
                  : 'bg-white text-neutral-900 shadow-sm'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
            title="Simulação Celular"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Celular</span>
          </button>

          <button
            onClick={() => onDeviceChange('desktop')}
            className={`px-2.5 sm:px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeDevice === 'desktop'
                ? isDark
                  ? 'bg-neutral-800 text-white shadow-sm'
                  : 'bg-white text-neutral-900 shadow-sm'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
            title="Simulação Computador"
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Computador</span>
          </button>

          <button
            onClick={() => onDeviceChange('tv')}
            className={`px-2.5 sm:px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeDevice === 'tv'
                ? isDark
                  ? 'bg-neutral-800 text-white shadow-sm'
                  : 'bg-white text-neutral-900 shadow-sm'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
            title="Simulação Smart TV"
          >
            <Tv className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Smart TV</span>
          </button>

          <button
            onClick={() => onDeviceChange('compare')}
            className={`px-2.5 sm:px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeDevice === 'compare'
                ? 'bg-red-600 text-white shadow-sm'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
            title="Modo Comparativo de Detalhes"
          >
            <SplitSquareVertical className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Comparar</span>
          </button>
        </div>
      ) : (
        <div className="hidden md:flex items-center gap-2 text-xs text-neutral-400 font-medium">
          <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
          <span>Modo Shorts: Avaliação de Feed & Player Vertical</span>
        </div>
      )}

      {/* Zona 3: Ações Rápidas (Safe Areas, Filtros, Tema) */}
      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
        {/* Toggle Safe Areas */}
        <button
          onClick={onToggleSafeAreas}
          className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all border ${
            safeAreasActive
              ? 'bg-red-500/15 border-red-500/50 text-red-500 font-bold'
              : isDark
              ? 'bg-neutral-800/80 border-neutral-700 text-neutral-300 hover:bg-neutral-800'
              : 'bg-neutral-100 border-neutral-200 text-neutral-700 hover:bg-neutral-200'
          }`}
          title="Ativar/desativar guias de área de perigo e corte"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Safe Area</span>
        </button>

        {/* Filtros Visuais (Normal, P&B, Desfoque) */}
        <div
          className={`flex items-center p-0.5 rounded-lg border ${
            isDark
              ? 'bg-[#1e1e1e] border-neutral-800'
              : 'bg-neutral-100 border-neutral-200'
          }`}
        >
          <button
            onClick={() => onFilterChange('normal')}
            className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
              activeFilter === 'normal'
                ? isDark
                  ? 'bg-neutral-700 text-white'
                  : 'bg-white text-neutral-900 shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
            title="Visão Normal"
          >
            Cor
          </button>
          <button
            onClick={() => onFilterChange('grayscale')}
            className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
              activeFilter === 'grayscale'
                ? isDark
                  ? 'bg-neutral-700 text-white'
                  : 'bg-white text-neutral-900 shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
            title="Preto e Branco: Avalie o Contraste e Valor Tonal"
          >
            P&B
          </button>
          <button
            onClick={() => onFilterChange('blur')}
            className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
              activeFilter === 'blur'
                ? isDark
                  ? 'bg-neutral-700 text-white'
                  : 'bg-white text-neutral-900 shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
            title="Desfoque (Squint Test): Avalie a Hierarquia de Silhueta"
          >
            <Eye className="w-3 h-3" />
          </button>
        </div>

        {/* Alternador de Tema Escuro / Claro */}
        <button
          onClick={onToggleTheme}
          className={`p-2 rounded-lg border transition-colors ${
            isDark
              ? 'border-neutral-800 bg-[#1e1e1e] text-neutral-300 hover:text-white'
              : 'border-neutral-200 bg-neutral-100 text-neutral-700 hover:text-black'
          }`}
          title={isDark ? 'Mudar para Tema Claro' : 'Mudar para Tema Escuro'}
          aria-label="Alternar tema"
        >
          {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
        </button>
      </div>
    </header>
  );
};
