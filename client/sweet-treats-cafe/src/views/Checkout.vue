<template>
  <div class="w-full">
    <div class="container mx-auto px-4 py-6">
      <h1 class="text-3xl font-bold text-pastel-pink mb-6">Thanh toán</h1>
      
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Thông tin đặt hàng -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-lg shadow-md overflow-hidden">
            <div class="p-4 bg-gray-50 border-b border-gray-200">
              <h2 class="text-lg font-semibold text-gray-700">Thông tin giao hàng</h2>
            </div>
            
            <form @submit.prevent="placeOrder" class="p-6 space-y-4">
              <div>
                <label for="address" class="block text-sm font-medium text-gray-700 mb-1">Địa chỉ giao hàng</label>
                <input
                  id="address"
                  v-model="address"
                  placeholder="Nhập địa chỉ giao hàng của bạn"
                  class="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-pastel-pink focus:border-pastel-pink transition-colors"
                  required
                />
              </div>
              
              <div>
                <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
                <input
                  id="phone"
                  v-model="phone"
                  placeholder="Nhập số điện thoại của bạn"
                  class="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-pastel-pink focus:border-pastel-pink transition-colors"
                  required
                />
              </div>
              
              <div>
                <label for="payment-method" class="block text-sm font-medium text-gray-700 mb-1">Phương thức thanh toán</label>
                <div class="grid grid-cols-2 gap-4 mt-2">
                  <div 
                    class="border rounded-md p-4 flex items-center cursor-pointer transition-all"
                    :class="paymentMethod === 'COD' ? 'border-pastel-pink bg-pink-50' : 'border-gray-200 hover:border-pastel-pink'"
                    @click="paymentMethod = 'COD'"
                  >
                    <input 
                      type="radio" 
                      id="cod" 
                      name="payment-method" 
                      value="COD" 
                      v-model="paymentMethod"
                      class="h-4 w-4 text-pastel-pink focus:ring-pastel-pink"
                    />
                    <label for="cod" class="ml-3 cursor-pointer flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span>Thanh toán khi nhận hàng</span>
                    </label>
                  </div>
                  
                  <div 
                    class="border rounded-md p-4 flex items-center cursor-pointer transition-all"
                    :class="paymentMethod === 'MoMo' ? 'border-pastel-pink bg-pink-50' : 'border-gray-200 hover:border-pastel-pink'"
                    @click="paymentMethod = 'MoMo'"
                  >
                    <input 
                      type="radio" 
                      id="momo" 
                      name="payment-method" 
                      value="MoMo" 
                      v-model="paymentMethod"
                      class="h-4 w-4 text-pastel-pink focus:ring-pastel-pink"
                    />
                    <label for="momo" class="ml-3 cursor-pointer flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Thanh toán MoMo</span>
                    </label>
                  </div>
                </div>
              </div>
              
              <div class="pt-4 mt-4 border-t border-gray-200 lg:hidden">
                <h3 class="text-lg font-semibold text-gray-700 mb-3">Tóm tắt đơn hàng</h3>
                <div class="space-y-2">
                  <div v-for="item in productStore.cart" :key="item.productId" class="flex justify-between py-2">
                    <span class="text-gray-600">{{ item.name }} (x{{ item.quantity }})</span>
                    <span class="font-medium">{{ formatPrice(item.quantity * item.price) }} VND</span>
                  </div>
                  <div class="flex justify-between pt-2 border-t border-gray-200 font-semibold">
                    <span>Tổng cộng:</span>
                    <span class="text-pastel-pink">{{ formatPrice(totalAmount) }} VND</span>
                  </div>
                </div>
              </div>
              
              <div class="pt-4">
                <button 
                  type="submit" 
                  class="w-full bg-pastel-pink text-white py-3 px-4 rounded-md font-medium hover:bg-pink-500 transition-colors transform hover:scale-105 duration-200 flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Hoàn tất đặt hàng
                </button>
                
                <router-link to="/cart" class="mt-4 text-pastel-pink block text-center hover:text-pink-500 transition-colors">
                  ← Quay lại giỏ hàng
                </router-link>
              </div>
            </form>
          </div>
        </div>
        
        <!-- Tóm tắt đơn hàng -->
        <div class="lg:col-span-1 hidden lg:block">
          <div class="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <h2 class="text-lg font-semibold text-gray-700 mb-4">Tóm tắt đơn hàng</h2>
            
            <div class="divide-y divide-gray-200">
              <div v-for="item in productStore.cart" :key="item.productId" class="py-3 flex items-center space-x-4">
                <div class="h-16 w-16 flex-shrink-0 rounded-md overflow-hidden bg-gray-100">
                  <img :src="item.image" :alt="item.name" class="h-full w-full object-contain" />
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-gray-900 truncate">{{ item.name }}</p>
                  <p class="text-sm text-gray-500">{{ formatPrice(item.price) }} VND x {{ item.quantity }}</p>
                </div>
                <div class="text-sm font-medium text-gray-900">
                  {{ formatPrice(item.quantity * item.price) }} VND
                </div>
              </div>
            </div>
            
            <div class="space-y-3 mt-6">
              <div class="flex justify-between text-gray-600">
                <span>Tạm tính</span>
                <span>{{ formatPrice(totalAmount) }} VND</span>
              </div>
              
              <div class="flex justify-between text-gray-600">
                <span>Phí vận chuyển</span>
                <span>Miễn phí</span>
              </div>
              
              <div class="border-t border-gray-200 pt-3 mt-3">
                <div class="flex justify-between font-semibold text-lg">
                  <span>Tổng cộng</span>
                  <span class="text-pastel-pink">{{ formatPrice(totalAmount) }} VND</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useProductStore } from '../stores/product'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import axios from 'axios'
