# JavaScript

1.  **JavaScript 数据类型**

    - **基本数据类型**：Undefined、Null、Boolean、Number、String

      - 一般存放于内存中的**栈**区，存取速度快，存放量小

        - 栈(stack)：由编译器自动分配释放，存放函数的参数值，局部变量等

      - 基本数据类型值不可变(操作基本数据类型的方法看上去返回了一个修改后的值，实际上返回的是一个新值)

      - null，undefined 的区别:

        - null 表示一个对象被定义了，但存放了空指针，转换为数值时为 0

          - typeof null -- object

        - undefined 表示声明的变量未初始化，转换为数值时为 NAN
          - typeof undefined -- undefined

    - **复杂数据类型**：Object(引用类型)

      - 一般存放与内存中的**堆**区，存取速度慢，存放量大，其引用指针存于栈区，并指向引用本身

        - 堆(heap)：一般由程序员分配释放，若程序员不释放，程序结束时可能由操作系统释放。

    - 数据封装类对象：Object、Array、Boolean、Number 和 String
    - 其他对象：Function、Arguments、Math、Date、RegExp、Error
    - 新类型：Symbol

2. **操作符**

   - 位操作符

     - ~(按位非)，&(按位与)，|(按位或)，^(按位异或)，<<(左移)，">>" (有符号右移)(保留正负号标记)，">>>" (无符号右移)(会把负数的二进制码当成正数的二进制码)
   - 加性操作符(操作数存在字符串的情况)

     - 加法

       - **两个操作数都是字符串，则字符串拼接**
       - **只有一个操作数是字符串，则另一个字符转换为字符串，再字符串拼接**
     - 减法
       - **若一个操作数是字符串、布尔值、null 或者 undefined，则后台先将其隐式转换(Number)成数值，然后再计算**
       - 若**一个操作数是对象，则调用对象的 valueOf()方法取得该对象的值，然后再计算**
   - 关系运算符

     - 若两个操作数都是字符串，则比较两个字符串对应的字符编码值
3.  **强制转换、显式转换和隐式转换**

    - 强制类型转换：Boolean()、 Number()、String()、parseInt()、parseFloat()、JSON.parse()、JSON.stringify()
    - 隐式类型转换：+、-、!!

4. **JavaScript 的基本规范**

   - 不要在同一行声明多个变量
   - 使用 ===或!==来比较 true/false 或者数值
   - switch 必须带有 default 分支
   - 函数应该有返回值
   - for if else 必须使用大括号
   - 语句结束加分号
   - 命名要有意义，使用驼峰命名法

5. **typeof 和 instanceof 原理**

   - typeof 原理：不同的对象在底层都表示为二进制，在 Javascript 中二进制前（低）三位存储其类型信息。

     - 000: 对象
     - 010: 浮点数
     - 100：字符串
     - 110： 布尔
     - 1： 整数

     所以 typeof null === object

   - instanceof 原理：用来比较一个对象是否为某一个构造函数的实例(注：只能用于对象，不适用原始类型的值)。即，能在实例的**原型对象链**中找到该构造函数的 **prototype**属性所指向的**原型对象**，就返回**true**。

     - **instanceof 的语法：**

     ```javascript
     object instanceof constructor;
     // 等同于
     constructor.prototype.isPrototypeOf(object);
     ```

     - **instanceof 的代码实现**

     ```javascript
     function instanceof(L, R) {
       //L 是表达式左边，R 是表达式右边
       const O = R.prototype;
       L = L.**proto**;
       while (true) {
         if (L === null) return false;
         // 这里重点：当 L 严格等于 0 时，返回 true
         if (L === O) return true;
         L = L.**proto**;
       }
     }
     ```

     - **instanceof 原理**：检测 constructor.prototype 是否存在于参数 object 的 原型链上。instanceof 查找的过程中会遍历 object 的原型链，直到找到 constructor 的 prototype ,如果查找失败，则会返回 false，告诉我们，object 并非是 constructor 的实例

6. **JavaScript 中判断对象类型的几种方法**

   - typeof

   - instanceo f

   - constructor 属性：JavaScript 中，每个对象都有一个 constructor 属性，它引用了初始化该对象的构造函数，常用于判断未知对象的类型。如给定一个求知的值，通过 typeof 运算符来判断它是基本数据类型的值还是对象。如果是对象，就可以使用 constructor 属性来判断其类型

   - Object.prototype.toString.call()

     - 目前为止发现的判断一个对象类型的最好的办法

     ```javascript
     const b = [];
     Object.prototype.toString.call(b); // "[object Array]"

     const c = {};
     Object.prototype.toString.call(c); // "[object Object]"

     const d = new Date();
     Object.prototype.toString.call(d); // "[object Date]"

     const e = new RegExp();
     Object.prototype.toString.call(e); // "[object RegExp]"
     ```

7. **JavaScript 中函数调用的几种方法**

   - **函数调用**：this 指向 window，返回值由 return 决定

     ```javascript
     function f1() {
       console.log(this);
     }
     f1();
     ```

   - **方法调用**(函数作为方法调用)：this 指向方法的调用者 ，返回值由 return 决定

     ```javascript
     var obj = {
       hello: function () {
         return 'hello,' + this.username;
       },
       username: 'selena',
     };
     obj.hello(); // "hello, selena"
     ```

     - 上述 hello()直接调用的时候，this 的指向就成了问题。在这种情况下，this 往往被指向全局对象(严格模式下 this 指向 undefined)

   - **构造函数调用**：this 指向当前构造函数构建的对象

     - 返回值有以下几种情况

       - 没有返回值，返回 this

         ```javascript
         function Person() {
           this.age = 20;
           this.name = 'zs';
           console.log(this);
         }
         var p1 = new Person(); // {age: 20, name:"zs"}
         ```

       - return 了一个基本数据类型

         ```javascript
         function P2() {
           this.age = 18;
           return 'abc';
         }

         var p2 = new P2();
         console.log(p2); //{age: 18}
         ```

       - 返回了一个复杂数据类型

         ```javascript
         function P3() {
           this.age = 10;
           return {};
         }

         var p3 = new P3();
         console.log(p3); //Object {}
         console.log(p3.age); //undefined

         function P3() {
           this.age = 10;
           return {};
         }

         var p3 = new P3();
         console.log(p3); //Object {}
         console.log(p3.age); //undefined
         ```

   - **上下文调用**

     - call()、apply()

     - this 指向

       - 传递一个 null/undefined -> window
       - 传递一个数字/字符串/布尔值 -> 对应的基本包装类型的对象
       - 传递一个对象 -> 指向该对象

     - 返回值：由 return 语句决定

       ```javascript
       f1.call(null);
       f1.call(undefined);
       f1.call('abc'); // String { "abc" }
       f1.call(true); // Boolean { true }
       f1.call(1); // Number { 1 }
       ```

