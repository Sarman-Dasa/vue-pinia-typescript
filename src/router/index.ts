import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: "/book",
      name: "book",
      children: [
        {
          path: 'list',
          name: 'listBook',
          component:  () => import('../views/book/List.vue')
        },
        {
          path: 'add',
          name: 'addBook',
          component: () => import('../views/book/AddBook.vue')
        }
      ]
    },
    {
      path: "/todo",
      name: "todo",
      children: [
        {
          path: 'list',
          name: 'todoList',
          component:  () => import('../views/todo/Index.vue')
        },
        {
          path: 'add',
          name: 'addTodo',
          component: () => import('../views/todo/Add.vue')
        }
      ]
    }
  ]
})

export default router
