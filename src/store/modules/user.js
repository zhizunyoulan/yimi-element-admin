import { convertApis } from "@/utils/api";
import * as userApis from "@/apis/auth/user";
let { login, logout, getInfo, getMenu } = convertApis(userApis)
import { getToken, setToken, removeToken } from "@/utils/auth";
import { convertRoutesToMenu } from "@/utils/route";
import {iterateRecursively} from '@/utils/recursive'
import request from "@/utils/request";

function getRouter() {
  return import("@/router");
}

const state = {
  token: getToken(),
  roles: [],
  permissions: [],
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
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles;
  },
  SET_PERMISSIONS: (state, permissions) => {
    state.permissions = permissions;
  },
  SET_ACCESSED_ROUTES: (state, accessedRoutes) => {
    state.accessedRoutes = accessedRoutes;
  },
  SET_MENU: (state, menu) => {
    state.menu = menu;
  },
};

const actions = {
  // 登录
  login({ commit }, { username, password, code, cacheKey }) {
    username = username.trim();
    return new Promise((resolve, reject) => {
      request(login(username, password, code, cacheKey))
        .then((res) => {
          setToken(res.access_token);
          commit("SET_TOKEN", res.access_token);
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  // 退出系统
  logout({ commit }) {
    return new Promise((resolve) => {
      request(logout)
        .then(() => {
          commit("SET_TOKEN", "");
          commit("SET_ROLES", []);
          commit("SET_PERMISSIONS", []);
          removeToken();
          resolve();
        })
        .catch((error) => {
          console.error(error);
          removeToken();
          resolve();

          // reject(error);
        });
    });
  },
  authenticate({ commit, dispatch }) {
    request(getInfo).then((res) => {
      commit("SET_ROLES", res.data.roleNames);
      let userPermissionCodes = res.data.permissionCodes;
      commit("SET_PERMISSIONS", userPermissionCodes);
      getRouter().then((module) => {
        module.resetRouter(userPermissionCodes);
        commit("SET_ACCESSED_ROUTES", module.accessedRoutes);
      });
    }).catch(error => {
      console.log('authenticate fail:' ,error)
    })
    dispatch("loadMenu");
  },
  loadMenu({ commit }) {
    return new Promise((resolve) => {
      request(getMenu).then((res) => {
        let menu = res?.data?.rows || [];
        iterateRecursively(menu, (menuItem) => {
          menuItem.meta = {
            title: menuItem.title,
            icon: menuItem.icon,
            affix: true
          }
        })
        commit("SET_MENU", menu);
        resolve(menu);
      }).catch(error => {
        console.log('get menu fail:' ,error)
      });
    });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
