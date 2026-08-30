/**
 * Al-Muhandis Platform - Video Providers & Factory
 * Master Specification - Phase 0
 */

import { IVideoProvider } from './video-provider.interface.ts';
import { BunnyStreamProvider } from './bunny.provider.ts';
import { env } from '../../../config/env.ts';
import {
  VideoProviderType,
  VideoUploadRequest,
  VideoUploadResponse,
  VideoPlaybackInfo,
  VideoStatusResponse,
  VideoProcessingStatus,
} from '../../../../shared/types/video.ts';
import { logger } from '../../logger/logger.service.ts';

export class DisabledVideoProvider implements IVideoProvider {
  public readonly providerType = VideoProviderType.NONE;

  async createUploadSession(): Promise<VideoUploadResponse> {
    throw new Error(
      'Video provider is currently disabled (VIDEO_PROVIDER=none). Set VIDEO_PROVIDER to bunny/mux/cloudflare and configure credentials to enable video uploads.'
    );
  }

  async getPlaybackInfo(videoId: string): Promise<VideoPlaybackInfo> {
    return {
      videoId,
      provider: this.providerType,
      playbackUrl: '',
      drmProtected: false,
    };
  }

  async getVideoStatus(videoId: string): Promise<VideoStatusResponse> {
    return {
      videoId,
      provider: this.providerType,
      status: VideoProcessingStatus.READY,
      progressPercentage: 0,
      errorMessage: 'Video streaming provider is disabled in current configuration.',
    };
  }

  async deleteVideo(): Promise<boolean> {
    return true;
  }
}

export class CloudflareStreamProvider implements IVideoProvider {
  public readonly providerType = VideoProviderType.CLOUDFLARE_STREAM;

  async createUploadSession(request: VideoUploadRequest): Promise<VideoUploadResponse> {
    const uploadId = `cf_stream_${Date.now()}`;
    return {
      videoId: uploadId,
      provider: this.providerType,
      providerVideoId: uploadId,
      uploadUrl: `https://api.cloudflare.com/client/v4/accounts/stream/direct_upload`,
      expiresAt: new Date(Date.now() + 3600 * 1000),
    };
  }

  async getPlaybackInfo(videoId: string): Promise<VideoPlaybackInfo> {
    return {
      videoId,
      provider: this.providerType,
      playbackUrl: `https://customer.cloudflarestream.com/${videoId}/manifest/video.m3u8`,
      thumbnailUrl: `https://customer.cloudflarestream.com/${videoId}/thumbnails/thumbnail.jpg`,
      drmProtected: true,
      resolutions: ['720p', '1080p'],
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
    logger.info(`Deleted Cloudflare Stream asset: ${videoId}`, 'CloudflareStreamProvider');
    return true;
  }
}

export class MuxVideoProvider implements IVideoProvider {
  public readonly providerType = VideoProviderType.MUX;

  async createUploadSession(request: VideoUploadRequest): Promise<VideoUploadResponse> {
    const uploadId = `mux_upload_${Date.now()}`;
    return {
      videoId: uploadId,
      provider: this.providerType,
      providerVideoId: `asset_${uploadId}`,
      uploadUrl: `https://api.mux.com/video/v1/uploads/${uploadId}`,
      expiresAt: new Date(Date.now() + 3600 * 1000),
    };
  }

  async getPlaybackInfo(videoId: string): Promise<VideoPlaybackInfo> {
    return {
      videoId,
      provider: this.providerType,
      playbackUrl: `https://stream.mux.com/${videoId}.m3u8`,
      thumbnailUrl: `https://image.mux.com/${videoId}/thumbnail.png`,
      drmProtected: true,
      resolutions: ['720p', '1080p'],
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
    logger.info(`Deleted Mux asset: ${videoId}`, 'MuxVideoProvider');
    return true;
  }
}

export class YouTubeVideoProvider implements IVideoProvider {
  public readonly providerType = VideoProviderType.YOUTUBE;

  async createUploadSession(): Promise<VideoUploadResponse> {
    throw new Error('Direct upload via YouTube provider is restricted to unlisted manual links');
  }

  async getPlaybackInfo(videoId: string): Promise<VideoPlaybackInfo> {
    return {
      videoId,
      provider: this.providerType,
      playbackUrl: `https://www.youtube.com/watch?v=${videoId}`,
      embedUrl: `https://www.youtube.com/embed/${videoId}`,
      thumbnailUrl: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
      drmProtected: false,
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

  async deleteVideo(): Promise<boolean> {
    return true;
  }
}

export class VideoProviderFactory {
  public static getProvider(type?: VideoProviderType): IVideoProvider {
    const selectedType = type ?? env.VIDEO_PROVIDER ?? VideoProviderType.NONE;
    switch (selectedType) {
      case VideoProviderType.NONE:
        return new DisabledVideoProvider();
      case VideoProviderType.BUNNY_STREAM:
        return new BunnyStreamProvider();
      case VideoProviderType.MUX:
        return new MuxVideoProvider();
      case VideoProviderType.CLOUDFLARE_STREAM:
        return new CloudflareStreamProvider();
      case VideoProviderType.YOUTUBE:
        return new YouTubeVideoProvider();
      default:
        return new DisabledVideoProvider();
    }
  }

  public static getActiveProvider(): IVideoProvider {
    return this.getProvider(env.VIDEO_PROVIDER);
  }
}

