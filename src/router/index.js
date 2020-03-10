import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import "nprogress/nprogress.css"
import store from "@/store/index.js"


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { isPublic: true },
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
    meta: { isPublic: true },
  },
  {
    path: '/enterprise',
    name: 'Enterprise',
    component: () => import('../views/Enterprise.vue'),
    meta: { isPublic: true },
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('../views/Signup.vue'),
    meta: { isPublic: true },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: { isPublic: true },
  },
  {
    path: '/micropost',
    name: 'Micropost',
    component: () => import('../views/Micropost.vue'),
    meta: { isPublic: false },
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  // isPublic でない場合(=認証が必要な場合)、かつ、ログインしていない場合
  if (to.matched.some(record => !record.meta.isPublic) && !store.state.auth.login.token) {
    next({ path: '/login', query: { redirect: to.fullPath }});
  } else {
    next();
  }
});

router.beforeEach(  console.log("router.beforeEach") )
export default router
