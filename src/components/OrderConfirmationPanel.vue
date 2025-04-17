<script setup>
  import { useCartStore } from '@/store/cart.js'
  const props = defineProps({ show: Boolean })
  const emit = defineEmits(['close'])
  
  const cart = useCartStore()
  
  const close = () => {
    emit('close')
  }
  
  const startNewOrder = () => {
    cart.clearCart()
    emit('close')
  }
</script>
  
<template>
<transition name="fade">
    <div
    v-if="show"
    class="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center px-4"
    >
    <div v-if="show" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center px-4">
      <div class="bg-white rounded-xl w-full max-w-md p-6 shadow-xl text-center relative">
        <button @click="close" class="absolute top-4 right-4 text-gray-400 text-xl">×</button>
        <div class="text-green-600 text-4xl mb-4">✔️</div>
        <h2 class="text-2xl font-bold mb-1">Order Confirmed</h2>
        <p class="text-sm text-gray-600 mb-6">We hope you enjoy your food!</p>
  
        <div class="bg-[#fdfbf0] rounded-lg p-4 mb-6 text-left">
          <ul class="divide-y divide-gray-200 text-sm mb-4">
            <li v-for="item in cart.items" :key="item.name" class="py-3 flex justify-between">
              <span>{{ item.name }}</span>
              <span class="font-semibold">${{ (item.price * item.quantity).toFixed(2) }}</span>
            </li>
          </ul>
          <div class="flex justify-between font-semibold text-base">
            <span>Order Total</span>
            <span>${{ cart.totalPrice.toFixed(2) }}</span>
          </div>
        </div>
  
        <button @click="startNewOrder" class="bg-red-600 text-white w-full py-3 rounded-full hover:bg-red-700">
          Start New Order
        </button>
      </div>
    </div>
</div>
</transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>