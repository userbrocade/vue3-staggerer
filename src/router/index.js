import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  // createWebHistory 配置路由模式和指向
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: []
})

export default router
