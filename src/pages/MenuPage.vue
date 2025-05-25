<script setup>
import { ref } from 'vue'
import ChoiceCard from '@/components/ChoiceCard.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import MobileCartBar from '@/components/MobileCartBar.vue'
import OrderConfirmationPanel from '../components/OrderConfirmationPanel.vue'

// Firestore database
import { useCollection } from 'vuefire'
import { collection } from 'firebase/firestore'
import { db } from '@/firebase'

const choices = useCollection(collection(db, 'desserts'))

const showConfirmation = ref(false)

const confirmOrder = () => {
  showConfirmation.value = true
}
</script>

<template>
  <DefaultLayout>
    <div class="container">
      <h1 class="font-default">Desserts</h1>
      <ChoiceCard
        v-for="choice in choices"
        loading="lazy"
        :key="choice.name"
        :choice="choice"
      />
    </div>

    <MobileCartBar @confirm="confirmOrder" />

    <OrderConfirmationPanel :show="showConfirmation" @close="showConfirmation = false" />
  </DefaultLayout>
</template>


<style scoped>
.font-default {
  font-family: 'Red Hat Text Regular', sans-serif;
}
@media (min-width: 1024px) {
  .container {
    display: grid;
    grid-template-columns: auto auto auto;
    gap: 10px 20px;
    margin-right: 20px;
  }
  h1 {
    grid-column: span 3;
  }
}
</style>