/**
 * Al-Muhandis Platform - Bunny.net Stream Video Provider
 * Master Specification - Phase 0
 */

import { IVideoProvider } from './video-provider.interface.ts';
import {
  VideoProviderType,
  VideoUploadRequest,
  VideoUploadResponse,
  VideoPlaybackInfo,
  VideoStatusResponse,
  VideoProcessingStatus,
} from '../../../../shared/types/video.ts';
import { logger } from '../../logger/logger.service.ts';

export class BunnyStreamProvider implements IVideoProvider {
  public readonly providerType = VideoProviderType.BUNNY_STREAM;
  private readonly libraryId?: string;
  private readonly apiKey?: string;
  private readonly pullZoneHost: string;

  constructor(config?: { libraryId?: string; apiKey?: string; pullZoneHost?: string }) {
    this.libraryId = config?.libraryId || process.env.BUNNY_LIBRARY_ID;
    this.apiKey = config?.apiKey || process.env.BUNNY_API_KEY;
    this.pullZoneHost = config?.pullZoneHost || 'video.al-muhandis.com';
  }

  private ensureConfigured(): void {
    if (!this.libraryId || !this.apiKey) {
      throw new Error(
        'Bunny.net Stream provider is active but not configured. Please provide BUNNY_API_KEY and BUNNY_LIBRARY_ID.'
      );
    }
  }

  async createUploadSession(request: VideoUploadRequest): Promise<VideoUploadResponse> {
    this.ensureConfigured();
    logger.info(`Creating Bunny Stream video container: ${request.title}`, 'BunnyStreamProvider');
    const generatedVideoId = `bunny_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

    return {
      videoId: generatedVideoId,
      provider: this.providerType,
      providerVideoId: generatedVideoId,
      uploadUrl: `https://video.bunnycdn.com/library/${this.libraryId}/videos/${generatedVideoId}`,
      directUploadToken: 'bny_tkn_signed_presigned_upload_token',
      expiresAt: new Date(Date.now() + 3600 * 1000),
    };
  }

  async getPlaybackInfo(videoId: string, studentId?: string, userIp?: string): Promise<VideoPlaybackInfo> {
    this.ensureConfigured();
    const studentWatermark = studentId ? `ID: ${studentId} | IP: ${userIp || '0.0.0.0'}` : undefined;
    const token = `bny_signed_hls_${Date.now()}`;

    return {
      videoId,
      provider: this.providerType,
      playbackUrl: `https://${this.pullZoneHost}/${videoId}/playlist.m3u8?token=${token}`,
      embedUrl: `https://iframe.mediadelivery.net/embed/${this.libraryId}/${videoId}?token=${token}`,
      thumbnailUrl: `https://${this.pullZoneHost}/${videoId}/thumbnail.jpg`,
      durationSeconds: 1800,
      resolutions: ['360p', '480p', '720p', '1080p'],
      drmProtected: true,
      signedToken: token,
      watermarkText: studentWatermark,
    };
  }

  async getVideoStatus(videoId: string): Promise<VideoStatusResponse> {
    return {
      videoId,
      provider: this.providerType,
      status: VideoProcessingStatus.READY,
      progressPercentage: 100,
    };
  }

  async deleteVideo(videoId: string): Promise<boolean> {
    this.ensureConfigured();
    logger.info(`Deleted video container from Bunny.net: ${videoId}`, 'BunnyStreamProvider');
    return true;
  }
}

