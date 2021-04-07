import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import { useGlobalStateOutSideOfVue } from '@/stores'

import tabs from '../pages/Tabs.vue'
import * as Util from '../utils'

const globalstate = useGlobalStateOutSideOfVue();

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home/main'
  },
  {
    path: '/home/',
    component: tabs,
    children:[
      {
        path: '',
        redirect: '/home/main'
      },
      {
        path: 'main',
        component: () => globalstate.isLogined ? import('@/pages/home/MainPage.vue') : import('@/pages/home/OpenPage.vue')
      },
    ]
  },
  {
    path: '/member/',
    component: tabs,
    children:[
      {
        path: '',
        redirect: '/member/profile'
      },
      {
        path: 'profile',
        component: () => import('@/pages/member/ProfilePage.vue')
      },
      {
        path: 'login',
        component: () => import('@/pages/member/LoginPage.vue')
      },
      {
        path: 'join',
        component: () => import('@/pages/member/JoinPage.vue')
      },
    ]
  },
  {
    path: '/search/',
    component: tabs,
    children:[
      {
        path: '',
        redirect: '/search/list'
      },
      {
        path: 'list',
        component: () => import('@/pages/recruit/SearchPage.vue')
      },
    ]
  },
  {
    path: '/recruit/',
    component: tabs,
    children:[
      {
        path: '',
        redirect: '/recruit/list'
      },
      {
        path: 'list',
        component: () => import('@/pages/recruit/ListPage.vue')
      },
      {
        path: 'detail',
        component: () => import('@/pages/recruit/DetailPage.vue'),
        props: (route:any) => ({ id: Util.toIntOrUnd(route.query.id)})
      },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
