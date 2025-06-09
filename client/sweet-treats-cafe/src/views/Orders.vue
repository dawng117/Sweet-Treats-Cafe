<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white rounded-2xl shadow-lg overflow-hidden">
        <!-- Header -->
        <div class="bg-gradient-to-r from-pink-400 to-indigo-500 px-6 py-8 md:p-10">
          <h1 class="text-2xl md:text-3xl font-bold text-white">Đơn hàng của tôi</h1>
          <p class="mt-2 text-pink-100">Xem lịch sử và trạng thái đơn hàng của bạn</p>
        </div>
        
        <!-- Content -->
        <div class="p-6 md:p-10">
          <!-- Loading state -->
          <div v-if="isLoading" class="flex justify-center py-8">
            <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pastel-pink"></div>
          </div>
          
          <!-- Error state -->
          <div v-else-if="error" class="text-center py-8">
            <p class="text-red-500">{{ error }}</p>
            <button @click="fetchOrders" class="mt-4 px-4 py-2 bg-pastel-pink text-white rounded-md hover:bg-pink-500 transition-colors">
              Thử lại
            </button>
          </div>
          
          <!-- Empty state -->
          <div v-else-if="orders.length === 0" class="text-center py-8">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <p class="text-gray-500">Bạn chưa có đơn hàng nào.</p>
            <router-link to="/products" class="mt-4 inline-block px-4 py-2 bg-pastel-pink text-white rounded-md hover:bg-pink-500 transition-colors">
              Mua sắm ngay
            </router-link>
          </div>
          
          <!-- Orders list -->
          <div v-else class="space-y-6">
            <div v-for="order in orders" :key="order._id" class="border border-gray-200 rounded-lg overflow-hidden">
              <!-- Order header -->
              <div class="bg-gray-50 px-4 py-3 border-b border-gray-200 flex flex-wrap justify-between items-center">
                <div>
                  <p class="text-sm text-gray-500">Mã đơn hàng: <span class="font-medium text-gray-700">{{ order._id }}</span></p>
                  <p class="text-sm text-gray-500">Ngày đặt: <span class="font-medium text-gray-700">{{ formatDate(order.createdAt) }}</span></p>
                </div>
                <div class="mt-2 sm:mt-0">
                  <span 
                    class="px-3 py-1 text-xs font-medium rounded-full"
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
              </div>
              
              <!-- Order items -->
              <div class="p-4">
                <div class="space-y-3">
                  <div v-for="item in order.items" :key="item._id" class="flex items-start">
                    <div class="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-md overflow-hidden">
                      <img :src="item.productDetails?.image || 'https://via.placeholder.com/100'" :alt="item.productDetails?.name || 'Sản phẩm'" class="w-full h-full object-cover">
                    </div>
                    <div class="ml-4 flex-1">
                      <p class="text-sm font-medium text-gray-900">{{ item.productDetails?.name || 'Sản phẩm' }}</p>
                      <p class="text-sm text-gray-500">{{ formatPrice(item.productDetails?.price || 0) }} VND x {{ item.quantity }}</p>
                      <p v-if="item.notes" class="text-xs text-gray-500 mt-1">Ghi chú: {{ item.notes }}</p>
                    </div>
                  </div>
                </div>
                
                <!-- Order details -->
                <div class="mt-4 pt-4 border-t border-gray-200">
                  <div class="flex justify-between text-sm">
                    <span class="text-gray-500">Địa chỉ giao hàng:</span>
                    <span class="text-gray-700">{{ order.address }}</span>
                  </div>
                  <div class="flex justify-between text-sm mt-2">
                    <span class="text-gray-500">Số điện thoại:</span>
                    <span class="text-gray-700">{{ order.phone }}</span>
                  </div>
                  <div class="flex justify-between text-sm mt-2">
                    <span class="text-gray-500">Phương thức thanh toán:</span>
                    <span class="text-gray-700">{{ order.paymentMethod === 'COD' ? 'Thanh toán khi nhận hàng' : 'MoMo' }}</span>
                  </div>
                  <div class="flex justify-between font-medium mt-2">
                    <span>Tổng tiền:</span>
                    <span class="text-pastel-pink">{{ formatPrice(order.total) }} VND</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import axios from 'axios'

const authStore = useAuthStore()
const orders = ref([])
const isLoading = ref(false)
const error = ref(null)

onMounted(() => {
  if (authStore.isAuthenticated) {
    fetchOrders()
  }
})

// Function to fetch orders from API
const fetchOrders = async () => {
  if (!authStore.isAuthenticated) return
  
  isLoading.value = true
  error.value = null
  
  try {
    const response = await axios.get('http://localhost:3000/api/orders', {
      headers: { Authorization: `Bearer ${authStore.user.token}` }
    })
    
    // Get product details for each order item
    const ordersWithProductDetails = await Promise.all(
      response.data.map(async (order) => {
        const itemsWithDetails = await Promise.all(
          order.items.map(async (item) => {
            try {
              const productResponse = await axios.get(
                `http://localhost:3000/api/products/${item.productId}`,
                { headers: { Authorization: `Bearer ${authStore.user.token}` } } // Thêm header Authorization
              )
              return {
                ...item,
                productDetails: productResponse.data
              }
            } catch (err) {
              console.error(`Error fetching product ${item.productId}:`, err)
              return {
                ...item,
                productDetails: {
                  name: 'Sản phẩm không tồn tại',
                  price: item.price || 0,
                  image: 'https://png.pngtree.com/png-vector/20220625/ourmid/pngtree-smile-joy-emotion-fuck-you-hand-gesture-png-image_5400183.png'
                }
              }
            }
          })
        )
        
        return {
          ...order,
          items: itemsWithDetails
        }
      })
    )
    
    orders.value = ordersWithProductDetails
  } catch (err) {
    console.error('Error fetching orders:', err)
    error.value = 'Không thể tải danh sách đơn hàng. Vui lòng thử lại sau.'
  } finally {
    isLoading.value = false
  }
}

// Helper functions
const formatPrice = (price) => {
  return price.toLocaleString('vi-VN')
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

const translateStatus = (status) => {
  const statusMap = {
    'pending': 'Chờ xác nhận',
    'processing': 'Đang xử lý',
    'delivered': 'Đã giao hàng',
    'cancelled': 'Đã hủy'
  }
  return statusMap[status] || status
}

// Thêm hàm để tự động cập nhật trạng thái mỗi 30 giây
let intervalId = null

onMounted(() => {
  if (authStore.isAuthenticated) {
    fetchOrders()
    // Bắt đầu tự động cập nhật
    intervalId = setInterval(fetchOrders, 30000)
  }
})

// Dọn dẹp interval khi component bị hủy
onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
})
</script>