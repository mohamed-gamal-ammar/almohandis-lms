/**
 * Al-Muhandis Platform - Storage Provider Interface
 * Master Specification - Phase 0
 */

import {
  StorageProviderType,
  FileUploadRequest,
  FileUploadResponse,
} from '../../../../shared/types/notification.ts';

export interface IStorageProvider {
  readonly providerType: StorageProviderType;
  getPresignedUploadUrl(request: FileUploadRequest): Promise<FileUploadResponse>;
  deleteFile(fileKey: string): Promise<boolean>;
  getPublicUrl(fileKey: string): string;
}
