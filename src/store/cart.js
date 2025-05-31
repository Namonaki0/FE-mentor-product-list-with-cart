import { defineStore } from 'pinia'

const STORAGE_KEY = 'cart-items'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  }),
  getters: {
    count: (state) => state.items.reduce((a, i) => a + i.quantity, 0),
    total: (state) => state.items.reduce((a, i) => a + i.price * i.quantity, 0),
    totalQuantity: (state) => state.items.reduce((a, i) => a + i.quantity, 0),
    totalPrice: (state) => state.items.reduce((a, i) => a + i.price * i.quantity, 0)
  },
  actions: {
    saveCart() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items))
    },
    addItem(item) {
      const existing = this.items.find(i => i.name === item.name)
      if (existing) existing.quantity++
      else this.items.push({ ...item, quantity: 1 })
      this.saveCart()
    },   
    removeItem(name) {
      this.items = this.items.filter(item => item.name !== name)
      this.saveCart()
    },
    removeOne(name) {
      const item = this.items.find(i => i.name === name)
      if (!item) return
      if (item.quantity > 1) {
        item.quantity--
      } else {
        this.removeItem(name)
        return
      }
      this.saveCart()
    },
    clearCart() {
      this.items = []
      this.saveCart()
    }
  }
})