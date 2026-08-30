/**
 * Al-Muhandis Platform - Phase 0 Unit Tests
 * Error Hierarchy & RBAC Permissions Test Suite
 */

import { describe, it, expect } from 'vitest';
import { AppError, ValidationError, NotFoundError, ForbiddenError } from '../src/shared/errors/app-error.ts';
import { ErrorCode, HttpStatus } from '../src/shared/types/common.ts';
import { UserRole, Permission } from '../src/shared/types/auth.ts';
import { hasPermission } from '../src/shared/constants/roles.ts';
import { VideoProviderFactory } from '../src/server/infrastructure/providers/video/video-provider.factory.ts';
import { PaymentProviderFactory } from '../src/server/infrastructure/providers/payment/payment-provider.factory.ts';
import { AIProviderFactory } from '../src/server/infrastructure/providers/ai/ai-provider.factory.ts';
import { VideoProviderType } from '../src/shared/types/video.ts';
import { PaymentProviderType } from '../src/shared/types/payment.ts';
import { AIProviderType } from '../src/shared/types/ai.ts';

describe('Error Hierarchy & AppError Tests', () => {
  it('should instantiate ValidationError with 400 Bad Request status', () => {
    const err = new ValidationError('Invalid email format', [{ field: 'email', error: 'invalid' }]);
    expect(err).toBeInstanceOf(AppError);
    expect(err.httpStatus).toBe(HttpStatus.BAD_REQUEST);
    expect(err.code).toBe(ErrorCode.VALIDATION_FAILED);
  });

  it('should instantiate NotFoundError with 404 Not Found status', () => {
    const err = new NotFoundError('الدورة التدريبية', 'course_123');
    expect(err.httpStatus).toBe(HttpStatus.NOT_FOUND);
    expect(err.code).toBe(ErrorCode.RESOURCE_NOT_FOUND);
    expect(err.message).toContain('course_123');
  });

  it('should instantiate ForbiddenError with 403 status', () => {
    const err = new ForbiddenError();
    expect(err.httpStatus).toBe(HttpStatus.FORBIDDEN);
    expect(err.code).toBe(ErrorCode.FORBIDDEN);
  });
});

describe('RBAC & Role Permissions Tests', () => {
  it('SUPER_ADMIN should have all permissions', () => {
    expect(hasPermission(UserRole.SUPER_ADMIN, Permission.COURSE_CREATE)).toBe(true);
    expect(hasPermission(UserRole.SUPER_ADMIN, Permission.PAYMENT_REFUND)).toBe(true);
    expect(hasPermission(UserRole.SUPER_ADMIN, Permission.SYSTEM_CONFIG)).toBe(true);
  });

  it('INSTRUCTOR should be able to create courses but not refund payments', () => {
    expect(hasPermission(UserRole.INSTRUCTOR, Permission.COURSE_CREATE)).toBe(true);
    expect(hasPermission(UserRole.INSTRUCTOR, Permission.PAYMENT_REFUND)).toBe(false);
  });

  it('STUDENT should not be allowed to upload videos or create courses', () => {
    expect(hasPermission(UserRole.STUDENT, Permission.VIDEO_UPLOAD)).toBe(false);
    expect(hasPermission(UserRole.STUDENT, Permission.COURSE_CREATE)).toBe(false);
    expect(hasPermission(UserRole.STUDENT, Permission.LESSON_ACCESS)).toBe(true);
  });
});

describe('Provider Factories Tests', () => {
  it('should instantiate correct Video Provider based on type', () => {
    const bunny = VideoProviderFactory.getProvider(VideoProviderType.BUNNY_STREAM);
    expect(bunny.providerType).toBe(VideoProviderType.BUNNY_STREAM);

    const mux = VideoProviderFactory.getProvider(VideoProviderType.MUX);
    expect(mux.providerType).toBe(VideoProviderType.MUX);
  });

  it('should instantiate correct Payment Provider based on type', () => {
    const paymob = PaymentProviderFactory.getProvider(PaymentProviderType.PAYMOB);
    expect(paymob.providerType).toBe(PaymentProviderType.PAYMOB);

    const stripe = PaymentProviderFactory.getProvider(PaymentProviderType.STRIPE);
    expect(stripe.providerType).toBe(PaymentProviderType.STRIPE);
  });

  it('should instantiate correct AI Provider based on type', () => {
    const gemini = AIProviderFactory.getProvider(AIProviderType.GEMINI);
    expect(gemini.providerType).toBe(AIProviderType.GEMINI);
  });
});
