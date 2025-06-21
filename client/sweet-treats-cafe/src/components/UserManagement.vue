<template>
  <div class="bg-white shadow overflow-hidden sm:rounded-lg">
    <div class="px-4 py-4 sm:px-6 sm:py-5 flex justify-between items-center">
      <div>
        <h3 class="text-base sm:text-lg leading-6 font-medium text-gray-900">Danh sách tất cả người dùng trong hệ thống</h3>
      </div>
      <div v-if="loading" class="animate-spin h-4 w-4 sm:h-5 sm:w-5 text-pastel-pink">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    </div>
    
    <div v-if="error" class="bg-red-100 border-l-4 border-red-400 text-red-700 p-3 sm:p-4">
      <p class="text-sm sm:text-base">{{ error }}</p>
    </div>
    
    <!-- Danh sách thẻ trên di động -->
    <div class="sm:hidden px-4 py-4 space-y-4">
      <div v-for="user in users" :key="user._id" class="border rounded-lg p-4 bg-white shadow-sm">
        <div class="flex items-center mb-3">
          <img 
            :src="user.image || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'" 
            :alt="user.username" 
            class="h-8 w-8 rounded-full object-cover mr-3"
            @error="handleImageError"
          />
          <div>
            <div class="text-sm font-medium text-gray-900">{{ user.username }}</div>
            <div v-if="user.phone" class="text-xs text-gray-500">{{ user.phone }}</div>
          </div>
        </div>
        <div class="text-xs text-gray-900 mb-2">{{ user.email }}</div>
        <div v-if="user.address" class="text-xs text-gray-500 mb-2 truncate">{{ user.address }}</div>
        <div class="flex items-center mb-3">
          <span 
            :class="[
              'px-2 inline-flex text-xs leading-5 font-semibold rounded-full', 
              user.role === 'admin' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
            ]"
          >
            {{ user.role === 'admin' ? 'Admin' : 'Khách hàng' }}
          </span>
          <span 
            v-if="user.isLocked"
            class="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800"
          >
            Đã khóa
          </span>
        </div>
        <div class="flex flex-wrap gap-2">
          <button
            v-if="canChangeRole(user)"
            @click="confirmChangeRole(user)"
            class="text-indigo-600 hover:text-indigo-900 text-xs transition-colors duration-200"
          >
            {{ user.role === 'admin' ? 'Hủy admin' : 'Cấp admin' }}
          </button>
          <button
            v-if="canToggleLock(user)"
            @click="confirmToggleLock(user)"
            :class="[
              user.isLocked ? 'text-green-600 hover:text-green-900' : 'text-orange-600 hover:text-orange-900',
              'text-xs transition-colors duration-200'
            ]"
          >
            {{ user.isLocked ? 'Mở khóa' : 'Khóa' }}
          </button>
          <button 
            @click="confirmDelete(user)"
            :disabled="user.role === 'admin' && user.email === 'admin@example.com'"
            :class="[
              'text-red-600 hover:text-red-900 disabled:text-gray-400 disabled:cursor-not-allowed',
              'text-xs transition-colors duration-200'
            ]"
          >
            Xóa
          </button>
        </div>
      </div>
    </div>
    
    <!-- Danh sách bảng trên màn hình lớn -->
    <div class="hidden sm:block border-t border-gray-200 overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Người dùng
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Vai trò
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Thao tác
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="user in users" :key="user._id">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <div class="flex-shrink-0 h-10 w-10">
                  <img 
                    :src="user.image || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'" 
                    :alt="user.username" 
                    class="h-10 w-10 rounded-full object-cover"
                    @error="handleImageError"
                  />
                </div>
                <div class="ml-4">
                  <div class="text-sm font-medium text-gray-900">{{ user.username }}</div>
                  <div v-if="user.phone" class="text-xs text-gray-500">{{ user.phone }}</div>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">{{ user.email }}</div>
              <div v-if="user.address" class="text-xs text-gray-500 truncate max-w-xs">
                {{ user.address }}
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span 
                :class="[
                  'px-2 inline-flex text-xs leading-5 font-semibold rounded-full', 
                  user.role === 'admin' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                ]"
              >
                {{ user.role === 'admin' ? 'Admin' : 'Khách hàng' }}
              </span>
              <span 
                v-if="user.isLocked"
                class="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800"
              >
                Đã khóa
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
              <button
                v-if="canChangeRole(user)"
                @click="confirmChangeRole(user)"
                class="text-indigo-600 hover:text-indigo-900 transition-colors duration-200"
              >
                {{ user.role === 'admin' ? 'Hủy admin' : 'Cấp admin' }}
              </button>
              <button
                v-if="canToggleLock(user)"
                @click="confirmToggleLock(user)"
                :class="[
                  user.isLocked ? 'text-green-600 hover:text-green-900' : 'text-orange-600 hover:text-orange-900',
                  'transition-colors duration-200'
                ]"
              >
                {{ user.isLocked ? 'Mở khóa' : 'Khóa' }}
              </button>
              <button 
                @click="confirmDelete(user)"
                :disabled="user.role === 'admin' && user.email === 'admin@example.com'"
                :class="[
                  'text-red-600 hover:text-red-900 disabled:text-gray-400 disabled:cursor-not-allowed',
                  'transition-colors duration-200'
                ]"
              >
                Xóa
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <!-- Modal xác nhận xóa -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50 px-4">
      <div class="bg-white rounded-lg p-4 sm:p-6 max-w-full sm:max-w-md mx-auto">
        <h3 class="text-base sm:text-lg font-medium text-gray-900 mb-4">Xác nhận xóa người dùng</h3>
        <p class="text-sm text-gray-500 mb-4">
          Bạn có chắc chắn muốn xóa người dùng <span class="font-semibold">{{ userToDelete?.username }}</span>?
          Hành động này không thể hoàn tác.
        </p>
        <div class="flex justify-end space-x-3">
          <button 
            @click="showDeleteModal = false"
            class="px-3 sm:px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors text-sm sm:text-base"
          >
            Hủy
          </button>
          <button 
            @click="deleteSelectedUser"
            :disabled="isDeleting"
            class="px-3 sm:px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:bg-red-300 text-sm sm:text-base"
          >
            <span v-if="isDeleting">Đang xóa...</span>
            <span v-else>Xóa</span>
          </button>
        </div>
      </div>
    </div>
    
    <!-- Modal thay đổi vai trò -->
    <div v-if="showRoleModal" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50 px-4">
      <div class="bg-white rounded-lg p-4 sm:p-6 max-w-full sm:max-w-md mx-auto">
        <h3 class="text-base sm:text-lg font-medium text-gray-900 mb-4">Xác nhận thay đổi vai trò</h3>
        <p class="text-sm text-gray-500 mb-4">
          Bạn có chắc chắn muốn {{ userToChangeRole?.role === 'admin' ? 'hủy quyền admin của' : 'cấp quyền admin cho' }} 
          <span class="font-semibold">{{ userToChangeRole?.username }}</span>?
        </p>
        <div class="flex justify-end space-x-3">
          <button 
            @click="showRoleModal = false"
            class="px-3 sm:px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors text-sm sm:text-base"
          >
            Hủy
          </button>
          <button 
            @click="changeUserRole"
            :disabled="isUpdating"
            class="px-3 sm:px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors disabled:bg-indigo-300 text-sm sm:text-base"
          >
            <span v-if="isUpdating">Đang cập nhật...</span>
            <span v-else>Xác nhận</span>
          </button>
        </div>
      </div>
    </div>
    
    <!-- Modal khóa/mở khóa tài khoản -->
    <div v-if="showLockModal" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50 px-4">
      <div class="bg-white rounded-lg p-4 sm:p-6 max-w-full sm:max-w-md mx-auto">
        <h3 class="text-base sm:text-lg font-medium text-gray-900 mb-4">Xác nhận {{ userToToggleLock?.isLocked ? 'mở khóa' : 'khóa' }} tài khoản</h3>
        <p class="text-sm text-gray-500 mb-4">
          Bạn có chắc chắn muốn {{ userToToggleLock?.isLocked ? 'mở khóa' : 'khóa' }} tài khoản của
          <span class="font-semibold">{{ userToToggleLock?.username }}</span>?
          <span v-if="!userToToggleLock?.isLocked" class="block mt-2 text-red-500">
            Người dùng sẽ không thể đăng nhập cho đến khi tài khoản được mở khóa.
          </span>
        </p>
        <div class="flex justify-end space-x-3">
          <button 
            @click="showLockModal = false"
            class="px-3 sm:px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors text-sm sm:text-base"
          >
            Hủy
          </button>
          <button 
            @click="toggleUserLock"
            :disabled="isUpdating"
            :class="[
              'px-3 sm:px-4 py-2 text-white rounded-md transition-colors text-sm sm:text-base',
              userToToggleLock?.isLocked
                ? 'bg-green-600 hover:bg-green-700 disabled:bg-green-300'
                : 'bg-orange-600 hover:bg-orange-700 disabled:bg-orange-300'
            ]"
          >
            <span v-if="isUpdating">Đang cập nhật...</span>
            <span v-else>{{ userToToggleLock?.isLocked ? 'Mở khóa' : 'Khóa' }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useAuthStore } from '../stores/auth'
