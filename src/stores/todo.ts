import { defineStore } from "pinia";
import { ref, watch } from "vue";
import type { Task } from "../types/task";
import todoList from "@/data/todoData";

export const useTodoStore = defineStore("todo", () => {
  const todos = ref<Task[]>([]);

  // Load from localStorage when the store is initialized
  const loadTodos = () => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      todos.value = JSON.parse(storedTodos);
    }
  };

  loadTodos();

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
  const deleteTodo = (todoId: string) => {
    todos.value = todos.value.filter((todo) => todo.id !== todoId);
  };

  const updateTodoStage = (todoData: Task) => {
    const index = todos.value.findIndex((todo) => todo.id === todoData.id);
    if (index !== -1) {
      todos.value[index].completed = todoData.completed;
    }
  };
  const filter = (filterOption: any, search?: string) => {
    return todos.value.filter((todo) => {
      const matchesStage = filterOption.stage ? todo.stage === filterOption.stage : true;
      const matchesPriority = filterOption.priority ? todo.priority === filterOption.priority : true;
      const matchesSearch = search ? todo.title.toLowerCase().includes(search.toLowerCase()) : true;
      return matchesStage && matchesPriority && matchesSearch;
    });
  };

  const addFakeTodoData = () => {
    todos.value = [...todos.value, ...todoList];
  };

  // Update an existing todo
  const updateTodoStatus = (data: { id: string; newStatus: any; type: string }) => {
    const index = todos.value.findIndex((todo: Task) => todo.id === data.id);
    if (index !== -1) {
      if (data.type === "Priority") {
        todos.value[index].priority = data.newStatus;
      } else if (data.type === "Stage") {
        todos.value[index].stage = data.newStatus;
      }
    }
  };

  return {
    addNewTodo,
    getTodos,
    deleteTodo,
    updateTodo,
    updateTodoStage,
    filter,
    addFakeTodoData,
    updateTodoStatus,
    todos,
  };
});
