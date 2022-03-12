// CommonJS 语法
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  mode: 'development',
  // 打包入口，告诉webpack，从index.js开始进行打包
  entry: path.join(__dirname, 'src', 'index.js'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: path.join(__dirname, 'src'),
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'index.html'),
      filename: 'index.html',
    }),
  ],
  // 帮助实时地编译最新的代码
  // webpack-dev-server 会把打包生成的文件放在一个内存里，不会生成一个真正的文件
  devServer: {
    port: 8000,
    static: path.join(__dirname, 'dist'),
  },
};
