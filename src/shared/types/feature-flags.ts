/**
 * Al-Muhandis Platform - Feature Flags Matrix
 * Master Specification - Phase 0
 */

export enum FeatureFlagKey {
  // AI & Assistant
  AI_TUTOR_CHAT = 'ai_tutor_chat',
  AI_LESSON_SUMMARIZATION = 'ai_lesson_summarization',
  AI_QUIZ_GENERATOR = 'ai_quiz_generator',

  // Video Streaming
  DYNAMIC_WATERMARKING = 'dynamic_watermarking',
  DRM_ENCRYPTION = 'drm_encryption',
  SPEED_CONTROLS = 'speed_controls',

  // Payments & Checkout
  PAYMOB_INTEGRATION = 'paymob_integration',
  STRIPE_INTEGRATION = 'stripe_integration',
  FAWRY_INTEGRATION = 'fawry_integration',
  INSTALLMENT_PAYMENTS = 'installment_payments',

  // Platform & Community
  STUDENT_DISCUSSIONS = 'student_discussions',
  CERTIFICATE_GENERATION = 'certificate_generation',
  LIVE_SESSIONS = 'live_sessions',
  DARK_MODE = 'dark_mode',
  MAINTENANCE_MODE = 'maintenance_mode',
}

export interface FeatureFlagDefinition {
  key: FeatureFlagKey;
  defaultValue: boolean;
  descriptionArabic: string;
  descriptionEnglish: string;
  category: 'AI' | 'VIDEO' | 'PAYMENT' | 'COMMUNITY' | 'SYSTEM';
  isClientVisible: boolean;
}

export type FeatureFlagState = Record<FeatureFlagKey, boolean>;
