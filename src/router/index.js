import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import { getToken } from '@/utils/auth' // get token from cookie
import { iterateRecursively } from '@/utils/recursive'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist

import { constantRoutes, dynamicRoutes, constantTailRoutes } from './routes'

export const wholeRoutes = constantRoutes.concat(dynamicRoutes);

//route的component异步获取函数，转化成具体的组件
(function calculate() {
    for (let i = 0; i < arguments.length; i++) {
        iterateRecursively(arguments[i], (route) => {
            if (typeof route.component == 'function') {
                route.component().then(_component => {
                    route.component = _component.default
                })
            }
        })
    }
})(constantRoutes, dynamicRoutes)


const createRouter = (accessedRoutes = constantRoutes) => new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: accessedRoutes.concat(constantTailRoutes)
})

const router = createRouter()

router.beforeEach(async (to, from, next) => {
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



function hasPermission(permissions, route) {
    let component = route.component;
    route.pageInfo = component.pageInfo;
    let permission = component.pageInfo?.permission;
    if (permission) {
        let permissionParts = permission.split(":");
        return permissions.find((_permission) => {
            let _permissionParts = _permission.split(":");
            let min = Math.min(permissionParts.length, _permissionParts.length);
            for (var i = 0; i < min; i++) {
                let _permissionPart = _permissionParts[i];
                let permissionPart = permissionParts[i];
                if ("*" === _permissionPart) {
                    //当前段匹配
                } else if ("**" === _permissionPart) {
                    //全部匹配
                    return true;
                } else if (_permissionPart != permissionPart) {
                    //当前段不匹配，整体不匹配
                    return false;
                }
            }
            return permissionParts.length <= _permissionParts.length;
        });
    } else {
        return true;
    }
}

function filterAsyncRoutes(routes, permissions) {
    const res = [];
    for (var i = 0; i < routes.length; i++) {
        let route = routes[i];
        const tmp = { ...route };
        if (Array.isArray(tmp.children)) {
            tmp.children = filterAsyncRoutes(tmp.children, permissions);
            if (tmp.children.length > 0) {
                res.push(tmp);
            }
        } else {
            let permitted = hasPermission(permissions, tmp);
            if (permitted) {
                res.push(tmp);
            }
        }
    }
    return res;
}


export const accessedRoutes = []

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter(permissions = []) {
    let _accessedRoutes = filterAsyncRoutes(dynamicRoutes, permissions)
    _accessedRoutes = constantRoutes.concat(_accessedRoutes)
    const newRouter = createRouter(_accessedRoutes)
    router.matcher = newRouter.matcher // reset router

    accessedRoutes.splice(0, accessedRoutes.length)
    _accessedRoutes.forEach(route => {
        accessedRoutes.push(route)
    })
}

export default router
