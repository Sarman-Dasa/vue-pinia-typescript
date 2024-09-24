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
          path: '/',
          name: 'listBook',
          component:  () => import('../views/book/List.vue')
        },
        {
          path: 'add',
          name: 'addBook',
          component: () => import('../views/book/AddBook.vue')
        }
      ]
    }
  ]
})

export default router
