# Vue Router

1. **`Vue-router`路由管理器**

   - 功能：

     - 嵌套的路由/视图表；
     - 模块化的、基于组件的路由配置；
     - 路由参数、查询、通配符；
     - 基于 Vue.js 过渡系统的视图过渡效果；
     - 细粒度的导航控制；
     - 带有自动激活的 CSS class 的链接；
     - HTML5 历史模式或 hash 模式，在 IE9 中自动降级；
     - 自定义的滚动条行为

   - ```html
     <script src="https://unpkg.com/vue/dist/vue.js"></script>
     <script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>

     <div id="app">
       <h1>Hello App!</h1>
       <p>
         <!-- 使用 router-link 组件来导航. -->
         <!-- 通过传入 `to` 属性指定链接. -->
         <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
         <router-link to="/foo">Go to Foo</router-link>
         <router-link to="/bar">Go to Bar</router-link>
       </p>
       <!-- 路由出口 -->
       <!-- 路由匹配到的组件将渲染在这里 -->
       <router-view></router-view>
     </div>
     ```

     ```javascript
     // 0. 如果使用模块化机制编程，导入Vue和VueRouter，要调用 Vue.use(VueRouter)
     // 1. 定义 (路由) 组件。
     // 可以从其他文件 import 进来
     const Foo = { template: '<div>foo</div>' };
     const Bar = { template: '<div>bar</div>' };
     // 路由懒加载
     const Tmp = () => import('./Tmp.vue');

     // 2. 定义路由
     // 每个路由应该映射一个组件。 其中"component" 可以是通过 Vue.extend() 创建的组件构造器，
     // 或者，只是一个组件配置对象。
     const routes = [
       { path: '/foo', component: Foo },
       { path: '/bar', component: Bar },
       { path: '/tmp', component: Tmp },
     ];

     // 3. 创建 router 实例，然后传 `routes` 配置
     // 还可以传别的配置参数
     const router = new VueRouter({
       routes, // (缩写) 相当于 routes: routes
     });

     // 4. 创建和挂载根实例。
     // 记得要通过 router 配置参数注入路由，从而让整个应用都有路由功能
     const app = new Vue({
       router,
     }).$mount('#app');

     // 通过注入路由器，可以在任何组件内通过 this.$router 访问路由器，也可以通过 this.$route 访问当前路由
     // Home.vue
     export default {
       computed: {
         username() {
           return this.$route.params.username;
         },
       },
       methods: {
         goBack() {
           window.history.length > 1
             ? this.$router.go(-1)
             : this.$router.push('/');
         },
       },
     };
     ```

2. **$route 和 $router 的区别**

   - 传参是`this.$router`，接收参数是`this.$route`
   - **\$router**对象为全局`VueRouter`实例，是 router 构造方法的实例，包括了路由的跳转方法，钩子函数等，想要导航到不同 URL，则使用`$router.push`方法，会向 history 栈添加一个记录，点击后退会返回上一页面(`$router.go`)
   - **\$route**为当前`router`跳转对象，里面可以获取`name`、`path`、`query`、`params`、`hash`、`fullPath`、`matched`等

