<template>
  <div>
    <!-- Add New Product Form -->
    <div class="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 class="text-xl font-semibold mb-4 flex items-center">
        <svg class="w-5 h-5 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Thêm sản phẩm mới
      </h2>
      
      <form @submit.prevent="addProduct" class="space-y-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Tên sản phẩm</label>
            <input
              v-model="newProduct.name"
              placeholder="Nhập tên sản phẩm"
              class="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              required
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Giá (VND)</label>
            <input
              v-model.number="newProduct.price"
              type="number"
              placeholder="Nhập giá sản phẩm"
              class="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              required
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Danh mục</label>
            <select 
              v-model="newProduct.category" 
              class="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            >
              <option value="Bánh">Bánh</option>
              <option value="Cafe & Đồ uống">Cafe & Đồ uống</option>
              <option value="Đồ ngọt">Đồ ngọt</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Hình ảnh URL</label>
            <input
              v-model="newProduct.image"
              placeholder="Nhập URL hình ảnh"
              class="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            />
          </div>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
          <textarea
            v-model="newProduct.description"
            placeholder="Nhập mô tả sản phẩm"
            rows="3"
            class="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
          ></textarea>
        </div>
        
        <div class="flex justify-end">
          <button 
            type="submit" 
            class="bg-gradient-to-r from-pink-500 to-indigo-600 text-white px-4 py-2 rounded-md hover:opacity-90 transition-opacity flex items-center text-sm"
            :disabled="isLoading"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            {{ isLoading ? 'Đang thêm...' : 'Thêm sản phẩm' }}
          </button>
        </div>
      </form>
    </div>
    
    <!-- Product List -->
    <div class="bg-white rounded-lg shadow-md overflow-hidden">
      <div class="p-6 border-b">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-semibold flex items-center">
            <svg class="w-5 h-5 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Danh sách sản phẩm ({{ filteredProducts?.length || 0 }})
          </h2>
          
          <button 
            @click="fetchProducts" 
            class="text-indigo-600 hover:text-indigo-900 flex items-center text-sm"
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

        <div class="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
          <div class="flex-1">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              class="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            />
          </div>
          <div class="w-full sm:w-48">
            <select
              v-model="selectedCategory"
              class="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            >
              <option value="">Tất cả danh mục</option>
              <option v-for="category in categories" :key="category" :value="category">
                {{ category }}
              </option>
            </select>
          </div>
          <div class="w-full sm:w-48">
            <select
              v-model="sortByPrice"
              class="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            >
              <option value="">Sắp xếp theo giá</option>
              <option value="asc">Giá thấp đến cao</option>
              <option value="desc">Giá cao đến thấp</option>
            </select>
          </div>
        </div>
      </div>
      <div v-if="error" class="bg-red-50 p-4 text-red-700 text-center text-sm">
        {{ error }}
      </div>
      
      <!-- Danh sách thẻ trên di động -->
      <div v-if="filteredProducts?.length === 0 && !isLoading" class="sm:hidden p-5 text-center text-sm text-gray-500">
        {{ searchQuery || selectedCategory ? 'Không tìm thấy sản phẩm phù hợp' : 'Chưa có sản phẩm nào. Hãy thêm sản phẩm mới!' }}
      </div>
      <div v-else-if="isLoading && productStore.products.length === 0" class="sm:hidden p-5 text-center text-sm text-gray-500">
        <div class="flex justify-center">
          <svg class="animate-spin h-5 w-5 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span class="ml-2">Đang tải sản phẩm...</span>
        </div>
      </div>
      <div v-else class="sm:hidden px-5 py-5 space-y-4">
        <div v-for="product in filteredProducts" :key="product._id" class="border rounded-lg p-5 bg-white shadow-sm">
          <div class="flex items-center mb-3">
            <img 
              :src="previewImage(product.image)" 
              class="h-8 w-8 rounded-full object-cover mr-3" 
              alt="Product image"
              @error="handleImageError"
            />
            <div class="flex-1">
              <div class="text-sm font-medium text-gray-900">{{ product.name }}</div>
              <div v-if="product.description" class="text-xs text-gray-500 line-clamp-2 overflow-hidden text-ellipsis break-words">
                {{ product.description }}
              </div>
            </div>
          </div>
          <div class="text-xs mb-2">
            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
              {{ product.category }}
            </span>
          </div>
          <div class="text-sm text-gray-500 mb-3">
            {{ formatPrice(product.price) }} VND
          </div>
          <div class="flex flex-wrap gap-2">
            <button 
              @click="editProduct(product)" 
              class="text-indigo-600 hover:text-indigo-900 text-xs transition-colors duration-200"
            >
              Sửa
            </button>
            <button 
              @click="confirmDelete(product._id)" 
              class="text-red-600 hover:text-red-900 text-xs transition-colors duration-200"
            >
              Xóa
            </button>
          </div>
        </div>
      </div>

      <!-- Danh sách bảng trên màn hình lớn -->
      <div v-if="filteredProducts?.length === 0 && !isLoading" class="hidden sm:block px-6 py-4 text-center text-sm text-gray-500">
        {{ searchQuery || selectedCategory ? 'Không tìm thấy sản phẩm phù hợp' : 'Chưa có sản phẩm nào. Hãy thêm sản phẩm mới!' }}
      </div>
      <div v-else-if="isLoading && productStore.products.length === 0" class="hidden sm:block px-6 py-4 text-center text-sm text-gray-500">
        <div class="flex justify-center">
          <svg class="animate-spin h-5 w-5 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span class="ml-2">Đang tải sản phẩm...</span>
        </div>
      </div>
      <div v-else class="hidden sm:block overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sản phẩm</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Danh mục</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Giá</th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="product in filteredProducts" :key="product._id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="h-10 w-10 flex-shrink-0">
                    <img 
                      :src="previewImage(product.image)" 
                      class="h-10 w-10 rounded-full object-cover"
                      alt="Product image"
                      @error="handleImageError"
                    />
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ product.name }}</div>
                    <div v-if="product.description" class="text-xs text-gray-500 max-w-xs truncate">
                      {{ product.description }}
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  {{ product.category }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatPrice(product.price) }} VND
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button @click="editProduct(product)" class="text-indigo-600 hover:text-indigo-900 mr-3">
                  Sửa
                </button>
                <button @click="confirmDelete(product._id)" class="text-red-600 hover:text-red-900">
                  Xóa
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Edit Product Modal -->
    <div v-if="showEditModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-medium">Chỉnh sửa sản phẩm</h3>
          <button @click="showEditModal = false" class="text-gray-400 hover:text-gray-500">
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form @submit.prevent="updateProduct" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Tên sản phẩm <span class="text-red-500">*</span></label>
            <input
              v-model="editingProduct.name"
              class="w-full p-2 border border-gray-300 rounded-md text-sm"
              required
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Giá (VND) <span class="text-red-500">*</span></label>
            <input
              v-model.number="editingProduct.price"
              type="number"
              min="1000"
              step="1000"
              class="w-full p-2 border border-gray-300 rounded-md text-sm"
              required
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Danh mục <span class="text-red-500">*</span></label>
            <select v-model="editingProduct.category" class="w-full p-2 border border-gray-300 rounded-md text-sm" required>
              <option v-for="category in categories" :key="category" :value="category">
                {{ category }}
              </option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Hình ảnh URL</label>
            <input
              v-model="editingProduct.image"
              class="w-full p-2 border border-gray-300 rounded-md text-sm"
            />
            <div v-if="editingProduct.image" class="mt-2">
              <img 
                :src="previewImage(editingProduct.image)" 
                alt="Preview" 
                class="h-16 w-16 object-cover rounded-md border"
                @error="handleImageError"
              />
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
            <textarea
              v-model="editingProduct.description"
              rows="3"
              class="w-full p-2 border border-gray-300 rounded-md text-sm"
            ></textarea>
          </div>
          
          <div class="flex justify-end space-x-3 pt-2">
            <button 
              type="button"
              @click="showEditModal = false"
              class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 text-sm"
            >
              Hủy
            </button>
            <button 
              type="submit" 
              class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 flex items-center text-sm"
              :disabled="isLoading"
            >
              <svg v-if="isLoading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ isLoading ? 'Đang lưu...' : 'Lưu thay đổi' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div class="mb-4">
          <h3 class="text-lg font-medium text-gray-900">Xác nhận xóa</h3>
          <p class="text-gray-500 mt-2 text-sm">Bạn có chắc chắn muốn xóa sản phẩm này? Hành động này không thể hoàn tác.</p>
        </div>
        
        <div class="flex justify-end space-x-3">
          <button 
            @click="showDeleteModal = false"
            class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 text-sm"
          >
            Hủy
          </button>
          <button 
            @click="deleteProduct(productToDelete)"
            class="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 text-sm"
          >
            Xóa
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted } from 'vue'
import { useProductStore } from '../stores/product'
import { useToast } from 'vue-toastification'
import axios from 'axios'

