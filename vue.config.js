const { defineConfig } = require('@vue/cli-service')
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')

module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack : function(config) {
    config.plugin('monaco').use(new MonacoWebpackPlugin())
  },
  devServer: {
    host: 'localhost',
    port: 8080,
    https: false,
    proxy: {
        '/api': {
            target: 'http://localhost:8300',
            ws: true,
            changeOrigin: true
        }
    }
}
})

  