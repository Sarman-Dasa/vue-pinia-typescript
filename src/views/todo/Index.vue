<template>
  <div>
    <!-- Todo Filter view  -->
    <Filter
      @apply-filter="filterData"
      @add-dummy-data="addTodoDummyData"
      v-model:per-page="perPage"
      v-model:is-card-view="isCardView"
      v-model:todo-group-by="todoGroupBy"
      v-model:todo-search="search"
    />

    <!-- Card view -->
    <div v-if="isCardView">
      <div class="todo-list">
        <List
          :todos="todoList"
          @edit="editTodo"
          @delete="deleteTodo"
          @update-stage="updateTodoStage"
        />
      </div>

      <!-- Pagination -->
      <Pagination
        v-if="totalCount"
        :per-page="perPage"
        :total-count="totalCount"
        v-model:page="page"
      />
    </div>
    <!-- Draggable view : priority or stage wise -->
    <div v-else>
      <TodoDraggableView
        :todos="todoList"
        :todo-group-by="todoGroupBy"
        @edit="editTodo"
        @delete="deleteTodo"
        @change-display-order="changeDisplayOrder"
      />
    </div>

    <!-- Todo edit dialog -->
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
import TodoDraggableView from "@/components/TodoDraggableView.vue";
import { useDebouncedRef } from '@/ref/debouncedRef'

const todoStore = useTodoStore();
const dialog = ref(false);
const selectedTodo = ref<Task>();
const isFilterApply = ref<boolean>(false);
const filterTodoData = ref<Task[]>([]);
const page = ref<number>(1);
const perPage = ref<number>(4);
const isCardView = ref(true);
const todoGroupBy = ref("Priority");
// const search = ref();
const search = useDebouncedRef(null,500);

// Get total count base on filter apply data
const totalCount = computed(() => {
  return isFilterApply.value
    ? filterTodoData.value.length
    : todoStore.todos.length;
});

// get todo list after pagination & filter
const todoList = computed(() => {
  const start = (page.value - 1) * perPage.value;
  const end = start + perPage.value;
  const data = isFilterApply.value ? filterTodoData.value : todoStore.todos;
  const PaginationData = data.slice(start, end);
  return isCardView.value ? PaginationData : data;
});

// update page value when perPage change
watch(perPage, (nv) => {
  page.value = 1;
});

watch(search, () => {
  filterData([]);
});


// Update todo in the list
const updateTodo = (updatedTodoData: Task) => {
  todoStore.updateTodo(updatedTodoData);
};

// open pop-up dialog for edit todo data
function editTodo(todo: Task) {
  selectedTodo.value = todo;
  dialog.value = true;
}

// open confirmation dialog box for delete todo data
function deleteTodo(id: string) {
  Swal.fire({
    title: "Are You sure To Delete Task.",
    text: "Record can't retrieve !",
    icon: "question",
    showCancelButton: true,
    color: "#FFFFFF",
    background: "rgb(0 0 0 / 32%)",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, cancel!",
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
  }).then((response) => {
    if (response.isConfirmed) {
      todoStore.deleteTodo(id);
    }
  });
}

// update todo completed status : true / false
function updateTodoStage(todo: Task) {
  todoStore.updateTodoStage(todo);
}

// filter todo data
function filterData(option: string[]) {
  isFilterApply.value = true;
  filterTodoData.value = todoStore.filter(option,search.value);
}

// testing purpose only : Add 20 dummy todo data
function addTodoDummyData() {
  todoStore.addFakeTodoData();
}

// Update todo priority or stage (use in draggable view)
function changeDisplayOrder(event: any) {
  todoStore.updateTodoStatus(event);
}
</script>

<style scoped>
.todo-list {
  overflow-y: auto;
  max-height: calc(100vh - 370px);
}
</style>
