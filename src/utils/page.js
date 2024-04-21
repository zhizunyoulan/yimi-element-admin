const parseModule = (root, path) => require("@/" + root + "/" + path + ".vue");

const pagePaths = require
    .context("@/views", true, /\.vue$/)
    .keys()
    .map((i) => {
        return i.match(/\.\/(.*)\.vue/)[1];
    });



export const pathTree = [];
export const pages = [];

export function scanViews(){
    console.log('scan pages...')
    const pathMap = {};
    pagePaths.forEach((pagePath) => {
        const pageModule = parseModule("views", pagePath);
        if (pageModule.default) {
            let paths = pagePath.split("/");
            for (var i = 0; i < paths.length - 1; i++) {
                let parentPath = paths.slice(0, i).join("/");
                let path = paths.slice(0, i + 1).join("/");
                let pathItem = pathMap[path];
                if (!pathItem) {
                    pathItem = {
                        path,
                        children: [],
                    };
                    pathMap[path] = pathItem;
                    if (parentPath) {
                        let parentPathItem = pathMap[parentPath];
                        if (parentPathItem) {
                            parentPathItem.children.push(pathItem);
                        }
                    } else {
                        pathTree.push(pathItem);
                    }
                }
            }
    
            if (!pageModule.default.pageInfo) {
                pageModule.default.pageInfo = {};
            }
            let page = pageModule.default.pageInfo;
            page.path = pagePath;
            let parentItem = pathMap[paths.slice(0, paths.length - 1).join("/")];
            if (parentItem) {
                parentItem.children.push(page);
            }
    
            if (pageModule.default.apis) {
                page.apis = Object.keys(pageModule.default.apis).map((prop) => {
                    let api = pageModule.default.apis[prop];
                    if (typeof api == "function") {
                        api = api();
                    }
                    api.antPattern = api.url.replaceAll("undefined", "*");
                    api.method = api.method || "GET";
                    return api;
                });
            }
            pages.push(page);
        } else {
            console.warn('"@/utils/page.js" should not be import in views:', pagePath)
        }
    });
}
