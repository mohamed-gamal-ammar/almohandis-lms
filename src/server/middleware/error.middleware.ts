/**
 * Al-Muhandis Platform - Error Handling Middleware
 * Master Specification - Phase 0
 */

import { Request, Response, NextFunction } from 'express';
import { AppError } from '../../shared/errors/app-error.ts';
import { ErrorCode, HttpStatus, ApiResponse } from '../../shared/types/common.ts';
import { logger } from '../infrastructure/logger/logger.service.ts';

export function errorMiddleware(
  err: Error | AppError,
  req: Request,
  res: Response,
  _next: NextFunction,
): void {
  const isAppError = err instanceof AppError;
  const statusCode = isAppError ? err.httpStatus : HttpStatus.INTERNAL_SERVER_ERROR;
  const errorCode = isAppError ? err.code : ErrorCode.INTERNAL_SERVER_ERROR;
  const message = isAppError ? err.message : (process.env.NODE_ENV === 'production' ? 'حدث خطأ داخلي غير متوقع' : err.message);

  logger.error(`Error processing request: ${err.message}`, err, 'API', {
    requestId: req.id,
    path: req.originalUrl,
    method: req.method,
    statusCode,
    errorCode,
  });

  const response: ApiResponse = {
    success: false,
    error: {
      code: errorCode,
      message,
      details: isAppError ? err.details : undefined,
      requestId: req.id,
      timestamp: new Date().toISOString(),
    },
  };

  res.status(statusCode).json(response);
}
