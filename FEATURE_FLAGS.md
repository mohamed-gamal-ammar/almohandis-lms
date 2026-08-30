# نظام التحكم في الميزات (Feature Flags)
## Al-Muhandis Feature Flags Specification

يسمح نظام Feature Flags بإطلاق الميزات تدريجيًا، وإجراء اختبارات A/B، وتعطيل الميزات تحت الصيانة الفورية دون إعادة نشر التطبيق.

---

## 1. سجل الميزات المعرفة (Defined Flags Registry)

| المفتاح (Key) | التصنيف | القيمة الافتراضية | متاح للعميل؟ | الوصف |
| :--- | :--- | :--- | :--- | :--- |
| `ai_tutor_chat` | AI | `true` | نعم | المساعد الهندسي الذكي للرد على أسئلة الدروس |
| `ai_lesson_summarization` | AI | `true` | نعم | توليد ملخصات الدروس الهندسية آليًا |
| `ai_quiz_generator` | AI | `false` | لا | توليد اختبارات تدريبية بالذكاء الاصطناعي |
| `dynamic_watermarking` | VIDEO | `true` | نعم | العلامة المائية المتحركة برقم الطالب والـIP |
| `drm_encryption` | VIDEO | `true` | لا | تشفير بث الفيديو HLS بحماية DRM |
| `speed_controls` | VIDEO | `true` | نعم | التحكم في سرعات تشغيل الفيديو والجودة |
| `paymob_integration` | PAYMENT | `true` | نعم | بوابة الدفع Paymob للبطاقات والمحافظ |
| `stripe_integration` | PAYMENT | `true` | نعم | بوابة الدفع الدولية Stripe |
| `fawry_integration` | PAYMENT | `true` | نعم | الدفع النقدي عبر فوري بكود مرجعي |
| `installment_payments` | PAYMENT | `false` | نعم | تقسيط الاشتراكات عبر ValU / Sympl |
| `student_discussions` | COMMUNITY | `true` | نعم | منتدى النقاشات الهندسية لكل محاضرة |
| `certificate_generation` | COMMUNITY | `true` | نعم | إصدار شهادات إتمام معتمدة برمز QR |
| `live_sessions` | COMMUNITY | `false` | نعم | بث ورش العمل والجلسات المباشرة |
| `dark_mode` | SYSTEM | `true` | نعم | دعم النمط الليلي المريح للعين |
| `maintenance_mode` | SYSTEM | `false` | نعم | وضع الصيانة العام للمنصة |

---

## 2. الاستخدام البرمجي (Usage Example)

### في الخادم (Backend):
```typescript
import { featureFlagService } from '@/server/infrastructure/feature-flags/feature-flag.service';
import { FeatureFlagKey } from '@/shared/types/feature-flags';

if (featureFlagService.isEnabled(FeatureFlagKey.AI_TUTOR_CHAT)) {
  // تنفيذ منطق الذكاء الاصطناعي
}
```

### في الواجهة الأمامية (Frontend React):
```tsx
import { useFeatureFlags } from '@/client/context/FeatureFlagContext';
import { FeatureFlagKey } from '@/shared/types/feature-flags';

const { isEnabled } = useFeatureFlags();

{isEnabled(FeatureFlagKey.AI_TUTOR_CHAT) && <AITutorWidget />}
```
