<template>
  <div class="container mt-5 mb-5">
    <div class="row">
      <div
        v-for="(tasks, label) in groupedTasks"
        :key="label"
        class="col mx-2 px-2 py-3 bg-light border rounded"
      >
        <h6>
          {{ label == "in_progress" ? "IN PROGRESS" : label.toUpperCase() }}
        </h6>
        <div class="todo-list">
          <draggable
            class="draggable-list"
            :itemKey="label"
            :list="tasks"
            group="tasks"
            @end="updateDisplayOrder"
          >
            <template #item="{ element }">
              <TodoCardView
                :todo="element"
                :isDraggableView="true"
                :data-id="element.id"
                @edit="emit('edit', $event)"
                @delete="emit('delete', $event)"
              />
            </template>
          </draggable>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import draggable from "vuedraggable";
import { computed, type PropType, ref } from "vue";
import TodoCardView from "@/components/TodoCardView.vue";
import { type Task, TaskStage } from "@/types/task";

const props = defineProps({
  todos: {
    type: Object as PropType<Task[]>,
    required: true,
  },
  todoGroupBy: {
    type: String,
    default: "Priority",
  },
});
const emit = defineEmits(["edit", "delete", "changeDisplayOrder"]);

const groupedTasks = computed(() => {
  if (props.todoGroupBy === "Priority") {
    return {
      High: props.todos.filter((task) => task.priority === "High"),
      Medium: props.todos.filter((task) => task.priority === "Medium"),
      Low: props.todos.filter((task) => task.priority === "Low"),
    };
  } else {
    return {
      todo: props.todos.filter((task) => task.stage === TaskStage.TODO),
      in_progress: props.todos.filter(
        (task) => task.stage === TaskStage.IN_PROGRESS
      ),
      done: props.todos.filter((task) => task.stage === TaskStage.DONE),
    };
  }
});

function updateDisplayOrder(event: any) {
  const itemId = event.item.dataset.id;
  const newStatus = event.to.__draggable_component__.itemKey;
  let obj = {
    id: itemId,
    newStatus: newStatus,
    type: props.todoGroupBy,
  };
  emit("changeDisplayOrder", obj);
}
</script>

<style scoped>
h6 {
  font-weight: 700;
}
.col {
  height: 90vh;
  overflow: auto;
}
.draggable-list {
  min-height: 10vh;
}
.draggable-list > div {
  cursor: pointer;
}

.sticky-header {
  position: sticky;
  top: -12px; /* Stick to the top of the container */
  background-color: white; /* To prevent content overlap */
  z-index: 10; /* Ensure it stays on top */
  padding: 10px; /* Optional: Add some padding to the header */
  border-bottom: 2px solid #ddd; /* Optional: Add a bottom border for better visibility */
}

.todo-list {
  overflow-y: auto;
  max-height: calc(100vh - 150px);
}
.todo-list::-webkit-scrollbar {
  width: 0px;
}
</style>
