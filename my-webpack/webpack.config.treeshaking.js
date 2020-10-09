const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
module.exports = {
  entry: "./src/tree-shaking/main.js",

  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name]-[hash:8].js", //test_chunkhas.js
  },
  devtool: "source-map",
  mode: "none", //production、develoment、none
  optimization: {
    sideEffects: true,

    // 模块只导出被使用的成员
    usedExports: true,
    // 尽可能合并每一个模块到一个函数中
    concatenateModules: false,
    // 压缩输出结果
    minimize: false
  },
  plugins: [
    new CleanWebpackPlugin()
  ]
};