8. **for-in 和 for-of**

   - for-in：循环一个指定的变量来循环一个对象所有可枚举的属性

     ```javascript
     for (variable in object) {
       statements;
     }
     ```

     - 注：

       - 返回的除了数字索引外，还有自己自定义的属性名字
       - 通过 for-in 循环输出的属性名的顺序是不可预测的
       - 为遍历对象属性而构建，不建议与数组一起使用

     - for-in 遍历数组会出现的问题：

       - index 值 会是字符串（String）类型
       - 循环不仅会遍历数组元素，还会遍历任意其他自定义添加的属性
       - 某些情况下，会以随机顺序循环数组

   - for-of：循环可迭代对象(Array, Map, Set, arguments 等)，对值的每一个特殊属性调用一次迭代

     ```javascript
     for (variable of object) {
       statements;
     }
     ```

   - for-in 和 for-of 的区别：for-in 循环遍历数组只能获得对象的键名，不能获得键值

   - for-of 循环遍历数组允许遍历获得键值
     - 无论是 for...in 还是 for...of 都不能遍历出 Symbol 类型的值
       - 遍历 Symbol 类型的值需要用 Object.getOwnPropertySymbols() 方法

9. **遍历数组**

   - every()：每一项都为 true，返回 true

     - `arr.every(callback(element[, index[, array]])[, thisArg])`

   - some()：至少有一项为 true，返回 true

     - `arr.some(callback(element[, index[, array]])[, thisArg])`

   - filter()：创建一个新数组, 其包含通过所提供函数实现的测试的所有元素

     - var newArray = arr.filter(callback(element[, index[, array]])[, thisArg])

   - forEach()：对数组的每个元素执行一次给定的函数

     - `arr.forEach(callback(currentValue [, index [, array]])[, thisArg])`
     - 与 map() 或者 reduce() 不同的是，它总是返回 undefined 值，并且不可链式调用
     - forEach 不会直接改变调用它的对象，但是那个对象可能会被 callback 函数改变
     - 除了抛出异常，**无法中止或跳出** forEach()循环

   - map()：创建一个新数组，其结果是该数组中的每个元素都调用一次提供的函数后的返回值

     ```javascript
     var new_array = arr.map(function callback(currentValue [, index[, array]]) {
       // Return element for new_array
     }[, thisArg]);
     ```

     - 不修改调用它的原数组本身（当然可以在 callback 执行时改变原数组）
     - 调用 map 方法之后追加的数组元素不会被 callback 访问

   - reduce()：对数组中的每个元素执行一个由您提供的 reducer 函数(升序执行)，将其结果汇总为单个返回值

     - `arr.reduce(callback(accumulator, currentValue[, index[, array]])[, initialValue])`

       - accumulator：累计器累计回调的返回值; 是上一次调用回调时返回的累积值，或 initialValue
       - currentValue：数组中正在处理的元素。
       - index：数组中正在处理的当前元素的索引。如果提供了 initialValue，则起始索引号为 0，否则从 1 起始
       - array：调用 reduce()的数组

   - reduceRight()：接受一个函数作为累加器（accumulator）和数组的每个值（从右到左）将其减少为单个值

10. **创建对象方式**

    - **工厂模式**

      ```javascript
      function createPerson(name, age, job) {
        var o = new Object();
        o.name = name;
        o.age = age;
        o.job = job;
        o.sayName = function () {
          alert(this.name);
        };
        return o;
      }
      var p1 = createPerson('nic', 29, 'software engineer');
      var p2 = createPerson('greg', 27, 'doctor');
      ```

      - 虽解决了创建多个相似对象的问题，但却未解决对象识别的问题

    - **构造函数模式**

      ```javascript
      function Person(name, age, job) {
        this.name = name;
        this.age = age;
        this.job = job;
        this.sayName = function () {
          alert(this.name);
        };
      }
      var p1 = new Person('nic', 29, 'software engineer');
      var p2 = new Person('greg', 27, 'doctor');
      ```

      - 构造函数的主要问题：每个方法都要再每个实例上重新创建一遍(因此不同实例上的同名函数是不相等的)

    - **原型模式**

      ```javascript
      function Person() {}

      Person.prototype.name = 'nic';
      Person.prototype.age = 29;
      Person.prototype.jon = 'software engineer';
      Person.prototype.sayName = function () {
        alert(this.name);
      };

      var p1 = new Person();
      p1.sayName(); // "nic"

      var p2 = new Person();
      p2.sayName(); // "nic"

      alert(p1.sayName == p2.sayName); // true
      ```

      - hasOwnProperty()：检测一个属性是存在于实例中还是原型中。实例中：true；原型中：false。

      - in 操作符：会在通过对象能够访问给定属性时返回 true，无论该属性存在于实例中还是原型中

      - hasPrototypeProperty()：属性先存在于原型中 -> true；

        - 当实例重写属性后，该属性就存在于实例中了，返回 false

      - Object.keys()：接收一个对象作为参数，返回一个包含所有可枚举属性的字符串数组

      - Object.getOwnPropertyNames()：得到所有实例属性，无论是否可枚举

      - 可以用一个包含所有属性和方法的对象字面量来重写整个原型对象

      - 原型的动态性

        - 对原型对象所做的任何修改都能够立即从实例上反映出来
          - 实例中的指针仅指向原型，而不指向构造函数

      - 原型对象的问题
        - 省略了为构造函数传递初始化参数这一环节，所有实例在默认情况下都将取得相同属性值
        - 其共享的本性(原型中所有属性被很多实例共享)

    - **组合使用构造函数模式和原型模式**

      - 构造函数模式用于定义实例属性，原型模式用于定义方法和共享的属性

        - 每个实例都会有自己的一份实例属性的副本，但同时又共享着对方法的引用
        - 支持向构造函数传递参数

      ```javascript
      function Person(name, age, job) {
        this.name = name;
        this.age = age;
        this.job = job;
        this.friends = ['shelby', 'Court'];
      }

      Person.prototype = {
        constructor: Person,
        sayName: function () {
          alert(this.name);
        },
      };

      var p1 = new Person('nic', 29, 'software engineer');
      var p2 = new Person('greg', 27, 'doctor');

      p1.friends.push('van');
      alert(p1.friends); // "Shelby,Court,Van"
      alert(p2.friends); // "Shelby,Court"
      alert(p1.friends === p2.friends); // false
      alert(p1.sayName === p2.sayName); // true
      ```

    - 动态原型模式

      - 把所有信息都封装在了构造函数中，而通过在构造函数中初始化原型(仅在必要的情况下)，又保持了同时使用构造函数和原型的优点。

      ```javascript
      function Person(name, age, job) {
        this.name = name;
        this.age = age;
        this.job = job;

        // 方法
        if (typeof this.sayName != 'function') {
          Person.prototype.sayName = function () {
            alert(this.name);
          };
        }
      }

      var friend = new Person('nic', 29, 'software engineer');
      friend.sayName();
      ```

      - 使用动态原型模式时不能使用对象字面量重写原型(会切断现有实例与新原型之间的联系)。

    - 寄生构造函数模式

      - 基本思想：创建一个函数，该函数的作用仅是封装创建对象的代码，然后再返回新创建的对象

      ```javascript
      function Person(name, age, job) {
        var o = new Object();
        o.name = name;
        o.age = age;
        o.job = job;
        o.sayName = function () {
          alert(this.name);
        };
        return o;
      }

      var friend = new Person('nic', 29, 'software engineer');
      friend.sayName(); // "nic"
      ```

      - 注：返回的对象与构造函数或构造函数的原型属性之间没有关系
        - 即构造函数返回的对象与构造函数外部创建的对象没有什么不同(因此不能依赖 instanceof 来确定对象类型)

    - 稳妥构造函数模式

      - 遵循与寄生构造函数类似的模式，但有两点不同

        - 新创建对象的实例方法不引用 this
        - 不适用 new 操作符调用构造函数

        ```javascript
        function Person(name, age, job) {
          // 创建要返回的对象、
          var o = new Object();

          // 可以在这里定义私有变量和函数
          o.sayName = function () {
            // 添加方法
            alert(name);
          };
          return o; // 返回对象
        }
        ```

      - 使用稳妥构造函数模式创建的对象与构造函数之间也没有什么关系，因此 instanceof 操作符对这种对象也没有什么意义

