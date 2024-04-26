const Mock = require('mockjs')

// 用户表
let userTable = {
    'users|25': [
        {
            id: '@increment(2)',
            username: '@first',
            realName: '@cname',
            'deptId|1-12': 1,
            contactNumber: '@phone',
            email: '@email',
            'status': 1,
            'userType': 0,
            'createTime': '@datetime',
            timestamp: +Mock.Random.date('T'),
        }
    ]
}
const { users } = Mock.mock(userTable)
users.unshift(
    Mock.mock({
        id: 1,
        username: 'admin',
        realName: '管理员',
        contactNumber: '@phone',
        email: '@email',
        status: 1,
        userType: 1,
        'createTime': '@datetime',
        timestamp: +Mock.Random.date('T'),
    })
)

let latestIds = {
    userId: 1000,
    deptId: 13
}

// 部门树
let depTree = [
    {
        id: 1,
        name: '人力资源部',
        code: '00100'
    },
    {
        id: 2,
        name: '财务部',
        code: '00200'
    },
    {
        id: 3,
        name: '生产管理部',
        code: '00300'
    },
    {
        id: 4,
        name: '生产车间',
        code: '00400',
        children: [
            {
                id: 9,
                name: '生产1组',
                code: '00401'
            },
            {
                id: 10,
                name: '生产2组',
                code: '00402'
            },
        ]
    },
    {
        id: 5,
        name: '质量检验部',
        code: '00500',
        children: [
            {
                id: 11,
                name: '采样组',
                code: '00501'
            },
            {
                id: 12,
                name: '化验组',
                code: '00502'
            },
        ]
    },
    {
        id: 6,
        name: '质量管理部',
        code: '00600'
    },
    {
        id: 7,
        name: '研发部',
        code: '00700'
    },
    {
        id: 8,
        name: '供应部',
        code: '00800'
    },
]
// let lastDeptId = 13




module.exports = {
    users,
    latestIds,
    depTree,
    // lastDeptId
}