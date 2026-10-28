/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { DeviceType, ContentFormat, VisualFilter, ThemeMode, VideoData, SafeZoneSettings } from './types';
import {
  INITIAL_USER_VIDEO,
  INITIAL_USER_VIDEO_B,
  INITIAL_SHORTS_VIDEO,
  INITIAL_SHORTS_VIDEO_B,
  FEED_COMPETITOR_VIDEOS,
  FEED_COMPETITOR_SHORTS,
} from './data/mockData';
import { TopBar } from './components/TopBar';
import { EditorSidebar } from './components/EditorSidebar';
import { MobileFeed } from './components/feeds/MobileFeed';
import { DesktopFeed } from './components/feeds/DesktopFeed';
import { TvFeed } from './components/feeds/TvFeed';
import { ComparisonView } from './components/ComparisonView';
import { ShortsFeed } from './components/feeds/ShortsFeed';

const STORAGE_KEY_A = 'thumbpreview_user_data_a_v2';
const STORAGE_KEY_B = 'thumbpreview_user_data_b_v2';
const STORAGE_KEY_SHORT_A = 'thumbpreview_user_short_a_v1';
const STORAGE_KEY_SHORT_B = 'thumbpreview_user_short_b_v1';
const STORAGE_KEY_FORMAT = 'thumbpreview_content_format_v1';

const getInitialVideoData = (key: string, fallback: VideoData): VideoData => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const saved = window.localStorage.getItem(key);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          return { ...fallback, ...parsed };
        }
      }
    }
  } catch (err) {
    console.warn(`Não foi possível ler dados anteriores de ${key}`, err);
  }
  return fallback;
};

