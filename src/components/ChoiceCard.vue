<template>
  <div class="border rounded-2xl p-4 shadow hover:shadow-lg transition bg-white">
    <img
      :src="getImage(choice.image.thumbnail)"
      :alt="choice.name"
      class="rounded-xl mb-2 w-full object-cover"
    />
    <h3 class="font-semibold text-lg">{{ choice.name }}</h3>
    <p class="text-sm text-gray-600 mb-3">${{ choice.price.toFixed(2) }}</p>
    <button @click="addToCart" class="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition">
      Add to Cart
    </button>
  </div>
</template>

<script setup>
import { useCartStore } from '@/store/cart.js'
const props = defineProps({ choice: Object })
const cart = useCartStore()

const addToCart = () => {
  cart.addItem(props.choice)
}
const getImage = (path) => new URL(`../assets/images/${path}`, import.meta.url).href
</script>
