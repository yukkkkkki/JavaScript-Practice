# 浏览器

1. **跨标签页通讯**

   本质原理就是去运用一些可以 共享的中间介质

   - 通过父页面 window.open()和子页面 postMessage
   - 设置同域下共享的 localStorage 与监听 window.onstorage
     - 父标签页使用 localStorage.setItem(key,value)添加（修改、删除）内容
     - 子标签页监听 storage 事件
   - 设置共享 cookie 与不断轮询检查(setInterval)
   - 借助服务端或者中间层实现

2. **从输入 URL 到展示的过程**

   - 浏览器根据请求的 URL 交给 DNS 域名解析，找到真实 IP

   - 客户端与服务端 TCP 三次握手建立连接

   - 向服务器发起 HTTP 请求，分析 url，设置请求报文(头，主体)

   - 服务器交给后台处理完成后返回数据，浏览器接收文件（HTML、JS、CSS、图象等）

   - 浏览器对加载到的资源（HTML、JS、CSS 等）进行语法解析，建立相应的内部数据结构

     - 浏览器的渲染过程

       ![image](https://user-gold-cdn.xitu.io/2018/12/10/16798b8db54caa31?imageView2/0/w/1280/h/960/ignore-error/1)

     - HTML parser --> DOM Tree

     - CSS parser --> Style Tree(样式树)

       - 会阻塞渲染
       - 注：是一个**十分消耗性能**的过程，所以应尽量保证层级扁平，减少过度层叠，**越是具体的 CSS 选择器，执行速度越慢**

     - attachment --> Render Tree(渲染树)

     - layout: 布局

     - GPU painting: 像素绘制页面

     - 载入解析到的资源文件，渲染页面

     - 注：

       - **当 HTML 解析到 script 标签时，会暂停构建 DOM**，完成后才会从暂停的地方重新开始。
         - 想首屏渲染得越快，就越不应该在首屏就加载 JS 文件
       - CSS 也会影响 JS 的执行，只有当解析完样式表才会执行 JS，所以也可以认为这种情况下，CSS 也会暂停构建 DOM

   - 当数据传送完毕，发起 TCP 四次挥手断开连接。

3. **存储(localStorage、sessionStorage、cookie)**

   - 前端存储的好处

     - 方便网页的加载，避免了在发送请求收到响应前页面的空白期
     - 也可以在非强制性要求实时最新数据时减少向服务端的请求，加快渲染速度
     - 在网络不佳或无网络时仍有离线数据可以查看

   - Cookie

     - ![image](https://user-gold-cdn.xitu.io/2017/10/2/07ecb36c4820a66de90013f303cac8c0?imageView2/0/w/1280/h/960/ignore-error/1)

     - 作用：与服务器进行交互，作为 HTTP 规范的一部分而存在。(而 Web Storage 仅仅是为了在本地“存储”数据而生。)

     - cookie 的属性

       - name：cookie 的名字
       - value：cookie 的值
       - domain：指域名
       - maxAge：Cookie 失效的时间
         - 正数，则超过 maxAge 秒之后失效
         - 负数，该 Cookie 为临时 Cookie，关闭浏览器即失效，浏览器也不会以任何形式保存该 Cookie
         - 为 0，表示删除该 Cookie
       - path：默认是'/'，匹配的是 web 的路由
       - secure：设置为 true 时，此 cookie 只会在 https 和 ssl 等安全协议下传输
       - version：该 Cookie 使用的版本号
         - 0 表示遵循 Netscape 的 Cookie 规范，目前大多数用的都是这种规范
         - 1 表示遵循 W3C 的 RFC2109 规范；规范过于严格，实施起来很难
       - HttpOnly：设置为 true，就不能通过 js 脚本来获取 cookie 的值，能有效的防止 xss 攻击
       - js 操作 cookie：document.cookie

     - 特点：

       - 限制大小，约 4k 左右
       - 不可跨域名 不同域名之间不可访问各自 cookie
       - 可以控制过期时间，不会永久有效，有一定的安全保障，若没有设定，则是 session 级别的。
         - `document.cookie = 'expires=时间/max-age=秒'`
         - cookie 的 session 是在未关闭浏览器的情况下，所有的 tab 级别的页面或新开，或刷新，均属于一个 session
       - 在 HTTP 请求中的 Cookie 是明文传递的，请求头上的数据容易被拦截攻击，所以安全性成问题，除非用 HTTPS

     - 主要应用
       - 会话状态管理（如用户登录状态、购物车、游戏分数或其它需要记录的信息）
       - 个性化设置（如用户自定义设置、主题等）
       - 浏览器行为跟踪（如跟踪分析用户行为等）

   - session

     - 是在服务端保存的一个数据结构，用来跟踪用户的状态，这个数据可以保存在集群、数据库、文件中；
     - session 中保存的是对象
     - session 不能区分路径
     - session 的运行依赖 session id，而 session id 是存在 cookie 中的

   - Web Storage

     - 实例方法

       - clear 删除所有值
       - getItem(name) 根据传入的键来获取对应的值
       - key(index) 获得所对应索引的键，名称
       - removeItem(name) 删除键对应的键值对
       - setItem(name, value) 为指定的 name 设置一个对应的值

     - **sessionStorage**

       - 用于本地存储一个会话(session)中的数据，这些数据只有在同一个会话中的页面才能访问并且当会话结束后数据也随之销毁，体积限制为 4~5M
       - 同源策略：不同于 Cookie，sessionStorage 访问限制更高，只有当前设定了 sessionStorage 的域下才能访问
       - **单标签页**：两个相同域下的不同标签页不能互通
       - 在关闭标签页或者新开的标签页下都不能访问之前写下的 sessionStorage
       - 刷新标签页依然可以访问 sessionStorage

       - 使用场景

         - 主要针对会话级的小数据的存储。
         - 存储一些在当前页面刷新仍然需要存储，但是关闭后不需要留下的信息
         - 很适合单页应用的使用，可以用来存储登录态信息等

     - **localStorage**

       - 长久储存，除非主动删除数据，否则数据是永远不会过期的，大小一般限定为 4M 左右

       - 同源策略：和 sessionStorage 一样，要访问同一个 localStorage 页面必须来自同一个域名，同种协议，同种端口

         - 不能跨域，但可以使用 postMessage 和 iframe 消除这个影响

       - **跨标签页**：localStorage 设定后，刷新或者重新打开标签页，关闭浏览器重新打开原来的标签页也可以访问到

       - 如果有一些数据，服务器难以承载其压力，但又要与用户的信息绑定的话，可以使用 localStorage 存储一些状态，这样即能缓解服务端压力，也可以存储用户的数据

     - Storage 事件

       - 对 Storage 对象进行任何的操作，都会在文档上触发 Storage 事件， 这个事件的 event 对象有以下属性
         - domain：发生变化的存储空间的域名
         - key：设置或删除的键名
         - newValue：如果是设置值，则是新值。如果是删除键，则为 null
         - oldValue：键被更改之前的值

   - 数据库级别

     - indexeddb：类似 NoSQL，直接使用 js 的方法操作数据

     - Web SQL：类似关系型数据库， 它使用 sql 语句进行相关操作

     - 特点
       - 访问：indexDB 和 Web SQL 和 Web Storage 一样，均是只能在创建数据库的域名下才能访问
       - 存储时间：存储时间为永久，除非用户清除数据，他可用作长期的存储
       - 大小限制：二者其实没有强制限制。只是 indexDB 在数据超过 50 M 之后会从浏览器弹出一个框让你确认
       - 性能：indexDB 查询速度会相对较慢，而 Web SQL 的性能相对较快

4. **重绘和回流**

   - 重绘(Repaint)：当节点需要更改外观、风格等而不会影响布局

     - 比如：改变 color、background-color、visibility 等

   - 回流(Reflow)：布局或者几何属性需要改变

     - 页面首次渲染、浏览器窗口大小发生改变、元素尺寸或位置发生改变、元素内容变化（文字数量或图片大小等等）、元素字体大小变化、添加或者删除可见的 DOM 元素、**激活 CSS 伪类**、查询某些属性或调用某些方法

     - 一些常用且会导致回流的属性和方法
       - clientWidth、clientHeight、clientTop、clientLeft
       - offsetWidth、offsetHeight、offsetTop、offsetLeft
       - scrollWidth、scrollHeight、scrollTop、scrollLeft
       - scrollIntoView()、scrollIntoViewIfNeeded()
       - getComputedStyle()
       - getBoundingClientRect()
       - scrollTo()

   - 注意：

     - 回流必定重绘，重绘不一定回流。
     - 回流所需的成本比重绘高得多，改变深层次的节点很可能导致父节点的一系列回流

   - 重绘和回流与 Event loop 的关系

     1. 当 Event loop 执行完 Microtasks 后，会判断 document 是否需要更新。因为浏览器是 60Hz 的刷新率，每 16ms 才会更新一次
     2. 然后判断是否有 resize 或者 scroll ，有的话会去触发事件，所以 resize 和 scroll 事件也是至少 16ms 才会触发一次，并且自带节流功能
     3. 判断是否触发了 media query
     4. 更新动画并且发送事件
     5. 判断是否有全屏操作事件
     6. 执行 requestAnimationFrame 回调
     7. 执行 IntersectionObserver 回调，该方法用于判断元素是否可见，可以用于懒加载上，但是兼容性不好
     8. 更新界面
     9. 以上就是一帧中可能会做的事情。如果在一帧中有空闲时间，就会去执行 requestIdleCallback 回调

   - 减少重绘和回流

     - CSS

       - 避免使用 table 布局
         - 可能很小的一个小改动会造成整个 table 的重新布局
       - 尽可能在 DOM 树的最末端改变 class
       - 避免设置多层内联样式
       - CSS 选择符从右往左匹配查找，避免 DOM 深度过深
       - 将动画效果应用到 position:absolute/fixed 的元素上
       - 避免使用 CSS 表达式
         - eg：calc()
       - 使用 translate 替代 top
       - 使用 visibility 替换 display: none

         - 因为前者只会引起重绘，后者会触发回流

       - 动画实现的速度的选择

         - 动画速度越快，回流次数越多，也可以选择使用 requestAnimationFrame

       - 将频繁运行的动画变为图层
         - 图层能够阻止该节点回流影响别的元素。比如对于 video 标签，浏览器会自动将该节点变为图层

     - JavaScript

       - 避免频繁操作样式

         - 最好一次性重写 style 属性，或者将样式列表定义为 class 并一次性更改 class 属性

       - 避免频繁操作 DOM

         - 创建一个 documentFragment，在它上面应用所有 DOM 操作，最后再把它添加到文档中
         - 避免把 DOM 结点的属性值放在一个循环里当成循环里的变量

       - 把 DOM 离线后修改

         - 先为元素设置 display: none，操作结束后再把它显示出来。因为在 display 属性为 none 的元素上进行的 DOM 操作不会引发回流和重绘

       - 对具有复杂动画的元素使用绝对定位，使它脱离文档流，否则会引起父元素及后续元素频繁回流

5. **浏览器架构**

6. **浏览器下事件循环(Event Loop)**

   - 宏任务

   - 微任务

7. **Web Worker**

   现代浏览器为 JavaScript 创造的 多线程环境。
   可以新建并将部分任务分配到 worker 线程并行运行，两个线程可**独立运行，互不干扰**，可通过自带的**消息机制**相互通信。

   - postMessage //向 worker 发送数据
   - onmessage //接收 worker 传过来的数据函数

   - **基本用法**

     ```javascript
     // 创建 worker
     const worker = new Worker("work.js");
     
     // 向主进程推送消息
     worker.postMessage("Hello World");
     
     // 监听主进程来的消息
     worker.onmessage = function (event) {
       console.log("Received message " + event.data);
     };
     ```

   - **限制**
     - 同源限制
     - 无法使用 document / window / alert / confirm
     - 无法加载本地资源

> 参考链接
>
> 1. https://juejin.im/post/5ad5b9116fb9a028e014fb19
> 2. https://juejin.im/post/59d1f59bf265da06700b0934
> 3. https://juejin.im/post/5c6bcdc8e51d45209a1ca3b6
> 4. https://juejin.im/post/5cac9d4d5188251b090abcf1
> 5. https://mp.weixin.qq.com/s/1RyLXMQEtGAT-al0Ev8Ikg
> 6. https://juejin.im/post/5c6c182ee51d45760b1c8e30#heading-4
> 7. https://juejin.im/post/5d63a2bbe51d453c2577b7b5
> 8. https://blog.csdn.net/u014346301/article/details/52689558

