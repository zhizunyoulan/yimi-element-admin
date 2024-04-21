const {users} = require('../db')
const {filterAndSortAndPage} = require('../utils')
module.exports = [
    {
      url: '/user/page',
      type: 'get',
      response: (config) => {
        const { nickName, phone, createTimeBegin, deptId, createTimeEnd, pageSize = 10, pageNum = 1 } = config.query

        let {pageList, total} = filterAndSortAndPage(users, {
          sample: {
            nickName: '~',
            phone: '=',
            createTime: '[]',
            deptId: '='
          },
          query: {
            nickName,
            phone,
            createTimeBegin,
            createTimeEnd,
            deptId
          }
        }, undefined, {pageSize, pageNum})

        return {
          code: 200,
          random: '@integer(300, 5000)',
          data: {
            rows: pageList,
            total
          }
        }
      }
    }
]