3. **路由对象属性**

   - `$route.path`：对应当前路由的路径，总是解析为绝对路径（string）

   - `$route.params`：包含了动态片段和全匹配片段，如果没有路由参数，就是一个空对象

   - `$route.query`：表示 URL 查询参数。如果没有查询参数，则是个空对象

   - `$route.hash`：当前路由的 hash 值 (带 `#`) ，如果没有 hash 值，则为空字符串

   - `$route.fullPath`：完成解析后的 URL，包含查询参数和 hash 的完整路径（string）

   - `$route.matched`：`Array<RouteRecord>`，包含当前路由的所有嵌套路径片段的**路由记录** 。路由记录就是 `routes` 配置数组中的对象副本 (还有在 `children` 数组)

   - `$route.name`：当前路由的名称，如果有的话

   - `$route.redirectedFrom`：如果存在重定向，即为重定向来源的路由的名字

   - **`params`和 `query` 的区别**：参数的存放并不以传参模式为区分，而是根据`url`来判定；

     - `$route.params`

       - 传参数/获取参数/在`url`中形式

         ```javascript
         // 定义路由信息
         const router = new VueRouter({
           routes: [
             { path: '/user/:id', component: User }, // 动态路径参数 以冒号开头
           ],
         });
         // 传参数
         this.$router.push({
           name: 'monitor', // 用 name 来引入
           params: { id: id },
         });
         // 获取参数
         this.$route.params.id;
         // 在url中形式(url中不带参数)
         // http://172.19.186.224:8080/#/monitor

         // 编程式的导航中，如果要传递params，只能提供name，不能使用path
         ```

     - `$route.query`：(如果 URL 中有查询参数)

       - 传参数/获取参数/在`url`中形式

         ```javascript
         // 传参数
         this.$router.push({
           path: '/monitor', // 用 path 来引入
           query: { id: id },
         });
         // 获取参数
         this.$route.query.id;
         // 在url中形式（url中带参数）
         // http://172.19.186.224:8080/#/monitor?id=1
         ```

     - **区别**

       - 用法上：引入方式不同，`params`由 name 引入，`query`由 path 或 name 引入，两者接收参数类似
       - 展示上：`params`类似于 ajax 中 post 请求，在浏览器地址栏中不显示参数，`query`类似于 get 请求，在浏览器地址栏中显示参数；

       - `params`、`query`不设置也可以传参，`params`不设置的时候，刷新页面或者返回，参数会丢失，而`query`不会

4. **`Vue-Router`动态路由匹配**

   - 当需要把某种模式匹配到的所有路由，全都映射到同个组件时，就可以在`vue-router` 的路由路径中使用“动态路径参数”(dynamic segment)

     ```javascript
     // eg：有一个 User 组件，对于所有 ID 各不相同的用户，都要使用这个组件来渲染
     const User = {
       // 当匹配到一个路由时，参数值会被设置到 this.$route.params，可以在每个组件内使用
       // 设置多段"路径参数"，就存储多段
       template:
         '<div>User: {{ $route.params.username }} - id: {{$route.params.id}}</div>',
     };
     const router = new VueRouter({
       routes: [
         // 动态路径参数 以冒号开头
         { path: '/user/:username/post/:id', component: User },
       ],
     });
     ```

   - 响应路由参数的变化

     - 当使用路由参数时，原来的组件实例会被复用。这也意味着组件的生命周期钩子不会再被调用

     - ```javascript
       const User = {
         template: '...',
         // 复用组件时，想对路由参数的变化作出响应，可简单地 watch (监测变化) $route 对象
         watch: {
           $route(to, from) {
             // 对路由变化作出响应...
           }
         }
         // 或者使用导航守卫
         beforeRouteUpdate (to, from, next) {
           // ...
         }
       }
       ```

   - 捕获所有路由或 404 Not Found 路由

     - 匹配任意路径：`*`；含有*通配符*的路由应该放在最后。当使用一个通配符，`$route.params`内会自动添加一个名为`pathMatch`参数。它包含了 URL 通过*通配符*被匹配的部分

       ```javascript
       // 给出一个路由 { path: '/user-*' }
       this.$router.push('/user-admin');
       this.$route.params.pathMatch; // 'admin'
       // 给出一个路由 { path: '*' }
       this.$router.push('/non-existing');
       this.$route.params.pathMatch; // '/non-existing'
       ```

   - 匹配优先级：按照路由的定义顺序：谁先定义的，谁的优先级就最高

5. **嵌套路由**

   ```javascript
   const User = {
     template: `
       <div class="user">
         <h2>User {{ $route.params.id }}</h2>
         <router-view></router-view>
       </div>
     `,
   };

   const router = new VueRouter({
     routes: [
       {
         path: '/user/:id',
         name: 'user', // 命名路由
         component: User,
         children: [
           {
             // 当 /user/:id/profile 匹配成功，UserProfile 会被渲染在 User 的 <router-view> 中
             path: 'profile',
             component: UserProfile,
           },
           {
             // 当 /user/:id/posts 匹配成功，UserPosts 会被渲染在 User 的 <router-view> 中
             path: 'posts',
             component: UserPosts,
           },
         ],
       },
     ],
   });
   ```

   - 嵌套路由的 children 里可以继续嵌套路由

