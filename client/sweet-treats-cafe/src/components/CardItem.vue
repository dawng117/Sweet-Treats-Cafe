<template>
  <div class="flex items-start space-x-4">
    <!-- Thêm hình ảnh sản phẩm -->
    <div class="h-24 w-24 flex-shrink-0 rounded-md overflow-hidden bg-gray-100">
      <img :src="item.image" :alt="item.name" class="h-full w-full object-cover" />
    </div>
    
    <div class="flex-1 min-w-0">
      <h3 class="text-base font-medium text-gray-900">{{ item.name }}</h3>
      <p class="mt-1 text-sm text-gray-500">{{ formatPrice(item.price) }} VND</p>
      
      <div class="mt-2 flex items-center">
        <div class="flex items-center border border-gray-300 rounded-md">
          <button 
            @click="decreaseQuantity"
            class="px-3 py-1 text-gray-600 hover:bg-gray-100"
          >
            -
          </button>
          <span class="px-3 py-1 text-gray-700">{{ item.quantity }}</span>
          <button 
            @click="increaseQuantity"
            class="px-3 py-1 text-gray-600 hover:bg-gray-100"
          >
            +
          </button>
        </div>
        
        <button 
          @click="removeItem"
          class="ml-4 text-sm text-red-500 hover:text-red-700"
        >
          Xóa
        </button>
      </div>
      
      <div class="mt-3">
        <label :for="`notes-${item.productId}`" class="block text-sm font-medium text-gray-700 mb-1">Ghi chú</label>
        <textarea
          :id="`notes-${item.productId}`"
          v-model="notes"
          @change="updateNotes"
          placeholder="Thêm ghi chú cho món này"
          class="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-pastel-pink focus:border-pastel-pink"
          rows="2"
        ></textarea>
      </div>
    </div>
    
    <div class="text-right">
      <p class="text-base font-medium text-gray-900">
        {{ formatPrice(item.quantity * item.price) }} VND
      </p>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'

export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  
  emits: ['update-quantity', 'update-notes', 'remove-from-cart'],
  
  setup(props, { emit }) {
    const notes = ref(props.item.notes || '')
    
    watch(() => props.item.notes, (newNotes) => {
      notes.value = newNotes || ''
    })
    
    const increaseQuantity = () => {
      emit('update-quantity', props.item.productId, props.item.quantity + 1)
    }
    
    const decreaseQuantity = () => {
      if (props.item.quantity > 1) {
        emit('update-quantity', props.item.productId, props.item.quantity - 1)
      } else {
        emit('remove-from-cart', props.item.productId)
      }
    }
    
    const removeItem = () => {
      emit('remove-from-cart', props.item.productId)
    }
    
    const updateNotes = () => {
      emit('update-notes', props.item.productId, notes.value)
    }
    
    const formatPrice = (price) => {
      return price.toLocaleString('vi-VN')
    }
    
    return {
      notes,
      increaseQuantity,
      decreaseQuantity,
      removeItem,
      updateNotes,
      formatPrice
    }
  }
}
</script>