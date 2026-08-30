/**
 * Al-Muhandis Platform - Video Provider Abstraction Types
 * Master Specification - Phase 0
 */

export enum VideoProviderType {
  NONE = 'NONE',
  BUNNY_STREAM = 'BUNNY_STREAM',
  MUX = 'MUX',
  CLOUDFLARE_STREAM = 'CLOUDFLARE_STREAM',
  YOUTUBE = 'YOUTUBE',
  DIRECT_HLS = 'DIRECT_HLS',
}

export enum VideoProcessingStatus {
  INITIALIZED = 'INITIALIZED',
  UPLOADING = 'UPLOADING',
  PROCESSING = 'PROCESSING',
  READY = 'READY',
  FAILED = 'FAILED',
}

export interface VideoUploadRequest {
  title: string;
  filename: string;
  filesizeBytes?: number;
  collectionId?: string;
  metadata?: Record<string, unknown>;
}

export interface VideoUploadResponse {
  videoId: string;
  uploadUrl: string;
  provider: VideoProviderType;
  providerVideoId: string;
  directUploadToken?: string;
  expiresAt?: Date;
}

export interface VideoPlaybackInfo {
  videoId: string;
  provider: VideoProviderType;
  playbackUrl: string; // HLS / DASH manifest url
  embedUrl?: string;
  thumbnailUrl?: string;
  durationSeconds?: number;
  resolutions?: Array<'360p' | '480p' | '720p' | '1080p' | '4K'>;
  drmProtected: boolean;
  signedToken?: string;
  watermarkText?: string;
}

export interface VideoStatusResponse {
  videoId: string;
  provider: VideoProviderType;
  status: VideoProcessingStatus;
  progressPercentage?: number;
  errorMessage?: string;
}
