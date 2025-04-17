import { createRouter, createWebHistory } from 'vue-router'
import MenuPage from '../pages/MenuPage.vue'
import OrderConfirmationPanel from '../components/OrderConfirmationPanel.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'Menu', component: MenuPage },
    { path: '/order-confirmed', name: 'OrderConfirmationPanel', component: OrderConfirmationPanel }
  ]
})
