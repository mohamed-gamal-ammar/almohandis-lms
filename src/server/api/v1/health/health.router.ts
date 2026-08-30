/**
 * Al-Muhandis Platform - Health API Controller & Router
 * Master Specification - Phase 0
 */

import { Router, Request, Response, NextFunction } from 'express';
import { dbService } from '../../../infrastructure/database/prisma.client.ts';
import { env, validateProviderConfiguration } from '../../../config/env.ts';
import { ApiResponse } from '../../../../shared/types/common.ts';

const router = Router();

router.get('/', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const dbHealth = await dbService.checkHealth();
    const memory = process.memoryUsage();
    const providerReport = validateProviderConfiguration(env);

    const healthData = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptimeSeconds: Math.floor(process.uptime()),
      environment: env.NODE_ENV,
      version: '1.0.0-phase0',
      database: dbHealth,
      providers: {
        video: env.VIDEO_PROVIDER,
        payment: env.PAYMENT_PROVIDER,
        ai: env.DEFAULT_AI_PROVIDER,
        storage: env.DEFAULT_STORAGE_PROVIDER,
      },
      providerReport,
      memory: {
        heapUsedMb: Math.round((memory.heapUsed / 1024 / 1024) * 100) / 100,
        rssMb: Math.round((memory.rss / 1024 / 1024) * 100) / 100,
      },
    };

    const response: ApiResponse = {
      success: true,
      data: healthData,
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
});

export { router as healthRouter };

