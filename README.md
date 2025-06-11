# سیستم مدیریت آدرس اوبار

این پروژه یک سیستم مدیریت آدرس برای پلتفرم اوبار است که با Vue.js 3 پیاده‌سازی شده است.

## ویژگی‌های پروژه

- ✅ ثبت آدرس جدید با فرم کامل
- ✅ اعتبارسنجی کامل فیلدهای فرم
- ✅ انتخاب موقعیت روی نقشه (شبیه‌سازی شده)
- ✅ نمایش لیست آدرس‌های ثبت شده
- ✅ طراحی ریسپانسیو (Mobile First)
- ✅ مدیریت خطا و Loading States
- ✅ ارتباط با API واقعی
- ✅ کد تمیز و مرتب

## تکنولوژی‌های استفاده شده

- **Vue.js 3** - فریمورک اصلی
- **Vue Router 4** - مدیریت routing
- **Axios** - ارتباط با API
- **Vite** - Build tool
- **CSS3** - استایل‌دهی
- **Vazirmatn Font** - فونت فارسی

## نصب و راه‌اندازی

### پیش‌نیازها
- Node.js (نسخه 16 یا بالاتر)
- npm یا yarn

### مراحل نصب

1. **نصب dependencies:**
   ```bash
   npm install
   ```

2. **اجرای پروژه در حالت development:**
   ```bash
   npm run dev
   ```

3. **بیلد پروژه برای production:**
   ```bash
   npm run build
   ```

4. **پیش‌نمایش بیلد:**
   ```bash
   npm run preview
   ```

## ساختار پروژه

```
src/
├── components/          # کامپوننت‌های Vue
│   ├── AddressForm.vue  # فرم ثبت آدرس
│   └── AddressList.vue  # لیست آدرس‌ها
├── services/           # سرویس‌های API
│   └── api.js         # تنظیمات Axios و API calls
├── utils/             # توابع کمکی
│   └── validation.js  # اعتبارسنجی فرم
├── App.vue           # کامپوننت اصلی
├── main.js          # نقطه ورود اپلیکیشن
└── style.css       # استایل‌های عمومی
```

## API Endpoints

### دریافت آدرس‌ها
- **URL:** `GET https://stage.achareh.ir/api/karfarmas/address`
- **Headers:** Authorization: `Basic MDk4MjIyMjIyMjI6U2FuYTEyMzQ1Njc4`

### ثبت آدرس جدید
- **URL:** `POST https://stage.achareh.ir/api/karfarmas/address`
- **Headers:** Authorization: `Basic MDk4MjIyMjIyMjI6U2FuYTEyMzQ1Njc4`
- **Body:**
  ```json
  {
    "first_name": "string",
    "last_name": "string",
    "coordinate_mobile": "string",
    "coordinate_phone_number": "string",
    "address": "string",
    "region": 1,
    "lat": "number",
    "lng": "number",
    "gender": "male|female"
  }
  ```

## قوانین اعتبارسنجی

- **نام و نام خانوادگی:** اجباری، حداقل 3 حرف
- **شماره همراه:** اجباری، 11 رقم، با 09 شروع شود
- **شماره ثابت:** اختیاری، 11 رقم، با 0 شروع شود
- **آدرس:** اجباری، حداقل 10 حرف
- **جنسیت:** اجباری (آقا/خانم)
- **مختصات نقشه:** اجباری

## ویژگی‌های طراحی

### Mobile First Design
- طراحی اولیه برای موبایل
- Responsive layout برای تبلت و دسکتاپ
- فونت‌ها و اندازه‌ها بهینه شده برای تمام دستگاه‌ها

### UX/UI Features
- Loading states برای عملیات async
- پیام‌های خطا و موفقیت
- اعتبارسنجی real-time
- انیمیشن‌های نرم
- Navigation ساده و کاربرپسند

## مدیریت خطا

سیستم مدیریت خطای کاملی پیاده‌سازی شده که شامل:
- خطاهای شبکه
- خطاهای سرور (4xx, 5xx)
- خطاهای اعتبارسنجی
- پیام‌های خطای کاربرپسند به فارسی

## نکات مهم

1. **نقشه:** فعلاً به صورت شبیه‌سازی پیاده شده. برای استفاده واقعی نیاز به entegration با سرویس نقشه دارد.

2. **Authentication:** توکن احراز هویت در کد قرار دارد (برای تست). در پروژه واقعی باید از متغیرهای محیطی استفاده شود.

3. **Browser Support:** پروژه با مرورگرهای مدرن سازگار است.

## دستورات NPM

```bash
# نصب dependencies
npm install

# اجرای development server
npm run dev

# بیلد پروژه
npm run build

# پیش‌نمایش بیلد
npm run preview
```

## مشارکت در پروژه

1. Fork کنید
2. Branch جدید بسازید (`git checkout -b feature/amazing-feature`)
3. تغییرات را commit کنید (`git commit -m 'Add amazing feature'`)
4. Push کنید (`git push origin feature/amazing-feature`)
5. Pull Request باز کنید

## لایسنس

این پروژه تحت لایسنس MIT است.

---

**نوشته شده با ❤️ برای اوبار** 