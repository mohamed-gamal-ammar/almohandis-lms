/**
 * Al-Muhandis Platform - Environment Configuration & Validation
 * Master Specification - Phase 0
 */

import { z } from 'zod';
import { VideoProviderType } from '../../shared/types/video.ts';
import { PaymentProviderType } from '../../shared/types/payment.ts';
import { AIProviderType } from '../../shared/types/ai.ts';
import { StorageProviderType } from '../../shared/types/notification.ts';

// Helper to normalize video provider input strings
function parseVideoProvider(val: unknown): VideoProviderType {
  if (typeof val !== 'string') return VideoProviderType.NONE;
  const normalized = val.trim().toUpperCase();
  if (normalized === 'NONE' || normalized === 'DISABLED' || normalized === 'OFF') return VideoProviderType.NONE;
  if (normalized === 'BUNNY' || normalized === 'BUNNY_STREAM' || normalized === 'BUNNYSTREAM') return VideoProviderType.BUNNY_STREAM;
  if (normalized === 'MUX') return VideoProviderType.MUX;
  if (normalized === 'CLOUDFLARE' || normalized === 'CLOUDFLARE_STREAM') return VideoProviderType.CLOUDFLARE_STREAM;
  if (normalized === 'YOUTUBE') return VideoProviderType.YOUTUBE;
  if (normalized === 'DIRECT_HLS') return VideoProviderType.DIRECT_HLS;
  return VideoProviderType.NONE;
}

// Helper to normalize payment provider input strings
function parsePaymentProvider(val: unknown): PaymentProviderType {
  if (typeof val !== 'string') return PaymentProviderType.NONE;
  const normalized = val.trim().toUpperCase();
  if (normalized === 'NONE' || normalized === 'DISABLED' || normalized === 'OFF') return PaymentProviderType.NONE;
  if (normalized === 'PAYMOB') return PaymentProviderType.PAYMOB;
  if (normalized === 'STRIPE') return PaymentProviderType.STRIPE;
  if (normalized === 'FAWRY') return PaymentProviderType.FAWRY;
  if (normalized === 'KASHIER') return PaymentProviderType.KASHIER;
  return PaymentProviderType.NONE;
}

// Helper to normalize AI provider input strings
function parseAIProvider(val: unknown): AIProviderType {
  if (typeof val !== 'string') return AIProviderType.GEMINI;
  const normalized = val.trim().toUpperCase();
  if (normalized === 'OPENAI') return AIProviderType.OPENAI;
  if (normalized === 'ANTHROPIC') return AIProviderType.ANTHROPIC;
  return AIProviderType.GEMINI;
}

// Helper to normalize storage provider input strings
function parseStorageProvider(val: unknown): StorageProviderType {
  if (typeof val !== 'string') return StorageProviderType.GOOGLE_CLOUD_STORAGE;
  const normalized = val.trim().toUpperCase();
  if (normalized === 'AWS_S3' || normalized === 'S3') return StorageProviderType.AWS_S3;
  if (normalized === 'CLOUDFLARE_R2' || normalized === 'R2') return StorageProviderType.CLOUDFLARE_R2;
  if (normalized === 'LOCAL' || normalized === 'LOCAL_DISK') return StorageProviderType.LOCAL_DISK;
  return StorageProviderType.GOOGLE_CLOUD_STORAGE;
}

const EnvironmentSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().default(3000),
  APP_URL: z.string().default('http://localhost:3000'),

  // Core Application Required Variables
  DATABASE_URL: z
    .string()
    .min(1, 'DATABASE_URL is required for database operations')
    .default('postgresql://postgres:postgres@localhost:5432/al_muhandis_db?schema=public'),
  JWT_SECRET: z
    .string()
    .min(1, 'JWT_SECRET is required for authentication')
    .default('al_muhandis_jwt_secret_dev_key_phase0'),
  JWT_EXPIRES_IN: z.string().default('7d'),
  CORS_ORIGIN: z.string().default('*'),

  // Active Video Provider Selection (none | bunny | mux | cloudflare | youtube)
  VIDEO_PROVIDER: z.preprocess(
    (val) => val ?? process.env.DEFAULT_VIDEO_PROVIDER ?? 'none',
    z.nativeEnum(VideoProviderType)
  ).default(VideoProviderType.NONE),

  // Active Payment Provider Selection (none | paymob | stripe | fawry)
  PAYMENT_PROVIDER: z.preprocess(
    (val) => val ?? process.env.DEFAULT_PAYMENT_PROVIDER ?? 'none',
    z.nativeEnum(PaymentProviderType)
  ).default(PaymentProviderType.NONE),

  // AI Provider (Configurable abstraction, defaults to Gemini for development)
  AI_PROVIDER: z.preprocess(
    (val) => val ?? process.env.DEFAULT_AI_PROVIDER ?? 'gemini',
    z.nativeEnum(AIProviderType)
  ).default(AIProviderType.GEMINI),

  // Cloud Storage Provider (Target architecture: Google Cloud Storage)
  STORAGE_PROVIDER: z.preprocess(
    (val) => val ?? process.env.DEFAULT_STORAGE_PROVIDER ?? 'google_cloud_storage',
    z.nativeEnum(StorageProviderType)
  ).default(StorageProviderType.GOOGLE_CLOUD_STORAGE),

  // Optional Provider Credentials (Only required when corresponding provider is active)
  GEMINI_API_KEY: z.string().optional(),
  
  // Bunny
  BUNNY_API_KEY: z.string().optional(),
  BUNNY_LIBRARY_ID: z.string().optional(),

  // Mux
  MUX_TOKEN_ID: z.string().optional(),
  MUX_TOKEN_SECRET: z.string().optional(),
  MUX_SIGNING_KEY: z.string().optional(),

  // Cloudflare
  CLOUDFLARE_ACCOUNT_ID: z.string().optional(),
  CLOUDFLARE_API_TOKEN: z.string().optional(),
  CLOUDFLARE_STREAM_SIGNING_KEY: z.string().optional(),

  // Paymob
  PAYMOB_API_KEY: z.string().optional(),
  PAYMOB_SECRET_KEY: z.string().optional(),
  PAYMOB_PUBLIC_KEY: z.string().optional(),

  // Stripe
  STRIPE_SECRET_KEY: z.string().optional(),
  STRIPE_PUBLISHABLE_KEY: z.string().optional(),
  STRIPE_WEBHOOK_SECRET: z.string().optional(),

  // GCS / S3 / R2 Bucket Configuration (Optional)
  GCS_BUCKET_NAME: z.string().optional(),
  S3_BUCKET_NAME: z.string().optional(),
  R2_BUCKET_NAME: z.string().optional(),
});

