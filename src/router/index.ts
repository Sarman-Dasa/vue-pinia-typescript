import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { useUserStore } from "@/stores/user";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/sign-up",
      name: "signUp",
      component: () => import("../views/auth/Registration.vue"),
    },
    {
      path: "/sign-in",
      name: "signIn",
      component: () => import("../views/auth/Login.vue"),
    },
    {
      path: "/user-permission",
      name: "userPermission",
      component: () => import("../views/auth/Permission.vue"),
      meta: { requiredAbility: { action: "read", access: "user" } }, // Restrict access
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/book",
      name: "book",
      children: [
        {
          path: "list",
          name: "listBook",
          component: () => import("../views/book/List.vue"),
          meta: { requiredAbility: { action: "read", access: "book" } }, // Restrict access
        },
        {
          path: "add",
          name: "addBook",
          component: () => import("../views/book/AddBook.vue"),
          meta: { requiredAbility: { action: "create", access: "book" } }, // Restrict access
        },
      ],
    },
    {
      path: "/todo",
      name: "todo",
      children: [
        {
          path: "list",
          name: "todoList",
          component: () => import("../views/todo/Index.vue"),
          meta: { requiredAbility: { action: "read", access: "todo" } }, // Restrict access
        },
        {
          path: "add",
          name: "addTodo",
          component: () => import("../views/todo/Add.vue"),
          meta: { requiredAbility: { action: "create", access: "todo" } }, // Restrict access
        },
      ],
    },
    {
      path: "/unauthorized",
      name: "unauthorized",
      component: () => import("../views/error/Unauthorized.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      name: "notFound",
      component: () => import("../views/error/NotFound.vue"),
    },
  ],
});

router.beforeEach(async (to, from) => {
  const { user, hasAccess } = useUserStore();
  const isAuthenticated = !!user?.username; // Check if the user is logged in

  // Allow access to sign up and sign in pages without authentication
  if (to.name === "signUp" || to.name === "signIn") {
    return true;
  }

  // Redirect to login if the user is not authenticated
  if (!isAuthenticated) {
    return { name: "signIn" };
  }

  // Check if the route has access restrictions
  const requiredAbility = to.meta?.requiredAbility;
  if (
    requiredAbility &&
    !hasAccess(requiredAbility.action, requiredAbility.access)
  ) {
    // If the user does not have the required ability, redirect to an error or home page
    return { name: "unauthorized" }; // You can also use a dedicated "Access Denied" page
  }

  return true; // Allow access to the requested route
});

export default router;
