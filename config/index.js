export default {
    baseUrl: {
        dev: {
            // Paths
            proxyTable: {
                '/api': {
                    target: 'http://localhost:8300',     // 目标url
                    changeOrigin: true,                     // 是否跨域
                    pathRewrite: {
                        '^/api': ''                         // 其中/api等价于前面的目标地址
                    }
                }
            },
        },
        prod: ''
    }
}