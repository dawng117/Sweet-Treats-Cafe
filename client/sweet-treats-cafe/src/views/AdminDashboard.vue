<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto p-6">
      <!-- Dashboard Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold bg-gradient-to-r from-pink-500 to-indigo-600 bg-clip-text text-transparent">
          Admin Dashboard
        </h1>
        <p class="text-gray-600 mt-2">Quản lý sản phẩm và đơn hàng của Sweet Treats Cafe</p>
      </div>

      <!-- Dashboard Stats -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow-md p-6 border-l-4 border-pink-500">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-pink-100 mr-4">
              <svg class="w-6 h-6 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
            </div>
            <div>
              <p class="text-gray-500 text-sm">Tổng sản phẩm</p>
              <p class="text-2xl font-semibold">{{ productStore.products.length }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-md p-6 border-l-4 border-indigo-500">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-indigo-100 mr-4">
              <svg class="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div>
              <p class="text-gray-500 text-sm">Danh mục</p>
              <p class="text-2xl font-semibold">3</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-green-100 mr-4">
              <svg class="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p class="text-gray-500 text-sm">Doanh thu</p>
              <p class="text-2xl font-semibold">{{ formatPrice(totalRevenue) }} VND</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Tabs -->
      <div class="mb-6 border-b">
        <div class="flex space-x-8">
          <button 
            @click="activeTab = 'products'" 
            :class="[
              'py-2 px-1 font-medium text-sm focus:outline-none',
              activeTab === 'products' 
                ? 'text-indigo-600 border-b-2 border-indigo-600' 
                : 'text-gray-500 hover:text-gray-700'
            ]"
          >
            Quản lý sản phẩm
          </button>
          <button 
            @click="activeTab = 'orders'" 
            :class="[
              'py-2 px-1 font-medium text-sm focus:outline-none',
              activeTab === 'orders' 
                ? 'text-indigo-600 border-b-2 border-indigo-600' 
                : 'text-gray-500 hover:text-gray-700'
            ]"
          >
            Quản lý đơn hàng
          </button>
           <button 
            @click="activeTab = 'users'" 
            :class="[
              'py-2 px-1 font-medium text-sm focus:outline-none',
              activeTab === 'users' 
                ? 'text-indigo-600 border-b-2 border-indigo-600' 
                : 'text-gray-500 hover:text-gray-700'
            ]"
          >
            Quản lý người dùng
          </button>
          <button 
            @click="activeTab = 'blogs'" 
            :class="[
              'py-2 px-1 font-medium text-sm focus:outline-none',
              activeTab === 'blogs' 
                ? 'text-indigo-600 border-b-2 border-indigo-600' 
                : 'text-gray-500 hover:text-gray-700'
            ]"
          >
            Quản lý bài viết
          </button>
        </div>
      </div>

      <!-- Products Tab -->
      <div v-if="activeTab === 'products'">
        <ProductManagement />
      </div>

      <!-- Orders Tab -->
      <div v-if="activeTab === 'orders'">
        <OrderManagement />
      </div>
      
      <!-- Users Tab -->
      <div v-if="activeTab === 'users'" class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-xl font-semibold mb-4 flex items-center">
          <svg class="w-5 h-5 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          Quản lý người dùng
        </h2>
        
        <UserManagement />

      </div>
        <!-- Blogs Tab -->
        <div v-if="activeTab === 'blogs'">
        <AdminBlogList />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed, provide } from 'vue'
import { useProductStore } from '../stores/product'
import { useRouter } from 'vue-router' // Thêm useRouter
import UserManagement from '../components/UserManagement.vue'
import ProductManagement from '../components/ProductManagement.vue'
import OrderManagement from '../components/OrderManagement.vue'
import axios from 'axios'
import { useAuthStore } from '../stores/auth'
import AdminBlogForm from '../components/AdminBlogForm.vue'
import AdminBlogList from '../components/AdminBlogList.vue'

export default {
  setup() {
    const productStore = useProductStore()
    const authStore = useAuthStore()
    const router = useRouter() // Khởi tạo router
    const activeTab = ref('products')
    const orders = ref([])
    const isLoading = ref(false)
    
    // Kiểm tra quyền truy cập
    const checkAdminAccess = () => {
      if (!authStore.isAuthenticated || authStore.user.role !== 'admin') {
        router.push('/access-denied')
        return false
      }
      return true
    }
    
    // Kiểm tra quyền khi component được mount
    onMounted(() => {
      if (checkAdminAccess()) {
        productStore.fetchProducts()
        fetchOrders()
      }
    })

    // Tính tổng doanh thu từ đơn hàng đã giao
    const totalRevenue = computed(() => {
      return orders.value
        .filter(order => order.status === 'delivered')
        .reduce((total, order) => total + order.total, 0)
    })

    
    // Hàm format tiền tệ
    const formatPrice = (price) => {
      return new Intl.NumberFormat('vi-VN').format(price)
    }
    
    // Lấy danh sách đơn hàng
    const fetchOrders = async () => {
      if (!authStore.isAuthenticated || authStore.user.role !== 'admin') return
      
      isLoading.value = true
      try {
        const response = await axios.get('http://localhost:3000/api/orders/all', {
          headers: {
            Authorization: `Bearer ${authStore.user.token}`
          }
        })
        orders.value = response.data
      } catch (error) {
        console.error('Error fetching orders:', error)
      } finally {
        isLoading.value = false
      }
    }
    
    // Hàm cập nhật trạng thái đơn hàng
    const updateOrderStatus = (orderId, newStatus) => {
      const index = orders.value.findIndex(order => order._id === orderId)
      if (index !== -1) {
        orders.value[index].status = newStatus
      }
    }
    
    // Cung cấp hàm cập nhật trạng thái cho các component con
    provide('updateOrderStatus', updateOrderStatus)
    
    // Fetch products và orders khi component được mount
    onMounted(() => {
      productStore.fetchProducts()
      fetchOrders()
    })
    
    return { 
      productStore, 
      activeTab,
      totalRevenue,
      formatPrice,
      fetchOrders
    }
  },
  components: {
    UserManagement,
    ProductManagement,
    OrderManagement,
    AdminBlogList,
    AdminBlogForm
  }
}
</script>

<style scoped>
/* Add any additional custom styles here */
</style>