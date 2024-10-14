<template>
  <v-card>
    <v-layout>
      <v-app-bar color="secondary" prominent>
        <v-app-bar-nav-icon
          v-if="isUserLoggedIn"
          variant="text"
          @click.stop="toggleDrawer"
        ></v-app-bar-nav-icon>
        <v-toolbar-title>My Application</v-toolbar-title>

        <v-spacer></v-spacer>

        <!-- Conditionally display log out or sign in/up buttons -->
        <template v-if="isUserLoggedIn">
          Login as
          <v-chip variant="outlined" class="ml-3 text-center mb-1 secondary">
            {{ userStore?.user?.username }}</v-chip
          >
          <v-btn flat @click="logOut">
            <v-icon left dark>{{ btnMenuItems[0].icon }}</v-icon>
            {{ btnMenuItems[0].title }}
          </v-btn>
        </template>
        <template v-else>
          <v-btn
            flat
            v-for="item in btnMenuItems"
            :key="item.title"
            :to="{ name: item.name }"
          >
            <v-icon left dark>{{ item.icon }}</v-icon>
            {{ item.title }}
          </v-btn>
        </template>
      </v-app-bar>

      <v-navigation-drawer
        v-model="drawer"
        :location="$vuetify.display.mobile ? 'bottom' : undefined"
        temporary
      >
        <v-list dense>
          <v-list-item
            v-for="item in filteredMenuItems"
            :key="item.name"
            :to="{ name: item.name }"
            link
          >
            <v-list-item-icon class="justify-content-between d-inline-flex">
              <v-icon>{{ item.icon }}</v-icon>
              <v-list-item-title class="ml-2">{{
                item.title
              }}</v-list-item-title>
            </v-list-item-icon>
          </v-list-item>

          <!-- LogOut button inside the sidebar menu for mobile view -->
          <v-list-item v-if="isUserLoggedIn && $vuetify.display.mobile">
            <v-btn flat @click="logOut">
              <v-icon left dark icon="mdi-logout"></v-icon>
              Log Out
            </v-btn>
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
        <v-col class="text-center" cols="12"> © 2024 - My Application </v-col>
      </v-footer>
    </v-layout>
  </v-card>
</template>

<script setup>
import { computed, onBeforeMount, onMounted, ref, watch } from "vue";
import { useUserStore } from "@/stores/user";
import router from "@/router";

const drawer = ref(false); // Track the state of the drawer
const userStore = useUserStore();

const menuItems = ref([
  {
    title: "Home",
    name: "home",
    icon: "mdi-home",
    action: "read",
    page: "all",
  },
  {
    title: "About",
    name: "about",
    icon: "mdi-information",
    action: "read",
    page: "all",
  },
  {
    title: "Add Book",
    name: "addBook",
    icon: "mdi-plus",
    action: "create",
    page: "book",
  },
  {
    title: "List Book",
    name: "listBook",
    icon: "mdi-book",
    action: "read",
    page: "book",
  },
  {
    title: "Add Todo",
    name: "addTodo",
    icon: "mdi-plus",
    action: "create",
    page: "todo",
  },
  {
    title: "List Todo",
    name: "todoList",
    icon: "mdi-format-list-bulleted",
    action: "read",
    page: "todo",
  },
  {
    title: "User Permission",
    name: "userPermission",
    icon: "mdi-security ",
    action: "read",
    page: "user",
  },
]);

const filteredMenuItems = computed(() => {
  // Filter menu items based on user abilities
  return menuItems.value.filter((item) => {
    return userStore.hasAccess(item.action, item.page);
  });
});

// Computed property to check if user is logged in
const isUserLoggedIn = computed(() => {
  return userStore.user !== null;
});

// Dynamically update menu items based on login status
const btnMenuItems = ref([]);

onBeforeMount(() => {
  userStore.loadData();
  updateMenuItem();
});

// Watch for changes in login state to update the buttons
watch(isUserLoggedIn, () => {
  updateMenuItem();
});

function logOut() {
  userStore.logout();
  updateMenuItem();
  router.push({ name: "signIn" });
}

const toggleDrawer = () => {
  drawer.value = !drawer.value; // Toggle the drawer state
};

function updateMenuItem() {
  if (isUserLoggedIn.value) {
    btnMenuItems.value = [{ title: "Log Out", icon: "mdi-logout" }];
  } else {
    btnMenuItems.value = [
      { title: "Sign Up", name: "signUp", icon: "mdi-face-man" },
      { title: "Sign In", name: "signIn", icon: "mdi-lock-open-outline" },
    ];
  }
}
</script>

<style scoped>
/* Optional: Adjust main content height to not overlap the footer */
.v-main {
  min-height: calc(
    100vh - 64px
  ); /* 64px accounts for the height of the footer */
}
</style>
