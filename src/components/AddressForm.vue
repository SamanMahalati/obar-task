<template>
  <div class="address-form-page">
    <div class="container">
      <div class="form-wrapper">
        <!-- مرحله اول: فرم اطلاعات -->
        <div v-if="currentStep === 1" class="step-form">
          <div class="form-header">
            <div class="step-indicator">
              <span class="step-number active">1</span>
              <span class="step-divider"></span>
              <span class="step-number">2</span>
            </div>
            <h1 class="form-title">ثبت آدرس</h1>
            <p class="form-subtitle">لطفا مشخصات و آدرس خود را وارد کنید</p>
          </div>

          <!-- نمایش پیام‌های وضعیت -->
          <div v-if="successMessage" class="alert alert-success">
            {{ successMessage }}
          </div>
          <div v-if="errorMessage" class="alert alert-error">
            {{ errorMessage }}
          </div>
          
          <form @submit.prevent="proceedToMap" class="address-form">
            <div class="form-group">
              <label for="firstName" class="form-label">نام</label>
              <input
                id="firstName"
                v-model="formData.first_name"
                type="text"
                class="form-input"
                :class="{ error: errors.first_name }"
                placeholder="محمد"
              />
              <div v-if="errors.first_name" class="error-message">
                {{ errors.first_name }}
              </div>
            </div>

            <div class="form-group">
              <label for="lastName" class="form-label">نام خانوادگی</label>
              <input
                id="lastName"
                v-model="formData.last_name"
                type="text"
                class="form-input"
                :class="{ error: errors.last_name }"
                placeholder="محمدی"
              />
              <div v-if="errors.last_name" class="error-message">
                {{ errors.last_name }}
              </div>
            </div>

            <div class="form-group">
              <label for="mobile" class="form-label">شماره تلفن همراه</label>
              <input
                id="mobile"
                v-model="formData.coordinate_mobile"
                type="tel"
                class="form-input"
                :class="{ error: errors.coordinate_mobile }"
                placeholder="۰۹۱۲۱۳۳۴۹۴۷"
                maxlength="11"
              />
              <div v-if="errors.coordinate_mobile" class="error-message">
                {{ errors.coordinate_mobile }}
              </div>
            </div>

            <div class="form-group">
              <label for="phone" class="form-label">شماره تلفن ثابت (اختیاری)</label>
              <input
                id="phone"
                v-model="formData.coordinate_phone_number"
                type="tel"
                class="form-input"
                :class="{ error: errors.coordinate_phone_number }"
                placeholder="۰۲۱۲۳۴۵۶۷۸۹"
                maxlength="11"
              />
              <div v-if="errors.coordinate_phone_number" class="error-message">
                {{ errors.coordinate_phone_number }}
              </div>
            </div>

            <div class="form-group">
              <label for="address" class="form-label">آدرس</label>
              <textarea
                id="address"
                v-model="formData.address"
                class="form-input form-textarea"
                :class="{ error: errors.address }"
                placeholder="تهران، خیابان ولیعصر، کوچه..."
                rows="3"
              ></textarea>
              <div v-if="errors.address" class="error-message">
                {{ errors.address }}
              </div>
            </div>

            <div class="form-group">
              <label for="gender" class="form-label">جنسیت</label>
              <div class="gender-options">
                <label class="gender-option">
                  <input 
                    type="radio" 
                    v-model="formData.gender" 
                    value="male"
                    name="gender"
                  />
                  <span class="gender-text">آقا</span>
                </label>
                <label class="gender-option">
                  <input 
                    type="radio" 
                    v-model="formData.gender" 
                    value="female"
                    name="gender"
                  />
                  <span class="gender-text">خانم</span>
                </label>
              </div>
              <div v-if="errors.gender" class="error-message">
                {{ errors.gender }}
              </div>
            </div>

            <div class="form-actions">
              <button type="submit" class="btn btn-primary">
                ثبت و ادامه
              </button>
            </div>
          </form>
        </div>

        <!-- مرحله دوم: انتخاب موقعیت روی نقشه -->
        <div v-if="currentStep === 2" class="step-map">
          <div class="form-header">
            <div class="step-indicator">
              <span class="step-number completed">1</span>
              <span class="step-divider completed"></span>
              <span class="step-number active">2</span>
            </div>
            <h1 class="form-title">انتخاب موقعیت</h1>
            <p class="form-subtitle">موقعیت خود را روی نقشه مشخص کنید</p>
          </div>
          
          <div class="map-section">
            <div class="map-container" ref="mapContainer">
              <div id="map" class="map-placeholder">
                <!-- Replace iframe with div for Google Maps -->
                <div id="google-map" style="width: 100%; height: 300px;"></div>
                <div v-if="formData.lat && formData.lng" class="coordinates-overlay">
                  <div class="location-marker">📍</div>
                  <div class="coordinates-info">
                    <p>مختصات انتخابی:</p>
                    <p>{{ formData.lat.toFixed(6) }}, {{ formData.lng.toFixed(6) }}</p>
                  </div>
                </div>
                <!-- Add marker indicator when hovering -->
                <div v-if="!formData.lat && !formData.lng" class="map-instruction">
                  برای انتخاب موقعیت، روی نقشه کلیک کنید
                </div>
              </div>
            </div>
            <div v-if="errors.coordinates" class="error-message">
              {{ errors.coordinates }}
            </div>
          </div>

          <div class="form-actions">
            <button 
              type="button" 
              class="btn btn-secondary"
              @click="goBackToForm"
            >
              بازگشت
            </button>
            <button 
              type="button" 
              class="btn btn-primary"
              :disabled="loading || !formData.lat || !formData.lng"
              @click="submitForm"
            >
              <span v-if="loading">در حال ثبت...</span>
              <span v-else>ثبت و ادامه</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { addressAPI } from '../services/api.js'