import { useNotificationStore } from '../stores/notification'

const authStore = useAuthStore()
const notificationStore = useNotificationStore()

const users = ref([])
const loading = ref(false)
const error = ref(null)
const showDeleteModal = ref(false)
const userToDelete = ref(null)
const isDeleting = ref(false)
const showRoleModal = ref(false)
const showLockModal = ref(false)
const userToChangeRole = ref(null)
const userToToggleLock = ref(null)
const isUpdating = ref(false)

const fetchUsers = async () => {
  if (!authStore.user || authStore.user.role !== 'admin') {
    error.value = 'Bạn không có quyền truy cập trang này'
    return
  }
  
  loading.value = true
  error.value = null
  
  try {
    const response = await axios.get('http://localhost:3000/api/auth/users', {
      headers: {
        Authorization: `Bearer ${authStore.user.token}`
      }
    })
    
    users.value = response.data
  } catch (err) {
    console.error('Error fetching users:', err)
    error.value = err.response?.data?.message || 'Không thể tải danh sách người dùng. Vui lòng thử lại sau.'
  } finally {
    loading.value = false
  }
}

const confirmDelete = (user) => {
  userToDelete.value = user
  showDeleteModal.value = true
}

const deleteSelectedUser = async () => {
  if (!userToDelete.value) return
  
  isDeleting.value = true
  
  try {
    const response = await axios.delete(`http://localhost:3000/api/auth/users/${userToDelete.value._id}`, {
      headers: {
        Authorization: `Bearer ${authStore.user.token}`
      }
    })
    
    users.value = users.value.filter(u => u._id !== userToDelete.value._id)
    
    notificationStore.addNotification(
      response.data.message || 'Đã xóa người dùng thành công',
      'success'
    )
    
    showDeleteModal.value = false
    userToDelete.value = null
  } catch (err) {
    console.error('Error deleting user:', err)
    notificationStore.addNotification(
      err.response?.data?.message || 'Không thể xóa người dùng. Vui lòng thử lại.',
      'error'
    )
  } finally {
    isDeleting.value = false
  }
}

