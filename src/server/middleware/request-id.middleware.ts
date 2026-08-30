/**
 * Al-Muhandis Platform - Request ID Middleware
 * Master Specification - Phase 0
 */

import { Request, Response, NextFunction } from 'express';

declare global {
  namespace Express {
    interface Request {
      id?: string;
      startTime?: number;
    }
  }
}

export function requestIdMiddleware(req: Request, res: Response, next: NextFunction): void {
  const reqId = (req.headers['x-request-id'] as string) || `req_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
  req.id = reqId;
  req.startTime = Date.now();
  res.setHeader('X-Request-Id', reqId);
  next();
}
