import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import OpenPage from '../pages/OpenPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/OpenPage'
  },
  {
    path: '/OpenPage',
    component: OpenPage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
