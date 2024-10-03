<template>
  <v-container>
    <v-row>
      <!-- List of Books -->
      <v-col v-for="(todo, i) in todos" :key="todo.id" cols="12" lg="3" md="3">
        <v-card
          :color="getPriorityColor(todo.priority)"
          class="mx-auto"
        >
          <!-- <div></div> -->
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
              v-model="todo.completed"
              :color="getPriorityColor(todo.priority)"
              :label="todo.completed ? 'Done' : 'mark as done'"
              :value="true"
              hide-details
              @change="emit('updateStage',todo)"
            ></v-switch>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { type Task } from "@/types/task";
import { type PropType } from "vue";

const props = defineProps({
  todos: {
    type: Object as PropType<Task[]>,
    required: true,
  },
});

const emit = defineEmits(["edit", "delete",'updateStage']);

function getPriorityColor(priority: String) {
  switch (priority) {
    case 'High':
      return '#dc7878'; // Red for high priority
    case 'Medium':
      return '#c1e8a8'; // Green for medium priority
    case 'Low':
      return '#646691dd'; // Yellow for low priority
    default:
      return '#FFFFFF'; // Default color (white)
  }
}



// const emit = defineEmits<{
//   edit: [todo: PropType<Task[]>]
//   delete: [id: string]
// }>()
</script>

<style scoped>
.v-list-item-icon {
  font-size: 12px;
}
</style>
