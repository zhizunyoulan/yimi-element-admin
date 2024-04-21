const user = require('./user')
const menu = require('./menu')
const dept = require('./dept')
const api = require('./api')

const mocks = [
  ...user,
  ...menu,
  ...dept,
  ...api
]

module.exports = mocks
  