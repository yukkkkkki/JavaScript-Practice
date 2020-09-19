# Webpack

1. 入口

2. 出口

3. **loader**

   - 对模块的源代码进行转换，可以在 `import` 或"加载"模块时预处理文件，类似于其他构建工具中“任务(task)”，并提供了处理前端构建步骤的强大方法

   - 可以将文件从不同的语言（如 TypeScript）转换为 JavaScript，或将内联图像转换为 data URL。loader 甚至允许你直接在 JavaScript 模块中 `import` CSS文件

   - 使用loader

     - 配置：在 **webpack.config.js** 文件中指定 loader
     - 内联：在每个 `import` 语句或任何等效于 "import" 的方式中指定 loader
     - CLI：在 shell 命令中指定它们

     ```javascript
     // 首先安装相对应的 loader
     npm install --save-dev css-loader
     npm install --save-dev ts-loader
     
     // 配置 webpack.config.js
     module.exports = {
       module: {
         rules: [
           { test: /\.css$/, use: 'css-loader' },
           { test: /\.ts$/, use: 'ts-loader' }
         ]
       }
     };
     ```

   - **loader特性：**

     - 支持链式传递。能够对资源使用流水线(pipeline)。一组链式的 loader 将按照相反的顺序执行。loader 链中的第一个 loader 返回值给下一个 loader。在最后一个 loader，返回 webpack 所预期的 JavaScript。
     - loader可以是同步的，也可以是异步的
     - loader 运行在 Node.js 中，并且能够执行任何可能的操作。
     - loader 接收查询参数。用于对 loader 传递配置。
     - loader 也能够使用 `options` 对象进行配置。
     - 除了使用 `package.json` 常见的 `main` 属性，还可以将普通的 npm 模块导出为 loader，做法是在 `package.json` 里定义一个 `loader` 字段。
     - 插件(plugin)可以为 loader 带来更多特性。
     - loader 能够产生额外的任意文件。

   - loader 通过（loader）预处理函数，为 JavaScript 生态系统提供了更多能力。

4. **plugins插件**

   - 插件目的在于解决loader无法实现的**其他事**

   - 是一个具有apply属性的JavaScript 对象。`apply` 属性会被 webpack compiler 调用，并且 compiler 对象可在**整个**编译生命周期访问。

     ```javascript
     const pluginName = 'ConsoleLogOnBuildWebpackPlugin';
     
     class ConsoleLogOnBuildWebpackPlugin {
         apply(compiler) {
             compiler.hooks.run.tap(pluginName, compilation => {
                 console.log("webpack 构建过程开始！");
             });
         }
     }
     ```

   - 用法：由于**插件**可以携带参数/选项，你必须在 webpack 配置中，向 `plugins` 属性传入 `new` 实例

5. 配置

6. 模块

7. **webpack打包原理**

> 参考链接
>
> 1. https://www.webpackjs.com/concepts/configuration/