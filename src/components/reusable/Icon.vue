<script setup>
import "@/assets/styles/components/icons.css"

const props = defineProps({
  icon: { type: String, default: null },
  position: { type: String, default: 'left' },
  noMargin: { type: Boolean, default: false }
})

const getIconPath = (icon) => {
  if (!icon) return ''
  return new URL(`../../assets/icons/${icon}.svg`, import.meta.url).href
}
</script>

<template>
    <template v-if="icon">
      <img
        :src="getIconPath(icon)"
        :alt="icon"
        :class="[
          !noMargin && position === 'left' ? 'icon-left' : '',
          !noMargin && position === 'right' ? 'icon-right' : ''
        ]"
      />
    </template>
</template>
