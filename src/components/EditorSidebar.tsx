import React, { useRef, useState } from 'react';
import {
  Upload,
  Image as ImageIcon,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Radio,
  Sliders,
  Type,
  User,
  Sparkles,
  HardDrive,
  RotateCcw,
} from 'lucide-react';
import { VideoData, SafeZoneSettings, ThemeMode } from '../types';

interface EditorSidebarProps {
  video: VideoData;
  onChangeVideo: (updated: Partial<VideoData>) => void;
  onResetVideo: () => void;
  safeSettings: SafeZoneSettings;
  onChangeSafeSettings: (updated: Partial<SafeZoneSettings>) => void;
  theme: ThemeMode;
  isOpen: boolean;
  onClose: () => void;
}

export const EditorSidebar: React.FC<EditorSidebarProps> = ({
  video,
  onChangeVideo,
  onResetVideo,
  safeSettings,
  onChangeSafeSettings,
  theme,
  isOpen,
}) => {
  const isDark = theme === 'dark';
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  if (!isOpen) return null;

  // Processamento de arquivo de imagem enviado
  const handleFileChange = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        onChangeVideo({ thumbnailUrl: e.target.result as string });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const isTitleTooLong = video.title.length > 55;

  const bgSidebar = isDark ? 'bg-[#151515]' : 'bg-neutral-50';
  const borderSidebar = isDark ? 'border-[#262626]' : 'border-neutral-200';
  const inputBg = isDark ? 'bg-[#202020] border-neutral-700 text-white' : 'bg-white border-neutral-300 text-neutral-900';
  const textPrimary = isDark ? 'text-white' : 'text-neutral-900';
  const textSecondary = isDark ? 'text-neutral-400' : 'text-neutral-600';

  return (
    <aside
      className={`w-full sm:w-80 md:w-88 border-r ${borderSidebar} ${bgSidebar} flex flex-col h-[calc(100vh-3.5rem)] overflow-y-auto select-none shrink-0 transition-colors z-20`}
    >
      <div className="p-4 sm:p-5 flex flex-col gap-5">
        {/* 1. SEÇÃO DE UPLOAD DA THUMBNAIL */}
        <div>
          <label className={`text-xs font-bold uppercase tracking-wider ${textSecondary} mb-2 block`}>
            Thumbnail do Vídeo
          </label>

          {/* Dropzone Compacta */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-all ${
              isDragging
                ? 'border-red-500 bg-red-500/10'
                : isDark
                ? 'border-neutral-700 hover:border-neutral-500 bg-[#1e1e1e]'
                : 'border-neutral-300 hover:border-neutral-400 bg-white'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files?.[0]) handleFileChange(e.target.files[0]);
              }}
            />
            <div className="w-9 h-9 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center mx-auto mb-2">
              <Upload className="w-4 h-4" />
            </div>
            <p className={`text-xs font-semibold ${textPrimary}`}>
              Clique ou arraste sua thumbnail
            </p>
            <p className={`text-[10px] ${textSecondary} mt-0.5`}>
              PNG, JPG, WebP (16:9 recomendado · Cole com Ctrl+V)
            </p>
          </div>

          {/* Indicador de Salvamento Automático no Navegador */}
          <div
            className={`mt-3 flex items-center justify-between text-[11px] px-3 py-2 rounded-xl border ${borderSidebar} ${
              isDark ? 'bg-[#1a1a1a] text-neutral-300' : 'bg-neutral-100/90 text-neutral-600'
            }`}
          >
            <div className="flex items-center gap-1.5 font-medium">
              <HardDrive className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>Salvo no seu navegador</span>
            </div>
            <button
              type="button"
              onClick={onResetVideo}
              className="text-[10px] text-neutral-400 hover:text-red-500 flex items-center gap-1 transition-colors px-1.5 py-0.5 rounded hover:bg-neutral-500/10"
              title="Restaurar valores de demonstração"
            >
              <RotateCcw className="w-2.5 h-2.5" />
              <span>Limpar</span>
            </button>
          </div>
        </div>

        {/* 2. TÍTULO DO VÍDEO & ANÁLISE DE TRUNCAMENTO */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className={`text-xs font-bold uppercase tracking-wider ${textSecondary} flex items-center gap-1`}>
              <Type className="w-3.5 h-3.5" />
              <span>Título do Vídeo</span>
            </label>
            <span
              className={`text-[10px] font-mono ${
                isTitleTooLong ? 'text-amber-500 font-bold' : textSecondary
              }`}
            >
              {video.title.length}/100
            </span>
          </div>

          <textarea
            rows={3}
            value={video.title}
            onChange={(e) => onChangeVideo({ title: e.target.value })}
            placeholder="Digite o título do seu vídeo no YouTube..."
            className={`w-full p-2.5 rounded-xl text-xs leading-relaxed border resize-none focus:outline-none focus:ring-1 focus:ring-red-500 ${inputBg}`}
          />

          {isTitleTooLong && (
            <div className="mt-1.5 p-2 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-start gap-1.5 text-amber-500 text-[11px] leading-tight">
              <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
              <span>
                <strong>Atenção:</strong> Títulos com mais de 55 caracteres costumam ser cortados com (...) no celular. Deixe as palavras mais fortes no início!
              </span>
            </div>
          )}
        </div>

        {/* 3. DURAÇÃO E BADGE AO VIVO */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={`text-xs font-bold uppercase tracking-wider ${textSecondary} mb-1.5 block flex items-center gap-1`}>
              <Clock className="w-3 h-3" />
              <span>Duração</span>
            </label>
            <input
              type="text"
              value={video.duration}
              onChange={(e) => onChangeVideo({ duration: e.target.value })}
              placeholder="ex: 14:20"
              disabled={video.isLive}
              className={`w-full p-2 rounded-xl text-xs font-mono border focus:outline-none focus:ring-1 focus:ring-red-500 ${
                video.isLive ? 'opacity-40 cursor-not-allowed' : ''
              } ${inputBg}`}
            />
          </div>

          <div>
            <label className={`text-xs font-bold uppercase tracking-wider ${textSecondary} mb-1.5 block flex items-center gap-1`}>
              <Radio className="w-3 h-3" />
              <span>Ao Vivo</span>
            </label>
            <button
              onClick={() => onChangeVideo({ isLive: !video.isLive })}
              className={`w-full p-2 rounded-xl text-xs font-semibold border flex items-center justify-center gap-1.5 transition-all ${
                video.isLive
                  ? 'bg-red-600 text-white border-red-500 shadow-sm'
                  : isDark
                  ? 'bg-[#202020] border-neutral-700 text-neutral-400 hover:text-white'
                  : 'bg-white border-neutral-300 text-neutral-600 hover:text-black'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  video.isLive ? 'bg-white animate-pulse' : 'bg-neutral-500'
                }`}
              />
              <span>{video.isLive ? 'Transmissão' : 'Vídeo Normal'}</span>
            </button>
          </div>
        </div>

        {/* 4. CANAL & METADADOS */}
        <div>
          <label className={`text-xs font-bold uppercase tracking-wider ${textSecondary} mb-1.5 block flex items-center gap-1`}>
            <User className="w-3.5 h-3.5" />
            <span>Nome do Canal</span>
          </label>
          <input
            type="text"
            value={video.channelName}
            onChange={(e) => onChangeVideo({ channelName: e.target.value })}
            placeholder="Nome do seu canal"
            className={`w-full p-2 rounded-xl text-xs border focus:outline-none focus:ring-1 focus:ring-red-500 ${inputBg}`}
          />
        </div>

        {/* 5. BARRA DE REPRODUÇÃO SIMULADA (PROGRESS BAR) */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className={`text-xs font-bold uppercase tracking-wider ${textSecondary} flex items-center gap-1`}>
              <Sliders className="w-3 h-3" />
              <span>Barra de Progresso</span>
            </label>
            <span className={`text-[10px] font-mono ${textSecondary}`}>
              {video.progressPercent || 0}%
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={video.progressPercent || 0}
            onChange={(e) =>
              onChangeVideo({ progressPercent: Number(e.target.value) })
            }
            className="w-full accent-red-600 cursor-pointer"
          />
          <span className={`text-[10px] ${textSecondary} block mt-0.5`}>
            Linha vermelha que indica parte do vídeo já assistida pelo usuário
          </span>
        </div>

        {/* 6. SAFE ZONE CONTROLES DETALHADOS */}
        <div className={`p-3.5 rounded-xl border ${borderSidebar} ${isDark ? 'bg-[#1a1a1a]' : 'bg-neutral-100/70'}`}>
          <div className="flex items-center gap-1.5 mb-2.5">
            <Sparkles className="w-3.5 h-3.5 text-red-500" />
            <span className={`text-xs font-bold ${textPrimary}`}>
              Guias de Safe Area
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2 cursor-pointer text-xs">
              <input
                type="checkbox"
                checked={safeSettings.highlightTimeBadge}
                onChange={(e) =>
                  onChangeSafeSettings({ highlightTimeBadge: e.target.checked })
                }
                className="rounded accent-red-600"
              />
              <span className={textPrimary}>Selo de Duração (Canto Inf. Direito)</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-xs">
              <input
                type="checkbox"
                checked={safeSettings.highlightSafeZone}
                onChange={(e) =>
                  onChangeSafeSettings({ highlightSafeZone: e.target.checked })
                }
                className="rounded accent-emerald-600"
              />
              <span className={textPrimary}>Zona Segura Central (80%)</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-xs">
              <input
                type="checkbox"
                checked={safeSettings.highlightProgressBar}
                onChange={(e) =>
                  onChangeSafeSettings({ highlightProgressBar: e.target.checked })
                }
                className="rounded accent-red-600"
              />
              <span className={textPrimary}>Barra Vermelha na Base</span>
            </label>
          </div>
        </div>
      </div>
    </aside>
  );
};
