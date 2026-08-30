# المعمارية الشاملة لمنصة المهندس
## Architecture Master Specification (Phase 0)

---

## 1. فلسفة التصميم والمعمارية (Architecture Principles)

تعتمد منصة «المهندس» على مبادئ **Clean Architecture** و **Domain-Driven Design (DDD)** لتحقيق أقصى درجات الاستقرار وقابلية التوسع:

1. **Separation of Concerns (فصل المسؤوليات)**:
   - طبقة العرض والواجهة الأمامية لا تتصل بقاعدة البيانات مباشرة ولا تحوي أسرارًا.
   - منطق الأعمال (Business Logic) معزول داخل خدمات مستقلة (Services).
   - الوصول للبيانات يتم عبر Prisma ORM دون الاعتماد على استعلامات خام مبعثرة.

2. **Provider Abstraction Layer (تجريد المزودين الخارجيين)**:
   - أي تكامل خارجي (بث الفيديو، معالجة الدفع، الذكاء الاصطناعي، التخزين السحابي) يمر عبر Interface ومصنع (Factory Pattern).
   - إمكانية استبدال مزود خدمة بآخر (مثلاً من Paymob إلى Stripe، أو من Bunny.net إلى Mux) دون تعديل سطر واحد في منطق الأعمال الأساسي.

3. **Strict Validation & Type Safety**:
   - تفعيل `strict: true` في TypeScript لكامل المشروع.
   - التحقق في زمن التشغيل (Runtime Validation) عبر **Zod Schemas** قبل وصول أي طلب للمتحكمات.

4. **Layered Security & Observability**:
   - كل طلب يحصل على `X-Request-Id` لتتبعه عبر السجلات.
   - حجب آلي للمعلومات الحساسة (Passwords, Tokens, API Keys, CVV) قبل طباعتها في السجلات.

---

## 2. الطبقات المعمارية (Architectural Layers)

```
┌─────────────────────────────────────────────────────────────┐
│                 Client Layer (React 19 + RTL)              │
│       Components, Contexts, Hooks, Typed API Client        │
└──────────────────────────────┬──────────────────────────────┘
                               │ HTTP / JSON (API v1)
┌──────────────────────────────▼──────────────────────────────┐
│                    API & Middleware Layer                   │
│   Helmet, CORS, Request-ID, Logging, Zod Validation, RBAC   │
└──────────────────────────────┬──────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────┐
│                    Domain Services Layer                    │
│    CourseService, PaymentService, VideoService, AIService   │
└──────────────┬──────────────────────────────┬───────────────┘
               │                              │
┌──────────────▼──────────────┐ ┌─────────────▼───────────────┐
│     Data Access (DAL)       │ │    Provider Abstractions    │
│      Prisma Client          │ │   Video, Payment, AI, S3    │
│    PostgreSQL Database      │ │   Bunny, Paymob, Gemini     │
└─────────────────────────────┘ └─────────────────────────────┘
```

---

## 3. تدفق البيانات والطلبات (Request Lifecycle)

1. العميل يرسل طلبًا إلى `/api/v1/*` حاملاً الـHeaders وعنوان الـBearer Token.
2. `requestIdMiddleware` يولد أو يعتمد `X-Request-Id` ويثبته على الطلب والاستجابة.
3. `loggingMiddleware` يسجل بداية الطلب ونهايته وزمن الاستجابة بدقة بالمللي ثانية.
4. `validateBody` يتحقق من مطابقة المدخلات للـZod Schema ويرمي `ValidationError` (400) عند الفشل.
5. `requirePermission` يتحقق من صلاحيات الدور الوظيفي (RBAC) Server-Side.
6. المتحكم (Controller) يستدعي الخدمة المعنية (Service)، والتي تستخدم إما الـDAL أو Provider Factory.
7. أي استثناء يتم التقاطه مركزيًا بواسطة `errorMiddleware` لإنتاج استجابة موحدة بصيغة `ApiResponse`.
