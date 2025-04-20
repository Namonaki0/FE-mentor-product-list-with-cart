<script setup>
import { useCartStore } from '@/store/cart.js'
import Button from './reusable/button.vue'
import Icon from './reusable/Icon.vue'

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
          <Button 
            icon="icon-remove-item"
            @click="removeItem(item.name)"
          />
        </li>
      </ul>
      <div class="flex justify-between font-semibold text-base mb-3">
        <span>Order Total</span>
        <span>${{ cart.totalPrice.toFixed(2) }}</span>
      </div>
      <div class="flex items-center gap-2 bg-[#f7f4ed] px-3 py-2 rounded-lg text-sm text-gray-700 mb-4">
        <Icon 
          icon="icon-carbon-neutral"
          class="w-4 h-4"
        />
        <span>This is a <strong class="font-semibold">carbon-neutral</strong> delivery</span>
      </div>
      <Button 
        text="Confirm Order"
        class="confirm-order"
        @click="$emit('confirm')"
      />
    </div>
</template>
  
<style scoped>
  .confirm-order {
    font-family: var(--font-default);
    font-size: 12px;
    background-color: var(--red);
    color: white;
    padding: 12px 0px;
    border-radius: 18px;
    width: 100%;
    border: none;
  }
  .confirm-order:hover {
    background-color: var(--rose-700);
  }
</style>