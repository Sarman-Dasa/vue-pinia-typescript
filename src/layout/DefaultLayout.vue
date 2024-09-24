<template>
    <v-app>
      <!-- Side Navigation Drawer -->
      <v-navigation-drawer app permanent>
        <v-list dense>
          <v-list-item
            v-for="item in menuItems"
            :key="item.name"
            :to="{ name: item.name }"
            link
          >
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
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
        <v-col
          class="text-center"
          cols="12"
        >
          © 2024 - My Application
        </v-col>
      </v-footer>
    </v-app>
  </template>
  
  <script setup>
  import { ref } from "vue";
  
  const menuItems = ref([
    { title: "Home", name: "home", icon: "mdi-home" },
    { title: "About", name: "about", icon: "mdi-information" },
    { title: "Add Book", name: "addBook", icon: "mdi-information" },
    { title: "List Book", name: "listBook", icon: "mdi-information" },
  ]);
  </script>
  
  <style scoped>
  /* Optional: Adjust main content height to not overlap the footer */
  .v-main {
    min-height: calc(100vh - 64px); /* 64px accounts for the height of the footer */
  }
  </style>
  