import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

export const useProductStore = defineStore('product', () => {
  const cart = ref([])
  const products = ref([])
  const searchQuery = ref('')
  const selectedCategory = ref('')
  const sortOrder = ref('') // Thêm state cho sắp xếp theo giá
  const isLoading = ref(false)
  const error = ref(null)
  
  // Computed properties
  const getCartCount = computed(() => {
    return cart.value.reduce((total, item) => total + item.quantity, 0)
  })
  
  const filteredProducts = computed(() => {
    if (!searchQuery.value && !selectedCategory.value && !sortOrder.value) 
      return products.value
    
    // Lọc sản phẩm theo tìm kiếm và danh mục
    let filtered = products.value.filter(product => {
      const matchesSearch = !searchQuery.value || 
        product.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      const matchesCategory = !selectedCategory.value || 
        product.category === selectedCategory.value
      
      return matchesSearch && matchesCategory
    })
    
    // Sắp xếp theo giá nếu có
    if (sortOrder.value === 'price-asc') {
      filtered = [...filtered].sort((a, b) => a.price - b.price)
    } else if (sortOrder.value === 'price-desc') {
      filtered = [...filtered].sort((a, b) => b.price - a.price)
    }
    
    return filtered
  })
  
  // Actions
  function addToCart(product) {
    const existingItem = cart.value.find(item => item.productId === product._id || item.productId === product.id)
    
    if (existingItem) {
      existingItem.quantity++
    } else {
      cart.value.push({
        productId: product._id || product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        notes: '',
        image: product.image
      })
    }
    
    saveCart()
  }
  
  function removeFromCart(productId) {
    cart.value = cart.value.filter(item => item.productId !== productId)
    saveCart()
  }

    // Thêm phương thức clearCart
    function clearCart() {
      cart.value = []
      saveCart()
    }
  function updateCartItemNotes(productId, notes) {
    const item = cart.value.find(item => item.productId === productId)
    if (item) {
      item.notes = notes
      saveCart()
    }
  }
  
  function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart.value))
  }
  
  function loadCart() {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      cart.value = JSON.parse(savedCart)
    }
  }
  
  async function fetchProducts() {
    isLoading.value = true
    error.value = null
    
    try {
      // Lấy dữ liệu từ API
      const response = await axios.get('http://localhost:3000/api/products')
      products.value = response.data
    } catch (err) {
      console.error('Error fetching products:', err)
      error.value = 'Không thể tải dữ liệu sản phẩm. Vui lòng thử lại sau.'
      
      // Sử dụng dữ liệu mẫu nếu API không hoạt động
      // Trong hàm fetchProducts, thay đổi dữ liệu mẫu
      products.value = [
        { _id: "1", name: 'Chocolate Cake', price: 150000, category: 'Bánh', image: 'https://images.squarespace-cdn.com/content/v1/538500e4e4b0fa9e95efc7b9/1474396722095-Z3PFWKHLRBKM4QASI7UN/adj_SoGoodChocCake.png?format=1000w' },
        { _id: "2", name: 'Latte', price: 45000, category: 'Cafe & Đồ uống', image: 'https://banfb.vn/wp-content/uploads/2024/04/ly-ca-phe-sau-rieng.png' },
        { _id: "3", name: 'Macaron', price: 20000, category: 'Đồ ngọt', image: 'https://eatzigourmet.com.sg/bakery/wp-content/uploads/2018/09/macaron.png' },
        { _id: "4", name: 'Strawberry Cheesecake', price: 180000, category: 'Bánh', image: 'https://png.pngtree.com/png-clipart/20241114/original/pngtree-strawberry-cheesecake-png-image_17058758.png'},
        { _id: "5", name: 'Matcha Frappuccino', price: 55000, category: 'Cafe & Đồ uống', image: 'https://sevenleavestea.com/wp-content/uploads/2022/05/matcha_chocolate_crunch_frappe-1.png'},
        { _id: "6", name: 'Croissant', price: 35000, category: 'Đồ ngọt', image: 'https://breadtalkvietnam.com/wp-content/uploads/2023/06/dsc03375_optimized.png'},
      ]
    } finally {
      isLoading.value = false
    }
  }
  
  // Kiểm tra phương thức filterProducts
  function filterProducts(category) {
    selectedCategory.value = category
    console.log('Filtering by category:', category)
  }
  
  // Thêm hàm sắp xếp theo giá
  function sortByPrice(order) {
    sortOrder.value = order
    console.log('Sorting by price:', order)
  }
  
  // Thêm hàm để lấy sản phẩm theo ID
  async function getProductById(id) {
    console.log('getProductById called with id:', id);
    
    if (!id) {
      console.error('Invalid product ID');
      return null;
    }
    
    // Kiểm tra xem sản phẩm đã có trong store chưa
    const existingProduct = products.value.find(p => String(p._id) === String(id));
    
    if (existingProduct) {
      console.log('Product found in store:', existingProduct);
      return existingProduct;
    }
    
    // Nếu không có trong store, gọi API để lấy
    try {
      console.log('Fetching product from API:', `http://localhost:3000/api/products/${id}`);
      const response = await axios.get(`http://localhost:3000/api/products/${id}`);
      console.log('API response:', response.data);
      
      if (response.data && response.data._id) {
        // Thêm vào store để lần sau không cần gọi API nữa
        products.value = [...products.value, response.data];
        return response.data;
      } else {
        throw new Error('Invalid product data received');
      }
    } catch (err) {
      console.error('Error fetching product by ID:', err);
      error.value = 'Không thể tải thông tin sản phẩm. Vui lòng thử lại sau.';
      
      // Nếu API không hoạt động, tìm trong dữ liệu mẫu
      const sampleProducts = [
        { _id: "1", name: 'Chocolate Cake', price: 150000, category: 'Bánh', image: 'https://images.squarespace-cdn.com/content/v1/538500e4e4b0fa9e95efc7b9/1474396722095-Z3PFWKHLRBKM4QASI7UN/adj_SoGoodChocCake.png?format=1000w' },
        { _id: "2", name: 'Latte', price: 45000, category: 'Cafe & Đồ uống', image: 'https://banfb.vn/wp-content/uploads/2024/04/ly-ca-phe-sau-rieng.png' },
        { _id: "3", name: 'Macaron', price: 20000, category: 'Đồ ngọt', image: 'https://eatzigourmet.com.sg/bakery/wp-content/uploads/2018/09/macaron.png' },
        { _id: "4", name: 'Strawberry Cheesecake', price: 180000, category: 'Bánh', image: 'https://png.pngtree.com/png-clipart/20241114/original/pngtree-strawberry-cheesecake-png-image_17058758.png'},
        { _id: "5", name: 'Matcha Frappuccino', price: 55000, category: 'Cafe & Đồ uống', image: 'https://sevenleavestea.com/wp-content/uploads/2022/05/matcha_chocolate_crunch_frappe-1.png'},
        { _id: "6", name: 'Croissant', price: 35000, category: 'Đồ ngọt', image: 'https://breadtalkvietnam.com/wp-content/uploads/2023/06/dsc03375_optimized.png'},
      ];
      
      // Lưu dữ liệu mẫu để có thể sử dụng ở nơi khác
      if (products.value.length === 0) {
        products.value = sampleProducts;
      }
      
      const sampleProduct = sampleProducts.find(p => String(p._id) === String(id));
      if (sampleProduct) {
        console.log('Product found in sample data:', sampleProduct);
        return sampleProduct;
      }
      
      return null;
    }
  }
  
  return {
    cart,
    products,
    searchQuery,
    selectedCategory,
    sortOrder, // Thêm sortOrder vào return
    isLoading,
    error,
    getCartCount,
    filteredProducts,
    addToCart,
    removeFromCart,
    clearCart,
    updateCartItemNotes,
    saveCart,
    loadCart,
    fetchProducts,
    filterProducts,
    sortByPrice, // Thêm function sortByPrice vào return
    getProductById
  }
})
