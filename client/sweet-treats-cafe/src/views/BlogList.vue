<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-pastel-pink mb-8">Blog</h1>
    
    <!-- Tìm kiếm và lọc -->
    <div class="flex flex-col md:flex-row gap-4 mb-8">
      <input
        v-model="blogStore.searchQuery"
        placeholder="Tìm kiếm bài viết..."
        class="flex-1 p-2 border rounded focus:ring-2 focus:ring-pastel-pink focus:outline-none"
      />
      <select
        v-model="blogStore.selectedCategory"
        class="p-2 border rounded focus:ring-2 focus:ring-pastel-pink focus:outline-none"
      >
        <option value="">Tất cả danh mục</option>
        <option value="Công thức">Công thức</option>
        <option value="Mẹo làm bánh">Mẹo làm bánh</option>
        <option value="Tin tức">Tin tức</option>
      </select>
    </div>
    
    <!-- Danh sách bài viết -->
    <div v-if="blogStore.isLoading" class="flex justify-center items-center h-64">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pastel-pink"></div>
    </div>
    
    <div v-else-if="blogStore.error" class="text-center py-8 text-red-500">
      {{ blogStore.error }}
    </div>
    
    <div v-else-if="blogStore.filteredBlogs.length === 0" class="text-center py-8 text-gray-500">
      Không có bài viết nào.
    </div>
    
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <BlogCard
        v-for="blog in blogStore.filteredBlogs"
        :key="blog._id"
        :blog="blog"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useBlogStore } from '../stores/blog'
import BlogCard from '../components/BlogCard.vue'

const blogStore = useBlogStore()

onMounted(() => {
  blogStore.fetchBlogs()
})
</script>