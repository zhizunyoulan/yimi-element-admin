

module.exports = [
  {
    url: '/demo/sayhello',
    type: 'post',
    response: () => {
      return {
        code: 200,
        data: 'ok'
      }
    }
  },
  {
    url: '/demo/user',
    type: 'post',
    response: () => {
      return {
        code: 200,
        data: 'ok'
      }
    }
  }
]