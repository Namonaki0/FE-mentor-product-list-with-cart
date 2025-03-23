<template>
  <DefaultLayout>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <ChoiceCard
        v-for="choice in choices"
        loading="lazy"
        :key="choice.name"
        :choice="choice"
      />
    </div>
  </DefaultLayout>
</template>

<script setup>
import choices from '@/data/data.json'
import ChoiceCard from '@/components/ChoiceCard.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
</script>
