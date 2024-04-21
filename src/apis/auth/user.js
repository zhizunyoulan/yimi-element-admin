import qs from "qs";
// 登录方法
export function login(username, password, code, cacheKey) {
  return {
    url: "/oauth/token",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    method: "POST",
    data: qs.stringify({
      grant_type: "password_captcha",
      username,
      password,
      scope: "server",
      cacheKey,
      code,
    }),
    auth: {
      username: "admin",
      password: "admin",
    },
  };
}

// 注册方法
export function register(data) {
  return {
    url: "/register",
    headers: {
      isToken: false,
    },
    method: "post",
    data: data,
  };
}

// 获取用户详细信息
export const getInfo = {
  url: "/user/me",
  method: "get",
};

export const getMenu = {
  url: "/menu/me",
  method: "get",
};

// 退出方法
export const logout = {
  url: "/logout",
  method: "post",
};


