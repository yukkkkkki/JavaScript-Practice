# ES6

1. **let、const**

   - let：声明变量；块级作用域；不会被变量提升

   - const：声明常量；块级作用域；const 声明不允许修改绑定，但允许修改值
     - 即声明对象时，可以修改对象的属性值

2. **箭头函数**

   - 箭头函数里面根本没有自己的 this，而是引用外层的 this

     ```javascript
     var handler = {
       id: "123456",
     
       init: function () {
         document.addEventListener(
           "click",
           (event) => this.doSomething(event.type),
           false
         );
       },
     
       doSomething: function (type) {
         console.log("Handling " + type + " for " + this.id);
       },
     };
     ```

     上面代码的 init 方法中，使用了箭头函数，这导致这个箭头函数里面的 this，总是指向 handler 对象

   - 除了 this，以下三个变量在箭头函数之中也是不存在的，指向外层函数的对应变量

     - arguments、super、new.target

   - 使用注意点

     - 函数体内的 this 对象，就是定义时所在的对象，而不是使用时所在的对象。

       - this 对象的指向是可变的，但是在箭头函数中，它是固定的，这种特性很有利于封装回调函数

     - 不可以当作构造函数，也就是说，不可以使用 new 命令，否则会抛出一个错误。

     - 不可以使用 arguments 对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。

     - 不可以使用 yield 命令，因此箭头函数不能用作 Generator 函数。

   - 不适合场合

     - 定义对象的方法，且该方法内部包括 this
     - 需要动态 this 的时候，也不应使用箭头函数
     - 如果函数体很复杂，有许多行，或者函数内部有大量的读写操作，不单纯是为了计算值，这时也不应该使用箭头函数

3. **解构赋值**

4. **数组新增方法**

   - Array.of()
   - Array.from()
   - find()
   - findIndex()
   - fill()
   - copyWithin()
   - entries()
   - values()
   - keys()
   - includes()
   - flat()
   - flatMap()

5. **对象新增方法**

   - Object.is()

   - Object.getOwnPropertySymbols()

   - Object.setPrototypeOf()

   - Object.getPrototypeOf()

   - Object.assign()

     - 浅拷贝。只拷贝源对象的自身属性(不拷贝继承属性)

     - 不拷贝对象不可枚举的属性

     - undefined 和 null 无法转成对象，它们不能作为 Object.assign 参数，但是可以作为源对象

       ```javascript
       Object.assign(undefined); // 报错
       Object.assign(null); // 报错
       
       let obj = { a: 1 };
       Object.assign(obj, undefined) === obj; // true
       Object.assign(obj, null) === obj; // true
       ```

     - 属性名为 Symbol 值的属性，可以被 Object.assign 拷贝

6. **Number 新增方法**

   - Number.isNaN()
   - Number.isFinite()

7. **字符串新增方法**

   - String.raw()
   - repeat()
   - startsWith()
   - endsWith()
   - includes()
   - normalize()

8. **Map**

9. **Set**

   - 类似于数组，但是成员的值都是唯一的，没有重复的值

     - 应用于数组去重`[...new Set(array)]`

   - `let s = new Set()`
   - Set.prototype.size：返回 Set 实例的成员总数
   - add() 添加某个值，返回 Set 结构本身。不会添加重复的值
   - has() 返回一个布尔值，表示该值是否为 Set 的成员
   - delete() 删除某个值，返回一个布尔值，表示删除是否成功
   - clear() 清除所有成员，没有返回值

   - 遍历操作(Set 的遍历顺序就是插入顺序)

     - keys() 返回键名的遍历器
     - values() 返回键值的遍历器
     - entries() 返回键值对的遍历器
     - forEach() 使用回调函数遍历每个成员

   - Set 集合转换为数组：let set = new Set(\[1,2,3]);
   - 数组转换为 Set 集合：array = \[...set]

10. **WeakSet**

    - `const ws = new WeakSet();`

    - 与 Set 有两个区别

      - WeakSet 的成员只能是对象，而不能是其他类型的值
      - WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用，也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于 WeakSet 之中。

        - WeakSet 适合临时存放一组对象，以及存放跟对象绑定的信息。只要这些对象在外部消失，它在 WeakSet 里面的引用就会自动消失。

    - WeakSet 结构有以下三个方法

      - add()
      - delete()
      - gas()

    - WeakSet 不能遍历，是因为成员都是弱引用，随时可能消失，遍历机制无法保证成员的存在，很可能刚刚遍历结束，成员就取不到了。
    - WeakSet 的一个用处，是储存 DOM 节点，而不用担心这些节点从文档移除时，会引发内存泄漏。

11. **Symbol**

12. **Generator**

13. **Promise**

    - 封装异步操作

    - **promise 实现**

      ```javascript
      <!-- resolve和reject两个回调函数 -->
      var myPromise = new Promise((resolve, reject) => {
        // 需要执行的代码...
        if (/* 异步执行成功 */) {
          resolve(value)
        } else if (/* 异步执行失败 */) {
          reject(error)
        }
      });
      
      <!-- 两个回调函数 -->
      myPromise.then((value) => {
        // 成功后调用, 使用 value 值
      }, (error) => {
        // 失败后调用, 获取错误信息 error
      })
      ```

      - resolve()和 reject()的使用(援引自小黄书)

        - 如果调用 reject，则 promise 被拒绝，如果有任何值传给 reject，则这个值就是被拒绝的原因值

        - 如果调用 resolve 且没有值传入，或者传入任何非 promise 值，这个 promise 就完成

        - 如果调用 resolve 并传入另外一个 promise，这个 promise 就会采用传入的 promise 的状态

    - **promise 特点**

    - **Promise 优缺点**

    - **promise 的应用**

14. **async & await**

15. **Class**

    - extends 继承
    - super 继承


> 参考链接
>
> 1. https://es6.ruanyifeng.com/#docs/set-map