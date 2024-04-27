import Dashboard from '@/views/home/dashboard'
import VeaLayout from '@/layouts/vue-element-admin'
import DirectNestRoute from '@/components/DirectNestRoute'
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
                meta: { title: '首页', icon: 'dashboard', affix: true }
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
        meta: { title: '系统管理', icon: 'system' },
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
        meta: { title: '组件演示', icon: 'example' },
        children: [
            {
                path: 'table',
                component: DirectNestRoute,
                name: '表格',
                meta: { title: '表格', affix: false, icon: 'table' },
                children: [
                    {
                        path: 'table-01',
                        name: '表格-1',
                        component: () => import('@/views/demos/yi-table/samples/table-01'),
                    },
                    {
                        path: 'table-02',
                        name: '表格-2',
                        component: () => import('@/views/demos/yi-table/samples/table-02'),
                    },
                    {
                        path: 'table-03',
                        name: '表格-3',
                        component: () => import('@/views/demos/yi-table/samples/table-03'),
                    },
                    {
                        path: 'table-04',
                        name: '表格-4',
                        component: () => import('@/views/demos/yi-table/samples/table-04'),
                    }
                ]
            },
            {
                path: 'action',
                component: () => import('@/views/demos/yi-action'),
                name: '操作',
                meta: { title: '操作', affix: false, icon: 'el-icon-thumb' }
            },
            {
                path: 'modal',
                component: () => import('@/views/demos/yi-modal'),
                name: '模态框',
                meta: { title: '模态框', affix: false , icon: 'el-icon-data-board'}
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