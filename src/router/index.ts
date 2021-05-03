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
        component: () => import('@/pages/member/LoginPage.vue'),
        props: (route:any) => ( { email:route.query.email })
      },
      {
        path: 'join',
        component: () => import('@/pages/member/JoinPage.vue')
      },
      {
        path: 'joinTos',
        component: () => import('@/pages/member/JoinTosPage.vue')
      },
      {
        path: 'emailCert',
        component: () => import('@/pages/member/EmailCertPage.vue'),
        props: (route:any) => ( { email:route.query.email, emailCertKey:route.query.emailCertKey })
      },
      {
        path: 'joinAfter',
        component: () => import('@/pages/member/JoinAfterPage.vue'),
        props: (route:any) => ( { email:route.query.email })
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
      
    ]
  },
  {
    path: '/detail',
    component: () => import('@/pages/recruit/DetailPage.vue'),
    props: (route:any) => ({ id: Util.toIntOrUnd(route.query.id)})
  },
  {
    path: '/application',
    component: () => import('@/pages/recruit/ApplicationPage.vue'),
    props: (route:any) => ({ id: Util.toIntOrUnd(route.query.id)})
  },
  {
    path: '/member/modify',
    component: () => import('@/pages/member/ModifyPage.vue')
  },
  {
    path: '/applying/detail',
    component: () => import('@/pages/application/DetailPage.vue')
  },
  {
    path: '/applying/endApplyingStatus',
    component: () => import('@/pages/application/EndApplyingStatusPage.vue')
  },
  {
    path: '/applying/firstPassApplyingStatus',
    component: () => import('@/pages/application/FirstPassApplyingStatusPage.vue')
  },
  {
    path: '/applying/finalPassApplyingStatus',
    component: () => import('@/pages/application/FinalPassApplyingStatusPage.vue')
  },
  {
    path: '/applying/passFailApplyingStatus',
    component: () => import('@/pages/application/PassFailApplyingStatusPage.vue')
  },
  {
    path: '/like/list',
    component: () => import('@/pages/member/LikedRecruitListPage.vue')
  },
  {
    path: '/member/findLoginId',
    component: () => import('@/pages/member/FindLoginIdPage.vue')
  },
  {
    path: '/member/findLoginPw',
    component: () => import('@/pages/member/FindLoginPwPage.vue')
  },
  {
    path: '/member/findPwAfter',
    component: () => import('@/pages/member/FindPwAfterPage.vue'),
    props: (route:any) => ( { email:route.query.email })
  },
  {
    path: '/member/modifyPw',
    component: () => import('@/pages/member/ModifyPwPage.vue'),
    props: (route:any) => ( { email:route.query.email, emailCertKey:route.query.emailCertKey })
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
