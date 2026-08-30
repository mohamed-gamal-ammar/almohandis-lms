# المتغيرات البيئية (Environment Configuration)
## Al-Muhandis Environment Variables Specification

يتم تحميل وفحص المتغيرات البيئية عند إقلاع الخادم بواسطة **Zod Schema** داخل `src/server/config/env.ts`.

---

## 1. قائمة المتغيرات الأساسية

| المتغير | النوع | القيمة الافتراضية | الوصف |
| :--- | :--- | :--- | :--- |
| `NODE_ENV` | `enum` | `development` | بيئة التشغيل (`development`, `test`, `production`) |
| `PORT` | `number` | `3000` | منفذ تشغيل الخادم (إلزامي 3000) |
| `APP_URL` | `string` | `http://localhost:3000` | الرابط الأساسي للتطبيق وعمليات الـCallback |
| `DATABASE_URL` | `string` | `postgresql://...` | رابط الاتصال بقاعدة بيانات PostgreSQL |
| `JWT_SECRET` | `string` | - | المفتاح السري لتوقيع توكنز الجلسات |
| `JWT_EXPIRES_IN` | `string` | `7d` | صلاحية توكن الجلسة |
| `GEMINI_API_KEY` | `string` | - | مفتاح Google Gemini AI API (محقون في السيرفر فقط) |
| `DEFAULT_VIDEO_PROVIDER` | `string` | `BUNNY_STREAM` | مزود بث الفيديو الافتراضي |
| `DEFAULT_PAYMENT_PROVIDER` | `string` | `PAYMOB` | بوابة الدفع الافتراضية |
| `DEFAULT_AI_PROVIDER` | `string` | `GEMINI` | محرك الذكاء الاصطناعي الافتراضي |
| `DEFAULT_STORAGE_PROVIDER` | `string` | `AWS_S3` | مزود التخزين السحابي للملفات |
