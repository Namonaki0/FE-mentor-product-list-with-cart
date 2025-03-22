import { createRouter, createWebHistory } from 'vue-router'
import MenuPage from '../pages/MenuPage.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'Menu', component: MenuPage }
  ]
})