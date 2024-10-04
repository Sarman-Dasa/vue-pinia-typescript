<template>
  <v-container>
    <v-row>
      <!-- List of Books -->
      <v-col v-for="(todo ) in todos" :key="todo.id" cols="12" lg="3" md="3">
        <TodoCardView :todo="todo" @edit="emit('edit',$event)" @delete="emit('delete',$event)" @update-stage="$emit('updateStage',$event)"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { type Task } from "@/types/task";
import { type PropType } from "vue";
import TodoCardView from "@/components/TodoCardView.vue";

const props = defineProps({
  todos: {
    type: Object as PropType<Task[]>,
    required: true,
  },
});

const emit = defineEmits(["edit", "delete", "updateStage"]);
</script>

<style scoped>
.v-list-item-icon {
  font-size: 12px;
}
</style>
