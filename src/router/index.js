import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '../views/layout/layout'

export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/forget', component: () => import('@/views/login/forgetPwd'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/index',
    children: [
      {
        path: 'index',
        name: 'Index',
        component: () => import('@/views/index/index'),
        meta: { title: '首页', icon: 'dashboard' }
      }
    ]
  },

  {
    path: '/operator',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Operator',
        component: () => import('@/views/operator/index'),
        meta: { title: '运营商管理', icon: 'example' }
      }
    ]
  },

  {
    path: '/supplier',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Supplier',
        component: () => import('@/views/operator/index'),
        meta: { title: '供应商管理', icon: 'tab' }
      }
    ]
  },

  {
    path: '/commodity',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Commodity',
        component: () => import('@/views/operator/index'),
        meta: { title: '商品管理', icon: 'table' }
      }
    ]
  },

  {
    path: '/order',
    component: Layout,
    redirect: '/order/process',
    name: 'Order',
    meta: { title: '订单管理', icon: 'tree' },
    children: [
      {
        path: 'process',
        name: 'Process',
        component: () => import('@/views/uploader/imgUp.vue'),
        meta: { title: '图片上传', icon: 'form' }
      },
      {
        path: 'transfer',
        name: 'Transfer',
        component: () => import('@/views/table/index'),
        meta: { title: '待转结订单', icon: 'nested' }
      }
    ]
  },

  {
    path: '/finance',
    component: Layout,
    redirect: '/finance/check',
    name: 'Finance',
    meta: { title: '财务管理', icon: 'tree' },
    children: [
      {
        path: 'check',
        name: 'Check',
        component: () => import('@/views/table/index'),
        meta: { title: '核对账务', icon: 'excel' }
      },
      {
        path: 'cost',
        name: 'Cost',
        component: () => import('@/views/table/index'),
        meta: { title: '财务费管理', icon: 'zip' }
      }
    ]
  },

  {
    path: '/system',
    component: Layout,
    redirect: '/system/personnel',
    name: 'System',
    meta: { title: '系统管理', icon: 'tree' },
    children: [
      {
        path: 'personnel',
        name: 'Personnel',
        component: () => import('@/views/table/index'),
        meta: { title: '人员管理', icon: 'clipboard' }
      },
      {
        path: 'role',
        name: 'Role',
        component: () => import('@/views/table/index'),
        meta: { title: '角色管理', icon: 'guide' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
