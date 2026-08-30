# استراتيجية الاختبار وضمان الجودة (Testing Specification)
## Al-Muhandis Testing & Quality Assurance Architecture

---

## 1. أدوات الاختبار (Testing Stack)

* **Test Runner**: Vitest لإجراء الاختبارات السريعة والموازية مع بيئة Node.js.
* **Static Analysis**: TypeScript Strict Mode (`tsc --noEmit`) و ESLint.
* **Validation Testing**: اختبارات تكامل لـZod Schemas و DTOs.

---

## 2. الاختبارات المنفذة في Phase 0

1. **Feature Flags Service Suite**:
   - التحقق من تهيئة القيم الافتراضية.
   - اختبار التبديل الديناميكي (Dynamic Toggling).
   - اختبار فلترة الميزات المتاحة للواجهة الأمامية (Client Visibility).

2. **Error Hierarchy & AppError Suite**:
   - اختبار رمي الأخطاء المعيارية (`ValidationError`, `NotFoundError`, `ForbiddenError`).
   - التحقق من رموز أخطاء الـHTTP المناسبة (`400`, `401`, `403`, `404`, `500`).

3. **RBAC & Permissions Matrix Suite**:
   - التحقق من صلاحيات `SUPER_ADMIN` الشاملة.
   - التحقق من حظر عمليات الدفع على المحاضرين والطلاب.
   - التحقق من صلاحيات إنشاء الدورات للمحاضرين.

4. **Provider Factories Suite**:
   - التحقق من إنشاء مزودي الفيديو (Bunny, Mux).
   - التحقق من إنشاء مزودي الدفع (Paymob, Stripe).
   - التحقق من إنشاء مزودي الذكاء الاصطناعي (Gemini).

---

## 3. أوامر تشغيل الاختبارات

```bash
# تشغيل جميع الاختبارات
npm run test

# فحص توافق الأنواع
npm run lint
```
