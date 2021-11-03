import Vue from 'vue'
import Router from 'vue-router'

import allInvigilationInfo from '@/components/tabBars/allInvigilationInfo'
import changeSquare from '@/components/tabBars/changeSquare'
import myInfo from '@/components/tabBars/myInfo'

import defaultPage from '@/components/user/defaultPage'
import register from '@/components/user/register'
import login from '@/components/user/login'

import changeRecord from '@/components/others/changeRecord'
import allRecord from '@/components/others/allRecord'
import test from '@/components/others/test'
import alert from '@/components/others/alert'
import editInfo from '@/components/others/editInfo'
import myApply from '@/components/others/myApply'
import othersApply from '@/components/others/othersApply'
import wantToChange from '@/components/others/othersApply'
import page404 from "@/components/user/page404";
import personalFunction from "../components/user/personalFunction";

Vue.use(Router)

export default new Router({
  routes: [{
    path: "/", name: "defaultPage", component: defaultPage, redirect: '/myInfo', children: [
      {path: '/allInvigilationInfo', name: 'allInvigilationInfo', component: allInvigilationInfo},
      {path: '/changeSquare', name: 'changeSquare', component: changeSquare},
      {path: '/myInfo', name: 'myInfo', component: myInfo},
    ],
  }, {
    path: '/personalFunction',
    name: "personalFunction",
    component: personalFunction,
    redirect: '/myInfo/changeRecord',
    children: [
      {path: '/myInfo/changeRecord', name: 'changeRecord', component: changeRecord},
      {path: '/myInfo/allRecord', name: 'allRecord', component: allRecord},
      {path: '/myInfo/test', name: 'test', component: test},
      {path: '/myInfo/alert', name: 'alert', component: alert},
      {path: '/myInfo/editInfo', name: 'editInfo', component: editInfo},
      {path: '/myInfo/myApply', name: 'myApply', component: myApply},
      {path: '/myInfo/othersApply', name: 'othersApply', component: othersApply},
      {path: '/myInfo/wantToChange', name: 'wantToChange', component: wantToChange},
      {path: '/myInfo/login', name: 'login', component: login},
      {path: '/myInfo/register', name: 'register', component: register},

      {path: '/pageNotFound', name: '404', component: page404},
    ]
  }, {path: '*', name: '404', redirect: '/pageNotFound'}],
  linkActiveClass: 'mui-active' //覆盖默认的路由高亮的类
})
