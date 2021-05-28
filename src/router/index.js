import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

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
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Greeter',
    component: () => import(/* webpackChunkName: "greeter" */ '../views/Greeter.vue')
  },
  {
    path: '/category',
    name: 'Category',
    component: () => import(/* webpackChunkName: "category" */ '../views/Category.vue')
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import(/* webpackChunkName: "search" */ '../views/Search.vue')
  },
  {
    path: '/book/:id',
    name: 'Book',
    component: () => import(/* webpackChunkName: "book" */ '../views/Book.vue')
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import(/* webpackChunkName: "cart" */ '../views/Cart.vue')
  },
  {
    path: '/debug',
    name: 'Debug',
    component: () => import(/* webpackChunkName: "debug" */ '../views/Debug.vue')
  },
  {
    path:'/personinfo',
    name:'PersonInfo',
    component: ()=> import (/*webpackChunkName:"personinfo"*/'../views/PersonalInfo/PersonInfo.vue'),
    children:
    [
      {
        path:'profile',
        component: ()=> import('../views/PersonalInfo/Children/Profile.vue')
      },
      {
        path:'edit',
        component: ()=> import('../views/PersonalInfo/Children/Edit.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
