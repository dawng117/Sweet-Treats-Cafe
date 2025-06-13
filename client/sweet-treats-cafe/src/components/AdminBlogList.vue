<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold text-pastel-pink">Quản lý bài viết</h1>
      <router-link
        to="/admin/blogs/create"
        class="bg-pastel-pink text-white px-4 py-2 rounded-md hover:bg-pink-600 transition-colors"
      >
        Thêm bài viết mới
      </router-link>
    </div>

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

    <div v-else class="bg-white rounded-lg shadow overflow-hidden">
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
                <img :src="blog.image" class="h-10 w-10 rounded-md object-cover mr-3" />
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
</script>