import request from '@/utils/request'

export function deptTreeQuery(query) {
    return request({
        url: '/system/dept/tree',
        method: 'get',
        params: query
    })
}

