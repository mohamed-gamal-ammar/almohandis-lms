/**
 * Al-Muhandis Platform - System Meta API
 * Master Specification - Phase 0
 */

import { Router, Request, Response } from 'express';
import { env } from '../../../config/env.ts';
import { ApiResponse } from '../../../../shared/types/common.ts';
import { VideoProviderType } from '../../../../shared/types/video.ts';
import { PaymentProviderType } from '../../../../shared/types/payment.ts';
import { AIProviderType } from '../../../../shared/types/ai.ts';

const router = Router();

router.get('/', (_req: Request, res: Response) => {
  const meta = {
    appName: 'منصة المهندس التعليمية - Al-Muhandis Platform',
    phase: 'Phase 0: Project Foundation & Architecture',
    architecture: {
      framework: 'React + Node.js (Full-Stack Express) + TypeScript + Tailwind CSS',
      database: 'PostgreSQL + Prisma ORM',
      caching: 'In-Memory State Engine + Redis Ready',
      security: 'Helmet Security Headers, CORS, Zod Validation, RBAC Guards',
    },
    supportedProviders: {
      video: Object.values(VideoProviderType),
      payment: Object.values(PaymentProviderType),
      ai: Object.values(AIProviderType),
    },
    activeProviders: {
      video: env.VIDEO_PROVIDER,
      payment: env.PAYMENT_PROVIDER,
      ai: env.DEFAULT_AI_PROVIDER,
      storage: env.DEFAULT_STORAGE_PROVIDER,
    },
    capabilities: [
      'MAJOR_CAPABILITY_SERVER_SIDE_GEMINI_API',
      'MULTI_PROVIDER_VIDEO_STREAMING',
      'PAYMOB_STRIPE_FAWRY_CHECKOUT',
      'RTL_ARABIC_FIRST_DESIGN_SYSTEM',
      'DYNAMIC_FEATURE_FLAGS_ENGINE',
    ],
  };

  const response: ApiResponse = {
    success: true,
    data: meta,
  };

  res.json(response);
});

export { router as metaRouter };
