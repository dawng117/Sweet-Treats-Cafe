<template>
  <div class="w-full">
    <div class="container mx-auto px-4 py-6">
      <h1 class="text-3xl font-bold text-pastel-pink mb-6">Giỏ hàng của bạn</h1>
      
      <!-- Giỏ hàng trống -->
      <div v-if="productStore.cart.length === 0" class="bg-white p-8 rounded-lg shadow-md text-center">
        <div class="flex flex-col items-center justify-center py-8">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <p class="text-xl text-gray-600 mb-4">Giỏ hàng của bạn đang trống</p>
          <router-link to="/products" class="bg-pastel-pink text-white px-6 py-3 rounded-md hover:bg-pink-500 transition-colors flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
            Tiếp tục mua sắm
          </router-link>
        </div>
      </div>
      
      <!-- Giỏ hàng có sản phẩm -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Danh sách sản phẩm -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-lg shadow-md overflow-hidden">
            <div class="p-4 bg-gray-50 border-b border-gray-200">
              <div class="flex justify-between items-center">
                <h2 class="text-lg font-semibold text-gray-700">Sản phẩm trong giỏ hàng</h2>
                <button 
                  @click="clearCart" 
                  class="text-sm text-red-500 hover:text-red-700 flex items-center transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Xóa tất cả
                </button>
              </div>
            </div>
            
             <div class="divide-y divide-gray-200">
              <CartItem
                v-for="item in productStore.cart"
                :key="item.productId"
                :item="item"
                @update-quantity="updateQuantity"
                @update-notes="productStore.updateCartItemNotes"
                @remove-from-cart="productStore.removeFromCart"
                class="p-4 hover:bg-gray-50 transition-colors"
              />
            </div>
          </div>
        </div>
        
        <!-- Tổng giá tiền và thanh toán -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <h2 class="text-lg font-semibold text-gray-700 mb-4">Tổng đơn hàng</h2>
            
            <div class="space-y-3 mb-6">
              <div class="flex justify-between text-gray-600">
                <span>Tạm tính</span>
                <span>{{ formatPrice(productStore.cart.reduce((sum, item) => sum + item.quantity * item.price, 0)) }} VND</span>
              </div>
              
              <div class="flex justify-between text-gray-600">
                <span>Phí vận chuyển</span>
                <span>Miễn phí</span>
              </div>
              
              <div class="border-t border-gray-200 pt-3 mt-3">
                <div class="flex justify-between font-semibold text-lg">
                  <span>Tổng cộng</span>
                  <span class="text-pastel-pink">{{ formatPrice(productStore.cart.reduce((sum, item) => sum + item.quantity * item.price, 0)) }} VND</span>
                </div>
              </div>
            </div>
            
            <!-- Replace router-link with button that calls checkAuthAndProceed -->
            <button 
              @click="checkAuthAndProceed" 
              class="bg-pastel-pink text-white px-4 py-3 rounded-md w-full block text-center font-medium hover:bg-pink-500 transition-colors transform hover:scale-105 duration-200"
            >
              Tiến hành thanh toán
            </button>
            
            <router-link to="/products" class="mt-4 text-pastel-pink block text-center hover:text-pink-500 transition-colors">
              ← Tiếp tục mua sắm
            </router-link>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Thêm component TheNotification -->
    <TheNotification />
  </div>
</template>

<script>
import { useProductStore } from '../stores/product'
import { useAuthStore } from '../stores/auth' // Add this import
import { useRouter } from 'vue-router' // Add this import
import CartItem from '../components/CardItem.vue'
import { useNotificationStore } from '../stores/notification'
import TheNotification from '../components/TheNotification.vue'

export default {
  components: { CartItem, TheNotification },
  setup() {
    const productStore = useProductStore()
    const notificationStore = useNotificationStore()
    const authStore = useAuthStore() // Add this
    const router = useRouter() // Add this
    
    return { 
      productStore, 
      notificationStore,
      authStore, // Add this
      router // Add this
    }
  },
  methods: {
    // Add this method to check authentication before proceeding to checkout
    checkAuthAndProceed() {
      if (this.authStore.isAuthenticated) {
        // User is logged in, proceed to checkout
        this.router.push('/checkout')
      } else {
        // User is not logged in, show notification and redirect to login
        this.notificationStore.addNotification(
          'Bạn cần đăng nhập để tiến hành thanh toán',
          'error',
          3000
        )
        // Redirect to login page
        this.router.push('/login')
      }
    },
    updateQuantity(productId, quantity) {
      if (quantity <= 0) {
        this.productStore.removeFromCart(productId)
      } else {
        const item = this.productStore.cart.find((i) => i.productId === productId)
        if (item) item.quantity = quantity
      }
    },
    formatPrice(price) {
      return price.toLocaleString('vi-VN')
    },
    // Thêm phương thức xóa tất cả
    clearCart() {
      if (confirm('Bạn có chắc chắn muốn xóa tất cả sản phẩm trong giỏ hàng?')) {
        this.productStore.clearCart()
        this.notificationStore.addNotification(
          'Đã xóa tất cả sản phẩm trong giỏ hàng',
          'info',
          1800
        )
      }
    }
  },
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
</style>