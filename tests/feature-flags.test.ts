/**
 * Al-Muhandis Platform - Phase 0 Unit Tests
 * Feature Flags & State Management Test Suite
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { featureFlagService } from '../src/server/infrastructure/feature-flags/feature-flag.service.ts';
import { FeatureFlagKey } from '../src/shared/types/feature-flags.ts';

describe('FeatureFlagService Unit Tests', () => {
  beforeEach(() => {
    featureFlagService.resetToDefaults();
  });

  it('should initialize with default flags configuration', () => {
    const isAiEnabled = featureFlagService.isEnabled(FeatureFlagKey.AI_TUTOR_CHAT);
    expect(isAiEnabled).toBe(true);

    const isMaintenance = featureFlagService.isEnabled(FeatureFlagKey.MAINTENANCE_MODE);
    expect(isMaintenance).toBe(false);
  });

  it('should allow dynamic toggling of feature flags', () => {
    featureFlagService.setFlag(FeatureFlagKey.MAINTENANCE_MODE, true);
    expect(featureFlagService.isEnabled(FeatureFlagKey.MAINTENANCE_MODE)).toBe(true);

    featureFlagService.setFlag(FeatureFlagKey.AI_TUTOR_CHAT, false);
    expect(featureFlagService.isEnabled(FeatureFlagKey.AI_TUTOR_CHAT)).toBe(false);
  });

  it('should return client-visible flags correctly filtered', () => {
    const clientFlags = featureFlagService.getClientVisibleFlags();
    expect(clientFlags[FeatureFlagKey.AI_TUTOR_CHAT]).toBeDefined();
    // DRM encryption is internal and not client visible by default
    expect(clientFlags[FeatureFlagKey.DRM_ENCRYPTION]).toBeUndefined();
  });
});
