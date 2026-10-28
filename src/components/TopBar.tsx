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
import { DeviceType, VisualFilter, ThemeMode } from '../types';

interface TopBarProps {
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
      {/* Zona 1: Botão de Menu Retrátil + Marca */}
      <div className="flex items-center gap-3 shrink-0">
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

        <div className="flex items-center gap-2">
          <div className="w-6 h-4.5 bg-red-600 rounded flex items-center justify-center shadow-sm">
            <div className="w-0 h-0 border-t-[3.5px] border-t-transparent border-l-[6px] border-l-white border-b-[3.5px] border-b-transparent ml-0.5" />
          </div>
          <span className="font-bold text-sm tracking-tight hidden sm:inline">
            ThumbPreview
          </span>
        </div>
      </div>

      {/* Zona 2: Seletor de Dispositivo (Segmented Control Limpo) */}
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
              ? isDark
                ? 'bg-red-600 text-white shadow-sm'
                : 'bg-red-600 text-white shadow-sm'
              : 'text-neutral-400 hover:text-neutral-200'
          }`}
          title="Modo Comparativo de Detalhes"
        >
          <SplitSquareVertical className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Comparar</span>
        </button>
      </div>

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
          title="Destacar safe areas e obstruções"
        >
          <Eye className={`w-3.5 h-3.5 ${safeAreasActive ? 'text-red-500' : ''}`} />
          <span className="hidden sm:inline">Safe Areas</span>
        </button>

        {/* Filtro de Teste de Visão (Normal, P&B, Desfoque) */}
        <div
          className={`hidden lg:flex items-center p-0.5 rounded-lg border text-xs ${
            isDark
              ? 'bg-[#1e1e1e] border-neutral-800'
              : 'bg-neutral-100 border-neutral-200'
          }`}
        >
          <button
            onClick={() => onFilterChange('normal')}
            className={`px-2 py-1 rounded text-[11px] font-medium transition-colors ${
              activeFilter === 'normal'
                ? isDark
                  ? 'bg-neutral-700 text-white'
                  : 'bg-white text-neutral-900 shadow-xs'
                : 'text-neutral-400'
            }`}
          >
            Normal
          </button>
          <button
            onClick={() => onFilterChange('grayscale')}
            className={`px-2 py-1 rounded text-[11px] font-medium transition-colors ${
              activeFilter === 'grayscale'
                ? isDark
                  ? 'bg-neutral-700 text-white'
                  : 'bg-white text-neutral-900 shadow-xs'
                : 'text-neutral-400'
            }`}
            title="Escala de Cinza: Avalia contraste luminoso sem distração de cor"
          >
            P&B
          </button>
          <button
            onClick={() => onFilterChange('blur')}
            className={`px-2 py-1 rounded text-[11px] font-medium flex items-center gap-1 transition-colors ${
              activeFilter === 'blur'
                ? 'bg-amber-600 text-white'
                : 'text-neutral-400'
            }`}
            title="Desfoque (Squint Test): Simula a visualização rápida de 3 segundos"
          >
            <Sparkles className="w-2.5 h-2.5" />
            <span>Desfoque</span>
          </button>
        </div>

        {/* Alternador de Tema YouTube Claro/Escuro */}
        <button
          onClick={onToggleTheme}
          className={`p-2 rounded-lg transition-colors border ${
            isDark
              ? 'bg-neutral-800/80 border-neutral-700 hover:bg-neutral-800 text-amber-400'
              : 'bg-neutral-100 border-neutral-200 hover:bg-neutral-200 text-neutral-700'
          }`}
          title={isDark ? 'Mudar para YouTube Claro' : 'Mudar para YouTube Escuro'}
          aria-label="Alternar tema"
        >
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
      </div>
    </header>
  );
};
