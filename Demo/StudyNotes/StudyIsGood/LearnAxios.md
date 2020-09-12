# Axios

1. **axios**

   - 一个基于 promise 的 HTTP 库，用来请求后台资源的模块

   - 特点

     - 从浏览器中创建 XMLHttpRequests
     - node.js 创建 http 请求
     - 支持 Promise API
     - 拦截请求和响应
     - 转换请求数据和响应数据
     - 取消请求
     - 自动换成 json
     - 客户端支持防御 XSRF

   - axios 中的发送字段的参数是 data 跟 params 两个，两者的区别在于 params 是跟请求地址一起发送的，data 的作为一个请求体进行发送，因此 params 一般适用于 get 请求，data 一般适用于 post、put 请求

   - 安装：`npm install axios —save`

   - 使用： js 中`import` 进来，然后 `.get` 或 `.post` 。如果成功，返回在 `.then` 函数中，失败则是在 `.catch` 函数中

     ```javascript
     // 为给定 ID 的 user 创建请求
     axios
       .get('/user?ID=12345')
       .then(function (response) {
         console.log(response);
       })
       .catch(function (error) {
         console.log(error);
       });

     // 上面的请求也可以这样做
     axios
       .get('/user', {
         params: {
           ID: 12345,
         },
       })
       .then(function (response) {
         console.log(response);
       })
       .catch(function (error) {
         console.log(error);
       });

     // 执行POST请求
     axios
       .post('/user', {
         firstName: 'Fred',
         lastName: 'Flintstone',
       })
       .then(function (response) {
         console.log(response);
       })
       .catch(function (error) {
         console.log(error);
       });

     // 执行多个并发请求
     function getUserAccount() {
       return axios.get('/user/12345');
     }

     function getUserPermissions() {
       return axios.get('/user/12345/permissions');
     }

     axios.all([getUserAccount(), getUserPermissions()]).then(
       axios.spread(function (acct, perms) {
         // 两个请求现在都执行完成
       })
     );
     ```

2. `axios API`

   - axios(config)：可以通过向 `axios` 传递相关配置来创建请求

     ```javascript
     // 发送 POST 请求
     axios({
       method: 'post',
       url: '/user/12345',
       data: {
         firstName: 'Fred',
         lastName: 'Flintstone',
       },
     });

     // 获取远端图片
     axios({
       method: 'get',
       url: 'http://bit.ly/2mTM3nY',
       responseType: 'stream',
     }).then(function (response) {
       response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'));
     });
     ```

   - axios(url[, config])

     ```javascript
     // 发送 GET 请求（默认的方法）
     axios('/user/12345');
     ```

   - 请求方法的别名

     - axios.request(config)
     - axios.get(url[, config])
     - axios.delete(url[, config])
     - axios.head(url[, config])
     - axios.options(url[, config])
     - axios.post(url[, data[,config]])
     - axios.put(url[, data[,config]])
     - axios.patch(url[, data[,config]])

   - 处理并发请求的助手函数

     - **axios.all(iterable)**：同时发起多个请求

     - **axios.spread(callback)**

       ```javascript
       function getUser() {
         return axios.get('/user/1234');
       }

       function getUserPermissions() {
         return axios.get('/user/1234/permissions');
       }

       axios
         .all([getUser(), getUserPermissions()]) // 返回一个数组[res1, res2]
         .then(
           // spread 将数组[res1, res2]展开为 res1, res2
           axios.spread(function (userResp, permResp) {
             // 只有上面的请求全部成功后才能执行此回调函数
             console.log('UserInfo', userResp);
             console.log('permissionInfo', permResp);
           })
         )
         .catch(function (error) {
           // 只要有一个请求失败，都会失败
           console.log(error);
         });
       ```

   - 创建实例：**axios.create([config])**

     ```javascript
     const instance = axios.create({
       baseURL: 'https://some-domain.com/api/',
       timeout: 1000,
       headers: { 'X-Custom-Header': 'foobar' },
     });
     ```

   - 实例方法

     - axios#request(config)
     - axios#get(url[, config])
     - axios#delete(url[, config])
     - axios#head(url[, config])
     - axios#options(url[, config])
     - axios#post(url[, data[, config]])
     - axios#put(url[, data[, config]])
     - axios#patch(url[, data[, config]])

