const path = require("path");
const HtmlWebpakcPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const fileWebpackPlugin = require("./myPlugins/file-webpack-plugin.js");

module.exports = {
  // entry: "./src/index.js",
  entry: {
    test: "./src/index.js",
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    //hash 构建一次变一次
    //chunkhash 入口文件的变化
    //contenthash 每个文件变化
    //问题：为什么官方推荐js使用chunkhash，css使用contenthash 可以通过修改文件尝试一下！
    filename: "[name]_[chunkhash:8].js", //test_chunkhas.js
  },
  // eval:速度最快，使用eval包裹模块代码，
  // source-map:产生.map文件
  // cheap:较快，不包含列信息
  // Module:第三方模块，包含loader的sourcemap(比如jsxtojs,babel的sourcemap)
  // inline:将.map作为DataURI嵌入，不单独生成.map文件
  // 推荐配置
  //  devtool:"cheap-module-eval-source-map",//开发环境配置
  // devtool:"cheap-module-source-map",//线上生成配置
  devtool: "eval",
  mode: "development", //production、develoment、none
  // development:启用NamedChunksPlugin和NamedModulesPlugin。
  // production:启用FLagDependencyUsagePlugin,FlagIncludedChunksPlugin,ModuleConcatenationPlugin,NoEmitOnErrorsPlugin, OccurrenceOrderPlugin,SideEffectsFlagPlugin和TerserPlugin。
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/,
        // use: "file-loader",
        use: {
          loader: "file-loader",
          options: {
            name: "[name][hash].png",
            outputPath: "images/",
            //小于limit，转化成base64写入js1
            limit: 2048,
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"], //多个loader从右向左
      },
      {
        test: /\.less$/,
        use: ["my-style-loader", "my-css-loader", {
          loader: "my-less-loader",
          options: {
            name: "scssloader",
          },
        }], //多个loader从右向左
      },
    ],
  },
  resolveLoader: {
    modules: ["./node_modules", "./myLoaders"],
  },
  plugins: [new HtmlWebpakcPlugin(), new CleanWebpackPlugin(), new fileWebpackPlugin()],
  devServer: {
    port: 8081,
    contentBase: path.join(__dirname, "dist"),
    open: true,
  },
  // watch: true,//false
  // watchOptions:{
  //   ignored:'/node_modules',
  //   aggregateTimeout:300,
  //   poll:1000
  // }
};
