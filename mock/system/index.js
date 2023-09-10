const user = require('./user')
const menu = require('./menu')
const dept = require('./dept')

const mocks = [
  ...user,
  ...menu,
  ...dept
]

module.exports = mocks
  