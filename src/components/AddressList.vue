<template>
  <div class="address-list-page">
    <div class="container">
      <div class="page-header">
        <img src="/assets/logo.png" alt="آچاره" class="header-logo" />
        <h1 class="page-title">آدرس ها و مشخصات</h1>
      </div>

      <!-- نمایش پیام خطا -->
      <div v-if="errorMessage" class="alert alert-error">
        {{ errorMessage }}
      </div>

      <!-- وضعیت لودینگ -->
      <div v-if="loading" class="loading">
        <div class="spinner"></div>
        <p>در حال بارگذاری آدرس‌ها...</p>
      </div>

      <!-- لیست آدرس‌ها -->
      <div v-else-if="addresses.length > 0" class="addresses-list">
        <div 
          v-for="address in addresses" 
          :key="address.id"
          class="address-card"
        >
          <div class="address-header">
            <div class="user-name">
              {{ address.first_name }} {{ address.last_name }}
            </div>
            <div v-if="address.gender" class="gender-badge">
              {{ address.gender === 'male' ? 'آقا' : 'خانم' }}
            </div>
          </div>

          <div class="address-body">
            <div class="contact-row">
              <span class="contact-label">شماره تلفن همراه</span>
              <span class="contact-value">{{ address.coordinate_mobile || '-' }}</span>
            </div>
            
            <div class="contact-row">
              <span class="contact-label">شماره تلفن ثابت</span>
              <span class="contact-value">{{ address.coordinate_phone_number || '-' }}</span>
            </div>

            <div class="address-section">
              <span class="address-label">آدرس</span>
              <p class="address-text">{{ address.address }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- پیام خالی بودن لیست -->
      <div v-else-if="!loading" class="empty-state">
        <div class="empty-icon">📍</div>
        <h2 class="empty-title">هیچ آدرسی ثبت نشده</h2>
        <p class="empty-description">
          برای شروع، اولین آدرس خود را ثبت کنید
        </p>
        <router-link to="/" class="btn btn-primary">
          ثبت آدرس جدید
        </router-link>
      </div>

      <!-- دکمه بارگذاری مجدد -->
      <div v-if="!loading && addresses.length > 0" class="refresh-section">
        <button 
          @click="loadAddresses" 
          class="btn btn-secondary"
          :disabled="refreshing"
        >
          <span v-if="refreshing">در حال بروزرسانی...</span>
          <span v-else>🔄 بروزرسانی</span>
        </button>
      </div>

      <!-- دکمه افزودن آدرس جدید -->
      <div v-if="addresses.length > 0" class="add-address-section">
        <router-link to="/" class="btn btn-primary">
          ثبت آدرس جدید
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { addressAPI } from '../services/api.js'

export default {
  name: 'AddressList',
  setup() {
    const addresses = ref([])
    const loading = ref(true)
    const refreshing = ref(false)
    const errorMessage = ref('')

    // بارگذاری آدرس‌ها
    const loadAddresses = async (isRefresh = false) => {
      if (isRefresh) {
        refreshing.value = true
      } else {
        loading.value = true
      }
      
      errorMessage.value = ''

      try {
        const result = await addressAPI.getAddresses()
        
        if (result.success) {
          addresses.value = result.data || []
        } else {
          errorMessage.value = result.error || 'خطا در دریافت آدرس‌ها'
          addresses.value = []
        }
      } catch (error) {
        console.error('خطا در بارگذاری آدرس‌ها:', error)
        errorMessage.value = 'خطای غیرمنتظره در بارگذاری آدرس‌ها'
        addresses.value = []
      } finally {
        loading.value = false
        refreshing.value = false
      }
    }

    // بارگذاری اولیه
    onMounted(() => {
      loadAddresses()
    })

    return {
      addresses,
      loading,
      refreshing,
      errorMessage,
      loadAddresses: () => loadAddresses(true)
    }
  }
}
</script>

<style scoped>
.address-list-page {
  padding: 0;
  min-height: 100vh;
  background: #f8f9fa;
}

.container {
  max-width: 400px;
  margin: 0 auto;
  padding: 0;
  background: white;
  min-height: 100vh;
}

.page-header {
  padding: 1.5rem;
  text-align: center;
  background: white;
  border-bottom: 1px solid #e9ecef;
}

.header-logo {
  height: 40px;
  margin-bottom: 1rem;
}

.page-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #212529;
  margin: 0;
}

.addresses-list {
  padding: 0;
}

.address-card {
  background: white;
  border-bottom: 1px solid #e9ecef;
  padding: 1.5rem;
}

.address-card:last-child {
  border-bottom: none;
}

.address-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.user-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: #212529;
}

.gender-badge {
  background: #e9ecef;
  color: #495057;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
}

.address-body {
  space-y: 1rem;
}

.contact-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid #f1f3f4;
}

.contact-row:last-of-type {
  border-bottom: none;
}

.contact-label {
  color: #6c757d;
  font-size: 0.9rem;
  font-weight: 500;
}

.contact-value {
  color: #212529;
  font-weight: 500;
  font-size: 0.9rem;
}

.address-section {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #f1f3f4;
}

.address-label {
  display: block;
  color: #6c757d;
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.address-text {
  color: #212529;
  line-height: 1.5;
  margin: 0;
  font-size: 0.9rem;
}

.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  background: white;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.empty-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
}

.empty-description {
  color: #6b7280;
  margin-bottom: 2rem;
  font-size: 0.9rem;
}

.refresh-section {
  padding: 1rem 1.5rem;
  border-top: 1px solid #e9ecef;
  background: white;
}

.add-address-section {
  padding: 1rem 1.5rem;
  border-top: 1px solid #e9ecef;
  background: white;
}

.btn {
  width: 100%;
  padding: 0.875rem;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
  text-align: center;
}

.btn-primary {
  background: #20b2aa;
  color: white;
}

.btn-primary:hover {
  background: #1a9b94;
}

.btn-secondary {
  background: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background: #5a6268;
}

.loading {
  text-align: center;
  padding: 4rem 2rem;
  background: white;
}

.loading p {
  margin-top: 1rem;
  color: #6b7280;
  font-size: 0.9rem;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #e5e7eb;
  border-top: 4px solid #20b2aa;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.alert {
  padding: 1rem 1.5rem;
  border-radius: 0;
  margin: 0;
  border: none;
  border-bottom: 1px solid #e9ecef;
}

.alert-error {
  background: #f8d7da;
  color: #721c24;
}

@media (max-width: 768px) {
  .container {
    max-width: 100%;
  }
}
</style> 