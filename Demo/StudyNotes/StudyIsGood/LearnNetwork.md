# 服务端与网络

1.  **浏览器从输入 URL 到页面展示的过程**

    - 用户输入 URL，浏览器根据请求的 URL 交给 **DNS 域名解析**，找到真实 IP
    - 设置请求报文(头，主体)，**封装 HTTP 请求数据包**
    - **封装 TCP 包**，TCP/IP**三次握手建立连接**
    - 客户端向服务端**发起 HTTP 请求**报文，最后会发送一空白行，标示客户端请求完毕
    - **服务端返回 HTTP 响应报文**，浏览器接收文件
    - **四次挥手**关闭 TCP 连接
    - 浏览器**解析文档资源并渲染页面**，对加载到的资源（HTML、JS、CSS 等）进行语法解析，建立相应的内部数据结构

      - ![image](https://user-gold-cdn.xitu.io/2018/12/10/16798b8db54caa31?imageView2/0/w/1280/h/960/ignore-error/1)
      - HTML parser --> DOM Tree
      - CSS parser --> Style Tree(样式树)

        - 会阻塞渲染
        - 注：是一个**十分消耗性能**的过程，所以应尽量保证层级扁平，减少过度层叠，**越是具体的 CSS 选择器，执行速度越慢**

      - attachment --> Render Tree(渲染树)
      - layout: 布局
      - GPU painting: 像素绘制页面
      - 载入解析到的资源文件，渲染页面
      - 注：
        - **当 HTML 解析到 script 标签时，会暂停构建 DOM**，完成后才会从暂停的地方重新开始。想首屏渲染得越快，就越不应该在首屏就加载 JS 文件
        - CSS 也会影响 JS 的执行，只有当解析完样式表才会执行 JS，所以也可以认为这种情况下，CSS 也会暂停构建 DOM

2.  **DNS 域名解析**

    - **DNS**(Domain Name System)：用于将主机名和域名转换为 IP

    - **工作流程**

      - ![image](https://img-blog.csdn.net/20171211190812796?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvbTBfMzc4MTI1MTM=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center)

      - 浏览器**先在自身缓存中查找**DNS(域名服务器)解析记录，若有该域名对应的 IP 地址则直接返回
      - 若未命中缓存，则**查找操作系统中的 hosts 文件**是否有该域名的 DNS 解析记录，有则返回
      - 若浏览器缓存或 hosts 文件都未命中域名，或者已过期，则向**本地域名服务器(LDNS)**发起请求解析这个域名
      - 若 LDNS 仍未命中，则向**Root Server 根域名服务器**发起请求解析这个域名
      - 根域名服务器返回给 LDNS 一个所查询域的**主域名服务器的IP地址（**gTLD Server，国际顶尖域名服务器）
      - 此时 LDNS**向主域名服务器发起解析请求**
      - 主域名服务器接收到解析请求后，**查找并返回域名对应的域名服务器(Name Server)的地址**，这个 **Name Server 就是网站注册的域名服务器**
      - 域名服务器会查询存储的域名和 IP 的**映射关系表**，返回给 LDNS 目标 IP 记录以及一个 TTL 值(time to live)
      - LDNS 接收到 IP 和 TTL 值，**进行缓存**，缓存时间有 TTL 值控制
      - LDNS 将解析的结果返回给用户，**用户根据 TTL 值缓存在本地系统缓存中**，域名解析过程结束

3. **HTTP 和 HTTPS**

   - **HTTP**：超文本传输协议(Hyper Text Transfer Protocol)

     - 从 WEB 服务器传输超文本标记语言(HTML)到本地浏览器的传送协议，可以使浏览器更加高效，使网络传输减少。
     - **原理**
       - 基于 TCP/IP 通信协议来传递数据，传输的数据类型为 HTML 文件, 图片文件, 查询结果等
         - 一般用于 B/S 架构。浏览器作为 HTTP 客户端通过 URL 向 HTTP 服务端即 WEB 服务器发送所有请求。
     - **HTTP 工作流程**
       - 地址解析：解析出协议名、主机名、端口、对象路径等部分
       - 封装 HTTP 请求数据包
       - 封装成 TCP 包，建立 TCP/IP 连接(TCP/IP 三次握手)
       - 客户端向服务端发起 HTTP 请求。(例如：POST/login.html http/1.1)
       - 最后会发送一空白行，标示客户端请求完毕
       - 服务器响应
       - 服务器向客户端发送应答头信息(例如：HTTP/1.1 200 OK)
       - 之后服务端也会发送一个空白行，表示应答头信息发送完毕，接着就以 Content-type 要求的数据格式发送数据给客户端
       - 服务端关闭 TCP 连接
       - 如果服务器或者客户端在其头信息加入 Connection:keep-alive，就表示客户端与服务器端继续保存连接，在下次请求时可以继续使用这次的连接
     - **特点**
       - **基于请求和响应**：客户端发起请求，服务端响应
       - **无状态**：协议**自身不对请求和响应之间的通信状态进行保存**。也就是说在 HTTP 这个级别，协议对于发送过的请求或响应都**不做持久化处理**。这是为了更快地处理大量事务，确保协议的可伸缩性。
       - **无连接**：限制**每次连接只处理一个请求**。服务器**处理完请求，并收到客户的应答后，即断开连接**。不利于客户端与服务器保持会话连接，为了弥补这种不足，产生了两项记录 http 状态的技术，一个叫做 Cookie,一个叫做 Session。
       - **简单快速**：客户向服务器请求服务时，只需传送请求方法和路径。请求方法常用的有 GET、HEAD、POST。
       - **灵活**：HTTP 允许传输任意类型的数据对象。传输的类型由 Content-Type 加以标记。
     - **缺点**
       - **通信使用明文**，内容可能会被窃听
         - 通信的加密：通过**SSL**(Secure Socket Layer，安全套接层)或**TLS**(Transport Layer Security，安全传输层协议)的组合使用，加密HTTP的通信内容
       - **不验证通信方的身份**，因此可能遭遇伪装
         - SSL不仅提供**加密处理**，而且还使用了一种被称为**证书**的手段，可用于确定通信方。证书由值得信任的第三方机构颁发，用以证明服务器和客户端是实际存在的
       - **无法证明报文的完整性**，所以有可能已遭篡改
         - 防止被篡改：MD5和SHA-1等散列值校验，数字签名
     - **HTTP/1.1 和部分 HTTP/1.0 的改进：**
       - **持久连接**：只要任意一端没有明确提出断开连接，则保持 TCP 连接状态。旨在建立一次 TCP 连接后进行多次请求和响应的交互。在 HTTP/1.1 中，所有的连接默认都是持久连接。
       - **管线化**：持久连接**使得多数请求以管线化方式发送成为可能**。以前发送请求后需等待并接收到响应，才能发送下一个请求。管线化技术出现后，**在收到HTTP响应报文之前就可接着发送新的请求报文**。这样就能做到**同时并行发送多个请求，而不需要一个接一个地等待响应**，使TCP连接中的空闲时间减少，提高了下载文档效率。

   - **HTTPS**：超文本传输安全协议(Hypertext Transfer Protocol Secure)。是**在 HTTP 上建立 SSL 加密层，并对传输数据进行加密**，是 HTTP 协议的安全版。**SSL提供认证和加密处理及摘要功能**
   - **原理**
       - 客户端向服务器端索要并验证公钥
       - 这一阶段使用的是**非对称加密传输**(RSA)，服务端将数字证书发给客户端。其中数字证书包括：公钥和数字签名。客户端在拿到后对两者进行校验
       - 在非对称加密传输中，两端协商生成"对话密钥"
       - **双方采用"对话密钥"进行对称加密通信**
       
     - **https 工作流程**
     
     - ![image](https://pics1.baidu.com/feed/023b5bb5c9ea15ce26b853cd9cdca2f73887b284.jpeg?token=5ee5bde0022bc60fbbcfb1fe34e739b7&s=7EAC3C6259DFC0C8485CE0DB0000C0B1)
       - 客户端通过 URL 访问服务器建立 SSL 连接。（**先和SSL进行通信，再由SSL和TCP通信**）
     
     - 服务端收到客户端请求后，会将网站支持的证书信息（证书中包含公钥）传送一份给客户端。
       - 客户端的服务器开始协商 SSL 连接的安全等级，也就是信息加密的等级。
       - 客户端的浏览器根据双方同意的安全等级，建立会话密钥，然后**利用网站的公钥将会话密钥加密**，并传送给网站。
       - 服务器利用自己的**私钥解密**出会话密钥。
       - 服务器利用会话密钥加密与客户端之间的通信。
     
   - **优点**：内容加密；保护数据完整性，对网站服务器进行真实身份认证
     
   - **缺点**：https 协议握手阶段比较费时
     
     - **https 连接缓存不如 http 高效**，会增加数据开销和功耗
       - https 连接服务器端资源占用相比于 http 高很多， 会降低用户的访问速度
       - SSL 涉及到的安全算法会消耗 CPU 资源
     
     - 申请 SSL 证书需要钱，功能越强大的证书费用越高
       - SSL 证书通常需要绑定 IP，不能再同一 IP 上绑定多个域名，IPv4 资源不可能支撑这个消耗
     
   - **http 和 https 的区别**

     - **https 协议需要到 CA 申请证书**，一般免费证书很少，需要交费
     - **http 信息是明文传输**，会被他人截获，不安全；**https 通过 SSL\TLS 进行加密**，传输信息不易被截获，非常安全
     - **http 使用的端口是 80**，**HTTPS 是 443**
     - **http 的连接很简单,是无状态的**；**HTTPS 协议是由 SSL + HTTP 协议构建的可进行加密传输、身份认证的网络协议**，要比 http 协议安全**
     - **在 OSI 网络模型中，http 工作于应用层，而 https 工作在传输层**
5.  **TCP/IP 三次握手 和 四次挥手**

    - **三次握手**(根据 IP 建立 TCP 连接)

      - **客户端和服务端互相确认可以收发数据**

      - 客户端发送一个 syn 包：即带有 SYN=1，Seq=x 的数据包到服务器端口，并进入 SYN_SENT 状态，等待服务器确认；(第一次握手，**由客户端向服务端发起，告诉服务端我要发生请求了**)

      - 服务器收到 syn 包，必须确认客户的 SYN，同时发回一个带 SYN=1， ACK=x+1， Seq=y 的响应包以示传达确认信息，即 SYN+ACK 包，此时服务器进入 SYN_RECV 状态；（第二次握手，**由服务端发起，告诉客户端我准备好接收信息了**）

      - 客户端收到服务器的 SYN+ACK 包，向服务器发送确认包 ACK，即回传一个带 ACK=y+1， Seq=Z 的数据包，代表“握手结束”（第三次握手，**由客户端发送，告诉服务端，我马上就发送信息了，准备接收吧**）

      ![image](https://user-gold-cdn.xitu.io/2019/2/22/16914083b8093f55?imageView2/0/w/1280/h/960/format/png/ignore-error/1)

      - **为何建立连接需要三次握手**：**为了防止已失效的连接请求报文段突然又传送到了服务端，因而产生错误**。

    - **四次挥手**(关闭 TCP 连接)

      - 通过四次挥手关闭连接(FIN ACK, ACK, FIN ACK, ACK)

      ![image](https://user-gold-cdn.xitu.io/2019/2/22/169140a85c0fec37?imageView2/0/w/1280/h/960/format/png/ignore-error/1)

      - 第一次挥手：客户端向服务端发送报文，Fin、Ack、Seq，表示已经没有数据传输了，并进入 FIN_WAIT_1 状态。(**客户端发起，发送给服务器，告知服务器请求报文发送完毕，你可以准备关闭了**)
      - 第二次挥手：服务端收到 FIN 后，发送响应报文，Ack、Seq，表示同意关闭请求。此时主动发起方进入 FIN_WAIT_2 状态。(**服务器发起，告诉客户端，我请求报文接收完了，准备关闭了，你也准备吧**)
      - 第三次挥手：服务端向客户端发送报文段，Fin、Ack、Seq，请求关闭连接。并进入 LAST_ACK 状态。(**服务器告诉客户端，我响应报文发送完了，你准备关闭吧**)
      - 第四次挥手：客户端收到 FIN 后向服务端发送报文段，Ack、Seq。然后进入等待 TIME_WAIT 状态。服务端收到客户端的报文段后关闭连接(CLOSED)，客户端等待一定时间未收到回复，则正常关闭。(**客户端发起，告诉服务器，我响应报文接收完毕了，我准备关闭了，你也准备吧。**)
      - **为什么关闭连接需要四次挥手**：关闭连接时，服务器收到对方的 FIN 报文时，仅仅表示对方不再发送数据了但是还能接收数据，而自己也未必全部数据都发送给对方了，所以己方可以立即关闭，也可以发送一些数据给对方后，再发送 FIN 报文给对方来表示同意现在关闭连接，因此，己方 ACK 和 FIN 一般都会分开发送，从而导致多了一次。
      - **为什么需要 TIME_WAIT**：如果没有 TIME-WAIT，主动方就会直接进入 CLOSED 状态，（假设主动方时客户端，被动方时服务端）这时候如果立即重启客户端使用相同的端口，如果因为网络中种种原因最后一次 ACK 丢失了，服务端就会重复 FIN 请求，这时这个 FIN 就会被重新启动的客户端接收到，或者新启动的客户端向服务端发起请求的时候，因为服务端正在等待最后一次 ACK，因此新连接请求发送的 SYN 就会被服务端认为时请求码错误，服务端就会回复 RET 重置连接。所以就需要主动方发送最后一次 ACK 之后进入 TIME_WAIT 状态，等待 2MSL（两个报文最大生命周期），等待这段时间就是**为了如果接收到了重发的 FIN 请求能够进行最后一次 ACK 回复，让在网络中延迟的 FIN/ACK 数据都消失在网络中，不会对后续连接造成影响**
      - **为什么 TIME_WAIT 的时间是 2MSL**：MSL 是 TCP 报文的最大生命周期，因为 TIME_WAIT 持续在 2MSL 就**可以保证在两个传输方向上的尚未接收到或者迟到的报文段已经消失，否则服务器立即重启，可能会收到来自上一个进程迟到的数据，但是这种数据很可能是错误的，同时也是在理论上保证最后一个报文可靠到达**，假设最后一个 ACK 丢失，那么服务器会再重发一个 FIN，这时虽然客户端的进程不在了，但是 TCP 连接还在，仍然可以重发 LAST_ACK。

6.  **浏览器渲染页面**

    - 浏览器通过**HTML Parser**根据**深度遍历**的原则**把 HTML 解析成 DOM Tree**
    - 浏览器通过**CSS Parser**将 CSS 解析成**CSSOM Tree**
    - 浏览器将 JavaScript 通过 DOM API 或者 CSSOM API**将 JS 代码解析并应用到布局中**，按要求呈现响应的结果
    - 根据 DOM Tree 和 CSSOM Tree 来构造 **Render Tree**
    - **layout 重排**，当 Render Tree 中任一节点的几何尺寸发生改变，Render Tree 就会重新布局，重新来计算所有节点在屏幕中的位置
    - **repaint 重绘**，当 Render Tree 中任意元素样式属性发生改变，Render Tree 都会重新绘制页面
    - **GPU painting**：遍历 Render Tree，并调动硬件图形 API 来绘制每个节点

7. **TCP和UDP协议**

7. **缓存策略: 强缓存 和 协商缓存**

   - 缓存：保存资源副本并在下次请求时直接使用该副本的技术。

   - 缓存的好处

     - 缓解服务器压力(不用每次去请求资源)
     - 减少页面加载时间，提升性能
     - 减少网络传输，减少带宽消耗

   - 缓存的分类

     - 宏观

       - 私有缓存: 用户专享，各级代理不能缓存
       - 共享缓存: 能够被多个用户使用的缓存,也就是那些能被各级代理的缓存

     - 微观：浏览器缓存、代理服务器缓存、网关缓存、数据库缓存

   - 浏览器缓存

     - 浏览器缓存分为强缓存和协商缓存，强缓存会直接读取浏览器缓存，不会向服务器发送请求，而协商缓存先向访问服务器看缓存是否过期，再决定是否从浏览器里面拿数据

     - ![image](https://mmbiz.qpic.cn/mmbiz_jpg/vzEib9IRhZD5sp48Jfr1IrOPOPdmJ4GEIib3icc4wf6TQGp0PqTia9yUlG3OX40jibf3QBmzAIxYmUKX4yTwhaDpwdA/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

     - **强缓存(Expires & Cache-Control)**

       - 给浏览器缓存设置过期时间，超过这个时间之后缓存就是过期，浏览器需要重新请求

       - 三种情况

         - 第一次请求，不存在缓存结果和缓存标识，直接向服务器发送请求
         - 存在缓存标识和缓存结果，但是缓存结果已经失效，则使用协商缓存
         - 存在缓存标识和缓存结果，且该结果尚未失效，强制缓存生效，直接返回该结果

       - Expires：HTTP/1.0 中的定义缓存的字段，告知客户端资源缓存失效的**绝对时间**

         - 返回的是服务器的时间 `Expires: Wed Feb 20 2019 11:25:41 GMT`

       - Cache-Control：max-age：HTTP/1.1 定义的关于缓存的字段，它规定了缓存过期的一个**相对时间**

         - public：所有内容都将被缓存(客户端和代理服务器都可缓存)
         - private：所有内容只有客户端可以缓存，Cache-Control 的默认取值
         - no-cache：客户端缓存内容，每次使用需要经过协商缓存来验证决定是否可用
         - no-store：所有内容都不会被缓存，即不使用强制缓存，也不使用协商缓存
         - max-age=xxx (xxx is numeric)：缓存内容将在 xxx 秒后失效

       - **优先级**：**Cache-Control > Expires**

       - **缺点**：该缓存方式优先级高，如果在过期时间内缓存的资源在服务器上更新了，客服端不能及时获取最新的资源(所以有了协商缓存)

     - **协商缓存(Last-Modified & Etag)**

       - 强缓存失效后，浏览器携带缓存标识向服务器发起请求，由服务器根据缓存标识决定是否使用缓存的过程

       - **强缓存不发请求到服务器**，所以有时候资源更新了浏览器还不知道；**协商缓存会发请求到服务器**，所以资源是否更新，服务器肯定知道(协商缓存需要配合强缓存使用)

       - 利用 Last-Modified，If-Modified-Since 和 ETag、If-None-Match 对资源做标识，然后由服务器做分析，如果资源未更新，则返回 304 状态码，那么浏览器则会从缓存中读取资源，否则重新请求资源

       - **Last-Modified 与 If-Modified-Since**
         - last-modified：**资源在服务器上最后一次修改的时间**
         - If-Modified-Since：**上一次请求时返回的 Last-Modified 的值**

         - 服务器再次收到资源请求时，根据浏览器传过来 If-Modified-Since 和资源在服务器上的最后修改时间判断资源是否有变化
           - 若无变化，返回 304，不会返回资源内容，从缓存中加载资源
           - 若有变化，返回 200，正常返回资源内容

         - 浏览器收到 200 的响应后，Last-Modified Header 在重新加载的时候会被更新，下次请求时，If-Modified-Since 会启用上次返回的 Last-Modified 值

       - **缺点：**

         - **周期性修改，但内容未变时，会导致缓存失效**

         - **以秒为单位进行更新，如果小于该单位高频进行更新的话，则不适合采用该方法**。(所以就有了 ETag、If-None-Match)

       - **Etag 与 If-None-Match**

         - Etag(response 携带)：**服务器根据当前请求的资源生成的一个唯一标识**，是一个字符串，只要资源有变化这个标识就会不同，跟最后修改时间没有关系
       - If-None-Match：浏览器**再次跟服务器请求这个资源时，在 request 的 header 上加上 If-None-Match 的 header**，这个 header 的值就是**上一次请求时返回的 ETag 的值**
         - 服务器再次收到资源请求时，根据浏览器传过来 If-None-Match 和资源生成一个新的 ETag，**如果这两个值相同就说明资源没有变化，否则就是有变化**。
         - 若无变化，服务端返回304，浏览器使用缓存
           - 若有变化，服务端响应 200，并正常返回资源内容
       - **ETag 相对于 Last-Modified 可更加准确地判断文件内容是否被修改；但由于需要对资源进行生成标识，性能方面势必有所牺牲**
         - Last-Modified、If-Modified-Since 和 ETag、If-None-Match 一般都是同时启用，这是为了处理 Last-Modified 不可靠的情况。
       - 注：分布式系统里多台机器间文件的 Last-Modified 必须保持一致，以免负载均衡到不同机器导致比对失败
         
         - 分布式系统尽量关闭掉 ETag(每台机器生成的 ETag 都会不一样）
         
       - 优先级：**ETag/If-None-Match > Last-Modified/If-Modified-Since**, 同时存在时, 前者覆盖后者

     - 启发式缓存

       - 当请求头中确定缓存过期时间的字段一个都没有，会默认触发浏览器启发式缓存。

     - 缓存的优先级

       - 强缓存 > 协商缓存 > 启发式缓存

       - Cache-Control > Expires > ETag > Last-Modified
       - 浏览器整个缓存策略的过程： ![image](https://user-gold-cdn.xitu.io/2018/1/27/16137f262e0adf18?imageView2/0/w/1280/h/960/ignore-error/1)

       - 浏览器先检查 Cache-Control，如果为 no-store，则浏览器所有内容都不会缓存，强制缓存，协商缓存统统都不会触发

8. **http 状态码**

   - 常见状态码

   | 1XX 接收的请求正在处理 | 2XX 请求正常处理完毕  | 3XX 重定向                                 | 4XX 客户端错误    | 5XX 服务器错误            |
   | ---------------------- | --------------------- | ------------------------------------------ | ----------------- | ------------------------- |
   | 1xx: 接受，继续处理    | 200：成功，并返回数据 | 301: 永久移动，重定向                      | 400: 请求语法错误 | 500: 服务器错误           |
   |                        | 201: 已创建           | 302: 临时移动，可使用原有 URI              | 401: 要求身份认证 | 503：服务器暂时处于超负载 |
   |                        | 202: 已接受           | 303: 资源存在另一个 URI（GET 方法获取请求) | 403: 拒绝请求     | 503：或服务器正在停机维护 |
   |                        | 203: 成功，但未授权   | 304: 资源未修改，可使用缓存                | 404: 资源不存在   |                           |
   |                        | 204: 成功，无内容     | 305: 需代理访问 305: 需代理访问            |                   |                           |
   |                        | 205: 成功，重置内容   | 307: 临时重定向，不会从 POST 变成 GET      |                   |                           |
   |                        | 206: 成功，部分内容   |                                            |                   |                           |

9. **WebSocket**

   - 服务器与客户端之间全双工通信标准，是真正的**双向平等对话**，属于服务器推送技术的一种。(不受同源政策影响)

   - 特点:

     - 支持服务器向客户端推送数据的推送功能，这样，服务器可直接发送数据，不必等待客户端的请求、
     - 减少了通信量，只要建立起websocket链接，就希望一直保持连接状态

     - **建立在 TCP 协议之上**，服务器端的实现比较容易
     - **与 HTTP 协议有着良好的兼容性**。默认端口也是 80 和 443，并且握手阶段采用 HTTP 协议，因此握手时不容易屏蔽，能通过各种 HTTP 代理服务器
     - **数据格式比较轻量，性能开销小，通信高效**
     - **可以发送文本，也可以发送二进制数据**
     - **没有同源限制**，客户端可以与任意服务器通信
     - **协议标识符是 ws（如果加密(即https)，则为 wss），服务器网址就是 URL**

   - 新建 WebSocket 实例：var ws = **new WebSocket(url)**

   - 指定连接成功后的回调函数：**ws.onopen** = fn

   - 指定连接关闭后的回调函数：**ws.onclose** = fn

   - 指定收到服务器数据后的回调函数：**ws.onmessage** = fn

   - 向服务器发送数据：**ws.send()**

   - 指定报错时的回调函数：**ws.onerror** = fn

   - webSocket.readyState

     - CONNECTING：值为 0，表示正在连接
     - OPEN：值为 1，表示连接成功，可以通信了
     - CLOSING：值为 2，表示连接正在关闭
     - CLOSED：值为 3，表示连接已经关闭，或者打开连接失败

10. **Ajax**

11. **GET 请求 和 POST 请求**

    - **GET**：主要用于获取信息，无副作用，幂等，可缓存

      - 浏览器回退无害
      - 请求 URL 的编码格式仅支持 ASCII 编码；**不能提交 json 数据**
      - 请求的数据**会附加在 URL 之后**，用问号分割，多个参数用&进行连接，会暴露在地址栏中，
      - 相对安全性较差，会被浏览器**主动缓存**
      - 产生一个 TCP 数据包，**head 和 data 一起发送**

    - **POST**：主要用于创建或者更新数据，有副作用，非幂等，**不可缓存**
      - 浏览器回退重新请求
      - post 请求 URL 的编码格式支持各种编码
      - post 请求必须设置 Content-Type 值为`application/x-form-www-urlencoded`
      - 请求会把数据放置在 HTTP 请求包的包体中，不会直接暴露给用户
      - 理论上大小是不会限制的，但是实际上各个服务器会规定 POST 提交数据大小
      - 相对 Get 更安全，因为参数不会保存浏览器立式或者是 web 服务器日志中，**不会被缓存**
      - 部分浏览器或框架，POST 方法会产生**两个 TCP 数据包**，header 先发送，服务端返回 100 状态码再发送 Body，服务器 200 然后返回数据
    - **无区别表现**
      - GET 和 POST 只**是 HTTP 协议中的两种请求方式，**而 HTTP 协议之基于 TCP/IP 的应用层协议，无论 POST 和 GET 都是用同一个传输层协议，所以传输上没有区别
      - GET 和 POST 能做的事情是一样的，只要给 GET 加上 request body，给 POST 加上 url 参数，技术上完全是行得通的

12. **fetch**

13. **跨域，同源策略，如何解决跨域问题**

    - **同源**指的是两个域需要协议，子域名，主域名与端口号都保持一致，四者有一个不同，即属于**跨域**

    - 同源政策的**目的**

      - 保证用户信息的安全，防止恶意的网站窃取数据

    - 同源策略限制内容：不是一个源的文档，你没有权力去操作另一个源的文档

      - Cookie、LocalStorage、IndexedDB 等存储性内容
      - 无法获取或操作另一个资源的 DOM
      - AJAX 请求发送后，结果被浏览器拦截了

    - 特别说明：

      - 如果是协议和端口造成的跨域问题"前台"是无能为力的
      - 在跨域问题上，仅仅是通过"URL 的首部"来识别而不会根据域名对应的 IP 地址是否相同来判断
      - 跨域并不是请求发不出去，请求能发出去，服务端能收到请求并正常返回结果，只是结果被浏览器拦截了

    - 跨域的**解决方案**

      - **JSONP**

        - 利用 script 标签可以不受限制的从其他域加载资源的能力，进行跨域通信

        - 由两部分组成：回调函数和数据

          - 回调函数是服务端响应带来时，应该调用的函数，需要在 URL 中指定

          - 数据就是服务器返回给浏览器的响应

          - 关键在于：**服务端响应数据是一个函数的调用，真正要发送给客户端的数据作为函数调用的参数**

            ```javascript
            const data = fn({ name: 'zs', age: '20' });
            res.send(data);
            ```

        - 优缺点

          - 优点：简单，兼容性好，可用于解决主流浏览器的跨域数据访问的问题
          - 缺点：仅支持 get 方法具有局限性,不安全可能会遭受 XSS 攻击

        - JSONP 的使用

          - 动态创建一个 script 元素

          - 为 script 指定 src 属性的值，需要将回调函数名拼接给 url，形式为：`callback=functionName`

          - 然后动态地将 script 标签追加到 body 中

          - 前端声明一个函数，函数名作为参数值传递给跨域请求数据的服务器，**函数形参为要获取目标函数**(服务器返回的 data)；服务器收到请求后，需要进行特殊的处理：把传递进来的函数名和要返回去的数据拼接成一个字符串。最后服务器把准备的数据通过 HTTP 协议返回给客户端，客户端再调用执行之前声明的回调函数，对返回的数据进行操作

        - 简单实现

          ```javascript
          function jsonp(req) {
            var script = document.createElement('script');
            var url = req.url + '?callback=' + req.callback.name;
            script.src = url;
            document = getElementsByTagName('head')[0].appendChild(script);
          }
          ```

        - 前端示例

          ```javascript
          function hello(res) {
            alert('hello' + res.data);
          }

          jsonp({
            url: '',
            callback: hello,
          });
          ```

        - 服务端代码

          ```javascript
          (function (global) {
            var id = 0,
              container = document.getElementsByTagName('head')[0];

            function jsonp(options) {
              if (!options || !options.url) return;

              var scriptNode = document.createElement('script'),
                data = options.data || {},
                url = options.url,
                callback = options.callback,
                fnName = 'jsonp' + id++;

              // 添加回调函数
              data['callback'] = fnName;

              // 拼接url
              var params = [];
              for (var key in data) {
                params.push(
                  encodeURIComponent(key) + '=' + encodeURIComponent(data[key])
                );
              }

              url = url.indexOf('?') > 0 ? url + '&' : url + '?';

              url += params.join('&');
              scriptNode.src = url;

              // 传递的是一个匿名的回调函数，要执行的话，暴露为一个全局方法
              global[fnName] = function (ret) {
                callback && callback(ret);
                container.removeChild(scriptNode);
                delete global[fnName];
              };

              // 出错处理
              scriptNode.onerror = function () {
                callback && callback({ error: 'error' });
                container.removeChild(scriptNode);
                global[fnName] && delete global[fnName];
              };
              scriptNode.type = 'text/javascript';
              container.appendChild(scriptNode);
            }
            global.jsonp = jsonp;
          })(this);
          ```

        - 通过 JQuery Ajax 发起 jsonp 请求

          ```javascript
          $.ajax({
            // 请求方式
            type: 'get',
            // 请求地址
            url: 'http://169.254.200.238:8080/jsonp.do',
            // 标志跨域请求
            dataType: 'jsonp',
            // 跨域函数名的键值，即服务端提取函数名的钥匙（默认为 callback）
            jsonp: 'callbackparam',
            // 客户端与服务端约定的函数名称
            jsonpCallback: 'jsonpCallback',
            // 请求成功的回调函数，json 既为我们想要获得的数据
            success: function (json) {
              console.log(json);
            },
            // 请求失败的回调函数
            error: function (e) {
              alert('error');
            },
          });
          ```

      - **CORS**(cross-origin-resource) 跨域资源共享

        - 浏览器一旦发现请求跨源，就会在请求报文中自动添加一些附加的 origin 头信息(包括页面源信息：协议、域名和端口号)，有时还会多出一次附加的请求；**服务器**收到请求报文后，如果同意该请求，则在响应报文头部加 Access-Control-Allow-Origin，值与请求报文头的 origin 头部的值一致

        - Access-Control-Allow-Origin：表示哪些域名可以访问资源，如果设置通配符则表示所有网站都可以访问资源

          - 服务器端设置两个访问头

            - 允许那些客户端访问我，即请求报文头的 origin 头部的值

              `res.header('Access-Control-Allow-Origin','*')`

            - 允许客户端使用那些请求方式访问我

              `res.header('Access-Control-Allow-Methods','get/post')`

          - 通过这种方式解决跨域问题，会在发送请求时出现两种情况：

            - 简单请求

              - 使用 GET/HEAD/POST 方法之一
              - Content-Type 的值仅限于 text/plain | multipart/form-data | application/x-www-form-urlencoded 中三者之一

            - 复杂请求：不符合以上条件的请求
              - 会在正式通信之前，增加一次 HTTP 查询请求，称为"预检"请求,该请求是 option 方法的，通过该请求来知道服务端是否允许跨域请求

      - **iframe**

        - window.name + iframe

          - window.name 属性的独特之处：name 值在不同的页面（甚至不同域名）加载后依旧存在，并且可以支持非常长的 name 值

            ```html
            // a.html(http://localhost:3000/b.html)
            <iframe
              src="http://localhost:4000/c.html"
              frameborder="0"
              onload="load()"
              id="iframe"
            >
            </iframe>
            <script>
              let first = true;
              // onload 事件会触发 2 次，第 1 次加载跨域页，并留存数据于 window.name
              function load() {
                if (first) {
                  // 第 1 次 onload(跨域页)成功后，切换到同域代理页面
                  let iframe = document.getElementById('iframe');
                  iframe.src = 'http://localhost:3000/b.html';
                  first = false;
                } else {
                  // 第 2 次 onload(同域 b.html 页)成功后，读取同域 window.name 中数据
                  console.log(iframe.contentWindow.name);
                }
              }
            </script>

            // c.html(http://localhost:4000/c.html)

            <script>
              window.name = '我不爱你';
            </script>
            ```

          - a 页面和 b 页面同域，b 为中间代理页面，通过 iframe 的 Src 属性由外域转向本地域，跨域数据由 iframe 的 window.name 从外域传递到本地域。巧妙地绕过了浏览器的跨域访问限制，但同时它又是安全操作

        - location.hash + iframe

          - 实现原理：a.html 欲与 c.html 跨域相互通信，通过中间页 b.html 来实现。 三个页面，不同域之间利用 iframe 的 location.hash 传值，相同域之间直接 js 访问来通信

          - 具体实现步骤：一开始 a.html 给 c.html 传一个 hash 值，然后 c.html 收到 hash 值后，再把 hash 值传递给 b.html，最后 b.html 将结果放到 a.html 的 hash 值中

          ```javascript
          // a.html
          <iframe src="http://localhost:4000/c.html#iloveyou"></iframe>
          <script>
            window.onhashchange = function () {
              //检测 hash 的变化
              console.log(location.hash);
            };
          </script>
          // b.html
          <script>
            window.parent.parent.location.hash = location.hash;
            //b.html将结果放到a.html的hash值中，b.html可通过parent.parent访问a.html页面
          </script>

          // c.html
          console.log(location.hash);
          let iframe = document.createElement('iframe');
          iframe.src = 'http://localhost:3000/b.html#idontloveyou';
          document.body.appendChild(iframe);
          ```

        - document.domain + iframe

          - 只能用于二级域名相同的情况下，比如 a.test.com 和 b.test.com 适用于该方式

          - 实现原理：两个页面都通过 js 强制设置 document.domain 为基础主域，就实现了同域

      - **postMessage**

        - postMessage 方法允许来自不同源的脚本采用异步方式进行有限的通信，可以实现跨文本档、多窗口、跨域消息传递

        - otherWindow.postMessage(message, targetOrigin, \[transfer]);

          - message: 将要发送到其他 window 的数据

        - targetOrigin：通过窗口的 origin 属性来指定哪些窗口能接收到消息事件，其值可以是字符串"\*"（表示无限制）或者一个 URI - transfer(可选)：是一串和 message 同时传递的 Transferable 对象

        - example:

          ```javascript
          // a.html
          <iframe src="http://localhost:4000/b.html" frameborder="0" id="frame" onload="load()"></iframe> //等它加载完触发一个事件
          //内嵌在 http://localhost:3000/a.html
          <script>
          function load() {
            let frame = document.getElementById('frame');
            frame.contentWindow.postMessage('我爱你', 'http://localhost:4000') //发送数据
            window.onmessage = function(e) { // 接收返回数据
              console.log(e.data) //我不爱你
            }
          }
          </script>
          // b.html
          window.onmessage = function(e) {
            console.log(e.data) //我爱你
            e.source.postMessage('我不爱你', e.origin)
          }
          ```

          - a 页面设置\<iframe>标签，src 链接到 b 页面，postMessage 向 b 页面发送数据，onmessage 接收 b 页面返回的数据；
          - b 页面 onmessage 接收 a 页面发送的数据，postMessage 向 a 页面发送数据

      - **WebSocket**

        - WebSocket 是 HTML5 的一个持久化的协议，它实现了浏览器与服务器的全双工通信，同时也是跨域的一种解决方案；

        - 是一种双向通信协议，在建立连接之后，WebSocket 的 server 与 client 都能主动向对方发送或接收数据

        - WebSocket 在建立连接时需要借助 HTTP 协议，连接建立好了之后 client 与 server 之间的双向通信就与 HTTP 无关了

          ```javascript
          // socket.html
          <script>
            let socket = new WebSocket('ws://localhost:3000');
            socket.onopen = function () {
            socket.send('我爱你'); //向服务器发送数据
            }
            socket.onmessage = function (e) {
              console.log(e.data); //接收服务器返回的数据
            }
          </script>
          // server.js
          let express = require('express');
          let app = express();
          let wss = new WebSocket.Server({port:3000});
          wss.on('connection',function(ws) {
            ws.on('message', function (data) {
              console.log(data);
              ws.send('我不爱你');
            });
          })
          ```

      - **Node 中间件代理(两次跨域)**

        - 同源策略是浏览器需要遵循的标准，而如果是服务器向服务器请求就无需遵循同源策略

        - 步骤
          - 接受客户端请求
          - 将请求转发给服务器
          - 拿到服务器 响应 数据
          - 将 响应 转发给客户端

      - **nginx 反向代理**

        - 类似于 Node 中间件代理，需要你搭建一个中转 nginx 服务器，用于转发请求
        - 只需要修改 nginx 的配置即可解决跨域问题，支持所有浏览器，支持 session，不需要修改任何代码，并且不会影响服务器性能

        - 实现思路：通过 nginx 配置一个代理服务器（域名与 domain1 相同，端口不同）做跳板机，反向代理访问 domain2 接口，并且可以顺便修改 cookie 中 domain 信息，方便当前域 cookie 写入，实现跨域登录

      - 总结

        - CORS 支持所有类型的 HTTP 请求，是跨域 HTTP 请求的根本解决方案

        - JSONP 只支持 GET 请求，JSONP 的优势在于支持老式浏览器，以及可以向不支持 CORS 的网站请求数据。
        - 不管是 Node 中间件代理还是 nginx 反向代理，主要是通过同源策略对服务器不加限制。
        - 日常工作中，用得比较多的跨域方案是**cors**和**nginx**反向代理

14. **Web 安全问题**

    - **主动攻击**：**攻击者通过直接访问Web应用，把攻击代码传入**的攻击模式。该模式是直接针对服务器上的资源进行攻击，因此攻击者需要能够访问到那些资源
      - **SQL注入攻击**
      - **OS命令注入攻击**
    - **被动攻击：**利用圈套策略执行攻击代码的攻击模式。在被动攻击过程中，**攻击者不直接对目标Web应用访问发起攻击**。攻击者诱使用户触发已设置好的陷阱，之后用户的浏览器会触发事先已设定好陷阱的HTTP请求，运行攻击代码，可能导致用户所持的cookie等被窃取、用户权限遭恶意泄露等后果。
      - **XSS跨站脚本攻击**(Corss-Site Scripting)：浏览器错误地将攻击者提供的用户输入数据当做 javascript 脚本执行了
        - 防御措施：
          - 对数据进行严格的输出编码，使得攻击者提供的数据不再被浏览器认为是脚本而错误执行。例如\<script>编码后成为\&lt;script\&gt;
          - 设置 CSP HTTP Header、输入验证
          - Cookie 设置 HttpOnly 属性，使 js 脚本无法读取到 cookie 信息：`Set-Cookie: name=value; HttpOnly`
          - 开启浏览器 XSS 防御机制：HTTP设置响应首部X-XSS-Protection：1
            - 0： 将XSS过滤设置为无效状态；1：将XSS过滤设置为有效状态
      - **CSRF跨站请求伪造**(Cross-Site Request Forgeries)：指攻击者冒充用户发起请求，在用户不知情的情况下完成一些违背用户意愿的事情
        - 防御措施：
          - 使用 token：服务器产生一个 token 存到 session 中，同时将 token 发送给客户端，客户端提交表单时带上该 token，服务器验证 token 与 session 是否一致，一致就允许访问，否则拒绝访问
          - Referer 验证：只接受本站的请求，服务器才做响应；如果不是，就拦截
          - 使用验证码
      - **HTTP首部注入攻击**
    - **点击劫持**
      - 防御
        - 响应首部 X-Frame-Option，用于控制网站内容在其他Web网站的Frame标签内的显示问题。
          - DENY: 拒绝
          - SAMEORIGIN: 仅同源域名下的页面匹配时许可
    - **不安全的第三方依赖**
    - **DOS(Denial of Service)拒绝服务攻击**
    - 本地存储数据泄露：推荐尽可能不再前端存储重要信息。存在 cookie 中或 localStorage 中的信息进行加密

16. **http1.0, 1.1和2.0**

17. **进程 和 线程**

18. **Socket.io**

> 参考链接
>
> 1. https://juejin.im/post/5bb1cc2af265da0ae5052496
> 2. https://juejin.im/post/6844903824507797518#heading-2
> 3. https://juejin.im/post/5cb5c40ff265da03a158210e#heading-2
> 4. https://zhuanlan.zhihu.com/p/72616216
> 5. https://juejin.im/post/5c6e5803f265da2dc0065437
> 6. https://juejin.im/post/59e4c02151882578d02f4aca
> 7. https://juejin.im/post/5c6f9d24e51d4511dd3fd0a2#heading-14
> 8. https://zhuanlan.zhihu.com/p/34453198?group_id=957277540147056640 ★
> 9. https://juejin.im/post/6854573213523902477
> 10. https://juejin.im/post/6844903928849498119
> 11. https://juejin.im/post/6844904014748844046
> 12. https://insights.thoughtworks.cn/eight-security-problems-in-front-end/
> 13. http://insights.thoughtworks.cn/eight-security-problems-in-front-end-2/
> 14. https://juejin.im/post/6844903942036389895
> 15. https://www.nps.ink/169180.html
> 16. https://www.jianshu.com/p/a2cb1e3a79be
> 17. https://blog.csdn.net/m0_37812513/article/details/78775629
> 18. https://blog.csdn.net/Shuffle_Ts/article/details/93909003