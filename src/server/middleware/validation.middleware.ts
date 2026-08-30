/**
 * Al-Muhandis Platform - Validation & Security Middlewares
 * Master Specification - Phase 0
 */

import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';
import { ValidationError, ForbiddenError, UnauthorizedError } from '../../shared/errors/app-error.ts';
import { UserRole, Permission } from '../../shared/types/auth.ts';
import { hasPermission } from '../../shared/constants/roles.ts';

export function validateBody<T>(schema: z.ZodType<T>) {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const fieldErrors = error.issues.map((issue) => ({
          path: issue.path.join('.'),
          message: issue.message,
        }));
        next(new ValidationError('فشل التحقق من صحة البيانات المدخلة', fieldErrors));
      } else {
        next(error);
      }
    }
  };
}

export function requirePermission(permission: Permission) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const userRole = (req.headers['x-mock-role'] as UserRole) || UserRole.STUDENT;

    if (!userRole) {
      return next(new UnauthorizedError());
    }

    if (!hasPermission(userRole, permission)) {
      return next(new ForbiddenError(`يتطلب هذا الإجراء صلاحية: ${permission}`));
    }

    next();
  };
}
