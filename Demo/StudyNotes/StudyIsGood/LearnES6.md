# ES6

1. **let、const**

   - let：声明**变量**；**块级作用域；不存在变量提升；不允许在相同作用域内重复声明同一个变量**

     ```javascript
     var a = [];
     for (let i = 0; i < 10; i++) {
       a[i] = function () {
         console.log(i);
       };
     }
     a[6](); // 6
     // 变量i是let声明的，当前的i只在本轮循环有效，所以每一次循环的i其实都是一个新的变量，最后输出6
     
     // 当i是var声明的时，在全局范围内都有效，所以全局只有一个变量i。
     // 每一次循环，i的值都会发生改变，而循环内被赋给数组a的函数内部的console.log(i)，i指向全局的i
     // 即所有数组a的成员里面的i，指向的都是同一个i，导致运行时输出的是最后一轮的i的值，也就是 10
     ```

     - **暂时性死区**：只要块级作用域内存在`let`命令，它所声明的变量就“绑定”（binding）这个区域，**不再受外部的影响**。

       ```javascript
       var tmp = 123;
       if (true) {
         tmp = 'abc'; // ReferenceError
         let tmp;
       }
       ```

   - const：声明**常量**；**块级作用域；不存在变量提升，const 声明不允许修改绑定，但允许修改值**

     - 即声明对象时，可以修改对象的属性值

2. **箭头函数**

   - 箭头函数里面根本**没有自己的 this，而是引用外层的 this**

     ```javascript
     var handler = {
       id: '123456',

       init: function () {
         document.addEventListener(
           'click',
           // 使用了箭头函数，这导致这个箭头函数里面的 this总是指向 handler 对象
           (event) => this.doSomething(event.type),
           false
         );
       },

       doSomething: function (type) {
         console.log('Handling ' + type + ' for ' + this.id);
       },
     };
     ```

   - 除了 this，**以下三个变量在箭头函数之中也是不存在的**，指向外层函数的对应变量

     - **arguments、super、new.target**

   - 使用注意点

     - 函数体内的 this 对象，就是**定义时所在的对象，而不是使用时所在的对象**；且 this**在定义时就已经固定，之后永远不会改变**
     - **call | apply | bind 无法改变箭头函数中 this 的指向**
     - **不可以当作构造函数**，也就是说，不可以使用 new 命令，否则会抛出一个错误
     - **不可以使用 arguments 对象**，该对象在函数体内不存在。如果要用，可以用 rest 参数代替
     - **不可以使用 yield 关键字，不能用作 Generator 函数**

   - 不适合场合

     - 定义对象的方法，且该方法内部包括 this
     - 需要动态 this 的时候，也不应使用箭头函数
     - 如果函数体很复杂，或者函数内部有大量的读写操作，不单纯是为了计算值，这时不应使用箭头函数