3. **请求配置**

   ```javascript
   {
     // 用于请求的服务器 URL
     url: '/user',

     // 创建请求时使用的方法
     method: 'get', // default

     // 将自动加在 url 前面，除非 url 是一个绝对 URL。
     // 它可以通过设置一个 baseURL 便于为 axios 实例的方法传递相对 URL
     baseURL: 'https://some-domain.com/api/',

     // 允许在向服务器发送前，修改请求数据
     // 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
     // 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
     transformRequest: [function (data, headers) {
       // 对 data 进行任意转换处理
       return data;
     }],

     // 在传递给 then/catch 前，允许修改响应数据
     transformResponse: [function (data) {
       // 对 data 进行任意转换处理
       return data;
     }],

     // 即将被发送的自定义请求头
     headers: {'X-Requested-With': 'XMLHttpRequest'},

     // 即将与请求一起发送的 URL 参数
     // 必须是一个无格式对象(plain object)或 URLSearchParams 对象
     params: {
       ID: 12345
     },

     // 一个负责 params 序列化的函数
     // (e.g. https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/)
     paramsSerializer: function(params) {
       return Qs.stringify(params, {arrayFormat: 'brackets'})
     },

     // 作为请求主体被发送的数据
     // 只适用于这些请求方法 'PUT', 'POST', 和 'PATCH'
     // 在没有设置 `transformRequest` 时，必须是以下类型之一：
     // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
     // - 浏览器专属：FormData, File, Blob
     // - Node 专属： Stream
     data: {
       firstName: 'Fred'
     },

     // 指定请求超时的毫秒数(0 表示无超时时间)
     // 如果请求话费了超过 `timeout` 的时间，请求将被中断
     timeout: 1000,

     // 表示跨域请求时是否需要使用凭证
     withCredentials: false, // default

     // 允许自定义处理请求，以使测试更轻松
     // 返回一个 promise 并应用一个有效的响应 (查阅 [response docs](#response-api)).
     adapter: function (config) {
       /* ... */
     },

     // 表示应该使用 HTTP 基础验证，并提供凭据
     // 这将设置一个 `Authorization` 头，覆写掉现有的任意使用 `headers` 设置的自定义 `Authorization`头
     auth: {
       username: 'janedoe',
       password: 's00pers3cret'
     },

      // 表示服务器响应的数据类型，可以是 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
     responseType: 'json', // default

     // `responseEncoding` indicates encoding to use for decoding responses
     // Note: Ignored for `responseType` of 'stream' or client-side requests
     responseEncoding: 'utf8', // default

      // 用作 xsrf token 的值的cookie的名称
     xsrfCookieName: 'XSRF-TOKEN', // default

     // `xsrfHeaderName` is the name of the http header that carries the xsrf token value
     xsrfHeaderName: 'X-XSRF-TOKEN', // default

      // 允许为上传处理进度事件
     onUploadProgress: function (progressEvent) {
       // Do whatever you want with the native progress event
     },

     // 允许为下载处理进度事件
     onDownloadProgress: function (progressEvent) {
       // 对原生进度事件的处理
     },

      // 定义允许的响应内容的最大尺寸
     maxContentLength: 2000,

     // 定义对于给定的HTTP 响应状态码是 resolve 或 reject  promise 。
     // 如果 validateStatus 返回 true (或者设置为 null 或 undefined)，promise 将被 resolve;
     // 否则，promise 将被 rejecte
     validateStatus: function (status) {
       return status >= 200 && status < 300; // default
     },

     // 定义在 node.js 中 follow 的最大重定向数目
     // 如果设置为0，将不会 follow 任何重定向
     maxRedirects: 5, // default

     // `socketPath` defines a UNIX Socket to be used in node.js.
     // e.g. '/var/run/docker.sock' to send requests to the docker daemon.
     // Only either `socketPath` or `proxy` can be specified.
     // If both are specified, `socketPath` is used.
     socketPath: null, // default

     // httpAgent 和 httpsAgent 分别在 node.js 中用于定义在执行 http 和 https 时使用的自定义代理。允许像这样配置选项：
     // `keepAlive` 默认没有启用
     httpAgent: new http.Agent({ keepAlive: true }),
     httpsAgent: new https.Agent({ keepAlive: true }),

     // proxy 定义代理服务器的主机名称和端口
     // auth 表示 HTTP 基础验证应当用于连接代理，并提供凭据
     // 这将会设置一个 Proxy-Authorization 头，覆写掉已有的通过使用 header 设置的自定义 Proxy-Authorization 头。
     proxy: {
       host: '127.0.0.1',
       port: 9000,
       auth: {
         username: 'mikeymike',
         password: 'rapunz3l'
       }
     },

     // 指定用于取消请求的 cancel token
     // （查看后面的 Cancellation 这节了解更多）
     cancelToken: new CancelToken(function (cancel) {})
   }
   ```

