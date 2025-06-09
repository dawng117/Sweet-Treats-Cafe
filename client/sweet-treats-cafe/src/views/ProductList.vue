<template>
  <div class="w-full">
    <div class="container mx-auto px-4 py-6">
      <h1 class="text-2xl font-bold text-pastel-pink">Our Products</h1>
      <!-- Tìm kiếm và lọc -->
      <div class="flex flex-col md:flex-row md:justify-between gap-4 mt-4">
        <input
          v-model="productStore.searchQuery"
          placeholder="Search products..."
          class="p-2 border rounded w-full md:w-1/3 focus:ring-2 focus:ring-pastel-pink focus:outline-none transition-all"
        />
        <div class="flex flex-col md:flex-row gap-2">
          <!-- Lọc theo danh mục -->
          <select
            v-model="productStore.selectedCategory"
            @change="productStore.filterProducts($event.target.value)"
            class="p-2 border rounded w-full md:w-auto focus:ring-2 focus:ring-pastel-pink focus:outline-none transition-all"
          >
            <option value="">All Categories</option>
            <option value="Bánh">Bánh</option>
            <option value="Cafe & Đồ uống">Cafe & Đồ uống</option>
            <option value="Đồ ngọt">Đồ ngọt</option>
          </select>
          
          <!-- Thêm dropdown sắp xếp theo giá -->
          <select
            v-model="productStore.sortOrder"
            @change="productStore.sortByPrice($event.target.value)"
            class="p-2 border rounded w-full md:w-auto focus:ring-2 focus:ring-pastel-pink focus:outline-none transition-all"
          >
            <option value="">Sắp xếp theo giá</option>
            <option value="price-asc">Giá: Thấp đến cao</option>
            <option value="price-desc">Giá: Cao đến thấp</option>
          </select>
        </div>
      </div>
      
      <!-- Hiển thị số lượng sản phẩm tìm thấy -->
      <!-- Thêm sau phần hiển thị số lượng sản phẩm tìm thấy -->
      <div class="mt-4 flex justify-between items-center">
        <div class="text-gray-600">
          Tìm thấy {{ productStore.filteredProducts.length }} sản phẩm
        </div>
        
        <button 
          v-if="productStore.searchQuery || productStore.selectedCategory || productStore.sortOrder"
          @click="resetFilters" 
          class="text-sm text-pastel-pink hover:text-pink-700 flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
          Xóa bộ lọc
        </button>
      </div>
      
      <!-- Hiển thị thông báo khi không tìm thấy sản phẩm -->
      <div v-if="productStore.filteredProducts.length === 0" class="mt-8 text-center py-8">
        <div class="text-gray-500 text-lg">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto mb-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p>Không tìm thấy sản phẩm nào phù hợp</p>
          <button 
            @click="resetFilters" 
            class="mt-4 text-pastel-pink hover:text-pink-700 font-medium"
          >
            Xóa bộ lọc
          </button>
        </div>
      </div>
      
      <!-- Carousel View for Products -->
      <div v-else-if="viewMode === 'carousel'" class="mt-8">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-2xl font-semibold text-pastel-pink">Featured Products</h2>
          <button @click="toggleViewMode" 
                  class="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:shadow-md flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            Switch to Grid View
          </button>
        </div>
        
        <div class="relative overflow-hidden rounded-lg shadow-md">
          <div class="flex transition-transform duration-700 ease-in-out" 
               :style="{ transform: `translateX(-${currentCarouselSlide * 100}%)` }">
            <div v-for="(group, index) in productGroups" :key="index" class="min-w-full flex space-x-6 p-2">
              <div v-for="product in group" :key="product._id" 
                   class="bg-white p-4 rounded-lg shadow-md flex-1 transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <router-link :to="`/product/${product._id}`" class="block">
                  <div class="relative overflow-hidden rounded-md group h-56 md:h-72 flex items-center justify-center bg-gray-50">
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
                  <h3 class="text-xl font-semibold mt-3">{{ product.name }}</h3>
                  <p class="text-gray-700">{{ product.price.toLocaleString() }} VND</p>
                  <p class="text-sm text-gray-600 my-2 line-clamp-2">{{ product.description }}</p>
                </router-link>
                <!-- Thay đổi nút trong carousel view -->
                <button
                  @click="addToCart(product)"
                  class="bg-pastel-pink text-white px-4 py-2 mt-2 rounded-md w-full hover:bg-pink-400 transition-colors flex items-center justify-center group"
                  :disabled="!product.inStock"
                  :class="{'opacity-50 cursor-not-allowed': !product.inStock}"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 transform group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  {{ product.inStock ? 'Thêm vào giỏ' : 'Hết hàng' }}
                </button>
              </div>
            </div>
          </div>
          
          <!-- Navigation arrows -->
          <button v-if="productGroups.length > 1" @click="prevCarouselSlide" 
                  class="absolute left-0 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white/90 rounded-full p-2 shadow-md z-10 -ml-2 transition-transform duration-300 hover:scale-110">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-gray-700">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button v-if="productGroups.length > 1" @click="nextCarouselSlide" 
                  class="absolute right-0 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white/90 rounded-full p-2 shadow-md z-10 -mr-2 transition-transform duration-300 hover:scale-110">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-gray-700">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
        
        <!-- Pagination dots -->
        <div v-if="productGroups.length > 1" class="flex justify-center mt-4 space-x-2">
          <button 
            v-for="index in productGroups.length" 
            :key="index"
            @click="currentCarouselSlide = index - 1"
            class="w-2.5 h-2.5 rounded-full transition-all duration-300"
            :class="currentCarouselSlide === index - 1 ? 'bg-pastel-pink scale-125' : 'bg-gray-300 hover:bg-gray-400'"
            :aria-label="`Go to slide ${index}`"
          ></button>
        </div>
      </div>
      
      <!-- Grid View for Products -->
      <div v-else class="mt-8">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-2xl font-semibold text-pastel-pink">All Products</h2>
          <button @click="toggleViewMode" 
                  class="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:shadow-md flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            Switch to Carousel View
          </button>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4">
          <!-- Thay đổi phần hiển thị sản phẩm để thêm liên kết đến trang chi tiết -->
          <div v-for="product in productStore.filteredProducts" :key="product._id"
               class="bg-white p-4 rounded-lg shadow-md transform transition-all duration-300 hover:scale-102 hover:shadow-lg">
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
    </div>
    
    <!-- Add TheNotification component -->
    <TheNotification />
  </div>
