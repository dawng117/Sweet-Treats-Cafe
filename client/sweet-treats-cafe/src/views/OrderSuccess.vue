<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white rounded-2xl shadow-lg overflow-hidden">
        <!-- Header -->
        <div class="bg-gradient-to-r from-green-400 to-green-600 px-6 py-8 md:p-10 text-center">
          <div class="flex justify-center mb-4">
            <svg class="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h1 class="text-2xl md:text-3xl font-bold text-white">Đặt hàng thành công!</h1>
          <p class="mt-2 text-green-100">Cảm ơn bạn đã đặt hàng tại Sweet Treats Cafe</p>
        </div>
        
        <!-- Content -->
        <div class="p-6 md:p-10">
          <div class="mb-8 text-center">
            <p class="text-gray-600">Đơn hàng của bạn đã được xác nhận và đang được xử lý.</p>
            <p class="text-gray-600 mt-2">Mã đơn hàng: <span class="font-semibold text-gray-800">{{ orderId }}</span></p>
          </div>
          
          <div class="border-t border-gray-200 pt-6">
            <h2 class="text-lg font-semibold text-gray-800 mb-4">Thông tin đơn hàng</h2>
            
            <div class="space-y-4">
              <div class="flex justify-between">
                <span class="text-gray-600">Địa chỉ giao hàng:</span>
                <span class="text-gray-800">{{ orderDetails.address }}</span>
              </div>
              
              <div class="flex justify-between">
                <span class="text-gray-600">Số điện thoại:</span>
                <span class="text-gray-800">{{ orderDetails.phone }}</span>
              </div>
              
              <div class="flex justify-between">
                <span class="text-gray-600">Phương thức thanh toán:</span>
                <span class="text-gray-800">{{ orderDetails.paymentMethod === 'COD' ? 'Thanh toán khi nhận hàng' : 'MoMo' }}</span>
              </div>
              
              <div class="flex justify-between">
                <span class="text-gray-600">Tổng tiền:</span>
                <span class="font-semibold text-pastel-pink">{{ formatPrice(orderDetails.total) }} VND</span>
              </div>
            </div>
          </div>
          
          <div class="border-t border-gray-200 pt-6 mt-6">
            <h2 class="text-lg font-semibold text-gray-800 mb-4">Sản phẩm đã đặt</h2>
            
            <div class="space-y-4">
              <div v-for="(item, index) in orderDetails.items" :key="index" class="flex items-center py-3 border-b border-gray-100">
                <div class="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-md overflow-hidden">
                  <img :src="item.image" :alt="item.name" class="w-full h-full object-cover">
                </div>
                
                <div class="ml-4 flex-1">
                  <h3 class="text-sm font-medium text-gray-800">{{ item.name }}</h3>
                  <p class="text-sm text-gray-500">{{ formatPrice(item.price) }} VND x {{ item.quantity }}</p>
                  <p v-if="item.notes" class="text-xs text-gray-500 mt-1">Ghi chú: {{ item.notes }}</p>
                </div>
                
                <div class="text-right">
                  <p class="text-sm font-medium text-gray-800">{{ formatPrice(item.price * item.quantity) }} VND</p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="mt-8 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <router-link to="/products" class="inline-flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-pastel-pink hover:bg-pink-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pastel-pink">
              Tiếp tục mua sắm
            </router-link>
            
            <router-link to="/orders" class="inline-flex justify-center items-center px-6 py-3 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Xem đơn hàng của tôi
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

export default {
  setup() {
    const route = useRoute()
    const router = useRouter()
    const authStore = useAuthStore()
    
    const orderId = ref(route.params.id || 'ORD' + Math.floor(Math.random() * 10000))
    const orderDetails = ref({
      address: localStorage.getItem('orderAddress') || '',
      phone: localStorage.getItem('orderPhone') || '',
      paymentMethod: localStorage.getItem('orderPaymentMethod') || 'COD',
      total: parseInt(localStorage.getItem('orderTotal') || 0),
      items: JSON.parse(localStorage.getItem('orderItems') || '[]')
    })
    
    onMounted(() => {
      // If no order details are found, redirect to home
      if (!orderDetails.value.items.length) {
        router.push('/')
      }
      
      // Clear order data from localStorage after displaying
      setTimeout(() => {
        localStorage.removeItem('orderAddress')
        localStorage.removeItem('orderPhone')
        localStorage.removeItem('orderPaymentMethod')
        localStorage.removeItem('orderTotal')
        localStorage.removeItem('orderItems')
      }, 1000)
    })
    
    const formatPrice = (price) => {
      return price.toLocaleString('vi-VN')
    }
    
    return {
      orderId,
      orderDetails,
      formatPrice
    }
  }
}
</script>