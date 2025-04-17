import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({ items: [] }),
  getters: {
    count: (state) => state.items.reduce((a, i) => a + i.quantity, 0),
    total: (state) => state.items.reduce((a, i) => a + i.price * i.quantity, 0),
    totalQuantity: (state) => state.items.reduce((a, i) => a + i.quantity, 0),
    totalPrice: (state) => state.items.reduce((a, i) => a + i.price * i.quantity, 0)
  },
  actions: {
    addItem(item) {
      const existing = this.items.find(i => i.name === item.name)
      if (existing) existing.quantity++
      else this.items.push({ ...item, quantity: 1 })
    },
    removeItem(name) {
      this.items = this.items.filter(item => item.name !== name)
    },
    clearCart() {
      this.items = []
    }
  }
})