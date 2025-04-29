<script setup>
import Icon from './Icon.vue'

const props = defineProps({
  icon: { type: String, default: null },
  iconPosition: { type: String, default: 'left' },
  text: { type: String, default: null },
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
    class="inline-flex items-center justify-center gap-2 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
  >
    <Icon 
        v-if="icon && text && iconPosition === 'left'"
        :icon="icon"
        :position="iconPosition"
    />

    <span v-if="text && !loading">{{ text }}</span>
    <span v-if="loading" class="text-xs italic text-gray-400">Loading...</span>

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

<style scoped>
button:hover,
button:focus {
  cursor: pointer;
}
img {
    width: 18px;
}
span {
    font-family: var(--font-default);
    font-size: 12px;
}
.no-text {
    margin: 0;
}
</style>