6. **编程式的导航**

   - `router.push(location, onComplete?, onAbort?)`

     - | 声明式                    | 编程式             |
       | ------------------------- | ------------------ |
       | `<router-link :to="...">` | `router.push(...)` |

     - 在`Vue`实例内部，可以通过 \$router 访问路由实例。这个方法会向 history 栈添加一个新的记录，所以，当用户点击浏览器后退按钮时，则回到之前的 URL

       ```javascript
       // 字符串
       router.push('home');
       // 对象
       router.push({ path: 'home' });
       // 命名的路由
       router.push({ name: 'user', params: { userId: '123' } });
       // 带查询参数，变成 /register?plan=private
       router.push({ path: 'register', query: { plan: 'private' } });
       // 若提供了path，则 params 会被忽略 (query不属于这种情况)
       router.push({ path: '/user', params: { userId } }); // -> /user
       ```

   - `router.replace(location, onComplete?, onAbort?)`

     - | 声明式                            | 编程式                |
       | --------------------------------- | --------------------- |
       | `<router-link :to="..." replace>` | `router.replace(...)` |

     - 与`router.push`很像，但不会向 history 添加新纪录

   - `router.go(n)`：在 history 记录中向前或者后退多少步，类似 `window.history.go(n)`

   - **`Vue-router` 跳转和 `location.href` 的区别**

     - 使用 `location.href= /url `来跳转，简单方便，但是刷新了页面；使用 `history.pushState( /url )` ，无刷新页面，静态跳转
     - 引进 router ，然后使用 `router.push( /url )` 来跳转，使用了 `diff` 算法，实现了按需加载，减少了 `DOM` 的消耗
     - 使用 router 跳转和使用 `history.pushState()` 没什么差别，因为`Vue-router`就是用了 `history.pushState()` ，尤其是在 history 模式下

7. **命名视图**

   - 用于同级展示多个视图，而不是嵌套展示

     ```javascript
     <router-view class="view one"></router-view>
     <router-view class="view two" name="a"></router-view>
     <router-view class="view three" name="b"></router-view>

     const router = new VueRouter({
       routes: [
         {
           path: '/',
           components: {
             default: Foo,
             a: Bar,
             b: Baz
           }
         }
       ]
     })
     ```

     - 某些复杂布局可使用嵌套命名视图

8. **重定向和别名**

   - 重定向：当用户访问 `/a`时，URL 将会被替换成 `/b`，然后匹配路由为 `/b`

     ```javascript
     const router = new VueRouter({
       routes: [
         // 从 /a 重定向到 /b
         { path: '/a', redirect: '/b' },
         // 重定向的目标也可以是一个命名的路由
         { path: '/a', redirect: { name: 'foo' } },
         // 甚至是一个方法，动态返回重定向目标
         {
           path: '/a',
           redirect: (tp) => {
             // 方法接收 目标路由 作为参数
             // return 重定向的 字符串路径/路径对象
           },
         },
       ],
     });
     ```

   - 别名：`/a` 的别名是 `/b`，意味着，当用户访问 `/b` 时，URL 会保持为 `/b`，但是路由匹配则为 `/a`，就像用户访问 `/a` 一样

     ```javascript
     const router = new VueRouter({
       routes: [{ path: '/a', component: A, alias: '/b' }],
     });
     ```