4. **配置默认值**

   - 全局的 axios 默认值

     ```javascript
     axios.defaults.baseURL = 'https://api.example.com';
     axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
     axios.defaults.headers.post['Content-Type'] =
       'application/x-www-form-urlencoded';
     ```

   - 自定义实例默认值

     ```javascript
     // Set config defaults when creating the instance
     const instance = axios.create({
       baseURL: 'https://api.example.com',
     });

     // Alter defaults after instance has been created
     instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;
     ```

   - 配置的优先顺序（后者将优先于前者）

     - 在 `lib/defaults.js` 找到的库的默认值
     - 实例的 `defaults` 属性
     - 请求的 `config` 参数

     ```javascript
     // 使用由库提供的配置的默认值来创建实例
     // 此时超时配置的默认值是 `0`
     var instance = axios.create();

     // 覆写库的超时默认值
     // 现在，在超时前，所有请求都会等待 2.5 秒
     instance.defaults.timeout = 2500;

     // 为已知需要花费很长时间的请求覆写超时设置
     instance.get('/longRequest', {
       timeout: 5000,
     });
     ```

5. **拦截器**

   - 在请求或响应被 `then` 或 `catch` 处理前拦截它们

     ```javascript
     // 添加请求拦截器
     axios.interceptors.request.use(
       function (config) {
         // 在发送请求之前做些什么
         return config;
       },
       function (error) {
         // 对请求错误做些什么
         return Promise.reject(error);
       }
     );

     // 添加响应拦截器
     axios.interceptors.response.use(
       function (response) {
         // 对响应数据做点什么
         return response;
       },
       function (error) {
         // 对响应错误做点什么
         return Promise.reject(error);
       }
     );

     // 若想在稍后移除拦截器
     const myInterceptor = axios.interceptors.request.use(function () {
       /*...*/
     });
     axios.interceptors.request.eject(myInterceptor);

     // 为自定义axios实例添加拦截器
     const instance = axios.create();
     instance.interceptors.request.use(function () {
       /*...*/
     });
     ```

6. **错误处理**

   ```javascript
   axios.get('/user/12345').catch(function (error) {
     if (error.response) {
       // The request was made and the server responded with a status code
       // that falls out of the range of 2xx
       console.log(error.response.data);
       console.log(error.response.status);
       console.log(error.response.headers);
     } else if (error.request) {
       // The request was made but no response was received
       // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
       // http.ClientRequest in node.js
       console.log(error.request);
     } else {
       // Something happened in setting up the request that triggered an Error
       console.log('Error', error.message);
     }
     console.log(error.config);
   });
   ```

7. **取消**

   - 使用 _cancel token_ 取消请求

   - 使用 `CancelToken.source` 工厂方法创建 cancel token

     ```javascript
     const CancelToken = axios.CancelToken;
     const source = CancelToken.source();

     axios
       .get('/user/12345', {
         cancelToken: source.token,
       })
       .catch(function (thrown) {
         if (axios.isCancel(thrown)) {
           console.log('Request canceled', thrown.message);
         } else {
           // 处理错误
         }
       });

     axios.post(
       '/user/12345',
       {
         name: 'new name',
       },
       {
         cancelToken: source.token,
       }
     );

     // 取消请求（message 参数是可选的）
     source.cancel('Operation canceled by the user.');
     ```

   - 通过传递一个 executor 函数到 `CancelToken` 的构造函数来创建 cancel token

     ```javascript
     const CancelToken = axios.CancelToken;
     let cancel;

     axios.get('/user/12345', {
       cancelToken: new CancelToken(function executor(c) {
         // executor 函数接收一个 cancel 函数作为参数
         cancel = c;
       }),
     });

     // cancel the request
     cancel();
     ```

     - 注：可以使用同一个 cancel token 取消多个请求

> 参考链接
>
> 1. http://www.axios-js.com/zh-cn/docs/index.html