import { computed, ref } from 'vue'

export default {
  setup() {
    const productStore = useProductStore()
    const router = useRouter()
    const authStore = useAuthStore()
    
    const address = ref('')
    const phone = ref('')
    const paymentMethod = ref('COD')
    
    const totalAmount = computed(() => {
      return productStore.cart.reduce((sum, item) => sum + item.quantity * item.price, 0)
    })
    
    const formatPrice = (price) => {
      return price.toLocaleString('vi-VN')
    }
    
    const placeOrder = async () => {
      try {
        // Store order details in localStorage for the success page
        localStorage.setItem('orderAddress', address.value);
        localStorage.setItem('orderPhone', phone.value);
        localStorage.setItem('orderPaymentMethod', paymentMethod.value);
        localStorage.setItem('orderTotal', totalAmount.value.toString());
        localStorage.setItem('orderItems', JSON.stringify(productStore.cart));
        
        const order = {
          userId: authStore.user?._id || 'guest',
          items: productStore.cart.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            notes: item.notes || ''
          })),
          total: totalAmount.value,
          address: address.value,
          phone: phone.value,
          paymentMethod: paymentMethod.value,
        };
        
        // Send order to API
        const response = await axios.post('http://localhost:3000/api/orders', order);
        
        if (paymentMethod.value === 'MoMo') {
          // Lưu orderId vào localStorage trước khi chuyển hướng
          localStorage.setItem('pendingMomoOrderId', response.data.orderId);
          // Chuyển hướng đến trang thanh toán MoMo
          window.location.href = response.data.payUrl;
        } else {
          // Nếu thanh toán COD, xử lý như bình thường
          localStorage.setItem('lastOrderId', response.data._id);
          productStore.clearCart(); // Xóa giỏ hàng cho COD
          router.push(`/order-success/${response.data._id}`);
        }
      } catch (error) {
        alert('Lỗi khi đặt hàng: ' + (error.response?.data?.message || error.message));
      }
    }
    
    return {
      productStore,
      address,
      phone,
      paymentMethod,
      totalAmount,
      formatPrice,
      placeOrder,
      authStore // Add this to return
    }
  }
}
</script>

<style scoped>
.sticky {
  position: sticky;
  top: 2rem;
}

@media (max-width: 1024px) {
  .sticky {
    position: static;
  }
}

input:focus, select:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(255, 182, 193, 0.2);
}

button:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

button:active {
  transform: translateY(0);
}
</style>
