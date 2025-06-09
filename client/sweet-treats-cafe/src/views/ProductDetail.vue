<template>
  <div class="container mx-auto px-4 py-8">
    <div v-if="isLoading" class="flex justify-center items-center h-64">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pastel-pink"></div>
    </div>
    
    <div v-else-if="error" class="text-center py-8">
      <p class="text-red-500 text-lg">{{ error }}</p>
      <button @click="fetchProduct" class="mt-4 bg-pastel-pink text-white px-6 py-2 rounded-md hover:bg-pink-400">
        Thử lại
      </button>
    </div>
    
    <div v-else-if="product" class="bg-white rounded-lg shadow-lg overflow-hidden">
      <!-- Breadcrumb -->
      <div class="px-6 py-3 bg-gray-50 text-sm">
        <router-link to="/" class="text-pastel-pink hover:underline">Trang chủ</router-link>
        <span class="mx-2">›</span>
        <router-link to="/products" class="text-pastel-pink hover:underline">Sản phẩm</router-link>
        <span class="mx-2">›</span>
        <span class="text-gray-600">{{ product.name }}</span>
      </div>
      
      <div class="md:flex">
        <!-- Product Image -->
        <div class="md:w-1/2 p-6 flex items-center justify-center bg-gray-50">
          <img :src="product.image" :alt="product.name" class="max-w-full max-h-96 object-contain" />
        </div>
        
        <!-- Product Details -->
        <div class="md:w-1/2 p-6 md:p-8">
          <div class="flex justify-between items-start">
            <h1 class="text-3xl font-bold text-gray-800">{{ product.name }}</h1>
            <span class="bg-pastel-pink text-white px-3 py-1 rounded-full text-sm">
              {{ product.category }}
            </span>
          </div>
          
          <p class="text-2xl font-semibold text-pastel-pink mt-4">
            {{ product.price.toLocaleString() }} VND
          </p>
          
          <div class="mt-4">
            <span 
              :class="[
                'px-3 py-1 rounded-full text-sm font-medium', 
                product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              ]"
            >
              {{ product.inStock ? 'Còn hàng' : 'Hết hàng' }}
            </span>
          </div>
          
          <div class="mt-6">
            <h2 class="text-lg font-semibold text-gray-700">Mô tả</h2>
            <p class="mt-2 text-gray-600">{{ product.description }}</p>
          </div>
          
          <div class="mt-8 space-y-4">
            <div class="flex items-center">
              <label for="quantity" class="mr-4 text-gray-700">Số lượng:</label>
              <div class="flex items-center border rounded-md">
                <button 
                  @click="quantity > 1 ? quantity-- : null" 
                  class="px-3 py-1 text-gray-600 hover:bg-gray-100"
                  :disabled="!product.inStock"
                >
                  -
                </button>
                <input 
                  id="quantity" 
                  v-model="quantity" 
                  type="number" 
                  min="1" 
                  class="w-12 text-center border-x py-1 focus:outline-none"
                  :disabled="!product.inStock"
                />
                <button 
                  @click="quantity++" 
                  class="px-3 py-1 text-gray-600 hover:bg-gray-100"
                  :disabled="!product.inStock"
                >
                  +
                </button>
              </div>
            </div>
            
            <div>
              <label for="notes" class="block text-gray-700 mb-2">Ghi chú:</label>
              <textarea 
                id="notes" 
                v-model="notes" 
                rows="2" 
                class="w-full border rounded-md p-2 focus:ring-2 focus:ring-pastel-pink focus:outline-none"
                placeholder="Ví dụ: ít đường, không đá..."
                :disabled="!product.inStock"
              ></textarea>
            </div>
            
            <button 
              @click="addToCartWithOptions" 
              class="w-full bg-pastel-pink text-white py-3 rounded-md hover:bg-pink-400 transition-colors flex items-center justify-center group"
              :disabled="!product.inStock"
              :class="{'opacity-50 cursor-not-allowed': !product.inStock}"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 transform group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {{ product.inStock ? 'Thêm vào giỏ hàng' : 'Hết hàng' }}
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <div v-else class="text-center py-8">
      <p class="text-gray-500">Không tìm thấy sản phẩm</p>
      <router-link to="/products" class="mt-4 inline-block bg-pastel-pink text-white px-6 py-2 rounded-md hover:bg-pink-400">
        Quay lại danh sách sản phẩm
      </router-link>
    </div>
    
    <!-- Related Products -->
    <div v-if="relatedProducts.length > 0" class="mt-12">
      <h2 class="text-2xl font-semibold text-pastel-pink mb-6">Sản phẩm liên quan</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div 
          v-for="relatedProduct in relatedProducts" 
          :key="relatedProduct._id"
          class="bg-white p-4 rounded-lg shadow-md transform transition-all duration-300 hover:scale-102 hover:shadow-lg"
        >
          <router-link :to="`/product/${relatedProduct._id}`">
            <div class="relative overflow-hidden rounded-md group h-48 flex items-center justify-center bg-gray-50">
              <img :src="relatedProduct.image" :alt="relatedProduct.name" class="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-110" />
              <div class="absolute top-2 right-2">
                <span 
                  :class="[
                    'px-2 py-1 rounded-full text-xs font-medium', 
                    relatedProduct.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  ]"
                >
                  {{ relatedProduct.inStock ? 'Còn hàng' : 'Hết hàng' }}
                </span>
              </div>
            </div>
            <h3 class="text-lg font-semibold mt-3">{{ relatedProduct.name }}</h3>
            <p class="text-gray-700">{{ relatedProduct.price.toLocaleString() }} VND</p>
          </router-link>
          <!-- Thay đổi nút trong phần sản phẩm liên quan -->
          <button
            @click="addToCart(relatedProduct)"
            class="bg-pastel-pink text-white px-4 py-2 mt-2 rounded-md w-full hover:bg-pink-400 transition-colors flex items-center justify-center"
            :disabled="!relatedProduct.inStock"
            :class="{'opacity-50 cursor-not-allowed': !relatedProduct.inStock}"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {{ relatedProduct.inStock ? 'Thêm vào giỏ' : 'Hết hàng' }}
          </button>
        </div>
      </div>
    </div>
    
    <!-- Add TheNotification component -->
    <TheNotification />
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue'  // Added watch import here
import { useRoute, useRouter } from 'vue-router'
import { useProductStore } from '../stores/product'
import { useNotificationStore } from '../stores/notification' // Thêm import này
import TheNotification from '../components/TheNotification.vue' // Thêm import này
import axios from 'axios'

