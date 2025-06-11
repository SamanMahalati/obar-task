import axios from 'axios'

const API_BASE_URL = 'https://stage.achareh.ir/api/karfarmas'
const AUTH_TOKEN = 'Basic MDk4MjIyMjIyMjI6U2FuYTEyMzQ1Njc4'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': AUTH_TOKEN
  }
})

// درخواست‌های API
export const addressAPI = {
  // دریافت تمامی آدرس‌ها
  async getAddresses() {
    try {
      const response = await apiClient.get('/address')
      return {
        success: true,
        data: response.data
      }
    } catch (error) {
      console.error('خطا در دریافت آدرس‌ها:', error)
      return {
        success: false,
        error: this.getErrorMessage(error)
      }
    }
  },

  // ثبت آدرس جدید
  async createAddress(addressData) {
    try {
      const response = await apiClient.post('/address', addressData)
      return {
        success: true,
        data: response.data
      }
    } catch (error) {
      console.error('خطا در ثبت آدرس:', error)
      return {
        success: false,
        error: this.getErrorMessage(error)
      }
    }
  },

  // مدیریت پیام‌های خطا
  getErrorMessage(error) {
    if (error.response) {
      // خطای سرور (4xx, 5xx)
      switch (error.response.status) {
        case 400:
          return 'اطلاعات ارسالی نامعتبر است'
        case 401:
          return 'عدم دسترسی - لطفاً دوباره تلاش کنید'
        case 403:
          return 'شما مجوز دسترسی به این بخش را ندارید'
        case 404:
          return 'سرویس مورد نظر یافت نشد'
        case 500:
          return 'خطای داخلی سرور - لطفاً بعداً تلاش کنید'
        default:
          return 'خطای ناشناخته در ارتباط با سرور'
      }
    } else if (error.request) {
      // خطای شبکه
      return 'عدم دسترسی به سرور - لطفاً اتصال اینترنت خود را بررسی کنید'
    } else {
      // خطای دیگر
      return 'خطای غیرمنتظره رخ داده است'
    }
  }
}

export default apiClient 