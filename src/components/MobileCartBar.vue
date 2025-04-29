<script setup>
import { useCartStore } from '@/store/cart.js'
import Button from './reusable/Button.vue'
import Icon from './reusable/Icon.vue'

const props = defineProps({ choice: Object })
const cart = useCartStore()

const removeItem = (name) => {
  cart.removeItem(name)
}
</script>

<template>
    <div class="p-4 mt-6 rounded-xl md:hidden card-wrapper">
      <h2 class="text-xl font-bold mb-4">Your Cart ({{ cart.totalQuantity }})</h2>
      <ul class="divide-y divide-gray-200 mb-4">
        <li v-for="item in cart.items" :key="item.name" class="py-3 flex justify-between items-start text-sm">
          <div class="flex-1">
            <p class="text-gray-800">{{ item.name }}</p>
            <div class="quantity-price-wrapper">
              <p class="text-red-700 font-semibold text-xs">
                {{ item.quantity }}x @ ${{ item.price.toFixed(2) }}
              </p>
              <p class="text-gray-800 font-semibold text-sm">
                ${{ (item.quantity * item.price).toFixed(2) }}
              </p>
              <Button
                class="remove-item-button"
                icon="icon-remove-item"
                @click="removeItem(item.name)"
              />
            </div>
          </div>
        </li>
      </ul>
      <div v-if="cart.totalPrice" class="flex justify-between font-semibold text-base mb-3">
        <span>Order Total</span>
        <span>${{ cart.totalPrice.toFixed(2) }}</span>
      </div>
      <div class="flex items-center gap-2 bg-[#f7f4ed] px-3 py-2 rounded-lg text-sm text-gray-700 mb-4 icon-wrapper">
        <Icon
          v-if="cart.totalQuantity"
          icon="icon-carbon-neutral"
          class="w-4 h-4"
        />
        <Icon
          v-else 
          icon="illustration-empty-cart"
          class="empty-cart"
        />
        <span v-if="cart.totalQuantity">This is a <strong class="font-semibold">carbon-neutral</strong> delivery</span>
        <span v-else class="empty-card-message">Your added items will appear here</span>
      </div>
      <Button 
        v-if="cart.totalQuantity"
        text="Confirm Order"
        class="confirm-order"
        @click="$emit('confirm')"
      />
    </div>
</template>
  
<style scoped>
.card-wrapper {
  border-radius: 6px;
  font-family: var(--font-default);
  padding: 25px 20px;
  background: white;
}
h2 {
  color: var(--red);
  margin: 0;
  margin-bottom: 25px;
}
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
.quantity-price-wrapper {
  display: flex;
}
.confirm-order:hover {
  background-color: var(--rose-700);
}
.icon-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.remove-item-button {
  all: unset;
  margin-left: auto;
}
.empty-cart {
  width: 100px;
  height: 100px;
}
.empty-card-message {
  color: var(--rose-400);
  font-size: 12px;
  font-weight: 700;
  margin-top: 15px;
} 
ul {
  list-style: none;
  padding: 0;
}
</style>