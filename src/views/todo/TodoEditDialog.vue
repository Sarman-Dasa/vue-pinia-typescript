<template>
  <v-dialog v-model="isDialogOpen" max-width="500px">
    <v-card>
      <v-card-title>
        <span class="headline">Edit Todo</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="editedTodo.title"
            label="Title"
            :rules="[rules.required]"
          ></v-text-field>
          <v-textarea
            v-model="editedTodo.description"
            label="Description"
            :rules="[rules.required]"
            required
          ></v-textarea>
          <v-select
            v-model="editedTodo.priority"
            :items="priorityOptions"
            label="Priority"
            :rules="[rules.required]"
          ></v-select>
          <v-select
            v-model="editedTodo.stage"
            :items="todoStageOptions"
            label="stage"
            :rules="[rules.required]"
          ></v-select>
        </v-form>
        <Calendar v-model:date="editedTodo.dueDate"/>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="close">Cancel</v-btn>
        <v-btn @click="save" :disabled="!valid">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, watch, computed } from "vue";
import { TaskStage, type Task } from "@/types/task";

const props = defineProps<{
  todo: Task;
  dialog: boolean;
}>();

const emit = defineEmits<{
  (e: "close"): void;
  (e: "update", todo: Task): void;
}>();

const editedTodo = ref({ ...props.todo });

const valid = ref(false);
const isDialogOpen = ref(props.dialog);
const rules = {
  required: (value: Task) => !!value || "Required.",
};
const priorityOptions = ["High", "Medium", "Low"];
const todoStageOptions: TaskStage[] = [
  TaskStage.TODO,
  TaskStage.IN_PROGRESS,
  TaskStage.DONE,
];

// Watch for prop changes and update the editedTodo
watch(
  () => props.todo,
  (newTodo) => {
    editedTodo.value = { ...newTodo };
  }
);

// Method to close the dialog
const close = () => {
  emit("close");
};

// Method to save the updated todo
const save = () => {
  emit("update", editedTodo.value);
  close();
};
</script>

<style scoped></style>
