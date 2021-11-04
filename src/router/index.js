import Vue from 'vue'
import Router from 'vue-router'

import allInvigilationInfo from '@/components/tabBars/allInvigilationInfo.vue'
import changeSquare from '@/components/tabBars/changeSquare.vue'
import myInfo from '@/components/tabBars/myInfo.vue'
// lazy load
const defaultPage = () => import('@/components/user/defaultPage.vue')
const register = () => import('@/components/user/register.vue')
const login = () => import('@/components/user/login.vue')
const changeRecord = () => import('@/components/others/changeRecord.vue')
const allRecord = () => import('@/components/others/allRecord.vue')
const test = () => import('@/components/others/test.vue')
const alert = () => import('@/components/others/alert.vue')
const editInfo = () => import('@/components/others/editInfo.vue')
const myApply = () => import('@/components/others/myApply.vue')
const othersApply = () => import('@/components/others/othersApply.vue')
const wantToChange = () => import('@/components/others/othersApply.vue')
const page404 = () => import("@/components/user/page404.vue")
const personalFunction = () => import("@/components/user/personalFunction.vue")

Vue.use(Router)

export default new Router({
  routes: [{
    path: "/", name: "defaultPage", component: defaultPage, redirect: '/myInfo', children: [
      { path: '/allInvigilationInfo', name: 'allInvigilationInfo', component: allInvigilationInfo },
      { path: '/changeSquare', name: 'changeSquare', component: changeSquare },
      { path: '/myInfo', name: 'myInfo', component: myInfo },
    ],
  }, {
    path: '/personalFunction',
    name: "personalFunction",
    component: personalFunction,
    redirect: '/myInfo/changeRecord',
    children: [
      { path: '/myInfo/changeRecord', name: 'changeRecord', component: changeRecord },
      { path: '/myInfo/allRecord', name: 'allRecord', component: allRecord },
      { path: '/myInfo/test', name: 'test', component: test },
      { path: '/myInfo/alert', name: 'alert', component: alert },
      { path: '/myInfo/editInfo', name: 'editInfo', component: editInfo },
      { path: '/myInfo/myApply', name: 'myApply', component: myApply },
      { path: '/myInfo/othersApply', name: 'othersApply', component: othersApply },
      { path: '/myInfo/wantToChange', name: 'wantToChange', component: wantToChange },
      { path: '/myInfo/login', name: 'login', component: login },
      { path: '/myInfo/register', name: 'register', component: register },

      { path: '/pageNotFound', name: '404', component: page404 },
    ]
  }, { path: '*', redirect: '/pageNotFound' }],
  mode: "hash",
  linkActiveClass: 'mui-active' //覆盖默认的路由高亮的类
})
