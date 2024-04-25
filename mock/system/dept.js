const {depTree, latestIds} = require('../db')

// let lastId = lastDeptId
const { findTargetRecursively } = require('../utils')
module.exports = [
  {
    url: '/department/tree',// 查询行业树
    type: 'get',
    response: () => {
      return {
        code: 200,
        data: {
          rows: depTree
        }
      }
    }
  },
  {
    url: '/department',// 新增行业节点
    type: 'post',
    response: (config) => {
      let { parentId, name, code } = config.body;
      if (parentId) {
        let parentDep = findTargetRecursively({
          children: depTree
        }, 'children', 'id', parentId)
        if (parentDep) {
          if (!Array.isArray(parentDep.children)) {
            parentDep.children = []
          }
          parentDep.push({
            id: latestIds.deptId ++,
            name,
            code
          })
          return {
            code: 200,
            data: 'OK'
          }
        } else {
          return {
            code: 500,
            data: '找不到上一级部门'
          }
        }
      } else {
        depTree.push({
          id: latestIds.deptId ++,
          name,
          code
        })
        return {
          code: 200,
          data: 'OK'
        }
      }
    }
  },
  {
    url: '/department',// 修改行业 （name）
    type: 'put',
    response: (config) => {
      let { id, name } = config.body;
      
      if (id) {
        let targetDept = findTargetRecursively({
          children: depTree
        }, 'children', 'id', id)
        if (targetDept) {
          targetDept.name = name
          return {
            code: 200,
            data: 'OK'
          }
        } else {
          return {
            code: 500,
            data: '找不到部门'
          }
        }

      } else {
        return {
          code: 500,
          data: 'id不能为空'
        }
      }
    }
  }
]