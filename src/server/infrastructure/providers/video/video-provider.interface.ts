/**
 * Al-Muhandis Platform - Video Provider Interface & Abstraction
 * Master Specification - Phase 0
 */

import {
  VideoProviderType,
  VideoUploadRequest,
  VideoUploadResponse,
  VideoPlaybackInfo,
  VideoStatusResponse,
} from '../../../../shared/types/video.ts';

export interface IVideoProvider {
  readonly providerType: VideoProviderType;

  /**
   * Generates a secure direct upload token or pre-signed URL for video ingest
   */
  createUploadSession(request: VideoUploadRequest): Promise<VideoUploadResponse>;

  /**
   * Retrieves signed playback URL with dynamic token and DRM policies
   */
  getPlaybackInfo(videoId: string, studentId?: string, userIp?: string): Promise<VideoPlaybackInfo>;

  /**
   * Checks the transcoding and optimization progress of an uploaded video
   */
  getVideoStatus(videoId: string): Promise<VideoStatusResponse>;

  /**
   * Deletes a video asset from the remote video cloud
   */
  deleteVideo(videoId: string): Promise<boolean>;
}
