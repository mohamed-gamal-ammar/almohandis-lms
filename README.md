# منصة «المهندس» للتعليم والتدريب الهندسي
## Al-Muhandis Engineering Education Platform

منصة رقمية متكاملة لتقديم الدورات التدريبية الهندسية المتخصصة (الهندسة المدنية، الإنشائية، المعمارية، الميكانيكية، الكهربائية، BIM، وإدارة المشاريع) باللغة العربية، مع توفير بث فيديو محمي ضد القرصنة، وبوابات دفع إلكترونية مرنة، ومساعد ذكي مدعوم بنماذج الذكاء الاصطناعي التوليدي.

---

## 🎯 أهداف المرحلة الحالية: Phase 0 (Project Foundation & Architecture)

في هذه المرحلة، تم تأسيس البنية الهندسية الشاملة للمشروع بدون إطلاق الميزات الوظيفية التفصيلية:

* ✅ **Clean Architecture & Monorepo Structure**: فصل تام بين طبقة واجهة المستخدم (Frontend)، خادم التطبيقات (Backend)، العقود المشتركة (Shared Types)، وقاعدة البيانات (Database).
* ✅ **Prisma ORM & PostgreSQL**: مخطط بيانات شامل يحتوي على أكثر من 21 كيان وجدول ونوع مخصص.
* ✅ **Provider Abstraction Layer**: طبقات تجريد موحدة لمزودي الفيديو (Bunny.net, Mux, YouTube)، بوابات الدفع (Paymob, Stripe, Fawry)، الذكاء الاصطناعي (Gemini, OpenAI)، والتخزين والإشعارات.
* ✅ **Strict Security & RBAC**: حماية الخادم عبر Helmet و CORS، والتحقق الصارم من المدخلات عبر Zod Schemas، وحجب الأسرار تلقائيًا من الـLogs.
* ✅ **Dynamic Feature Flags Engine**: نظام متكامل لإدارة وتشغيل الميزات على الخادم والواجهة الأمامية.
* ✅ **Arabic RTL First Design System**: واجهة مستخدم مبنية بـReact 19 وTailwind CSS تدعم اللغة العربية والاتجاه من اليمين إلى اليسار.

---

## 📂 بنية المشروع (Project Structure)

```text
├── prisma/
│   └── schema.prisma            # مخطط قاعدة بيانات PostgreSQL بواسطة Prisma
├── src/
│   ├── client/                  # واجهة المستخدم (React + Tailwind + RTL)
│   │   ├── api/                 # عميل API المكتوب بنوع قوي (Typed API Client)
│   │   ├── context/             # سياقات React (Feature Flags, App State)
│   │   └── components/          # المكونات القابلة لإعادة الاستخدام وشاشات الفحص
│   ├── server/                  # خادم التطبيقات (Node.js + Express)
│   │   ├── config/              # إعدادات البيئة ومتغيراتها
│   │   ├── infrastructure/      # قواعد البيانات، التسجيل، والمزودات المجردة
│   │   │   ├── database/        # إدارة اتصال Prisma
│   │   │   ├── logger/          # تسجيل JSON منظم مع حجب الأسرار
│   │   │   ├── feature-flags/   # محرك Feature Flags
│   │   │   └── providers/       # تجريدات الفيديو، الدفع، والـAI
│   │   ├── middleware/          # حراسة الأمان، التسجيل، التحقق، والأخطاء
│   │   └── api/v1/              # المسارات البرمجية بالإصدار الأول (API v1)
│   └── shared/                  # الأنواع المشتركة، الأخطاء، وZod Schemas
├── tests/                       # اختبارات الوحدة للـRBAC وFeature Flags والمزودات
├── server.ts                    # نقطة الدخول الرئيسية للخادم
└── documentation/               # ملفات التوثيق الشاملة
```

---

## 🚀 تشغيل المشروع وتطويره

### المتطلبات الأساسية:
* Node.js v20+
* npm v10+

### تثبيت الحزم وتشغيل خادم التطوير:
```bash
npm install
npm run dev
```

### تشغيل الاختبارات وفحص الأنواع:
```bash
npm run test
npm run lint
npm run build
```