11. **执行上下文**

    - 定义了变量或函数有权访问的其他数据，决定了他们各自的行为

    - 包含三个部分

      - 变量对象
      - 作用域链
      - this 指向

    - 类型
      - 全局执行上下文
      - 函数执行上下文
      - eval 执行上下文

12. **作用域 和 作用域链**

    - 作用域指的是一个**变量和函数的作用范围**

      - 全局作用域
      - 块级作用域

    - **作用域链**：JavaScript 上每一个函数执行时，会**先在自己创建的活动对象** (Activation Object )上找对应属性值。若**找不到则往父函数的 AO 上找**，**再找不到则再上一层的 AO，直到找到大全局作用域**( window)。 而这一条形成的“AO 链” 就是 JavaScript 中的作用域链。

      - LHS：赋值操作的目标是谁
      - RHS：谁是赋值操作的源头
      - LHS 和 RHS 的特性
        - 都会在所有作用域中查找
        - 严格模式下，找不到所需的变量时，引擎都会抛出 ReferenceError 异常
        - 非严格模式下，LHR 稍微比较特殊，会自动创建一个全局变量
        - 查询成功时，如果对变量的值进行不合理的操作，比如对一个非函数类型的值进行函数调用，引擎会抛出 TypeError 异常

    - 把作用域链比喻成一个建筑，这个建筑代表程序中的嵌套作用域链，第一层楼表示当前的执行作用域，建筑的顶层表示全局作用域，LHS 和 RHS 引用都会在当前楼层进行查找，如果没找到，就往上一层找，还是没找到，就继续往上找，直到达到顶层(全局作用域)，可能会找到，也可能没找到，但无论如何到了顶层就会停止查找。——_援引自小黄书_

    - 作用域链的**用途**：**保证对执行环境有权访问的所有变量和函数的有序访问**。
    - 延长作用域链
      - try-catch 语句的 catch 块
      - with 语句

13. **变量提升 & 函数提升**

    - 先有声明，后有赋值

    - 函数声明会提升，函数表达式不会提升

      - 声明本身会提升，而包括函数表达式在内的赋值操作并不会提升

      - _以下援引自小黄书_

      ```javascript
      foo(); // TypeError

      var foo = function bar() {
        // ...
      };
      ```

      - 该例中，变量标识符 foo()被提升并分配给所在作用域，因此 foo()不会导致 ReferenceError，但是 foo 此时并没有赋值(如果它是一个函数声明而不是函数表达式，那么就会赋值)，foo()由于对 undefined 值进行函数调用而导致导致非法操作，因此会抛出 TypeError 异常。

    - 函数声明和变量声明都会被提升

      - 函数会首先被提升，然后才是变量

    - 所有的声明(变量和函数)，都会被"移动"到各自作用域的顶端，这个过程被称为提升

14. **原型链**

    - 基本思想：利用原型让一个引用类型继承另一个引用类型的属性和方法。

    - 原型链：每个构造函数都有一个 prototype 属性，指向它的原型对象，而原型对象都有一个 constructor 属性，指向构造函数，而每个构造函数的实例都包含一个\_\_proto\_\_属性，指向该实例构造函数的原型对象。构造函数、原型和实例形成一个原型链，是一个用来实现继承和共享属性的对象链。

    - 属性查找机制：当访问一个对象的属性(包括方法)时，首先查找这个对象自身有没有该属性，如果没有就查找它的原型，若还没有就查找原型对象的原型，以此类推，一直找到 Object 为止，若找到就输出，若找不到就输出 null。

    - 属性修改机制：只会修改实例对象本身的属性，如果不存在，则进行添加该属性，如果需要修改原型的属性时，则可以用`b.prototype.x = function(){...}`，但是这样会造成所有继承于该对象的实例的属性发生改变。

