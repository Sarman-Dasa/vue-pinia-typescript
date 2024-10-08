<template>
  <div class="justify-content-between d-flex">
    <div class="text-center">
  </div>
    <div class="d-inline-flex">
      <v-combobox
        v-show="toggleFilters.showPriority"
        clearable
        chips
        width="250px"
        label="Priority"
        v-model="todoFilter.priority"
        :items="priorityOptions"
        variant="solo-inverted"
        class="mr-2"
      ></v-combobox>
      <v-combobox
        v-show="toggleFilters.showStage"
        clearable
        chips
        width="250px"
        label="Stage"
        v-model="todoFilter.stage"
        :items="todoStageOptions"
        variant="solo-inverted"
        class="mr-2"
      ></v-combobox>
      <v-combobox
        v-show="isCardView"
        chips
        width="250px"
        label="perPage"
        v-model="perPage"
        :items="[4, 8, 12, 16, 20]"
        variant="solo-inverted"
        class="mr-2"
      ></v-combobox>

      <v-combobox
        v-show="!isCardView"
        chips
        width="250px"
        label="Show as"
        v-model="todoGroupBy"
        :items="['Priority', 'Stage']"
        variant="solo-inverted"
        class="mr-2"
      ></v-combobox>

      <v-switch
        v-model="isCardView"
        :value="true"
        hide-details
      >
      <template #append>
        <v-icon>{{ isCardView ? 'mdi-view-grid' : 'mdi-view-list' }}</v-icon>
      </template>
    </v-switch>
    </div>
    <div>
      <v-btn @click="applyFilter">Apply</v-btn>
      <v-btn class="ml-2" @click="clearFilter">Clear</v-btn>
      <v-btn class="ml-2" @click="emit('addDummyData')">Add dummy data</v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { TaskStage } from "@/types/task";
import { ref, reactive, watch, computed } from "vue";
const perPage = defineModel("perPage", { type: Number, default: 4 });
const todoGroupBy = defineModel("todoGroupBy", {
  type: String,
  default: "Priority",
});
const isCardView = defineModel("isCardView", { type: Boolean, default: true });
const emit = defineEmits(["applyFilter", "addDummyData"]);

const priorityOptions = ref<String[]>(["High", "Medium", "Low"]);
const todoStageOptions: TaskStage[] = [
  TaskStage.TODO,
  TaskStage.IN_PROGRESS,
  TaskStage.DONE,
];

const todoFilter = reactive({
  priority: null,
  stage: null,
});

const toggleFilters = computed(() => {
  if (!isCardView.value) {
    return {
      showPriority: todoGroupBy.value == "Stage",
      showStage: todoGroupBy.value !== "Stage",
    };
  }
  // When in card view, show both filters
  return {
    showPriority: true,
    showStage: true,
  };
});

watch(todoGroupBy,(nv) => {
    todoFilter.priority = todoFilter.stage = null;
    applyFilter();
})

function applyFilter() {
  emit("applyFilter", todoFilter);
}

function clearFilter() {
  todoFilter.priority = todoFilter.stage = null;
  applyFilter();
}
</script>

<style scoped></style>
