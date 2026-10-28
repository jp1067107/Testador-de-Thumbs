/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { DeviceType, VisualFilter, ThemeMode, VideoData, SafeZoneSettings } from './types';
import { INITIAL_USER_VIDEO, INITIAL_USER_VIDEO_B, FEED_COMPETITOR_VIDEOS } from './data/mockData';
import { TopBar } from './components/TopBar';
import { EditorSidebar } from './components/EditorSidebar';
import { MobileFeed } from './components/feeds/MobileFeed';
import { DesktopFeed } from './components/feeds/DesktopFeed';
import { TvFeed } from './components/feeds/TvFeed';
import { ComparisonView } from './components/ComparisonView';

const STORAGE_KEY_A = 'thumbpreview_user_data_a_v2';
const STORAGE_KEY_B = 'thumbpreview_user_data_b_v2';

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
  const [userVideo, setUserVideo] = useState<VideoData>(() =>
    getInitialVideoData(STORAGE_KEY_A, INITIAL_USER_VIDEO)
  );
  const [userVideoB, setUserVideoB] = useState<VideoData>(() =>
    getInitialVideoData(STORAGE_KEY_B, INITIAL_USER_VIDEO_B)
  );
  const [isCompareActive, setIsCompareActive] = useState<boolean>(true);

  const [competitors] = useState<VideoData[]>(FEED_COMPETITOR_VIDEOS);
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

  // Salva automaticamente as informações da Thumb A
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

  // Salva automaticamente as informações da Thumb B
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

  // Suporte a colar imagem diretamente via Clipboard (Ctrl+V)
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
                setUserVideo((prev) => ({
                  ...prev,
                  thumbnailUrl: event.target?.result as string,
                }));
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
  }, []);

  const handleUpdateVideoA = (updated: Partial<VideoData>) => {
    setUserVideo((prev) => ({ ...prev, ...updated }));
  };

  const handleUpdateVideoB = (updated: Partial<VideoData>) => {
    setUserVideoB((prev) => ({ ...prev, ...updated }));
  };

  const handleResetVideo = () => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.removeItem(STORAGE_KEY_A);
        window.localStorage.removeItem(STORAGE_KEY_B);
      }
    } catch (err) {
      console.warn('Erro ao limpar localStorage', err);
    }
    setUserVideo(INITIAL_USER_VIDEO);
    setUserVideoB(INITIAL_USER_VIDEO_B);
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

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${
        isDark ? 'bg-[#0a0a0a] text-neutral-100' : 'bg-neutral-100 text-neutral-900'
      }`}
    >
      {/* 1. Header do Estúdio (Fino e Minimalista) */}
      <TopBar
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
          videoA={userVideo}
          videoB={userVideoB}
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
          </div>
        </main>
      </div>
    </div>
  );
}
