window.config = {
    //后端基础地址，例如：http://www.zhonghan.com:9091

    //后端基础地址映射，优先级高于baseUrl
    // baseURLMapping: {
    //     'http://10.32.19.248:8090': [
    //         'http://10.32.19.248:8080'
    //     ],
    //     'http://172.168.121.248:8090': [
    //         'http://172.168.121.248:8080'
    //     ],
    //     'http://192.168.2.230:8090': [
    //         'http://192.168.2.230:80',
    //         'http://192.168.2.230:'
    //     ],
    // },
    // baseURLMapping: {
    //     'http://www.zhonghan.com:8070': [
    //         'http://dev.zhonghan.com:80',
    //         'http://dev.hebeizhonghan.cn:80'
    //     ],
    //     'http://www.zhonghan.com:8090': [
    //         'http://full.zhonghan.com:80',
    //         'http://full.hebeizhonghan.cn:80'
    //     ],
    // },
    baseURLMapping: {
        'http://www.hebeizhonghan.cn:8070': [
            'http://dev.zhonghan.com:80',
            'http://dev.hebeizhonghan.cn:80'
        ],
        'http://www.hebeizhonghan.cn:8090': [
            'http://full.zhonghan.com:80',
            'http://full.hebeizhonghan.cn:80'
        ],
    },
}