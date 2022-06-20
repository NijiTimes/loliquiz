module.exports = {
    lintOnSave:false
    ,//publicPath: process.env.NODE_ENV === "production" ? '/my-vue-admin/' : "/"
    devServer:{
        proxy:{
            '/socket.io':{
                target: 'http://localhost:3000',
                changeOrigin:true
            }
        }
    },
    productionSourceMap:false
}