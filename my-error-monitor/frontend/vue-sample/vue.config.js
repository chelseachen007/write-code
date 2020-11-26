// const UploadSourceMapWebPackPlugin = require('./plugin/uploadSourceMapWebPackPlugin')

module.exports = {
    configureWebpack: {
        // plugins: [
        //     new UploadSourceMapWebPackPlugin({
        //         uploadUrl: 'http://localhost:7001/monitor/sourcemap'
        //     })
        // ]
    },
    devServer: {
        overlay: {
            warnings: true,
            errors: true
        }
    },
    lintOnSave: false
}