import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'
import { useNotificationStore } from './notification' // Import notification store

const API_URL = 'http://localhost:3000/api/auth'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const isLoading = ref(false)
  const error = ref(null)
  const notificationStore = useNotificationStore() // Sử dụng notification store

  // Computed properties
  const isAuthenticated = computed(() => !!user.value)
  const isAdmin = computed(() => user.value?.role === 'admin')

  // Initialize auth state from localStorage
  function initAuth() {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      try {
        user.value = JSON.parse(savedUser)
      } catch (e) {
        console.error('Error parsing user from localStorage:', e)
        localStorage.removeItem('user')
      }
    }
  }

  // Register user
  async function register(userData) {
    isLoading.value = true
    error.value = null
    
    try {
      console.log('Registering with data:', userData)
      
      // Sử dụng API thực tế
      const response = await axios.post(`${API_URL}/register`, {
        username: userData.name,
        email: userData.email,
        password: userData.password,
        phone: userData.phone || '',
        address: userData.address || '',
        image: userData.avatarUrl || '' // Send avatarUrl as image to server
      })
      
      const newUser = response.data
      
      // Ensure avatarUrl is stored in the user object
      if (userData.avatarUrl) {
        newUser.avatarUrl = userData.avatarUrl
      }
      
      localStorage.setItem('user', JSON.stringify(newUser))
      user.value = newUser
      
      // Hiển thị thông báo thành công
      notificationStore.addNotification(
        `Chào mừng ${newUser.username || 'bạn'} đã tham gia Sweet Treats Cafe!`, 
        'success'
      )
      
      return { success: true }
    } catch (e) {
      console.error('Registration error:', e.response?.data || e)
      error.value = e.response?.data?.message || 'Đăng ký thất bại. Vui lòng thử lại.'
      
      // Hiển thị thông báo lỗi
      notificationStore.addNotification(error.value, 'error', 5000)
      
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  // Login user
  async function login(credentials) {
    isLoading.value = true
    error.value = null
    
    try {
      // Sử dụng API thực tế
      const response = await axios.post(`${API_URL}/login`, credentials)
      const userData = response.data
      
      // Đảm bảo giữ lại avatarUrl
      if (response.data.image && !response.data.avatarUrl) {
        userData.avatarUrl = response.data.image
      }
      
      localStorage.setItem('user', JSON.stringify(userData))
      user.value = userData
      
      // Hiển thị thông báo thành công
      notificationStore.addNotification(
        `Chào mừng ${userData.username || 'bạn'} đã quay trở lại!`, 
        'success'
      )
      
      return { success: true }
    } catch (e) {
      error.value = e.response?.data?.message || 'Đăng nhập thất bại. Vui lòng thử lại.'
      
      // Hiển thị thông báo lỗi
      notificationStore.addNotification(error.value, 'error', 5000)
      
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  // Logout user
  function logout() {
    const username = user.value?.username || 'bạn'
    localStorage.removeItem('user')
    user.value = null
    
    // Hiển thị thông báo đăng xuất thành công
    notificationStore.addNotification(
      `${username} đã đăng xuất thành công!`, 
      'info'
    )
  }
  // Thêm vào auth store
async function deleteUser(userId) {
  isLoading.value = true
  error.value = null
  
  try {
    // Kiểm tra xem người dùng hiện tại có phải là admin không
    if (!user.value || user.value.role !== 'admin') {
      throw new Error('Bạn không có quyền thực hiện hành động này')
    }
    
    // Gọi API xóa user
    await axios.delete(`${API_URL}/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${user.value.token}`
      }
    })
    
    // Hiển thị thông báo thành công
    notificationStore.addNotification(
      'Đã xóa người dùng thành công',
      'success'
    )
    
    return { success: true }
  } catch (e) {
    console.error('Delete user error:', e.response?.data || e)
    error.value = e.response?.data?.message || 'Không thể xóa người dùng. Vui lòng thử lại.'
    
    // Hiển thị thông báo lỗi
    notificationStore.addNotification(error.value, 'error', 5000)
    
    return { success: false, error: error.value }
  } finally {
    isLoading.value = false
  }
}
  // Update profile
  async function updateProfile(profileData) {
    isLoading.value = true
    error.value = null
    
    try {
      const token = user.value.token
      const response = await axios.put(`${API_URL}/profile`, profileData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      
      const updatedUser = response.data
      
      // Lưu user vào localStorage
      localStorage.setItem('user', JSON.stringify(updatedUser))
      user.value = updatedUser
      
      return { success: true }
    } catch (e) {
      error.value = e.response?.data?.message || 'Cập nhật hồ sơ thất bại. Vui lòng thử lại.'
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  // Initialize auth state
  initAuth()

  return {
    user,
    isLoading,
    error,
    isAuthenticated,
    isAdmin,
    initAuth,
    register,
    login,
    logout,
    updateProfile,
    deleteUser,
  }
})
