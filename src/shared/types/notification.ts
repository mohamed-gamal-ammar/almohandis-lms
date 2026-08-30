/**
 * Al-Muhandis Platform - Notification & Storage Types
 * Master Specification - Phase 0
 */

export enum NotificationChannel {
  EMAIL = 'EMAIL',
  SMS = 'SMS',
  WHATSAPP = 'WHATSAPP',
  IN_APP = 'IN_APP',
}

export enum NotificationPriority {
  LOW = 'LOW',
  NORMAL = 'NORMAL',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
}

export interface NotificationPayload {
  recipientId: string;
  recipientEmail?: string;
  recipientPhone?: string;
  title: string;
  body: string;
  channels: NotificationChannel[];
  priority?: NotificationPriority;
  metadata?: Record<string, unknown>;
  actionUrl?: string;
}

export interface NotificationDeliveryResult {
  channel: NotificationChannel;
  success: boolean;
  messageId?: string;
  error?: string;
}

export enum StorageProviderType {
  AWS_S3 = 'AWS_S3',
  GOOGLE_CLOUD_STORAGE = 'GOOGLE_CLOUD_STORAGE',
  CLOUDFLARE_R2 = 'CLOUDFLARE_R2',
  LOCAL_DISK = 'LOCAL_DISK',
}

export interface FileUploadRequest {
  filename: string;
  contentType: string;
  sizeBytes: number;
  folder: 'attachments' | 'avatars' | 'certificates' | 'course-materials' | 'temp';
  isPublic?: boolean;
}

export interface FileUploadResponse {
  fileKey: string;
  uploadUrl: string; // Presigned PUT or POST URL
  publicUrl?: string;
  expiresAt: Date;
  provider: StorageProviderType;
}
