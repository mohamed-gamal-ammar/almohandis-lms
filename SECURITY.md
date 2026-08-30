# معايير الأمان والحماية (Security Specification)
## Al-Muhandis Platform Security Architecture

الأمان هو ركيزة أساسية لحماية الملكية الفكرية للمحتوى الهندسي وبيانات المشتركين.

---

## 1. حماية البنية التحتية والشبكة (Server & Transport Security)

* **Helmet Security Headers**: تفعيل سياسات الرؤوس الآمنة للوقاية من XSS, Clickjacking, وMIME sniffing.
* **CORS Configuration**: تقييد النطاقات المسموح لها باستدعاء الـAPIs مع دعم الرؤوس المعتمدة فقط.
* **Request Tracing**: توليد معرّف فريد `X-Request-Id` لكل طلب لمراقبة محاولات الاختراق وتتبع السجلات.
* **Rate Limiting**: جاهزية محددات المعدل لمنع هجمات القوة الغاشمة (Brute-force) وهجمات حجب الخدمة (DDoS).

---

## 2. أمان البيانات والتحقق (Data Sanitization & RBAC)

* **Server-Side Validation**: التحقق الصارم من صحة ونقاء كل مدخل عبر Zod DTOs قبل أي معالجة.
* **Server-Side RBAC**: التحقق من صلاحيات المستخدم على مستوى الخادم في كل مسار حساس؛ لا يتم الاعتماد أبدًا على فحص الواجهة الأمامية.
* **Secret Redaction**: فلترة آلية تحجب كلمات المرور والتوكنز ومعلومات البطاقات من ملفات الـLogs.
* **No Secrets in Frontend**: منع وضع أي مفاتيح سرية (Private Keys / API Secrets) في كود الواجهة الأمامية.

---

## 3. حماية المحتوى والبث (Content & Video DRM)

* **Signed HLS URLs**: روابط البث مشفرة وتعمل لفترة زمنية محددة بتوقيع رقمي.
* **Dynamic Floating Watermarks**: عرض معرف الطالب وعنوان الـIP بشكل متحرك على الفيديو لمنع تسجيل الشاشة والتسريب.
* **DRM Tokenization**: دعم تشفير FairPlay و Widevine لمنع برامج التحميل التلقائي.
