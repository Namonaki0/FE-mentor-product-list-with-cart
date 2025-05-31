<script setup>
import { useCartStore } from '@/store/cart.js'
import Button from './reusable/Button.vue'
import QuantityButton from './reusable/QuantityButton.vue'
import "@/assets/styles/components/cards.css"

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
  <div class="choice-wrapper">
    <div class="image-wrapper">
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
          class="choice-image"
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
      <p class="category">
        {{ choice.category }}
      </p>
      <h3 class="name">{{ choice.name }}</h3>
      <p class="price">${{ choice.price.toFixed(2) }}</p>
    </div>
  </div>
</template>