<template>
  <div class="mt-2 justify-content-between d-flex">
    <VueApexCharts
      width="380"
      type="pie"
      :options="piaChartOptions"
      :series="pieSeries"
    ></VueApexCharts>
    <VueApexCharts
      width="380"
      type="bar"
      :options="barChartOptions"
      :series="barSeries"
    ></VueApexCharts>

    <VueApexCharts
      width="380"
      type="polarArea"
      :options="chartOptions"
      :series="series"
    ></VueApexCharts>
  </div>
</template>

<script setup lang="ts">
import VueApexCharts from "vue3-apexcharts";
import { ref } from "vue";
import { useTodoStore } from "@/stores/todo";
import { Tooltip } from "vuetify/directives";
import { type Task, TaskStage } from "@/types/task";

const { todos } = useTodoStore();

const pieSeries = ref();

const piaChartOptions = ref({
  chart: {
    type: "pie",
    width: "380",
  },
  title: {
    text: "Todo priority",
    align: "center",
  },
  labels: ["Low", "High", "Medium"],
  colors: ["#gge802", "#836af9", "#2c9aff"],
});

const barChartOptions = ref({
  chart: {
    type: "bar",
    width: "380",
  },
  title: {
    text: "Todo",
    align: "center",
  },
  xaxis: {
    categories: ["Completed", "Pending"],
  },
  plotOptions: {
    bar: {
      distributed: true, // Allows different colors per bar
      borderRadius: 4,
      horizontal: false,
    },
  },
  colors: ["#62904a", "#ed2b56"], // Different colors for each bar
  dataLabels: {
    enabled: true, // Show labels on top of the bars
  },
  legend: {
    show: true, // Hides the legend
  },
});


const chartOptions = ref({
  chart: {
    type: "polarArea",
  },
  stroke: {
    colors: ["#fff"],
  },
  fill: {
    opacity: 0.8,
  },
  labels: ["To Do", "In Progress", "Done"],
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 200,
        },
        legend: {
          position: "bottom",
        },
      },
    },
  ],
});

function countTasksByPriority(tasks: Task[]): {
  low: number;
  medium: number;
  high: number;
} {
  return tasks.reduce(
    (acc, task) => {
      switch (task.priority) {
        case "Low":
          acc.low += 1;
          break;
        case "Medium":
          acc.medium += 1;
          break;
        case "High":
          acc.high += 1;
          break;
      }
      return acc;
    },
    { low: 0, medium: 0, high: 0 }
  );
}

function countTasksByCompleted(tasks: Task[]) {
  return tasks.reduce(
    (acc, task) => {
      task.completed ? (acc.completed += 1) : (acc.panding += 1);
      return acc;
    },
    { completed: 0, panding: 0 }
  );
}


function countTasksByStage(tasks: Task[]): {
  todo: number;
  in_progress: number;
  done: number;
} {
  return tasks.reduce(
    (acc, task) => {
      switch (task.stage) {
        case "To Do":
          acc.todo += 1;
          break;
        case "In Progress":
          acc.in_progress += 1;
          break;
        case "Done":
          acc.done += 1;
          break;
      }
      return acc;
    },
    { todo: 0, in_progress: 0, done: 0 }
  );
}

const taskCompleted = countTasksByCompleted(todos);
const barSeries = ref([
  {
    name: "Tasks",
    data: Object.values(taskCompleted),
  },
]);

const count = countTasksByPriority(todos);
pieSeries.value = Object.values(count);


const taskStageCount = countTasksByStage(todos);
const series = ref(Object.values(taskStageCount));

</script>

<style scoped></style>