const handleImageError = (e) => {
  e.target.src = 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'
}

const canChangeRole = (user) => {
  return authStore.user?.role === 'admin' && 
         user.email !== 'admin@example.com' && 
         user._id !== authStore.user?._id
}

const canToggleLock = (user) => {
  return authStore.user?.role === 'admin' && 
         user.email !== 'admin@example.com' && 
         user._id !== authStore.user?._id
}

const confirmChangeRole = (user) => {
  userToChangeRole.value = user
  showRoleModal.value = true
}

const changeUserRole = async () => {
  if (!userToChangeRole.value) return
  
  isUpdating.value = true
  
  try {
    const newRole = userToChangeRole.value.role === 'admin' ? 'user' : 'admin'
    const response = await axios.patch(
      `http://localhost:3000/api/auth/users/${userToChangeRole.value._id}/role`,
      { role: newRole },
      {
        headers: {
          Authorization: `Bearer ${authStore.user.token}`
        }
      }
    )
    
    const updatedUser = response.data
    users.value = users.value.map(u => 
      u._id === updatedUser._id ? updatedUser : u
    )
    
    notificationStore.addNotification(
      `Đã ${newRole === 'admin' ? 'cấp' : 'hủy'} quyền admin thành công`,
      'success'
    )
    
    showRoleModal.value = false
    userToChangeRole.value = null
  } catch (err) {
    console.error('Error changing user role:', err)
    notificationStore.addNotification(
      err.response?.data?.message || 'Không thể thay đổi vai trò người dùng. Vui lòng thử lại.',
      'error'
    )
  } finally {
    isUpdating.value = false
  }
}

const confirmToggleLock = (user) => {
  userToToggleLock.value = user
  showLockModal.value = true
}

const toggleUserLock = async () => {
  if (!userToToggleLock.value) return
  
  isUpdating.value = true
  
  try {
    const response = await axios.patch(
      `http://localhost:3000/api/auth/users/${userToToggleLock.value._id}/lock`,
      { isLocked: !userToToggleLock.value.isLocked },
      {
        headers: {
          Authorization: `Bearer ${authStore.user.token}`
        }
      }
    )
    
    const updatedUser = response.data
    users.value = users.value.map(u => 
      u._id === updatedUser._id ? updatedUser : u
    )
    
    notificationStore.addNotification(
      `Đã ${updatedUser.isLocked ? 'khóa' : 'mở khóa'} tài khoản thành công`,
      'success'
    )
    
    showLockModal.value = false
    userToToggleLock.value = null
  } catch (err) {
    console.error('Error toggling user lock:', err)
    notificationStore.addNotification(
      err.response?.data?.message || 'Không thể thay đổi trạng thái khóa tài khoản. Vui lòng thử lại.',
      'error'
    )
  } finally {
    isUpdating.value = false
  }
}

onMounted(fetchUsers)
</script>

<style scoped>
/* Tùy chỉnh giao diện thẻ trên di động */
.sm:hidden .border {
  transition: all 0.2s ease-in-out;
}
.sm:hidden .border:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}
</style>