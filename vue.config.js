module.exports = {
    lintOnSave: false,
    baseUrl: './',
    // assetsSubDirectory: 'static',
    // assetsPublicPath: './',
    devServer: {
        port: 8085, // 端口号
        host: 'localhost',
        https: false, // https:{type:Boolean}
        open: true, //配置自动启动浏览器
        // proxy: 'http://localhost:4000' // 配置跨域处理,只有一个代理
        // proxy: {
        //     '/api': {
        //         target: 'http://101.132.141.115:9095/ldview-interface/f',
        //         changeOrigin: true,
        //         ws: true,
        //         pathRewrite: {
        //             '^/api': 'http://101.132.141.115:9095/ldview-interface/f'
        //         }
        //     }
        // },  // 配置多个代理
    }
}
