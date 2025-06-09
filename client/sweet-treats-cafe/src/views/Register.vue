<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg transform transition-all">
      <div>
        <div class="flex justify-center">
          <img class="h-16 w-auto" src="@/assets/logo.png" alt="Sweet Treats Cafe" />
        </div>
        <h2 class="mt-4 text-center text-3xl font-extrabold text-gray-900">Đăng ký tài khoản</h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Hoặc
          <router-link to="/login" class="font-medium text-pastel-pink hover:text-pink-500 transition-colors">
            đăng nhập nếu đã có tài khoản
          </router-link>
        </p>
      </div>
      
      <form class="mt-8 space-y-6" @submit.prevent="handleRegister">
        <div v-if="error" class="bg-red-100 border-l-4 border-red-400 text-red-700 p-4 rounded-md relative" role="alert">
          <div class="flex">
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="ml-3">
              <p class="text-sm">{{ error }}</p>
            </div>
          </div>
        </div>
        
        <div class="rounded-md space-y-4">
          <!-- Avatar field - updated with file upload option -->
          <div>
            <label for="avatar-url" class="block text-sm font-medium text-gray-700 mb-1">Ảnh đại diện</label>
            <div class="flex items-center space-x-4">
              <div class="w-16 h-16 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center border border-gray-300">
                <img v-if="avatarPreview" :src="avatarPreview" alt="Avatar preview" class="w-full h-full object-cover" @error="handleImageError" />
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div class="flex-1 space-y-3">
                <!-- URL Input -->
                <div>
                  <div class="flex items-center">
                    <input
                      id="avatar-url"
                      name="avatar-url"
                      type="url"
                      v-model="avatarUrl"
                      @input="validateAvatarUrl"
                      class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-pastel-pink focus:border-pastel-pink transition-colors sm:text-sm"
                      placeholder="https://example.com/your-image.jpg"
                    />
                  </div>
                  <p class="mt-1 text-xs text-gray-500">Nhập URL hình ảnh của bạn</p>
                </div>
                
                <!-- File Upload -->
                <div>
                  <p class="text-xs text-gray-500 mb-1">Hoặc tải lên từ máy tính</p>
                  <label for="avatar-file" class="cursor-pointer py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pastel-pink inline-flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4 4m4-4v12" />
                    </svg>
                    <span>Chọn file</span>
                    <input id="avatar-file" name="avatar-file" type="file" accept="image/*" class="sr-only" @change="handleFileUpload" />
                  </label>
                  <span v-if="selectedFile" class="ml-2 text-xs text-gray-500">{{ selectedFile.name }}</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Họ tên</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              v-model="name"
              class="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-pastel-pink focus:border-pastel-pink transition-colors sm:text-sm"
              placeholder="Họ tên của bạn"
            />
          </div>
          
          <div>
            <label for="email-address" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              id="email-address"
              name="email"
              type="email"
              autocomplete="email"
              required
              v-model="email"
              class="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-pastel-pink focus:border-pastel-pink transition-colors sm:text-sm"
              placeholder="Email của bạn"
            />
          </div>
          
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Mật khẩu</label>
            <input
              id="password"
              name="password"
              type="password"
              autocomplete="new-password"
              required
              v-model="password"
              class="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-pastel-pink focus:border-pastel-pink transition-colors sm:text-sm"
              placeholder="Mật khẩu của bạn"
            />
          </div>
          
          <div>
            <label for="confirm-password" class="block text-sm font-medium text-gray-700 mb-1">Xác nhận mật khẩu</label>
            <input
              id="confirm-password"
              name="confirm-password"
              type="password"
              autocomplete="new-password"
              required
              v-model="confirmPassword"
              class="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-pastel-pink focus:border-pastel-pink transition-colors sm:text-sm"
              placeholder="Nhập lại mật khẩu"
            />
          </div>
        </div>

        <div v-if="password !== confirmPassword && password && confirmPassword" 
             class="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md">
          <div class="flex">
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="ml-3">
              <p class="text-sm text-yellow-700">
                Mật khẩu xác nhận không khớp
              </p>
            </div>
          </div>
        </div>

        <div>
          <button
            type="submit"
            :disabled="isLoading || (password !== confirmPassword && password && confirmPassword)"
            class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-pastel-pink hover:bg-pink-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pastel-pink transition-all duration-300 disabled:bg-pink-300 disabled:cursor-not-allowed"
          >
            <span v-if="isLoading" class="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </span>
            <span class="group-hover:tracking-wider transition-all duration-300">Đăng ký</span>
          </button>
        </div>
      </form>
      
      <div class="flex items-center justify-center mt-6">
        <div class="text-sm">
          <router-link to="/" class="flex items-center font-medium text-pastel-pink hover:text-pink-500 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Quay lại trang chủ
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'
import { useNotificationStore } from '../stores/notification'

