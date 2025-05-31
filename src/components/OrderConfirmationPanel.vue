<script setup>
import { useCartStore } from '@/store/cart.js'
import { useModalTransition } from '@/composables/useModalTransition'
import { onMounted, onBeforeUnmount } from 'vue'
import Button from './reusable/Button.vue'
import Icon from './reusable/Icon.vue'
import "@/assets/styles/components/panels.css"

const props = defineProps({ show: Boolean, choice: Object })
const emit = defineEmits(['close'])

const close = () => {
  emit('close')
}

const startNewOrder = () => {
  cart.clearCart()
  emit('close')
}

const cart = useCartStore()

const { isVisible, readyToRender } = useModalTransition(() => props.show)

const getImage = (path) => {
  if (!path) return ''
  return new URL(`../assets/images/${path}`, import.meta.url).href
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
})

function handleKeydown(event) {
  if (event.key === 'Escape' && props.show) {
    close()
  }
}
</script>

<template>
  <teleport to="body">
    <div v-if="isVisible">
      <transition name="fade">
        <div
          v-if="readyToRender"
          class="backdrop"
          @click.self="close"
        ></div>
      </transition>
      <transition name="slide-up">
        <div
          v-if="readyToRender"
          class="panel"
        >
          <Icon
            v-if="cart.totalQuantity"
            icon="icon-order-confirmed"
            class="order-confirmed-icon"
          />
          <h2>
            Order <br />
            <span>Confirmed</span>
          </h2>
          <p class="sub-header">We hope you enjoy your food!</p>
          <div class="breakdown-wrapper">
            <ul class="list-breakdown-wrapper">
              <li v-for="item in cart.items" :key="item.name" class="item-line">
                <img
                  :src="getImage(item.image.mobile)"
                  :alt="item.name"
                  class="item-image"
                />
                <div class="item-description-wrapper">
                  <span class="item-name">{{ item.name.length > 19 ? item.name.slice(0, 20) + '…' : item.name }}</span>
                  <p class="panel-quantity-wrapper">
                    <span class="item-quantity">{{ item.quantity }}x</span> @ ${{ item.price.toFixed(2) }}
                  </p>
                </div>
                <span class="item-quantity-total">${{ (item.price * item.quantity).toFixed(2) }}</span>
              </li>
            </ul>
            <div class="order-total-wrapper">
              <span class="order-total-copy">Order Total</span>
              <span class="order-total">${{ cart.totalPrice.toFixed(2) }}</span>
            </div>
          </div>
          <Button 
            text="Start New Order"
            textSize="17"
            class="confirm-order"
            @click="startNewOrder"
          />
        </div>
      </transition>
    </div>
  </teleport>
</template>