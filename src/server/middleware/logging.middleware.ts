/**
 * Al-Muhandis Platform - Logging Middleware
 * Master Specification - Phase 0
 */

import { Request, Response, NextFunction } from 'express';
import { logger } from '../infrastructure/logger/logger.service.ts';

export function loggingMiddleware(req: Request, res: Response, next: NextFunction): void {
  res.on('finish', () => {
    const duration = req.startTime ? Date.now() - req.startTime : 0;
    const logData = {
      method: req.method,
      url: req.originalUrl || req.url,
      statusCode: res.statusCode,
      durationMs: duration,
      requestId: req.id,
      userAgent: req.headers['user-agent'],
      ip: req.ip || req.socket.remoteAddress,
    };

    if (res.statusCode >= 500) {
      logger.error(`HTTP ${req.method} ${req.originalUrl} -> ${res.statusCode} (${duration}ms)`, undefined, 'HTTP', logData);
    } else if (res.statusCode >= 400) {
      logger.warn(`HTTP ${req.method} ${req.originalUrl} -> ${res.statusCode} (${duration}ms)`, 'HTTP', logData);
    } else {
      logger.info(`HTTP ${req.method} ${req.originalUrl} -> ${res.statusCode} (${duration}ms)`, 'HTTP', logData);
    }
  });

  next();
}
