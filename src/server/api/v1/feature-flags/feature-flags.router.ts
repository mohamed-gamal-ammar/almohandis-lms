/**
 * Al-Muhandis Platform - Feature Flags API Router
 * Master Specification - Phase 0
 */

import { Router, Request, Response, NextFunction } from 'express';
import { featureFlagService } from '../../../infrastructure/feature-flags/feature-flag.service.ts';
import { FeatureFlagKey } from '../../../../shared/types/feature-flags.ts';
import { validateBody } from '../../../middleware/validation.middleware.ts';
import { FeatureFlagToggleSchema } from '../../../../shared/schemas/index.ts';
import { ApiResponse } from '../../../../shared/types/common.ts';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  const isFullRequested = req.query.mode === 'full';
  const data = isFullRequested
    ? featureFlagService.getDefinitions()
    : featureFlagService.getClientVisibleFlags();

  const response: ApiResponse = {
    success: true,
    data,
  };

  res.json(response);
});

router.post(
  '/toggle',
  validateBody(FeatureFlagToggleSchema),
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const { key, enabled } = req.body;
      featureFlagService.setFlag(key as FeatureFlagKey, enabled);

      const response: ApiResponse = {
        success: true,
        message: `تم تحديث الميزة ${key} بنجاح إلى ${enabled ? 'مفعل' : 'معطل'}`,
        data: {
          key,
          enabled,
          allFlags: featureFlagService.getClientVisibleFlags(),
        },
      };

      res.json(response);
    } catch (err) {
      next(err);
    }
  },
);

router.post('/reset', (_req: Request, res: Response) => {
  featureFlagService.resetToDefaults();
  const response: ApiResponse = {
    success: true,
    message: 'تم إعادة ضبط جميع Feature Flags إلى القيم الافتراضية',
    data: featureFlagService.getClientVisibleFlags(),
  };
  res.json(response);
});

export { router as featureFlagsRouter };