15. **继承**

    - **原型链继承**

      ```javascript
      function SuperType() {
        this.property = true;
      }
      superType.prototype.getSuperValue = function () {
        return this.property;
      };

      function subType() {
        this.subproperty = false;
      }

      // 继承了SuperType
      SubType.prototype = new SuperType();

      SubType.prototype.getSubValue = function () {
        return this.subproperty;
      };

      var instance = new SubType();
      alert(instance.getSuperValue()); // true
      ```

      - 确定原型和实例的关系：instanceof 或者 isPrototypeOf()

      - 给原型添加方法的代码一定要放在替换原型的语句之后

      - 在通过原型链实现继承时，不能使用对象字面量创建原型
        方法，因为这样会重写原型链(原型链被切断)。

      - **原型链的问题**：包含引用类型值的原型属性会被所有实例共享。

        ```javascript
        function SuperType() {
          this.colors = ['red', 'blue', 'green'];
        }

        function SubType() {}

        // 继承了SuperType
        SubType.prototype = new SuperType();

        var instance1 = new SubType();
        instance1.colors.push('black');
        alert(instance1.colors); // "red, blue, green, black"

        var instance2 = new SubType();
        alert(instance2.colors); // "red, blue, green, black"
        ```

        - 在创建子类型的实例时，不能向超类型的构造函数中传递参数。(没有办法在不影响所有对象实例的情况下，给超类型的构造函数传递参数)

    - **借用构造函数**：call(), apply()

      - 在子类型构造函数的内部调用超类型构造函数

      ```javascript
      function SuperType() {
        this.colors = ['red', 'blue', 'green'];
      }

      function SubType() {
        // 继承了SuperType
        SuperType.call(this);
      }

      var instance1 = new SubType();
      instance1.colors.push('black');
      alert(instance1.colors); // "red, blue, green, black"

      var instance2 = new SubType();
      alert(instance2.colors); // "red, blue, green"
      ```

      - 借用构造函数可以在子类型构造函数中向超类型构造函数传递参数

      - **借用构造函数的问题**
        - 方法都在构造函数中定义，因此**函数复用无从谈起**
        - 在**超类型的原型中定义的方法，对子类型是不可见的**，结果所有类型都只能使用构造函数模式

    - **组合模式**

      - 将原型链和借用构造函数结合在一起

      - 使用原型链实现对原型属性和方法的继承，而通过借用构造函数来实现对实例属性的继承。
        - 这样**既通过在原型上定义方法实现了函数复用，又能够保证每个实例都有它自己的属性**

      ```javascript
      function SuperType(name) {
        this.name = name;
        this.colors = ['red', 'blue', 'green'];
      }

      SuperType.prototype.sayName = function () {
        alert(this.name);
      };

      function SubType(name, age) {
        // 继承属性
        SuperType.call(this, name); // 第二次调用
        this.age = age;
      }

      // 继承方法
      SubType.prototype = new SuperType(); // 第一次调用
      SubType.prototype.constructor = SubType;
      SubType.prototype.sayAge = function () {
        alert(this.age);
      };

      var instance1 = new SubType('Nicholas', 29);
      instance1.colors.push('black');
      alert(instance1.colors); // "red, blue, green, black"
      instance1.sayName(); // "Nicholas"
      instance1.sayAge(); // 29

      var instance2 = new SubType('Greg', 27);
      alert(instance2.colors); // "red, blue, green"
      instance1.sayName(); // "Greg"
      instance1.sayAge(); // 27
      ```

      - 问题：无论什么情况，都会调用两次超类型构造函数：
        - 在创建子类型原型的时候
        - 在子类型构造函数内部

    - **原型式继承**

      - 借助原型可以基于已有的对象创建新对象，同时还不必因此创建自定义类型

        ```javascript
        function object(o) {
          function F() {} // 创建一个临时性的构造函数
          F.prototype = o; // 将传入的对象作为这个构造函数的原型
          return new F(); // 返回了这个临时类型的一个新实例
        }
        ```

      - Object.create()

        - Object.create(用作新对象原型的对象[, 为新对象定义额外属性的对象])
          `var p1 = Object.create(person)`

        ```javascript
        var p2 = Object.create(person, {
          name: {
            value: 'Greg',
          },
        });
        ```

    - **寄生式继承**

      - 创建一个仅用于封装继承过程的函数，该函数在内部以某种方式来增强对象，最后再返回对象

        ```javascript
        function createAnother(original) {
          var clone = object(original); // 通过调用函数创建一个新对象
          clone.sayHi = function () {
            // 以某种方式增强这个对象
            alert('hi');
          };
          return clone; // 返回这个对象
        }
        ```

      - 由于不能做到函数复用而降低效率

    - **寄生组合继承**(最有效)

      - 通过借用构造函数来继承属性，通过原型链的混成形式来继承方法。(本质：使用寄生式继承来继承超类型的原型，然后再将结果指定给子类型的原型)

      ```javascript
      function inheritPrototype(subType, superType) {
        var prototype = object(superType.prototype); //创建对象
        prototype.constructor = subType; // 增强对象
        subType.prototype = prototype; // 指定对象(将新创建的对象赋值给子类型的原型)
      }
      ```

      ```javascript
      function SuperType(name) {
        this.name = name;
        this.colors = ['red', 'blue', 'green'];
      }

      SuperType.prototype.sayName = function () {
        alert(this.name);
      };

      function SubType(name, age) {
        // 继承属性
        SuperType.call(this, name);
        this.age = age;
      }

      inheritPrototype(SubType, SuperType);

      SubType.prototype.sayAge = function () {
        alert(this.age);
      };
      ```

      - 如此，便只调用一次 SuperType 构造函数，并且因此避免了在 SubType，prototype 上面创建不必要的、多余的属性。原型链也保持不变。

    - ES6 Class extends 继承

      - 子类 extends 父类，然后 constructor 里 super 继承父类

16. **闭包**

    - 指**有权访问另一个函数作用域中的变量**的函数。本质是利用了作用域的机制，来达到外部作用域访问内部作用域的目的

      - 是 js 特有的**链式作用域**结构

      - 当**函数可以记住并访问所在的词法作用域**时，就产生了闭包，即使函数是在当前词法作用域之外执行。(援引自小黄书)

      - **父函数被销毁的情况下，返回出的子函数的\[\[scope]]中仍然保留着父级的单变量对象和作用域链**，因此可以继续访问到父级的变量对象，这样的函数称为闭包

    - 示例

      ```javascript
      for (var i = 1; i <= 5; i++) {
        (function (j) {
          setTimeout(function timer() {
            console.log(j);
          }, j * 1000);
        })(i);
      }
      ```

    - **闭包的优点**

      - 封闭住了变量作用域，有效地**防止了全局变量污染**
      - 可以读取其他函数内部的变量，让这些变量的值始终保持在内存中，不会随着函数的结束而自动销毁
      - 可以很巧妙地实现静态私有变量、私有函数方法等

    - **闭包的缺点**

      - 通常当执行期上下文被销毁时，函数的激活对象也就被销毁了。当有闭包引用时，**活动对象就不会被销毁**，因为它仍然被引用。这意味着闭包比非隔离的函数需要**更多的内存**。

        - 闭包函数的执行期上下文的作用域链中保存了自己的 Activation Object(激活对象)，外层函数 assignEvents Execution Context(执行上下文)的 Activation Object(激活对象)，以及 Global Object(全局对象)。(携带包含它的函数的作用域，所以会比其他函数占用更多的内存)

      - 闭包会使得函数中的变量都被保存在内存中，所以存在**内存泄露**的风险

    - 应用场景

      - 模拟块级作用域

        ```javascript
        function outputNumbers(count) {
          (function () {
            for (var i = 0; i < count; i++) {
              alert(i);
            }
          })();
          alert(i); // ReferenceError
        }
        ```

      - 模拟私有属性

        ```javascript
        function getGeneratorFunc() {
          var _name = 'John';
          var _age = 22;

          return function () {
            return {
              getName: function () {
                return _name;
              },
              getAge: function () {
                return _age;
              },
            };
          };
        }

        var obj = getGeneratorFunc()();
        obj.getName(); // John
        obj.getAge(); // 22
        obj._age; // undefined
        ```

      - 单例模式

      - 科里化

      - 回调函数：在定时器、事件监听器、ajax 请求、跨窗口通信、Web Workers 或者任何其他的异步(或者同步)任务中，只要用了回调函数，实际上就是在使用闭包(援引自小黄书)。

17. **函数科里化**

    - 用于创建已经设置好了一个或多个参数的函数
    - 基本方法：使用一个闭包返回一个函数。

