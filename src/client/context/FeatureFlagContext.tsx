/**
 * Al-Muhandis Platform - Feature Flag React Context & Hook
 * Master Specification - Phase 0
 */

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { FeatureFlagKey, FeatureFlagState } from '../../shared/types/feature-flags.ts';
import { DEFAULT_FEATURE_FLAG_STATE } from '../../shared/constants/feature-flags.ts';
import { apiClient } from '../api/client.ts';

interface FeatureFlagContextValue {
  flags: FeatureFlagState;
  isEnabled: (key: FeatureFlagKey) => boolean;
  toggleFlag: (key: FeatureFlagKey, enabled: boolean) => Promise<void>;
  resetFlags: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
  refreshFlags: () => Promise<void>;
}

const FeatureFlagContext = createContext<FeatureFlagContextValue | undefined>(undefined);

export const FeatureFlagProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [flags, setFlags] = useState<FeatureFlagState>({ ...DEFAULT_FEATURE_FLAG_STATE });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const refreshFlags = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await apiClient.getFeatureFlags(true);
      if (Array.isArray(res)) {
        const flagMap = res.reduce((acc, item) => {
          acc[item.key as FeatureFlagKey] = item.isEnabled;
          return acc;
        }, {} as FeatureFlagState);
        setFlags((prev) => ({ ...prev, ...flagMap }));
      } else if (res && typeof res === 'object') {
        setFlags((prev) => ({ ...prev, ...res }));
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshFlags();
  }, [refreshFlags]);

  const isEnabled = useCallback(
    (key: FeatureFlagKey): boolean => {
      return flags[key] ?? false;
    },
    [flags],
  );

  const toggleFlag = async (key: FeatureFlagKey, enabled: boolean) => {
    try {
      // Optimistic update
      setFlags((prev) => ({ ...prev, [key]: enabled }));
      await apiClient.toggleFeatureFlag(key, enabled);
    } catch (err) {
      // Revert on error
      setFlags((prev) => ({ ...prev, [key]: !enabled }));
      setError((err as Error).message);
    }
  };

  const resetFlags = async () => {
    try {
      await apiClient.resetFeatureFlags();
      setFlags({ ...DEFAULT_FEATURE_FLAG_STATE });
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <FeatureFlagContext.Provider
      value={{
        flags,
        isEnabled,
        toggleFlag,
        resetFlags,
        isLoading,
        error,
        refreshFlags,
      }}
    >
      {children}
    </FeatureFlagContext.Provider>
  );
};

export const useFeatureFlags = () => {
  const context = useContext(FeatureFlagContext);
  if (!context) {
    throw new Error('useFeatureFlags must be used within a FeatureFlagProvider');
  }
  return context;
};