export type Environment = z.infer<typeof EnvironmentSchema> & {
  DEFAULT_VIDEO_PROVIDER: VideoProviderType;
  DEFAULT_PAYMENT_PROVIDER: PaymentProviderType;
  DEFAULT_AI_PROVIDER: AIProviderType;
  DEFAULT_STORAGE_PROVIDER: StorageProviderType;
};

export interface ProviderValidationReport {
  videoProvider: {
    active: VideoProviderType;
    isConfigured: boolean;
    missingKeys: string[];
  };
  paymentProvider: {
    active: PaymentProviderType;
    isConfigured: boolean;
    missingKeys: string[];
  };
}

export function validateProviderConfiguration(config: Environment): ProviderValidationReport {
  // Validate video provider conditionally
  const videoMissing: string[] = [];
  if (config.VIDEO_PROVIDER === VideoProviderType.BUNNY_STREAM) {
    if (!config.BUNNY_API_KEY) videoMissing.push('BUNNY_API_KEY');
    if (!config.BUNNY_LIBRARY_ID) videoMissing.push('BUNNY_LIBRARY_ID');
  } else if (config.VIDEO_PROVIDER === VideoProviderType.MUX) {
    if (!config.MUX_TOKEN_ID) videoMissing.push('MUX_TOKEN_ID');
    if (!config.MUX_TOKEN_SECRET) videoMissing.push('MUX_TOKEN_SECRET');
  } else if (config.VIDEO_PROVIDER === VideoProviderType.CLOUDFLARE_STREAM) {
    if (!config.CLOUDFLARE_ACCOUNT_ID) videoMissing.push('CLOUDFLARE_ACCOUNT_ID');
    if (!config.CLOUDFLARE_API_TOKEN) videoMissing.push('CLOUDFLARE_API_TOKEN');
  }

  // Validate payment provider conditionally
  const paymentMissing: string[] = [];
  if (config.PAYMENT_PROVIDER === PaymentProviderType.PAYMOB) {
    if (!config.PAYMOB_API_KEY && !config.PAYMOB_SECRET_KEY) paymentMissing.push('PAYMOB_API_KEY');
  } else if (config.PAYMENT_PROVIDER === PaymentProviderType.STRIPE) {
    if (!config.STRIPE_SECRET_KEY) paymentMissing.push('STRIPE_SECRET_KEY');
  }

  return {
    videoProvider: {
      active: config.VIDEO_PROVIDER,
      isConfigured: videoMissing.length === 0 && config.VIDEO_PROVIDER !== VideoProviderType.NONE,
      missingKeys: videoMissing,
    },
    paymentProvider: {
      active: config.PAYMENT_PROVIDER,
      isConfigured: paymentMissing.length === 0 && config.PAYMENT_PROVIDER !== PaymentProviderType.NONE,
      missingKeys: paymentMissing,
    },
  };
}

function loadConfig(): Environment {
  const rawEnv = {
    ...process.env,
    VIDEO_PROVIDER: parseVideoProvider(process.env.VIDEO_PROVIDER ?? process.env.DEFAULT_VIDEO_PROVIDER),
    PAYMENT_PROVIDER: parsePaymentProvider(process.env.PAYMENT_PROVIDER ?? process.env.DEFAULT_PAYMENT_PROVIDER),
    AI_PROVIDER: parseAIProvider(process.env.AI_PROVIDER ?? process.env.DEFAULT_AI_PROVIDER),
    STORAGE_PROVIDER: parseStorageProvider(process.env.STORAGE_PROVIDER ?? process.env.DEFAULT_STORAGE_PROVIDER),
  };

  const result = EnvironmentSchema.safeParse(rawEnv);
  const parsedData = result.success ? result.data : EnvironmentSchema.parse({});

  const data: Environment = {
    ...parsedData,
    DEFAULT_VIDEO_PROVIDER: parsedData.VIDEO_PROVIDER,
    DEFAULT_PAYMENT_PROVIDER: parsedData.PAYMENT_PROVIDER,
    DEFAULT_AI_PROVIDER: parsedData.AI_PROVIDER,
    DEFAULT_STORAGE_PROVIDER: parsedData.STORAGE_PROVIDER,
  };

  // Ensure critical variables are populated in process.env for Prisma / downstream libraries
  if (!process.env.DATABASE_URL && data.DATABASE_URL) {
    process.env.DATABASE_URL = data.DATABASE_URL;
  }
  if (!process.env.JWT_SECRET && data.JWT_SECRET) {
    process.env.JWT_SECRET = data.JWT_SECRET;
  }

  return data;
}

export const env = loadConfig();

