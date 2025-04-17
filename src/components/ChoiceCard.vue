<script setup>
import { useCartStore } from '@/store/cart.js'
const props = defineProps({ choice: Object })
const cart = useCartStore()

const addToCart = () => {
  cart.addItem(props.choice)
}
const getImage = (path) => {
  if (!path) return ''
  return new URL(`../assets/images/${path}`, import.meta.url).href
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
          :src="getImage(choice.image.desktop)"
          :alt="choice.name"
          class="rounded-xl mb-2 w-full object-cover"
        />
      </picture>
      <button @click="addToCart" class="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition">
        Add to Cart
      </button>
    </div>
    <p class="bg-red-500 text-white text-xs px-2 py-1 rounded-full mb-2">
      {{ choice.category }}
    </p>
    <h3 class="font-semibold text-lg">{{ choice.name }}</h3>
    <p class="text-sm text-gray-600 mb-3">${{ choice.price.toFixed(2) }}</p>
  </div>
</template>

<style scoped>
  .choice-wrapper {
    font-family: var(--font-default);
  }
  .image-wrapper {
    border-radius: 5px;
    position: relative;
  }
  .image-wrapper:hover {
    border: 2px solid var(--red);
  }
  img {
    width: 100%;
    border-radius: 5px;
    display: block;
  }
  button {
    position: absolute;
    bottom: -10px;
    left: 25%;
  }
</style>