<template>
  <v-app>
    <!-- App Bar with Toggle Button -->
    <v-app-bar app>
      <v-toolbar-title>My Application</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="toggleDrawer">
        <v-icon>{{ drawer ? 'mdi-menu-open' : 'mdi-menu' }}</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- Side Navigation Drawer -->
    <v-navigation-drawer app v-model="drawer" permanent>
      <v-list dense>
        <v-list-item
          v-for="item in menuItems"
          :key="item.name"
          :to="{ name: item.name }"
          link
        >
          <v-list-item-icon class="justify-content-between d-inline-flex">
            <v-icon>{{ item.icon }}</v-icon>
            <v-list-item-title class="ml-2">{{ item.title }}</v-list-item-title>
          </v-list-item-icon>
          
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Main content (router view) -->
    <v-main>
      <v-container fluid>
        <RouterView />
      </v-container>
    </v-main>

    <!-- Footer -->
    <v-footer app padless>
      <v-col class="text-center" cols="12">
        © 2024 - My Application
      </v-col>
    </v-footer>
  </v-app>
</template>

<script setup>
import { ref } from "vue";

const drawer = ref(false); // Track the state of the drawer

const menuItems = ref([
  { title: "Home", name: "home", icon: "mdi-home" },
  { title: "About", name: "about", icon: "mdi-information" },
  { title: "Add Book", name: "addBook", icon: "mdi-plus" },
  { title: "List Book", name: "listBook", icon: "mdi-book" },
  { title: "Add Todo", name: "addTodo", icon: "mdi-plus" },
  { title: "List Todo", name: "todoList", icon: "mdi-format-list-bulleted" },
]);

const toggleDrawer = () => {
  drawer.value = !drawer.value; // Toggle the drawer state
};
</script>

<style scoped>
/* Optional: Adjust main content height to not overlap the footer */
.v-main {
  min-height: calc(100vh - 64px); /* 64px accounts for the height of the footer */
}
</style>
