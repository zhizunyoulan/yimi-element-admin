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
                name: '首页',
                meta: { title: '首页', icon: 'el-icon-folder-opened', affix: true }
            },
        ]
    }
]




/**
 * dynamicRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const dynamicRoutes = [
    {
        path: '/system',
        component: VeaLayout,
        name: '系统管理',
        meta: { title: '系统管理', icon: 'el-icon-setting' },
        children: [
            {
                path: 'user',
                component: () => import('@/views/system/user'),
                name: '用户管理',
                meta: { title: '用户管理', affix: false }
            },
            {
                path: 'dept',
                component: () => import('@/views/system/dept'),
                name: '部门管理',
                meta: { title: '部门管理', affix: false }
            },
            {
                path: 'api',
                component: () => import('@/views/system/api'),
                name: '接口管理',
                meta: { title: '页面接口', affix: false }
            },
            {
                path: 'menu',
                component: () => import('@/views/system/menu'),
                name: '菜单管理',
                meta: { title: '菜单管理', affix: false }
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
                name: '表格',
                meta: { title: '表格', affix: false }
            },
            {
                path: 'operation',
                component: () => import('@/views/demos/yi-operation'),
                name: '操作',
                meta: { title: '操作', affix: false }
            },
            {
                path: 'modal-trigger',
                component: () => import('@/views/demos/yi-modal-trigger'),
                name: '模态框',
                meta: { title: '模态框', affix: false }
            }
        ]
    },
];

export const constantTailRoutes = [
    {
        path: '*',
        component: VeaLayout,
        redirect: '/dashboard',
    }
];