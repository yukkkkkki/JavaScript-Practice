# HTML

1. **语义化**
   - 去掉或者丢失样式的时候能够让页面呈现出清晰的结构
   - 有利于 SEO：和搜索引擎建立良好沟通，有助于爬虫抓取更多的有效信息：爬虫依赖于标签来确定上下文和各个关键字的权重；
   - 方便其他设备解析（如屏幕阅读器、盲人阅读器、移动设备）以意义的方式来渲染网页；
   - 便于团队开发和维护，语义化更具可读性，是下一步吧网页的重要动向，遵循 W3C 标准的团队都遵循这个标准，可以减少差异化。

2. **H5 新特性**

   - 语义化标签

     - \<header>, \<footer> , \<nav>, \<section>, \ <article>, \<aside>, \<details>, \<summary>, \ <dialog>, \<figure>, \<main>, \<mark>, \<time>
   - **增强型表单**：input的多个type：color、date、datetime、email、month、number、range、search、tel、time、url、week
   - **新增表单元素**：
     - \<datalist> 用户会在他们输入数据时看到域定义选项的下拉列表
     - \<progress> 进度条，展示连接/下载进度
     - \<meter> 刻度值，用于某些计量，例如温度、重量等
     - \<keygen> 提供一种验证用户的可靠方法
     - \<output> 用于不同类型的输出
   - **新增表单属性**：
     - placehoder 输入框默认提示文字
     - required 要求输入的内容是否可为空
     - pattern 描述一个正则表达式验证输入的值
     - min/max 设置元素最小/最大值
     - step 为输入域规定合法的数字间隔
     - height/wdith 用于 image 类型\<input>标签图像高度/宽度
     - autofocus 规定在页面加载时，域自动获得焦点
     - multiple 规定\<input>元素中可选择多个值
   - **音频和视频**
   - \<audio>、\<video>
   - Canvas 绘图
   - SVG 绘图
   - 地理定位 getCurrentPosition()
   - 拖拽 API
   - Web Worker
   - **WebStorage**
     - localStorage： 没有时间限制的数据存储
     - sessionStorage ：针对一个 session 的数据存储，关闭浏览器窗口后数据会被删除
   - **新事件**：onresize、ondrag、onscroll、onmousewheel、onerror、onplay、onpause
   - **WebSocket**：单个 TCP 连接上进行全双工通讯的协议

3. **Canvas 绘图**

4. **SVG 绘图**

5. **拖放 API**

   > `<div draggable="true"></div>`

   | 事件      | 产生事件的元素           | 描述                                     |
   | --------- | ------------------------ | ---------------------------------------- |
   | dragstart | 被拖放的元素             | 开始拖放操作                             |
   | drag      | 被拖放的元素             | 拖放过程中                               |
   | dragenter | 拖放过程中鼠标经过的元素 | 被拖放的元素开始进入本元素的范围内       |
   | dragover  | 拖放过程中鼠标经过的元素 | 被拖放的元素正在本元素的范围内移动       |
   | dragleave | 拖放过程中鼠标经过的元素 | 被拖放的元素离开本元素的范围             |
   | drop      | 拖放的目标元素           | 有其他元素被拖放到本元素中               |
   | dragend   | 拖放的对象元素           | 拖放操作结束                             |
   | dragexit  | 拖放的对象元素           | 当元素变得不再是拖动操作的选中目标时触发 |



> 参考数据
>
> 1. https://www.cnblogs.com/ainyi/p/9777841.html
> 2. https://www.cnblogs.com/binguo666/p/10928907.html
> 3. https://www.cnblogs.com/staven/p/4774263.html
> 4. https://developer.mozilla.org/zh-CN/docs/Web/API/HTML_Drag_and_Drop_API
> 5. https://www.cnblogs.com/ljwk/p/7090320.html

