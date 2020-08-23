# **带时效检测的Token机制**

1. **Token出现的背景**

   - 需要登录的网站要管理会话，而HTTP请求是无状态的，所以给每个用户一个会话标识(session id)，客户向服务端发起HTTP请求时，会把这个标识一并带过去。客户端只需要保存自身的session id，而服务器端则要保存所有客户端的session id ，这对服务器说是一个巨大的开销 ， 严重的**限制了服务器扩展能力**，且  session id可以被伪造，**没有采取加密**，一旦攻击者通过session id伪造攻击，就会给服务器带来压力甚至击垮服务器；
   - Token的出现解决了这个问题，因为服务端**不需要存储Token的信息**，而是通过**CPU的计算 + 数据的加密解密再核对Token的方式**来验证用户是否合法（即HTTP请求信息有没有被篡改），让服务器内存得到释放；
   - Token的**作用**主要是：节省服务器内存；数据签名防伪造攻击
   - **Token的优势**
     - 无状态、可扩展：基于这种无状态和不存储Session信息，负载均衡器能够将用户信息从一个服务传到其他服务器上。
     - 安全性：请求中发送token而不再是发送cookie能够防止CSRF(跨站请求伪造)。即使在客户端使用cookie存储token，cookie也仅仅是一个存储机制而不是用于认证。
       - token是**有时效**的，一段时间之后用户需要重新验证。我们也不一定需要等到token自动失效，**token有撤回的操作**，通过**token revocataion**可以使一个特定的token或是一组有相同认证的token无效。
     - 可扩展性：Token能够创建与其它程序共享权限的程序。
       - 使用token时，可以提供可选的权限给第三方应用程序。当用户想让另一个应用程序访问它们的数据，我们可以通过建立自己的API，得出特殊权限的tokens。
     - 多平台跨域：只要用户有一个通过了验证的token，数据和资源就能够在任何域上被请求到

2. Token的原理

   - **后端不在存储认证信息，而是在用户登录的时候生成一个token，然后返回给前端，前端进行存储，在需要进行验证的时候将token一并发送到后端，后端进行验证**
   - **加密方式**：对称加密和非对称加密，对称加密指的是加密解密使用同一个密钥，非对称加密使用公钥和私钥，加密用私钥加密，解密用公钥解密

   - 实现原理

     - ![image](https://img-blog.csdnimg.cn/20191026104926702.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0F3YXlGdXR1cmU=,size_16,color_FFFFFF,t_70)

     - 将荷载payload，以及Header信息进行Base64加密，形成密文payload密文，header密文
     - 将形成的密文用句号链接起来，用服务端秘钥进行HS256加密，生成签名
     - 将前面的两个密文后面用句号链接签名形成最终的token返回给服务端

   - 说明

     - 用户请求时携带此token（分为三部分，header密文，payload密文，签名）到服务端，服务端解析第一部分（header密文），用Base64解密，可以知道用了什么算法进行签名，此处解析发现是HS256。
     - 服务端使用原来的秘钥与密文(header密文+"."+payload密文)同样进行HS256运算，然后用生成的签名与token携带的签名进行对比，若一致说明token合法，不一致说明原文被修改。
     - 判断是否过期，客户端通过用Base64解密第二部分（payload密文），可以知道荷载中授权时间，以及有效期。通过这个与当前时间对比发现token是否过期。

3. 登录业务的相关技术点

   - http是无状态的
   - 通过cookie在客户端记录状态
   - 通过session在服务器端记录状态
   - 通过token方式维持状态（存在跨域情况下）

4. 使用token登录

   - ![token](https://img-blog.csdnimg.cn/20181219101056358.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3UwMTQzMjIyMDY=,size_16,color_FFFFFF,t_70)

   - 过程：

     ① 用户首次登录，将输入的账号和密码提交给服务器

     ② 服务器对输入内容进行校验，若账号和密码匹配则验证通过，登录成功，并生成一个token值（包含 payload(数据)和cert(密钥)确定加密方式），将其保存到数据库，并返回给客户端

     ③ 客户端拿到返回的token值将其保存在本地（如cookie/local storage），作为公共参数，以后每次请求服务器时都携带该token（放在响应头里），提交给服务器进行校验

     ④  服务器接收到请求后，首先验证是否携带token，若携带则取出请求头里的token值与数据库存储的token进行匹配校验，若token值相同则登录成功，且当前正处于登录状态，此时正常返回数据，让app显示数据；若不存在或两个值不一致，则说明原来的登录已经失效，此时返回错误状态码，提示用户跳转至登录界面重新登录

     ⑤ 注意：用户每进行一次登录，登录成功后服务器都会更新一个token新值返回给客户端

5. 登录：绘制登录页面 -> 表单数据绑定 -> 表单数据验证 -> 配置axios发起登录请求 -> 路由导航守卫控制页面访问权限 -> 退出功能

   - 路由导航守卫：`router.beforeEach(to, from, next)`，如果没有登录，但是直接通过URL访问特定页面，需要重新导航到登录页面

     ```javascript
     router.beforeEach((to, from, next) => {
       // 如果用户访问的登录页面，直接放行
       if(to.path === '/login') return next();
       // 从sessionStorage中获取到保存的token值
       const tokenStr = window.sessionStorage.getItem('token');
       // 没有token，强制跳转到登录页
       if(!tokenStr) return next('/login');
       next();
     })
     ```

   - 退出：销毁本地token即可，这样后续的请求就不会携带token，必须重新登录生成一个新的token之后才可以访问页面

     ```javascript
     // 清空token
     window.sessionStorage.clear();
     // 跳转到登录页
     this.$router.push('/login')
     ```

   - 通过axios请求拦截器添加token，保证拥有获取数据的权限

     ```javascript
     // axios请求拦截
     axios.interceptors.request.use(config => {
       // 为请求头对象，添加token验证的Authorization字段
       config.headers.Authorization = window.sessionStorage.getItem('token');
       return config;
     })
     ```

> 参考链接： 
>
> 1. https://blog.csdn.net/u014322206/article/details/85089481
> 2. https://blog.csdn.net/qq_38045106/article/details/83549444