18. **对象的拷贝**

    - **浅拷贝**：两个 js 对象指向同一个内存地址，其中一个改变会影响另一个

      - 简单的赋值操作(=)

      - Object.assign(target, ...sources)

        - 返回值: target 对象
        - 把任意多个的源对象自身的可枚举属性拷贝给目标对象，然后返回目标对象，目标对象和 target 是同一个地址，修改 target，目标对象也会变。
        - 拷贝的是对象的属性的引用，而不是对象本身

      - Array.prototype.slice()

        - 返回一个新的数组对象，这一对象是一个由 begin 和 end（不包括 end）决定的原数组的浅拷贝。原始数组不会被改变
        - slice()只能实现一维数组的深拷贝

      - Array.prototype.concat()

        - 合并两个或多个数组。不会更改现有数组，而是返回一个新数组。

      - 解构

      - ...扩展运算符

      - **\$.extend({},obj)**：使用递归思路实现了浅拷贝和深拷贝

        - 第一个参数类型为 Boolean，当为 false 的时候必须省略不写则是浅拷贝，当为 true 的时候为深拷贝

      - 自己实现一个浅拷贝思路：

        - 声明一个新对象

        - 旧对象的属性赋值给新对象

          ```javascript
          function shallowClone(source) {
            var target = {};
            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
            return target;
          }
          ```

    - **深拷贝**：会另外拷贝一份一个一模一样的对象，从堆内存中开辟一个新的区域存放新对象，新对象跟原对象不共享内存，修改新对象不会改到原对象。

      - Object.assign()：只能实现一维对象的深拷贝

      - JSON.parse(JSON.stringify())

        - 利用 JSON.parse 将该对象转换为其 JSON 字符串表示形式，然后将其解析回对象
          `const deepClone(obj) => JSON.parse(JSON.stringify(obj));`
        - 注意
          - 不能深拷贝含有 undefined、function、symbol 值的对象
          - 无法拷贝不可枚举的属性，无法拷贝对象的原型链
          - 拷贝 Date 引用类型会变成字符串
          - 拷贝 RegExp 引用类型会变成空对象
          - 对象中含有 NaN、Infinity 和-Infinity，则序列化的结果会变成 null
          - 无法拷贝对象的循环引用(即 obj\[key] = obj)

      - 递归实现深拷贝 (浅拷贝 + 递归)

        ```javascript
        function deepClone(source) {
          // 创建一个新对象
          let result = {};
        
          for (var i in source) {
            if (source.hasOwnProperty(i)) {
              // 如果字段的值也是一个对象则递归操作
              if (typeof source[i] === 'object') {
                target[i] = clone(source[i]);
              } else {
                // 否则直接赋值给新对象
                target[i] = source[i];
              }
            }
          }
          return result;
        }
        ```

        - 存在的问题

          - 没有对参数做检验
          - 判断是否对象的逻辑不够严谨
          - 没有考虑数组的兼容

        - 陷入循环的递归过程的解决方案

          - 消除尾递归：判断一个对象的字段是否引用了这个对象或这个对象的任意父级

            ```javascript
            function isObject(x) {
              return Object.prototype.toString.call(x) === '[object Object]';
            }
            
            function deepClone(source) {
              // 相当于加上一个递归出口
              if (!isObject(source)) return source;
            
              // ...
            }
            ```

            - 可以解决栈溢出问题，但无法解决循环引用
            - 关于循环引用的问题解决思路有两种：循环检测，暴力破解

      - 使用循环来破解递归爆栈

        - 类似于循环遍历一棵树，借用一个栈来做，当栈为空时就遍历完了，栈里面存储下一个需要拷贝的节点

          - 首先我们往栈里放入种子数据，key 用来存储放哪一个父元素的那一个子元素拷贝对象；然后遍历当前节点下的子元素，如果是对象就放到栈里，否则直接拷贝

        ```javascript
        function deepClone(x) {
          const root = {};

          // 栈
          const loopList = [
            {
              parent: root,
              key: undefined,
              data: x,
            },
          ];

          while (loopList.length) {
            // 深度优先
            const node = loopList.pop();
            const parent = node.parent;
            const key = node.key;
            const data = node.data;

            // 初始化赋值目标，key为undefined则拷贝到父元素，否则拷贝到子元素
            let res = parent;
            if (typeof key !== 'undefined') {
              res = parent[key] = {};
            }

            for (let k in data) {
              if (data.hasOwnProperty(k)) {
                if (typeof data[k] === 'object') {
                  // 下一次循环
                  loopList.push({
                    parent: res,
                    key: k,
                    data: data[k],
                  });
                } else {
                  res[k] = data[k];
                }
              }
            }
          }
          return root;
        }
        ```

        - 对于循环引用依然无力应对

      - 破解循环引用

        ```javascript
        // 保持引用关系
        function cloneForce(x) {
          const uniqueList = []; // 用来去重

          let root = {};

          // 循环数组
          const loopList = [
            {
              parent: root,
              key: undefined,
              data: x,
            },
          ];

          while (loopList.length) {
            // 深度优先
            const node = loopList.pop();
            const parent = node.parent;
            const key = node.key;
            const data = node.data;

            // 初始化赋值目标，key为undefined则拷贝到父元素，否则拷贝到子元素
            let res = parent;
            if (typeof key !== 'undefined') {
              res = parent[key] = {};
            }

            // 数据已经存在
            let uniqueData = find(uniqueList, data);
            if (uniqueData) {
              parent[key] = uniqueData.target;
              continue; // 中断本次循环
            }

            // 数据不存在
            // 保存源数据，在拷贝数据中对应的引用
            uniqueList.push({
              source: data,
              target: res,
            });

            for (let k in data) {
              if (data.hasOwnProperty(k)) {
                if (typeof data[k] === 'object') {
                  // 下一次循环
                  loopList.push({
                    parent: res,
                    key: k,
                    data: data[k],
                  });
                } else {
                  res[k] = data[k];
                }
              }
            }
          }
          return root;
        }

        function find(arr, item) {
          for (let i = 0; i < arr.length; i++) {
            if (arr[i].source === item) {
              return arr[i];
            }
          }
          return null;
        }
        ```

        - 存在问题：无法保持引用；如果数据量很大，不适合该方法

      - 也可以用第三方库：

        - **jquery 的\$.extend**
        - **lodash 的\_.cloneDeep**

19. **js 的垃圾回收机制**

    - 原理：垃圾收集器会按照固定的时间间隔，周期性的找出不再继续使用的变量，然后释放其占用的内存

      - 不再继续使用的变量：生命周期结束的变量，是局部变量，局部变量只在函数的执行过程中存在，当函数运行结束，没有其他引用(闭包)，那么该变量会被标记回收

      - 内存生命周期：内存分配 -> 内存使用 -> 内存释放
        - 分配期：分配所需要的内存
        - 使用期：使用分配到的内存（读、写）
        - 释放器：不需要时将其释放和归还

    - **标记清除**：当变量进入环境（例如，在函数中声明一个变量）时，就将这个变量标记为“**进入环境**”。从逻辑上讲，永远不能释放进入环境的变量所占的内存，因为只要执行流进入相应的环境，就可能用到它们。而当变量离开环境时，这将其 标记为“离开环境”。标记“**离开环境**”的就回收内存。
      - 工作流程：
        - 垃圾收集器会在运行的时候会给存储在内存中的所有变量都加上标记
        - 去掉环境中的变量以及被环境中的变量引用的变量的标记
        - 那些还存在标记的变量被视为准备删除的变量
        - 最后垃圾收集器会执行最后一步内存清除的工作，销毁那些带标记的值并回收它们所占用的内存空间