export default {
  components: { TheNotification }, // Thêm TheNotification vào components
  setup() {
    const route = useRoute()
    const router = useRouter()
    const productStore = useProductStore()
    const notificationStore = useNotificationStore() // Thêm dòng này
    
    const product = ref(null)
    const isLoading = ref(true)
    const error = ref(null)
    const quantity = ref(1)
    const notes = ref('')
    let fetchInProgress = false;
    const productId = computed(() => route.params.id)
    
    watch(productId, async (newId, oldId) => {
      if (newId !== oldId && !fetchInProgress) {
        fetchInProgress = true;
        await fetchProduct();
        fetchInProgress = false;
      }
    });
    
    // Sửa phần xử lý lỗi trong fetchProduct
    const fetchProduct = async () => {
      isLoading.value = true;
      error.value = null;
      
      console.log('Fetching product with ID:', productId.value);
      
      try {
        if (!productId.value) {
          error.value = 'ID sản phẩm không hợp lệ';
          isLoading.value = false;
          return;
        }
        
        // Tìm trong store trước
        const foundProduct = productStore.products.find(p => String(p._id) === String(productId.value));
        
        if (foundProduct) {
            console.log('Product found in store:', foundProduct);
          product.value = { ...foundProduct }; // Tạo bản sao để tránh tham chiếu
          isLoading.value = false;
          return;
        }
        
        // Nếu không tìm thấy trong store, gọi API
        console.log('Fetching from API:', `http://localhost:3000/api/products/${productId.value}`);
        
        try {
          const response = await axios.get(`http://localhost:3000/api/products/${productId.value}`);
          console.log('API response:', response.data);
          
          if (response.data && response.data._id) {
            // Thêm trường inStock nếu không có
            const productData = { ...response.data };
            
            if (productData.inStock === undefined) {
              productData.inStock = true;
            }
            
            // Thêm trường description nếu không có
            if (!productData.description) {
              productData.description = 'Không có mô tả cho sản phẩm này';
            }
            
            product.value = productData;
            
            // Thêm vào store để lần sau không cần gọi API nữa
            if (!productStore.products.some(p => String(p._id) === String(productData._id))) {
              productStore.products = [...productStore.products, productData];
            }
          } else {
            throw new Error('Dữ liệu sản phẩm không hợp lệ');
          }
        } catch (apiError) {
          console.error('API error:', apiError);
          throw apiError; // Ném lỗi để xử lý ở catch bên ngoài
        }
      } catch (err) {
        console.error('Error in fetchProduct:', err);
        
        // Thử tìm trong dữ liệu mẫu
        const sampleProducts = [
          { _id: "1", name: 'Chocolate Cake', price: 150000, category: 'Bánh', description: 'Bánh chocolate thơm ngon', inStock: true, image: 'https://images.squarespace-cdn.com/content/v1/538500e4e4b0fa9e95efc7b9/1474396722095-Z3PFWKHLRBKM4QASI7UN/adj_SoGoodChocCake.png?format=1000w' },
          { _id: "2", name: 'Latte', price: 45000, category: 'Cafe & Đồ uống', description: 'Cà phê sữa thơm ngon', inStock: true, image: 'https://banfb.vn/wp-content/uploads/2024/04/ly-ca-phe-sau-rieng.png' },
          { _id: "3", name: 'Macaron', price: 20000, category: 'Đồ ngọt', description: 'Bánh macaron Pháp', inStock: true, image: 'https://eatzigourmet.com.sg/bakery/wp-content/uploads/2018/09/macaron.png' },
          { _id: "4", name: 'Strawberry Cheesecake', price: 180000, category: 'Bánh', description: 'Bánh phô mai dâu tây', inStock: true, image: 'https://png.pngtree.com/png-clipart/20241114/original/pngtree-strawberry-cheesecake-png-image_17058758.png'},
          { _id: "5", name: 'Matcha Frappuccino', price: 55000, category: 'Cafe & Đồ uống', description: 'Đồ uống matcha đá xay', inStock: true, image: 'https://sevenleavestea.com/wp-content/uploads/2022/05/matcha_chocolate_crunch_frappe-1.png'},
          { _id: "6", name: 'Croissant', price: 35000, category: 'Đồ ngọt', description: 'Bánh sừng bò Pháp', inStock: true, image: 'https://breadtalkvietnam.com/wp-content/uploads/2023/06/dsc03375_optimized.png'},
        ];
        
        const sampleProduct = sampleProducts.find(p => String(p._id) === String(productId.value));
        
        if (sampleProduct) {
          console.log('Product found in sample data:', sampleProduct);
          product.value = { ...sampleProduct }; // Tạo bản sao để tránh tham chiếu
          
          // Thêm vào store để lần sau không cần tìm lại
          if (!productStore.products.some(p => String(p._id) === String(sampleProduct._id))) {
            productStore.products = [...productStore.products, sampleProduct];
          }
        } else {
          error.value = 'Không thể tải thông tin sản phẩm. Vui lòng thử lại sau.';
        }
      } finally {
        isLoading.value = false; // Luôn đảm bảo reset isLoading
      }
    };
    
    const relatedProducts = computed(() => {
      if (!product.value) return []
      
      return productStore.products
        .filter(p => p.category === product.value.category && p._id !== product.value._id)
        .slice(0, 4)
    })
    
    const addToCartWithOptions = () => {
      if (!product.value || !product.value.inStock) {
        notificationStore.addNotification(
          `${product.value ? product.value.name : 'Sản phẩm'} hiện đã hết hàng!`, 
          'error', 
          1800
        )
        return
      }
      
      const existingItem = productStore.cart.find(item => item.productId === product.value._id)
      
      if (existingItem) {
        existingItem.quantity += quantity.value
        existingItem.notes = notes.value || existingItem.notes
      } else {
        productStore.cart.push({
          productId: product.value._id,
          name: product.value.name,
          price: product.value.price,
          quantity: quantity.value,
          notes: notes.value,
          image: product.value.image
        })
      }
      
      productStore.saveCart()
      
      // Hiển thị thông báo thành công
      notificationStore.addNotification(
        `Đã thêm ${product.value.name} (${product.value.price.toLocaleString()} VND) vào giỏ hàng!`, 
        'success', 
        1500
      )
      
      // Reset quantity và notes
      quantity.value = 1
      notes.value = ''
    }
    
    // Thêm hàm addToCart cho sản phẩm liên quan
    const addToCart = (relatedProduct) => {
      if (!relatedProduct.inStock) {
        notificationStore.addNotification(
          `${relatedProduct.name} hiện đã hết hàng!`, 
          'error', 
          1500
        )
        return
      }
      
      productStore.addToCart(relatedProduct)
      
      // Hiển thị thông báo thành công
      notificationStore.addNotification(
        `Đã thêm ${relatedProduct.name} (${relatedProduct.price.toLocaleString()} VND) vào giỏ hàng!`, 
        'success', 
        1500
      )
    }
    
    onMounted(() => {
      fetchProduct()
    })
    
    return {
      product,
      isLoading,
      error,
      quantity,
      notes,
      relatedProducts,
      productStore,
      fetchProduct,
      addToCartWithOptions,
      addToCart // Thêm hàm addToCart vào return
    }
  }
}
</script>

<style scoped>
.hover\:scale-102:hover {
  transform: scale(1.02);
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}
</style>

