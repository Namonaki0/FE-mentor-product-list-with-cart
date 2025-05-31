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
        <li v-for="item in cart.items" :key="item.name" class="py-3 flex justify-between items-start text-sm item-breakdown-wrapper">
          <div class="flex-1">
            <p class="text-gray-800 item-name">{{ item.name }}</p>
            <div class="quantity-price-wrapper">
              <p class="text-red-700 font-semibold text-xs item-quantity-wrapper">
                <span class="item-quantity">{{ item.quantity }}x</span> @ ${{ item.price.toFixed(2) }}
              </p>
              <p class="text-gray-800 font-semibold text-sm item-quantity-price">
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
      <div v-if="cart.totalPrice" class="flex justify-between font-semibold text-base mb-3 order-total-wrapper">
        <span class="order-total-copy">Order Total</span>
        <span class="order-total-amount">${{ cart.totalPrice.toFixed(2) }}</span>
      </div>
      <div class="flex items-center gap-2 bg-[#f7f4ed] px-3 py-2 rounded-lg text-sm text-gray-700 mb-4 order-icon" :class="cart.totalPrice ? 'has-items icon-carbon-neutral' : 'no-items'">
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
        textSize="16"
        class="confirm-order"
        @click="$emit('confirm')"
      />
    </div>
</template>
  
<style scoped>
.card-wrapper {
  border-radius: 10px;
  font-family: var(--font-default);
  padding: 25px 20px;
  background: white;
}
.item-breakdown-wrapper {
  border-bottom: 1px solid rgba(201, 174, 166, 0.403);
  padding-bottom: 5px;
  margin-bottom: 20px;
}
h2 {
  color: var(--red);
  margin: 0;
  margin-bottom: 30px;
}
.confirm-order {
  font-family: var(--font-default);
  background-color: var(--red);
  color: white;
  padding: 16px 0px;
  font-size: 16px;
  border-radius: 25px;
  width: 100%;
  border: none;
  transition: background-color 0.3s ease;
}
.confirm-order:hover,
.confirm-order:focus {
  background-color: var(--active-state);
}
.quantity-price-wrapper {
  display: flex;
  color: var(--rose-400);
  font-size: 18px;
}
.order-icon {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;    
  padding: 20px 10px;
  border-radius: 5px;
  margin-bottom: 25px;
}
.icon-carbon-neutral {
  background: var(--rose-50);
}
.no-items {
  flex-direction: column;
}
.has-items {
  flex-direction: row;
}
.remove-item-button {
  margin-left: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 1px solid var(--rose-400);
  border-radius: 50%;
  width: 15px;
  height: 15px;
  padding: 8px;
  background: none;
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
.item-quantity-wrapper {
  margin-right: 10px;
}
.item-quantity {
  color: var(--red);
  font-weight: 700;
  margin-right: 14px;
}
.item-quantity-price {
  color: var(--rose-400);
  font-weight: 700;
}
.item-name {
  color: var(--rose-700);
  font-weight: 700;
  font-size: 18px;
  margin: 0;
}
.order-total-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0 26px;
}
.order-total-amount {
  font-size: 24px;
  font-weight: 700;
}
@media (min-width: 1024px) {
  .card-wrapper {
      min-width: 350px;
      height: max-content;
      position: sticky;
      top: 15px;
  }
}
</style>