import { validateForm, validateFirstStep } from '../utils/validation.js'
import { GOOGLE_MAPS_CONFIG } from '../config/maps.js'

export default {
  name: 'AddressForm',
  setup() {
    const router = useRouter()
    const mapInstance = ref(null)
    const selectedMarker = ref(null)
    
    // متغیرهای reactive
    const currentStep = ref(1)
    const loading = ref(false)
    const successMessage = ref('')
    const errorMessage = ref('')
    
    const formData = reactive({
      first_name: '',
      last_name: '',
      coordinate_mobile: '',
      coordinate_phone_number: '',
      address: '',
      gender: '',
      region: 1,
      lat: null,
      lng: null
    })
    
    const errors = reactive({})

    // اضافه کردن اسکریپت گوگل مپ
    const loadGoogleMapsScript = () => {
      const script = document.createElement('script')
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_CONFIG.API_KEY}&callback=initMap`
      script.async = true
      script.defer = true
      document.head.appendChild(script)

      // تعریف تابع callback
      window.initMap = initializeMap
    }

    // راه‌اندازی نقشه گوگل
    const initializeMap = () => {
      const mapDiv = document.getElementById('google-map')
      if (!mapDiv) return

      const mapOptions = {
        center: GOOGLE_MAPS_CONFIG.DEFAULT_CENTER,
        zoom: GOOGLE_MAPS_CONFIG.DEFAULT_ZOOM,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        zoomControlOptions: {
          position: google.maps.ControlPosition.LEFT_BOTTOM
        },
        // محدود کردن محدوده نقشه به تهران
        restriction: {
          latLngBounds: {
            north: 35.8500, // شمالی‌ترین نقطه تهران
            south: 35.5800, // جنوبی‌ترین نقطه تهران
            east: 51.6000,  // شرقی‌ترین نقطه تهران
            west: 51.2000   // غربی‌ترین نقطه تهران
          },
          strictBounds: true
        }
      }

      mapInstance.value = new google.maps.Map(mapDiv, mapOptions)

      // تعریف محدوده‌های ممنوعه
      const restrictedAreas = [
        {
          name: "منطقه ممنوعه ۱",
          bounds: {
            north: 35.7800,
            south: 35.7600,
            east: 51.4500,
            west: 51.4000
          }
        },
        {
          name: "منطقه ممنوعه ۲",
          bounds: {
            north: 35.7500,
            south: 35.7300,
            east: 51.5000,
            west: 51.4500
          }
        }
      ]

      // اضافه کردن event listener برای کلیک
      mapInstance.value.addListener('click', (event) => {
        const lat = event.latLng.lat()
        const lng = event.latLng.lng()
        
        // بررسی آیا نقطه انتخابی در محدوده‌های ممنوعه قرار دارد
        const isInRestrictedArea = restrictedAreas.some(area => {
          return lat <= area.bounds.north &&
                 lat >= area.bounds.south &&
                 lng <= area.bounds.east &&
                 lng >= area.bounds.west
        })

        if (isInRestrictedArea) {
          // نمایش پیام خطا اگر نقطه در محدوده ممنوعه باشد
          errors.coordinates = 'این منطقه خارج از محدوده سرویس‌دهی است'
          return
        }

        // حذف مارکر قبلی
        if (selectedMarker.value) {
          selectedMarker.value.setMap(null)
        }

        // ایجاد مارکر جدید
        selectedMarker.value = new google.maps.Marker({
          position: { lat, lng },
          map: mapInstance.value,
          animation: google.maps.Animation.DROP
        })

        // ذخیره مختصات
        formData.lat = lat
        formData.lng = lng
        
        // پاک کردن خطای مختصات
        if (errors.coordinates) {
          delete errors.coordinates
        }
      })

      // نمایش محدوده‌های ممنوعه روی نقشه
      restrictedAreas.forEach(area => {
        const rectangle = new google.maps.Rectangle({
          bounds: new google.maps.LatLngBounds(
            { lat: area.bounds.south, lng: area.bounds.west },
            { lat: area.bounds.north, lng: area.bounds.east }
          ),
          map: mapInstance.value,
          fillColor: '#FF0000',
          fillOpacity: 0.2,
          strokeColor: '#FF0000',
          strokeWeight: 1
        })
      })
    }

    // Watch for step changes
    watch(currentStep, (newStep) => {
      if (newStep === 2) {
        // Load map when entering step 2
        setTimeout(() => {
          if (!window.google) {
            loadGoogleMapsScript()
          } else {
            initializeMap()
          }
        }, 100)
      }
    })

    onMounted(() => {
      if (currentStep.value === 2 && !window.google) {
        loadGoogleMapsScript()
      }
    })

    // انتقال به مرحله نقشه
    const proceedToMap = () => {
      successMessage.value = ''
      errorMessage.value = ''
      
      const tempData = { ...formData }
      delete tempData.lat
      delete tempData.lng
      
      const validation = validateFirstStep(tempData)
      
      Object.keys(errors).forEach(key => delete errors[key])
      
      if (!validation.isValid) {
        const filteredErrors = { ...validation.errors }
        delete filteredErrors.coordinates
        Object.assign(errors, filteredErrors)
        errorMessage.value = 'لطفاً اطلاعات را به درستی وارد کنید'
        return
      }
      
      currentStep.value = 2
      // Initialize map after step change
      setTimeout(() => {
        loadGoogleMapsScript()
      }, 100)
    }

    // بازگشت به فرم
    const goBackToForm = () => {
      currentStep.value = 1
    }

    // ارسال فرم
    const submitForm = async () => {
      loading.value = true
      successMessage.value = ''
      errorMessage.value = ''
      
      try {
        // اعتبارسنجی نهایی
        const validation = validateForm(formData)
        
        Object.keys(errors).forEach(key => delete errors[key])
        
        if (!validation.isValid) {
          Object.assign(errors, validation.errors)
          errorMessage.value = 'لطفاً تمامی اطلاعات را به درستی وارد کنید'
          return
        }

        // ارسال داده‌ها
        const result = await addressAPI.createAddress(formData)
        
        if (result.success) {
          successMessage.value = 'آدرس با موفقیت ثبت شد!'
          
          // پاک کردن فرم
          Object.keys(formData).forEach(key => {
            if (typeof formData[key] === 'string') {
              formData[key] = ''
            } else if (typeof formData[key] === 'number') {
              formData[key] = key === 'region' ? 1 : null
            }
          })
          
          currentStep.value = 1
          
          // بعد از 2 ثانیه انتقال به صفحه لیست
          setTimeout(() => {
            router.push('/addresses')
          }, 2000)
          
        } else {
          errorMessage.value = result.error || 'خطا در ثبت آدرس'
        }
        
      } catch (error) {
        console.error('خطا در ارسال فرم:', error)
        errorMessage.value = 'خطای غیرمنتظره رخ داده است'
      } finally {
        loading.value = false
      }
    }

    return {
      currentStep,
      loading,
      successMessage,
      errorMessage,
      formData,
      errors,
      proceedToMap,
      goBackToForm,
      submitForm
    }
  }
}
</script>

<style scoped>
.address-form-page {
  padding: 0;
  min-height: 100vh;
  background: #f8f9fa;
}

.container {
  max-width: 400px;
  margin: 0 auto;
  padding: 0;
}

.form-wrapper {
  background: white;
  min-height: 100vh;
}

.form-header {
  padding: 2rem 1.5rem 1rem;
  text-align: center;
  background: white;
  border-bottom: 1px solid #e9ecef;
}

.step-indicator {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1.5rem;
}

.step-number {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
  background: #e9ecef;
  color: #6c757d;
}

.step-number.active {
  background: #20b2aa;
  color: white;
}

.step-number.completed {
  background: #28a745;
  color: white;
}

.step-divider {
  width: 60px;
  height: 2px;
  background: #e9ecef;
  margin: 0 1rem;
}

.step-divider.completed {
  background: #28a745;
}

.form-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #212529;
  margin: 0 0 0.5rem 0;
}

.form-subtitle {
  color: #6c757d;
  font-size: 0.9rem;
  margin: 0;
}

.address-form {
  padding: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #495057;
  font-size: 0.9rem;
}

.form-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ced4da;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  background: white;
  box-sizing: border-box;
}

.form-input:focus {
  outline: none;
  border-color: #20b2aa;
  box-shadow: 0 0 0 2px rgba(32, 178, 170, 0.2);
}

.form-input.error {
  border-color: #dc3545;
}

.form-textarea {
  resize: vertical;
  min-height: 80px;
}

.gender-options {
  display: flex;
  gap: 1rem;
}

.gender-option {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 8px;
  transition: background-color 0.3s ease;
}

.gender-option:hover {
  background: #f8f9fa;
}

.gender-option input[type="radio"] {
  accent-color: #20b2aa;
}

.gender-text {
  font-size: 0.9rem;
  color: #495057;
}

.form-actions {
  padding: 1.5rem;
  border-top: 1px solid #e9ecef;
  background: white;
}

.btn {
  width: 100%;
  padding: 0.875rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
  text-align: center;
  margin-bottom: 0.5rem;
}

.btn-primary {
  background: #20b2aa;
  color: white;
}

.btn-primary:hover {
  background: #1a9b94;
}

.btn-primary:disabled {
  background: #9ca3af;
  cursor: not-allowed;
}

.btn-secondary {
  background: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background: #5a6268;
}

.map-section {
  padding: 1.5rem;
}

.map-container {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #e9ecef;
}

.map-placeholder {
  position: relative;
  height: 300px;
  cursor: pointer;
}

.coordinates-overlay {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(255, 255, 255, 0.9);
  padding: 0.5rem;
  border-radius: 8px;
  font-size: 0.8rem;
  border: 1px solid #e9ecef;
}

.location-marker {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2rem;
  z-index: 10;
}

.error-message {
  color: #dc3545;
  font-size: 0.8rem;
  margin-top: 0.25rem;
}

.alert {
  padding: 0.75rem;
  border-radius: 8px;
  margin: 1rem 1.5rem;
  border: 1px solid;
}

.alert-success {
  background: #d4edda;
  border-color: #c3e6cb;
  color: #155724;
}

.alert-error {
  background: #f8d7da;
  border-color: #f5c6cb;
  color: #721c24;
}

.map-instruction {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(255, 255, 255, 0.9);
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  font-size: 0.9rem;
  color: #666;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  pointer-events: none;
}

#google-map {
  width: 100%;
  height: 300px;
  border-radius: 8px;
}

@media (max-width: 768px) {
  .container {
    max-width: 100%;
  }
  
  .form-input,
  .btn {
    font-size: 16px; /* Prevents zoom on iOS */
  }
}
</style> 