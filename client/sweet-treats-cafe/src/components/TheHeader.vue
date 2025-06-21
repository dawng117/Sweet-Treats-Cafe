<script setup>
import { RouterLink, useRouter } from 'vue-router'
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
import { useProductStore } from '../stores/product'
import { useAuthStore } from '../stores/auth'

const productStore = useProductStore()
const authStore = useAuthStore()
const router = useRouter()
const props = defineProps({
  isMenuOpen: Boolean,
  isAuthenticated: Boolean,
  isAdmin: Boolean,
  username: String,
  user: Object
})

const emit = defineEmits(['toggle-menu', 'logout'])
const cartCount = computed(() => productStore.getCartCount)
const isScrolled = ref(false)
const userMenuOpen = ref(false)

const toggleMenu = () => {
  emit('toggle-menu')
}

const logout = () => {
  emit('logout')
  userMenuOpen.value = false
}

const toggleUserMenu = () => {
  userMenuOpen.value = !userMenuOpen.value
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})

const isValidImageUrl = (url) => {
  if (!url) return false
  return true
}

const getUserInitials = () => {
  if (props.username) {
    return props.username.charAt(0).toUpperCase()
  }
  return 'U'
}

const handleImageError = (event) => {
  console.log('Image failed to load:', event.target.src)
  event.target.style.display = 'none'
  if (event.target.nextElementSibling) {
    event.target.nextElementSibling.style.display = 'flex'
  }
}
</script>