export default {
  setup() {
    const productStore = useProductStore()
    const toast = useToast()
    
    const showEditModal = ref(false)
    const showDeleteModal = ref(false)
    const productToDelete = ref(null)
    const editingProduct = reactive({
      _id: '',
      name: '',
      price: 0,
      category: '',
      image: '',
      description: ''
    })
    
    const newProduct = reactive({
      name: '',
      price: 0,
      category: 'Bánh',
      image: '',
      description: ''
    })
    const searchQuery = ref('')
    const selectedCategory = ref('')
    const sortByPrice = ref('')

    const filteredProducts = computed(() => {
      let filtered = productStore.products
      
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase()
        filtered = filtered.filter(product =>
          product.name.toLowerCase().includes(query)
        )
      }
      
      if (selectedCategory.value) {
        filtered = filtered.filter(product =>
          product.category === selectedCategory.value
        )
      }
      if (sortByPrice.value) {
        filtered.sort((a, b) => {
          if (sortByPrice.value === 'asc') {
            return a.price - b.price
          } else {
            return b.price - a.price
          }
        })
      }
      
      return filtered
    })
    const resetFilters = () => {
      searchQuery.value = ''
      selectedCategory.value = ''
      sortByPrice.value = ''
    }
    const categories = ['Bánh', 'Cafe & Đồ uống', 'Đồ ngọt']
    const isLoading = ref(false)
    const error = ref(null)
    
    const fetchProducts = async () => {
      isLoading.value = true
      error.value = null
      
      try {
        await productStore.fetchProducts()
        resetFilters()
      } catch (err) {
        console.error('Error fetching products:', err)
        error.value = 'Không thể tải danh sách sản phẩm. Vui lòng thử lại sau.'
      } finally {
        isLoading.value = false
      }
    }
    
    const formatPrice = (price) => {
      return new Intl.NumberFormat('vi-VN').format(price)
    }
    
    const previewImage = (url) => {
      if (!url) return 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'
      return url
    }
    
    const handleImageError = (e) => {
      e.target.src = 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'
    }
    
    const addProduct = async () => {
      try {
        if (!newProduct.name || newProduct.price <= 0) {
          return toast.error('Vui lòng nhập đầy đủ thông tin sản phẩm')
        }
        
        const userData = JSON.parse(localStorage.getItem('user'))
        const token = userData?.token
        
        if (!token) {
          return toast.error('Bạn cần đăng nhập lại để thực hiện thao tác này')
        }
        
        isLoading.value = true
        
        await axios.post('http://localhost:3000/api/products', newProduct, {
          headers: { Authorization: `Bearer ${token}` }
        })
        
        await fetchProducts()
        
        Object.assign(newProduct, {
          name: '',
          price: 0,
          category: 'Bánh',
          image: '',
          description: ''
        })
        
        toast.success('Thêm sản phẩm thành công!')
      } catch (error) {
        console.error('Add product error:', error)
        toast.error(`Lỗi khi thêm sản phẩm: ${error.response?.data?.message || error.message}`)
      } finally {
        isLoading.value = false
      }
    }
    
    const updateProduct = async () => {
      try {
        if (!editingProduct.name || editingProduct.price <= 0) {
          return toast.error('Vui lòng nhập đầy đủ thông tin sản phẩm')
        }
        
        const userData = JSON.parse(localStorage.getItem('user'))
        const token = userData?.token
        
        if (!token) {
          return toast.error('Bạn cần đăng nhập lại để thực hiện thao tác này')
        }
        
        isLoading.value = true
        
        await axios.put(
          `http://localhost:3000/api/products/${editingProduct._id}`,
          editingProduct,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        
        await fetchProducts()
        showEditModal.value = false
        toast.success('Cập nhật sản phẩm thành công!')
      } catch (error) {
        console.error('Update product error:', error)
        toast.error(`Lỗi khi cập nhật sản phẩm: ${error.response?.data?.message || error.message}`)
      } finally {
        isLoading.value = false
      }
    }
    
    const editProduct = (product) => {
      Object.assign(editingProduct, product)
      showEditModal.value = true
    }
    
    const confirmDelete = (productId) => {
      productToDelete.value = productId
      showDeleteModal.value = true
    }
    
    const deleteProduct = async (productId) => {
      try {
        const userData = JSON.parse(localStorage.getItem('user'))
        const token = userData?.token
        
        if (!token) {
          return toast.error('Bạn cần đăng nhập lại để thực hiện thao tác này')
        }
        
        isLoading.value = true
        
        await axios.delete(`http://localhost:3000/api/products/${productId}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        
        await fetchProducts()
        showDeleteModal.value = false
        toast.success('Xóa sản phẩm thành công!')
      } catch (error) {
        console.error('Delete product error:', error)
        toast.error(`Lỗi khi xóa sản phẩm: ${error.response?.data?.message || error.message}`)
      } finally {
        isLoading.value = false
      }
    }
    
    onMounted(() => {
      fetchProducts()
    })
    
    return {
      productStore,
      showEditModal,
      showDeleteModal,
      productToDelete,
      editingProduct,
      newProduct,
      categories,
      isLoading,
      error,
      searchQuery,
      selectedCategory,
      sortByPrice,
      filteredProducts,
      resetFilters,
      fetchProducts,
      formatPrice,
      previewImage,
      handleImageError,
      addProduct,
      updateProduct,
      editProduct,
      confirmDelete,
      deleteProduct
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