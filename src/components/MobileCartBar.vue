<script setup>
import { useCartStore } from '@/store/cart.js'
const props = defineProps({ choice: Object })
const cart = useCartStore()

const removeItem = (name) => {
  cart.removeItem(name)
}
</script>

<template>
    <div class="p-4 mt-6 rounded-xl md:hidden">
      <h2 class="text-xl font-bold text-red-700 mb-4">Your Cart ({{ cart.totalQuantity }})</h2>
      
      <ul class="divide-y divide-gray-200 mb-4">
        <li v-for="item in cart.items" :key="item.name" class="py-3 flex justify-between items-start text-sm">
          <div class="flex-1">
            <p class="text-red-700 font-semibold">{{ item.quantity }}x @ ${{ item.price.toFixed(2) }}</p>
            <p class="text-gray-800">{{ item.name }}</p>
          </div>
          <button @click="removeItem(item.name)">
            <span class="text-gray-400 text-lg">✕</span>
          </button>
        </li>
      </ul>
  
      <div class="flex justify-between font-semibold text-base mb-3">
        <span>Order Total</span>
        <span>${{ cart.totalPrice.toFixed(2) }}</span>
      </div>
  
      <div class="flex items-center gap-2 bg-[#f7f4ed] px-3 py-2 rounded-lg text-sm text-gray-700 mb-4">
        <img src="@/assets/images/icon-carbon-neutral.svg" alt="carbon neutral" class="w-4 h-4" />
        <span>This is a <strong class="font-semibold">carbon-neutral</strong> delivery</span>
      </div>
  
      <button
        @click="$emit('confirm')"
        class="w-full bg-red-600 text-white text-center py-3 rounded-full font-semibold hover:bg-red-700 transition"
      >
        Confirm Order
      </button>
    </div>
  </template>
  