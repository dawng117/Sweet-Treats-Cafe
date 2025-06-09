<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white rounded-2xl shadow-lg overflow-hidden">
        <!-- Header -->
        <div class="bg-gradient-to-r from-pink-400 to-indigo-500 px-6 py-8 md:p-10">
          <h1 class="text-2xl md:text-3xl font-bold text-white">Hồ sơ của tôi</h1>
          <p class="mt-2 text-pink-100">Quản lý thông tin cá nhân của bạn</p>
        </div>
        
        <!-- Loading state -->
        <div v-if="isLoading" class="p-8 flex justify-center">
          <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
        </div>
        
        <!-- Error message -->
        <div v-else-if="error" class="p-8">
          <div class="bg-red-50 border-l-4 border-red-400 p-4 rounded-md">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="ml-3">
                <p class="text-sm text-red-700">{{ error }}</p>
                <button @click="fetchProfile" class="mt-2 text-sm font-medium text-red-700 hover:text-red-600">
                  Thử lại
                </button>
              </div>
            </div>
          </div>
        </div>
        <!-- Thêm vào sau phần error message và trước profile content -->
        <div v-if="successMessage" class="p-8">
          <div class="bg-green-50 border-l-4 border-green-400 p-4 rounded-md">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="ml-3">
                <p class="text-sm text-green-700">{{ successMessage }}</p>
              </div>
            </div>
          </div>
        </div>
        <!-- Profile content -->
        <div v-else-if="user" class="p-6 md:p-10">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <!-- Profile image section -->
            <div class="md:col-span-1">
              <div class="flex flex-col items-center">
                <div class="relative group">
                  <img 
                    :src="avatarSrc" 
                    alt="Profile" 
                    class="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
                    @error="handleImageError"
                  />
                  <div 
                    class="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    @click="openFileInput"
                  >
                    <span class="text-white text-sm">Thay đổi</span>
                  </div>
                  <input 
                    type="file" 
                    ref="fileInput" 
                    accept="image/*" 
                    class="hidden" 
                    @change="handleAvatarChange"
                  />
                </div>
                <h2 class="mt-4 text-xl font-semibold text-gray-900">{{ user.username }}</h2>
                <p class="text-gray-500">{{ user.role === 'admin' ? 'Quản trị viên' : 'Khách hàng' }}</p>
              </div>
            </div>
            
            <!-- Profile form -->
            <div class="md:col-span-2">
              <form @submit.prevent="updateProfile">
                <div class="space-y-6">
                  <!-- Sửa lại phần form fields, bỏ div hiển thị giá trị -->
                  <div>
                    <label for="username" class="block text-sm font-medium text-gray-700">Họ tên</label>
                    <input 
                      type="text" 
                      id="username" 
                      v-model="formData.username" 
                      :placeholder="user.username || user.name || 'Chưa cập nhật'"
                      class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                    />
                  </div>
                  
                  <div>
                    <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      v-model="formData.email" 
                      :placeholder="user.email || 'Chưa cập nhật'"
                      class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                    />
                  </div>
                  
                  <div>
                    <label for="phone" class="block text-sm font-medium text-gray-700">Số điện thoại</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      v-model="formData.phone" 
                      :placeholder="user.phone || 'Chưa cập nhật'"
                      class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                    />
                  </div>
                  
                  <div>
                    <label for="address" class="block text-sm font-medium text-gray-700">Địa chỉ</label>
                    <textarea 
                      id="address" 
                      v-model="formData.address" 
                      :placeholder="user.address || 'Chưa cập nhật'"
                      rows="3" 
                      class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                    ></textarea>
                  </div>


                  
                  <!-- Password change section -->
                  <div class="pt-4 border-t border-gray-200">
                    <h3 class="text-lg font-medium text-gray-900">Thay đổi mật khẩu</h3>
                    <p class="mt-1 text-sm text-gray-500">Để trống nếu bạn không muốn thay đổi mật khẩu</p>
                    
                    <div class="mt-4 space-y-4">
                      <!-- Current password -->
                      <div>
                        <label for="currentPassword" class="block text-sm font-medium text-gray-700">Mật khẩu hiện tại</label>
                        <input 
                          type="password" 
                          id="currentPassword" 
                          v-model="formData.currentPassword" 
                          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                        />
                      </div>
                      
                      <!-- New password -->
                      <div>
                        <label for="newPassword" class="block text-sm font-medium text-gray-700">Mật khẩu mới</label>
                        <input 
                          type="password" 
                          id="newPassword" 
                          v-model="formData.newPassword" 
                          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                        />
                      </div>
                      
                      <!-- Confirm new password -->
                      <div>
                        <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Xác nhận mật khẩu mới</label>
                        <input 
                          type="password" 
                          id="confirmPassword" 
                          v-model="formData.confirmPassword" 
                          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <!-- Submit button -->
                  <div class="flex justify-end">
                    <button 
                      type="submit" 
                      :disabled="isSubmitting"
                      class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gradient-to-r from-pink-500 to-indigo-600 hover:from-pink-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 disabled:opacity-50"
                    >
                      <svg v-if="isSubmitting" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Cập nhật thông tin
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed, nextTick } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'
import axios from 'axios'