3. **解构赋值**

   - 只要等号两边的模式相同，左边的变量就会被赋予对应的值

   - **对象的解构赋值**：内部机制，是先找到同名属性，然后再赋给对应的变量。真正被赋值的是后者，而不是前者

     ```javascript
     // 可以取到继承的属性
     const obj1 = {};
     const obj2 = { foo: 'bar' };
     Object.setPrototypeOf(obj1, obj2);
     const { foo } = obj1;
     console.log(foo); // "bar"
     ```

   - **字符串的解构赋值**：字符串被转换成了一个类似数组的对象

     ```javascript
     const [a, b, c, d, e] = 'hello';
     a; // "h"
     b; // "e"
     c; // "l"
     d; // "l"
     e; // "o"
     ```

   - **数值和布尔值的解构赋值**：如果等号右边是数值和布尔值，则会先转为对象

     ```javascript
     let { toString: s } = 123;
     s === Number.prototype.toString; // true

     let { toString: s } = true;
     s === Boolean.prototype.toString; // true

     // 由于undefined和null无法转为对象，所以对它们进行解构赋值，都会报错
     let { prop: x } = undefined; // TypeError
     let { prop: y } = null; // TypeError
     ```

   - **函数的解构赋值**

     ```javascript
     function move({ x, y } = { x: 0, y: 0 }) {
       // 可以使用默认值
       return [x, y];
     }
     move({ x: 3, y: 8 }); // [3, 8]
     move({ x: 3 }); // [3, undefined]
     move({}); // [undefined, undefined]
     move(); // [0, 0]
     ```

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

   - 类似于对象，也是键值对的集合（Hash 结构），但“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键

   - 实例的属性和操作方法：size、set()、get()、has()、delete()、clear()

     ```javascript
     const m = new Map();
     m.set('foo', true);
     m.set('bar', false);

     // size属性返回 Map 结构的成员总数
     // Map.prototype.set(key, value) 设置键名key对应的键值为value，然后返回整个 Map 结构
     // Map.prototype.get(key) 读取key对应的键值，如果找不到key，返回undefined
     // Map.prototype.has(key) 返回一个布尔值，表示某个键是否在当前 Map 对象之中
     // Map.prototype.delete(key) 删除某个键，返回true。如果删除失败，返回false
     // Map.prototype.clear() 清除所有成员，没有返回值
     m.size; // 2
     m.set(1, 'standard');
     m.get(1); // 'standard'
     m.has(1); // true
     m.delete(1); // true
     ```

   - 遍历方法：`keys()`、`values()`、`entries()`、`forEach`()

     ```javascript
     const map = new Map([
       ['F', 'no'],
       ['T',  'yes'],
     ]);

     // Map.prototype.keys()：返回键名的遍历器。
     for (let key of map.keys()) {
       console.log(key);
     }
     // "F"
     // "T

     // Map.prototype.values()：返回键值的遍历器。
     for (let value of map.values()) {
       console.log(value);
     }
     // "no"
     // "yes"

     // Map.prototype.entries()：返回所有成员的遍历器。
     for (let item of map.entries()) {
       console.log(item[0], item[1]);
     }
     // "F" "no"
     // "T" "yes"
     // 或者
     for (let [key, value] of map.entries()) {
       console.log(key, value);
     }
     // "F" "no"
     // "T" "yes"
     // 等同于使用map.entries()
     for (let [key, value] of map) {
       console.log(key, value);
     }
     // "F" "no"
     // "T" "yes"

     // Map.prototype.forEach()：遍历 Map 的所有成员
     map.forEach(function(value, key, map) {
       console.log("Key: %s, Value: %s", key, value);
     });

     // Map 结构转为数组结构
     const map = new Map([
       [1, 'one'],
       [2, 'two'],
       [3, 'three'],
     ]);
     [...map.keys()] // [1, 2, 3]
     [...map.values()] // ['one', 'two', 'three']
     [...map.entries()] // [[1,'one'], [2, 'two'], [3, 'three']]
     [...map] // [[1,'one'], [2, 'two'], [3, 'three']]

     // 结合数组的map方法、filter方法，可以实现 Map 的遍历和过滤
     const map0 = new Map()
       .set(1, 'a')
       .set(2, 'b')
       .set(3, 'c');

     const map1 = new Map(
       [...map0].filter(([k, v]) => k < 3)
     );
     // 产生 Map 结构 {1 => 'a', 2 => 'b'}

     const map2 = new Map(
       [...map0].map(([k, v]) => [k * 2, '_' + v])
         );
     // 产生 Map 结构 {2 => '_a', 4 => '_b', 6 => '_c'}
     ```

   - Map 与其他数据结构的互相转换

     - Map 转换为数组

       ```javascript
       const myMap = new Map().set(true, 7).set({ foo: 3 }, ['abc']);
       [...myMap]; // [ [ true, 7 ], [ { foo: 3 }, [ 'abc' ] ] ]
       ```

     - 数组转换为 Map

       ```javascript
       new Map([
         [true, 7],
         [{ foo: 3 }, ['abc']],
       ]);
       // Map {
       //   true => 7,
       //   Object {foo: 3} => ['abc']
       // }
       ```

     - Map 转换为对象

       ```javascript
       function strMapToObj(strMap) {
         let obj = Object.create(null);
         for (let [k, v] of strMap) {
           obj[k] = v;
         }
         return obj;
       }

       const myMap = new Map().set('yes', true).set('no', false);
       strMapToObj(myMap);
       // { yes: true, no: false }
       ```

     - 对象转为 Map

       ```javascript
       let obj = { a: 1, b: 2 };
       let map = new Map(Object.entries(obj));

       // 不用entries API
       function objToStrMap(obj) {
         let strMap = new Map();
         for (let k of Object.keys(obj)) {
           strMap.set(k, obj[k]);
         }
         return strMap;
       }
       objToStrMap({ yes: true, no: false }); // Map {"yes" => true, "no" => false}
       ```

     - Map 转为 JSON

       ```javascript
       // Map 的键名都是字符串，转为对象 JSON
       function strMapToJson(strMap) {
         return JSON.stringify(strMapToObj(strMap));
       }
       let myMap = new Map().set('yes', true).set('no', false);
       strMapToJson(myMap); // '{"yes":true,"no":false}'

       // Map 的键名有非字符串，选择转为数组 JSON
       function mapToArrayJson(map) {
         return JSON.stringify([...map]);
       }
       let myMap = new Map().set(true, 7).set({ foo: 3 }, ['abc']);
       mapToArrayJson(myMap); // '[[true,7],[{"foo":3},["abc"]]]'
       ```

     - JSON 转为 Map

       ```javascript
       function jsonToStrMap(jsonStr) {
         return objToStrMap(JSON.parse(jsonStr));
       }
       jsonToStrMap('{"yes": true, "no": false}');
       // Map {'yes' => true, 'no' => false}

       // 特殊情况：整个 JSON 就是一个数组，且每个数组成员本身，又是一个有两个成员的数组
       function jsonToMap(jsonStr) {
         return new Map(JSON.parse(jsonStr));
       }

       jsonToMap('[[true,7],[{"foo":3},["abc"]]]');
       // Map {true => 7, Object {foo: 3} => ['abc']}
       ```

