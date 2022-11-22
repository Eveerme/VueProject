const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true ,
  devServer: {
    port: 8080 // 此处修改你想要的端口号
  }
})
