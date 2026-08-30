/**
 * Al-Muhandis Platform - Runtime Zod Schemas
 * Master Specification - Phase 0
 */

import { z } from 'zod';
import { UserRole } from '../types/auth.ts';
import { PaymentProviderType, Currency } from '../types/payment.ts';
import { VideoProviderType } from '../types/video.ts';
import { AIProviderType } from '../types/ai.ts';

export const HealthCheckResponseSchema = z.object({
  status: z.enum(['healthy', 'degraded', 'unhealthy']),
  timestamp: z.string(),
  uptime: z.number(),
  environment: z.string(),
  version: z.string(),
  database: z.object({
    status: z.enum(['connected', 'disconnected', 'unreachable']),
    latencyMs: z.number().optional(),
  }),
  services: z.object({
    videoProvider: z.nativeEnum(VideoProviderType),
    paymentProvider: z.nativeEnum(PaymentProviderType),
    aiProvider: z.nativeEnum(AIProviderType),
  }),
  memory: z.object({
    heapUsedMb: z.number(),
    rssMb: z.number(),
  }),
});

export const FeatureFlagToggleSchema = z.object({
  key: z.string().min(1),
  enabled: z.boolean(),
});

export const InitiatePaymentDtoSchema = z.object({
  orderId: z.string().min(3),
  amount: z.number().positive(),
  currency: z.nativeEnum(Currency).default(Currency.EGP),
  customer: z.object({
    id: z.string(),
    email: z.string().email(),
    name: z.string().min(2),
    phone: z.string().optional(),
  }),
  description: z.string().min(3),
  callbackUrl: z.string().url(),
  cancelUrl: z.string().url(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const VideoUploadDtoSchema = z.object({
  title: z.string().min(3).max(200),
  filename: z.string().min(3),
  filesizeBytes: z.number().positive().optional(),
  collectionId: z.string().optional(),
});

export const AIChatDtoSchema = z.object({
  messages: z.array(
    z.object({
      role: z.enum(['system', 'user', 'assistant']),
      content: z.string().min(1),
    }),
  ).min(1),
  courseContext: z.object({
    courseId: z.string().optional(),
    lessonTitle: z.string().optional(),
    lessonTranscript: z.string().optional(),
  }).optional(),
});
