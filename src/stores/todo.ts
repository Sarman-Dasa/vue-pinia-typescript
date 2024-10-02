import { defineStore } from "pinia";
import { onMounted, ref, watch } from "vue";
import type { Task } from "../types/task";

export const useTodoStore = defineStore("todo", () => {
  const todos = ref<Task[]>([]);

  // Load from localStorage when the store is initialized
  onMounted(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      todos.value = JSON.parse(storedTodos);
    }
  });

  // Save to localStorage whenever todos change
  watch(
    todos,
    (newTodos) => {
      localStorage.setItem("todos", JSON.stringify(newTodos));
    },
    { deep: true }
  );

  const addNewTodo = (newTodo: Task) => {
    todos.value.push(newTodo);
  };

  const getTodos = () => {
    return todos.value;
  };

  // Update an existing todo
  const updateTodo = (updatedTodo: Task) => {
    const index = todos.value.findIndex((todo) => todo.id === updatedTodo.id);
    if (index !== -1) {
      todos.value[index] = updatedTodo;
    }
  };

  // Delete a todo by id
  const deleteTodo = (todoId: String) => {
    todos.value = todos.value.filter((todo) => todo.id !== todoId);
  };

  const updateTodoStage = (todoData: Task) => {
    const index = todos.value.findIndex((todo) => todo.id === todoData.id);
    if (index !== -1) {
      todos.value[index].completed = todoData.completed;
    }
  };

  return {
    addNewTodo,
    getTodos,
    deleteTodo,
    updateTodo,
    updateTodoStage,
    todos,
  };
});