9. **路由组件传参**

   - 在组件中使用`$route`会使之与其对应路径形成高度耦合，从而使组件只能在某些特定的 URL 上使用，限制了其灵活性，可以使用 props 将组件和路由解耦

     ```javascript
     const User = {
       props: ['id'],
       template: '<div>User {{ id }}</div>',
     };
     const router = new VueRouter({
       routes: [
         { path: '/user/:id', component: User, props: true },
         // 对于包含命名视图的路由，你必须分别为每个命名视图添加 `props` 选项：
         {
           path: '/user/:id',
           components: { default: User, sidebar: Sidebar },
           props: { default: true, sidebar: false },
         },
       ],
     });

     // 布尔模式
     // 如果 props 被设置为 true，route.params 将会被设置为组件属性
     const router = new VueRouter({
       routes: [
         {
           path: '/profile/:mine',
           component: profile,
           props: true,
         },
       ],
     });

     // 对象模式
     // 如果 props 是一个对象，它会被按原样设置为组件属性。当 props 是静态的时候有用
     const router = new VueRouter({
       routes: [
         {
           path: '/promotion/from-newsletter',
           component: Promotion,
           props: { newsletterPopup: false },
         },
       ],
     });

     // 函数模式
     // 可在组件的props数组拿到该函数的返回对象，从而获取参数
     const router = new VueRouter({
       routes: [
         {
           path: '/search',
           component: SearchUser,
           // 尽可能保持 props 函数为无状态的，因为它只会在路由发生变化时起作用
           props: (route) => ({ query: route.query.q }),
         },
       ],
     });
     ```

   - 路由传参案例

     ```javascript
     // router.js
     import Vue from 'vue'
     import Router from 'vue-router'
     import componentsA from './components/componentsA'

     //在components下创建componentsA.vue
     import componentsB from './components/componentsB'
     //在components下创建componentsB.vue
     Vue.use(Router)
     export default new Router({
       routes:[
         { path:'/componentsA',
         name:'componentsA',
         component:componentsA },
         {
           path:'/componentsB/:name/:age/:sex', name:'componentsB',
           component:componentsB
         }
       ]
     })
     // 1.1 路由配置传参
     // componentsA.vue
     // 在componentsA.vue页面通过this.$router.push配置与之对应的参数
     <template>
       <div>
         <div>我是组件A</div>
         <button @click="routerToB1">方式一跳转到组件B</button>
         <!-- params传参-->
         <button @click="routerToB2">方式二跳转到组件B</button>
         <!-- query传参-->
         <button @click="routerToB3">方式三跳转到组件B</button>
       </div>
     </template>
     <script>
     export default {
       data() {
         return {
           person: { name: 'Gene', age: '18', sex: 'male' },
         };
       },
       methods: {
         routerToB1() {
           this.$router.push({
             path: `componentsB/${this.person.name}/${this.person.age}/${this.person.sex}`,
           });
         },
         // 1.2 params传参
         routerToB2() {
           S;
           this.$router.push({
             name: 'componentsB',
             params: {
               exa: '我是传到组件B的参数',
             },
           });
         },
         // 1.3 query传参
         routerToB3() {
           this.$router.push({
             name: 'componentsB', // path:'/componentsB'
             query: {
               que: '我是通过query传到组件B的参数',
             },
           });
         },
       },
     };
     </script>

     // componentsB.vue
     // 在 componentsB.vue 页面用 this.$route.params 接收参数
     <template>
       <div>
         <div>我是组件B</div>
       </div>
     </template>
     <script>
     export default {
       created() {
         this.getRouterData();
       },
       methods: {
         getRouterData() {
           const param = this.$route.params; // 通过params传到组件B的参数
           console.log(param); //{name:'Gene',age:'18',sex:'male'}
           const query = this.$route.query;
           console.log(query); //{que: "我是通过query传到组件B的参数"}
         },
       },
     };
     </script>

     // 作者：dongfangyiyu // 链接：https://juejin.im/post/6844903812474339341
     ```

