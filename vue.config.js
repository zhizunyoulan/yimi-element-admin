const path = require("path");
function resolve(dir) {
    return path.join(__dirname, dir);
}

// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
// You can change the port by the following method:
// port = 9527 npm run dev OR npm run dev --port = 9527
const port = process.env.port || process.env.npm_config_port || 9527 // dev port

const config = {
    devServer: {
        port: port,
        open: true,
        overlay: {
            warnings: false,
            errors: true
        },
        before: require('./mock/mock-server.js')
    },
    configureWebpack: {
        resolve: {
            extensions: ["js", "vue"],
            alias: {
                'assets': resolve('./src/assets'),
                "@": resolve("src"),
            },
        },
        performance: {
            hints: 'warning',
            //入口起点的最大体积 整数类型（以字节为单位）
            maxEntrypointSize: 50000000,
            //生成文件的最大体积 整数类型（以字节为单位 300k）
            maxAssetSize: 30000000,
            //只给出 js 文件的性能提示
            assetFilter: function (assetFilename) {
                return assetFilename.endsWith('.js');
            }
        },
    },
    lintOnSave: process.env.NODE_ENV === 'development',
    chainWebpack(config) {
        // set svg-sprite-loader
        config.module
            .rule("svg")
            .exclude.add(resolve('src/assets/icons'))
            .end();
        config.module
            .rule("icons")
            .test(/\.svg$/)
            .include.add(resolve('src/assets/icons'))
            .end()
            .use("svg-sprite-loader")
            .loader("svg-sprite-loader")
            .options({
                symbolId: "icon-[name]",
            })
            .end();

        config.when(process.env.NODE_ENV == "development", (config) => {
            config
                .plugin("ScriptExtHtmlWebpackPlugin")
                .after("html")
                .use("script-ext-html-webpack-plugin", [
                    {
                        // `runtime` must same as runtimeChunk name. default is `runtime`
                        inline: /runtime\..*\.js$/,
                    },
                ])
                .end();
        });
    },
};



module.exports = config;