<template>
  <v-container>
    <v-form ref="todoForm" v-model="isValid" @submit.prevent="submitForm">
      <v-text-field
        v-model="newTask.title"
        label="Title"
        :rules="[(v) => !!v || 'Title is required']"
        required
      ></v-text-field>

      <v-textarea
        v-model="newTask.description"
        label="Description"
        :rules="[(v) => !!v || 'Description is required']"
        required
      ></v-textarea>
      <v-select
        v-model="newTask.priority"
        :items="['Low', 'Medium', 'High']"
        label="Priority"
        required
      ></v-select>

      <v-menu
        v-model="dueDateMenu"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        max-width="290px"
        min-width="290px"
      >
        <template v-slot:activator="{ props }">
          <v-text-field
            label="From"
            readonly
            :value="formattedDueDate"
            v-bind="props"
            v-on="props"
          ></v-text-field>
        </template>
        <v-date-picker
          locale="en-IN"
          v-model="newTask.dueDate"
          no-title
          @input="dueDateMenu = false"
        ></v-date-picker>
      </v-menu>
      <v-btn color="primary" type="submit" :disabled="!isValid">Add Task</v-btn>
    </v-form>
  </v-container>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { type Task, TaskStage } from "@/types/task";
import { v4 as uuidv4 } from "uuid";
import { useTodoStore } from '@/stores/todo';

const todoStore = useTodoStore();

const newTask = ref<Task>({
  id: "test-1",
  title: "",
  description: "",
  completed: false,
  priority: "Low",
  dueDate: new Date(),
  stage: TaskStage.TODO,
  createdAt: new Date(),
  updatedAt: new Date(),
});
const isValid = ref(false);
const dueDateMenu = ref(false);
const formattedDueDate = ref("");

const updateFormattedDate = (value: string | Date) => {
  const date = new Date(value);
  formattedDueDate.value = date.toLocaleDateString("en-IN", {
    year: "numeric",
    month: '2-digit',
    day: '2-digit'
  });
  dueDateMenu.value = false; // Close the menu after selecting
};

watch(
  () => newTask.value.dueDate,
  (newDate) => {
    if (newDate instanceof Date) {
      updateFormattedDate(newDate);
    } else if (typeof newDate === 'string') {
      const parsedDate = new Date(newDate);
      updateFormattedDate(parsedDate);
    }
  }
);

const submitForm = () => {
  if (isValid.value) {
    let id = uuidv4();
    newTask.value.id = id;
    newTask.value.dueDate = formattedDueDate.value;
   
    todoStore.addNewTodo(newTask.value);
    // Reset the form
    // newTask.value.title = "";
    // newTask.value.description = "";
    // newTask.value.priority = "Low";
    // newTask.value.dueDate = undefined;
    // formattedDueDate.value = "";
  }
};
</script>

<style scoped>
.v-list-item-icon {
  font-size: 12px;
}
</style>
