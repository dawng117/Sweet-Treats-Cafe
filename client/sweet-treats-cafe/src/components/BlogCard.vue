<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
    <img :src="blog.image" :alt="blog.title" class="w-full h-48 object-cover" />
    <div class="p-4">
      <div class="flex items-center justify-between mb-2">
        <span class="text-sm text-gray-500">{{ formatDate(blog.createdAt) }}</span>
        <span class="px-2 py-1 bg-pastel-pink text-white text-xs rounded-full">
          {{ blog.category }}
        </span>
      </div>
      <h3 class="text-xl font-semibold mb-2 line-clamp-2">{{ blog.title }}</h3>
      <p class="text-gray-600 line-clamp-3">{{ blog.content }}</p>
      <div class="mt-4 flex items-center justify-between">
        <span class="text-sm text-gray-500">Tác giả: {{ blog.author.username }}</span>
        <router-link 
          :to="`/blog/${blog._id}`"
          class="text-pastel-pink hover:text-pink-600 font-medium"
        >
          Đọc thêm
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { formatDate } from '../utils/dateFormat'

defineProps({
  blog: {
    type: Object,
    required: true
  }
})
</script>