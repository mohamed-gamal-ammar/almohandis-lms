/**
 * Al-Muhandis Platform - Course & Content Domain Types
 * Master Specification - Phase 0
 */

export enum CourseStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED',
  UNLISTED = 'UNLISTED',
}

export enum DifficultyLevel {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED',
  COMPREHENSIVE = 'COMPREHENSIVE',
}

export enum EngineeringDiscipline {
  CIVIL = 'CIVIL', // هندسة مدنية
  STRUCTURAL = 'STRUCTURAL', // هندسة إنشائية
  ARCHITECTURE = 'ARCHITECTURE', // هندسة معمارية
  ELECTRICAL = 'ELECTRICAL', // هندسة كهربائية
  MECHANICAL = 'MECHANICAL', // هندسة ميكانيكية
  BIM = 'BIM', // نمذجة معلومات البناء
  PROJECT_MANAGEMENT = 'PROJECT_MANAGEMENT', // إدارة مشاريع هندسية
  GENERAL = 'GENERAL', // عام
}

export enum ContentType {
  VIDEO = 'VIDEO',
  PDF = 'PDF',
  QUIZ = 'QUIZ',
  ARTICLE = 'ARTICLE',
  CODE_ASSIGNMENT = 'CODE_ASSIGNMENT',
}
