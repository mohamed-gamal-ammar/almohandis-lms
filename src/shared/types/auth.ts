/**
 * Al-Muhandis Platform - RBAC & Authentication Types
 * Master Specification - Phase 0
 */

export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  INSTRUCTOR = 'INSTRUCTOR',
  TEACHING_ASSISTANT = 'TEACHING_ASSISTANT',
  STUDENT = 'STUDENT',
  GUEST = 'GUEST',
}

export enum Permission {
  // Course Permissions
  COURSE_CREATE = 'course:create',
  COURSE_READ = 'course:read',
  COURSE_UPDATE = 'course:update',
  COURSE_DELETE = 'course:delete',
  COURSE_PUBLISH = 'course:publish',

  // Lesson & Content Permissions
  LESSON_CREATE = 'lesson:create',
  LESSON_UPDATE = 'lesson:update',
  LESSON_DELETE = 'lesson:delete',
  LESSON_ACCESS = 'lesson:access',

  // Enrollment & Student Management
  STUDENT_ENROLL = 'student:enroll',
  STUDENT_MANAGE = 'student:manage',
  STUDENT_GRADE = 'student:grade',

  // Finance & Payment Permissions
  PAYMENT_VIEW = 'payment:view',
  PAYMENT_REFUND = 'payment:refund',
  PAYMENT_EXPORT = 'payment:export',

  // Video & Storage Permissions
  VIDEO_UPLOAD = 'video:upload',
  VIDEO_MANAGE = 'video:manage',
  STORAGE_MANAGE = 'storage:manage',

  // AI & Assistant Permissions
  AI_QUERY = 'ai:query',
  AI_CONFIG_MANAGE = 'ai:config_manage',

  // System & Settings Permissions
  SYSTEM_CONFIG = 'system:config',
  FEATURE_FLAGS_MANAGE = 'feature_flags:manage',
  AUDIT_LOGS_VIEW = 'audit_logs:view',
  USER_MANAGE = 'user:manage',
}

export interface UserSession {
  userId: string;
  email: string;
  name: string;
  role: UserRole;
  permissions: Permission[];
  phone?: string;
  avatarUrl?: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  isActive: boolean;
}

export interface JwtPayload {
  sub: string; // user ID
  email: string;
  role: UserRole;
  permissions: Permission[];
  iat?: number;
  exp?: number;
  iss?: string;
  aud?: string;
}
