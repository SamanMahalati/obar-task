// قوانین اعتبارسنجی فرم

export const validators = {
  // بررسی نام (حداقل 3 حرف)
  validateName(value) {
    if (!value || value.trim().length === 0) {
      return 'این فیلد اجباری است'
    }
    if (value.trim().length < 3) {
      return 'حداقل 3 حرف وارد کنید'
    }
    return null
  },

  // بررسی تلفن همراه (11 رقم)
  validateMobile(value) {
    if (!value || value.trim().length === 0) {
      return 'شماره همراه اجباری است'
    }
    const mobileRegex = /^09\d{9}$/
    if (!mobileRegex.test(value.trim())) {
      return 'شماره همراه باید 11 رقم و با 09 شروع شود'
    }
    return null
  },

  // بررسی تلفن ثابت (اختیاری، 11 رقم)
  validatePhone(value) {
    if (!value || value.trim().length === 0) {
      return null // اختیاری است
    }
    const phoneRegex = /^0\d{10}$/
    if (!phoneRegex.test(value.trim())) {
      return 'شماره تلفن ثابت باید 11 رقم و با 0 شروع شود'
    }
    return null
  },

  // بررسی آدرس (حداقل 10 حرف)
  validateAddress(value) {
    if (!value || value.trim().length === 0) {
      return 'آدرس اجباری است'
    }
    if (value.trim().length < 10) {
      return 'آدرس باید حداقل 10 حرف باشد'
    }
    return null
  },

  // بررسی جنسیت
  validateGender(value) {
    if (!value) {
      return 'انتخاب جنسیت اجباری است'
    }
    if (!['male', 'female'].includes(value)) {
      return 'جنسیت انتخابی نامعتبر است'
    }
    return null
  },

  // بررسی مختصات نقشه
  validateCoordinates(lat, lng) {
    if (!lat || !lng) {
      return 'لطفاً موقعیت خود را روی نقشه انتخاب کنید'
    }
    if (isNaN(lat) || isNaN(lng)) {
      return 'مختصات انتخابی نامعتبر است'
    }
    return null
  }
}

// اعتبارسنجی مرحله اول (بدون مختصات)
export function validateFirstStep(formData) {
  const errors = {}

  // بررسی نام
  const firstNameError = validators.validateName(formData.first_name)
  if (firstNameError) errors.first_name = firstNameError

  // بررسی نام خانوادگی
  const lastNameError = validators.validateName(formData.last_name)
  if (lastNameError) errors.last_name = lastNameError

  // بررسی شماره همراه
  const mobileError = validators.validateMobile(formData.coordinate_mobile)
  if (mobileError) errors.coordinate_mobile = mobileError

  // بررسی تلفن ثابت
  const phoneError = validators.validatePhone(formData.coordinate_phone_number)
  if (phoneError) errors.coordinate_phone_number = phoneError

  // بررسی آدرس
  const addressError = validators.validateAddress(formData.address)
  if (addressError) errors.address = addressError

  // بررسی جنسیت
  const genderError = validators.validateGender(formData.gender)
  if (genderError) errors.gender = genderError

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}

// اعتبارسنجی کل فرم
export function validateForm(formData) {
  const errors = {}

  // بررسی نام
  const firstNameError = validators.validateName(formData.first_name)
  if (firstNameError) errors.first_name = firstNameError

  // بررسی نام خانوادگی
  const lastNameError = validators.validateName(formData.last_name)
  if (lastNameError) errors.last_name = lastNameError

  // بررسی شماره همراه
  const mobileError = validators.validateMobile(formData.coordinate_mobile)
  if (mobileError) errors.coordinate_mobile = mobileError

  // بررسی تلفن ثابت
  const phoneError = validators.validatePhone(formData.coordinate_phone_number)
  if (phoneError) errors.coordinate_phone_number = phoneError

  // بررسی آدرس
  const addressError = validators.validateAddress(formData.address)
  if (addressError) errors.address = addressError

  // بررسی جنسیت
  const genderError = validators.validateGender(formData.gender)
  if (genderError) errors.gender = genderError

  // بررسی مختصات
  const coordinatesError = validators.validateCoordinates(formData.lat, formData.lng)
  if (coordinatesError) errors.coordinates = coordinatesError

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
} 