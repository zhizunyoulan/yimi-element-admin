import { convertApis } from "@/utils/api";
import * as userApis from "@/apis/auth/user";
let { login, logout, getMenu } = convertApis(userApis)
import { getToken, setToken, getRoles, setRoles, getPermissions, setPermissions, removeAuthorities } from "@/utils/auth";
import { convertRoutesToMenu } from "@/utils/route";
import { iterateRecursively } from '@/utils/recursive'
import request from "@/utils/request";

function getRouter() {
  return import("@/router");
}

const state = {
  token: getToken(),
  roles: getRoles(),
  permissions: getPermissions(),
  menu: [],
  accessedRoutes: [],
};

const getters = {
  roles: (state) => state.roles,
  menu: (state) => {
    if (state.menu.length > 0) {
      return state.menu;
    } else {
      return convertRoutesToMenu(state.accessedRoutes);
    }
  },
};

const mutations = {
  // SET_TOKEN: (state, token) => {
  //   state.token = token;
  // },
  // SET_ROLES: (state, roles) => {
  //   state.roles = roles;
  // },
  // SET_PERMISSIONS: (state, permissions) => {
  //   state.permissions = permissions;
  // },
  SET_ACCESSED_ROUTES: (state, accessedRoutes) => {
    state.accessedRoutes = accessedRoutes;
  },
  SET_MENU: (state, menu) => {
    state.menu = menu;
  },
};

const actions = {
  // 登录
  login(context, { username, password, code, cacheKey }) {
    username = username.trim();
    return new Promise((resolve, reject) => {
      request(login(username, password, code, cacheKey))
        .then((res) => {
          setToken(res.access_token);
          setRoles(res.roles);
          setPermissions(res.permissions);
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  // 退出系统
  logout() {
    return new Promise((resolve) => {
      request(logout)
        .then(() => {
          removeAuthorities();
          resolve();
        })
        .catch(() => {
          removeAuthorities();
          resolve();
        });
    });
  },
  // authenticate({ state, commit, dispatch }) {
  //   getRouter().then((module) => {
  //     module.resetRouter(state.permissions);
  //     commit("SET_ACCESSED_ROUTES", module.accessedRoutes);
  //   });
  //   dispatch("loadMenu");
  // },
  loadMenu({ state, commit }) {
    new Promise((resolve) => {
      if (state.menu.length > 0) {
        resolve(state.menu);
      } else {
        request(getMenu).then((res) => {
          let menu = res?.data?.rows || [];
          iterateRecursively(menu, (menuItem) => {
            if(menuItem.type == 'ExternalLink') {
              menuItem.path = '-'
            }
            menuItem.meta = {
              title: menuItem.title,
              icon: menuItem.icon,
              affix: true
            }
          })
          commit("SET_MENU", menu);
          resolve(menu);
        }).catch(error => {
          console.error('获取菜单失败:', error.message || error.msg || error)
        });
      }
    }).then(menu => {
      getRouter().then((module) => {
        module.resetRouter(menu);
        commit("SET_ACCESSED_ROUTES", module.accessedRoutes);
      });
    })
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
