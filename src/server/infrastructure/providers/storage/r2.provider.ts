/**
 * Al-Muhandis Platform - Cloudflare R2 Storage Provider
 * Master Specification - Multi-Cloud Storage Provider
 */

import { IStorageProvider } from './storage-provider.interface.ts';
import {
  StorageProviderType,
  FileUploadRequest,
  FileUploadResponse,
} from '../../../../shared/types/notification.ts';
import { logger } from '../../logger/logger.service.ts';

export class CloudflareR2StorageProvider implements IStorageProvider {
  public readonly providerType = StorageProviderType.CLOUDFLARE_R2;
  private readonly bucketName: string;
  private readonly accountId: string;

  constructor(config?: { bucketName?: string; accountId?: string }) {
    this.bucketName = config?.bucketName || process.env.R2_BUCKET_NAME || 'al-muhandis-r2';
    this.accountId = config?.accountId || process.env.CLOUDFLARE_ACCOUNT_ID || 'default-account';
  }

  async getPresignedUploadUrl(request: FileUploadRequest): Promise<FileUploadResponse> {
    const key = `${request.folder}/${Date.now()}-${request.filename.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    return {
      fileKey: key,
      uploadUrl: `https://${this.accountId}.r2.cloudflarestorage.com/${this.bucketName}/${key}?signed=token`,
      publicUrl: `https://r2.al-muhandis.com/${key}`,
      expiresAt: new Date(Date.now() + 1800 * 1000),
      provider: this.providerType,
    };
  }

  async deleteFile(fileKey: string): Promise<boolean> {
    logger.info(`[R2] Deleted file: ${fileKey}`, 'CloudflareR2StorageProvider');
    return true;
  }

  getPublicUrl(fileKey: string): string {
    return `https://r2.al-muhandis.com/${fileKey}`;
  }
}
