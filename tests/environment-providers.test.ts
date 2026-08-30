/**
 * Al-Muhandis Platform - Environment & Provider Architecture Tests
 * Master Specification - Phase 0 Verification
 */

import { describe, it, expect } from 'vitest';
import { env, validateProviderConfiguration } from '../src/server/config/env.ts';
import {
  VideoProviderFactory,
  DisabledVideoProvider,
  CloudflareStreamProvider,
  MuxVideoProvider,
} from '../src/server/infrastructure/providers/video/video-provider.factory.ts';
import {
  PaymentProviderFactory,
  DisabledPaymentProvider,
  FawryPaymentProvider,
} from '../src/server/infrastructure/providers/payment/payment-provider.factory.ts';
import {
  StorageProviderFactory,
} from '../src/server/infrastructure/providers/storage/storage-provider.factory.ts';
import { GoogleCloudStorageProvider } from '../src/server/infrastructure/providers/storage/gcs.provider.ts';
import { S3StorageProvider } from '../src/server/infrastructure/providers/storage/s3.provider.ts';
import { CloudflareR2StorageProvider } from '../src/server/infrastructure/providers/storage/r2.provider.ts';
import { AIProviderFactory } from '../src/server/infrastructure/providers/ai/ai-provider.factory.ts';
import { VideoProviderType } from '../src/shared/types/video.ts';
import { PaymentProviderType } from '../src/shared/types/payment.ts';
import { StorageProviderType } from '../src/shared/types/notification.ts';
import { AIProviderType } from '../src/shared/types/ai.ts';

describe('Environment & Provider Architecture Final Verification', () => {
  it('should have core required variables configured without crashing', () => {
    expect(env.DATABASE_URL).toBeDefined();
    expect(env.JWT_SECRET).toBeDefined();
    expect(typeof env.DATABASE_URL).toBe('string');
    expect(typeof env.JWT_SECRET).toBe('string');
  });

  it('should default VIDEO_PROVIDER and PAYMENT_PROVIDER to NONE', () => {
    expect(env.VIDEO_PROVIDER).toBe(VideoProviderType.NONE);
    expect(env.PAYMENT_PROVIDER).toBe(PaymentProviderType.NONE);
  });

  it('should default target STORAGE_PROVIDER to Google Cloud Storage (not S3)', () => {
    expect(env.DEFAULT_STORAGE_PROVIDER).toBe(StorageProviderType.GOOGLE_CLOUD_STORAGE);
    const activeStorage = StorageProviderFactory.getActiveProvider();
    expect(activeStorage).toBeInstanceOf(GoogleCloudStorageProvider);
    expect(activeStorage.providerType).toBe(StorageProviderType.GOOGLE_CLOUD_STORAGE);
  });

  it('should support multi-cloud storage abstraction (GCS, S3, R2) without business logic changes', () => {
    const gcs = StorageProviderFactory.getProvider(StorageProviderType.GOOGLE_CLOUD_STORAGE);
    expect(gcs).toBeInstanceOf(GoogleCloudStorageProvider);
    expect(gcs.providerType).toBe(StorageProviderType.GOOGLE_CLOUD_STORAGE);

    const s3 = StorageProviderFactory.getProvider(StorageProviderType.AWS_S3);
    expect(s3).toBeInstanceOf(S3StorageProvider);
    expect(s3.providerType).toBe(StorageProviderType.AWS_S3);

    const r2 = StorageProviderFactory.getProvider(StorageProviderType.CLOUDFLARE_R2);
    expect(r2).toBeInstanceOf(CloudflareR2StorageProvider);
    expect(r2.providerType).toBe(StorageProviderType.CLOUDFLARE_R2);
  });

  it('should provide configurable AI provider abstraction', () => {
    const aiProvider = AIProviderFactory.getActiveProvider();
    expect(aiProvider).toBeDefined();
    expect(aiProvider.providerType).toBe(AIProviderType.GEMINI);

    const openaiProvider = AIProviderFactory.getProvider(AIProviderType.OPENAI);
    expect(openaiProvider.providerType).toBe(AIProviderType.OPENAI);
  });

  it('should return DisabledVideoProvider when video provider is none', () => {
    const provider = VideoProviderFactory.getActiveProvider();
    expect(provider).toBeInstanceOf(DisabledVideoProvider);
    expect(provider.providerType).toBe(VideoProviderType.NONE);
  });

  it('should return DisabledPaymentProvider when payment provider is none', () => {
    const provider = PaymentProviderFactory.getActiveProvider();
    expect(provider).toBeInstanceOf(DisabledPaymentProvider);
    expect(provider.providerType).toBe(PaymentProviderType.NONE);
  });

  it('should support dynamic instantiation of Mux and Cloudflare providers without breaking course engine', () => {
    const muxProvider = VideoProviderFactory.getProvider(VideoProviderType.MUX);
    expect(muxProvider).toBeInstanceOf(MuxVideoProvider);
    expect(muxProvider.providerType).toBe(VideoProviderType.MUX);

    const cfProvider = VideoProviderFactory.getProvider(VideoProviderType.CLOUDFLARE_STREAM);
    expect(cfProvider).toBeInstanceOf(CloudflareStreamProvider);
    expect(cfProvider.providerType).toBe(VideoProviderType.CLOUDFLARE_STREAM);
  });

  it('should support dynamic instantiation of Fawry payment provider', () => {
    const fawryProvider = PaymentProviderFactory.getProvider(PaymentProviderType.FAWRY);
    expect(fawryProvider).toBeInstanceOf(FawryPaymentProvider);
    expect(fawryProvider.providerType).toBe(PaymentProviderType.FAWRY);
  });

  it('should validate provider configuration without exposing any secret values', () => {
    const report = validateProviderConfiguration(env);
    expect(report.videoProvider.active).toBe(VideoProviderType.NONE);
    expect(report.videoProvider.isConfigured).toBe(false);
    expect(report.paymentProvider.active).toBe(PaymentProviderType.NONE);
    expect(report.paymentProvider.isConfigured).toBe(false);

    // Ensure no secret values are returned in the validation report
    expect(JSON.stringify(report)).not.toContain(env.JWT_SECRET);
  });
});