9. **Set**

   - 类似于数组，但是成员的值都是唯一的，没有重复的值

     ```javascript
     const s = new Set();

     [2, 3, 5, 4, 5, 2, 2].forEach((x) => s.add(x));

     for (let i of s) {
       console.log(i);
     } // 2 3 5 4
     ```

     - 应用于数组去重

       ```javascript
       [...new Set(array)]; // 数组去重
       [...new Set('ababbc')].join(''); // 去除字符串里面的重复字符
       ```

     - `Array.from`方法可以将 Set 结构转为数组

       ```javascript
       const items = new Set([1, 2, 3, 4, 5]);
       const array = Array.from(items);
       ```

   - Set 实例的属性和方法：size、add()、has()、delete()、clear()

     ```javascript
     let s = new Set();
     // Set.prototype.add(value)：添加某个值，返回 Set 结构本身
     s.add(1).add(2);
     // Set.prototype.size：返回Set实例的成员总数
     console.log(s.size) // 2
     // Set.prototype.has(value)：返回一个布尔值，表示该值是否为Set的成员
     console.log(s.has(1)); // true
     console.log(s.has(3)); // false
     // Set.prototype.delete(value)：删除某个值，返回一个布尔值，表示删除是否成功
     s.delete(2);
     console.log(s.has(2)); // false
     Set.prototype.clear()：清除所有成员，没有返回值
     ```

   - 遍历操作：`keys()`、`values()`、`entries()`、`forEach()`

     ```javascript
     let set = new Set(['red', 'green', 'blue']);
     //Set.prototype.keys()：返回键名的遍历器
     for (let item of set.keys()) {
       console.log(item);
     }
     // red
     // green
     // blue

     //Set.prototype.values()：返回键值的遍历器
     for (let item of set.values()) {
       console.log(item);
     }
     // red
     // green
     // blue

     //Set.prototype.entries()：返回键值对的遍历器
     // ["red", "red"]
     // ["green", "green"]
     // ["blue", "blue"]

     //Set.prototype.forEach()：使用回调函数遍历每个成员
     let set = new Set([1, 4, 9]);
     set.forEach((value, key) => console.log(key + ' : ' + value));
     // 1 : 1
     // 4 : 4
     // 9 : 9

     // 遍历的应用
     // 扩展运算符（...）内部使用for...of循环，所以也可以用于 Set 结构
     let set = new Set(['red', 'green', 'blue']);
     let arr = [...set];
     // ['red', 'green', 'blue']

     // 数组的map和filter方法也可以间接用于 Set
     let set = new Set([1, 2, 3]);
     set = new Set([...set].map((x) => x * 2));
     // 返回Set结构：{2, 4, 6}

     let set = new Set([1, 2, 3, 4, 5]);
     set = new Set([...set].filter((x) => x % 2 == 0));
     // 返回Set结构：{2, 4}
     ```

