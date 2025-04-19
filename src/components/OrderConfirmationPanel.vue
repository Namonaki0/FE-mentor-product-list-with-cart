<script setup>
  import { useCartStore } from '@/store/cart.js'
  import Button from './reusable/button.vue'
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
    <teleport to="body">
        <div
          v-if="show"
          class="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center px-4 backdrop"
          @click.self="close"
        >
        <transition name="slide-up">
          <div class="bg-white rounded-xl w-full max-w-md p-6 shadow-xl text-center relative panel">
          <Button 
            text="X"
            @click="close()"
          />
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
            <Button 
              text="Start New Order"
              @click="startNewOrder"
            />
          </div>
        </transition>
        </div>
    </teleport>
</template>  

<style scoped>
.panel {
  position: absolute;
  background-color: white;
  left: 0;
  right: 0;
  bottom: 0;
  transform: translateY(0%);
}

.backdrop {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
  pointer-events: auto;
}

.backdrop::before {
  content: '';
  position: absolute;
  inset: 0;
  background-color: black;
  opacity: 0.5;
  z-index: -1;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.4s ease, opacity 0.3s ease;
}
.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
.slide-up-enter-to,
.slide-up-leave-from {
  transform: translateY(0);
  opacity: 1;
}
</style>