10. **`Vue-Router`的两种模式**

    - 前端路由的核心，就在于 —— 改变视图的同时不会向后端发出请求

    - hash 模式（默认）：通过改变锚点(#)来更新页面 URL

      - ![image](https://segmentfault.com/img/remote/1460000021324752/view)

      - 特点：

        - 所有的页面跳转都是客户端进行操作，因此对于页面拦截更加灵活

        - 改变 URL 不会触发页面重新加载，不会向服务器发送 http 请求，所以不利于 SEO 优化
          - 仅 hash 符号之前的内容会被包含在请求中，因此对于后端来说，即使没有做到对路由的全覆盖，也不会返回 404 错误
        - 设置新的 URL 只能修改#后面的部分，因此只能跳转与当前 URL 同文档的 URL
        - 设置的新值必须与原来不一样才会触发动作将记录添加到栈中
        - 只能通过字符串改变 URL
        - 可以通过`window.onhashchange`(hash 模式的原理) 监听到 hash 的改变，会记录在`window.hisotry`中，借此实现无刷新跳转

    - history 模式：利用 `history.pushState` API 来实现页面的无刷新跳转。

      - ![image](https://segmentfault.com/img/remote/1460000021324754/view)

      - 特点：

        - 通过`pushState()`、`replaceState()`实现无刷新跳转的功能，这种方式 URL 的改变属于 http 请求，会重新请求服务器

        - 设置新的 URL 可以是与当前 URL 同源的任意 URL，也可以与当前 URL 一样，但这样会把重复的一次操作记录到栈中
        - 通过参数`stateObject`可以添加任意类型的数据到记录中
        - 可额外设置 title 属性供后续使用

      - ```javascript
        const router = new VueRouter({
          mode: 'history',
          routes: [...]
        })
        // URL实例：http://yoursite.com/user/id

        // 使用history模式时，前端的 URL 必须和实际向后端发起请求的 URL 一致
        // 如 http://www.abc.com/book/id 如果后端缺少对 /book/id 的路由处理，就会出现404的尴尬场景
        // 因此需要服务端允许地址可访问
        // 后台配置：在服务端增加一个覆盖所有情况的候选资源：如果 URL 匹配不到任何静态资源，则将不存在的路径请求重定向到入口文件index.html
        ```

11. **导航守卫：`Vue-Router`中的几种导航钩子**

    - 主要用来通过跳转或取消的方式守卫导航。有多种机会植入路由导航过程中：全局的, 单个路由独享的, 或者组件级的。**参数或查询的改变并不会触发进入/离开的导航守卫**

    - 全局守卫

      - 全局前置守卫：`router.beforeEach`：跳转前进行判断拦截

        ```javascript
        const router = new VueRouter({ ... });
        // to: Route：即将要进入的目标路由对象
        // from: Route: 当前导航正要离开的路由
        // next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数
        // 通过next控制能否进入目标路由
        router.beforeEach((to, from, next) => {
          // ...
        })
        // next()：进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed (确认的)

        // next(false)：中断当前的导航。
        // 若浏览器的 URL 改变了 (可能是用户手动/浏览器后退按钮)，URL 地址会重置到 from 路由对应的地址

        // next('/') 或者 next({path: '/'})：跳转到一个不同的地址。
        // 当前的导航被中断，然后进行一个新的导航，可以向 next 传递任意位置对象，
        // 且允许设置诸如 replace: true、name: 'home' 之类的选项
        // 以及任何用在 router-link 的 to prop 或 router.push 中的选项

        // next(error)：如果传入 next 的参数是一个 Error 实例，则导航会被终止且该错误会被传递给 router.onError() 注册过的回调

        // 确保 next 函数在任何给定的导航守卫中都被严格调用一次。
        // 它可以出现多于一次，但是只能在所有的逻辑路径都不重叠的情况下，否则钩子永远都不会被解析或报错。
        ```

      - 全局解析守卫：`router.beforeResolve`

        - 与`router.beforeEach`相似，区别：在导航被确认之前，**同时在所有组件内守卫和异步路由组件被解析之后**，解析守卫就被调用

      - 全局后置钩子：`router.afterEach`

        ```javascript
        // 不会接受 next 函数也不会改变导航本身
        router.afterEach((to, from) => {
          // ...
        });
        ```

    - 路由独享的守卫：`beforeEnter`

      ```javascript
      const router = new VueRouter({
        routes: [
          {
            path: '/foo',
            component: Foo,
            beforeEnter: (to, from, next) => {
              // ...
            },
          },
        ],
      });
      ```

    - 组件内的守卫

      - `beforeRouteEnter`、`beforeRouteUpdate`、`beforeRouteLeave`

      ```javascript
      const Foo = {
        template: `...`,
        beforeRouteEnter(to, from, next) {
          // 在渲染该组件的对应路由被 confirm 前调用
          // 不！能！获取组件实例 this , 因为守卫在导航确认前被调用，即将登场的新组件还没被创建

          // 但可以通过传一个回调给next来访问组件实例
          // 在导航被确认的时候执行回调，并且把组件实例作为回调方法的参数
          // beforeRouteEnter 是支持给 next 传递回调的唯一守卫
          next((vm) => {
            // 通过 `vm` 访问组件实例
          });
        },
        beforeRouteUpdate(to, from, next) {
          // 在当前路由改变，但是该组件被复用时调用
          // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
          // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
          // 可以访问组件实例 this
        },
        // 通常用来禁止用户在还未保存修改前突然离开
        beforeRouteLeave(to, from, next) {
          // 导航离开该组件的对应路由时调用
          // 可以访问组件实例 this
          // 可以通过next(false)来取消
          const answer = window.comfirm('do you really wanna leave?');
          if (answer) {
            next();
          } else {
            next(false);
          }
        },
      };
      ```

    - 导航解析流程

      - 导航被触发
      - 在失活的组件里调用 `beforeRouteLeave` 守卫
      - 调用全局的 `beforeEach` 守卫
      - 在重用的组件里调用 `beforeRouteUpdate` 守卫
      - 在路由配置里调用 `beforeEnter`
      - 解析异步路由组件
      - 在被激活的组件里调用 `beforeRouteEnter`
      - 调用全局的 `beforeResolve`
      - 导航被确认
      - 调用全局的 `afterEach` 钩子
      - 触发 DOM 更新
      - 调用 `beforeRouteEnter` 守卫中传给 `next` 的回调函数，创建好的组件实例会作为回调函数的参数传入

12. **路由元信息**

    - 定义路由时可以配置`meta`字段

      ```javascript
      const router = new VueRouter({
        routes: [
          {
            path: '/foo',
            component: Foo,
            children: [
              {
                path: 'bar',
                component: Bar,
                meta: { requiresAuth: true },
              },
            ],
          },
        ],
      });

      // 一个路由匹配到的所有路由记录会暴露为$route对象(还有在导航守卫中的路由对象)的 $route.matched 数组
      // 因此，我们可以遍历 $route.matched 来检查路由记录中的 meta 字段
      router.beforeEach((to, from, next) => {
        if (to.matched.some((record) => record.meta.requiresAuth)) {
          // this route requires auth, check if logged in
          // if not, redirect to login page.
          if (!auth.loggedIn()) {
            next({
              path: '/login',
              query: { redirect: to.fullPath },
            });
          } else {
            next();
          }
        } else {
          next(); // 确保一定要调用 next()
        }
      });
      ```

13. **过渡动效**

    - `<router-view>` 是基本的动态组件，所以我们可以用 `<transition>` 组件给它添加一些过渡效果

      ```html
      <!-- 给所有路由设置一样的过渡效果 -->
      <transition>
        <router-view></router-view>
      </transition>
      ```

    - 单个路由的过渡：让每个路由组件有各自的过渡效果

      ```javascript
      // 让每个路由组件有各自的过渡效果
      const Foo = {
        template: `
          <transition name="slide">
            <div class="foo">...</div>
          </transition>
        `,
      };

      const Bar = {
        template: `
          <transition name="fade">
            <div class="bar">...</div>
          </transition>
        `,
      };
      ```

    - 基于路由的动态过渡：基于当前路由与目标路由的变化关系，动态设置过渡效果

      ```html
      <!-- 使用动态的 transition name -->
      <transition :name="transitionName">
        <router-view></router-view>
      </transition>
      ```

      ```javascript
      // 接着在父组件内
      // watch $route 决定使用哪种过渡
      watch: {
        '$route' (to, from) {
          const toDepth = to.path.split('/').length
          const fromDepth = from.path.split('/').length
          this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
        }
      }
      ```

14. **数据获取**

    - **导航完成之后获取**：

      - 先完成导航和渲染组件，然后在组件的 `created` 钩子中获取数据。这让我们有机会在数据获取期间展示一个 loading 状态，还可以在不同视图间展示不同的 loading 状态。

      - eg：

        ```html
        <template>
          <div class="post">
            <div v-if="loading" class="loading">Loading...</div>

            <div v-if="error" class="error">{{ error }}</div>

            <div v-if="post" class="content">
              <h2>{{ post.title }}</h2>
              <p>{{ post.body }}</p>
            </div>
          </div>
        </template>
        ```

        ```javascript
        export default {
          data() {
            return {
              loading: false,
              post: null,
              error: null,
            };
          },
          created() {
            // 组件创建完后获取数据，
            // 此时 data 已经被 observed 了
            this.fetchData();
          },
          watch: {
            // 如果路由有变化，会再次执行该方法
            $route: 'fetchData',
          },
          methods: {
            fetchData() {
              this.error = this.post = null;
              this.loading = true;
              // replace getPost with your data fetching util / API wrapper
              getPost(this.$route.params.id, (err, post) => {
                this.loading = false;
                if (err) {
                  this.error = err.toString();
                } else {
                  this.post = post;
                }
              });
            },
          },
        };
        ```

    - **导航完成之前获取**：

      - 导航完成前，在路由进入的守卫中获取数据，在数据获取成功后执行导航。

      - eg：

        ```javascript
        export default {
          data() {
            return {
              post: null,
              error: null,
            };
          },
          beforeRouteEnter(to, from, next) {
            getPost(to.params.id, (err, post) => {
              next((vm) => vm.setData(err, post));
            });
          },
          // 路由改变前，组件就已经渲染完了
          beforeRouteUpdate(to, from, next) {
            this.post = null;
            getPost(to.params.id, (err, post) => {
              this.setData(err, post);
              next();
            });
          },
          methods: {
            setData(err, post) {
              if (err) {
                this.error = err.toString();
              } else {
                this.post = post;
              }
            },
          },
        };
        ```

15. **滚动行为**

    - 切换到新路由时，控制页面滚动行为，可以滚到页面顶部，也可以保持原位。**只在支持`history.pushState`的浏览器中可用**。

      ```javascript
      const router = new Router({
        routes: [...],
        scrollBehavior (to, from, savedPosition) {
          // return 期望滚动到哪个的位置
          // 如果返回一个 falsy 值，或者是一个空对象，那么不会发生滚动
          // 对于所有路由导航，简单地让页面滚动到顶部
          // return {x: 0, y: 0};

          // 返回savedPosition
          if (savedPosition) {
            return savedPosition;
          } else {
            return { x: 0, y: 0 };
          }

          // 模拟"滚动到锚点"的行为
          // if (to.hash) {
          //   return {
          //     selector: to.hash;
          // }
          }
        }
      })
      ```

    - 异步滚动：返回一个 Promise 来得出预期的位置描述

      ```javascript
      scrollBehavior (to, from, savedPosition) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve({ x: 0, y: 0 })
          }, 500)
        })
      }
      ```

16. **`Vue-Router`实现路由懒加载**

    - 即把不同路由对应的组件分割成不同的代码块，然后当路由访问的时候才加载对应组件（按需加载）

    - **异步加载**：使用 require

      ```javascript
      // vue-router配置路由，使用vue的异步组件技术，可以实现按需加载
      // 这种情况下一个组件生成一个js文件
      const routers = [
        {
          path: '/',
          name: 'index',
          component: (resolve) => require(['./views/index.vue'], resolve),
        },
      ];
      ```

    - **路由懒加载**：使用 import

      ```javascript
      const Foo = () => import('./Foo.vue');
      // 路由配置中使用Foo
      const router = new VueRouter({
        routes: [{ path: '/foo', component: Foo }],
      });
      ```

    - **`webpack`特有的`require.ensure()`**

      ```javascript
      const routers = [
        {
          path: '/home',
          name: 'home',
          component: (r) =>
            require.ensure([], () => r(require('@/components/home')), 'demo'),
        },
        {
          path: '/index',
          name: 'Index',
          component: (r) =>
            require.ensure([], () => r(require('@/components/index')), 'demo'),
        },
        {
          path: '/about',
          name: 'about',
          component: (r) =>
            require.ensure(
              [],
              () => r(require('@/components/about')),
              'demo-01'
            ),
        },
      ];
      ```

    - **组件按组分块**

      - 把某个路由下的所有组件都打包在同个异步块 (chunk) 中：多个路由指定相同的`chunkName`，会合并打包成一个`js`文件

        ```javascript
        const Foo = () =>
          import(/* webpackChunkName: "group-foo" */ './Foo.vue');
        const Bar = () =>
          import(/* webpackChunkName: "group-foo" */ './Bar.vue');
        const Baz = () =>
          import(/* webpackChunkName: "group-foo" */ './Baz.vue');
        ```

17. **`vue-router`有哪些组件**

    - **\<router-link>**

      - 支持用户在具有路由功能的应用中 (点击) 导航。 通过 `to` 属性指定目标地址，默认渲染成带有正确链接的 `<a>` 标签，可以通过配置 `tag` 属性生成别的标签.。

      - 当目标路由成功激活时，链接元素自动设置一个表示激活的 CSS 类名。

      - `<router-link>` 比起写死的 `<a href="...">` 会好一些

        - 无论是 HTML5 history 模式还是 hash 模式，它的表现行为一致
        - 在 HTML5 history 模式下，`router-link` 会守卫点击事件，让浏览器不再重新加载页面
        - 当你在 HTML5 history 模式下使用 `base` 选项之后，所有的 `to` 属性都不需要写 (基路径) 了

      - **`<router-link>`的`Props`**

        ```html
        <!-- to：表示目标路由的链接; 类型: string | Location -->
        <router-link :to="{ path: 'home' }">Home</router-link>
        <!-- 渲染结果 -->
        <a href="home">Home</a>

        <!-- replace 类型: boolean-->
        <!-- 设置后，当点击时会调用 router.replace()，导航后不会留下history记录 -->
        <router-link :to="{ path: '/abc'}" replace></router-link>

        <!-- append 类型: boolean-->
        <!-- 设置后，则在当前（相对）路径前添加基路径 -->
        <!-- eg: 从 /a 导航到一个相对路径 b，结果为 /a/b -->
        <router-link :to="{ path: 'relative/path'}" append></router-link>

        <!-- tag：指定<router-link> 渲染成何种标签；同样它还是会监听点击，触发导航-->
        <router-link to="/foo" tag="li">foo</router-link>
        <!-- 渲染结果 -->
        <li>foo</li>

        <!-- active class：设置链接激活时使用的 CSS 类名。默认值: "router-link-active"-->

        <!-- exact：想要链接使用“精确匹配模式” -->
        <!-- 这个链接只会在地址为 / 的时候被激活 -->
        <router-link to="/" exact></router-link>

        <!-- event： 声明可以用来触发导航的事件；类型: string | Array<string>-->

        <!-- exact-active-class： 配置当链接被精确匹配的时候应该激活的 class；默认值: "router-link-exact-active"-->

        <!-- aria-current-value： 当链接根据精确匹配规则激活时配置的 aria-current 的值-->
        <!-- 类型: 'page' | 'step' | 'location' | 'date' | 'time'; 默认值: "page" -->
        ```

    - **\<router-view>**

      - 是一个 functional 组件，渲染路径匹配到的视图组件。还可以内嵌自己的 `<router-view>`，根据嵌套路径，渲染嵌套组件。
      - `Props`：name（命名视图）

18. **`Vue`里面 router-link 在电脑上有用，在安卓上没反应怎么解决**

    - `Vue`路由在 Android 机上有问题，babel 问题，安装 babel polypill 插件解决

19. **Vue2 中注册在 router-link 上事件无效解决方法**

    - 使用 `@click.native` 。原因：router-link 会阻止 click 事件，.native 指直接监听一个原生事件。

20. **`RouterLink`在 IE 和 Firefox 中不起作用（路由不跳转）的问题**

    - 方法一：只用 a 标签，不适用 button 标签；
    - 方法二：使用 button 标签和`Router.navigate`方法

> 参考链接
>
> 1. https://router.vuejs.org/zh/
> 2. https://www.jb51.net/article/164718.htm
> 3. https://segmentfault.com/a/1190000021324749
> 4. https://blog.csdn.net/fifteen718/article/details/82529433
> 5. https://blog.csdn.net/yexudengzhidao/article/details/87689960
> 6. https://juejin.im/post/6844904151206330375
> 7. https://www.cnblogs.com/lulianlian/p/7682790.html
> 8. https://www.cnblogs.com/happybread/p/10156869.html
