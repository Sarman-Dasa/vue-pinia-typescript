<template>
  <div>
    <List :todos="todoStore.todos" @edit="editTodo" @delete="deleteTodo" @update-stage="updateTodoStage"/>
    <todo-edit-dialog
      v-if="dialog"
      :todo="selectedTodo"
      :dialog="dialog"
      @close="dialog = false"
      @update="updateTodo"
    />
  </div>
</template>

<script setup lang="ts">
import List from "./List.vue";
import { useTodoStore } from "@/stores/todo";
import { ref } from "vue";
import type { Task } from "@/types/task";
import TodoEditDialog from "./TodoEditDialog.vue";
import Swal from "sweetalert2"

const todoStore = useTodoStore();
const todos = ref([]); // Your todos array
const dialog = ref(false);
const selectedTodo = ref<Task>();

// Update todo in the list
const updateTodo = (updatedTodoData: Task) => {
  console.log("updatedTodo: ", updatedTodoData);
  todoStore.updateTodo(updatedTodoData)
};

function editTodo(todo: Task) {
  console.log("todo: ", todo);
  selectedTodo.value = todo;
  dialog.value = true;
}

function deleteTodo(id: String) {
  Swal.fire({
    title: "Are You sure To Delete Task.",
    text: "Record can't retrive !",
    icon: "question",
    showCancelButton: true,
    color:'#FFFFFF',
    background:'rgb(0 0 0 / 32%)',
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, cancel!",
    confirmButtonColor: "#3085d6", // You can customize the confirm button color
    cancelButtonColor: "#d33", //
  }).then(response => {
    if (response.isConfirmed) {
      todoStore.deleteTodo(id);
    }
  })
   
}

function updateTodoStage(todo:Task) {
  todoStore.updateTodoStage(todo);
}
</script>

<style scoped></style>
