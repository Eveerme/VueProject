import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('../views/Manage.vue'),
    redirect: "/home",
    children: [
      {
        path: 'home',
        name: 'Home',
        meta: { title: '首页'},
        component: () => import('../views/Home.vue')
      },
      {
        path: 'user',
        name: 'User',
        meta: { title: '用户管理'},
        component: () => import('../views/User.vue')
      },
      {
        path: 'adminInfo',
        name: 'AdminInfo',
        meta: { title: '个人中心'},
        component: () => import('../views/admin/AdminInfo.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    meta: { title: '管理员登录'},
    component: () => import('../views/login/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    meta: { title: '管理员注册'},
    component: () => import('../views/register/Register.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
