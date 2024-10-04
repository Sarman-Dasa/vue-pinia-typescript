<template>
  <div class="flex justify-between items-end mb-4">
    <!-- Pagination on the right -->
    <v-pagination
      v-model="page"
      :length="count"
      class="my-4"
    ></v-pagination>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
const page = defineModel("page", { type: Number, default: 1 });
const props = defineProps({
  totalCount: {
    type: Number,
    default: 0,
  },
  perPage: {
    type: Number,
    default: 4,
  },
});

const count = computed(() => {
    return Math.ceil(props.totalCount / props.perPage)
})
</script>

<style scoped>
/* Add any specific styles you need */
</style>