10. **`WeakSet`**

    - 与 Set 类似，也是不重复的值的集合
    - 与 Set 的区别：
      - `WeakSet`的成员只能是对象，而不能是其他类型的值；
      - `WeakSet` 中的对象都是弱引用，即垃圾回收机制不考虑 `WeakSet` 对该对象的引用：如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存
        - 因此`WeakSet` 适合临时存放一组对象，以及存放跟对象绑定的信息
        - 一个用处：储存 DOM 节点，而不用担心这些节点从文档移除时，会引发内存泄漏。
    - 实例方法：add()、delete()、has()
      - 无 size 属性
      - 无法遍历其成员，因为成员都是弱引用，随时可能消失，遍历机制无法保证成员的存在

11. **Symbol**

12. **Generator**

13. **Promise**

    - 封装异步操作

    - **Promise 实现**

      ```javascript
      <!-- resolve和reject两个回调函数 -->
      // resolve和reject由 JavaScript 引擎提供，不用自己部署
      // resolve用于将Promise对象的状态从"pending"变为"resolved"
      // reject用于将Promise对象的状态"pending"变为"rejected"
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

      - **resolve()和 reject()的使用**(援引自小黄书)
        - 如果调用 reject，则 promise 被拒绝，如果有任何值传给 reject，则这个值就是被拒绝的原因值
        - 如果调用 resolve 且没有值传入，或者传入任何非 promise 值，这个 promise 就完成
        - 如果调用 resolve 并传入另外一个 promise，这个 promise 就会采用传入的 promise 的状态

    - **promise 特点**

      - 对象的状态不受外界影响。

        - pending（进行中）、fulfilled（已成功）、rejected（已失败）

        - 一旦状态改变，就不会再变，任何时候都可以得到这个结果，这时就称为 resolved。

    - **Promise 缺点**

      - 无法取消`Promise`，一旦新建它就会立即执行，无法中途取消
        - 如果不设置回调函数，`Promise`内部抛出的错误，不会反应到外部
        - 当处于`pending`状态时，无法得知目前进展到哪一个阶段

    - **promise 的基本用法及案例**

      ```javascript
      // 案例1：Promise 新建后就会立即执行
      let promise = new Promise(function (resolve, reject) {
        console.log('Promise');
        resolve();
      });
      promise.then(() => {
        console.log('resolved.');
      });
      console.log('hi');
      // Promise
      // hi
      // resolved.

      // 案例2：异步加载图片
      function loadImageAsync(url) {
        return new Promise((resolve, reject) => {
          const image = new Image();
          image.onload = function () {
            resolve(image);
          };
          image.onerror = function () {
            reject(new Error('Could not load image at ' + url));
          };
          image.src = url;
        });
      }

      // 案例3：用Promise对象实现 Ajax 操作
      const getJSON = function (url) {
        const promise = new Promise(function (resolve, reject) {
          const handler = function () {
            if (this.readyState !== 4) {
              return;
            }
            if (this.status === 200) {
              resolve(this.response);
            } else {
              reject(new Error(this.statusText));
            }
          };
          const client = new XMLHttpRequest();
          client.open('GET', url);
          client.onreadystatechange = handler;
          client.responseType = 'json';
          client.setRequestHeader('Accept', 'application/json');
        });
        return promise;
      };
      getJSON('/posts.json').then(
        function (json) {
          console.log('Contents:' + json);
        },
        function (error) {
          console.log('出错了', error);
        }
      );

      // 案例4：如果调用resolve函数和reject函数时带有参数，那么它们的参数会被传递给回调函数
      const p1 = new Promise(function (resolve, reject) {
        setTimeout(() => reject(new Error('fail')), 3000);
      });
      const p2 = new Promise(function (resolve, reject) {
        setTimeout(() => resolve(p1), 1000);
      });
      // 由p1的状态决定p2的状态，所以后面的then语句都变成针对p1
      p2.then((res) => console.log(res)).catch((err) => console.log(err));
      // Error: fail

      // 案例5：调用resolve或reject并不会终结 Promise 的参数函数的执行
      new Promise((resolve, reject) => {
        resolve(1);
        console.log(2);
      }).then((r) => {
        console.log(r);
      });
      // 2
      // 1
      ```

    - Promise 的实例方法：then()、catch()、finally()

    - `Promise.all()`、`Promise.race()`、`Promise.allSettled()`、`Promise.any()`

    - `Promise.resolve()`、`Promise.reject()`

    - **手写 Promise**

14. **async & await**

15. **Proxy**

    - `var proxy = new Proxy(target, handler)`，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写

    ```javascript
    let target = { _prop: 'foo', prop: 'foo' }; // 要拦截的对象
    var proxy = new Proxy(target, {
      get: function (obj, prop) {
        console.log('设置 get 操作');
        return obj[prop];
      },
      set: function (obj, prop, value) {
        console.log('设置 set 操作');
        obj[prop] = value;
      },
      has(target, key) {
        if (key[0] === '_') {
          return false;
        }
        return key in target;
      },
    });
    
    proxy.time = 35; // 设置 set 操作
    console.log(proxy.time); // 设置 get 操作 // 35
    console.log('_prop' in proxy); // false
    
    // 使用get拦截，实现数组读取负数的索引
    function createArray(...elements) {
      let handler = {
        get(target, propKey, receiver) {
          let index = Number(propKey);
          if (index < 0) {
            propKey = String(target.length + index);
          }
          return Reflect.get(target, propKey, receiver);
        },
      };
    
      let target = [];
      target.push(...elements);
      return new Proxy(target, handler);
    }
    let arr = createArray('a', 'b', 'c');
    console.log(arr[-1]); // c
    ```

    - 支持的拦截操作：
      - get(target, propKey, receiver)
      - set(target, propKey, value, receiver)
      - has(target, propKey)
      - deleteProperty(target, propKey)
      - ownKeys(target)
      - getOwnPropertyDescriptor(target, propKey)
      - defineProperty(target, propKey, propDesc)
      - preventExtensions(target)
      - getPrototypeOf(target)
      - isExtensible(target)
      - setPrototypeOf(target, proto)
      - apply(target, object, args)
      - construct(target, args)

16. **Class**

    - **constructor 方法**：是类的默认方法，**通过 new 命令生成对象实例时，自动调用该方法**。一个类必须有该方法，若没有显示定义，一个空的 constructor 方法会被默认添加

    - **取值函数 getter 和存值函数 setter**

      ```javascript
      class CustomHTMLElement {
        constructor(element) {
          this.element = element;
        }
        get html() {
          return this.element.innerHTML;
        }
        set html(value) {
          this.element.innerHTML = value;
        }
      }

      var descriptor = Object.getOwnPropertyDescriptor(
        CustomHTMLElement.prototype,
        'html'
      );

      'get' in descriptor; // true
      'set' in descriptor; // true
      ```

    - extends 关键字继承

      ```javascript
      class Point {}
      // 相当于把ColorPoint.prototype的[[Prototype]]链接到Foo.prototype
      class ColorPoint extends Point {}
      ```

    - super 关键字继承

      - **`super`作为函数调用时，代表父类的构造函数**。ES6 要求，子类的构造函数必须执行一次`super()`。

        - 作为函数时，`super()`只能用在子类的构造函数之中，用在其他地方就会报错

        ```javascript
        class A {
          constructor() {
            console.log(new.target.name);
          }
        }
        class B extends A {
          constructor() {
            // super内部的this指的是B的实例
            super(); // super()在这里相当于A.prototype.constructor.call(this)
          }
        }
        new A(); // A
        new B(); // B
        ```

      - `super`作为对象时，**在普通方法中，指向父类的原型对象；在静态方法中，指向父类**

        - 当`super`指向父类的原型对象时，定义在父类实例上的方法或属性无法通过`super`调用；如果属性定义在父类的原型对象上，`super`就可以取到
        - 在子类普通方法中通过`super`调用父类的方法时，方法内部的`this`指向当前的子类实例

        ```javascript
        class A {
          p() {
            return 2;
          }
        }

        class B extends A {
          constructor() {
            super();
            // 将super当作一个对象使用
            // super在普通方法之中，指向A.prototype，所以super.p()就相当于A.prototype.p()
            console.log(super.p()); // 2
          }
        }

        let b = new B();
        ```

    - 注意：

      - **严格模式**：类和模块的内部，默认是严格模式

      - 类**不存在提升**

      - **name 属性**：函数的许多特性都被`Class`继承，包括`name`属性

        ```javascript
        class Point {}
        Point.name; // "Point"
        ```

      - **Generator 方法**：某个方法之前加上星号（`*`），就表示该方法是一个 Generator 函数

        ```javascript
        class Foo {
          constructor(...args) {
            this.args = args;
          }
          *[Symbol.iterator]() {
            for (let arg of this.args) {
              yield arg;
            }
          }
        }
        for (let x of new Foo('hello', 'world')) {
          console.log(x);
        }
        ```

      - **this 的指向**：类的方法内部若含有 this，默认指向类的实例。使用时可能会发生找不到调用方法的情况，因为 this 会指向该方法运行时所在的环境。解决方法：

        - **在构造函数中绑定 this**

          ```javascript
          class Logger {
            constructor() {
              this.printName = this.printName.bind(this);
            }
            // ...
          }
          ```

        - **使用箭头函数**。箭头函数内部的`this`总是指向定义时所在的对象

          ```javascript
          class Obj {
            constructor() {
              this.getThis = () => this;
            }
          }
          const myObj = new Obj();
          myObj.getThis() === myObj; // true
          ```

        - **使用 Proxy**，获取方法时自动绑定 this

          ```javascript
          function selfish(target) {
            const cache = new WeakMap();
            const handler = {
              get(target, key) {
                const value = Reflect.get(target, key);
                if (typeof value !== 'function') {
                  return value;
                }
                if (!cache.has(value)) {
                  cache.set(value, value.bind(target));
                }
                return cache.get(value);
              },
            };
            const proxy = new Proxy(target, handler);
            return proxy;
          }
          const logger = selfish(new Logger());
          ```
      
    - **静态方法**

      - 类相当于实例的原型，所有在类中定义的方法，都会被继承。如果再一个方法前加上static关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”。

        ```javascript
        class Foo {
          static classMethod() {
            return 'hello';
          }
        }
        console.log(Foo.classMethod()); // hello
        var foo = new Foo();
        // TypeError: foo.classMethod is not a function
        console.log(foo.classMethod());
        ```

      - 如果静态方法包含`this`关键字，这个`this`指的是类，而不是实例

        ```javascript
        class Foo {
          static bar() {
            this.baz();
          }
          static baz() {
            console.log('hello');
          }
          baz() {
            console.log('world');
          }
        }
        console.log(Foo.bar()); // hello
        // 静态方法bar调用了this.baz，这里的this指的是Foo类，而不是Foo的实例
        // 等同于调用Foo.baz。
        ```

      - 父类的静态方法，可以被子类继承

        ```javascript
        class Foo {
          static classMethod() {
            return 'hello';
          }
        }
        class Bar extends Foo {
        }
        Bar.classMethod() // 'hello'
        ```

      - 静态方法也可从`super`对象上调用

        ```javascript
        class Foo {
          static classMethod() {
            return 'hello';
          }
        }
        class Bar extends Foo {
          static classMethod() {
            return super.classMethod() + ', too';
          }
        }
        Bar.classMethod() // "hello, too"
        ```

    - **静态方法**

17. **ES5/ES6 的继承除了写法以外还有什么区别**

    - **ES5 的继承实质上是先创造子类的实例对象 this，然后再将父类的方法添加 this 上面**(Parent.apply(this))，由于父类的内部属性无法获取，导致无法继承原生的构造函数
    - **ES6 的继承机制实质是先将父类实例对象的属性和方法加到 this 上面**（所以必须先调用 super 方法），**然后再用子类的构造函数修改 this**，使得父类的所有行为都可以继承
      - 在子类的构造函数中，只有调用`super`之后，才可以使用`this`关键字，否则会报错。因为子类实例的构建基于父类实例，只有`super`方法才能调用父类实例
      - 父类的静态方法，也会被子类继承
    - **ES6 可以自定义原生数据结构，这是 ES5 无法做到的**
    - **`extends`关键字不仅可以用来继承类，还可以用来继承原生的构造函数**。因此可以在原生数据结构的基础上，定义自己的数据结构

18. **ES6 Module**

    - 传统的模块模式：基于一个带有内部变量和函数的外层函数，以及一个被返回的 public API，这个 API 带有对内部数据和功能拥有闭包的方法

      ```javascript
      function Hello(name) {
        function greeting() {
          console.log('hello' + name + '!');
        }
        // public API
        return {
          greeting: greeting,
        };
      }
      var me = Hello('Kyle');
      me.greeting(); // Hello Kyle!
      ```

    - ES6 模块与过去的区别 _——以下援引自小黄书_

      - ES6 使用**基于文件**的模块，即一个文件一个模块；
      - ES6 模块的 API 是**静态的**，即在模块的公开 API 中静态定义所有最高处导出，之后无法补充；
      - ES6 模块是**单例**；
      - ES6 模块的公开 API 中暴露的属性和方法不仅仅是普通的值或属性的赋值，**是到内部模块定义中的标识符的实际绑定**；
      - **导入模块和静态请求加载这个模块是一样的**

    - ES6 模块

      - 导出 API 成员 export

        - 命名导出 named export：导出变量/函数等的名称绑定

          ```javascript
          export function foo() {
            // ...
          }
          export var awesome = 42;
          var bar = [1, 2, 3];
          export { bar };

          // 或者写成：
          function foo() {
            // ...
          }
          var awesome = 42;
          var bar = [1, 2, 3];
          export { foo, awesome, bar };
          // 在命名导出时还可以重命名一个模块成员
          // export { foo as bar }
          ```

        - 默认导出 default export：一个模块使用一个 export，默认导出把一个特定导出绑定设置为导入模块时的默认导出

          ```javascript
          function foo() {
            // ...
          }
          export default foo;

          // 或者
          function foo() {
            // ...
          }
          export { foo as default };

          // 或者
          export default function foo() {
            // ...
          }
          ```

      - 导出 API 成员 import

        ```javascript
        import { foo, bar, baz } from 'foo';
        // 当模块只有一个你想要的导入，并绑定到一个标识符的默认导出，绑定时可以省略 { ... }的语法
        import foo from 'foo';
        // 或者
        import { default as foo } from 'foo';

        // 命名空间导入
        // foo.js
        export function bar() {}
        export var x = 42;
        export function baz() {}
        // 把整个API导入到单个模块命名空间绑定
        import * as foo from 'foo';
        foo.bar();
        foo.x;
        foo.baz();
        ```


> 参考链接
>
> 1. https://es6.ruanyifeng.com/#docs/let
> 2. https://es6.ruanyifeng.com/#docs/set-map
> 3. https://juejin.im/post/6844903576309858318#heading-3
> 4. https://cloud.tencent.com/developer/article/1465078
> 5. https://es6.ruanyifeng.com/#docs/proxy
> 6. https://cloud.tencent.com/developer/article/1460544
> 7. https://cloud.tencent.com/developer/article/1451912
