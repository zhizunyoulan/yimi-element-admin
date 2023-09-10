/**
 * @param {string} url
 * @returns {Object}
 */
function param2Obj(url) {
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
  if (!search) {
    return {}
  }
  const obj = {}
  const searchArr = search.split('&')
  searchArr.forEach(v => {
    const index = v.indexOf('=')
    if (index !== -1) {
      const name = v.substring(0, index)
      const val = v.substring(index + 1, v.length)
      obj[name] = val
    }
  })
  return obj
}

/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 * @param {Object} source
 * @returns {Object}
 */
function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'deepClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}


function findTargetRecursively(item, childrenKey, propKey, propVal) {
  if (item[propKey] == propVal) {
    return item;
  } else {
    if (Array.isArray(item[childrenKey])) {
      return item[childrenKey].reduce((target, current) => {
        if (target) {
          return target;
        } else {
          let _target = findTargetRecursively(
            current,
            childrenKey,
            propKey,
            propVal
          );
          return _target;
        }
      }, undefined);
    }
  }
}


// 从列表中查询、排序、分页
function filterAndSortAndPage(list, { sample, query } = {}, sort, page) {
  if (sample && query) {
    list = list.filter(item => {
      let use = true
      Object.keys(sample).forEach(prop => {
        if (use) {
          let val = sample[prop]
          switch (val) {
            case '[]':
              use = !use ? false : (query[prop + 'Begin'] ? new Date(query[prop + 'Begin']).getMilliseconds() <= new Date(item[prop]).getMilliseconds() : true)
                && (query[prop + 'End'] ? new Date(query[prop + 'End']).getMilliseconds() >= new Date(item[prop]).getMilliseconds() : true)
              break;
            case '~':
              use = !use ? false : (query[prop] ? item[prop]?.indexOf(query[prop]) != -1 : true)
              break;
            default:
              use = !use ? false : (query[prop] ? query[prop] == item[prop] : true)
          }
        }
      })
      return use
    })
  }

  if (sort?.sortBy) {
    let order = sort.sortBy == 'asc' ? 1 : -1
    list = list.sort((a, b) => {
      return ((a[sort.sortBy] || 0) > (b[sort.sortBy] || 0)) ? order : -order
    })
  }

  let total = list.length

  if (page.pageSize && page.pageNum) {
    list = list.slice((
      page.pageNum - 1) * page.pageSize,
      page.pageNum * page.pageSize
    )
  }
  return {
    pageList: list,
    total
  }
}

module.exports = {
  param2Obj,
  deepClone,
  findTargetRecursively,
  filterAndSortAndPage
}
