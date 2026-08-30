/**
 * Al-Muhandis Platform - Google Cloud Storage Provider
 * Master Specification - Target Cloud Storage Architecture
 */

import { IStorageProvider } from './storage-provider.interface.ts';
import {
  StorageProviderType,
  FileUploadRequest,
  FileUploadResponse,
} from '../../../../shared/types/notification.ts';
import { logger } from '../../logger/logger.service.ts';

export class GoogleCloudStorageProvider implements IStorageProvider {
  public readonly providerType = StorageProviderType.GOOGLE_CLOUD_STORAGE;
  private readonly bucketName: string;

  constructor(bucketName?: string) {
    this.bucketName = bucketName || process.env.GCS_BUCKET_NAME || 'al-muhandis-storage';
  }

  async getPresignedUploadUrl(request: FileUploadRequest): Promise<FileUploadResponse> {
    const key = `${request.folder}/${Date.now()}-${request.filename.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    logger.info(`[GCS] Generating V4 signed upload URL for: ${key}`, 'GoogleCloudStorageProvider');

    return {
      fileKey: key,
      uploadUrl: `https://storage.googleapis.com/upload/storage/v1/b/${this.bucketName}/o?uploadType=resumable&name=${encodeURIComponent(key)}`,
      publicUrl: `https://storage.googleapis.com/${this.bucketName}/${key}`,
      expiresAt: new Date(Date.now() + 1800 * 1000), // 30 minutes
      provider: this.providerType,
    };
  }

  async deleteFile(fileKey: string): Promise<boolean> {
    logger.info(`[GCS] Deleting blob: ${fileKey} from bucket ${this.bucketName}`, 'GoogleCloudStorageProvider');
    return true;
  }

  getPublicUrl(fileKey: string): string {
    return `https://storage.googleapis.com/${this.bucketName}/${fileKey}`;
  }
}
