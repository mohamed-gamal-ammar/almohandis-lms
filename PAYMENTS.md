# تجريد بوابات الدفع (Payment Provider Abstraction)
## Al-Muhandis Payments Architecture Specification

---

## 1. الواجهة الموحدة (`IPaymentProvider`)

تتعامل جميع خدمات الدفع في المنصة عبر الواجهة الموحدة `IPaymentProvider` التي توفر:
* `initiatePayment(request: InitiatePaymentRequest)`: تهيئة المعاملة والحصول على الـRedirect URL أو الـToken.
* `verifyPayment(request: VerifyPaymentRequest)`: التحقق من نجاح المعاملة وصحة المبالغ المدفوعة.
* `handleWebhook(event: WebhookEventPayload)`: معالجة الإشعارات الفورية للـWebhooks مع التحقق من التوقيع الرقمي لمنع التلاعب (HMAC SHA256 / SHA512).

---

## 2. البوابات المدعومة (Supported Gateways)

1. **Paymob (مصر والشرق الأوسط)**:
   - دعم البطاقات البنكية (Visa, MasterCard, Meeza).
   - محافظ الهاتف المحمول (Vodafone Cash, Orange, Etisalat, WE).
   - التحقق من الـHMAC في الـWebhooks.

2. **Stripe (المدفوعات الدولية)**:
   - دعم بطاقات الائتمان الدولية وApple Pay / Google Pay.
   - التحقق من `Stripe-Signature`.

3. **Fawry Pay (الدفع النقدي بكود مرجعي)**:
   - إصدار كود مرجعي صالح لمدة محددة للدفع عبر منافذ فوري.

4. **Kashier & BNPL Installments (مرحلة قادمة)**:
   - دعم تقسيط المصروفات الدراسية الهندسية.
