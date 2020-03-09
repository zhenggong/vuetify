import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import "nprogress/nprogress.css"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
  },
  {
    path: '/enterprise',
    name: 'Enterprise',
    component: () => import('../views/Enterprise.vue')
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('../views/Signup.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/micropost',
    name: 'Micropost',
    component: () => import('../views/Micropost.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// // router gards
// router.beforeEach((to,next) => {
//   NProgress.start()
//   // トークンが存在、かつログイン有効期限を過ぎてない場合、またはログイン画面の場合
//   if ((store.state.auth.login.token && store.state.auth.login.expire > (new Date()).getTime()) || to.matched.some(page => {
//     // ログイン画面はリダイレクト対象外 (他にも404ページなどいくつか対象外にする必要があるかも)
//     return (page.path === '/login')
//   })) {
//     next()
//   } else {
//     // ログイン画面に飛ばす。ログイン後に元の画面に戻れるよう、backuriパラメーターにリダイレクト前のURLを入れる
//     next({path: '/login', query: {backuri: to.fullPath}})
//   }
// })

// router.afterEach(() => {
//   NProgress.done()
// })

export default router
