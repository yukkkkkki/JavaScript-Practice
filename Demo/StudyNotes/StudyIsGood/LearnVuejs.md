# Vuejs

1. **生命周期**

   - 实例从创建到销毁的过程，可以分为 4 个阶段：**初始化阶段、模板编译阶段、挂载阶段、卸载阶段**

     | 生命周期钩子  | 描述                                                                                                                                                     |
     | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
     | beforeCreate  | 在实例初始化之后，可获取 vue 实例，data 数据未绑定，el 未挂载                                                                                            |
     | created       | 在实例创建完成后被立即调用，数据已观测到，el 未挂载<br />（**模板渲染成 html 前**，通常在此阶段初始化数据，然后再渲染成视图）                            |
     | beforeMount   | 在挂载开始之前被调用：相关的 render 函数首次被调用                                                                                                       |
     | mounted       | 实例被挂载后调用，这时 el 被新创建的 vm.\$el 替换了<br />（**模板渲染成 html 后**，通常是**初始化页面完成后，再对 html 的`DOM`节点进行一些需要的操作**） |
     | beforeUpdate  | 数据更新时调用，发生在虚拟 DOM 打补丁之前                                                                                                                |
     | updated       | 由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子                                                                                        |
     | activated     | 被 keep-alive 缓存的组件激活时调用                                                                                                                       |
     | deactivated   | 被 keep-alive 缓存的组件停用时调用                                                                                                                       |
     | beforeDestroy | 实例销毁之前调用。在这一步，实例仍然完全可用                                                                                                             |
     | destroyed     | 实例销毁后调用。被调用后，对应 Vue 实例的所有指令都被解绑，所有的事件监听器被移除，所有的子实例也都被销毁                                                |
     | errorCaptured | 当捕获一个来自子孙组件的错误时被调用                                                                                                                     |

     - **初始化阶段**：**new Vue()到 created 之间**的阶段。主要目的是**在 Vue 实例上初始化一些属性、事件以及响应式数据**，如 props、methods、data、computed、watch、provide 和 inject 等
     - **模板编译阶段**：**created 与 beforeMount 之间**的阶段。主要目的是**将模板编译为渲染函数，只存在于完整版中**。在只包含运行时的构建版本中执行 new Vue()则不会存在这个阶段
       - vue 文件内部的模板会在构建时预编译成 js，所以最终打好的包里不需要编译，用运行时版本即可
     - **挂载阶段**：**beforeMount 到 mounted 之间**的阶段。在此阶段**将实例挂载到 DOM 元素上**，即将模板渲染到指定的 DOM 元素中。在**挂载过程中会开启 watcher 来持续追踪依赖的变化**。在已挂载过程中会持续追踪状态的变化，当**状态发生改变时，watcher 会通知虚拟 DOM 重新渲染视图，并且在渲染视图前触发 beforeUpdated，渲染完毕后触发 updated**
     - **卸载阶段**：**调用 vm.\$destory 方法后**。在此阶段 vue.js 将**自身从父组件中删除，取消实例上所有依赖的追踪，并且移除所有的事件监听器**。

   - 注意：

     - mounted 不会保证所有的子组件也都一起被挂载。如果你希望等到整个视图都渲染完毕，可以在 mounted 内部使用 vm.\$nextTick：

       ```javascript
       mounted: function() {
         this.$nextTick(function() {
           // Code that will run only after the entire view has been rendered
         })
       }
       ```

     - updated 不会保证所有的子组件也都一起被重绘。如果你希望等到整个视图都重绘完毕，可以在 updated 里使用 vm.\$nextTick：

       ```javascript
       updated: function() {
         this.$nextTick(function() {
        // Code that will run only after the entire view has been re-rendered
         })
       }
       ```

     - errorCaptured：此钩子会收到三个参数：错误对象、发生错误的组件实例以及一个包含错误来源信息的字符串。此钩子可以返回 false 以阻止该错误继续向上传播。

   - ![image text](https://cn.vuejs.org/images/lifecycle.png?_sw-precache=6f2c97f045ba988851b02056c01c8d62)

2. **`Vue`获取数据在哪个周期函数**

   - 一般 `created/beforeMount/mounted` 皆可。如果涉及到需要页面加载完成之后(DOM 操作)的就用 mounted

3. **父子组件的生命周期顺序**

   - 当父子组件嵌套时，父组件和子组件各自拥有独立的钩子函数，其执行顺序是：**父组件先创建，然后子组件创建；子组件先挂载，然后父组件挂载**。从创建到挂载，是**从外到内，再从内到外，mixins 先于组件**
   - **加载渲染**过程：**父 beforeCreate -> 父 created -> 父 beforeMount -> 子 beforeCreate -> 子 created -> 子 beforeMount -> 子 mounted -> 父 mounted**
     - 子组件挂载完成后父组件还未挂载，所以数据回显时在父组件 mounted 中获取数据，子组件的 mounted 是拿不到的。
     - 父子组件传递接口数据的解决方案：**在 created 中发起请求获取数据，依次在子组件的 created 或者 mounted 中会接受到这个数据**
   - **更新过程**：**父 beforeUpdate -> 子 beforeUpdate -> 子 updated -> 父 updated**
   - **销毁过程**：**父 beforeDestroy -> 子 beforeDestroy -> 子 destroyed -> 父 destroyed**

4. **vm.\$nextTick**

   - 接收一个回调函数作为参数，作用是**将回调延迟到下次 DOM 更新周期之后执行**。

     ```javascript
     new Vue({
       methods: {
         // ...
         example: function () {
           this.message = 'changed'; // 修改数据
           // DOM还没有更新
           this.$nextTick(function () {
             // DOM现在更新了，this绑定到当前实例
             this.doSomethingElse();
           });
         },
       },
     });
     ```

   - 下次 DOM 更新周期之后是指**下次微任务执行时更新 DOM**。**vm.\$nextTick 其实是将回调添加到微任务队列中**。

   - 若回调执行前反复调用 vm.\$nextTick，**vue 不会反复将其添加到任务队列中，只会向任务队列中添加一个任务**。

5. **Vue 的优点**

   - 轻量级框架：只关注视图层，是一个构建数据的视图集合，大小只有几十 `kb` ；
   - 简单易学
   - 双向数据绑定：保留了 `angular` 的特点，在数据操作方面更为简单；
   - 组件化：保留了 `react` 的优点，实现了 `html` 的封装和重用，在构建单页面应用方面有着独特的优势；
   - 视图、数据、结构分离：使数据的更改更为简单，不需要进行逻辑代码的修改，只需要操作数据就能完成相关操作；
   - 虚拟 DOM：`dom` 操作是非常耗费性能的， 不再使用原生的 `dom` 操作节点，极大解放 `dom` 操作，但具体操作的还是 `dom` 不过是换了另一种方式；
   - 运行速度更快：相比较于 `react` 而言，同样是操作虚拟 `dom` ，就性能而言， `vue` 存在很大的优势。

6. **Vue 组件间传递参数**

   - `vue`中的通信方式

     - `v-bind` 和 `props` （通过绑定属性进行传值）
     - `v-on` 和 `$emit` （通过触发事件进行传值）
     - `$ref`、`$parent`、`$children`（通过获取到`dom`进行传值）
     - `provide`和`inject` （使用依赖注入进行传值）
     - `$attrs` 和 `$listeners` (获取剩余参数进行传值)
     - `EventBus` (利用事件总线进行传值)
     - `vuex`
     - 利用本地存储和`vue-router`等方式

   - **`Props`传参**：父组件给子组件传递数据

     - 子组件里定义`props`三种方式

       ```javascript
       props: [xxx, xxx, xxx] // 第一种：数组方式
       props: { xxx: Number, xxx: String} // 第二种：对象方式

       props: { // 第三种：对象嵌套对象方式
         xxx: {
           type: Number, //类型不匹配会警告
           default: 0,
           required: true,
           validator(val) { return val === 10} // 返回值不是 true,会警告
         }
       }
       ```

     - 父组件传参的两种方式

       - 静态属性传参

         ```html
         <!--props 接受到的均为 String -->
         <!--不定义 props 类型的情况下 props 接受到的均为 String -->
         <children xxx="123"></children>

         <!-- 只有属性没有值, 这种情况 props 指定类型是 Boolean 则接收到的是 true -->
         <children xxx></children>
         ```

       - 动态属性传参

         ```html
         <!-- prop 接收到 Number 类型的 123-->
         <children :xxx="123"></children>

         <!-- prop 接收到 Array 类型的 [1, 2, 3]-->
         <children v-bind:xxx="[1, 2, 3]"></children>

         <!-- prop 会接收到 xxx1 和 xxx2 俩个参数。这种不支持简写形式-->
         <children v-bind="{xxx1: 1, xxx2: 2}"></children>
         <!-- 如果是表达式则获取到的是表达式的计算结果 -->
         ```

     - **子组件不可修改父组件传递的 Prop**：因为vue设计是**单向数据流，数据的流动方向只能是自上往下的方向**，这样易于监测数据的流动，出现了错误可以更加迅速的定位到错误发生的位置

     - 如果修改了父组件传递的prop，vue 是如何监控到属性的修改并给出警告的：

       ```javascript
       if (process.env.NODE_ENV !== 'production') {
         var hyphenatedKey = hyphenate(key);
         if (
           isReservedAttribute(hyphenatedKey) ||
           config.isReservedAttr(hyphenatedKey)
         ) {
           warn(
             '"' +
               hyphenatedKey +
               '" is a reserved attribute and cannot be used as component prop.',
             vm
           );
         }
         defineReactive$$1(props, key, value, function () {
           if (!isRoot && !isUpdatingChildComponent) {
             warn(
               'Avoid mutating a prop directly since the value will be ' +
                 'overwritten whenever the parent component re-renders. ' +
                 "Instead, use a data or computed property based on the prop's " +
                 'value. Prop being mutated: "' +
                 key +
                 '"',
               vm
             );
           }
         });
       }
       ```

       - 在initProps的时候，在defineReactive时通过判断是否在开发环境，如果是开发环境，会**在触发set的时候判断是否此key是否处于updatingChildren中被修改，如果不是，说明此修改来自子组件，触发warning提示**
       - 注意：**从子组件修改的prop属于基础类型时会触发提示**。 这种情况下，你是无法修改父组件的数据源的， 因为基础类型赋值时是值拷贝。你**直接将另一个非基础类型（Object, array）赋值到此key时也会触发提示(但实际上不会影响父组件的数据源)， 当你修改object的属性时不会触发提示，并且会修改父组件数据源的数据**。

     - 实例：

       ```javascript
       // Parent.vue
       <template>
         <div class="parent">
           <h1>父组件</h1>
           <Child message1='我是直接参数' :message2='msg' :message3='obj'></Child>
         </div>
       </template>
       <script>
       import Child from '@/views/Child.vue'
       export default {
         name: 'Parent',
         components: {
           Child
         },
         data() {
           return {
             msg: '我是父组件的参数'
           }
         },
         created() {
           this.obj = { a:'1', b:'2', c:'3' };
         }
       }
       </script>
       // Child.vue
       <template>
         <div class="child">
           <h1>子组件</h1>
           <div>{{message1}}</div>
           <div>{{message2}}</div>
           <div>{{message3.a}} -- {{message3.b}} -- {{message3.c}}</div>
         </div>
       </template>
       <script>
       export default {
         name: 'Child',
         components: {
         },
         // props: ['message1', 'message2', 'message3'],
         props: {
           message1: String,
           message2: String,
           message3: Object
         },
         created() {
           console.log(this.message3);
         }
       }
       </script>
       ```

     - 优点

       - 使用最为简单，也是父子组件传递最常见的方法。
       - `Vue`为 props 提供了类型检查支持。
       - `$emit`不会修改到别的组件的同名事件，因为他只能触发父级的事件，这里和 event-bus 不同

     - 缺点

       - 单一组件层级一深需要逐层传递，会有很多不必要的代码量
       - 不能解决了多组件依赖统同一状态的问题

   - `$emit`/`$on`：子组件向父组件传值

     ```javascript
     // 子组件里自定义事件：
     this.$emit('item-click');
     // 父组件里
     <cpn @item-click="cpnClick"></cpn>
     ```

   - `provide`/`inject `依赖注入

     - 在父组件上通过 provide 提供给后代组件的数据/方法，在后代组件上通过 inject 来接收被注入的数据/方法

       - provide：应该是一个对象或返回一个对象的函数。该对象包含可注入其子孙的 property
       - inject：应该是一个字符串数组，或者一个对象，对象的 key 是本地的绑定名，value 是
         - 在可用的注入内容中搜索用的 key
         - 或一个对象，该对象的：
           - `from` property 是在可用的注入内容中搜索用的 key
           - `default` property 是降级情况下使用的 value

       ```javascript
       // 父组件
       var Provider = {
         provide: function () {
           return {
             getMap: this.getMap,
           };
         },
       };

       // 子组件
       var Child = { inject: ['getMap'] };
       ```

     - 可以把依赖注入看作一部分“大范围有效的 prop”，除了

       - 祖先组件不需要知道哪些后代组件使用它提供的 property
       - 后代组件不需要知道被注入的 property 来自哪里

     - 优点：不用像 props 一层层传递，可以跨层级传递

     - 缺点

       - 用这种方式传递的 property 是非响应式的，所以尽可能来传递一些静态属性。
         - 如果你传入了一个可监听的对象，那么其对象的 property 还是可响应的
       - **它将你的应用以目前的组件组织方式耦合了起来，使重构变得更加困难**

   - `slot` / `slot-scope`

     - 可以在组件的 html 模版里添加自定义内容
     - **父组件模板的所有东西都会在父级作用域内编译；子组件模板的所有东西都会在子级作用域内编译**
     - 优点：可以在父组件里自定义插入到子组件里的内容；复用性好,适合做组件开发
     - 缺点：和 props 一样不支持跨层级传递

   - `$parent` / `$children`：通过`$parent`/`$children`可以拿到父子组件的实例，从而调用实例里的方法，实现父子组件通信。并不推荐这种做法。

     - 优点：可以拿到父子组件实例，从而拥有实例里的所有属性
     - 缺点
       - 用这种方法写出来的组件十分难维护，因为你并不知道数据的来源是哪里，有悖于单向数据流的原则
       - `this.$children`拿到的是一个数组，你并不能很准确的找到你要找的子组件的位置，尤其是子组件多的时候

   - `$attrs`和`$listeners`传参

     - **\$attrs**：包含了父作用域中**不作为 prop 被识别 (且获取)** 的 attribute 绑定。当一个组件没有声明任何 prop 时，这里会包含所有父作用域的绑定，并且可以通过 `v-bind="$attrs"` 传入内部组件

     - **\$listeners**：包含了父作用域中的 (不含 `.native` 修饰器的) `v-on` 事件监听器。它可以通过 `v-on="$listeners"` 传入内部组件

     - **使用方法**：父组件的子组件中，引用孙子组件时给其 v-bind 绑定$attrs，获取到父组件中传递下来除了子组件中props声明的属性；v-on绑定$listeners，这样孙子组件可以直接向爷爷组件 emit 数据

       ```javascript
       // 父组件Father.vue
       <template>
         <div style="width: 500px; margin: 0 auto; border: 1px solid black">
           <h1>父组件</h1>
           <p>这是来自孙子组件的数据：{{msgFromC}}</p>
           <div>
             <B :messagec="messagec" :msgc="msgc2" :msgfromA="msgtoSon" @getCData="getCData"></B>
           </div>
         </div>
       </template>
       <script>
       import B from "./Son";
       export default {
         components: { B },
         data() {
           return {
             messagec: { a: 1, c: 2 }, //传递给孙子组件的数据,可以传对象，字符串以及其他类型
             msgc2: "第二个传给孙组件的值",
             msgtoSon: "这是父组件给子组件传的参数",
             msgFromC: "",
           };
         },
         methods: {
           //执行孙子组件触发的事件
           getCData(val) {
             console.log("这是来自孙子组件的数据：" + val);
             this.msgFromC = val;
           },
         },
       };
       </script>
       // 子组件Son.vue
       <template>
         <div>
           <div style="border: 1px solid blue;">
             <h1>这是子组件</h1>
             <p>{{msgfromA}}</p>
             <!-- v-bind 绑定$attrs属性，C组件可以直接获取到A组件中传递下来的props（除了B中props声明的） -->
             <C v-bind="$attrs" v-on="$listeners"></C>
           </div>
         </div>
       </template>
       <script>
       import C from "./grandChild.vue"; // 引入孙子组件
       export default {
         components: { C },
         data() {
           return {
             mymessage: "",
           };
         },
         props: {
           msgfromA: String,
           // B组件中声明传向C组件的值，会被拦截，C组件通过$attrs.messagec得不到该值，所以不能在此声明
           // messagec: String
         },
       };
       </script>
       // 孙子组件grancChild.vue
       <template>
         <div style="border: 1px solid red;">
           <h1>孙子组件</h1>
           <p>接受来自father的值：{{$attrs.messagec.a}}</p>
           <p>接受来自father第二个的值：{{$attrs.msgc}}</p>
           <input type="text" v-model="msgtofather" @input="passCData(msgtofather)" />
         </div>
       </template>
       <script>
       export default {
         data() {
           return {
             msgtofather: "", //传给father组件的值
           };
         },
         methods: {
           //触发父组件father中的事件
           passCData(val) {
             // 孙子组件中能直接触发getCData的原因在于子组件调用孙子组件时使用v-on绑定了$listeners
             this.$emit("getCData", val);
           },
         },
       };
       </script>
       ```

   - `EventBus`

   - `Vuex`传参

   - 路由传参：路由配置（eg：/:id，获取参数使用\$route）、`router.push()`、`params`、`query`

7. **Vue 为什么要引入虚拟 DOM**

   - JS 中的任意类型数据都可以作为状态，最终生成 DOM 输出到页面上显示出来，这个过程叫做渲染。而通常程序在运行中，状态会不断发生变化，每当状态变化都需要重新渲染，**若每次重新渲染都重新生成一份 DOM，会造成很大的性能浪费**
   - 虚拟 DOM 的解决方式是通过状态生成一个虚拟节点树，然后**使用虚拟节点树进行渲染**。**在渲染之前，会使用新生成的虚拟节点树和上一次生成的虚拟节点树进行对比，只渲染不同的部分**
   - vue 的**变化侦测机制非常细粒度**，它知道具体哪些状态发生了变化，由此来更新视图，省去了对比。但因为粒度太细，每一个绑定都有一个对应的 watcher 来观察状态的变化，**当状态被越来越多的节点使用时，开销就越大**
   - 因此 Vue 引入虚拟 DOM，**组件级别是一个 watch 实例**，当组件内有状态发生变化，只能通知到组件，然后组件内部通过虚拟 DOM 去进行比对与渲染。
   - 虚拟 DOM**原理是使用状态生成虚拟节点，然后使用虚拟节点渲染视图**
     - 先创建虚拟节点再渲染视图，就可将虚拟节点缓存，然后使用新创建的 vnode 和上一次渲染时缓存的 vnode 进行对比，然后**根据对比结果只更新需要更新的真实 DOM 节点，从而避免不必要的 DOM 操作**
   - **虚拟 DOM 在 vue 中主要做了**：
     - 提供与真实 DOM 节点所对应的虚拟节点 vnode
     - 将虚拟节点 vnode 与旧虚拟节点 oldVnode 进行对比，然后更新视图

8. **数据双向绑定**

   - **v-model**：表单数据的双向绑定
- 语法糖，其本质是两个操作的结合：`v-bind` 绑定一个 `value` 属性；`v-on` 指令给当前元素绑定事件。
     - 会忽略所有表单元素的 `value`、`checked`、`selected` attribute 的初始值而总是将 Vue 实例的数据作为数据来源。应该在组件的 `data` 选项中声明初始值。
     
- 在内部为不同的输入元素使用不同的 property 并抛出不同的事件
       - text 和 textarea 元素使用 `value` property 和 `input` 事件；
       - checkbox 和 radio 使用 `checked` property 和 `change` 事件；
       - select 字段将 `value` 作为 prop 并将 `change` 作为事件。
   
- **Vue 是数据双向绑定的框架(MVVM)，由三个部分组成**：
   - 数据层(Model)：应用的数据及业务逻辑，为开发者编写的业务代码
  - 视图层(View)：应用的展示效果，各类 UI 组件，由 template 和 css 组成的代码
     - 业务逻辑层(ViewModel)：框架封装的核心，它负责将数据与视图关联起来
       - 主要职责：数据变化后更新视图，视图变化后更新数据
       - 故其由两部分组成
         - 监听器（Observer）：观察数据，做到时刻清楚数据的任何变化，然后通知视图更新
         - 解析器（Compiler）：观察 UI，做到时刻清楚视图发生的一切交互，然后更新数据
  
9. **Vue 响应式原理**

   - ![image](https://user-gold-cdn.xitu.io/2019/8/16/16c986328e407929?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

   - 采用**数据劫持**结合**发布-订阅模式**的方式：-- _以下援引自深入浅出 vuejs_

     - Data 通过 Observer，使用**Object.defineProperty()**对数据进行劫持，**将 data 中的每个属性转换为 getter/setter 响应式来追踪变化**
     - 当外界**通过 Watcher 读取数据时会触发 getter 从而将 watcher 添加到依赖中**
     - 当**数据发生了变化会触发 setter，从而向 Dep 中的依赖(Watcher)发送通知**
     - **Watcher 收到通知后，会向外界发送通知**，变化通知到外界后可能会**触发视图更新**，也有可能**触发用户的某个回调函数**等
   
   - **注意**：
   
     - **`defineProperty`缺点：无法监控到数组下标的变化，导致直接通过数组下标给数组设置值，不能实时响应**
     - 因为 data 可能是多层嵌套的对象，所以深度递归劫持，设置递归出口，排除数据不存在或者不是对象的情况。但是**此处的递归只会为 data 中初始的数据进行劫持，对于新加进来的则不会**，因此在为数据添加 set 方法时，也对数据进行劫持
   
   - 实现：
   
     ```javascript
     // 追踪变化
     function defineReactive(data, key, val) {
       // 递归子属性，将data中属性转换为响应式
       if (typeof val === 'object') {
         new Observer(val);
       }
       let dep = new Dep();
       Object.defineProperty(data, key, {
         enumerable: true,
         configurable: true,
         get: function () {
           dep.depend(); // 添加依赖
           return val;
         },
         set: function (newVal) {
           if (newVal == val) {
             return;
           }
           val = newVal;
           dep.notify(); // 通知依赖
         },
       });
     }
     // 收集依赖
     export default class Dep {
       constructor() {
         this.subs = [];
       }
       addSub(sub) {
      this.subs.push(sub);
       }
       removeSub(sub) {
         remove(this.subs, sub);
       }
       depend() {
         if (window.target) {
           this.addSub(window.target);
         }
       }
       notify() {
         const subs = this.subs.slice();
         for (let i = 0; i < subs.length; i++) {
           subs[i].update();
         }
       }
     }
     function remove(arr, item) {
       if (arr.length) {
         const index = arr.indexOf(item);
         if (index > -1) {
           return arr.splice(index, 1);
         }
       }
     }
     // watcher
     export default class Watcher {
       constructor(vm, expOrFn, callback) {
         this.vm = vm;
         this.getter = parsePath(expOrFn);
         this.cb = callback;
         this.value = this.get();
       }
       get() {
         window.target = this;
         let value = this.getter.call(this.vm, this.vm);
         window.target = undefined;
         return value;
       }
       update() {
         const oldValue = this.value;
      this.value = this.get();
         this.cb.call(this.vm, this.value, oldValue);
       }
     }
     // 读取一个字符串的keypath
     const bailRE = /[^\w.$]/;
     export function parsePath(path) {
       if (bailRE.test(path)) {
         return;
       }
       const segments = path.split('.');
       return function (obj) {
         for (let i = 0; i < segments.length; i++) {
           if (!obj) return;
           obj = obj[segments[i]];
         }
         return obj;
       };
     }
     export class Observer {
       constructor(value) {
         this.value = value;
         if (!Array.isArray(value)) {
        this.walk(value);
         }
       }
       // 将数据内的所有属性都转换为getter/setter的形式来侦测变化
       // 只在数据为object时被调用
       walk(obj) {
         const keys = Object.keys(obj);
         for (let i = 0; i < keys.length; i++) {
        defineReactive(obj, keys[i], obj[keys[i]]);
         }
       }
     }
     ```
   
10. **v-if 和 v-show**

    - **v-if** 用于条件性地渲染一块内容。这块内容只会在指令的表达式返回 truethy 值的时候被渲染
      - **原理**
    - **v-show** 用于根据条件展示元素
      - 带有 v-show 的元素始终会被渲染并保留在 DOM 中。v-show 只是简单地切换元素的 CSS property display
      - 原理：
    - **v-if 和 v-show 的共同点**：都能控制元素的显示和隐藏

      - **v-if 和 v-show 的区别**
        - **v-if 是"真正"的条件渲染**，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建。动态地向 DOM 树内添加或者删除 DOM 元素，**若初始值为 `false` ，就不会编译了**，如果在初始渲染时条件为假，则什么也不做——直到**条件第一次变为真时，才会开始渲染条件块**
        - v-show：**不管初始条件是什么，元素总是会被渲染**，并且**只是简单地基于 CSS 进行切换**。**本质就是通过控制 css 中的 `display` 设置为 `none`来控制隐藏**，只会编译一次；
        - 一般来说 **v-if 有更高的切换开销，而 v-show 有更高的初始渲染开销**
        - 当**显示与隐藏切换频率高，用 v-show**，只有一次切换: v-if

11. **v-html 原理及实现**

12. **如何让 CSS 只在当前组件中起作用**

    - 在组件中的 `style` 前面加上 `scoped`

      ```html
      <style scoped>
        @media (min-width: 250px) {
          .list-container:hover {
            background: orange;
          }
        }
      </style>
      ```

      这个可选 `scoped` attribute 会自动添加一个唯一的 attribute (比如 `data-v-21e5b78`) 为组件内 CSS 指定作用域，编译的时候 `.list-container:hover` 会被编译成类似 `.list-container[data-v-21e5b78]:hover`

13. **\<keep-alive>\</keep-alive>的作用是什么**

    - `keep-alive` 是 Vue 内置的一个组件，可以使被包含的组件保留状态，或避免重新渲染

      ```html
      <!-- 失活的组件将会被缓存！-->
      <keep-alive>
        <component v-bind:is="currentTabComponent"></component>
      </keep-alive>
      ```

    - **Props**：

      - `include` - 字符串或正则表达式。只有名称匹配的组件会被缓存。

      - `exclude` - 字符串或正则表达式。任何名称匹配的组件都不会被缓存。

      - `max` - 数字。最多可以缓存多少组件实例。

        ```html
        <!-- 逗号分隔字符串 -->
        <keep-alive include="a,b">
          <component :is="view"></component>
        </keep-alive>

        <!-- 正则表达式 (使用 `v-bind`) -->
        <keep-alive :include="/a|b/">
          <component :is="view"></component>
        </keep-alive>

        <!-- 数组 (使用 `v-bind`) -->
        <keep-alive :include="['a', 'b']">
          <component :is="view"></component>
        </keep-alive>

        <keep-alive :max="10">
          <component :is="view"></component>
        </keep-alive>
        ```

    - `<keep-alive>` 不会在函数式组件中正常工作，因为它们没有缓存实例。

14. **如何获取 dom**

    - `ref = "domName"`

      `this.$refs.domName`

15. **几种 vue 当中的指令和它的用法**

    | 指令      | 描述                                                                                                                                                           |
    | --------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------- |
    | v-text    | 更新元素的 `textContent`。                                                                                                                                     |
    | v-html    | 更新元素的 `innerHTML`<br />容易导致 XSS 攻击。故只在可信内容上使用 `v-html`，**永不**用在用户提交的内容上                                                     |
    | v-show    | 根据表达式之真假值，切换元素的 `display` CSS property                                                                                                          |
    | v-if      | 根据表达式的值的 truthiness 来有条件地渲染元素。在切换时元素及它的数据绑定 / 组件被销毁并重建                                                                  |
    | v-else    | 为 `v-if` 或者 `v-else-if` 添加“else 块”                                                                                                                       |
    | v-else-if | 表示 `v-if` 的“else if 块”。可以链式调用                                                                                                                       |
    | v-for     | 基于源数据多次渲染元素或模板块                                                                                                                                 |
    | v-on      | 缩写：@<br />绑定事件监听器                                                                                                                                    |
    | v-bind    | 缩写：：<br />动态地绑定一个或多个 attribute，或一个组件 prop 到表达式                                                                                         |
    | v-model   | 在表单控件或者组件上创建双向绑定，它会根据控件类型自动选取正确的方法来更新元素                                                                                 |
    | v-slot    | 缩写：#<br />提供具名插槽或需要接收 prop 的插槽                                                                                                                |
    | v-pre     | 跳过这个元素和它的子元素的编译过程。可以用来显示原始 Mustache 标签。跳过大量没有指令的节点会加快编译                                                           |
    | v-cloak   | 这个指令保持在元素上直到关联实例结束编译。<br />和 CSS 规则如 `[v-cloak] { display: none }` 一起用时，这个指令可以隐藏未编译的 Mustache 标签直到实例准备完毕。 |
    | v-once    | 只渲染元素和组件**一次**。随后的重新渲染，元素/组件及其所有的子节点将被视为静态内容并跳过。这可以用于优化更新性能                                              |

    - v-on 监听多个方法/自定义事件

      ```javascript
      <!-- 监听多个方法：对象语法 -->
      <button v-on="{ mousedown: doThis, mouseup: doThat }"></button>
      <!-- 监听自定义事件 -->
      <my-component @my-event="handleThis"></my-component>
      ```

    - v-on 修饰符

      - `.stop` - 调用 `event.stopPropagation()`。
      - `.prevent` - 调用 `event.preventDefault()`。
      - `.capture` - 添加事件侦听器时使用 capture 模式。
      - `.self` - 只当事件是从侦听器绑定的元素本身触发时才触发回调。
      - `.{keyCode | keyAlias}` - 只当事件是从特定键触发时才触发回调。
      - `.native` - 监听组件根元素的原生事件。
      - `.once` - 只触发一次回调。
      - `.left` - 只当点击鼠标左键时触发。
      - `.right` - 只当点击鼠标右键时触发。
      - `.middle` - 只当点击鼠标中键时触发。
      - `.passive` - 以 `{ passive: true }` 模式添加侦听器

    - v-bind 修饰符

      - `.prop` - 作为一个 DOM property 绑定而不是作为 attribute 绑定。
      - `.camel` - 将 kebab-case attribute 名转换为 camelCase。
      - `.sync` 语法糖，会扩展成一个更新父组件绑定值的 `v-on` 侦听器。

    - v-model 修饰符

      - `.lazy` - 取代 `input` 监听 `change` 事件
      - `.number`- 输入字符串转为有效的数字
      - `.trim` - 输入首尾空格过滤

16. **为什么组件 data 必须是函数**

    > 为什么组件中的 data 必须是一个函数，然后 return 一个对象，而 new Vue 实例里，data 可以直接是一个对象？

    - 因为组件是用来复用的，且 JS 里对象是引用关系，如果组件中 data 是一个对象，那么这样作用域没有隔离，子组件中的 data 属性值会相互影响(等于是子组件的 data 属性都指向这个对象的内存地址了)；
    - 如果组件中 data 选项是一个函数，那么每个实例可以维护一份被返回对象的独立的拷贝，组件实例之间的 data 属性值不会互相影响；
    - new Vue 的实例，是不会被复用的，因此不存在引用对象的问题。

17. **vue-loader**

    - vue-loader 是基于 webpack 的一个 loader，解析和转换.vue 文件，提取出其中的逻辑代码 script、样式代码 style、以及 HTML 模板 template，再分别把它们交给对应的 loader 去处理，核心的作用，就是提取。

    - 特性

      - 默认支持 ES6

      - 允许对 Vue 组件的组成部分使用其它 webpack loader，比如对 `<style>` 使用 Sass 和对 `<template>` 使用 Jade

      - `.vue` 文件中允许自定义节点，然后使用自定义的 loader 进行处理

      - 把 `<style>` 和 `<template>` 中的静态资源当作模块来对待，并使用 webpack loader 进行处理

      - 对每个组件模拟出 CSS 作用域（scoped）

      - 支持开发期组件的热重载

        - 不是当你修改文件的时候简单重新加载页面。启用热重载后，当你修改 `.vue` 文件时，所有该组件的实例会被替换，**并且不需要刷新页面**。它甚至保持应用程序和被替换组件的当前状态

        - 热重载默认是开启的，除非遇到以下情况：

          - webpack 的 `target` 的值是 `node` (服务端渲染)
          - webpack 会压缩代码
          - `process.env.NODE_ENV === 'production'`
          - 可以设置 `hotReload: false` 选项来显式关闭热重载

          ```javascript
          module: {
            rules: [
              {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                  hotReload: false, // 关闭热重载
                },
              },
            ];
          }
          ```

18. **为什么使用 key**

    - 作用：**主要用在 Vue 的虚拟 DOM 算法**( `Diff`)，**在复杂的列表渲染中快速准确的找到与`newVnode`相对应的`oldVnode`，提升`diff`效率**。（相当于给每个节点一个唯一标识）

    - 如果不使用 key，Vue 会使用一种最大限度减少动态元素并且尽可能的尝试就地修改/复用相同类型元素的算法。而**使用 key 时，它会基于 key 的变化重新排列元素顺序，并且会移除 key 不存在的元素**

      - 一般设置 key 值的节点可以在 diff 中更快速地找到对应节点，提高 diff 速度

    - 有相同父元素的子元素必须有**独特的 key**。重复的 key 会造成渲染错误

      ```javascript
      // 参见Vue2源码 core/vdom/patch.js
      // 判断两个节点是否为同一节点：key是首要条件
      function sameVnode (a, b) {
          return (
              a.key === b.key && (
                  (
                      a.tag === b.tag &&
                      a.isComment === b.isComment &&
                      isDef(a.data) === isDef(b.data) &&
                      sameInputType(a, b)
                  ) || (
                      isTrue(a.isAsyncPlaceholder) &&
                      a.asyncFactory === b.asyncFactory &&
                      isUndef(b.asyncFactory.error)
                  )
              )
          )
      }

      // 对新旧vnode进行diff，然后将比对出的结果用来更新真实的DOM
      function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
          ...
          while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
              if (isUndef(oldStartVnode)) {
                  ...
              } else if (isUndef(oldEndVnode)) {
                  ...
              } else if (sameVnode(oldStartVnode, newStartVnode)) {
                  ...
              } else if (sameVnode(oldEndVnode, newEndVnode)) {
                  ...
              } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
                  ...
              } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
                  ...
              } else {
                  if (isUndef(oldKeyToIdx)) oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx)
                  idxInOld = isDef(newStartVnode.key)
                      ? oldKeyToIdx[newStartVnode.key]
                      : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx)
                  if (isUndef(idxInOld)) { // New element
                      createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx)
                  } else {
                      vnodeToMove = oldCh[idxInOld]
                      if (sameVnode(vnodeToMove, newStartVnode)) {
                          patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue, newCh, newStartIdx)
                          oldCh[idxInOld] = undefined
                          canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm)
                      } else {
                          // same key but different element. treat as new element
                          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx)
                      }
                  }
                  newStartVnode = newCh[++newStartIdx]
              }
          }
          ...
      }
      ```

    - **设置 key 值一定能提高 diff 效率吗？不一定**

      - 当 Vue.js 用 v-for 正在更新已渲染过的元素列表时，它默认用“就地复用”策略。如果数据项的顺序被改变，Vue 将不会移动 DOM 元素来匹配数据项的顺序， 而是简单复用此处每个元素，并且确保它在特定索引下显示已被渲染过的每个元素。这个默认的模式是高效的，但是只适用于不依赖子组件状态或临时 DOM 状态 (例如：表单输入值) 的列表渲染输出。
      - **建议尽可能在使用 v-for 时提供 key**，除非遍历输出的 DOM 内容非常简单，或者是刻意依赖默认行为以获取性能上的提升。
      - 总结：简单列表的渲染可以不使用`key`或者用数组的`index`作为`key`（效果等同于不带`key`），这种模式下性能最高，但是并不能准确的更新列表项的状态。一旦你需要保存列表项的状态，那么就需要用使用唯一的`key`用来准确的定位每一个列表项以及复用其自身的状态，而大部分情况下列表组件都有自己的状态。

19. **创建组件**

    - 全局注册
    - 局部注册
      - 模块系统
      - 模块系统中局部注册
        - 基础组件的自动化全局注册
        - 引入组件：在 script 的第一行用 import 引入路径；用 component 中写上组件名称，在 template 中引入组件
        - 封装 Vue 组件的过程
          - 建立组建的模板，写好样式，考虑组件基本逻辑
          - 准备好组件的数据输入，即厘清组件逻辑，定义好 props 里的数据、类型
          - 准备好组件的数据输出，即组件逻辑，做好要暴露出来的方法
          - 封装完毕可直接调用

20. **Vue Cli 项目中 src 目录每个文件夹和文件的用法**

    - `assets` 文件夹是放静态资源；
    - `components` 是放组件；
    - `router` 是定义路由相关的配置;
    - `app.vue` 是一个应用主组件；
    - `main.js` 是入口文件。

21. **computed 和 watch 的区别**

    - **`computed`计算属性**：类似于过滤器，对绑定到视图的数据进行处理，并监听变化进而执行对应的方法

      - 使用场景：**当一个属性受多个属性影响的时候**。eg：购物车商品结算的时候

      - 作用：减少模板中的计算逻辑；**计算属性的结果会被缓存**；依赖固定的数据类型

      - 注意：

        - 计算属性是**基于它们的依赖进行缓存的，只有相关的依赖发生改变时才会重新求值**。只要相关的依赖未改变，只会返回之前的结果，不会执行函数。

        - computed **依赖监控自己定义的变量，不能计算已经在 data 里面定义过的值**，该变量在 computed 里面定义，然后**可以在页面上进行数据绑定**

        - 比较适合对多个变量或者对象进行处理后返回一个结果值，也就是数多个变量中的某一个值发生了变化则我们监控的这个值也就会发生变化

      ```javascript
      <template>
          <div>
              <label>姓：<input type="text" placeholder="请输入姓氏" v-model="firstName"></label><br/>
              <label>名：<input type="text" placeholder="请输入名字" v-model="lastName"></label>
              // 可以直接绑定计算属性
              <label>姓 名：<input type="text" placeholder="请输入姓名" v-model="fullName"></label>
          </div>
      </template>

      <script>
          export default {
              name: "ComputedAndWatch",
              data(){
                  return {
                      firstName:'',
                      lastName:'',
                  }
              },
              computed:{
                  fullName:{
                      get(){
                          return this.firstName + '·' + this.lastName
                      },
                      // 实现双向绑定
                      set(value){
                        console.log(`${value}`);        // 测试：使用字符串拼接只能使用“ ` ”
                        let names = value.split('·');
                        this.firstName = names[0];
                        this.lastName = names[1];
                      }
                  }
              }
          }
      </script>
      ```

    - `watch` 侦听属性：是一个侦听的动作，用来观察和响应 Vue 实例上的数据变动

      - 使用场景：当一条数据影响多条数据的时候。eg：搜索数据
      - 作用：
        - 监控 vue 实例的变化，**监控的变量必须在 data 里面声明**才可以
        - 监控一个变量或者一个对象，但是只能监控整个对象或单个变量
        - 依赖于固定的数据类型
      - **watch 选项允许我们执行异步操作 ，限制我们执行该操作的频率，并在我们得到最终结果前，设置中间状态**。这些都是计算属性无法做到的

      - 注意：通过 vm 对象的\$watch()或 watch 配置来监视指定的属性，当属性变化时，回调函数自动调用，在函数内部进行计算。watch 不能双向的绑定值

      ```JavaScript
      <div id="watch-example">
        <p>
          Ask a yes/no question:
          <input v-model="question">
        </p>
        <p>{{ answer }}</p>
      </div>
      <script>
      var watchExampleVM = new Vue({
        el: '#watch-example',
        data: {
          question: '',
          answer: 'I cannot give you an answer until you ask a question!'
        },
        watch: {
          // 如果 `question` 发生改变，这个函数就会运行
          question: function (newQuestion, oldQuestion) {
            this.answer = 'Waiting for you to stop typing...'
            this.debouncedGetAnswer()
          }
        },
        created: function () {
          // `_.debounce` 是一个通过 Lodash 限制操作频率的函数。
          // 在这个例子中，我们希望限制访问 yesno.wtf/api 的频率
          // AJAX 请求直到用户输入完毕才会发出。想要了解更多关于
          // `_.debounce` 函数 (及其近亲 `_.throttle`) 的知识，
          // 请参考：https://lodash.com/docs#debounce
          this.debouncedGetAnswer = _.debounce(this.getAnswer, 500)
        },
        methods: {
          getAnswer: function () {
            if (this.question.indexOf('?') === -1) {
              this.answer = 'Questions usually contain a question mark. ;-)'
              return
            }
            this.answer = 'Thinking...'
            var vm = this
            axios.get('https://yesno.wtf/api')
              .then(function (response) {
                vm.answer = _.capitalize(response.data.answer)
              })
              .catch(function (error) {
                vm.answer = 'Error! Could not reach the API. ' + error
              })
          }
        }
      })
      </script>
      ```

      - **区别**
        - 相同：`computed`和`watch`**都起到监听/依赖一个数据，并进行处理的作用**
        - 不同：**computed 主要用于对同步数据的处理，watch 则主要用于观测某个值的变化去完成一段开销较大的复杂业务逻辑**。能用 computed 的时候优先用 computed，避免了多个数据影响其中某个数据时多次调用 watch 的尴尬情况。

22. **\$nextTick 的使用**

    - vm.\$nextTick([callback])
    - 当你修改了`data` 的值然后马上获取这个 `dom` 元素的值，是不能获取到更新后的值，`$nextTick`将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新。它跟全局方法 `Vue.nextTick` 一样，不同的是回调的 `this` 自动绑定到调用它的实例上

23. **渐进式框架的理解**

    - 渐进式代表的含义：没有多做职责之外的事；把框架分层
      - 视图层渲染 -> 组建机制 -> 路由机制 -> 状态管理 -> 构建工具
    - 主张最少，可以根据不同的需求选择不同的层级
    - Vue.js 只提供了 vue-cli 生态中最核心的**组件系统** 和 **双向数据绑定（也叫数据驱动）**

24. **`Vue` 的两个核心点**

    - **数据驱动（双向数据绑定）**：MVVM，保证数据和视图的一致性
    - **组件系统**：应用类 UI 可以看作全部是由组件树构成的。组件化开发可以很好地降低数据之间的耦合度。将常用的代码封装成组件之后，就能高度的复用，提高代码的可重用性。一个页面/模块可以由多个组件所组成。

25. **单页面应用和多页面应用区别及优缺点**

    - 单页面应用：只有一个主页面的应用，浏览器一开始要加载所有必须的 html, js, css。所有的页面内容都包含在这个所谓的主页面中。但在写的时候，还是会分开写（页面片段），然后在交互的时候由路由程序动态载入，单页面的页面跳转，仅刷新局部资源。多应用于 pc 端。
      - 优点：用户体验好，快，内容的改变不需要重新加载整个页面，对服务器压力较小，前后端分离，页面效果会比较炫酷
      - 缺点：不利于 SEO；导航不可用，如果一定要导航需要自行实现前进、后退（由于是单页面不能用浏览器的前进后退功能，所以需要自己建立堆栈管理）；初次加载时耗时多；页面复杂度提高很多
    - 多页面应用：一个应用中有多个页面，页面跳转时是整页刷新

26. **v-if 和 v-for 的优先级**

    - 当 `v-if` 与 `v-for` 一起使用时，**`v-for` 具有比 `v-if` 更高的优先级**，这意味着 `v-if` 将分别重复运行于每个 `v-for` 循环中。
    - 不推荐 `v-if` 和 `v-for` 同时使用。
    - 如果 `v-if` 和 `v-for` 一起用的话，vue 中会自动提示 `v-if` 应该放到外层去。

27. **assets 和 static 的区别**

    - 相同点：`assets` 和 `static` 两个都是存放静态资源文件。项目中所需要的资源文件图片，字体图标，样式文件等都可以放在这两个文件下。
    - 区别：
      - `assets` 中存放的静态资源文件在项目打包时，也就是运行 `npm run build` 时会将 `assets` 中放置的静态资源文件进行打包上传，所谓打包简单点可以理解为压缩体积，代码格式化。而压缩后的静态资源文件最终也都会放置在 `static` 文件中跟着 `index.html` 一同上传至服务器。
      - `static` 中放置的静态资源文件就不会要走打包压缩格式化等流程，而是直接进入打包好的目录，直接上传至服务器。因为避免了压缩直接进行上传，在打包时会提高一定的效率，但是 `static` 中的资源文件由于没有进行压缩等操作，所以文件的体积也就相对于 `assets` 中打包后的文件提交较大点。在服务器中就会占据更大的空间
    - 建议：将项目中 `template`需要的样式文件 js 文件等都可以放置在 `assets` 中，走打包这一流程。减少体积。而项目中引入的第三方的资源文件如`iconfoont.css` 等文件可以放置在 `static` 中，因为这些引入的第三方文件已经经过处理，我们不再需要处理，直接上传

28. **Vue 和 jQuery 的区别**

    - jQuery 是使用选择器（ `$` ）选取 DOM 对象，对其进行赋值、取值、事件绑定等操作，其实和原生的 HTML 的区别只在于可以更方便的选取和操作 DOM 对象，而数据和界面是在一起的。比如需要获取 label 标签的内容：`$("lable").val();` ,它还是依赖 DOM 元素的值。
    - Vue 则是通过 Vue 对象将数据和 View 完全分离开来了。对数据进行操作不再需要引用相应的 DOM 对象，可以说数据和 View 是分离的，他们通过 Vue 对象这个 vm 实现相互的绑定。这就是传说中的 MVVM。

29. **SPA 首屏加载慢如何解决**

    - 安装动态懒加载所需插件；使用 CDN 资源；UI 组件库按需加载；路由懒加载；开启`gzip`压缩，生成压缩文件。（视具体情况而定）

30. **`delete`、splice 和`Vue.delete`删除数组的区别**

    - `delete` 只是被删除的元素变成了 `empty/undefined` 其他的元素的键值还是不变。

    - splice 直接删除了数组，改变了数组的键值

    - `Vue.delete` 直接删除了数组 改变了数组的键值

      - 删除对象的 property。如果对象是响应式的，确保删除能触发更新视图。这个方法主要用于避开 Vue 不能检测到 property 被删除的限制，但是你应该很少会使用它。

      ```javascript
      var a = [1, 2, 3, 4];
      var b = [1, 2, 3, 4];
      delete a[1]; // a: [1, empty, 3, 4]
      b.splice(1, 1); // b: [1, 3, 4]
      var c = [1, 2, 3, 4];
      // Vue.delete( target, propertyName/index )
      this.$delete(c, 1); // c: [1, 3, 4]
      ```

31. **`vue`初始化页面闪动问题**

    - 将根结构默认设为 display: none，然后在根结构上添加属性 :style="display:'inline'"

      ```html
      <div style="display: none" :style="display: 'block'"></div>
      ```

    - 在`CSS`里加上 `[v-cloak] { display: none; }`

      ```css
      [v-cloak] {
        /*important看情况加*/
        display: none !important;
      }
      ```

    - 使用`v-text`

      ```html
      <span v-text="message"></span>
      <!-- same as -->
      <span>{{message}}</span>
      ```

32. **`Vue`更新数组时触发视图更新的方法**

    - push()；pop()；shift()；unshift()；splice()；sort()；reverse()

33. **`Vue`修改打包后静态资源修改路径**

    - CLI2：将 config/index.js 里的 `assetsPublicPath` 的值改为 `./`

      ```javascript
      build: {
        // ...
        assetsPublicPath:  ./ ,
        // ...
      }
      ```

    - CLI3：在根目录下新建 vue.config.js 文件里配置

      ```javascript
      module.exports = {
        publicPath: , // 相对于 HTML 页面（目录相同）
      }
      ```

34. `Vue slot`

36. **Vue 在 v-for 时给每项元素绑定事件需要用事件代理吗，为什么？**

37. **Vue 渲染大量数据时应该怎么优化**

38. **MVC 与 MVVM**

> 参考链接
>
> 1. https://cn.vuejs.org/v2/guide/
> 2. 《深入浅出 Vue.js》刘博文
> 3. https://www.cnblogs.com/pangwl/p/7979169.html
> 4. https://juejin.im/post/6844903812474339341
> 5. https://blog.csdn.net/xiasohuai/article/details/84788708
> 6. https://juejin.im/post/6844903917243858951
> 7. https://juejin.im/post/6844903942254510087#heading-4
> 8. https://juejin.im/post/6844903917243858951#heading-6
> 9. https://juejin.im/post/6844903956898447367
> 10. https://juejin.im/post/6844904160396050440
> 11. https://vue-loader-v14.vuejs.org/zh-cn/
> 12. https://mp.weixin.qq.com/s/_P0-uCz11hvFIwdLQ1mL-Q
> 13. https://www.cnblogs.com/Sherlock09/p/11023593.html
> 14. https://juejin.im/post/6844904080540712967#heading-1
> 15. https://juejin.im/post/6844903736356126734
> 16. https://cn.vuejs.org/v2/guide/components-props.html#header
> 17. https://juejin.im/post/6844903736356126734
> 18. https://cn.vuejs.org/v2/api/#provide-inject
> 19. https://juejin.im/post/6844903812474339341
> 20. https://juejin.im/post/6844903878538821640
> 21. https://www.jianshu.com/p/1b75a3623d0d
> 22. https://juejin.im/post/6844904113914773518
> 23. https://blog.csdn.net/michael8512/article/details/79031656
> 24. https://blog.csdn.net/qq_39009348/article/details/81977468
> 25. https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/60
