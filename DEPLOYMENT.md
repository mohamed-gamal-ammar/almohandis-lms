# دليل النشر والتشغيل (Deployment Guide)
## Al-Muhandis Cloud Run & Production Deployment

---

## 1. البناء والتشغيل للإنتاج (Production Build Flow)

تمت تهيئة المشروع للعمل كحاوية متكاملة (Full-Stack Container) في بيئات Google Cloud Run:

```bash
# 1. بناء حزمة الواجهة الأمامية وملف الخادم المجمع
npm run build

# 2. بدء تشغيل خادم الإنتاج المجمع
npm start
```

### آلية عمل الـBuild:
1. `vite build`: يقوم بإنشاء ملفات الـSPA الثابتة داخل مجلد `dist/`.
2. `esbuild server.ts`: يجمع كود الـBackend مع جميع التبعيات في ملف CommonJS واحد `dist/server.cjs` لتفادي مشاكل الـESM في Node.js وتحقيق أسرع زمن إقلاع (Cold Start).
3. `start`: يشغل `node dist/server.cjs` على المنفذ `3000` والمضيف `0.0.0.0`.

---

## 2. النشر على Google Cloud Run

يتم تعيين المتغيرات البيئية من خلال لوحة تحكم السحابة (Cloud Run Secrets):
* `DATABASE_URL`
* `JWT_SECRET`
* `GEMINI_API_KEY`
* `PAYMOB_API_KEY` / `STRIPE_SECRET_KEY`
* `BUNNY_API_KEY` / `BUNNY_LIBRARY_ID`

المنفذ المعتمد هو **3000** حصريًا خلف الـReverse Proxy.
