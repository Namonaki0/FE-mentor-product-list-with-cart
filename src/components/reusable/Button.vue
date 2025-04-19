<script setup>
const props = defineProps({
  icon: { type: String, default: null },
  iconPosition: { type: String, default: 'left' },
  text: { type: String, default: null },
  type: { type: String, default: 'button' },
  disabled: { type: Boolean, default: false },
  loading: { type: Boolean, default: false }
})

const emit = defineEmits(['click'])

const getIconPath = (icon) => {
  if (!icon) return ''
  return new URL(`../../assets/icons/${icon}.svg`, import.meta.url).href
}
</script>

<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    @click="$emit('click')"
    class="inline-flex items-center justify-center gap-2 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
  >
    <template v-if="icon && iconPosition === 'left'">
      <img :src="getIconPath(icon)" :alt="icon" class="w-4 h-4 icon-left" />
    </template>

    <span v-if="text && !loading">{{ text }}</span>
    <span v-if="loading" class="text-xs italic text-gray-400">Loading...</span>

    <template v-if="icon && iconPosition === 'right'">
      <img :src="getIconPath(icon)" alt="" class="w-4 h-4 icon-right" />
    </template>

    <slot />
  </button>
</template>

<style scoped>
img {
    width: 18px;
}
span {
    font-family: var(--font-default);
    font-size: 12px;
}
.icon-left {
    margin-right: 8px;
}
.icon-right {
    margin-left: 8px;
}
</style>
