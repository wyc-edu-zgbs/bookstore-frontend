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
        path:'addr',
        component: ()=> import('../views/PersonalInfo/Children/Addr.vue')
      }
    ]
  },
  {
    path:'/admin',
    name:'Admin',
    component:()=>import('../views/admin/admin.vue'),
    children:
    [
      {
        path:'goodsadd',
        component:()=>import('../views/admin/Chlidren/GoodsAdd.vue')
      },
      {
        path:'goodsshow',
        component:()=>import('../views/admin/Chlidren/GoodsShow.vue')
      },
      {
        path:'goodsupdate',
        component:()=>import('../views/admin/Chlidren/GoodsUpdate.vue')
      },
      {
        path:'orderupdate',
        component:()=>import('../views/admin/Chlidren/OrderUpdate.vue')
      }
    ]

  },
  {
    path:'/orderconfirm',
    name:'OrderConfirm',
    component:()=> import('../views/OrderConfirm.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router