<template>
  <div>
    <!-- Orders List -->
    <div class="bg-white rounded-lg shadow-md overflow-hidden">
      <div class="p-6 border-b flex justify-between items-center">
        <h2 class="text-xl font-semibold flex items-center">
          <svg class="w-5 h-5 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          Danh sách đơn hàng ({{ orders.length }})
        </h2>
        
        <button 
          @click="fetchOrders" 
          class="text-indigo-600 hover:text-indigo-900 flex items-center"
          :disabled="isLoading"
        >
          <svg v-if="!isLoading" class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <svg v-else class="animate-spin h-5 w-5 mr-1 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {{ isLoading ? 'Đang tải...' : 'Làm mới' }}
        </button>
      </div>
      
      <div v-if="error" class="bg-red-50 p-4 text-red-700 text-center">
        {{ error }}
      </div>
      
      <!-- Filter controls -->
      <div class="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <div class="flex flex-col sm:flex-row flex-wrap items-center gap-4">
          <div class="flex items-center w-full sm:w-auto">
            <label for="status-filter" class="block text-sm font-medium text-gray-700 mr-2">Trạng thái:</label>
            <select 
              id="status-filter" 
              v-model="statusFilter" 
              class="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm w-full sm:w-auto"
            >
              <option value="all">Tất cả</option>
              <option value="pending">Chờ xác nhận</option>
              <option value="processing">Đang xử lý</option>
              <option value="delivered">Đã giao hàng</option>
              <option value="cancelled">Đã hủy</option>
            </select>
          </div>
          
          <div class="flex items-center w-full sm:w-auto">
            <label for="date-filter" class="block text-sm font-medium text-gray-700 mr-2">Thời gian:</label>
            <select 
              id="date-filter" 
              v-model="dateFilter" 
              class="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm w-full sm:w-auto"
            >
              <option value="all">Tất cả</option>
              <option value="today">Hôm nay</option>
              <option value="week">Tuần này</option>
              <option value="month">Tháng này</option>
            </select>
          </div>
          
          <div class="flex-grow"></div>
          
          <div class="relative w-full sm:w-auto">
            <input 
              type="text" 
              v-model="searchQuery" 
              placeholder="Tìm kiếm theo mã đơn hàng, SĐT..." 
              class="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm"
            />
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Danh sách thẻ trên di động -->
      <div v-if="filteredOrders.length === 0 && !isLoading" class="sm:hidden p-4 text-center text-sm text-gray-500">
        Không tìm thấy đơn hàng nào.
      </div>
      <div v-else-if="isLoading && orders.length === 0" class="sm:hidden p-4 text-center text-sm text-gray-500">
        <div class="flex justify-center">
          <svg class="animate-spin h-5 w-5 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span class="ml-2">Đang tải đơn hàng...</span>
        </div>
      </div>
      <div v-else class="sm:hidden px-4 py-4 space-y-4">
        <div v-for="order in filteredOrders" :key="order._id" class="border rounded-lg p-4 bg-white shadow-sm">
          <div class="text-sm font-medium text-gray-900 mb-2">
            Mã đơn: {{ order._id.substring(0, 8) }}...
          </div>
          <div class="text-xs text-gray-500 mb-2">
            {{ order.paymentMethod === 'COD' ? 'Thanh toán khi nhận hàng' : 'MoMo' }}
          </div>
          <div class="text-sm text-gray-900 mb-2">
            Khách hàng: {{ order.userId.username }}
          </div>
          <div class="text-xs text-gray-500 mb-2">
            SĐT: {{ order.phone }}
          </div>
          <div class="text-xs text-gray-500 mb-2">
            Ngày đặt: {{ formatDate(order.createdAt) }}
          </div>
          <div class="text-sm text-gray-500 mb-2">
            Tổng tiền: {{ formatPrice(order.total) }} VND
          </div>
          <div class="mb-3">
            <span 
              class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full"
              :class="{
                'bg-yellow-100 text-yellow-800': order.status === 'pending',
                'bg-blue-100 text-blue-800': order.status === 'processing',
                'bg-green-100 text-green-800': order.status === 'delivered',
                'bg-red-100 text-red-800': order.status === 'cancelled'
              }"
            >
              {{ translateStatus(order.status) }}
            </span>
          </div>
          <div class="flex flex-wrap gap-2">
            <button 
              @click="viewOrderDetails(order)" 
              class="text-indigo-600 hover:text-indigo-900 text-xs transition-colors duration-200"
            >
              Chi tiết
            </button>
            <button 
              @click="openStatusUpdateModal(order)" 
              class="text-green-600 hover:text-green-900 text-xs transition-colors duration-200"
            >
              Cập nhật
            </button>
          </div>
        </div>
      </div>

      <!-- Orders table trên màn hình lớn -->
      <div v-if="filteredOrders.length === 0 && !isLoading" class="hidden sm:block px-6 py-4 text-center text-sm text-gray-500">
        Không tìm thấy đơn hàng nào.
      </div>
      <div v-else-if="isLoading && orders.length === 0" class="hidden sm:block px-6 py-4 text-center text-sm text-gray-500">
        <div class="flex justify-center">
          <svg class="animate-spin h-5 w-5 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span class="ml-2">Đang tải đơn hàng...</span>
        </div>
      </div>
      <div v-else class="hidden sm:block overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mã đơn hàng</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Khách hàng</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày đặt</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tổng tiền</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="order in filteredOrders" :key="order._id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{{ order._id.substring(0, 8) }}...</div>
                <div class="text-xs text-gray-500">{{ order.paymentMethod === 'COD' ? 'Thanh toán khi nhận hàng' : 'MoMo' }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ order.userId.username }}</div>
                <div class="text-xs text-gray-500">{{ order.phone }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ formatDate(order.createdAt) }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatPrice(order.total) }} VND
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span 
                  class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full"
                  :class="{
                    'bg-yellow-100 text-yellow-800': order.status === 'pending',
                    'bg-blue-100 text-blue-800': order.status === 'processing',
                    'bg-green-100 text-green-800': order.status === 'delivered',
                    'bg-red-100 text-red-800': order.status === 'cancelled'
                  }"
                >
                  {{ translateStatus(order.status) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button @click="viewOrderDetails(order)" class="text-indigo-600 hover:text-indigo-900 mr-3">
                  Chi tiết
                </button>
                <button @click="openStatusUpdateModal(order)" class="text-green-600 hover:text-green-900">
                  Cập nhật
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Order Details Modal -->
    <div v-if="showDetailsModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg shadow-xl max-w-4xl w-full p-6 max-h-[90vh] overflow-y-auto">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-medium">Chi tiết đơn hàng</h3>
          <button @click="showDetailsModal = false" class="text-gray-400 hover:text-gray-500">
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div v-if="selectedOrder" class="space-y-6">
          <!-- Order Info -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
            <div>
              <h4 class="font-medium text-gray-700 mb-2">Thông tin đơn hàng</h4>
              <p class="text-sm text-gray-600">Mã đơn hàng: <span class="font-medium text-gray-800">{{ selectedOrder._id }}</span></p>
              <p class="text-sm text-gray-600">Ngày đặt: <span class="font-medium text-gray-800">{{ formatDate(selectedOrder.createdAt) }}</span></p>
              <p class="text-sm text-gray-600">Phương thức thanh toán: <span class="font-medium text-gray-800">{{ selectedOrder.paymentMethod === 'COD' ? 'Thanh toán khi nhận hàng' : 'MoMo' }}</span></p>
              <p class="text-sm text-gray-600">Trạng thái: 
                <span 
                  class="px-2 py-0.5 text-xs font-medium rounded-full"
                  :class="{
                    'bg-yellow-100 text-yellow-800': selectedOrder.status === 'pending',
                    'bg-blue-100 text-blue-800': selectedOrder.status === 'processing',
                    'bg-green-100 text-green-800': selectedOrder.status === 'delivered',
                    'bg-red-100 text-red-800': selectedOrder.status === 'cancelled'
                  }"
                >
                  {{ translateStatus(selectedOrder.status) }}
                </span>
              </p>
            </div>
            <div>
              <h4 class="font-medium text-gray-700 mb-2">Thông tin giao hàng</h4>
              <p class="text-sm text-gray-600">Người nhận: <span class="font-medium text-gray-800">{{ selectedOrder.userId.username }}</span></p>
              <p class="text-sm text-gray-600">Số điện thoại: <span class="font-medium text-gray-800">{{ selectedOrder.phone }}</span></p>
              <p class="text-sm text-gray-600">Địa chỉ: <span class="font-medium text-gray-800">{{ selectedOrder.address }}</span></p>
            </div>
          </div>
          
          <!-- Order Items -->
          <div>
            <h4 class="font-medium text-gray-700 mb-2">Sản phẩm đã đặt</h4>
            <div class="border rounded-lg overflow-hidden">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sản phẩm</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Số lượng</th>
                    <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ghi chú</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="(item, index) in selectedOrder.items" :key="index">
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="flex-shrink-0 h-16 w-16">
                          <img 
                            :src="item.productId.image" 
                            :alt="item.productId.name"
                            class="h-16 w-16 object-cover rounded-md"
                            @error="handleImageError"
                          >
                        </div>
                        <div class="ml-4">
                          <div class="text-sm font-medium text-gray-900">{{ item.productId.name }}</div>
                          <div class="text-sm text-gray-500">{{ formatPrice(item.productId.price) }} VND</div>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {{ item.quantity }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                      {{ item.notes || '-' }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          <!-- Order Total -->
          <div class="border-t pt-4">
            <div class="flex justify-between items-center">
              <span class="font-medium">Tổng tiền:</span>
              <span class="text-lg font-bold text-pastel-pink">{{ formatPrice(selectedOrder.total) }} VND</span>
            </div>
          </div>
          
          <!-- Update Status -->
          <div class="border-t pt-4">
            <h4 class="font-medium text-gray-700 mb-2">Cập nhật trạng thái</h4>
            <div class="flex items-center space-x-4">
              <select 
                v-model="newStatus" 
                class="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
              >
                <option value="pending">Chờ xác nhận</option>
                <option value="processing">Đang xử lý</option>
                <option value="delivered">Đã giao hàng</option>
                <option value="cancelled">Đã hủy</option>
              </select>
              <button 
                @click="saveOrderStatus" 
                class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 flex items-center"
                :disabled="isUpdating"
              >
                <svg v-if="isUpdating" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {{ isUpdating ? 'Đang cập nhật...' : 'Cập nhật' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Update Status Modal -->
    <div v-if="showStatusModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-medium">Cập nhật trạng thái đơn hàng</h3>
          <button @click="showStatusModal = false" class="text-gray-400 hover:text-gray-500">
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div v-if="selectedOrder" class="space-y-4">
          <p class="text-sm text-gray-600">
            Mã đơn hàng: <span class="font-medium">{{ selectedOrder._id.substring(0, 8) }}...</span>
          </p>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Trạng thái hiện tại</label>
            <div class="text-sm">
              <span 
                class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full"
                :class="{
                  'bg-yellow-100 text-yellow-800': selectedOrder.status === 'pending',
                  'bg-blue-100 text-blue-800': selectedOrder.status === 'processing',
                  'bg-green-100 text-green-800': selectedOrder.status === 'delivered',
                  'bg-red-100 text-red-800': selectedOrder.status === 'cancelled'
                }"
              >
                {{ translateStatus(selectedOrder.status) }}
              </span>
            </div>
          </div>
          
          <div>
            <label for="new-status" class="block text-sm font-medium text-gray-700 mb-1">Trạng thái mới</label>
            <select 
              id="new-status"
              v-model="newStatus" 
              class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="pending">Chờ xác nhận</option>
              <option value="processing">Đang xử lý</option>
              <option value="delivered">Đã giao hàng</option>
              <option value="cancelled">Đã hủy</option>
            </select>
          </div>
          
          <div class="flex justify-end space-x-3 pt-4">
            <button 
              type="button"
              @click="showStatusModal = false"
              class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Hủy
            </button>
            <button 
              @click="saveOrderStatus" 
              class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 flex items-center"
              :disabled="isUpdating"
            >
              <svg v-if="isUpdating" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ isUpdating ? 'Đang cập nhật...' : 'Cập nhật' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, inject } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useNotificationStore } from '../stores/notification'
import axios from 'axios'
import { useToast } from 'vue-toastification'

export default {
  setup() {
    const authStore = useAuthStore()
    const notificationStore = useNotificationStore()
    const toast = useToast()
    const orders = ref([])
    const isLoading = ref(false)
    const error = ref(null)
    const showDetailsModal = ref(false)
    const showStatusModal = ref(false)
    const selectedOrder = ref(null)
    const newStatus = ref('')
    const isUpdating = ref(false)
    
    const updateOrderStatus = inject('updateOrderStatus', null)
    
    // Filters
    const statusFilter = ref('all')
    const dateFilter = ref('all')
    const searchQuery = ref('')
    
    // Fetch all orders
    const fetchOrders = async () => {
      if (!authStore.isAuthenticated || authStore.user.role !== 'admin') {
        error.value = 'Bạn không có quyền truy cập trang này'
        return
      }
      
      // Reset các bộ lọc
      statusFilter.value = 'all'
      dateFilter.value = 'all'
      searchQuery.value = ''
      
      isLoading.value = true
      error.value = null
      
      try {
        const response = await axios.get('http://localhost:3000/api/orders/all', {
          headers: {
            Authorization: `Bearer ${authStore.user.token}`
          }
        })
        
        orders.value = response.data
      } catch (err) {
        console.error('Error fetching orders:', err)
        error.value = 'Không thể tải danh sách đơn hàng. Vui lòng thử lại sau.'
      } finally {
        isLoading.value = false
      }
    }
    
    // View order details
    const viewOrderDetails = (order) => {
      selectedOrder.value = order
      newStatus.value = order.status
      showDetailsModal.value = true
    }
    
    // Update order status modal
    const openStatusUpdateModal = (order) => {
      selectedOrder.value = order
      newStatus.value = order.status
      showStatusModal.value = true
    }
    
    // Save order status
    const saveOrderStatus = async () => {
      if (!selectedOrder.value || !newStatus.value) return
      
      if (selectedOrder.value.status === newStatus.value) {
        toast.warning('Trạng thái mới giống với trạng thái hiện tại')
        return
      }

      // Kiểm tra tính hợp lệ của trạng thái mới
      const validTransitions = {
        pending: ['processing', 'cancelled'],
        processing: ['delivered', 'cancelled'],
        delivered: [],
        cancelled: []
      }

      if (!validTransitions[selectedOrder.value.status].includes(newStatus.value)) {
        toast.error('Không thể chuyển từ trạng thái hiện tại sang trạng thái này')
        return
      }

      // Xác nhận trước khi cập nhật
      if (!confirm(`Bạn có chắc muốn cập nhật trạng thái đơn hàng từ "${translateStatus(selectedOrder.value.status)}" sang "${translateStatus(newStatus.value)}"?`)) {
        return
      }
      
      isUpdating.value = true
      
      try {
        const response = await axios.patch(
          `http://localhost:3000/api/orders/${selectedOrder.value._id}/status`, 
          { status: newStatus.value },
          {
            headers: {
              Authorization: `Bearer ${authStore.user.token}`
            }
          }
        )
        
        // Update the order in the list
        const index = orders.value.findIndex(o => o._id === selectedOrder.value._id)
        if (index !== -1) {
          orders.value[index].status = newStatus.value
        }
        
        // Update selected order
        selectedOrder.value.status = newStatus.value
        
        // Thông báo cho component cha cập nhật doanh thu
        if (updateOrderStatus) {
          updateOrderStatus(selectedOrder.value._id, newStatus.value)
        }
        
        // Close modals
        showStatusModal.value = false
        showDetailsModal.value = false
        
        // Show success notification
        toast.success('Cập nhật trạng thái đơn hàng thành công!')
      } catch (error) {
        console.error('Error updating order status:', error)
        toast.error('Lỗi khi cập nhật trạng thái đơn hàng: ' + (error.response?.data?.message || error.message))
      } finally {
        isUpdating.value = false
      }
    }
    
    // Filter orders
    const filteredOrders = computed(() => {
      let result = [...orders.value]
      
      // Filter by status
      if (statusFilter.value !== 'all') {
        result = result.filter(order => order.status === statusFilter.value)
      }
      
      // Filter by date
      if (dateFilter.value !== 'all') {
        const now = new Date()
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        
        if (dateFilter.value === 'today') {
          result = result.filter(order => {
            const orderDate = new Date(order.createdAt)
            return orderDate >= today
          })
        } else if (dateFilter.value === 'week') {
          const weekStart = new Date(now)
          weekStart.setDate(now.getDate() - now.getDay())
          weekStart.setHours(0, 0, 0, 0)
          
          result = result.filter(order => {
            const orderDate = new Date(order.createdAt)
            return orderDate >= weekStart
          })
        } else if (dateFilter.value === 'month') {
          const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)
          
          result = result.filter(order => {
            const orderDate = new Date(order.createdAt)
            return orderDate >= monthStart
          })
        }
      }
      
      // Filter by search query
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase()
        result = result.filter(order => 
          order._id.toLowerCase().includes(query) || 
          order.phone.toLowerCase().includes(query) ||
          order.userId.username.toLowerCase().includes(query)
        )
      }
      
      return result
    })
    
    // Format date
    const formatDate = (dateString) => {
      if (!dateString) return ''
      const date = new Date(dateString)
      return new Intl.DateTimeFormat('vi-VN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      }).format(date)
    }
    
    // Format price
    const formatPrice = (price) => {
      return new Intl.NumberFormat('vi-VN').format(price)
    }
    
    // Translate status
    const translateStatus = (status) => {
      const statusMap = {
        pending: 'Chờ xác nhận',
        processing: 'Đang xử lý',
        delivered: 'Đã giao hàng',
        cancelled: 'Đã hủy'
      }
      return statusMap[status] || status
    }
    
    // Handle image error
    const handleImageError = (e) => {
      e.target.src = 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'
    }
    
    // Load orders when component is mounted
    onMounted(() => {
      fetchOrders()
    })
    
    return {
      orders,
      isLoading,
      error,
      showDetailsModal,
      showStatusModal,
      selectedOrder,
      newStatus,
      isUpdating,
      statusFilter,
      dateFilter,
      searchQuery,
      filteredOrders,
      fetchOrders,
      viewOrderDetails,
      openStatusUpdateModal,
      saveOrderStatus,
      formatDate,
      formatPrice,
      translateStatus,
      toast,
      handleImageError
    }
  }
}
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