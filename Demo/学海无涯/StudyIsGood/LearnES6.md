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

   - 类似于对象，也是键值对的集合（Hash结构），但“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键

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
     m.size // 2
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

   - Map与其他数据结构的互相转换

     - Map转换为数组

       ```javascript
       const myMap = new Map().set(true, 7).set({foo: 3}, ['abc']);
       [...myMap]; // [ [ true, 7 ], [ { foo: 3 }, [ 'abc' ] ] ]
       ```

     - 数组转换为Map

       ```javascript
       new Map([
         [true, 7],
         [{foo: 3}, ['abc']]
       ])
       // Map {
       //   true => 7,
       //   Object {foo: 3} => ['abc']
       // }
       ```

     - Map转换为对象

       ```javascript
       function strMapToObj(strMap) {
         let obj = Object.create(null);
         for (let [k,v] of strMap) {
           obj[k] = v;
         }
         return obj;
       }
       
       const myMap = new Map()
         .set('yes', true)
         .set('no', false);
       strMapToObj(myMap)
       // { yes: true, no: false }
       ```

     - 对象转为Map

       ```javascript
       let obj = {"a":1, "b":2};
       let map = new Map(Object.entries(obj));
       
       // 不用entries API
       function objToStrMap(obj) {
         let strMap = new Map();
         for (let k of Object.keys(obj)) {
           strMap.set(k, obj[k]);
         }
         return strMap;
       }
       objToStrMap({yes: true, no: false}) // Map {"yes" => true, "no" => false}
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
       let myMap = new Map().set(true, 7).set({foo: 3}, ['abc']);
       mapToArrayJson(myMap); // '[[true,7],[{"foo":3},["abc"]]]'
       ```

     - JSON 转为 Map

       ```javascript
       function jsonToStrMap(jsonStr) {
         return objToStrMap(JSON.parse(jsonStr));
       }
       jsonToStrMap('{"yes": true, "no": false}')
       // Map {'yes' => true, 'no' => false}
       
       // 特殊情况：整个 JSON 就是一个数组，且每个数组成员本身，又是一个有两个成员的数组
       function jsonToMap(jsonStr) {
         return new Map(JSON.parse(jsonStr));
       }
       
       jsonToMap('[[true,7],[{"foo":3},["abc"]]]')
       // Map {true => 7, Object {foo: 3} => ['abc']}
       ```

9. **Set**

   - 类似于数组，但是成员的值都是唯一的，没有重复的值

     ```javascript
     const s = new Set();
     
     [2, 3, 5, 4, 5, 2, 2].forEach(x => s.add(x));
     
     for (let i of s) {
       console.log(i);
     }// 2 3 5 4
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

   - Set实例的属性和方法：size、add()、has()、delete()、clear()

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
     set.forEach((value, key) => console.log(key + ' : ' + value))
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
     set = new Set([...set].map(x => x * 2));
     // 返回Set结构：{2, 4, 6}
     
     let set = new Set([1, 2, 3, 4, 5]);
     set = new Set([...set].filter(x => (x % 2) == 0));
     // 返回Set结构：{2, 4}
     ```

10. **`WeakSet`**

    - 与 Set 类似，也是不重复的值的集合
    - 与Set的区别：
      - `WeakSet`的成员只能是对象，而不能是其他类型的值；
      - `WeakSet` 中的对象都是弱引用，即垃圾回收机制不考虑 `WeakSet` 对该对象的引用：如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存
        - 因此`WeakSet` 适合临时存放一组对象，以及存放跟对象绑定的信息
        - 一个用处：储存 DOM 节点，而不用担心这些节点从文档移除时，会引发内存泄漏。
    - 实例方法：add()、delete()、has()
      - 无size属性
      - 无法遍历其成员，因为成员都是弱引用，随时可能消失，遍历机制无法保证成员的存在

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

16. **`CommonJS`**


> 参考链接
>
> 1. https://es6.ruanyifeng.com/#docs/set-map