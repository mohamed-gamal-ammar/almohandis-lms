/**
 * Al-Muhandis Platform - Feature Flag Management Service
 * Master Specification - Phase 0
 */

import { FeatureFlagKey, FeatureFlagState } from '../../../shared/types/feature-flags.ts';
import {
  FEATURE_FLAG_REGISTRY,
  DEFAULT_FEATURE_FLAG_STATE,
} from '../../../shared/constants/feature-flags.ts';
import { logger } from '../logger/logger.service.ts';

export class FeatureFlagService {
  private static instance: FeatureFlagService;
  private flagsState: FeatureFlagState;

  private constructor() {
    this.flagsState = { ...DEFAULT_FEATURE_FLAG_STATE };
  }

  public static getInstance(): FeatureFlagService {
    if (!FeatureFlagService.instance) {
      FeatureFlagService.instance = new FeatureFlagService();
    }
    return FeatureFlagService.instance;
  }

  public isEnabled(key: FeatureFlagKey): boolean {
    if (!(key in this.flagsState)) {
      logger.warn(`Feature flag key not recognized: ${key}`, 'FeatureFlagService');
      return false;
    }
    return this.flagsState[key] ?? false;
  }

  public getAllFlags(): FeatureFlagState {
    return { ...this.flagsState };
  }

  public getClientVisibleFlags(): Partial<FeatureFlagState> {
    const visible: Partial<FeatureFlagState> = {};
    for (const [k, def] of Object.entries(FEATURE_FLAG_REGISTRY)) {
      const flagKey = k as FeatureFlagKey;
      if (def.isClientVisible) {
        visible[flagKey] = this.flagsState[flagKey];
      }
    }
    return visible;
  }

  public getDefinitions() {
    return Object.values(FEATURE_FLAG_REGISTRY).map((def) => ({
      ...def,
      isEnabled: this.flagsState[def.key],
    }));
  }

  public setFlag(key: FeatureFlagKey, enabled: boolean): void {
    if (key in this.flagsState) {
      this.flagsState[key] = enabled;
      logger.info(`Feature flag [${key}] updated to ${enabled}`, 'FeatureFlagService');
    }
  }

  public resetToDefaults(): void {
    this.flagsState = { ...DEFAULT_FEATURE_FLAG_STATE };
    logger.info('Feature flags reset to defaults', 'FeatureFlagService');
  }
}

export const featureFlagService = FeatureFlagService.getInstance();
