import { createApp } from 'vue'
import App from './App.vue'
import './assets/main.css'
import { createPinia } from 'pinia'
import router from './router'

import { VueFire, VueFireFirestoreOptionsAPI } from 'vuefire'
import { db } from '@/firebase'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(VueFire, {
  firebaseApp: db.app,
  modules: [VueFireFirestoreOptionsAPI()]
})

app.mount('#app')