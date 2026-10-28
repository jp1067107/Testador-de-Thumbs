import React, { useRef, useState, useMemo } from 'react';
import {
  Upload,
  Clock,
  Radio,
  Sliders,
  Type,
  User,
  Sparkles,
  HardDrive,
  RotateCcw,
  Layers,
  Copy,
  Hash,
  ChevronDown,
  Check,
} from 'lucide-react';
import { VideoData, SafeZoneSettings, ThemeMode } from '../types';
import { generateHashtagsFromTitle } from '../utils/hashtagGenerator';

interface EditorSidebarProps {
  videoA: VideoData;
  videoB: VideoData;
  onChangeVideoA: (updated: Partial<VideoData>) => void;
  onChangeVideoB: (updated: Partial<VideoData>) => void;
  isCompareActive: boolean;
  onToggleCompare: () => void;
  onResetVideo: () => void;
  safeSettings: SafeZoneSettings;
  onChangeSafeSettings: (updated: Partial<SafeZoneSettings>) => void;
  theme: ThemeMode;
  isOpen: boolean;
  onClose: () => void;
}

export const EditorSidebar: React.FC<EditorSidebarProps> = ({
  videoA,
  videoB,
  onChangeVideoA,
  onChangeVideoB,
  isCompareActive,
  onToggleCompare,
  onResetVideo,
  safeSettings,
  onChangeSafeSettings,
  theme,
  isOpen,
}) => {
  const isDark = theme === 'dark';
  const [activeTab, setActiveTab] = useState<'A' | 'B'>('A');
  const [isHashtagsOpen, setIsHashtagsOpen] = useState(false);
  const [copiedTag, setCopiedTag] = useState<string | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  if (!isOpen) return null;

  const currentVideo = activeTab === 'A' ? videoA : videoB;
  const currentOnChange = activeTab === 'A' ? onChangeVideoA : onChangeVideoB;

  const generatedHashtags = useMemo(
    () => generateHashtagsFromTitle(currentVideo.title),
    [currentVideo.title]
  );

  const handleCopySingleHashtag = (tag: string) => {
    try {
      navigator.clipboard.writeText(tag);
      setCopiedTag(tag);
      setTimeout(() => setCopiedTag(null), 1800);
    } catch (err) {
      console.warn('Erro ao copiar hashtag', err);
    }
  };

  const handleCopyAllHashtags = () => {
    try {
      navigator.clipboard.writeText(generatedHashtags.join(' '));
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2000);
    } catch (err) {
      console.warn('Erro ao copiar hashtags', err);
    }
  };

  // Processamento de arquivo de imagem enviado
  const handleFileChange = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        currentOnChange({ thumbnailUrl: e.target.result as string });
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

  // Copia os metadados de A para B (título, canal, duração)
  const handleCopyFromA = () => {
    onChangeVideoB({
      title: videoA.title,
      channelName: videoA.channelName,
      duration: videoA.duration,
      isLive: videoA.isLive,
      progressPercent: videoA.progressPercent,
    });
  };

  const isTitleTooLong = currentVideo.title.length > 55;

  const bgSidebar = isDark ? 'bg-[#151515]' : 'bg-neutral-50';
  const borderSidebar = isDark ? 'border-[#262626]' : 'border-neutral-200';
  const inputBg = isDark
    ? 'bg-[#202020] border-neutral-700 text-white'
    : 'bg-white border-neutral-300 text-neutral-900';
  const textPrimary = isDark ? 'text-white' : 'text-neutral-900';
  const textSecondary = isDark ? 'text-neutral-400' : 'text-neutral-600';

  return (
    <aside
      className={`w-full sm:w-80 md:w-88 border-r ${borderSidebar} ${bgSidebar} flex flex-col h-[calc(100vh-3.5rem)] overflow-y-auto select-none shrink-0 transition-colors z-20`}
    >
      <div className="p-4 sm:p-5 flex flex-col gap-5">
        {/* 1. SELETOR DE THUMBNAIL A / B (TESTE COMPARATIVO) */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className={`text-xs font-bold uppercase tracking-wider ${textSecondary} flex items-center gap-1.5`}>
              <Layers className="w-3.5 h-3.5 text-red-500" />
              <span>Comparação de 2 Thumbs</span>
            </span>

            {/* Toggle de ativação da 2ª Thumb no feed */}
            <button
              onClick={onToggleCompare}
              className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border transition-colors ${
                isCompareActive
                  ? 'bg-red-500/15 border-red-500/50 text-red-500'
                  : 'bg-neutral-500/10 border-neutral-500/20 text-neutral-400'
              }`}
            >
              {isCompareActive ? '2 Thumbs Ativas' : 'Apenas 1 Thumb'}
            </button>
          </div>

          {/* Abas Thumb A vs Thumb B */}
          <div
            className={`grid grid-cols-2 p-1 rounded-xl border ${
              isDark ? 'bg-[#1e1e1e] border-neutral-800' : 'bg-neutral-200/70 border-neutral-300'
            }`}
          >
            <button
              onClick={() => setActiveTab('A')}
              className={`py-1.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                activeTab === 'A'
                  ? 'bg-red-600 text-white shadow-sm'
                  : isDark
                  ? 'text-neutral-400 hover:text-white'
                  : 'text-neutral-600 hover:text-black'
              }`}
            >
              <span>Thumb A</span>
              <span className="text-[10px] opacity-80">(Principal)</span>
            </button>

            <button
              onClick={() => setActiveTab('B')}
              className={`py-1.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                activeTab === 'B'
                  ? 'bg-red-600 text-white shadow-sm'
                  : isDark
                  ? 'text-neutral-400 hover:text-white'
                  : 'text-neutral-600 hover:text-black'
              }`}
            >
              <span>Thumb B</span>
              <span className="text-[10px] opacity-80">(Comparação)</span>
            </button>
          </div>
        </div>

        {/* 2. UPLOAD DA THUMBNAIL ATUAL (A OU B) */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className={`text-xs font-bold uppercase tracking-wider ${textSecondary}`}>
              Imagem da Thumb {activeTab}
            </label>
            {activeTab === 'B' && (
              <button
                type="button"
                onClick={handleCopyFromA}
                className="text-[10px] text-neutral-400 hover:text-red-500 flex items-center gap-1 transition-colors"
                title="Copiar título e dados da Thumb A"
              >
                <Copy className="w-2.5 h-2.5" />
                <span>Copiar dados da A</span>
              </button>
            )}
          </div>

          {/* Miniatura atual da thumb selecionada */}
          <div className="mb-2.5 relative aspect-video w-full rounded-xl overflow-hidden bg-black border border-neutral-700/60 shadow-sm">
            <img
              src={currentVideo.thumbnailUrl}
              alt={`Preview da Thumb ${activeTab}`}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <span className="absolute top-1.5 left-1.5 bg-black/80 text-white font-bold text-[9px] px-1.5 py-0.5 rounded border border-white/20">
              Versão {activeTab}
            </span>
          </div>

          {/* Dropzone Compacta para carregar nova imagem */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-3 text-center cursor-pointer transition-all ${
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
            <div className="w-7 h-7 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center mx-auto mb-1">
              <Upload className="w-3.5 h-3.5" />
            </div>
            <p className={`text-xs font-semibold ${textPrimary}`}>
              Enviar nova imagem para Thumb {activeTab}
            </p>
            <p className={`text-[10px] ${textSecondary} mt-0.5`}>
              Arraste ou cole (Ctrl+V)
            </p>
          </div>

          {/* Indicador de Salvamento Automático */}
          <div
            className={`mt-2.5 flex items-center justify-between text-[11px] px-2.5 py-1.5 rounded-xl border ${borderSidebar} ${
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

        {/* 3. TÍTULO DO VÍDEO & ANÁLISE DE TRUNCAMENTO */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className={`text-xs font-bold uppercase tracking-wider ${textSecondary} flex items-center gap-1`}>
              <Type className="w-3.5 h-3.5" />
              <span>Título (Thumb {activeTab})</span>
            </label>
            <span
              className={`text-[10px] font-mono ${
                isTitleTooLong ? 'text-amber-500 font-bold' : textSecondary
              }`}
            >
              {currentVideo.title.length}/100
            </span>
          </div>

          <textarea
            rows={2}
            value={currentVideo.title}
            onChange={(e) => currentOnChange({ title: e.target.value })}
            placeholder="Digite o título do seu vídeo..."
            className={`w-full p-2.5 rounded-xl text-xs leading-relaxed border resize-none focus:outline-none focus:ring-1 focus:ring-red-500 ${inputBg}`}
          />

          {/* Gerador de Hashtags com base no Título */}
          <div
            className={`mt-2 p-2.5 rounded-xl border transition-all ${borderSidebar} ${
              isDark ? 'bg-[#1a1a1a]' : 'bg-neutral-100/80'
            }`}
          >
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setIsHashtagsOpen(!isHashtagsOpen)}
                className="flex items-center gap-1.5 text-xs font-semibold text-left hover:text-red-500 transition-colors"
                title="Abrir gerador de hashtags sugeridas"
              >
                <Hash className="w-3.5 h-3.5 text-red-500 shrink-0" />
                <span className={textPrimary}>Gerar Hashtags</span>
                <span className="text-[10px] text-neutral-400 font-normal">
                  ({generatedHashtags.length})
                </span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-neutral-400 transition-transform ${
                    isHashtagsOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isHashtagsOpen && (
                <button
                  type="button"
                  onClick={handleCopyAllHashtags}
                  className="text-[10px] font-semibold text-red-500 hover:text-red-400 flex items-center gap-1 transition-colors px-1.5 py-0.5 rounded hover:bg-red-500/10"
                >
                  {copiedAll ? (
                    <Check className="w-3 h-3 text-emerald-500" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                  <span>{copiedAll ? 'Copiadas!' : 'Copiar Todas'}</span>
                </button>
              )}
            </div>

            {isHashtagsOpen && (
              <div className="mt-2 pt-2 border-t border-neutral-700/40">
                <p className={`text-[10px] ${textSecondary} mb-2 leading-tight`}>
                  Clique em qualquer hashtag para copiá-la ou use &quot;Copiar Todas&quot; para colar no YouTube:
                </p>

                <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto no-scrollbar">
                  {generatedHashtags.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => handleCopySingleHashtag(tag)}
                      className={`text-[11px] font-medium px-2 py-0.5 rounded-lg border transition-all flex items-center gap-1 ${
                        copiedTag === tag
                          ? 'bg-emerald-600 text-white border-emerald-500'
                          : isDark
                          ? 'bg-[#242424] border-neutral-700 text-blue-400 hover:border-blue-400 hover:bg-[#2a2a2a]'
                          : 'bg-white border-neutral-300 text-blue-600 hover:border-blue-500 hover:bg-blue-50'
                      }`}
                      title="Clique para copiar esta hashtag"
                    >
                      <span>{tag}</span>
                      {copiedTag === tag && (
                        <Check className="w-2.5 h-2.5 text-white" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 4. DURAÇÃO E BADGE AO VIVO */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={`text-xs font-bold uppercase tracking-wider ${textSecondary} mb-1.5 block flex items-center gap-1`}>
              <Clock className="w-3 h-3" />
              <span>Duração</span>
            </label>
            <input
              type="text"
              value={currentVideo.duration}
              onChange={(e) => currentOnChange({ duration: e.target.value })}
              placeholder="ex: 14:20"
              disabled={currentVideo.isLive}
              className={`w-full p-2 rounded-xl text-xs font-mono border focus:outline-none focus:ring-1 focus:ring-red-500 ${
                currentVideo.isLive ? 'opacity-40 cursor-not-allowed' : ''
              } ${inputBg}`}
            />
          </div>

          <div>
            <label className={`text-xs font-bold uppercase tracking-wider ${textSecondary} mb-1.5 block flex items-center gap-1`}>
              <Radio className="w-3 h-3" />
              <span>Ao Vivo</span>
            </label>
            <button
              onClick={() => currentOnChange({ isLive: !currentVideo.isLive })}
              className={`w-full p-2 rounded-xl text-xs font-semibold border flex items-center justify-center gap-1.5 transition-all ${
                currentVideo.isLive
                  ? 'bg-red-600 text-white border-red-500 shadow-sm'
                  : isDark
                  ? 'bg-[#202020] border-neutral-700 text-neutral-400 hover:text-white'
                  : 'bg-white border-neutral-300 text-neutral-600 hover:text-black'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  currentVideo.isLive ? 'bg-white animate-pulse' : 'bg-neutral-500'
                }`}
              />
              <span>{currentVideo.isLive ? 'Ao Vivo' : 'Normal'}</span>
            </button>
          </div>
        </div>

        {/* 5. NOME DO CANAL */}
        <div>
          <label className={`text-xs font-bold uppercase tracking-wider ${textSecondary} mb-1.5 block flex items-center gap-1`}>
            <User className="w-3.5 h-3.5" />
            <span>Nome do Canal</span>
          </label>
          <input
            type="text"
            value={currentVideo.channelName}
            onChange={(e) => {
              // Atualiza em ambos para praticidade
              onChangeVideoA({ channelName: e.target.value });
              onChangeVideoB({ channelName: e.target.value });
            }}
            placeholder="Nome do seu canal"
            className={`w-full p-2 rounded-xl text-xs border focus:outline-none focus:ring-1 focus:ring-red-500 ${inputBg}`}
          />
        </div>

        {/* 6. BARRA DE REPRODUÇÃO */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className={`text-xs font-bold uppercase tracking-wider ${textSecondary} flex items-center gap-1`}>
              <Sliders className="w-3 h-3" />
              <span>Barra de Reprodução</span>
            </label>
            <span className={`text-[10px] font-mono ${textSecondary}`}>
              {currentVideo.progressPercent || 0}%
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={currentVideo.progressPercent || 0}
            onChange={(e) =>
              currentOnChange({ progressPercent: Number(e.target.value) })
            }
            className="w-full accent-red-600 cursor-pointer"
          />
        </div>

        {/* 7. SAFE ZONE CONTROLES DETALHADOS */}
        <div className={`p-3 rounded-xl border ${borderSidebar} ${isDark ? 'bg-[#1a1a1a]' : 'bg-neutral-100/70'}`}>
          <div className="flex items-center gap-1.5 mb-2">
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
              <span className={textPrimary}>Contorno da Duração (Inferior Direito)</span>
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
