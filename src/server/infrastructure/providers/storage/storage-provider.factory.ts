/**
 * Al-Muhandis Platform - Storage Provider Factory
 * Master Specification - Multi-Cloud Storage Architecture (GCS, S3, R2)
 */

import { IStorageProvider } from './storage-provider.interface.ts';
import { GoogleCloudStorageProvider } from './gcs.provider.ts';
import { S3StorageProvider } from './s3.provider.ts';
import { CloudflareR2StorageProvider } from './r2.provider.ts';
import { StorageProviderType } from '../../../../shared/types/notification.ts';
import { env } from '../../../config/env.ts';

export class StorageProviderFactory {
  public static getProvider(type?: StorageProviderType): IStorageProvider {
    const selectedType = type ?? env.STORAGE_PROVIDER ?? StorageProviderType.GOOGLE_CLOUD_STORAGE;
    switch (selectedType) {
      case StorageProviderType.GOOGLE_CLOUD_STORAGE:
        return new GoogleCloudStorageProvider();
      case StorageProviderType.AWS_S3:
        return new S3StorageProvider();
      case StorageProviderType.CLOUDFLARE_R2:
        return new CloudflareR2StorageProvider();
      default:
        return new GoogleCloudStorageProvider();
    }
  }

  public static getActiveProvider(): IStorageProvider {
    return this.getProvider(env.STORAGE_PROVIDER);
  }
}
