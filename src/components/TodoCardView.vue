<template>
  <div :class="{ 'mt-5': isDraggableView }">
    <v-card :color="getPriorityColor(todo.priority)" class="mx-auto">
      <v-card-item>
        <div>
          <div class="text-overline mb-1"></div>
          <div class="text-h6 mb-1 justify-content-between d-flex">
            <span> {{ todo.title }}</span>
            <span> {{ todo.stage }}</span>
          </div>
          <div class="text-caption">{{ todo.description }}</div>
          <div class="text-end">{{ todo.priority }}</div>
          <div class="text-end">{{ todo.dueDate }}</div>
        </div>
      </v-card-item>

      <v-card-actions>
        <v-btn icon @click="emit('edit', todo)">
          <v-icon>mdi-pencil</v-icon></v-btn
        >
        <v-btn icon @click="emit('delete', todo.id)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
        <v-switch
          v-show="!isDraggableView"
          v-model="todo.completed"
          :color="getPriorityColor(todo.priority)"
          :label="todo.completed ? 'Done' : 'mark as done'"
          :value="true"
          hide-details
          @change="emit('updateStage', todo)"
        ></v-switch>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { type Task } from "@/types/task";
import { type PropType } from "vue";

const props = defineProps({
  todo: {
    type: Object as PropType<Task>,
    required: true,
  },
  isDraggableView: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["edit", "delete", "updateStage"]);

function getPriorityColor(priority: String) {
  switch (priority) {
    case "High":
      return "#dc7878"; // Red for high priority
    case "Medium":
      return "#c1e8a8"; // Green for medium priority
    case "Low":
      return "#646691dd"; // Yellow for low priority
    default:
      return "#FFFFFF"; // Default color (white)
  }
}
</script>

<style scoped></style>
