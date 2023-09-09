const path = require('path');
const fs = require('fs');
const {users} = require('./db')

let codeCache = {}
const tokenMap = users.reduce((map, user) => {
  map[user.username + '-token'] = user
  return map
},{})


module.exports = [

  // get user info
  {
    url: '/user/info\\.*',
    type: 'get',
    response: config => {
      const { token } = config.query
      const info = tokenMap[token]

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        code: 20000,
        data: info
      }
    }
  },

  //
  {
    url: '/captchaImage',
    type: 'get',
    response: () => {
      let filesPaths = fs.readdirSync(path.resolve('src/assets/mock/captcha'))
      let code = filesPaths[Math.round(Math.random() * 10)]
      let data = fs.readFileSync('src/assets/mock/captcha/' + code)
      let codeImageStr = Buffer.from(data).toString('base64')
      let codeKey = (new Date()).valueOf()
      codeCache = {}
      codeCache[codeKey] = code.replace('.jpg', '')
      return {
        code: 200,
        captcha: codeImageStr,
        codeKey: codeKey
      }
    }
  },
  {
    url: '/login',
    type: 'post',
    response: (config) => {
      let { username, code, codeKey } = config.body;
      if (tokenMap[username + '-token']) {
        if (code == codeCache[codeKey]) {
          return {
            access_token: username + '-token',
            "token_type": "bearer"
          }
        } else {
          throw {
            status: 400,
            message: '验证码错误'
          }
        }

      } else {
        throw {
          status: 401,
          message: '用户名或密码错误'
        }
      }
    }
  },
  {
    url: '/logout',
    type: 'post',
    response: () => {
      return {
        code: 200,
        data: 'ok'
      }
    }
  }
]
