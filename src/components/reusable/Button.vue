<script setup>
import Icon from './Icon.vue'
import "@/assets/styles/components/buttons.css"

const props = defineProps({
  icon: { type: String, default: null },
  iconPosition: { type: String, default: 'left' },
  text: { type: String, default: null },
  textSize: { type: Number, default: 12 },
  type: { type: String, default: 'button' },
  disabled: { type: Boolean, default: false },
  loading: { type: Boolean, default: false }
})

const emit = defineEmits(['click'])
</script>

<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    @click="$emit('click')"
  >
    <Icon 
        v-if="icon && text && iconPosition === 'left'"
        :icon="icon"
        :position="iconPosition"
    />

    <span v-if="text && !loading" :style="{ fontSize: textSize + 'px', letterSpacing: textSize > 12 ? '1px' : '0px'}">{{ text }}</span>
    <span v-if="loading">Loading...</span>

    <Icon 
        v-if="icon && text && iconPosition === 'right'"
        :icon="icon"
        :position="iconPosition"
    />

    <Icon 
        v-if="icon && !text"
        :icon="icon"
        :position="iconPosition"
        class="no-text"
    />

    <slot />
  </button>
</template>