<template>
  <header :class="[
    'fixed top-0 w-full z-50 transition-all duration-300',
    isScrolled ? 'bg-[#FFC1CC] shadow-md py-2' : 'bg-[#FFC1CC]/90 backdrop-blur-sm py-4 md:py-2'
  ]">
    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center">
        <RouterLink to="/" class="flex items-center group">
          <img src="@/assets/logo.png" alt="Sweet Treats Cafe"
               class="h-14 w-14 mr-3 transition-transform duration-300 group-hover:rotate-12 drop-shadow-md" />
          <span class="text-xl sm:text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-pink-500 to-indigo-600 bg-clip-text text-transparent drop-shadow-sm">
            Sweet Treats Cafe
          </span>
        </RouterLink>

        <nav class="hidden md:flex items-center space-x-6">
          <RouterLink to="/" class="nav-link relative">Trang chủ<span class="nav-link-underline"></span></RouterLink>
          <RouterLink to="/products" class="nav-link relative">Sản phẩm<span class="nav-link-underline"></span></RouterLink>
          <RouterLink to="/about" class="nav-link relative">Giới thiệu<span class="nav-link-underline"></span></RouterLink>
          <RouterLink to="/contact" class="nav-link relative">Liên hệ<span class="nav-link-underline"></span></RouterLink>
          <RouterLink to="/blog" class="nav-link relative">Blog<span class="nav-link-underline"></span></RouterLink>
          <RouterLink to="/cart" class="nav-link relative">
            <div class="flex items-center">
              <span>Giỏ hàng</span>
              <transition name="bounce">
                <span v-if="cartCount > 0"
                  class="ml-1 bg-gradient-to-r from-pink-500 to-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {{ cartCount }}
                </span>
              </transition>
            </div>
            <span class="nav-link-underline"></span>
          </RouterLink>

          <template v-if="isAuthenticated">
            <div class="relative">
              <button @click="toggleUserMenu" class="flex items-center space-x-1 nav-link">
                <img v-if="user && (user.avatarUrl || user.image) && isValidImageUrl(user.avatarUrl || user.image)"
                     :src="user.avatarUrl || user.image"
                     alt="Avatar"
                     @error="handleImageError"
                     class="w-8 h-8 rounded-full object-cover border-2 border-white mr-2" />
                <div v-else class="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-indigo-600 flex items-center justify-center text-white font-bold mr-2">
                  {{ getUserInitials() }}
                </div>
                <span class="font-medium">{{ username || 'User' }}</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 transition-transform duration-300"
                     :class="userMenuOpen ? 'rotate-180' : ''" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <transition name="fade-scale">
                <div v-if="!userMenuOpen"
                     class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-100">
                  <RouterLink v-if="isAdmin" to="/admin"
                              class="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 transition-colors">Quản trị</RouterLink>
                  <RouterLink to="/profile"
                              class="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 transition-colors">Hồ sơ</RouterLink>
                  <RouterLink to="/orders"
                              class="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 transition-colors">Đơn hàng</RouterLink>
                  <button @click="logout"
                          class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 transition-colors">Đăng xuất</button>
                </div>
              </transition>
            </div>
          </template>
          <template v-else>
            <RouterLink to="/login" class="nav-link relative">Đăng nhập<span class="nav-link-underline"></span></RouterLink>
            <RouterLink to="/register"
                        class="bg-gradient-to-r from-pink-500 to-indigo-600 text-white px-5 py-2 rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              Đăng ký
            </RouterLink>
          </template>
        </nav>

        <button @click="toggleMenu" class="md:hidden text-gray-700 focus:outline-none">
          <div class="relative w-6 h-6">
            <span :class="['absolute h-0.5 w-6 bg-gray-700 transform transition-all duration-300', isMenuOpen ? 'rotate-45 top-3' : 'top-1']"></span>
            <span :class="['absolute h-0.5 w-6 bg-gray-700 top-3 transition-all duration-300', isMenuOpen ? 'opacity-0' : 'opacity-100']"></span>
            <span :class="['absolute h-0.5 w-6 bg-gray-700 transform transition-all duration-300', isMenuOpen ? '-rotate-45 top-3' : 'top-5']"></span>
          </div>
        </button>
      </div>

      <transition name="slide-down">
        <div v-if="isMenuOpen" class="md:hidden mt-4 pb-6 space-y-3 px-4">
          <RouterLink to="/" class="block py-2 text-gray-700 hover:text-indigo-600 font-medium">Trang chủ</RouterLink>
          <RouterLink to="/products" class="block py-2 text-gray-700 hover:text-indigo-600 font-medium">Sản phẩm</RouterLink>
          <RouterLink to="/about" class="block py-2 text-gray-700 hover:text-indigo-600 font-medium">Giới thiệu</RouterLink>
          <RouterLink to="/contact" class="block py-2 text-gray-700 hover:text-indigo-600 font-medium">Liên hệ</RouterLink>
          <RouterLink to="/blog" class="block py-2 text-gray-700 hover:text-indigo-600 font-medium">Blog</RouterLink>
          <RouterLink to="/cart" class="block py-2 text-gray-700 hover:text-indigo-600 font-medium">Giỏ hàng</RouterLink>

          <template v-if="isAuthenticated">
            <div class="flex items-center py-2">
              <img v-if="user && user.image && isValidImageUrl(user.image)"
                   :src="user.image"
                   alt="Avatar"
                   @error="handleImageError"
                   class="w-8 h-8 rounded-full object-cover border-2 border-white mr-2" />
              <div v-else class="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-indigo-600 flex items-center justify-center text-white font-bold mr-2">
                {{ getUserInitials() }}
              </div>
              <span>{{ username || 'User' }}</span>
            </div>
            <RouterLink to="/profile" class="block py-2 text-gray-700 hover:text-indigo-600">Hồ sơ</RouterLink>
            <RouterLink to="/orders" class="block py-2 text-gray-700 hover:text-indigo-600">Đơn hàng</RouterLink>
            <RouterLink v-if="isAdmin" to="/admin" class="block py-2 text-gray-700 hover:text-indigo-600">Quản trị</RouterLink>
            <button @click="logout" class="block w-full text-left py-2 text-gray-700 hover:text-indigo-600">Đăng xuất</button>
          </template>
          <template v-else>
            <RouterLink to="/login" class="block py-2 text-gray-700 hover:text-indigo-600 font-medium">Đăng nhập</RouterLink>
            <RouterLink to="/register" class="block py-2 text-white bg-gradient-to-r from-pink-500 to-indigo-600 text-center rounded-full font-medium">
              Đăng ký
            </RouterLink>
          </template>
        </div>
      </transition>
    </div>
  </header>
  <div :class="isScrolled ? 'h-16 md:h-20' : 'h-20 md:h-24'" class="transition-all duration-300"></div>
</template>

<style scoped>
.nav-link {
  @apply text-gray-700 hover:text-indigo-600 transition-colors py-1;
}

.nav-link-underline {
  @apply absolute left-0 bottom-0 h-0.5 w-0 bg-gradient-to-r from-pink-500 to-indigo-600 transition-all duration-300;
}

.nav-link:hover .nav-link-underline,
.router-link-active .nav-link-underline {
  @apply w-full;
}

.router-link-active {
  @apply text-indigo-600 font-medium;
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% { transform: scale(0); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}

.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.3s ease;
}
.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
  max-height: 400px;
}
.slide-down-enter-from,
.slide-down-leave-to {
  max-height: 0;
  opacity: 0;
  overflow: hidden;
}
</style>
