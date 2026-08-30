# دليل واجهة برمجة التطبيقات (API Specification)
## Al-Muhandis REST API v1

تعتمد المنصة معيار RESTful APIs الموحد تحت بادئة `/api/v1` مع هيكل استجابة قياسي.

---

## 1. الهيكل الموحد للاستجابات (Standard Response Format)

### أ. في حال النجاح (Success Response):
```json
{
  "success": true,
  "message": "تمت العملية بنجاح",
  "data": { ... },
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 100
  }
}
```

### ب. في حال الخطأ (Error Response):
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_FAILED",
    "message": "بيانات الإدخال غير صالحة",
    "details": [ ... ],
    "requestId": "req_1725000000_abc123",
    "timestamp": "2026-08-30T01:36:47.000Z"
  }
}
```

---

## 2. المسارات الأساسية في Phase 0

| المسار (Endpoint) | الطريقة (Method) | الوصف | الصلاحية المطلوبة |
| :--- | :--- | :--- | :--- |
| `/api/v1/health` | `GET` | فحص صحة الخادم وقاعدة البيانات والذاكرة | عام (Public) |
| `/api/v1/meta` | `GET` | معلومات البنية التحتية والمزودات النشطة | عام (Public) |
| `/api/v1/feature-flags` | `GET` | جلب حالة الميزات (Feature Flags) | عام (Public) |
| `/api/v1/feature-flags/toggle` | `POST` | تفعيل أو تعطيل ميزة برمجية | `SUPER_ADMIN` |
| `/api/v1/feature-flags/reset` | `POST` | إعادة تعيين الميزات إلى الوضع الافتراضي | `SUPER_ADMIN` |
| `/api/health` | `GET` | نقطة فحص سريعة لموازنات الأحمال (Ingress) | عام (Public) |
