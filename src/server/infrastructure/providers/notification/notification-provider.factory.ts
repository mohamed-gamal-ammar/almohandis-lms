/**
 * Al-Muhandis Platform - Notification & Storage Provider Factories
 * Master Specification - Phase 0
 */

import {
  NotificationChannel,
  NotificationPayload,
  NotificationDeliveryResult,
  StorageProviderType,
  FileUploadRequest,
  FileUploadResponse,
} from '../../../../shared/types/notification.ts';
import { logger } from '../../logger/logger.service.ts';

// ----------------------------------------------------
// NOTIFICATION ABSTRACTION
// ----------------------------------------------------

export interface INotificationProvider {
  send(payload: NotificationPayload): Promise<NotificationDeliveryResult[]>;
}

export class MultichannelNotificationProvider implements INotificationProvider {
  async send(payload: NotificationPayload): Promise<NotificationDeliveryResult[]> {
    logger.info(`Sending notification [${payload.title}] to ${payload.recipientId} via channels: ${payload.channels.join(', ')}`, 'NotificationProvider');

    return payload.channels.map((channel) => ({
      channel,
      success: true,
      messageId: `msg_${channel.toLowerCase()}_${Date.now()}`,
    }));
  }
}

export class NotificationProviderFactory {
  public static getProvider(): INotificationProvider {
    return new MultichannelNotificationProvider();
  }
}

// ----------------------------------------------------
// STORAGE ABSTRACTION (DELEGATED TO DEDICATED STORAGE FACTORY)
// ----------------------------------------------------

export type { IStorageProvider } from '../storage/storage-provider.interface.ts';
export { StorageProviderFactory } from '../storage/storage-provider.factory.ts';

