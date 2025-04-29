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
.quantity-button {
  font-family: inherit;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--red);
  color: white;
  padding: 6px 12px;
  border-radius: 18px;
  position: absolute;
  bottom: -22px;
  width: 35%;
  height: 28px;
}
.qty {
  font-size: 14px;
  margin: 0 12px;
  min-width: 1.5rem;
  text-align: center;
}
.icon-btn {
  background: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 1px solid white;
  border-radius: 50%;
  width: 15px;
  height: 15px;
  padding: 8px;
}
img {
  width: 12px;
}
</style>