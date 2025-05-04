<script setup>
import { useCartStore } from '@/store/cart.js'
import Button from './reusable/Button.vue'
import QuantityButton from './reusable/QuantityButton.vue'

const props = defineProps({ choice: Object })
const cart = useCartStore()

const addToCart = () => {
  cart.addItem(props.choice)
}

const getImage = (path) => {
  if (!path) return ''
  return new URL(`../assets/images/${path}`, import.meta.url).href
}


const increaseQuantity = () => {
  cart.addItem(props.choice)
}

const decreaseQuantity = () => {
  cart.removeOne(props.choice.name)
}

const getQuantity = () => {
  const item = cart.items.find(i => i.name === props.choice.name)
  return item?.quantity || 0
}
</script>

<template>
  <div class="border rounded-2xl p-4 shadow hover:shadow-lg transition bg-white choice-wrapper">
    <div class="image-wrapper border-b mb-3">
      <picture>
        <source
          :srcset="getImage(choice.image.desktop)"
          media="(min-width: 1024px)"
        />
        <source
          :srcset="getImage(choice.image.tablet)"
          media="(min-width: 768px)"
        />
        <source
          :srcset="getImage(choice.image.mobile)"
          media="(min-width: 480px)"
        />
        <img
          :src="getImage(choice.image.mobile)"
          :alt="choice.name"
          class="rounded-xl mb-2 w-full object-cover"
        />
      </picture>
      <QuantityButton
        v-if="getQuantity() > 0"
        :quantity="getQuantity()"
        :onIncrease="increaseQuantity"
        :onDecrease="decreaseQuantity"
      />
      <Button
        v-else
        icon="icon-add-to-cart"
        text="Add to Cart"
        class="add-to-cart"
        @click="addToCart"
      />
    </div>
    <div class="product-info-wrapper">
      <p class="bg-red-500 text-white text-xs px-2 rounded-full category">
        {{ choice.category }}
      </p>
      <h3 class="font-semibold text-lg name">{{ choice.name }}</h3>
      <p class="text-sm text-gray-600 price">${{ choice.price.toFixed(2) }}</p>
    </div>
  </div>
</template>

<style scoped>
.choice-wrapper {
  font-family: var(--font-default);
  margin-bottom: 22px;
}
.image-wrapper {
  border-radius: 10px;
  position: relative;
  border: 2px solid var(--rose-50);
  display: flex;
  align-items: center;
  flex-direction: column;
}
.image-wrapper:hover {
  border: 2px solid var(--red);
}
img {
  width: 100%;
  border-radius: 8px;
  display: block;
}
.add-to-cart {
  font-family: inherit;
  display: flex;
  position: absolute;
  align-items: center;
  justify-content: center;
  background: white;
  color: var(--rose-900);
  border: 1px solid hsla(14, 65%, 9%, 0.306);
  padding: 8px 10px;
  border-radius: 18px;
  bottom: -22px;
  width: 42%;
  height: 40px;
}
.category,
.name,
.price {
  margin: 0;
}
.product-info-wrapper {
  margin-top: 24px;
}
.category {
  color: var(--rose-400);
  margin-bottom: 5px;
}
.name {
  color: var(--rose-900);
  margin-bottom: 5px;
}
.price {
  color: var(--red);
}
.quantity-control {
  font-family: inherit;
  display: flex;
  align-items: center;
  background-color: var(--red);
  color: white;
  padding: 6px 16px;
  border-radius: 18px;
  position: absolute;
  bottom: -18px;
}
.qty {
  font-size: 14px;
  margin: 0 12px;
  min-width: 1.5rem;
  text-align: center;
}
.qty-btn {
  border: none;
  background: none;
  color: white;
  font-size: 8px;
  cursor: pointer;
  border: 1px solid white;
  border-radius: 50%;
}
</style>