20. **内存泄露**

    - 内存泄漏指由于疏忽或错误造成程序未能释放已经不再使用的内存。内存泄漏并非指内存在物理上的消失，而是应用程序分配某段内存后，由于设计错误，导致在释放该段内存之前就失去了对该段内存的控制，从而造成了内存的浪费。

    - JavaScript 常见的内存泄漏及解决办法

      - **意外的全局变量**：

        - 未声明的变量

          - 会在全局对象下创建一个新变量。在浏览器中，全局对象是 window。全局变量是很难被垃圾回收器回收的。

          ```javascript
          function foo(arg) {
            //等同于window.bar="this is a hidden global variable"
            bar = 'this is a hidden global variable';
            //这里的this 指向了全局对象（window）,等同于window.bar2="potential accidental global"
            this.bar2 = 'potential accidental global';
          }
          ```

        - 使用 this 创建的变量

          ```javascript
          function fn() {
            this.a = "Actually, I'm a global variable";
          }
          fn();
          ```

          - 这里 this 的指向是 window, 因此此时创建的 a 变量也会被挂载到 window 对象下

        - 解决方法：在 JavaScript 程序中开启严格模式'use strict'，使得 this 的指向为 undefined, 这样就可以避免了

        - 注意：那些用来临时存储大量数据的全局变量，确保在处理完这些数据后将其设置为 null 或重新赋值。与全局变量相关的增加内存消耗的一个主因是缓存。缓存数据是为了重用，缓存必须有一个大小上限才有用。高内存消耗导致缓存突破上限，因为缓存内容无法被回收。

      - **循环引用**：

        - 在 js 的内存管理环境中，对象 A 如果有访问对象 B 的权限，叫做对象 A 引用对象 B。引用计数的策略是将“对象是否不再需要”简化成“对象有没有其他对象引用到它”，如果没有对象引用这个对象，那么这个对象将会被回收。

        - 循环引用 example：根据引用计数方法，obj1 和 obj2 的引用次数都不为 0，所以他们不会被回收。

          ```javascript
          function func() {
            let obj1 = {};
            let obj2 = {};

            obj1.a = obj2; // obj1 引用 obj2
            obj2.a = obj1; // obj2 引用 obj1
          }
          ```

        - 解决方法：在不使用它们的时候手工将它们设为空。上面的例子可以这么做：

          ```javascript
          obj1 = null;
          obj2 = null;
          ```

      - **被遗忘的计时器和回调函数**

        - 定时器引起

          - 在 setInterval 没有结束前，回调函数里的变量以及回调函数本身都无法被回收。如果回调函数内没有做什么事情，并且也没有被 clear 掉的话，就会造成内存泄漏。不仅如此，如果回调函数没有被回收，那么回调函数内依赖的变量也没法被回收。

          ```javascript
          let someResource = getData();
          setInterval(() => {
            const node = document.getElementById('Node');
            if(node) {
              node.innerhtml = jsON.stringify(someResource));
            }
          }, 1000);
          ```

        - 解决方法：当不需要 interval 或者 timeout 时，最好调用 clearInterval 或者 clearTimeout。

      - **DOM 泄露**

        - IE 的 DOM 回收机制便是采用引用计数，以下主要针对 IE 而言的。

          - 没有清理的 DOM 元素引用

            ```javascript
            var refA = document.getElementById('refA');
            document.body.removeChild(refA);
            // #refA不能回收，因为存在变量refA对它的引用。将其对#refA引用释放，但还是无法回收#refA
            ```

            - 解决办法：refA = null;

          - 给 DOM 对象添加的属性是一个对象的引用

            ```javascript
            var MyObject = {};
            document.getElementById('mydiv').myProp = MyObject;
            ```

            - 解决方法：在 window.onunload 事件中写上: `document.getElementById('mydiv').myProp = null;`

          - DOM 对象与 js 对象相互引用

            ```javascript
            function Encapsulator(element) {
              this.elementReference = element;
              element.myProp = this;
            }
            new Encapsulator(document.getElementById('mydiv'));
            ```

            - 解决方法：在 onunload 事件中写上: `document.getElementById('mydiv').myProp = null;`

          - 给 DOM 对象用 attachEvent 绑定事件

            ```javascript
            function doClick() {}
            element.attachEvent('onclick', doClick);
            ```

            - 解决方法：在 onunload 事件中写上: element.detachEvent('onclick', doClick);

          - 从外到内执行 appendChild。这时即使调用 removeChild 也无法释放

            ```javascript
            var parentdiv = document.createElement('div');
            var childdiv = document.createElement('div');
            document.body.appendChild(parentdiv);
            parentdiv.appendChild(childDiv);
            ```

            - 解决方法： 从内到外执行 appendChild:

            ```javascript
            var parentdiv = document.createElement('div');
            var childdiv = document.createElement('div');
            parentdiv.appendChild(childDiv);
            document.body.appendChild(parentdiv);
            ```

      - **js 的闭包**

        - eg：匿名函数能够访问父级作用域中的变量

          ```javascript
          function fn() {
            var a = "I'm a";
            return function () {
              console.log(a);
            };
          }
          ```

          - 变量 a 被 fn()函数内的匿名函数所引用, 因此这种变量是不会被回收的

        - 闭包在 IE6 下会造成内存泄漏，但是现在已经无须考虑了。值得注意的是**闭包本身不会造成内存泄漏，但闭包过多很容易导致内存泄漏**。**闭包会造成对象引用的生命周期脱离当前函数的上下文**，如果闭包如果使用不当，可以导致环形引用（circular reference），类似于死锁，只能避免，无法发生之后解决，即使有垃圾回收也还是会内存泄露。

      - **console**

        - 控制台日志记录对总体内存配置文件的影响可能是许多开发人员都未想到的极其重大的问题。记录错误的对象可以将大量数据保留在内存中。注意，这也适用于：

          - 在用户键入 JavaScript 时，在控制台中的一个交互式会话期间记录的对象。
          - 由 console.log 和 console.dir 方法记录的对象。

      - 避免内存泄露：

        - 注意程序逻辑，避免“死循环”
        - 减少不必要的全局变量，或者生命周期较长的对象，及时对无用的数据进行垃圾回收
        - 避免创建过多的对象 原则：不用了的东西要及时归还

