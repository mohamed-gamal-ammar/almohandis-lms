/**
 * Al-Muhandis Platform - Unified Error Hierarchy
 * Master Specification - Phase 0
 */

import { ErrorCode, HttpStatus } from '../types/common.ts';

export class AppError extends Error {
  public readonly code: ErrorCode;
  public readonly httpStatus: HttpStatus;
  public readonly details?: unknown;
  public readonly isOperational: boolean;

  constructor(
    message: string,
    code: ErrorCode = ErrorCode.INTERNAL_SERVER_ERROR,
    httpStatus: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR,
    details?: unknown,
    isOperational: boolean = true,
  ) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.httpStatus = httpStatus;
    this.details = details;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message: string = 'بيانات الإدخال غير صالحة', details?: unknown) {
    super(message, ErrorCode.VALIDATION_FAILED, HttpStatus.BAD_REQUEST, details);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = 'يرجى تسجيل الدخول للمتابعة') {
    super(message, ErrorCode.UNAUTHORIZED, HttpStatus.UNAUTHORIZED);
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string = 'ليس لديك الصلاحية لتنفيذ هذا الإجراء') {
    super(message, ErrorCode.FORBIDDEN, HttpStatus.FORBIDDEN);
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string = 'المورد المطلوب', identifier?: string) {
    const msg = identifier ? `${resource} غير موجود بالمعرف: ${identifier}` : `${resource} غير موجود`;
    super(msg, ErrorCode.RESOURCE_NOT_FOUND, HttpStatus.NOT_FOUND);
  }
}

export class ConflictError extends AppError {
  constructor(message: string = 'البيانات المدخلة تتعارض مع مورد موجود مسبقاً') {
    super(message, ErrorCode.RESOURCE_EXISTS, HttpStatus.CONFLICT);
  }
}

export class ProviderError extends AppError {
  public readonly provider: string;

  constructor(provider: string, message: string, code: ErrorCode, details?: unknown) {
    super(`[${provider}] ${message}`, code, HttpStatus.BAD_GATEWAY, details);
    this.provider = provider;
  }
}
