# تجريد واستضافة الفيديو (Video Provider Abstraction)
## Al-Muhandis Video Streaming & Anti-Piracy Architecture

---

## 1. الواجهة الموحدة (`IVideoProvider`)

توفر المنصة تجريدًا مرنًا لرفع ومعالجة وبث المحاضرات الهندسية:

* `createUploadSession(request)`: فتح جلسة رفع مباشر (Direct Ingestion) من جهاز المحاضر إلى سحابة التخزين بدون إرهاق خادم التطبيقات.
* `getPlaybackInfo(videoId, studentId, userIp)`: توليد روابط HLS الموقعة (Signed M3U8 Tokens) وحقن معايير العلامة المائية.
* `getVideoStatus(videoId)`: متابعة تقدم التشفير والترميز (Transcoding 360p -> 1080p).
* `deleteVideo(videoId)`: حذف الأصل الرقمي عند إزالة المحاضرة.

---

## 2. المزودات المدعومة (Supported Video Providers)

1. **Bunny.net Stream (الافتراضي الرئيسي)**:
   - تشفير DRM مدمج، توزيع عالمي فائق السرعة عبر Bunny CDN.
   - حماية متقدمة ضد التحميل والتسريب.

2. **Mux Video**:
   - بث مباشر وتسجيل فوري بجودة تكيفية، وإحصائيات دقيقة لتفاعل المشاهدين.

3. **Cloudflare Stream**:
   - تشفير ومعالجة في نقاط الحافة (Edge Transcoding).

4. **YouTube Unlisted (احتياطي مجاني)**:
   - يستخدم للمحتوى المفتوح والمجاني ومقدمات الكورسات فقط.

---

## 3. تدابير مكافحة القرصنة (Anti-Piracy & Protection)

* **Dynamic Floating Watermark**: علامة مائية متحركة شفافة تحمل (اسم الطالب، البريد الإلكتروني، المعرّف، والـIP) تتحرك عشوائيًا فوق الفيديو.
* **Domain Lock & Referrer Restriction**: حصر تشغيل الفيديو على نطاق المنصة فقط.
* **Token Expiration**: صلاحية التوكنات قصيرة الأمد ويتم تجديدها تلقائيًا خلال الجلسة النشطة.
