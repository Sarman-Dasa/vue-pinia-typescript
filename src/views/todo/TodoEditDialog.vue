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
                label="Due date"
                readonly
                :value="formattedDueDate"
                v-bind="props"
                v-on="props"
              ></v-text-field>
            </template>

            <v-date-picker
              locale="en-IN"
              v-model="editedTodo.dueDate"
              no-title
              @input="dueDateMenu = false"
            ></v-date-picker>
          </v-menu>
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
      </v-card-text>
      <v-card-actions>
        <v-btn text @click="close">Cancel</v-btn>
        <v-btn text @click="save" :disabled="!valid">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, watch, computed } from "vue";
import { TaskStage, type Task } from "@/types/task";
import { useDate } from "vuetify";

const props = defineProps<{
  todo: Task;
  dialog: boolean;
}>();

const emit = defineEmits<{
  (e: "close"): void;
  (e: "update", todo: Task): void;
}>();

const editedTodo = ref({ ...props.todo });
const formattedDueDate = ref(editedTodo.value.dueDate);
const date = useDate();

const dateString = editedTodo.value.dueDate?.toLocaleString();
const [day, month, year] = dateString.split("/"); // Split the string into components
const dueDate = new Date(year, month - 1, day);
editedTodo.value.dueDate = dueDate;

const valid = ref(false);
const dueDateMenu = ref(false);
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
  editedTodo.value.dueDate = formattedDueDate.value;
  emit("update", editedTodo.value);
  close();
};

const updateFormattedDate = (value: string | Date) => {
  const date = new Date(value);
  formattedDueDate.value = date.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  dueDateMenu.value = false; // Close the menu after selecting
};

watch(
  () => editedTodo.value.dueDate,
  (newDate) => {
    if (newDate) {
      updateFormattedDate(newDate);
    }
  }
);

// const minDate = computed(() => {
//   const today = new Date();
//   today.setDate(today.getDate() - 1); // Subtract 1 day
//   console.log('today: ', today);

//   // Format date as DD/MM/YYYY
//   const formattedYesterday = today.toLocaleDateString("en-CA");
//   console.log('formattedYesterday: ', formattedYesterday);
//   return { formattedYesterday };
// });
</script>

<style scoped></style>
