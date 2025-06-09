<template>
    <div class="bg-white p-4 rounded shadow hover:shadow-lg transition">
      <img :src="product.image" :alt="product.name" class="w-full h-48 object-cover rounded" />
      <h2 class="text-xl font-semibold mt-2">{{ product.name }}</h2>
      <p class="text-gray-600">{{ product.price }} VND</p>
      <button
        @click="$emit('add-to-cart', product)"
        class="bg-pastel-pink text-white px-4 py-2 mt-2 rounded w-full"
      >
        Add to Cart
      </button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      product: Object,
    },
  }
  </script>