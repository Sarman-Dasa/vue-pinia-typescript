<template>
  <div>
    <Filter
      @apply-filter="filterData"
      @add-dummy-data="addTododummyData"
      v-model:per-page="perPage"
    />

    <div class="todo-list">
      <List
        :todos="todoList"
        @edit="editTodo"
        @delete="deleteTodo"
        @update-stage="updateTodoStage"
      />
    </div>

    <Pagination
      v-if="totalCount"
      :per-page="perPage"
      :total-count="totalCount"
      v-model:page="page"
    />

    <todo-edit-dialog
      v-if="dialog && selectedTodo"
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
import { ref, computed, watch } from "vue";
import type { Task } from "@/types/task";
import TodoEditDialog from "./TodoEditDialog.vue";
import Swal from "sweetalert2";
import Filter from "./Filter.vue";
import Pagination from "@/components/Pagination.vue";

const todoStore = useTodoStore();
const dialog = ref(false);
const selectedTodo = ref<Task>();
const isFilterApply = ref<Boolean>(false);
const filterTodoData = ref<Task[]>([]);
const page = ref<number>(1);
const perPage = ref<number>(4);

const totalCount = computed(() => {
  return isFilterApply.value
    ? filterTodoData.value.length
    : todoStore.todos.length;
});

const todoList = computed(() => {
  const start = (page.value - 1) * perPage.value;
  const end = start + perPage.value;
  let data = isFilterApply.value ? filterTodoData.value : todoStore.todos;
  return data.slice(start, end);
});

watch(perPage, (nv) => {
  page.value = 1;
});

// Update todo in the list
const updateTodo = (updatedTodoData: Task) => {
  todoStore.updateTodo(updatedTodoData);
};

function editTodo(todo: Task) {
  selectedTodo.value = todo;
  dialog.value = true;
}

function deleteTodo(id: String) {
  Swal.fire({
    title: "Are You sure To Delete Task.",
    text: "Record can't retrive !",
    icon: "question",
    showCancelButton: true,
    color: "#FFFFFF",
    background: "rgb(0 0 0 / 32%)",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, cancel!",
    confirmButtonColor: "#3085d6", // You can customize the confirm button color
    cancelButtonColor: "#d33", //
  }).then((response) => {
    if (response.isConfirmed) {
      todoStore.deleteTodo(id);
    }
  });
}

function updateTodoStage(todo: Task) {
  todoStore.updateTodoStage(todo);
}

function filterData(option: String[]) {
  isFilterApply.value = true;
  filterTodoData.value = todoStore.filter(option);
}

function addTododummyData() {
  todoStore.addFakeTodoData();
}
</script>

<style scoped>
.todo-list {
  overflow-y: auto;
  max-height: calc(100vh - 370px);
}
</style>