export default function App() {
  // Formato ativo: Vídeos Longos (16:9) ou YouTube Shorts (9:16)
  const [contentFormat, setContentFormat] = useState<ContentFormat>(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const saved = window.localStorage.getItem(STORAGE_KEY_FORMAT);
        if (saved === 'long' || saved === 'shorts') return saved;
      }
    } catch {
      // fallback
    }
    return 'long';
  });

  // Estado para Vídeos Longos (16:9) - Mantido 100% intacto
  const [userVideo, setUserVideo] = useState<VideoData>(() =>
    getInitialVideoData(STORAGE_KEY_A, INITIAL_USER_VIDEO)
  );
  const [userVideoB, setUserVideoB] = useState<VideoData>(() =>
    getInitialVideoData(STORAGE_KEY_B, INITIAL_USER_VIDEO_B)
  );

  // Estado para YouTube Shorts (9:16 Vertical)
  const [userShort, setUserShort] = useState<VideoData>(() =>
    getInitialVideoData(STORAGE_KEY_SHORT_A, INITIAL_SHORTS_VIDEO)
  );
  const [userShortB, setUserShortB] = useState<VideoData>(() =>
    getInitialVideoData(STORAGE_KEY_SHORT_B, INITIAL_SHORTS_VIDEO_B)
  );

  const [isCompareActive, setIsCompareActive] = useState<boolean>(true);

  const [competitors] = useState<VideoData[]>(FEED_COMPETITOR_VIDEOS);
  const [competitorShorts] = useState<VideoData[]>(FEED_COMPETITOR_SHORTS);

  const [activeDevice, setActiveDevice] = useState<DeviceType>('desktop');
  const [theme, setTheme] = useState<ThemeMode>('dark');
  const [visualFilter, setVisualFilter] = useState<VisualFilter>('normal');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  const [safeSettings, setSafeSettings] = useState<SafeZoneSettings>({
    showOverlays: true,
    highlightTimeBadge: true,
    highlightLiveBadge: true,
    highlightProgressBar: true,
    highlightSafeZone: true,
    highlightTitleTruncation: true,
  });

  // Salva formato ativo
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(STORAGE_KEY_FORMAT, contentFormat);
      }
    } catch {
      // ignore
    }
  }, [contentFormat]);

  // Salva automaticamente as informações da Thumb A (Vídeos Longos)
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(STORAGE_KEY_A, JSON.stringify(userVideo));
      }
    } catch {
      try {
        const { thumbnailUrl, ...metadataOnly } = userVideo;
        if (typeof window !== 'undefined' && window.localStorage) {
          window.localStorage.setItem(STORAGE_KEY_A, JSON.stringify(metadataOnly));
        }
      } catch (innerErr) {
        console.warn('Erro ao salvar metadados da Thumb A', innerErr);
      }
    }
  }, [userVideo]);

  // Salva automaticamente as informações da Thumb B (Vídeos Longos)
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(STORAGE_KEY_B, JSON.stringify(userVideoB));
      }
    } catch {
      try {
        const { thumbnailUrl, ...metadataOnly } = userVideoB;
        if (typeof window !== 'undefined' && window.localStorage) {
          window.localStorage.setItem(STORAGE_KEY_B, JSON.stringify(metadataOnly));
        }
      } catch (innerErr) {
        console.warn('Erro ao salvar metadados da Thumb B', innerErr);
      }
    }
  }, [userVideoB]);

  // Salva automaticamente as informações do Short A
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(STORAGE_KEY_SHORT_A, JSON.stringify(userShort));
      }
    } catch {
      try {
        const { thumbnailUrl, ...metadataOnly } = userShort;
        if (typeof window !== 'undefined' && window.localStorage) {
          window.localStorage.setItem(STORAGE_KEY_SHORT_A, JSON.stringify(metadataOnly));
        }
      } catch (innerErr) {
        console.warn('Erro ao salvar metadados do Short A', innerErr);
      }
    }
  }, [userShort]);

  // Salva automaticamente as informações do Short B
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(STORAGE_KEY_SHORT_B, JSON.stringify(userShortB));
      }
    } catch {
      try {
        const { thumbnailUrl, ...metadataOnly } = userShortB;
        if (typeof window !== 'undefined' && window.localStorage) {
          window.localStorage.setItem(STORAGE_KEY_SHORT_B, JSON.stringify(metadataOnly));
        }
      } catch (innerErr) {
        console.warn('Erro ao salvar metadados do Short B', innerErr);
      }
    }
  }, [userShortB]);

  // Suporte a colar imagem diretamente via Clipboard (Ctrl+V) no formato ativo
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          const file = items[i].getAsFile();
          if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
              if (event.target?.result) {
                const url = event.target.result as string;
                if (contentFormat === 'long') {
                  setUserVideo((prev) => ({ ...prev, thumbnailUrl: url }));
                } else {
                  setUserShort((prev) => ({ ...prev, thumbnailUrl: url }));
                }
              }
            };
            reader.readAsDataURL(file);
          }
          break;
        }
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [contentFormat]);

  const handleUpdateVideoA = (updated: Partial<VideoData>) => {
    if (contentFormat === 'long') {
      setUserVideo((prev) => ({ ...prev, ...updated }));
    } else {
      setUserShort((prev) => ({ ...prev, ...updated }));
    }
  };

  const handleUpdateVideoB = (updated: Partial<VideoData>) => {
    if (contentFormat === 'long') {
      setUserVideoB((prev) => ({ ...prev, ...updated }));
    } else {
      setUserShortB((prev) => ({ ...prev, ...updated }));
    }
  };

  const handleResetVideo = () => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        if (contentFormat === 'long') {
          window.localStorage.removeItem(STORAGE_KEY_A);
          window.localStorage.removeItem(STORAGE_KEY_B);
          setUserVideo(INITIAL_USER_VIDEO);
          setUserVideoB(INITIAL_USER_VIDEO_B);
        } else {
          window.localStorage.removeItem(STORAGE_KEY_SHORT_A);
          window.localStorage.removeItem(STORAGE_KEY_SHORT_B);
          setUserShort(INITIAL_SHORTS_VIDEO);
          setUserShortB(INITIAL_SHORTS_VIDEO_B);
        }
      }
    } catch (err) {
      console.warn('Erro ao limpar localStorage', err);
    }
  };

  const handleUpdateSafeSettings = (updated: Partial<SafeZoneSettings>) => {
    setSafeSettings((prev) => ({ ...prev, ...updated }));
  };

  const toggleSafeAreas = () => {
    setSafeSettings((prev) => ({ ...prev, showOverlays: !prev.showOverlays }));
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const isDark = theme === 'dark';

  const activeVideoA = contentFormat === 'long' ? userVideo : userShort;
  const activeVideoB = contentFormat === 'long' ? userVideoB : userShortB;

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${
        isDark ? 'bg-[#0a0a0a] text-neutral-100' : 'bg-neutral-100 text-neutral-900'
      }`}
    >
      {/* 1. Header do Estúdio (Fino e Minimalista com Alternador de Formato) */}
      <TopBar
        contentFormat={contentFormat}
        onContentFormatChange={setContentFormat}
        activeDevice={activeDevice}
        onDeviceChange={setActiveDevice}
        safeAreasActive={safeSettings.showOverlays}
        onToggleSafeAreas={toggleSafeAreas}
        activeFilter={visualFilter}
        onFilterChange={setVisualFilter}
        theme={theme}
        onToggleTheme={toggleTheme}
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      {/* 2. Área de Trabalho Principal */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Barra Lateral Retrátil com Abas para Thumb A e Thumb B */}
        <EditorSidebar
          contentFormat={contentFormat}
          videoA={activeVideoA}
          videoB={activeVideoB}
          onChangeVideoA={handleUpdateVideoA}
          onChangeVideoB={handleUpdateVideoB}
          isCompareActive={isCompareActive}
          onToggleCompare={() => setIsCompareActive((prev) => !prev)}
          onResetVideo={handleResetVideo}
          safeSettings={safeSettings}
          onChangeSafeSettings={handleUpdateSafeSettings}
          theme={theme}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        {/* Canvas de Visualização Central */}
        <main className="flex-1 overflow-y-auto p-3 sm:p-6 flex flex-col items-center">
          <div className="w-full max-w-6xl flex-1 flex flex-col">
            {/* Visualizações para Vídeos Longos (16:9) - 100% Intactas */}
            {contentFormat === 'long' && (
              <>
                {activeDevice === 'mobile' && (
                  <MobileFeed
                    userVideo={userVideo}
                    userVideoB={userVideoB}
                    isCompareActive={isCompareActive}
                    competitors={competitors}
                    safeSettings={safeSettings}
                    filter={visualFilter}
                    theme={theme}
                  />
                )}

                {activeDevice === 'desktop' && (
                  <div className="flex-1 min-h-[680px]">
                    <DesktopFeed
                      userVideo={userVideo}
                      userVideoB={userVideoB}
                      isCompareActive={isCompareActive}
                      competitors={competitors}
                      safeSettings={safeSettings}
                      filter={visualFilter}
                      theme={theme}
                    />
                  </div>
                )}

                {activeDevice === 'tv' && (
                  <div className="flex-1 min-h-[580px]">
                    <TvFeed
                      userVideo={userVideo}
                      userVideoB={userVideoB}
                      isCompareActive={isCompareActive}
                      competitors={competitors}
                      safeSettings={safeSettings}
                      filter={visualFilter}
                      theme={theme}
                    />
                  </div>
                )}

                {activeDevice === 'compare' && (
                  <ComparisonView
                    userVideo={userVideo}
                    userVideoB={userVideoB}
                    safeSettings={safeSettings}
                    filter={visualFilter}
                    theme={theme}
                  />
                )}
              </>
            )}

            {/* Visualização para YouTube Shorts (9:16 Vertical) */}
            {contentFormat === 'shorts' && (
              <ShortsFeed
                userShort={userShort}
                userShortB={userShortB}
                isCompareActive={isCompareActive}
                competitors={competitorShorts}
                safeSettings={safeSettings}
                filter={visualFilter}
                theme={theme}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
