<template>
  <div class="max-w-xs mx-auto">
    <label class="block text-gray-700 font-semibold mb-2" for="dueDate">
      Select Due Date
    </label>
    <div class="relative flex items-center">
      <VueDatePicker
        v-model="date"
        placeholder="Select due date"
        auto-apply
        emit-timezone="asia/kolkata"
        :max-date="new Date()"
        :clearable="false"
        :format="dateFormat" 
        class="w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-md shadow-sm py-2 text-gray-700 z-3"
      >
        <template #input-icon>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-calendar mr-5 pl-2"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
        </template>
      </VueDatePicker>
    </div>
  </div>
</template>

<script setup lang="ts">
import VueDatePicker from "@vuepic/vue-datepicker"
import "@vuepic/vue-datepicker/dist/main.css"

const props = defineProps({
  dateFormat:{
    type:String,
    default:'yyyy-MM-dd'
  }
})

const date = defineModel('date',{
  set(value) {
    return value
    ? new Date(value).toLocaleDateString('en-CA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
    : 'No date selected';
  }
});

</script>

<style scoped></style>

