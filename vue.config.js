const path = require('path');

function resolve(dir) {
    return path.join(__dirname, dir)
}
// 导入compression-webpack-plugin
// const CompressionWebpackPlugin = require('compression-webpack-plugin')
// configureWebpack: config => {
//     if(process.env.NODE_ENV === 'production'){
//         return {
//             plugins: [new CompressionPlugin({
//                 test: /\.js$|\.html$|\.css/,
//                 threshold: 10240,
//                 deleteOriginalAssets: false
//             })]
//         }
//     }
// },
module.exports = {

    lintOnSave: false,
    chainWebpack: (config) => {
        config.resolve.alias
            .set('@$', resolve('src'))
            .set('assets', resolve('src/assets'))
            .set('components', resolve('src/components'))
            .set('layout', resolve('src/layout'))
            .set('base', resolve('src/base'))
            .set('static', resolve('src/static'))
    },
    // 打包时不生成.map文件 
    productionSourceMap: false,
    // productionGzip: true,

    publicPath: "/",
    assetsDir: "",
    devServer: {
        proxy: {
            '/api': {
                target: 'http://192.168.31.11:8089',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': 'http://192.168.31.11:8089'
                }
            },
        },
        host: '192.168.1.102',
        port: 8080,
    }

}