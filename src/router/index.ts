import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

import OpenPage from '../pages/OpenPage.vue'
import JoinTosPage from '../pages/JoinTosPage.vue'
import JoinPage from '../pages/JoinPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/OpenPage'
  },
  {
    path: '/OpenPage',
    component: OpenPage
  },
  {
    path: '/usr/ap/joinTos',
    component: JoinTosPage
  },
  {
    path: '/usr/ap/join',
    component: JoinPage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
