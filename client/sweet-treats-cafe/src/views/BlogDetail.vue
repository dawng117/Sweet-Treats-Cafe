<template>
  <div class="container mx-auto px-4 py-8">
    <div v-if="isLoading" class="flex justify-center items-center h-64">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pastel-pink"></div>
    </div>
    
    <div v-else-if="error" class="text-center py-8 text-red-500">
      {{ error }}
    </div>
    
    <div v-else-if="blog" class="max-w-4xl mx-auto">
      <!-- Breadcrumb -->
      <div class="flex items-center text-sm text-gray-500 mb-8">
        <router-link to="/" class="hover:text-pastel-pink">Trang chủ</router-link>
        <span class="mx-2">›</span>
        <router-link to="/blog" class="hover:text-pastel-pink">Blog</router-link>
        <span class="mx-2">›</span>
        <span>{{ blog.title }}</span>
      </div>
      
      <!-- Blog content -->
      <article class="bg-white rounded-lg shadow-lg overflow-hidden">
        <img :src="blog.image" :alt="blog.title" class="w-full h-96 object-cover" />
        
        <div class="p-8">
          <div class="flex items-center justify-between mb-6">
            <span class="text-gray-500">{{ formatDate(blog.createdAt) }}</span>
            <span class="px-3 py-1 bg-pastel-pink text-white rounded-full">
              {{ blog.category }}
            </span>
          </div>
          
          <h1 class="text-4xl font-bold text-gray-900 mb-6">{{ blog.title }}</h1>
          
          <div class="prose max-w-none text-gray-700 leading-relaxed">
            {{ blog.content }}
          </div>
          
          <div class="mt-8 pt-6 border-t">
            <div class="flex items-center">
              <img 
                :src="blog.author?.image || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'" 
                :alt="blog.author?.username"
                class="w-12 h-12 rounded-full object-cover"
              />
              <div class="ml-4">
                <p class="font-medium">{{ blog.author?.username }}</p>
                <p class="text-sm text-gray-500">Tác giả</p>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
    
    <div v-else class="text-center py-8 text-gray-500">
      Không tìm thấy bài viết.
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useBlogStore } from '../stores/blog'
import { formatDate } from '../utils/dateFormat'

const route = useRoute()
const blogStore = useBlogStore()

const blog = ref(null)
const isLoading = ref(true)
const error = ref(null)

async function fetchBlog() {
  isLoading.value = true
  error.value = null
  
  try {
    blog.value = await blogStore.getBlogById(route.params.id)
    if (!blog.value) {
      error.value = 'Không tìm thấy bài viết.'
    }
  } catch (err) {
    console.error('Error fetching blog:', err)
    error.value = 'Không thể tải bài viết. Vui lòng thử lại sau.'
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchBlog()
})
</script>