</template>

<script>
import { useProductStore } from '../stores/product'
import ProductCard from '../components/ProductCard.vue'
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useNotificationStore } from '../stores/notification'
import TheNotification from '../components/TheNotification.vue'

export default {
  components: { ProductCard, TheNotification },
  setup() {
    const productStore = useProductStore()
    const route = useRoute()
    const router = useRouter() // Thêm router để cập nhật URL
    const notificationStore = useNotificationStore()
    
    // View mode toggle (carousel or grid)
    const viewMode = ref('carousel')
    const currentCarouselSlide = ref(0)
    const carouselInterval = ref(null)
    
    // Group products for carousel (3 per slide)
    const productGroups = computed(() => {
      const groups = []
      const products = productStore.filteredProducts
      
      for (let i = 0; i < products.length; i += 3) {
        groups.push(products.slice(i, Math.min(i + 3, products.length)))
      }
      
      // Nếu không có sản phẩm, trả về mảng rỗng để tránh lỗi
      if (groups.length === 0) {
        return [[]]
      }
      
      return groups
    })
    
    const toggleViewMode = () => {
      viewMode.value = viewMode.value === 'carousel' ? 'grid' : 'carousel'
      
      // Reset carousel slide khi chuyển chế độ xem
      if (viewMode.value === 'carousel') {
        currentCarouselSlide.value = 0
        startCarouselAutoplay()
      } else {
        stopCarouselAutoplay()
      }
    }
    
    const nextCarouselSlide = () => {
      if (productGroups.value.length <= 1) return
      currentCarouselSlide.value = (currentCarouselSlide.value + 1) % productGroups.value.length
    }
    
    const prevCarouselSlide = () => {
      if (productGroups.value.length <= 1) return
      currentCarouselSlide.value = (currentCarouselSlide.value - 1 + productGroups.value.length) % productGroups.value.length
    }
    
    // Tự động chuyển slide
    const startCarouselAutoplay = () => {
      stopCarouselAutoplay() // Dừng interval hiện tại nếu có
      
      if (productGroups.value.length > 1) {
        carouselInterval.value = setInterval(() => {
          nextCarouselSlide()
        }, 6000) // Chuyển slide mỗi 6 giây
      }
    }
    
    const stopCarouselAutoplay = () => {
      if (carouselInterval.value) {
        clearInterval(carouselInterval.value)
        carouselInterval.value = null
      }
    }
    
    // Reset carousel khi người dùng tương tác
    watch(currentCarouselSlide, () => {
      if (viewMode.value === 'carousel') {
        stopCarouselAutoplay()
        startCarouselAutoplay()
      }
    })
    
    // Theo dõi thay đổi của filteredProducts để cập nhật carousel
    watch(() => productStore.filteredProducts, () => {
      // Reset về slide đầu tiên khi danh sách sản phẩm thay đổi
      currentCarouselSlide.value = 0
    }, { deep: true })
    
    onMounted(() => {
      startCarouselAutoplay()
    })
    
    onBeforeUnmount(() => {
      stopCarouselAutoplay()
    })
    
    // Thêm hàm để đọc và áp dụng tham số query từ URL
    const applyQueryFilters = () => {
      if (route.query.category) {
        console.log('Applying category filter:', route.query.category)
        productStore.selectedCategory = route.query.category
      }
      
      if (route.query.sort) {
        console.log('Applying price sort:', route.query.sort)
        productStore.sortOrder = route.query.sort
      }
    }
    
    // Gọi fetchProducts và áp dụng bộ lọc khi component được tạo
    onMounted(() => {
      productStore.fetchProducts().then(() => {
        // Áp dụng bộ lọc sau khi tải sản phẩm
        applyQueryFilters()
      })
      startCarouselAutoplay()
    })
    
    // Theo dõi thay đổi của route.query để áp dụng bộ lọc khi URL thay đổi
    watch(() => route.query, () => {
      applyQueryFilters()
    }, { deep: true })
    
    // Thêm hàm addToCart với thông báo
    const addToCart = (product) => {
      if (!product.inStock) {
        notificationStore.addNotification(
          `${product.name} hiện đã hết hàng!`, 
          'error', 
          1500
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
    
    // Thêm hàm resetFilters
    const resetFilters = () => {
      productStore.searchQuery = ''
      productStore.selectedCategory = ''
      productStore.sortOrder = ''
      
      // Thông báo cho người dùng
      notificationStore.addNotification(
        'Đã xóa tất cả bộ lọc',
        'info',
        1000
      )
      
      // Cập nhật URL bằng cách xóa tất cả query params
      router.replace({ path: route.path })
    }
    
    return { 
      productStore, 
      viewMode, 
      toggleViewMode,
      productGroups,
      currentCarouselSlide,
      nextCarouselSlide,
      prevCarouselSlide,
      addToCart,
      resetFilters // Thêm resetFilters vào return
    }
  }
}
</script>

<style scoped>
.transition-transform {
  transition: transform 0.5s ease-in-out;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Thêm hiệu ứng cho carousel */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.group:hover .group-hover\:opacity-100 {
  animation: fadeIn 0.3s ease-in-out;
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

// Trong phần setup
import { ref, onMounted } from 'vue'

// Thêm state cho danh mục
const categories = ref([
  { _id: '1', name: 'Bánh', slug: 'banh' },
  { _id: '2', name: 'Cafe & Đồ uống', slug: 'cafe-do-uong' },
  { _id: '3', name: 'Đồ ngọt', slug: 'do-ngot' }
])

// Hàm để lấy danh mục
const fetchCategories = async () => {
  try {
    // Trong tương lai, bạn có thể gọi API để lấy danh mục
    // Ví dụ: const response = await axios.get('/api/categories')
    // categories.value = response.data
    
    // Hiện tại, bạn có thể sử dụng dữ liệu mẫu từ CategoryManagement
    // Hoặc lưu danh mục vào localStorage để chia sẻ giữa các component
    const savedCategories = localStorage.getItem('categories')
    if (savedCategories) {
      categories.value = JSON.parse(savedCategories)
    }
  } catch (error) {
    console.error('Error fetching categories:', error)
  }
}

onMounted(() => {
  fetchCategories()
})

// Đảm bảo trả về categories trong return
return {
  productStore, 
  viewMode, 
  toggleViewMode,
  productGroups,
  currentCarouselSlide,
  nextCarouselSlide,
  prevCarouselSlide,
  addToCart,
  resetFilters // Thêm resetFilters vào return
}