<template>
  <div class="container mx-auto px-4 py-6 sm:py-8">
    <div class="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-8">
      <h1 class="text-2xl sm:text-3xl font-bold text-pastel-pink mb-4 sm:mb-0">Quản lý bài viết</h1>
      <router-link
        to="/admin/blogs/create"
        class="bg-pastel-pink text-white px-3 py-2 sm:px-4 sm:py-2 rounded-md hover:bg-pink-600 transition-colors text-sm sm:text-base"
      >
        Thêm bài viết mới
      </router-link>
    </div>

    <!-- Tìm kiếm và lọc -->
    <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8">
      <input
        v-model="blogStore.searchQuery"
        placeholder="Tìm kiếm bài viết..."
        class="flex-1 p-2 border rounded focus:ring-2 focus:ring-pastel-pink focus:outline-none text-sm sm:text-base"
      />
      <select
        v-model="blogStore.selectedCategory"
        class="p-2 border rounded focus:ring-2 focus:ring-pastel-pink focus:outline-none text-sm sm:text-base"
      >
        <option value="">Tất cả danh mục</option>
        <option value="Công thức">Công thức</option>
        <option value="Mẹo làm bánh">Mẹo làm bánh</option>
        <option value="Tin tức">Tin tức</option>
      </select>
    </div>

    <!-- Danh sách bài viết -->
    <div v-if="blogStore.isLoading" class="flex justify-center items-center h-64">
      <div class="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-t-2 border-b-2 border-pastel-pink"></div>
    </div>

    <div v-else-if="blogStore.error" class="text-center py-8 text-red-500 text-sm sm:text-base">
      {{ blogStore.error }}
    </div>

    <div v-else-if="blogStore.filteredBlogs.length === 0" class="text-center py-8 text-gray-500 text-sm sm:text-base">
      Không có bài viết nào.
    </div>

    <div v-else>
      <!-- Danh sách thẻ trên di động -->
      <div class="sm:hidden px-4 py-4 space-y-4">
        <div v-for="blog in blogStore.filteredBlogs" :key="blog._id" class="border rounded-lg p-4 bg-white shadow-sm">
          <div class="flex items-center mb-3">
            <img 
              :src="blog.image" 
              class="h-8 w-8 rounded-md object-cover mr-3" 
              alt="Blog image"
              @error="handleImageError"
            />
            <div>
              <div class="text-sm font-medium text-gray-900">{{ blog.title }}</div>
            </div>
          </div>
          <div class="text-xs text-gray-900 mb-2">
            <span class="px-2 py-1 text-xs font-medium bg-pastel-pink text-white rounded-full">
              {{ blog.category }}
            </span>
          </div>
          <div class="text-xs text-gray-500 mb-2">{{ formatDate(blog.createdAt) }}</div>
          <div class="text-xs text-gray-500 mb-3">{{ blog.author.username }}</div>
          <div class="flex flex-wrap gap-2">
            <router-link
              :to="`/admin/blogs/edit/${blog._id}`"
              class="text-indigo-600 hover:text-indigo-900 text-xs transition-colors duration-200"
            >
              Sửa
            </router-link>
            <button
              @click="handleDelete(blog._id)"
              class="text-red-600 hover:text-red-900 text-xs transition-colors duration-200"
            >
              Xóa
            </button>
          </div>
        </div>
      </div>

      <!-- Danh sách bảng trên màn hình lớn -->
      <div class="hidden sm:block bg-white rounded-lg shadow overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tiêu đề</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Danh mục</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày tạo</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tác giả</th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="blog in blogStore.filteredBlogs" :key="blog._id" class="hover:bg-gray-50">
              <td class="px-6 py-4">
                <div class="flex items-center">
                  <img 
                    :src="blog.image" 
                    class="h-10 w-10 rounded-md object-cover mr-3" 
                    alt="Blog image"
                    @error="handleImageError"
                  />
                  <div class="text-sm font-medium text-gray-900">{{ blog.title }}</div>
                </div>
              </td>
              <td class="px-6 py-4">
                <span class="px-2 py-1 text-xs font-medium bg-pastel-pink text-white rounded-full">
                  {{ blog.category }}
                </span>
              </td>
              <td class="px-6 py-4 text-sm text-gray-500">
                {{ formatDate(blog.createdAt) }}
              </td>
              <td class="px-6 py-4 text-sm text-gray-500">
                {{ blog.author.username }}
              </td>
              <td class="px-6 py-4 text-right text-sm font-medium">
                <router-link
                  :to="`/admin/blogs/edit/${blog._id}`"
                  class="text-indigo-600 hover:text-indigo-900 mr-4"
                >
                  Sửa
                </router-link>
                <button
                  @click="handleDelete(blog._id)"
                  class="text-red-600 hover:text-red-900"
                >
                  Xóa
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useBlogStore } from '../stores/blog'
import { formatDate } from '../utils/dateFormat'
import { useRouter } from 'vue-router'

const blogStore = useBlogStore()
const router = useRouter()

onMounted(() => {
  blogStore.fetchBlogs()
})

async function handleDelete(id) {
  if (confirm('Bạn có chắc chắn muốn xóa bài viết này?')) {
    try {
      await blogStore.deleteBlog(id)
      // Có thể thêm thông báo thành công ở đây
    } catch (error) {
      // Xử lý lỗi
    }
  }
}

function handleImageError(e) {
  e.target.src = 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'
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