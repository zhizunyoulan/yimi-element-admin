const path = require('path');
const fs = require('fs');
const { users } = require('./db')

let codeCache = {}
const tokenMap = users.reduce((map, user) => {
  map[user.username + '-token'] = user
  return map
}, {})


module.exports = [

  // get user info
  {
    url: '/user/me\\.*',
    type: 'get',
    response: config => {
      const { token } = config.query
      console.log('user token', token)
      // const info = tokenMap[token]

      // mock error
      // if (!info) {
      //   return {
      //     code: 50008,
      //     message: 'Login failed, unable to get user details.'
      //   }
      // }

      return {
        code: 200,
        data: {
          roleNames: ["ROLE_ADMIN"],
          permissionCodes: ['system:**']
        }
      }
    }
  },

  //
  {
    url: '/captcha/image',
    type: 'get',
    response: () => {
      let filesPaths = fs.readdirSync(path.resolve('src/assets/mock/captcha'))
      let code = filesPaths[Math.round(Math.random() * 10)]
      let data = fs.readFileSync('src/assets/mock/captcha/' + code)
      let codeImageStr = Buffer.from(data).toString('base64')
      let cacheKey = (new Date()).valueOf()
      codeCache = {}
      codeCache[cacheKey] = code.replace('.jpg', '')
      return {
        status: 200,
        data: {
          captcha: "data:image/png;base64," + codeImageStr,
          cacheKey: cacheKey
        }

      }
    }
  },
  {
    url: '/oauth/token',
    type: 'post',
    response: (config) => {
      let { username, code, cacheKey } = config.body;
      if (tokenMap[username + '-token']) {
        if (code == codeCache[cacheKey]) {
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
    url: '/menu/me',
    type: 'get',
    response: () => {
      return {
        code: 200,
        random: '@integer(300, 5000)',
        data: {
          'rows': []
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
