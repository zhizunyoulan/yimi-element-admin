// 获取验证码
export const getCodeImg = {
  url: "/captcha/image",
  headers: {
    isToken: false,
  },
  method: "get",
  timeout: 20000,
};