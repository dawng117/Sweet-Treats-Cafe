<script setup>
import { RouterView } from 'vue-router'
import { ref, onMounted, computed } from 'vue'
import { useProductStore } from './stores/product'
import { useAuthStore } from './stores/auth'
import { useRouter } from 'vue-router'
import TheHeader from './components/TheHeader.vue'
import TheFooter from './components/TheFooter.vue'
import TheNotification from './components/TheNotification.vue' // Import component

const productStore = useProductStore()
const authStore = useAuthStore()
const router = useRouter()
const isMenuOpen = ref(false)

onMounted(() => {
  // Initialize cart from localStorage
  productStore.loadCart()
  // Initialize auth state
  authStore.initAuth()
})

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const isAuthenticated = computed(() => authStore.isAuthenticated)
const isAdmin = computed(() => authStore.isAdmin)

const logout = () => {
  authStore.logout()
  // Redirect to home page
  router.push('/')
}

// Trong setup() hoặc created()
const handleMomoCallback = async () => {
  // Kiểm tra nếu có orderId trong URL (từ MoMo redirect)
  const urlParams = new URLSearchParams(window.location.search);
  const orderId = urlParams.get('orderId');
  const resultCode = urlParams.get('resultCode');
  const extraData = urlParams.get('extraData');
  
  const pendingOrderId = localStorage.getItem('pendingMomoOrderId');
  if (orderId && pendingOrderId) {
    if (resultCode === '0') {
      // Thanh toán thành công
      productStore.clearCart(); // Xóa giỏ hàng
      localStorage.removeItem('pendingMomoOrderId');
      router.push(`/order-success/${pendingOrderId}`);
    } else {
      // Thanh toán thất bại hoặc bị hủy
      localStorage.removeItem('pendingMomoOrderId');
      router.push('/cart');
    }
  }
}

// Gọi hàm này khi component được tạo
onMounted(() => {
  handleMomoCallback();
});
</script>

<template>
  <div class="min-h-screen flex flex-col w-full">
    <!-- Header Component -->
    <TheHeader 
  :isMenuOpen="isMenuOpen" 
  :isAuthenticated="authStore.isAuthenticated" 
  :isAdmin="authStore.isAdmin"
  :username="authStore.user?.username"
  :user="authStore.user"
  @toggle-menu="toggleMenu" 
  @logout="logout" 
/>

    <!-- Main Content -->
    <main class="flex-grow w-full">
      <RouterView />
    </main>

    <!-- Footer Component -->
    <TheFooter />
    <TheNotification /> <!-- Thêm component thông báo -->
  </div>
</template>

<style>
/* Đảm bảo body và html sử dụng toàn bộ chiều rộng */
html, body {
  @apply bg-gray-50;
  margin: 0;
  padding: 0;
  width: 100%;
  overflow-x: hidden;
}

/* Xóa bỏ các ghi đè container không cần thiết */
/* .container {
  width: 100% !important;
  max-width: 100% !important;
  margin-left: 0 !important;
  margin-right: 0 !important;
  padding-left: 1rem !important;
  padding-right: 1rem !important;
} */

.router-link-active {
  @apply text-indigo-600 font-medium;
}
</style>
