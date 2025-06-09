<template>
  <div class="w-full p-4 max-w-screen-xl mx-auto">
    <!-- Dynamic Banner -->
    <div class="relative overflow-hidden rounded-lg shadow-lg mb-8 h-64 md:h-96">
      <div class="flex transition-transform duration-500 ease-in-out h-full" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
        <!-- Trong phần template, thay đổi cách hiển thị router-link -->
        <div v-for="(slide, index) in bannerSlides" :key="index" class="min-w-full h-full relative">
          <img :src="slide.image" :alt="slide.title" class="w-full h-full object-cover" />
          <div class="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent flex flex-col justify-center px-8 text-white">
            <h2 class="text-3xl md:text-4xl font-bold mb-2">{{ slide.title }}</h2>
            <p class="text-lg md:text-xl mb-4">{{ slide.description }}</p>
            <router-link :to="slide.link" class="bg-white text-indigo-600 px-6 py-2 rounded-full font-semibold inline-block w-max hover:bg-indigo-100 transition-colors">
              {{ slide.buttonText }}
            </router-link>
          </div>
        </div>
      </div>
      
      <!-- Navigation dots -->
      <div class="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        <button 
          v-for="(_, index) in bannerSlides" 
          :key="index"
          @click="currentSlide = index"
          class="w-3 h-3 rounded-full transition-colors"
          :class="currentSlide === index ? 'bg-white' : 'bg-white/50'"
          aria-label="Go to slide"
        ></button>
      </div>
      
      <!-- Arrow navigation -->
      <button @click="prevSlide" class="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 rounded-full p-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-white">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>
      <button @click="nextSlide" class="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 rounded-full p-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-white">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    </div>

    <h1 class="text-3xl font-bold text-pastel-pink text-center mb-6">Welcome to Sweet Treats Café</h1>
    
    <!-- Enhanced Product Carousel -->
    <div class="relative overflow-hidden mb-8">
      <h2 class="text-2xl font-semibold text-pastel-pink mb-4">Featured Products</h2>
      
      <!-- Carousel container -->
      <div class="relative">
        <div class="flex transition-transform duration-700 ease-in-out" 
             :style="{ transform: `translateX(-${currentProductSlide * 100}%)` }">
          <div v-for="(group, groupIndex) in productGroups" :key="groupIndex" class="min-w-full flex space-x-6">
            <!-- Cập nhật phần Featured Products để thêm liên kết đến trang chi tiết -->
            <div v-for="product in group" :key="product.id" 
                 class="bg-white p-4 rounded-lg shadow-md flex-1 transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <router-link :to="`/product/${product._id}`" class="block">
                <div class="relative overflow-hidden rounded-md group h-56 flex items-center justify-center bg-gray-50">
                <img :src="product.image" :alt="product.name" class="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-110" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div class="p-3 text-white">
                <p class="font-medium">{{ product.name }}</p>
                </div>
                </div>
                <div class="absolute top-2 right-2">
                <span 
                :class="[
                'px-2 py-1 rounded-full text-xs font-medium', 
                product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                ]"
                >
                {{ product.inStock ? 'Còn hàng' : 'Hết hàng' }}
                </span>
                </div>
                </div>
                <h2 class="text-xl font-semibold mt-3">{{ product.name }}</h2>
                <p class="text-gray-700">{{ product.price.toLocaleString() }} VND</p>
                <p class="text-sm text-gray-600 my-2 line-clamp-2">{{ product.description }}</p>
                </router-link>
                <!-- Change this button in your template -->
                <button
                  @click="addToCart(product)"
                  class="bg-pastel-pink text-white px-4 py-2 mt-2 rounded-md w-full hover:bg-pink-400 transition-colors flex items-center justify-center"
                  :disabled="!product.inStock"
                  :class="{'opacity-50 cursor-not-allowed': !product.inStock}"
                >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {{ product.inStock ? 'Thêm vào giỏ' : 'Hết hàng' }}
                </button>
                </div>
          </div>
        </div>
        
        <!-- Navigation arrows -->
        <button @click="prevProductSlide" 
                class="absolute left-0 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white/90 rounded-full p-2 shadow-md z-10 -ml-2 transition-transform duration-300 hover:scale-110">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-gray-700">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        <button @click="nextProductSlide" 
                class="absolute right-0 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white/90 rounded-full p-2 shadow-md z-10 -mr-2 transition-transform duration-300 hover:scale-110">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-gray-700">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>
      
      <!-- Pagination dots -->
      <div class="flex justify-center mt-4 space-x-2">
        <button 
          v-for="index in productGroups.length" 
          :key="index"
          @click="currentProductSlide = index - 1"
          class="w-2.5 h-2.5 rounded-full transition-all duration-300"
          :class="currentProductSlide === index - 1 ? 'bg-pastel-pink scale-125' : 'bg-gray-300 hover:bg-gray-400'"
          :aria-label="`Go to slide ${index}`"
        ></button>
      </div>
    </div>
    
    <!-- Categories Section -->
    <div class="mt-12 mb-8">
      <h2 class="text-2xl font-semibold text-pastel-pink mb-6">Explore Our Menu</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
        <router-link to="/products?category=Bánh" class="bg-pastel-yellow p-6 rounded-lg text-center shadow-md hover:shadow-lg transition-shadow">
          <h3 class="text-xl font-semibold">Bánh</h3>
        </router-link>
        <!-- Sử dụng encodeURIComponent để mã hóa đúng các ký tự đặc biệt trong URL -->
        <router-link :to="`/products?category=${encodeURIComponent('Cafe & Đồ uống')}`" class="bg-pastel-blue p-6 rounded-lg text-center shadow-md hover:shadow-lg transition-shadow">
          <h3 class="text-xl font-semibold">Cafe & Đồ uống</h3>
        </router-link>
        <router-link to="/products?category=Đồ ngọt" class="bg-pastel-pink p-6 rounded-lg text-center shadow-md hover:shadow-lg transition-shadow">
          <h3 class="text-xl font-semibold">Đồ ngọt</h3>
        </router-link>
      </div>
    </div>
    
    <!-- Add CustomNotification component at the top level -->
    <TheNotification />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import { useProductStore } from '../stores/product'
