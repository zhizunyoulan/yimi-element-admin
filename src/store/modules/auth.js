import Cookies from "js-cookie";
import axios from 'axios'
import { login, logout, } from '@/api/auth'
import { getToken, setToken, removeToken } from '@/utils/auth'
var isAskingApi = false;
const state = {
    token: getToken(),
    roles: [],
    permissions: [],
    initialized: false,
    accessibleApis: {},
    authoritys: []
}

const getters = {
    roles: state => state.roles,
    initialized: state => state.initialized,
    isAdmin: (state) => () => {
        var existAdminRoleName = state.roles.find((roleName) => {
            return roleName.toUpperCase() == 'ROLE_ADMIN';
        })
        if (existAdminRoleName) {
            return true;
        } else {
            return false;
        }
    },
    accessibleApis: state => state.accessibleApis,
    isApiAccessible: (state) => (url, method) => {
        method = method.toUpperCase();
        try {

            if (url.charAt(0) != '/') {
                url = '/' + url;
            } else if (url == '/') {
                return true;
            }
            var antPatternMatchInfo = /^\/([\w*_-]+)\/?/.exec(url)
            var apiFirstPart = Object.keys(state.accessibleApis).find(antPatternFirstPart => {
                return antPatternFirstPart == antPatternMatchInfo[1]
            })
            if (!apiFirstPart) {
                apiFirstPart = state.accessibleApis['*'];
            }
            if (!apiFirstPart) {
                return true;
            } else {

                var accessibleApi = state.accessibleApis[apiFirstPart][method].find(accessibleApi => {
                    return accessibleApi.method === method && ((typeof accessibleApi.urlRex == 'string' && accessibleApi.urlRex == url) || (accessibleApi.urlRex instanceof RegExp && accessibleApi.urlRex.test(url)))
                });
                if (!accessibleApi) {
                    accessibleApi = state.accessibleApis[apiFirstPart][""].find(accessibleApi => {
                        return (typeof accessibleApi.urlRex == 'string' && accessibleApi.urlRex == url) || (accessibleApi.urlRex instanceof RegExp && accessibleApi.urlRex.test(url))
                    });
                }
                if (typeof accessibleApi != 'undefined') {
                    return accessibleApi.accessible;
                } else {
                    return true;
                }
            }
        } catch (e) {
            //TODO handle the exception
            console.error('isApiAccessible', e)
        }
    },
    //查看用户已有权限列表 是否有authoritys 调用此之前要调用 用一下 要判断一下当前角色是不是有ROLE_ADMIN方法
    hasAuthority: (state) => (authoritys) => {
        let variable = false;
        for (var i = 0; i < authoritys.length; i++) {
            for (var j = 0; j < state.authoritys.length; j++) {
                if (state.authoritys[j] == authoritys[i]) {
                    variable = true;
                    break;
                } else {
                    continue;
                }
            }
            if (variable) {
                break
            } else {
                continue;
            }
        }
        return variable;
    },
    //查看用户已有角色列表 是否有角色 调用此之前要调用 用一下 要判断一下当前角色是不是有ROLE_ADMIN方法
    hasRole: (state) => (roles) => {
        let variable = false;
        for (var i = 0; i < roles.length; i++) {
            for (var j = 0; j < state.roles.length; j++) {
                if (state.roles[j] == roles[i]) {
                    variable = true;
                    break;
                } else {
                    continue;
                }
            }
            if (variable) {
                break
            } else {
                continue;
            }
        }
        return variable;
    }
}


