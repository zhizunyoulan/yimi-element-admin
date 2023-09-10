import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import { getToken } from '@/utils/auth' // get token from cookie

import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist



import Dashboard from '@/views/home/dashboard'
import VeaLayout from '@/layouts/vue-element-admin'
import Login from '@/views/login.vue'


export const constantRoutes = [
    {
        path: "/login",
        name: "登录页",
        component: Login,
        hidden: true
    },
    {
        path: '/',
        component: VeaLayout,
        redirect: '/dashboard',
        children: [
            {
                path: 'dashboard',
                component: Dashboard,
                name: 'Dashboard',
                meta: { title: '首页', icon: 'el-icon-folder-opened', affix: true }
            },
        ]
    },
    
    {
        path: '/system',
        component: VeaLayout,
        name: '系统管理',
        meta: { title: '系统管理', icon: 'el-icon-setting' },
        children: [
            {
                path: 'user',
                component: () => import('@/views/system/user'),
                name: 'UserPage',
                meta: { title: '用户管理', affix: false }
            },
            {
                path: 'dept',
                component: () => import('@/views/system/dept'),
                name: 'DeptPage',
                meta: { title: '部门管理', affix: false }
            }
        ]
    },
    {
      path: '/demos',
      component: VeaLayout,
      name: '组件演示',
      meta: { title: '组件演示', icon: 'el-icon-setting' },
      children: [
          {
              path: 'table',
              component: () => import('@/views/demos/yi-table'),
              name: 'Table',
              meta: { title: '表格', affix: false }
          },
          {
              path: 'operation',
              component: () => import('@/views/demos/yi-operation'),
              name: 'Operation',
              meta: { title: '操作', affix: false }
          },
          {
              path: 'modal-trigger',
              component: () => import('@/views/demos/yi-modal-trigger'),
              name: 'ModalTrigger',
              meta: { title: '模态框', affix: false }
          }
      ]
  },
    
]




/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = []

const createRouter = () => new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
})


const router = createRouter()



router.beforeEach(async(to, from, next) => {
    // start progress bar
    NProgress.start()
  
    // determine whether the user has logged in
    const hasToken = getToken()
  
    if (hasToken) {
      if (to.path === '/login') {
        // if is logged in, redirect to the home page
        next({ path: '/' })
        NProgress.done() // hack: https://github.com/PanJiaChen/vue-element-admin/pull/2939
      } else {
        next()
        NProgress.done() 
      }
    } else {
      /* has no token*/
  
      if (whiteList.indexOf(to.path) !== -1) {
        // in the free login whitelist, go directly
        next()
        NProgress.done() 
      } else {
        // other pages that do not have permission to access are redirected to the login page.
        next(`/login?redirect=${to.path}`)
        NProgress.done()
      }
    }
  })


// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router
