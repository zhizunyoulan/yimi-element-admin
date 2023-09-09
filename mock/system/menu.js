module.exports = [
    {
        url: '/menu',
        type: 'get',
        response: () => {
            return {
                code: 200,
                random: '@integer(300, 5000)',
                data: {
                    'rows|3': [
                        {
                            'id|+1': 1,
                            'name|+1': ['系统管理', '数据管理', '运维管理'],
                            'path': /[a-g]{3}-[a-g]{3}/,
                            'children|1-3': [
                                {
                                    'id': '@integer(300, 5000)',
                                    'name|+1': ['用户管理', '菜单管理', '部门管理'],
                                    'path': /[h-z]{3}-[h-z]{3}/,
                                }
                            ]

                        }
                    ]
                }
            }
        }
    }

]