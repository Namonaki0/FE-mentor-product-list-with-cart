<script setup>
import { ref } from 'vue'
import choices from '@/data/data.json'
import ChoiceCard from '@/components/ChoiceCard.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import MobileCartBar from '@/components/MobileCartBar.vue'
import OrderConfirmationPanel from '../components/OrderConfirmationPanel.vue'

const showConfirmation = ref(false)

const confirmOrder = () => {
  showConfirmation.value = true
}
</script>

<template>
  <DefaultLayout>
    <h1 class="font-default">Desserts</h1>

    <div>
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
</style>