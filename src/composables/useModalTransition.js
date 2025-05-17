import { ref, watch, nextTick, onBeforeUnmount } from 'vue'

export function useModalTransition(show, delay = 400) {
  const isVisible = ref(false)
  const readyToRender = ref(false)

  watch(show, async (val) => {
    if (val) {
      isVisible.value = true
      await nextTick()
      readyToRender.value = true
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      readyToRender.value = false
      setTimeout(() => {
        isVisible.value = false
      }, delay)
    }
  })

  onBeforeUnmount(() => {
    document.body.style.overflow = ''
  })

  return { isVisible, readyToRender }
}