function makeApiTreeData(apis) {
    if (Array.isArray(apis)) {
        var apiTreeData = {}
        try {
            apis.forEach((api) => {
                if (api.antPattern) {
                    var antPatternMatchInfo = /^\/([\w*_-]+)\/?/.exec(api.antPattern);
                    if (antPatternMatchInfo != null && antPatternMatchInfo[1]) {
                        var antPatternFirstPart = antPatternMatchInfo[1]
                        if (!apiTreeData[antPatternFirstPart]) {
                            apiTreeData[antPatternFirstPart] = {
                                "GET": [],
                                "POST": [],
                                "PUT": [],
                                "DELETE": [],
                                "": []
                            }
                        }

                        if (api.antPattern.indexOf('*') != -1) {
                            const urlRex = '^' + api.antPattern.replace('*', '\\w+') + '(\/)?$'
                            apiTreeData[antPatternFirstPart][api.method].push({
                                urlRex: new RegExp(urlRex),
                                method: api.method,
                                accessible: api.accessible
                            })
                        } else {
                            apiTreeData[antPatternFirstPart][api.method].push({
                                urlRex: api.antPattern,
                                method: api.method,
                                accessible: api.accessible
                            })
                        }
                    } else {
                        console.error('antPatternMatchInfo not 1', api.antPattern, antPatternMatchInfo)
                    }

                }
            })
        } catch (e) {
            //TODO handle the exception
            console.error('get apis error', e)
        }

        return apiTreeData;
    }
}

const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_ROLES: (state, roles) => {
        state.roles = roles
    },
    SET_PERMISSIONS: (state, permissions) => {
        state.permissions = permissions
    },
    clearAccessibleApis: (state) => {
        // console.info('clearAccessibleApis')
        state.accessibleApis = {}
        state.initialized = false
    },
    setAccessibleApis: (state, apiTreeData) => {
        state.accessibleApis = apiTreeData;
        // console.info('accessibleApis',state.accessibleApis)
        state.initialized = true
        // console.info('accessibleApis',state)
    },
    setRoles: (state, roles) => {
        // console.info('set roles:', roles)
        state.roles = roles
    },
    setHasAuthority: (state, authoritys) => {

        state.authoritys = authoritys
    }
}

const actions = {
    // 登录
    Login({ commit }, {username,password,code,codeKey}) {
        username = username.trim()
        return new Promise((resolve, reject) => {
            login(username, password, code, codeKey).then(res => {
                setToken(res.access_token)
                commit('SET_TOKEN', res.access_token)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    // 退出系统
    Logout({ commit, state }) {
        return new Promise((resolve, reject) => {
            logout(state.token).then(() => {
                commit('SET_TOKEN', '')
                commit('SET_ROLES', [])
                commit('SET_PERMISSIONS', [])
                removeToken()
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
    clearApis({ commit }) {
        commit('clearAccessibleApis')
    },
    syncAuthoritys({ commit }, authoritys) {
        commit('setHasAuthority', authoritys)
    },
    syncApis({ state, commit }, { cookieName, authEndPoint, callback }) {
        if (cookieName && authEndPoint) {
            var flag = setInterval(() => {
                if (state.initialized) {
                    clearInterval(flag)
                    if (callback) {
                        callback(true)
                    }
                } else if (Cookies.get(cookieName)) {
                    if (!isAskingApi) {
                        isAskingApi = true;
                        console.info('to sync api')
                        axios.request(authEndPoint).then((res) => {
                            if (Array.isArray(res.data.roleNames)) {
                                commit('setRoles', res.data.roleNames)
                            }
                            if (Array.isArray(res.data.apis)) {
                                var apiTreeData = makeApiTreeData(res.data.apis)
                                if (apiTreeData) {
                                    commit('setAccessibleApis', apiTreeData)
                                    clearInterval(flag)
                                    if (callback) {
                                        callback(true)
                                    }
                                }
                            }
                            isAskingApi = false;
                        }).catch(error => {
                            if (error.response && error.response.status == 401) {
                                clearInterval(flag)
                                Cookies.remove(cookieName)
                            }
                            isAskingApi = false;
                            if (callback) {
                                callback(false)
                            }
                        })
                    }
                } else {
                    console.info('sync cookieName', Cookies.get(cookieName))
                }


            }, 2000)
        } else {
            console.error('need authEndPoint')
        }
    }
}


export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}