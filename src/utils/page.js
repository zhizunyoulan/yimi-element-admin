

export function getAllPages() {
    let pagesMap = {}
    const componentPaths = require.context('@/views', true, /\.vue$/).keys().map(i => {
        return i.match(/\.\/(.*)\.vue/)[1]
    })

    componentPaths.forEach((path) => {
        const module = require('@/views/' + path + '.vue')
        if (module.default) {
            pagesMap[path] = {
                path,
                name: module.default.name,
                pageInfo: module.default.pageInfo
            }
        }
    });

    return pagesMap
}