# 设计模式

1. **工厂模式**

2. **单例模式**

   - 单例模式思想在于保证一个特定类仅有一个实例，意味着当你第二次使用同一个类创建信对象时，应得到和第一次创建对象完全相同

   - 特点
     - 可以来划分命名空间，从而清除全局变量所带来的风险
     - 可以把代码组织的更为一体，便于阅读和维护
     - 可以被实例化，且实例化一次

   ```javascript
   var Singleton = function (name) {
     this.name = name;
   };
   
   Singleton.prototype.getName = function () {
     return this.name;
   };
   
   // 获取实例对象
   var getInstance = (function () {
     var instance = null;
     return function (name) {
       if (!instance) {
         instance = new Singleton(name);
       }
       return instance;
     };
   })();
   
   var a = getInstance("aa");
   var b = getInstance("bb");
   console.log(b.getName()); // "aa"
   console.log(a === b); // true
   ```

   - 应用示例：实现一个遮罩层，来防止用户中断页面操作

   ```javascript
   var createMask = function () {
     var div = document.createElement("div");
     div.innerHTML = "遮罩层";
     div.style.display = "none";
     document.body.appendChild(div);
     return div;
   };
   
   // 创建iframe
   var createIframe = function () {
     var iframe = document.createElement("iframe");
     document.body.appendChild(iframe);
     return iframe;
   };
   
   // 获取示例的封装代码
   var getInstance = function (fn) {
     var result;
     return function () {
       return result || (result = fn.call(this, arguments));
     };
   };
   
   // 测试创建遮罩层
   var createSingleMask = getInstance(createMask);
   document.querySelector("body").onclick = function () {
     var win = createSingleMask();
     win.style.display = "block";
   };
   
   // 测试创建iframe
   var createSingleIframe = getInstance(createIframe);
   document.querySelector("body").onclick = function () {
     var win = createSingleIframe();
     win.src = "https://www.example.com/";
   };
   ```

3. **模块模式**

   - 模块模式是为单例创建私有变量和特权方法，并减少全局变量的使用

   ```javascript
   var singleMode = (function(){
     // 创建私有变量
     var privateNum = 112;
     // 创建私有方法
     function privateFunc(){},
     // 创建公有方法
     function publicMethod1(){},
     function publicMethod2(){},
     // 返回一个对象包含公有方法和属性
     return {
         publicMethod1: publicMethod1,
         publicMethod2: publicMethod2
     };
   })();
   ```

   - 以下代码援引自小黄书

   ```javascript
   function CoolModule() {
     // 私有变量
     var something = "cool";
     var another = [1, 2, 3];
   
     function doSomething() {
       console.log(something);
     }
   
     function doAnother() {
       console.log(another.join(" ! "));
     }
   
     // 返回一个对象包含公有(特权)方法和属性
     return {
       doSomething: doSomething,
       doAnother: doAnother,
     };
   }
   
   var foo = CoolModule();
   
   foo.doSomething(); // cool
   foo.doAnother(); // 1!2!3
   ```

   - 模块模式需要具备两个必要条件

     - 必须有外部的封闭函数，该函数必须至少被调用一次(每次调用都会创建一个新的模块实例)

     - 封闭函数必须返回至少一个内部函数，这样内部函数才能在私有作用域中形成闭包，并且可以访问或者修改私有的状态。

     - 总结模块模式的两个特点就是：调用包装了函数定义的包装函数，并且将返回值作为该模块的 API

       - 可以给将要作为公共 API 返回的对象命名，于是可以在内部对模块实例进行修改，包括添加或删除方法和属性，以及修改它们的值

   - 使用场景：创建一个对象时，需要进行内部初始化，同时对内部属性跟方法有访问权限限制，就需要使用模块模式了

4. **代理模式**

5. **发布-订阅模式**

6. **观察者模式**

7. **适配器模式**

8. **策略模式**

9. **职责链模式**

10. **设计原则**



> 参考链接
>
> 1. https://juejin.im/post/5c071f68e51d451dcd3c3077
> 2. https://juejin.im/post/5c071f2ff265da6115109302