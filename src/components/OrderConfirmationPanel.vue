<script setup>
import { useCartStore } from '@/store/cart.js'
import { useModalTransition } from '@/composables/useModalTransition'
import { onMounted, onBeforeUnmount } from 'vue'
import Button from './reusable/Button.vue'
import Icon from './reusable/Icon.vue'

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
    <div v-if="isVisible" class="fixed inset-0 z-50 flex items-center justify-center px-4">
      <transition name="fade">
        <div
          v-if="readyToRender"
          class="absolute inset-0 bg-black bg-opacity-50 backdrop"
          @click.self="close"
        ></div>
      </transition>
      <transition name="slide-up">
        <div
          v-if="readyToRender"
          class="bg-white rounded-xl w-full max-w-md p-6 shadow-xl text-center panel"
        >
          <Icon
            v-if="cart.totalQuantity"
            icon="icon-order-confirmed"
            class="w-4 h-4"
          />
          <h2 class="text-2xl font-bold mb-1">
            Order <br />
            <span>Confirmed</span>
          </h2>
          <p class="text-sm text-gray-600 mb-6 sub-header">We hope you enjoy your food!</p>

          <div class="bg-[#fdfbf0] rounded-lg p-4 mb-6 text-left item-breakdown-wrapper">
            <ul class="divide-y divide-gray-200 text-sm mb-4">
              <li v-for="item in cart.items" :key="item.name" class="py-3 flex justify-between item-line">
                <img
                  :src="getImage(item.image.mobile)"
                  :alt="item.name"
                  class="rounded-xl mb-2 w-full object-cover"
                />
                <div class="item-description-wrapper">
                  <span class="item-name">{{ item.name.length > 19 ? item.name.slice(0, 20) + '…' : item.name }}</span>
                  <p class="text-red-700 font-semibold text-xs item-quantity-wrapper">
                    <span class="item-quantity">{{ item.quantity }}x</span> @ ${{ item.price.toFixed(2) }}
                  </p>
                </div>
                <span class="font-semibold item-quantity-total">${{ (item.price * item.quantity).toFixed(2) }}</span>
              </li>
            </ul>
            <div class="flex justify-between font-semibold text-base order-total-wrapper">
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

<style scoped>
.panel {
  position: absolute;
  background-color: white;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 12px;
  padding: 28px 18px;
  font-family: var(--font-default);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  z-index: 100;
}
h2 {
  font-size: 43px;
  margin-top: 24px;
  margin-bottom: 0;
}
.sub-header {
  color: var(--rose-400);
  margin-top: 10px;
  margin-bottom: 35px;
}
img {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 5px;
  margin-right: 15px;
}
ul {
  list-style: none;
  padding: 10px 0 0;
  overflow-y: scroll;
  max-height: 306px;
  scrollbar-width: none;
  -ms-overflow-style: none;
}
ul::-webkit-scrollbar {
  display: none;
}
.item-line {
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(201, 174, 166, 0.403);
  padding: 16px 0;
}
.item-line:last-child {
  padding-bottom: 26px;
}
.item-breakdown-wrapper {
  font-family: var(--font-default);
  background-color: var(--rose-50);
  border-radius: 10px;
  padding: 0px 25px;
  margin-bottom: 32px;
}
.item-quantity-wrapper {
  margin: 12px 0 0;
  color: var(--rose-400)
}
.item-quantity {
  color: var(--red);
  margin-right: 10px;
}
.item-quantity-total {
  margin-left: auto;
}
.confirm-order {
  font-family: var(--font-default);
  background-color: var(--red);
  color: white;
  padding: 16px 0px;
  border-radius: 25px;
  width: 100%;
  border: none;
  transition: background-color 0.3s ease;
}
.confirm-order:hover,
.confirm-order:focus {
  background-color: var(--active-state);
}
.confirm-order span {
  font-size: 24px;
}
.order-total-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0 22px;
}
.order-total-copy {
  color: var(--rose-900);
}
.order-total {
  font-size: 28px;
  font-weight: 700;
}
.backdrop {
  position: fixed;
  inset: 0;
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.4s ease, opacity 0.4s ease;
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
@media (min-width: 1024px) {
  .panel {
    position: fixed;
    inset: 0;
    margin: auto;
    width: 500px;
    height: 500px;
    border-bottom-left-radius: 12px;
    border-radius: 12px 12px;
  }
  br {
    display: none;
  }
  ul {
    max-height: 120px
  }
}
</style>