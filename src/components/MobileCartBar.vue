<script setup>
import { useCartStore } from '@/store/cart.js'
import Button from './reusable/Button.vue'
import Icon from './reusable/Icon.vue'
import "@/assets/styles/components/cart.css"

const props = defineProps({ choice: Object })
const cart = useCartStore()

const removeItem = (name) => {
  cart.removeItem(name)
}
</script>

<template>
    <div class="card-wrapper">
      <h2 class="card-title">Your Cart ({{ cart.totalQuantity }})</h2>
      <ul class="cart-items-list">
        <li v-for="item in cart.items" :key="item.name" class="item-breakdown-wrapper">
          <div>
            <p class="item-name">{{ item.name }}</p>
            <div class="quantity-price-wrapper">
              <p class="cart-quantity-wrapper">
                <span class="item-quantity">{{ item.quantity }}x</span> @ ${{ item.price.toFixed(2) }}
              </p>
              <p class="item-quantity-price">
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
      <div v-if="cart.totalPrice" class="cart-total-wrapper">
        <span class="order-total-copy">Order Total</span>
        <span class="order-total-amount">${{ cart.totalPrice.toFixed(2) }}</span>
      </div>
      <div class="order-icon" :class="cart.totalPrice ? 'has-items icon-carbon-neutral' : 'no-items'">
        <Icon
          v-if="cart.totalQuantity"
          icon="icon-carbon-neutral"
        />
        <Icon
          v-else 
          icon="illustration-empty-cart"
          class="empty-cart"
        />
        <span v-if="cart.totalQuantity">This is a <strong>carbon-neutral</strong> delivery</span>
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