const authStore = useAuthStore()
const router = useRouter()
const fileInput = ref(null)

const user = computed(() => authStore.user)
const isLoading = ref(false)
const isSubmitting = ref(false)
const error = ref(null)
const successMessage = ref(null)

// Computed property for avatar source - khai báo trước khi sử dụng
const avatarSrc = computed(() => {
  if (!user.value) return 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'
  
  // Log user object to debug
  console.log('User object in profile:', user.value)
  
  // Check all possible avatar field names
  let src = user.value.avatarUrl || 
         user.value.image || 
         user.value.avatar || 
         'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'
  
  // Thêm timestamp để tránh cache nếu không phải là data URL
  if (src && !src.startsWith('data:') && !src.includes('?t=')) {
    src = `${src}?t=${new Date().getTime()}`
  }
  
  return src
})

// Function to handle image loading errors
function handleImageError(e) {
  console.log('Avatar image failed to load, using fallback')
  e.target.src = 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'
}

// Form data
const formData = reactive({
  username: user.value?.username || user.value?.name || '',
  email: user.value?.email || '',
  phone: user.value?.phone || '',
  address: user.value?.address || '',
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

// Thêm các hàm xử lý avatar
const openFileInput = () => {
  fileInput.value.click()
}

// Sửa lại hàm handleAvatarChange
const handleAvatarChange = async (event) => {
  const file = event.target.files[0]
  if (!file) return
  
  // Kiểm tra kích thước file (giới hạn 2MB)
  if (file.size > 2 * 1024 * 1024) {
    error.value = 'Kích thước ảnh không được vượt quá 2MB'
    return
  }
  
  // Kiểm tra loại file
  if (!file.type.match('image.*')) {
    error.value = 'Vui lòng chọn file hình ảnh'
    return
  }
  
  isSubmitting.value = true
  error.value = null
  
  try {
    // Tạo URL tạm thời cho avatar
    const reader = new FileReader()
    reader.onload = async (e) => {
      try {
        const avatarDataUrl = e.target.result
        
        // Sử dụng endpoint profile thay vì avatar
        if (user.value?.token) {
          const response = await axios.put('http://localhost:3000/api/auth/profile', 
            { avatarUrl: avatarDataUrl },
            {
              headers: {
                'Authorization': `Bearer ${user.value.token}`,
                'Content-Type': 'application/json'
              }
            }
          )
          
          console.log('Avatar update response:', response.data)
          
          // Trong hàm handleAvatarChange, sau khi nhận response từ API
          const updatedUser = {
            ...response.data,
            avatarUrl: response.data.avatarUrl || avatarDataUrl
          }
          
          // Force update authStore
          authStore.$patch((state) => {
            state.user = { ...updatedUser }
          })
          
          // Cập nhật localStorage
          localStorage.setItem('user', JSON.stringify(updatedUser))
          
          // Thêm timestamp để tránh cache
          if (updatedUser.avatarUrl && !updatedUser.avatarUrl.startsWith('data:')) {
            updatedUser.avatarUrl = `${updatedUser.avatarUrl}?t=${new Date().getTime()}`
          }
        } else {
          // Fallback khi không có token
          const updatedUser = {
            ...user.value,
            avatarUrl: avatarDataUrl
          }
          
          // Cập nhật store với đối tượng mới
          authStore.user = { ...updatedUser }
          
          // Cập nhật localStorage
          localStorage.setItem('user', JSON.stringify(updatedUser))
        }
        
        successMessage.value = 'Ảnh đại diện đã được cập nhật'
        
        // Tự động xóa thông báo sau 2 giây
        setTimeout(() => {
          successMessage.value = null
        }, 2000)
        
        // Thêm dòng này để buộc cập nhật giao diện
        await nextTick()
      } catch (apiError) {
        console.error('API error details:', apiError.response?.data || apiError.message)
        error.value = apiError.response?.data?.message || 'Không thể cập nhật ảnh đại diện. Vui lòng thử lại sau.'
      } finally {
        isSubmitting.value = false
      }
    }
    
    reader.readAsDataURL(file)
  } catch (err) {
    console.error('Error updating avatar:', err)
    error.value = 'Không thể cập nhật ảnh đại diện. Vui lòng thử lại sau.'
    isSubmitting.value = false
  }
  
  // Reset input file để có thể chọn lại cùng một file
  event.target.value = ''
}

// Fetch user profile
const fetchProfile = async () => {
  if (!authStore.isAuthenticated) {
    router.push('/login')
    return
  }
  
  isLoading.value = true
  error.value = null
  
  try {
    if (user.value && user.value.token) {
      try {
        const response = await axios.get('http://localhost:3000/api/auth/profile', {
          headers: {
            Authorization: `Bearer ${user.value.token}`
          }
        })
        
        console.log('API profile response:', response.data)
        
        formData.username = response.data.username || response.data.name
        formData.email = response.data.email
        formData.phone = response.data.phone || ''
        formData.address = response.data.address || ''
      } catch (apiError) {
        console.error('API call failed, using local data instead:', apiError)
        formData.username = user.value.username || user.value.name
        formData.email = user.value.email
        formData.phone = user.value.phone || ''
        formData.address = user.value.address || ''
      }
    } else {
      formData.username = user.value.username || user.value.name
      formData.email = user.value.email
      formData.phone = user.value.phone || ''
      formData.address = user.value.address || ''
    }
  } catch (err) {
    console.error('Error fetching profile:', err)
    error.value = 'Không thể tải thông tin hồ sơ. Vui lòng thử lại sau.'
  } finally {
    isLoading.value = false
  }
}

// Update profile
const updateProfile = async () => {
  // Validate password if the user is trying to change it
  if (formData.newPassword) {
    if (!formData.currentPassword) {
      error.value = 'Vui lòng nhập mật khẩu hiện tại'
      return
    }
    
    if (formData.newPassword !== formData.confirmPassword) {
      error.value = 'Mật khẩu mới không khớp'
      return
    }
  }
  
  isSubmitting.value = true
  error.value = null
  successMessage.value = null
  
  try {
    // Thêm avatarUrl vào dữ liệu cập nhật để đảm bảo nó không bị mất
    const updateData = {
      username: formData.username,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      avatarUrl: user.value.avatarUrl // Thêm dòng này để giữ lại avatar
    }
    
    if (formData.newPassword) {
      updateData.currentPassword = formData.currentPassword
      updateData.newPassword = formData.newPassword
    }

    let response
    if (user.value?.token) {
      response = await axios.put('http://localhost:3000/api/auth/profile', updateData, {
        headers: {
          Authorization: `Bearer ${user.value.token}`
        }
      })
      
      console.log('Profile update response:', response.data)
      
      // Đảm bảo giữ lại avatarUrl nếu server không trả về
      const updatedUser = {
        ...response.data
      }
      
      // Nếu server không trả về avatarUrl, sử dụng giá trị hiện tại
      if (!updatedUser.avatarUrl && user.value.avatarUrl) {
        updatedUser.avatarUrl = user.value.avatarUrl
      }
      
      // Cập nhật store và localStorage với dữ liệu từ API
      authStore.user = updatedUser
      localStorage.setItem('user', JSON.stringify(updatedUser))
    } else {
      // Fallback khi không có token
      const updatedUser = {
        ...user.value,
        ...updateData,
        name: updateData.username // For backward compatibility
      }
      authStore.user = updatedUser
      localStorage.setItem('user', JSON.stringify(updatedUser))
    }

    // Reset form và hiển thị thông báo thành công
    formData.currentPassword = ''
    formData.newPassword = ''
    formData.confirmPassword = ''
    successMessage.value = 'Hồ sơ đã được cập nhật thành công'

    // Tự động xóa thông báo sau 2 giây
    setTimeout(() => {
      successMessage.value = null
    }, 2000)

    // Gọi lại fetchProfile để refresh dữ liệu
    await fetchProfile()

  } catch (err) {
    console.error('Error updating profile:', err)
    error.value = 'Không thể cập nhật hồ sơ. Vui lòng thử lại sau.'
  } finally {
    isSubmitting.value = false
  }
}

// Initialize
onMounted(() => {
  fetchProfile()
})
</script>

<style scoped>
/* Add any additional styles here */
</style>
