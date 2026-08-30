/**
 * Al-Muhandis Platform - Feature Flags Registry
 * Master Specification - Phase 0
 */

import { FeatureFlagKey, FeatureFlagDefinition, FeatureFlagState } from '../types/feature-flags.ts';

export const FEATURE_FLAG_REGISTRY: Record<FeatureFlagKey, FeatureFlagDefinition> = {
  [FeatureFlagKey.AI_TUTOR_CHAT]: {
    key: FeatureFlagKey.AI_TUTOR_CHAT,
    defaultValue: true,
    descriptionArabic: 'المساعد الهندسي الذكي للرد على أسئلة الدروس وحل المسائل',
    descriptionEnglish: 'AI Engineering Tutor for context-aware Q&A and problem solving',
    category: 'AI',
    isClientVisible: true,
  },
  [FeatureFlagKey.AI_LESSON_SUMMARIZATION]: {
    key: FeatureFlagKey.AI_LESSON_SUMMARIZATION,
    defaultValue: true,
    descriptionArabic: 'توليد ملخصات الدروس الهندسية وملاحظات المراجعة بالذكاء الاصطناعي',
    descriptionEnglish: 'Automated AI summaries and engineering key takeaways',
    category: 'AI',
    isClientVisible: true,
  },
  [FeatureFlagKey.AI_QUIZ_GENERATOR]: {
    key: FeatureFlagKey.AI_QUIZ_GENERATOR,
    defaultValue: false,
    descriptionArabic: 'توليد اختبارات تدريبية مخصصة بناءً على محتوى المحاضرة',
    descriptionEnglish: 'AI generation of practice quizzes and engineering tests',
    category: 'AI',
    isClientVisible: false,
  },
  [FeatureFlagKey.DYNAMIC_WATERMARKING]: {
    key: FeatureFlagKey.DYNAMIC_WATERMARKING,
    defaultValue: true,
    descriptionArabic: 'العلامة المائية المتحركة لحماية المحتوى الهندسي من التسريب',
    descriptionEnglish: 'Dynamic floating watermarks with student IP and ID',
    category: 'VIDEO',
    isClientVisible: true,
  },
  [FeatureFlagKey.DRM_ENCRYPTION]: {
    key: FeatureFlagKey.DRM_ENCRYPTION,
    defaultValue: true,
    descriptionArabic: 'تشفير الفيديو بتقنية DRM وحماية البث التكيفي HLS',
    descriptionEnglish: 'DRM video stream protection and signed tokens',
    category: 'VIDEO',
    isClientVisible: false,
  },
  [FeatureFlagKey.SPEED_CONTROLS]: {
    key: FeatureFlagKey.SPEED_CONTROLS,
    defaultValue: true,
    descriptionArabic: 'التحكم في سرعة تشغيل الفيديوهات والتنقل بين الجودات',
    descriptionEnglish: 'Granular video playback speed controls and quality switching',
    category: 'VIDEO',
    isClientVisible: true,
  },
  [FeatureFlagKey.PAYMOB_INTEGRATION]: {
    key: FeatureFlagKey.PAYMOB_INTEGRATION,
    defaultValue: true,
    descriptionArabic: 'بوابة دفع Paymob (بطاقات ائتمان ومحافظ إلكترونية داخل مصر)',
    descriptionEnglish: 'Paymob payment gateway integration (Cards & Mobile Wallets)',
    category: 'PAYMENT',
    isClientVisible: true,
  },
  [FeatureFlagKey.STRIPE_INTEGRATION]: {
    key: FeatureFlagKey.STRIPE_INTEGRATION,
    defaultValue: true,
    descriptionArabic: 'بوابة دفع Stripe للمدفوعات الدولية والدول العربية',
    descriptionEnglish: 'Stripe payment gateway for international card transactions',
    category: 'PAYMENT',
    isClientVisible: true,
  },
  [FeatureFlagKey.FAWRY_INTEGRATION]: {
    key: FeatureFlagKey.FAWRY_INTEGRATION,
    defaultValue: true,
    descriptionArabic: 'الدفع النقدي عن طريق فوري Fawry Pay',
    descriptionEnglish: 'Fawry cash reference code payments',
    category: 'PAYMENT',
    isClientVisible: true,
  },
  [FeatureFlagKey.INSTALLMENT_PAYMENTS]: {
    key: FeatureFlagKey.INSTALLMENT_PAYMENTS,
    defaultValue: false,
    descriptionArabic: 'تقسيط الاشتراكات والدورات عبر ValU / Sympl',
    descriptionEnglish: 'Buy-now-pay-later installment payment plans',
    category: 'PAYMENT',
    isClientVisible: true,
  },
  [FeatureFlagKey.STUDENT_DISCUSSIONS]: {
    key: FeatureFlagKey.STUDENT_DISCUSSIONS,
    defaultValue: true,
    descriptionArabic: 'منتدى النقاشات الهندسية لكل محاضرة مع المهندسين المساعدين',
    descriptionEnglish: 'Lesson-level student discussions and QA threads',
    category: 'COMMUNITY',
    isClientVisible: true,
  },
  [FeatureFlagKey.CERTIFICATE_GENERATION]: {
    key: FeatureFlagKey.CERTIFICATE_GENERATION,
    defaultValue: true,
    descriptionArabic: 'إصدار شهادات إتمام معتمدة برمز QR قابل للتحقق',
    descriptionEnglish: 'Automated verified course completion certificates with QR code',
    category: 'COMMUNITY',
    isClientVisible: true,
  },
  [FeatureFlagKey.LIVE_SESSIONS]: {
    key: FeatureFlagKey.LIVE_SESSIONS,
    defaultValue: false,
    descriptionArabic: 'بث الجلسات التفاعلية المباشرة وورش العمل الهندسية',
    descriptionEnglish: 'Live interactive webinars and engineering workshop streams',
    category: 'COMMUNITY',
    isClientVisible: true,
  },
  [FeatureFlagKey.DARK_MODE]: {
    key: FeatureFlagKey.DARK_MODE,
    defaultValue: true,
    descriptionArabic: 'دعم النمط الليلي عالي التباين والمريح للعين',
    descriptionEnglish: 'Dark mode theme support for extended study sessions',
    category: 'SYSTEM',
    isClientVisible: true,
  },
  [FeatureFlagKey.MAINTENANCE_MODE]: {
    key: FeatureFlagKey.MAINTENANCE_MODE,
    defaultValue: false,
    descriptionArabic: 'وضع الصيانة وإيقاف عمليات الشراء والتسجيل مؤقتاً',
    descriptionEnglish: 'Maintenance mode for updates and scheduled downtime',
    category: 'SYSTEM',
    isClientVisible: true,
  },
};

export const DEFAULT_FEATURE_FLAG_STATE: FeatureFlagState = Object.values(FEATURE_FLAG_REGISTRY).reduce(
  (acc, def) => {
    acc[def.key] = def.defaultValue;
    return acc;
  },
  {} as FeatureFlagState,
);