import { useNotificationStore } from '../stores/notification'
import CustomNotification from '../components/TheNotification.vue'

const productStore = useProductStore()
const notificationStore = useNotificationStore()

const currentSlide = ref(0)
const slideInterval = ref(null)
const productInterval = ref(null)

// Product carousel
const currentProductSlide = ref(0)

// Banner slides data
const bannerSlides = [
  {
    title: "Khuyến mãi mùa hè",
    description: "Giảm 20% cho tất cả các loại bánh từ ngày 1-15/7",
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=1526&auto=format&fit=crop",
    link: "/products?category=Bánh",
    buttonText: "Xem ngay"
  },
  {
    title: "Thức uống mới",
    description: "Thử ngay các loại đồ uống mới của chúng tôi",
    image: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?q=80&w=1470&auto=format&fit=crop",
    link: `/products?category=${encodeURIComponent('Cafe & Đồ uống')}`,
    buttonText: "Khám phá"
  },
  {
    title: "Đồ ngọt hấp dẫn",
    description: "Khám phá các loại đồ ngọt đặc biệt của chúng tôi",
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=1470&auto=format&fit=crop",
    link: "/products?category=Đồ ngọt",
    buttonText: "Khám phá ngay"
  },
  {
    title: "Đặt hàng online",
    description: "Giao hàng miễn phí cho đơn từ 200.000đ",
    image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=1374&auto=format&fit=crop",
    link: "/products?category=",
    buttonText: "Đặt ngay"
  }
]

// Fetch products from database
onMounted(async () => {
  // Fetch products from the database
  await productStore.fetchProducts()
  startSlideshow()
})

// Use products from the store instead of hardcoded data
// Sửa phần computed để chỉ lấy 6 sản phẩm đầu tiên
const allProducts = computed(() => productStore.products.slice(0, 6))

// Nhóm sản phẩm thành các nhóm 3 sản phẩm
const productGroups = computed(() => {
  const groups = [];
  const products = allProducts.value;
  for (let i = 0; i < products.length; i += 3) {
    groups.push(products.slice(i, Math.min(i + 3, products.length)));
  }
  return groups;
});

// Compute displayed products based on current slide (giữ lại để tương thích)
const displayedProducts = computed(() => {
  const startIndex = currentProductSlide.value * 3;
  return allProducts.value.slice(startIndex, startIndex + 3);
});

const startSlideshow = () => {
  slideInterval.value = setInterval(() => {
    nextSlide()
  }, 5000) // Change slide every 5 seconds
  
  // Thêm tự động chuyển sản phẩm
  productInterval.value = setInterval(() => {
    nextProductSlide()
  }, 7000) // Chuyển sản phẩm mỗi 7 giây
}

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % bannerSlides.length
}

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + bannerSlides.length) % bannerSlides.length
}

// Product carousel functions
const nextProductSlide = () => {
  currentProductSlide.value = (currentProductSlide.value + 1) % productGroups.value.length;
}

const prevProductSlide = () => {
  currentProductSlide.value = (currentProductSlide.value - 1 + productGroups.value.length) % productGroups.value.length;
}

// Reset carousel khi người dùng tương tác
watch(currentProductSlide, () => {
  if (productInterval.value) {
    clearInterval(productInterval.value);
    productInterval.value = setInterval(() => {
      nextProductSlide();
    }, 7000);
  }
});

onBeforeUnmount(() => {
  if (slideInterval.value) {
    clearInterval(slideInterval.value)
  }
  if (productInterval.value) {
    clearInterval(productInterval.value)
  }
})

// Add function to handle adding products to cart with notification
const addToCart = (product) => {
  if (!product.inStock) {
    notificationStore.addNotification(
      `${product.name} hiện đã hết hàng!`, 
      'error', 
      3000
    )
    return
  }
  
  productStore.addToCart(product)
  
  // Show success notification with product name and price
  notificationStore.addNotification(
    `Đã thêm ${product.name} (${product.price.toLocaleString()} VND) vào giỏ hàng!`, 
    'success', 
    1500
  )
}
</script>

<style scoped>
/* Smooth transitions */
.transition-transform {
  transition: transform 0.5s ease-in-out;
}

/* Optional hover effects */
.bg-white:hover {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
  transition: all 0.3s ease;
}

/* Thêm hiệu ứng cho carousel */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.group:hover .group-hover\:opacity-100 {
  animation: fadeIn 0.3s ease-in-out;
}

/* Responsive adjustments */
@media (min-width: 1024px) {
  .max-w-screen-xl {
    max-width: 1280px;
  }
}

/* Ensure full height on larger screens */
@media (min-height: 800px) {
  .md\:h-96 {
    height: 28rem;
  }
}

/* Add these styles to match ProductList.vue */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.hover\:scale-102:hover {
  transform: scale(1.02);
}

/* Hiệu ứng pulse cho nút pagination active */
@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

.scale-125 {
  animation: pulse 2s infinite;
}
</style>
