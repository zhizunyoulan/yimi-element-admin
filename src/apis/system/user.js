// 分页查询用户列表
export const queryUser = {
    url: '/user/page'
}

// 添加用户
export const addUser = {
    url: '/user',
    method: 'POST',
}

// 修改用户
export const updateUser = {
    url: '/user',
    method: 'PUT',
}


// 删除用户
export function removeUser(id) {
    return {
        url: `/user/${id}`,
        method: 'DELETE',
    }
}