const authStore = useAuthStore()
const router = useRouter()
const notificationStore = useNotificationStore()

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const error = ref('')
const isLoading = ref(false)
const avatarUrl = ref('')
const selectedFile = ref(null)

// Computed property for avatar preview
const avatarPreview = computed(() => {
  if (selectedFile.value) {
    return URL.createObjectURL(selectedFile.value)
  }
  return avatarUrl.value || ''
})

// Function to validate avatar URL
function validateAvatarUrl() {
  if (!avatarUrl.value) return
  
  // Simple URL validation
  if (!avatarUrl.value.match(/^(http|https):\/\/[^ "]+$/)) {
    error.value = 'URL ảnh không hợp lệ'
    return
  }
  
  // Clear error if URL is valid
  if (error.value === 'URL ảnh không hợp lệ') {
    error.value = ''
  }
  
  // Clear selected file when URL is entered
  selectedFile.value = null
}

// Handle file upload
function handleFileUpload(event) {
  const file = event.target.files[0]
  if (!file) return
  
  // Validate file type
  if (!file.type.match(/image\/.*/)) {
    error.value = 'Vui lòng chọn file hình ảnh'
    return
  }
  
  // Validate file size (max 5MB)
  if (file.size > 5 * 1024 * 1024) {
    error.value = 'Kích thước file không được vượt quá 5MB'
    return
  }
  
  selectedFile.value = file
  avatarUrl.value = '' // Clear URL when file is selected
  
  // Clear error if any
  if (error.value === 'URL ảnh không hợp lệ' || 
      error.value === 'Vui lòng chọn file hình ảnh' ||
      error.value === 'Kích thước file không được vượt quá 5MB') {
    error.value = ''
  }
}

// Handle image loading errors
function handleImageError(e) {
  console.log('Avatar image failed to load')
  e.target.src = 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'
}

async function handleRegister() {
  if (password.value !== confirmPassword.value) {
    error.value = 'Mật khẩu xác nhận không khớp'
    return
  }
  
  isLoading.value = true
  error.value = ''
  
  try {
    let finalAvatarUrl = avatarUrl.value
    
    // If file is selected, convert to base64
    if (selectedFile.value) {
      finalAvatarUrl = await convertFileToBase64(selectedFile.value)
    }
    
    console.log('Registering with avatar:', finalAvatarUrl ? 'Avatar provided' : 'No avatar')
    
    // Include avatarUrl in registration data
    const result = await authStore.register({
      name: name.value,
      email: email.value,
      password: password.value,
      avatarUrl: finalAvatarUrl // Add avatar URL to registration data
    })
    
    console.log('Registration result:', result.success ? 'Success' : 'Failed')
    
    if (result.success) {
      // Thêm thông báo thành công
      notificationStore.addNotification(
        'Đăng ký thành công! Bạn đã được đăng nhập tự động.',
        'success',
        2000
      )
      router.push('/')
    } else {
      error.value = result.error || 'Đăng ký thất bại'
    }
  } catch (e) {
    console.error('Registration error:', e)
    error.value = e.message || 'Đã xảy ra lỗi'
  } finally {
    isLoading.value = false
  }
}

// Convert file to base64
function convertFileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}
</script>

<style scoped>
.bg-gradient-to-br {
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.shadow-lg {
  box-shadow: 0 10px 25px -5px rgba(249, 168, 212, 0.1), 0 10px 10px -5px rgba(249, 168, 212, 0.04);
}

input:focus {
  box-shadow: 0 0 0 2px rgba(255, 182, 193, 0.2);
}

button:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

button:active:not(:disabled) {
  transform: translateY(0);
}
</style>