21. **javascript 事件循环机制**

    - JS 一大特点就是单线程，这是为了避免复杂性。单线程就意味着所有任务需要排队，前一个任务结束，才会执行后一个任务。如果前一个任务耗时长，后一个任务就不得不一直等着。而主线程完全可以先挂起处于等待中的任务，先运行排在后面的任务，之后再运行挂起的这些任务。于是所有任务就分成了两种：同步任务吗，异步任务。

    - ![image](https://user-gold-cdn.xitu.io/2018/7/14/164974fb89da87c5?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

    - **同步任务**：在主线程上排队执行的任务，只有前一个任务执行完毕，才能执行后一个任务

    - **异步任务**：不进入主线程，而是进入"任务队列"（task queue）的任务，只有"任务队列"通知主线程，某个异步任务可以执行了，该任务才会进入主线程执行

    - **Event Loop**中，每一次循环成为 tick，**每一次 tick 的任务**如下

      - 若是**同步任务则进入主线程**，形成一个**执行栈**；若是**异步任务则进入 Event Table 并且注册函数**
      - 当指定的事情完成时，Event Table 会将这个函数移入 Event Queue
      - js 引擎存在 monitoring process 进程，会持续不断地检查主线程执行栈是否为空，一旦为空，就会去 Event Queue 那里检查是否有等待被调用的函数，若有则进入主线程执行
      - 上述过程会不断重复，反复等待—执行，这就是**Event Loop**
      - 总结：**事件循环机制的特点：**出队一个宏任务 -> 调用栈为空后，执行一队微任务 -> 更新界面渲染 -> 回到第一步

    - **宏任务和微任务**

      - ![image](https://user-gold-cdn.xitu.io/2018/7/14/164974fa4b42e4af?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

      - 异步任务分为**宏任务**和**微任务**，不同类型的任务会进入对应的 event queue，宏任务进宏任务队列，微任务进微任务队列，JS 会在同步任务执行完后**先去清空微任务队列，最后清空完微任务再去宏任务队列取值**

      - **宏任务**：

        - 由宿主（Node、浏览器）发起
        - 包括整体代码 script，setTimeout，setInterval，setImmediate，UI rendering/UI 事件，postMessage/MessageChannel，setImmediate，I/O(Node)
        - 会触发新一轮 Tick

      - **微任务**：

        - 由 JS 引擎发起

        - 一般包括：原生 Promise、process.nextTick(Node.js)、Object.observe(已废弃)、 MutationObserver
        - 不会触发新一轮 Tick

    - **async 和 await 是如何处理异步任务的**

      ```javascript
      async function async1() {
        console.log('immediate'); // await出现之前，其中的代码是立即执行的
        await async2(); // await 后的表达式会先执行
        // await的下行代码等于放进promise的then里，加入微任务队列，然后跳出整个async函数
        console.log('async1 end');
      }
      async function async2() {
        console.log('async2 end');
      }
      async1();

      // 相当于ES5的写法
      async function async1() {
        console.log('async2 end');
      }
      async1().then(() => {
        console.log('async1 end');
      });
      ```

    - **setTimeout，setImmediate 谁先执行**：一般来说，setImmediate 会在 setTimeout 之前执行

    - **Promise，process.nextTick(Node 环境下)谁先执行**：

      - process.nextTick()不属于任何 event loop 阶段，Node 在遇到这个 API 时，event loop 不会继续进行，会马上停下来执行 process.nextTick()，这个执行完之后才会继续 event loop

    - 微任务队列中创建的宏任务会被添加到当前宏任务队列的尾端，微任务队列中创建的微任务会被添加到微任务队列的尾端，只要微任务队列中还有任务，宏任务队列就只会等待微任务队列执行完毕后再执行

22. **this 的指向**

    - this 是在函数被调用时发生的绑定，它指向什么**取决于函数的调用位置**

      - 既不指向函数自身，也不指向函数的词法作用域

    - this 的默认绑定

      - strict mode 下，会绑定到 undefined
      - 非严格模式，this 指向全局对象

    - this 的隐式绑定

      - 当函数引用中有上下文对象时，隐式绑定规则会把调用中的 this 绑定到这个上下文对象

        ```javascript
        function foo() {
          console.log(this.a);
        }
        var obj = {
          a: 2,
          foo: foo,
        };
        obj.foo(); // 2
        ```

      - 对象属性引用链中只有上一层或者说最后一层在调用位置中起作用

    - this 的显式绑定

      - 硬绑定：call()、apply()、Function.prototype.bind() (ES5)

      - API 调用的"上下文"

    - new 绑定

    - 优先级：new 绑定 > 显式绑定 > 隐式绑定 > 默认绑定

23. **new 运算符的执行过程**

    - 创建(/构造)一个全新的对象
    - 新对象链接到该函数的\[\[prototype\]\]原型
    - 新对象绑定函数调用的 this: apply(属性和方法被加入到对象中)
    - 返回新对象(如果构造函数有自己 retrun 时，则返回该值)

    ```javascript
    var obj = {};
    obj.__proto__ = Base.prototype;
    Base.call(obj);
    ```

24. **改变 this 的指向：call()、apply()、bind()**

    - **call()**
    - **apply()**
    - **bind()**
    - **call()、apply()、bind()的区别**

25. **defineProperty**

26. **eval**

    - 把对应的字符串解析成 JS 代码并运行
    - 应该避免使用 eval，不安全，非常耗性能(2 次，一次解析成 js 语句，一次执行)

27. **V8 线程模式**

28. **前端模块化**

    - 有几种规范？
    - commonjs 和 es module 都是怎么实现的？有啥区别？

29. **前端性能优化**

30. **JS 延迟加载的方式**

31. **setTimeout 和 setInterval**

    - **setTimeout**：到达一定的时间触发一次， 当方法执行完成定时器就立即停止(但是定时器还在,只不过没用了)

      - `setTimeout(callback, time);`
      - 定时器：在指定的毫秒数后调用函数或计算表达式
      - 取消：clearTimeout()

    - **setInterval**：到达一定时间触发一次，并且会持续触发，直到我们手动清除定时器为止

      - `setInterval(callback, time);`
      - 计时器：按照指定的周期（以毫秒计）来调用函数或计算表达式。方法会不停地调用函数，直到 clearInterval() 被调用或窗口被关闭
      - 暂停 setInterval：clearInterval()

    - **setTimeout 实现 setInterval**：

      ```javascript
      function mySetInterval(fn, time) {
        function interval() {
          setTimeout(interval, time);
        }
        setTimeout(interval, time);
      }
      ```

32. **函数防抖和函数节流**

    - 函数防抖：触发事件后在规定时间内回调函数只能执行一次，如果在规定时间内又触发了该事件，则会重新开始算规定时间

      - 非立即执行版：事件触发 - > 延时 - > 执行回调函数

        ```javascript
        function shotCat(content) {
          console.log('test');
        }

        function debounce(fun, delay = 500) {
          let timer;
          return function () {
            let that = this;
            let args = arguments; // arguments中存着e
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => {
              fun.apply(that, args);
            }, delay);
          };
        }

        let debounceShotCat = debounce(shotCat, 500);
        let input = document.getElementById('debounce');
        input.addEventListener('keyup', function (e) {
          debounceShotCat(e.target.value);
        });
        ```

      - 立即执行版：事件触发 - > 执行回调函数 - > 延时

        ```javascript
        function debounce(func, delay) {
          let timer;
          return function () {
            let that = this;
            let args = arguments;
            if (timer) clearTimeout(timer);
            let callNow = !timer;
            timer = setTimeout(() => {
              timer = null;
            }, delay);
            if (callNow) func.apply(that, args);
          };
        }
        ```

      - 合并版

        ```javascript
        function debounce(fn, delay, immediate) {
          let timer;
          return function () {
            let that = this;
            let args = arguments;
            if (timer) clearTimeout(timer);
            if (immediate) {
              let callNow = !timer;
              timer = setTimeout(() => {
                timer = null;
              }, delay);
              if (callNow) fn.apply(that, args);
            } else {
              timer = setTimeout(() => {
                fn.apply(that, args);
              }, delay);
            }
          };
        }
        ```

    - 函数节流：当持续触发事件时，在规定时间段内只能调用一次回调函数。如果在规定时间内又触发了该事件,则什么也不做, 也不会重置定时器

      - 时间戳方式：通过闭包保存上一次的时间戳, 然后与事件触发的时间戳比较，如果大于规定时间, 则执行回调,否则就什么都不处理

        ```javascript
        function throttle(fn, delay) {
          let previous = 0;
          return function () {
            let now = Date.now();
            let that = this;
            let args = arguments;
            if (now - previous > delay) {
              fn.apply(that, args);
              previous = now;
            }
          };
        }
        ```

      - 定时器方式：通过闭包保存上一次定时器状态,然后事件触发时,如果定时器为 null(即代表此时间隔已经大于规定时间)，则设置新的定时器.到时间后执行回调函数,并将定时器置为 null

        ```javascript
        function throttle(fn, delay) {
          let timeout;
          return function () {
            let that = this;
            let args = arguments;
            if (!timeout) {
              timeout = setTimeout(() => {
                timeout = null;
                fn.apply(that, args);
              }, delay);
            }
          };
        }
        ```

      - 合并版

        ```javascript
        function throttle(func, delay, type) {
          if (type === 1) {
            let previous = 0;
          } else if (type === 2) {
            let timeout;
          }

          return function () {
            let that = this;
            let args = arguments;
            if (type === 1) {
              let now = Date.now();
              if (now - previous > delay) {
                func.apply(that, args);
                previous = now;
              }
            } else if (type === 2) {
              if (!timeout) {
                timeout = setTimeout(() => {
                  timeout = null;
                  func.apply(that, args);
                }, wait);
              }
            }
          };
        }
        ```

33. **事件流**

    - 事件流描述从页面中接收事件的顺序， 一共有**三个阶段**：捕获阶段 —— 目标阶段 —— 冒泡阶段
    - **事件捕获**：其思想是不太具体的节点应该更早接收到事件，而最具体的节点应该最后接收到事件。其用意在于在事件到达预定目标之前捕获它。
    - **事件冒泡**：事件开始时由最具体的元素接收，然后逐级向上传播到较为不具体的节点

34. **事件委托(代理)**

    - 是对”事件处理程序“过多问题的解决方案。

    - 事件委托**利用了事件冒泡**，在 DOM 树中尽量最高的层次上添加一个事件处理程序，就可以管理某一类型的所有事件。

    - **优点**：

      - 可以大量节省内存占用，减少事件注册，提升整体性能
      - 可以实现当新增子对象时，无需再对其进行事件绑定，对于动态内容部分尤为合适

    - **缺点**：如果把所有事件都用事件代理，可能会出现事件误判。即本不该被触发的事件被绑定上了事件

    - 实例：

      ```html
      <ul id="myLinks">
        <li id="goSomewhere">Go Somewhere</li>
        <li id="goSomething">Do Something</li>
        <li id="sayHi">Say Hi</li>
      </ul>

      <script>
        var list = document.getElementById('myLinks');
        EventUtil.addHandler(list, 'click', function (event) {
          event = EventUtil.getEvent(event);
          var target = EventUtil.getTarget(event);
          switch (target.id) {
            case 'doSomething':
              document.title = 'I did something great';
            case 'goSomewhere':
              location.href = 'http://www.wrox.com';
              break;
          }
        });
      </script>
      ```

35. **如何阻止事件冒泡和默认事件**

    - 阻止冒泡：stopPropagation()。ie8 以下：设置事件对象的 cancelBubble 属性为 true

    - 阻止默认事件：preventDefault()。ie：设置事件对象的 returnValue 属性为 false

36. **event 对象**

    - 在触发 DOM 上的某个事件时，会产生一个事件对象 event，这个对象中包含着所有与事件有关的信息。包括导致事件的元素、时间的类型以及其它与特定事件相关的信息。比如：

      - type：被触发的事件的类型
      - bubbles：事件是否冒泡
      - currentTarget：其事件处理程序当前正在处理事件的那个元素
      - target：事件的目标
      - path：当前节点往外，包含当前节点和其所有父节点的一个 array

    - 在事件处理程序的内部，对象 this 始终等于 currentTarget 的值，而 target 则只包含事件的实际目标。如果将事件处理程序指定给目标元素，则 this, currentTarget 和 target 包含相同的值。

      ```javascript
      var btn = document.getElementById('myBtn');
      btn.onclick = function (event) {
        alert(event.currentTarget === this); // true
        alert(event.target === this); // true
      };
      ```

> 参考链接
>
> 1. https://juejin.im/post/5c64d15d6fb9a049d37f9c20#heading-4、
> 2. https://mp.weixin.qq.com/s/-4QzuupsTwr2NcknN590Dg
> 3. https://mp.weixin.qq.com/s/jdDwmPfMOf4qVnwYx0a6ew
> 4. https://juejin.im/post/5e6055e6f265da5762133c89
> 5. https://juejin.im/post/59cf06745188253fbe466f78
> 6. https://juejin.im/post/592045b0570c350069a1d7b5
> 7. https://juejin.im/post/5b40581e5188251ac446c716
> 8. https://juejin.im/post/5e10a97f5188253a765ec7e1
> 9. https://juejin.im/post/5bbad07ce51d450e894e4228
> 10. https://juejin.im/post/5ad5b908f265da23870f540d
> 11. http://www.fly63.com/article/detial/225?type=2
> 12. https://mp.weixin.qq.com/s/3R8BxWk6JjUxF4OIdWBc_g
> 13. https://mp.weixin.qq.com/s/bvYqA16mU_rRYT1G37onug
> 14. https://blog.csdn.net/Q846169253/article/details/81841919
> 15. https://www.cnblogs.com/rogerwu/p/10738776.html
> 16. https://juejin.im/post/6844903798851239950#heading-38
> 17. http://www.imooc.com/article/281277?block_id=tuijian_wz
> 18. NicholasC.Zakas, 泽卡斯, Zakas, 李松峰, & 曹力. (2010). JavaScript 高级程序设计. 人民邮电出版社.
> 19. https://juejin.im/post/5d0a48d86fb9a07ea803cf23#heading-0
> 20. https://juejin.im/post/59ac1c4ef265da248e75892b#heading-12
> 21. https://juejin.im/post/5d1d61766fb9a07ed2248aea#heading-5
> 22. KyleSimpson, 辛普森, 赵望野, & 梁杰. (2015). 你不知道的 JavaScript. 人民邮电出版社.
> 23. https://juejin.im/post/5ec74c6a518825430956ae65#heading-9
> 24. https://www.jianshu.com/p/c8b86b09daf0
> 25. https://juejin.im/post/6844903741783556109
> 26. https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/?utm_source=html5weekly ★（event loop, incredibly easy to understand）
> 27. https://juejin.im/post/6844903638238756878#heading-6
> 28. https://www.jianshu.com/p/bfc3e319a96b
> 29. https://juejin.im/post/6844904152779210766
> 30. https://juejin.im/post/6844904152779210766
