import request from '@/utils/request'

export function getPage(query) {
    return request({
        url: '/mall/userinfo/page',
        method: 'get',
        params: query
    })
}