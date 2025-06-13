<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
      <h1 class="text-3xl font-bold text-pastel-pink mb-8">
        {{ isEditing ? 'Chỉnh sửa bài viết' : 'Thêm bài viết mới' }}
      </h1>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Tiêu đề</label>
          <input
            v-model="formData.title"
            type="text"
            required
            class="w-full p-2 border rounded focus:ring-2 focus:ring-pastel-pink focus:outline-none"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Danh mục</label>
          <select
            v-model="formData.category"
            required
            class="w-full p-2 border rounded focus:ring-2 focus:ring-pastel-pink focus:outline-none"
          >
            <option value="Công thức">Công thức</option>
            <option value="Mẹo làm bánh">Mẹo làm bánh</option>
            <option value="Tin tức">Tin tức</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Ảnh bìa (URL)</label>
          <input
            v-model="formData.image"
            type="url"
            required
            class="w-full p-2 border rounded focus:ring-2 focus:ring-pastel-pink focus:outline-none"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Nội dung</label>
          <textarea
            v-model="formData.content"
            rows="10"
            required
            class="w-full p-2 border rounded focus:ring-2 focus:ring-pastel-pink focus:outline-none"
          ></textarea>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Tags (phân cách bằng dấu phẩy)</label>
          <input
            v-model="tagsInput"
            type="text"
            class="w-full p-2 border rounded focus:ring-2 focus:ring-pastel-pink focus:outline-none"
            placeholder="bánh ngọt, chocolate, công thức"
          />
        </div>

        <div class="flex justify-end space-x-4">
          <button
            type="button"
            @click="router.push('/admin/blogs')"
            class="px-4 py-2 border rounded-md hover:bg-gray-100"
          >
            Hủy
          </button>
          <button
            type="submit"
            class="px-4 py-2 bg-pastel-pink text-white rounded-md hover:bg-pink-600"
            :disabled="blogStore.isLoading"
          >
            {{ isEditing ? 'Cập nhật' : 'Tạo bài viết' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useBlogStore } from '../stores/blog'

const route = useRoute()
const router = useRouter()
const blogStore = useBlogStore()

const isEditing = computed(() => route.params.id)
const formData = ref({
  title: '',
  category: 'Công thức',
  image: '',
  content: '',
  tags: []
})
const tagsInput = ref('')

onMounted(async () => {
  if (isEditing.value) {
    try {
      const blog = await blogStore.getBlogById(route.params.id)
      if (blog) {
        formData.value = {
          title: blog.title,
          category: blog.category,
          image: blog.image,
          content: blog.content,
          tags: blog.tags || []
        }
        tagsInput.value = blog.tags?.join(', ') || ''
      }
    } catch (error) {
      router.push('/admin/blogs')
    }
  }
})

async function handleSubmit() {
  try {
    const blogData = {
      ...formData.value,
      tags: tagsInput.value.split(',').map(tag => tag.trim()).filter(tag => tag)
    }

    if (isEditing.value) {
      await blogStore.updateBlog(route.params.id, blogData)
    } else {
      await blogStore.createBlog(blogData)
    }

    router.push('/admin/blogs')
  } catch (error) {
    // Xử lý lỗi
  }
}
</script>