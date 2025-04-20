<script setup>
const props = defineProps({
  icon: { type: String, default: null },
  position: { type: String, default: 'left' }
})

const getIconPath = (icon) => {
  if (!icon) return ''
  return new URL(`../../assets/icons/${icon}.svg`, import.meta.url).href
}
</script>

<template>
    <template v-if="icon">
      <img :src="getIconPath(icon)" :alt="icon" :class="['w-4 h-4', `icon-${position}`]" />
    </template>
</template>

<style scoped>
img {
    width: 18px;
}
.icon-left {
    margin-right: 8px;
}
.icon-right {
    margin-left: 8px;
}
</style>
