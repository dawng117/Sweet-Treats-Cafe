import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'
import { useAuthStore } from './auth'
import { useNotificationStore } from './notification' // Import notification store

export const useBlogStore = defineStore('blog', () => {
  const blogs = ref([])
  const selectedCategory = ref('')
  const searchQuery = ref('')
  const isLoading = ref(false)
  const error = ref(null)
  const notificationStore = useNotificationStore() // Khởi tạo notification store

  // Computed properties
  const filteredBlogs = computed(() => {
    if (!searchQuery.value && !selectedCategory.value) return blogs.value
    
    return blogs.value.filter(blog => {
      const matchesSearch = !searchQuery.value || 
        blog.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        blog.content.toLowerCase().includes(searchQuery.value.toLowerCase())
      const matchesCategory = !selectedCategory.value || 
        blog.category === selectedCategory.value
      
      return matchesSearch && matchesCategory
    })
  })

  // Actions
  async function fetchBlogs() {
    isLoading.value = true
    error.value = null
    
    try {
      const response = await axios.get('http://localhost:3000/api/blogs')
      blogs.value = response.data
    } catch (err) {
      console.error('Error fetching blogs:', err)
      error.value = 'Không thể tải dữ liệu bài viết. Vui lòng thử lại sau.'
    } finally {
      isLoading.value = false
    }
  }

  async function getBlogById(id) {
    try {
      const response = await axios.get(`http://localhost:3000/api/blogs/${id}`)
      return response.data
    } catch (err) {
      console.error('Error fetching blog by ID:', err)
      error.value = 'Không thể tải thông tin bài viết. Vui lòng thử lại sau.'
      return null
    }
  }

  function filterByCategory(category) {
    selectedCategory.value = category
  }

  // Thêm các actions mới
  // Helper function to get auth headers
  function getAuthHeaders() {
    const authStore = useAuthStore()
    const user = authStore.user
    return user ? { headers: { Authorization: `Bearer ${user.token}` } } : {}
  }

  async function createBlog(blogData) {
    isLoading.value = true
    error.value = null
    
    try {
      const response = await axios.post(
        'http://localhost:3000/api/blogs', 
        blogData,
        getAuthHeaders()
      )
      blogs.value = [response.data, ...blogs.value]
      notificationStore.addNotification('Đã tạo bài viết mới thành công!', 'success')
      return response.data
    } catch (err) {
      console.error('Error creating blog:', err)
      error.value = 'Không thể tạo bài viết mới. Vui lòng thử lại sau.'
      notificationStore.addNotification(error.value, 'error')
      throw err
    } finally {
      isLoading.value = false
    }
  }

  async function updateBlog(id, blogData) {
    isLoading.value = true
    error.value = null
    
    try {
      const response = await axios.put(
        `http://localhost:3000/api/blogs/${id}`, 
        blogData,
        getAuthHeaders()
      )
      const index = blogs.value.findIndex(blog => blog._id === id)
      if (index !== -1) {
        blogs.value[index] = response.data
      }
      notificationStore.addNotification('Đã cập nhật bài viết thành công!', 'success')
      return response.data
    } catch (err) {
      console.error('Error updating blog:', err)
      error.value = 'Không thể cập nhật bài viết. Vui lòng thử lại sau.'
      notificationStore.addNotification(error.value, 'error')
      throw err
    } finally {
      isLoading.value = false
    }
  }

  async function deleteBlog(id) {
    isLoading.value = true
    error.value = null
    
    try {
      await axios.delete(
        `http://localhost:3000/api/blogs/${id}`,
        getAuthHeaders()
      )
      blogs.value = blogs.value.filter(blog => blog._id !== id)
      notificationStore.addNotification('Đã xóa bài viết thành công!', 'success')
    } catch (err) {
      console.error('Error deleting blog:', err)
      error.value = 'Không thể xóa bài viết. Vui lòng thử lại sau.'
      notificationStore.addNotification(error.value, 'error')
      throw err
    } finally {
      isLoading.value = false
    }
  }

  return {
    blogs,
    selectedCategory,
    searchQuery,
    isLoading,
    error,
    filteredBlogs,
    fetchBlogs,
    getBlogById,
    filterByCategory,
    createBlog,
    updateBlog,
    deleteBlog
  }
})