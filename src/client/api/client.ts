/**
 * Al-Muhandis Platform - Typed Frontend API Client
 * Master Specification - Phase 0
 */

import { ApiResponse } from '../../shared/types/common.ts';
import { FeatureFlagState, FeatureFlagKey } from '../../shared/types/feature-flags.ts';

export class ApiError extends Error {
  public readonly code: string;
  public readonly statusCode: number;
  public readonly details?: unknown;

  constructor(message: string, code: string = 'UNKNOWN_ERROR', statusCode: number = 500, details?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.code = code;
    this.statusCode = statusCode;
    this.details = details;
  }
}

class ApiClient {
  private readonly baseUrl: string = '/api/v1';

  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      'X-Request-Id': `client_${Date.now()}`,
      ...(options?.headers || {}),
    };

    try {
      const res = await fetch(url, { ...options, headers });
      const data: ApiResponse<T> = await res.json();

      if (!res.ok || !data.success) {
        throw new ApiError(
          data.error?.message || 'حدث خطأ في الخادم',
          data.error?.code || 'SERVER_ERROR',
          res.status,
          data.error?.details,
        );
      }

      return data.data as T;
    } catch (err) {
      if (err instanceof ApiError) {
        throw err;
      }
      throw new ApiError((err as Error).message || 'تعذر الاتصال بالخادم', 'NETWORK_ERROR', 0);
    }
  }

  public async getHealth(): Promise<any> {
    return this.request<any>('/health');
  }

  public async getMeta(): Promise<any> {
    return this.request<any>('/meta');
  }

  public async getFeatureFlags(full: boolean = false): Promise<any> {
    return this.request<any>(`/feature-flags${full ? '?mode=full' : ''}`);
  }

  public async toggleFeatureFlag(key: FeatureFlagKey, enabled: boolean): Promise<any> {
    return this.request<any>('/feature-flags/toggle', {
      method: 'POST',
      body: JSON.stringify({ key, enabled }),
    });
  }

  public async resetFeatureFlags(): Promise<FeatureFlagState> {
    return this.request<FeatureFlagState>('/feature-flags/reset', {
      method: 'POST',
    });
  }
}

export const apiClient = new ApiClient();
