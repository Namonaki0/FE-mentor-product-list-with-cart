<script setup>
import Icon from './Icon.vue'

const props = defineProps({
  quantity: { type: Number, required: true },
  onIncrease: { type: Function, required: true },
  onDecrease: { type: Function, required: true }
})
</script>

<template>
  <div class="quantity-button">
    <button @click="onDecrease" class="icon-btn">
      <Icon 
        icon="icon-decrement-quantity" 
        :noMargin="true" 
      />
    </button>
    <span class="qty">{{ quantity }}</span>
    <button @click="onIncrease" class="icon-btn">
      <Icon 
        icon="icon-increment-quantity" 
        :noMargin="true" 
      />
    </button>
  </div>
</template>

<style scoped>
img {
  width: 12px;
}
</style>