/**
 * Al-Muhandis Platform - Role Permission Mappings
 * Master Specification - Phase 0
 */

import { UserRole, Permission } from '../types/auth.ts';

export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  [UserRole.SUPER_ADMIN]: Object.values(Permission),

  [UserRole.ADMIN]: [
    Permission.COURSE_CREATE,
    Permission.COURSE_READ,
    Permission.COURSE_UPDATE,
    Permission.COURSE_DELETE,
    Permission.COURSE_PUBLISH,
    Permission.LESSON_CREATE,
    Permission.LESSON_UPDATE,
    Permission.LESSON_DELETE,
    Permission.LESSON_ACCESS,
    Permission.STUDENT_ENROLL,
    Permission.STUDENT_MANAGE,
    Permission.STUDENT_GRADE,
    Permission.PAYMENT_VIEW,
    Permission.PAYMENT_EXPORT,
    Permission.VIDEO_UPLOAD,
    Permission.VIDEO_MANAGE,
    Permission.STORAGE_MANAGE,
    Permission.AI_QUERY,
    Permission.FEATURE_FLAGS_MANAGE,
    Permission.USER_MANAGE,
  ],

  [UserRole.INSTRUCTOR]: [
    Permission.COURSE_CREATE,
    Permission.COURSE_READ,
    Permission.COURSE_UPDATE,
    Permission.COURSE_PUBLISH,
    Permission.LESSON_CREATE,
    Permission.LESSON_UPDATE,
    Permission.LESSON_DELETE,
    Permission.LESSON_ACCESS,
    Permission.STUDENT_MANAGE,
    Permission.STUDENT_GRADE,
    Permission.VIDEO_UPLOAD,
    Permission.VIDEO_MANAGE,
    Permission.AI_QUERY,
  ],

  [UserRole.TEACHING_ASSISTANT]: [
    Permission.COURSE_READ,
    Permission.LESSON_ACCESS,
    Permission.STUDENT_GRADE,
    Permission.AI_QUERY,
  ],

  [UserRole.STUDENT]: [
    Permission.COURSE_READ,
    Permission.LESSON_ACCESS,
    Permission.AI_QUERY,
    Permission.STUDENT_ENROLL,
  ],

  [UserRole.GUEST]: [
    Permission.COURSE_READ,
  ],
};

export function hasPermission(role: UserRole, permission: Permission): boolean {
  const permissions = ROLE_PERMISSIONS[role] || [];
  return permissions.includes(permission);
}
