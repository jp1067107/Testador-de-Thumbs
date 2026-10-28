export type DeviceType = 'mobile' | 'desktop' | 'tv' | 'compare';

export type VisualFilter = 'normal' | 'grayscale' | 'blur';

export type ThemeMode = 'dark' | 'light';

export interface VideoData {
  id: string;
  title: string;
  channelName: string;
  channelAvatar: string;
  views: string;
  timeAgo: string;
  duration: string;
  thumbnailUrl: string;
  isLive?: boolean;
  verified?: boolean;
  progressPercent?: number; // 0 to 100
}

export interface SafeZoneSettings {
  showOverlays: boolean;
  highlightTimeBadge: boolean;
  highlightLiveBadge: boolean;
  highlightProgressBar: boolean;
  highlightSafeZone: boolean;
  highlightTitleTruncation: boolean;
}

export interface FocalPoint {
  x: number; // percentage 0 - 100
  y: number; // percentage 0 - 100
}
