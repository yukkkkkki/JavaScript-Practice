# CSS

1. **BFC**

   - 块级格式化上下文，是一个独立的渲染区域，让处于 BFC 内部的元素与外部的元素相互隔离，使内外元素的定位不会相互影响。（盒子里面的子元素的样式不会影响到外面的元素）

   - 规则

     - 属于同一个 BFC 的两个相邻 Box：垂直排列、margin 会发生重叠
     - BFC 中子元素的 margin box 的左边，与包含块 (BFC) border box 的左边相接触 (子元素 absolute 除外)
     - BFC 的区域不会与 float 的元素区域重叠(防止浮动文字环绕)
     - 计算 BFC 的高度时，浮动子元素也参与计算
     - 文字层不会被浮动层覆盖，环绕于周围

   - 触发条件

     - 浮动元素，float !== none
     - 定位元素，position（absolute,fixed）
     - display: inline-block / table-cell/table-caption
     - overflow !== visible （为 hidden/auto/scroll）

   - 应用
     - 阻止 margin 重叠
     - 可以包含浮动元素 —— 清除内部浮动(清除浮动的原理是两个 div 都位于同一个 BFC 区域之中)
     - 自适应两栏布局
     - 可以阻止元素被浮动元素覆盖

2. **盒模型**

   - 外边距(margin)、边框(border)、内边距(padding)、内容(content)

   - 两种模式:
     - 标准模式: box-sizing: content-box(默认); 宽高不包括内边距和边框
     - 怪异模式: box-sizing: border-box

3. **负外边距**

   - margin-left/margin-top 的负外边距会把元素向左/上拉，盖住其旁边的元素

   - margin-right/margin-bottom 的负外边距会把相邻元素向左/上拉，盖住设置了负外边距的元素

   - 在浮动元素上

     - 与浮动方向相反的负外边距会导致浮动区域缩小，使得相邻元素盖住浮动元素
     - 与浮动方向相同的负外边距会在该方向上把浮动元素向外拉

   - 给未声明宽度的非浮动元素应用负外边距时，左右负外边距会向外拉伸元素，导致元素扩张，有可能盖住相邻元素

4. **CSS 选择器**

   - | 选择器         | 示例              | 描述                                               |
     | -------------- | ----------------- | -------------------------------------------------- |
     | 通配符选择器   | \*                | 选择所有元素                                       |
     | id 选择器      | `#myid`           | 选择 id='`myid`'的所有元素                         |
     | 类选择器       | `.myClass`        | 选择 class='`myClass`'的所有元素                   |
     | 标签选择器     | div               | 选择所有 div 元素                                  |
     | 相邻选择器     | `h1 + p`          | 选择 h1 元素之后紧跟着的同级 p 元素，强调**单个**  |
     |                | `h1 ~ p`          | 选择 h1 元素之后**所有**同级的 p 元素              |
     | **子选择器**   | `ul > li`         | 选择父元素为`ul`的所有`li`元素                     |
     | **后代选择器** | li a              | 选择`li`内部的所有 a 元素                          |
     | 属性选择器     | `[target]`        | 选择带有 target 属性所有元素                       |
     |                | `[target=_blank]` | 选择 target="\_blank" 的所有元素                   |
     |                | `[title~=flower]` | 选择 title 属性包含单词 "flower" 的所有元素        |
     |                | `[lang            | =en]`                                              | 选择 `lang` 属性值以 `"en"` 开头的所有元素 |
     |                | `a[src^="https"]` | 选择其 `src` 属性值以 "https" 开头的每个 \<a> 元素 |

   - 伪类选择器(a:hover, li:nth-child)

     - **超链接伪类**：

       | 选择器           | 说明                           |
       | ---------------- | :----------------------------- |
       | a:link           | 未访问                         |
       | a:visited        | 访问过                         |
       | a:hover, a:focus | 鼠标悬停，获取键盘焦点         |
       | a:active         | 活动状态                       |
       | :target          | 用于控制具有锚点目标元素的样式 |
       | :root            | 根元素选择伪类即选择 html      |
       | :empty           | 没有内容和空白的元素           |

     - **结构伪类**

       | 选择器               | 示例                    | 说明                                                                                                                                   |
       | :------------------- | :---------------------- | :------------------------------------------------------------------------------------------------------------------------------------- |
       | :first-child         | p:first-child           | 选择器匹配 p 的父元素的第一个 p 元素                                                                                                   |
       | :last-child          | p:last-child            | 选择所有 p 元素的最后一个子元素                                                                                                        |
       | :first-of-type       | p:first-of-type         | 选择的每个 p 元素是其父元素的第一个 p 元素                                                                                             |
       | :last-of-type        | p:last-of-type          | 选择每个 p 元素是其父元素的最后一个 p 元素                                                                                             |
       | :only-child          | p:only-child            | 选择所有仅有一个子元素的 p 元素                                                                                                        |
       | :only-of-type        | p:only-of-type          | 选择所有仅有一个子元素为 p 的元素                                                                                                      |
       | **:nth-child(n)**    | p:nth-child(2/odd/even) | 选择其父元素第二/奇数/偶数个子元素为 P 的元素。<br />eg：div p:nth-child(2)表示 div 下的第二的 P 元素，如果不是 p 元素则没有匹配的元素 |
       | :nth-last-child(n)   | p:nth-last-child(2)     | 选择所有 p 元素倒数的第二个子元素                                                                                                      |
       | **:nth-of-type(n)**  | p:nth-of-type(2)        | 选择父元素下第二个为 p 元素的子元素<br />eg：div p:nth-of-type(2)表示 div 下的第二个ｐ元素                                             |
       | :nth-last-of-type(n) | p:nth-last-of-type(2)   | 选择所有 p 元素倒数的第二个为 p 的子元素                                                                                               |
       | :not(selector)       | :not(p)                 | 选择所有 p 以外的元素                                                                                                                  |

     - **表单伪类**

       | 伪类      | 说明                               |
       | --------- | ---------------------------------- |
       | :enabled  | 选择所有启用的表单元素             |
       | :disabled | 选择所有禁用的表单元素             |
       | :checked  | 选择所有选中的表单元素             |
       | :required | 选择有"required"属性指定的元素属性 |
       | :optional | 选择没有"required"的元素属性       |
       | :valid    | 选择所有有效值的属性               |
       | :invalid  | 选择所有无效的元素                 |

     - **字符伪类**

       | 字符伪类      | 说明                         |
       | ------------- | ---------------------------- |
       | :first-letter | 选择每个元素的首字母         |
       | :first-line   | 选择每个元素的首行           |
       | :before       | 在每个元素的内容之前插入内容 |
       | :after        | 在每个元素的内容之后插入内容 |

   - 伪元素选择器

     - ::first-letter、::first-line、::before、::after
     - **伪类**选择元素**基于的是当前元素处于的状态**，或者说元素当前所具有的特性，而不是元素的 id、class、属性等静态的标志。由于状态是动态变化的，所以一个元素达到一个特定状态时，它可能得到一个伪类的样式；当状态改变时，它又会失去这个样式。由此可以看出，它的功能和 class 有些类似，但它是基于文档之外的抽象，所以叫伪类。
     - **伪元素**是**对元素中的特定内容进行操作**，它所操作的层次比伪类更深了一层，也因此它的动态性比伪类要低得多。实际上，设计伪元素的目的就是去选取诸如元素内容第一个字（母）、第一行，选取某些内容前面或后面这种普通的选择器无法完成的工作。它控制的内容实际上和元素是相同的，但是它本身只是基于元素的抽象，并不存在于文档中，所以叫伪元素。

   - **选择器优先级(权重)**：!important(∞) > 行内样式(1000) > #id(100) > .class(10) > tag(1) > \* > 继承 > 默认

     - 两个权重不同的选择器作用在同一元素上，权重值高的 css 规则生效

     - 两个相同权重的选择器作用在同一元素上：以后面出现的选择器为最后规则

     - 权重相同时，与元素距离近的选择器生效

       ```html
       #content h1 { // css样式表中 padding: 5px; }
       <style type="text/css">
         #content h1 {
           // html头部 因为html头部离元素更近一点，所以生效
           padding: 10px;
         }
       </style>
       ```

     - 嵌套越多，权重就越大(尽量避免嵌套)

     - 伪类的权重，相当于类元素的权重

     - 关于!important 应该注意

       - 用于提升指定样式规则的应用优先权
       - !important 的作用是给当前样式加权重，但不能多次叠加
       - !important 优先级最高，但也会被权重高的 important 所覆盖
       - 不推荐使用!important，因为!important 根本没有结构与上下文可言，并且很多时候权重的问题，就是因为不知道在哪里定义了一个!important 而导致的

5. **id 和 class 的区别**

   - class 是设置标签的类，用于指定元素属于何种样式的类。在 CSS 样式中以"."来命名

   - id 是设置标签的标识。用于定义一个元素的独特的样式。在 CSS 样式定义的时候 以"#"来开头命名 id 名称

     - 具有唯一性且优先级高
     - 用于区分不同结构和内容

   - class 可以重复，**id 是唯一的**(id 属性一般在一个页面中只可以使用一次，而 class 可以被多次引用)

   - 在布局思路上，一般坚持这样的原则：**id 是先确定页面的结构和内容，然后再为它定义样式**；而 class 相反，它先定义好一类样式，然后再页面中根据需要把类样式应用到不同的元素和内容上面

6. **Flex 弹性布局**

   - **flex-direction**：控制元素在主副轴排列的方向
- row：从左到右水平排列元素（默认值）
     - row-reverse: 从右向左排列元素
     - column：从上到下垂直排列元素
     - column-reverse：从下到上垂直排列元素
   - **flex-wrap**：控制换行(默认不换行)
- nowrap：不拆行或不拆列
     - wrap：在必要的时候拆行或拆列
  - wrap-reverse：在必要的时候以相反的顺序拆行或拆列
   - **flex-flow**：是 flex-direction 与 flex-wrap 的组合简写模式
   - **justify-content**：元素在主轴对齐方式
   - flex-start：紧靠主轴起点
  - flex-end：紧靠主轴终点
     - center：从弹性容器中心开始
  - **space-between**：第一个元素靠起点，最后一个元素靠终点，余下元素平均分配空间
     - **space-around**：**每个元素两侧的间隔相等**
  - **space-evenly**：**元素间距离平均分配**
   - **align-items**：容器中**所有元素**在交叉轴对齐方式
   - center：位于容器的中心
     - flex-start：位于容器的交叉轴开头
     - flex-end：位于容器的交叉轴结尾
     - stretch：元素被拉伸以适应容器(默认值)
   - **align-self**：用于控制**单个元素**在交叉轴上的排列方式
- **align-content**：只适用于多行显示的弹性容器，作用是当 flex 容器在交叉轴上有多余的空间时，对元素的对齐处理
   - stretch：将空间平均分配给元素
  - flex-start：元素紧靠主轴起点
     - flex-end：元素紧靠主轴终点
     - center：元素从弹性容器中心开始
     - space-between：第一个元素靠起点，最后一个元素靠终点，余下元素平均分配空间
     - space-around：每个元素两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍
  - space-evenly：元素间距离平均分配
   - **flex-grow**：将弹性盒子的**剩余可用空间按照比例分配给弹性元素**。使用整数或小数声明
- **flex-shrink**：与 flex-grow 相反，flex-shrink 是**在弹性盒子装不下元素时定义的缩小值**
   - **flex-basis**：定义了**在分配多余空间之前，项目占据的主轴空间**(main size)。浏览器根据这个属性，计算主轴是否有多余空间
- flex：是 flex-grow、flex-shrink 、flex-basis 缩写组合。
   - **决定flex-items最终basis size的元素优先级**：max-width\max-height\min-width\min-height、flex-basis、width\height、内容本身的size
   
7. **定位布局Position**

   - **static**：默认形为，参考文档流，块级元素垂直堆叠

   - **relative相对定位**

     - **相对于自身原来的位置定位**，设置偏移量的时候，原位置留白

     - 元素设置此属性之后保留原来位置，**仍然处在文档流中**，不影响其他元素的布局

       ```css
       .box2 {
         height: 100px;
         background-color: green;
         position: relative;
         left: 50px;
         top: 50px;
       }
       ```

     - ![image](https://www.runoob.com/wp-content/uploads/2018/04/1523584580-5788-20160715092656576-1570070204.png)

   - **absolute绝对定位**：

     - **相对于离元素最近的设置了绝对或相对定位的父元素决定的**（离自己最近的不是static的父元素），如果没有祖先元素或者祖先元素没有定位，元素相对于根元素定位（即html元素）

     - 元素会**脱离文档流**，不受文档流影响，如果设置偏移量，会影响其他元素的位置定位

     - 元素在**没有定义宽度**的情况下，**宽度由元素里面的内容决定**，效果和用float方法一样 

       ```css
       .box5 {
         height: 100px;
         background-color: cyan;
         position: absolute;
         left: 50px;
         top: 50px;
       }
       ```

     - ![image](https://www.runoob.com/wp-content/uploads/2018/04/1523584581-9960-20160715093416842-596966947.png)

     - 应用场景

       - 利用初始位置、创建三角形
       - 利用偏移实现自动大小 > 图片上放置一个半透明盒子，相对于右、下、左绝对定位

   - **fixed固定定位**：元素的位置相对于浏览器窗口进行定位，不会随着滚动条的滚动而改变位置。固定定位不占有原先的位置

   - **sticky粘性定位**：

     - 基于用户的滚动位置来定位，在 `position:relative` 与 `position:fixed` 定位之间切换：它的行为就像 `position:relative`; 而当页面滚动超出目标区域时，它的表现就像 `position:fixed;`，它会固定在目标位置。
     - 必须添加 top、left、right、bottom 其中的一个才有效

8. **z-index**

   - 可以控制盒子层叠的次序。属性值越大，盒子在层叠中的次序就越靠近用户的眼睛

     - 谁大谁上；大小一样，后来居上

   - 在一个堆叠上下文内部，无论 z-index 值多大或多小，都不会影响其他堆叠上下文。

   - 堆叠上下文(stacking context)：影响的是元素 CSS 属性中的 z-index，父元素是否是堆叠上下文，对具有 z-index 属性的子元素的堆叠顺序有影响

     层叠上下文由满足以下任意一个条件的元素形成

     - 根元素(HTML)
     - z-index !== auto 的绝对/相对定位
     - z-index !== auto 的 flex item
     - position: fixed
     - opacity < 1
     - transform !== none
     - mix-blend-mode !== normal
     - filter !== none
     - perspective !== none
     - isolation: isolate
     - -webkit-overflow-scrolling: touch

   - z 轴元素堆叠顺序

     - 普通块级元素中：正 z-index > 内联元素 > 浮动元素 > 块级元素 > border > background >负 z-index

     - 堆叠上下文中：正 z-index > 内联元素 > 浮动元素 > 块级元素 > 负 z-index > border > background

9. **网格布局(Grid)**

10. **浮动布局**

    - float：定义元素在哪个方向浮动

      - left 向左浮动
      - right 向右浮动
      - none 不浮动

    - 元素浮动后会变为块元素，可以设置宽高

    - clear：用于清除元素浮动影响

11. **清除浮动**

    浮动元素碰到包含它的边框或者浮动元素的边框停留。由于浮动元素不在文档流中，所以文档流的块框表现得就像浮动框不存在一样。浮动元素会漂浮在文档流的块框上

    - 浮动带来的问题：

      - 父元素的高度无法被撑开，影响与父元素同级的元素
      - 与浮动元素同级的非浮动元素（内联元素）会跟随其后
      - 若非第一个元素浮动，则该元素之前的元素也需要浮动，否则会影响页面显示的结构
    - 清除浮动的方法：
      - 额外标签法：在父元素内部最后面添加一个没有高度的子元素，并使用 clear:both(不推荐)
        - 使用 ::after 伪元素为父元素添加后标签
        - 使用 before 和 after 双伪元素清除浮动
        - 通过添加父元素并设置 overflow:hidden (触发 BFC)
        - **overflow 原理**：该属性进行超出隐藏时需要计算盒子内所有元素的高度, 所以会隐式清除浮动

12. **overflow**

    - overflow 属性规定当内容溢出元素框时发生的事情

    - | 值      | 描述                                                   |
      | ------- | :----------------------------------------------------- |
      | visible | 默认值。内容不会被修剪，会呈现在元素框之外             |
      | hidden  | 内容会被修剪，并且其余内容是不可见的                   |
      | scroll  | 内容会被修剪，但是浏览器会显示滚动条以便查看其余的内容 |
      | auto    | 如果内容被修剪，则浏览器会显示滚动条以便查看其余的内容 |
      | inherit | 规定应该从父元素继承 overflow 属性的值                 |

    - overflow 的作用：

      - 溢出隐藏

        给一个元素设置了 overflow: hidden，那么该元素的内容若超出了给定的宽度和高度属性，那么超出的部分将会被隐藏，不占位

        ```html
        <style type="text/css">
          div {
            width: 150px;
            height: 60px;
            background: skyblue;
            overflow: hidden; /*溢出隐藏*/
          }
        </style>
        <div style="">
          今天天气很好！<br />今天天气很好！<br />
          今天天气很好！<br />今天天气很好！<br />
        </div>
        ```

      - 清除浮动

        - 盒子塌陷：当父元素没有足够大小的时候，而子元素设置了浮动的属性，子元素就会跳出父元素的边界（脱离文档流），尤其是当父元素的高度为 auto 时，父元素没有其他非浮动的可见元素 ，父元素就会塌陷为零，我们称为 CSS 高度塌陷。

        - 解决方法：父元素设置 overflow: hidden

          ```html
          <style>
            .box2 {
              overflow: auto;
              width: 100px;
              height: 100px;
              background: red;
            }
          </style>

          <div class="container">
            <div class="box1"></div>
            <div class="box2"></div>
          </div>
          ```

      - 解决外边距塌陷

        - 父级元素内部有子元素，如果给子元素添加 margin-top 样式，那么父级元素也会跟着下来，造成外边距塌陷

        - 解决方法：父元素添加 overflow: hidden

          ```html
          /*css样式*/
          <style type="text/css">
            .box {
              background: skyblue;
              overflow: hidden; /*解决外边距塌陷*/
            }
            .kid {
              width: 100px;
              height: 100px;
              background: yellow;
              margin-top: 20px;
            }
          </style>

          /*html*/
          <body>
            <div class="box">
              <div class="kid">子元素1</div>
            </div>
          </body>
          ```

13. **元素垂直/居中**

    - 水平居中

      - 行内元素: text-align: center
      - 块级元素：margin: 0 auto
      - absolute + transform
      - flex + justify-content: center

    - 垂直居中

      - line-height: height
      - absolute + transform
      - flex + align-items: center
      - table

      - 行内块的垂直居中(display:inline-block)：vertical-align: middle
      - 容器元素中垂直居中：用::before 伪元素(占据 100%容器高度)，设置 vertical-align：middle

      - 容器内只有一个元素时，display:flex + margin:auto

    - 水平垂直居中

      - absolute + transform
      - flex + justify-content + align-items
      
    - **未知宽高的元素水平垂直居中**
    
      1.  通过定位和 transform 来实现(absolute + transform)(子绝父相)
    
      ```CSS
      .parent {
          width: 100%;
          height: 400px;
          background: relative;
          position: relative;
      }
      
      .children {
          position: absolute;
          top: 50%;
          left: 50%;
          background: red;
          transform: translate(-50%, -50%);
      }
      ```
    
      2. 利用 flex 布局来实现(flex + justify-content + align-items)
    
         ```css
         .parent {
           width: 100%;
           height: 400px;
           background: #666;
           display: flex;
           align-items: center;
           justify-content: center;
         }
         
         .children {
           background: red;
         }
         ```
    
      3. 将父元素设置为 table，子元素设置为 table-cell，利用 table 属性(table + table-cell + vertical-align + text-align)
    
         ```css
         .parent {
           display: table;
           width: 100%;
           height: 400px;
           background: #666;
         }
         .children {
           display: table-cell;
           vertical-align: middle;
           text-align: center;
           background: red;
         }
         ```
    
    - **高度不定，宽 100%，内一 p 高不确定，如何实现垂直居中?**
    
      - verticle-align: middle;
      - 绝对定位 50%加 translateY(-50%)
      - 绝对定位，上下左右全 0，margin:auto

13. **CSS 动画**

    先定义 @keyframes 规则（0%，100% | from，to）

    - from 表示起始点
    - to 表示终点

    然后定义 animation，以下参数可直接写在 animation 后面

    - animation: name duration timing-function delay iteration-count direction fill-mode play-state;

    | 值                        | 描述                                                                                 |
    | ------------------------- | ------------------------------------------------------------------------------------ |
    | animation-name            | 指定要绑定到选择器的动画的名称                                                       |
    | animation-duration        | 动画指定需要多少秒或毫秒完成。如果动画数量大于时间数量，将重新从时间列表中计算       |
    | animation-timing-function | 设置动画将如何完成一个周期                                                           |
    | animation-delay           | 定义过渡效果何时开始                                                                 |
    | animation-iteration-count | 指定元素播放动画的循环次数。(infinite 表示无限循环执行)                              |
    | animation-direction       | 指定元素动画播放的方向                                                               |
    | animation-fill-mode       | 规定当动画不播放时(当动画完成时，或当动画有一个延迟未开始播放时)，要应用到元素的样式 |
    | animation-play-state      | 指定动画是否正在运行或已暂停                                                         |
    | initial                   | 设置属性为其默认值                                                                   |
    | inherit                   | 从父元素继承属性                                                                     |

    - animation-name

      - 使用多个动画时用逗号分隔
      - 多个动画有相同属性时，后面动画的属性优先使用

    - animation-direction

      - normal：从 0%到 100%运行动画
      - reverse：从 100%到 0%运行动画
      - alternate：先从 0%到 100%，然后从 100%到 0%
      - alternate-reverse：先从 100%到 0%，然后从 0%到 100%

    - animation-delay：liner | ease | ease-in | ease-out | ease-in-out | cubic-bezier(n,n,n,n)

    - animation-play-state

      - paused：暂停
      - running：运行

    - animation-fill-mode
      - none：需要等延迟结束，起始帧属性才应用
      - backwards：动画效果在起始帧，不等延迟结束
      - forwards：结束后停留动画的最后一帧
      - both：包含 backwards 与 forwards 规则，即动画效果在起始帧，不等延迟结束，并且在结束后停止在最后一帧

14. **过渡延迟**

    - transition: property duration timing-function delay;

    | 值                         | 描述                                                                  |
    | -------------------------- | --------------------------------------------------------------------- |
    | transition-property        | 规定设置过渡效果的 CSS 属性的名称。默认值为 all，多个属性使用逗号分隔 |
    | transition-duration        | 规定完成过渡效果需要多少秒或毫秒                                      |
    | transition-timing-function | 规定速度效果的速度曲线                                                |
    | transition-delay           | 定义过渡效果何时开始。                                                |

    - transition-duration：

      - 默认值为 0s 不产生过渡效果；
      - 一个值时，所有属性使用同样的时间
      - 二个值时，奇数属性使用第一个，偶数属性使用第二个
      - 变化属性数量大于时间数量时，后面的属性再从第一个时间开始重复使用

    - transition-timing-function

      | 值                  | 描述                                                                  |
      | ------------------- | --------------------------------------------------------------------- |
      | linear              | 规定以相同速度开始至结束的过渡效果（等于 cubic-bezier(0,0,1,1)）      |
      | ease                | 开始慢，然后快，慢下来，结束时非常慢（cubic-bezier(0.25,0.1,0.25,1)） |
      | ease-in             | 开始慢，结束快（等于 cubic-bezier(0.42,0,1,1)）                       |
      | ease-out            | 开始快，结束慢（等于 cubic-bezier(0,0,0.58,1)）                       |
      | ease-in-out         | 中间快，两边慢（等于 cubic-bezier(0.42,0,0.58,1)）                    |
      | cubic-bezier(n,n,n) | 在 cubic-bezier 函数中定义自己的值                                    |

      - cubic-bezier(\<x1>, \<y1>, \<x2>, \<y2>)
      - 步进速度

        - steps(n,start)：设置 n 个时间点，第一时间点变化状态
        - steps(n,end)：设置 n 个时间点，第一时间点初始状态
        - step-start：等于 steps(1,start)，可以理解为从下一步开始
        - step-end：等于 steps(1,end)，可以理解为从当前步开始

      - transition-delay
        - 默认为 0s 即立刻开始过渡
        - 值可以为负数
        - 变化属性数量大于时间数量时，后面的属性再从第一个时间开始重复使用

15. **link 与 @import 的区别**

    - link 功能较多，可以定义 RSS，定义 Rel 等作用，而@import 只能用于加载 css
    - 当解析到 link 时，页面会同步加载所引的 css，而@import 所引用的 css 会等到页面加载完才被加载
    - @import 需要 IE5 以上才能使用
    - link 可以使用 js 动态引入，@import 不行

16. **纯 css 实现三角形**

    ```css
    /* 宽高都给0，通过设置border的颜色来实现 */
    .box {
      width: 0px;
      height: 0px;
      border-top: 50px solid rgba(0, 0, 0, 0);
      border-right: 50px solid rgba(0, 0, 0, 0);
      border-bottom: 50px solid green;
      border-left: 50px solid rgba(0, 0, 0, 0);
    }
    ```

17. **至少两种方式实现自适应搜索**

18. **CSS3 新特性**

    - **伪类/伪元素选择器**

    - **@Font-face**：加载字体样式。还能够加载服务器端的字体文件，让客户端显示客户端所没有安装的字体。

    - **边框**：border-radius(圆角)、border-image(边框图片)、box-shadow / text-shadow(阴影)

    - **背景**：background-size：规定背景图片的尺寸；background-origin：规定背景图片的定位区域

    - **颜色**：rgba(rgb 为颜色值，a 为透明度)

    - **文本**

      - text-shadow：向文本添加阴影

      - text-justify：规定当 text-align 设置为 “justify” 时所使用的对齐方法
      - text-emphasis：向元素的文本应用重点标记以及重点标记的前景色
      - text-outline：规定文本的轮廓
      - text-overflow：规定当文本溢出包含元素时发生的事情
      - text-wrap：规定文本的换行规则
      - word-break：规定非中日韩文本的换行规则
      - word-wrap：允许对长的不可分割的单词进行分割并换行到下一行
      - text-decoration：文本修饰符：overline(上划线)、line-through(中划线)、underline(下划线)

    - **渐变**

    - linear-gradient()：创建一个线性渐变的 "图像"。
      
      - radial-gradient()：用径向渐变创建 "图像"
      
    - **2D 转换**(transform)

    - translate()：元素从其当前位置移动，根据给定的 left(x 坐标) 和 top(y 坐标) 位置参数
      - rotate()：元素顺时针旋转给定的角度。若为负值，元素将逆时针旋转。
      - scale()：元素的尺寸会增加或减少，根据给定的宽度(X 轴)和高度(Y 轴)参数，也可以一个值(宽高)
      - skew()：元素翻转给定的角度，根据给定的水平线(X 轴)和垂直线(Y 轴)参数
      - matrix()：把所有 2D 转换方法组合在一起，需要六个参数，包含数学函数，允许：旋转、缩放、移动以及倾斜元素。
      
    - **3D 转换**

    - rotateX()：元素围绕其 X 轴以给定的度数进行旋转
      - rotateY()：元素围绕其 Y 轴以给定的度数进行旋转
      - perspective：规定 3D 元素的透视效果
      
    - **动画** animation

    - **过渡** transition

    - **多列布局**

      - column-count: 规定元素应该被分隔的列数

      - column-gap: 规定列之间的间隔
      - column-rule: 设置列之间的宽度、样式和颜色规则

    - 用户界面

      - resize：规定是否可由用户调整元素尺寸
        如果希望此属性生效，需要设置元素的 overflow 属性，值可以是 auto、hidden 或 scroll
      - box-sizing：
        - content-box：W3C 的标准盒模型。元素宽度 = 内容宽度 + padding + border
        - border-box：怪异盒模型。元素宽度 = 设定的宽度，padding 和 border 包括进去了
        - inherit：规定应从父元素继承 box-sizing 属性的值
      - outline-offset：对轮廓进行偏移，并在超出边框边缘的位置绘制轮廓

    - **弹性布局 Flex**

    - **栅格布局 Grid**

    - 滤镜 Filter

19. **display:none 与 visibility:hidden 的区别**

    - display:none：元素不可见、**不占据空间**、资源会加载、DOM 可访问

    - visibility:hidden：元素不可见、不能点击、但**占据空间**、资源会加载，可以使用

    - 区别

      |                     | display: none                | visibility: hidden                                  |
      | ------------------- | ---------------------------- | --------------------------------------------------- |
      | 是否占据空间        | 不占据                       | 空间保留                                            |
      | 是否触发重绘和回流  | 会触发重绘和回流             | 只会触发重绘                                        |
      | 元素可见性          | 节点和子孙节点元素全都不可见 | 节点的子孙节点元素可以设置 visibility: visible 显示 |
      | transition 过渡效果 | 会                           | 不会                                                |

      - visibility: hidden 属性值具有继承性，所以子孙元素默认继承了 hidden 而隐藏，但是当子孙元素重置为 visibility: visible 就不会被隐藏

    - 补充

      - opacity:0 意思是该元素隐藏起来了，但不会改变页面布局，并且，如果该元素已经绑定一些事件，那么点击该区域，是可以触发点击事件的
      - opacity 会触发重绘

20. **可继承属性和非继承属性**

    - 常用不可继承属性

      - 宽高：height, width
      - 最小最大宽高：max-height, min-height, max-width, min-width
      - dispaly
      - 文本阴影：text-shadow
      - 背景属性：background
      - 浮动属性：float
      - 生成内容：content
      - 层级属性：z-index
      - 定位属性：position, left, right, top, bottom
      - 盒模型属性：margin, padding, border

    - 常用可继承属性

      - 字体系列属性：font-family, font-size
      - 文本系列属性：text-indent, line-height,color
      - 元素可见性：visibility
      - 表格布局属性：border-style
      - 列表布局属性：list-style, list-style-type
      - 光标属性：cursor

21. **CSS Sprites**

    - 将一个页面涉及到的所有图片都包含到一张大图中去，然后利用 CSS 的 background-image，background- repeat，background-position 的组合进行背景定位

    - 利用 CSS Sprites 能很好地减少网页的 http 请求，从而大大的提高页面的性能

    - CSS Sprites 能减少图片的字节。

22. **行内元素和块元素**

    | 元素                                 | 特征                                                                                                                                                                                                                                           |
    | ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
    | 行内元素                             | 设置宽高无效<br />设置 margin 仅左右方向有效，上下无效<br />设置 padding 上下左右都有效，但会撑大自己的空间<br />不会自动进行换行<br />常见行内元素：span, a, strong, b, em, i, small, big, label, img, input, select, textarea                |
    | 块元素                               | 能够识别宽高<br />margin 和 padding 的上下左右均对其有效<br />可以自动换行<br />多个块状元素标签写在一起，默认排列方式为从上至下<br />常见块级元素：div, h1-h6, p, ul, ol, dl, table, form, header, hr, audio, video, article, section, footer |
    | 行内块状元素                         | 不自动换行<br />能够识别宽高<br />默认排列方式为从左到右                                                                                                                                                                                       |
    | 行内元素、块元素、行内块元素相互转换 | display:inline 转换为行内元素<br />display:block 转换为块状元素<br />display:inline-block 转换为行内块状元素                                                                                                                                   |

23. **如何实现两栏布局**

    - **float + margin-left**

      ```css
      * {
        /*清除默认格式*/
        margin: 0;
        padding: 0；;
      }

      .left {
        width: 200px;
        background-color: red;
        float: left;
      }

      .right {
        background-color: green;
        margin-left: 200px; //等于左边栏的宽度
      }
      ```

    - **absolute + margin-left**

      ```css
      * {
        /*清除默认格式*/
        margin: 0;
        padding: 0；;
      }

      .left {
        width: 200px;
        background-color: red;
        float: left;
      }

      .right {
        background-color: green;
        margin-left: 200px; //等于左边栏的宽度
      }
      ```

    - **float + BFC**

      - 左侧元素浮动 + 右侧元素 BFC(overflow：hidden)

    - **flex 布局：父元素 display:flex，右侧元素 flex:1**

      ```css
      * {
        /*清除默认格式*/
        margin: 0;
        padding: 0;
      }
      .box {
        display: flex;
      }
      .box1 {
      }
      .box2 {
        flex: 1;
      }
      ```

24. **三栏布局：两边固定中间自适应**

    - **浮动布局**：左右两侧浮动(左侧左浮，右侧右浮) 中间设置 margin-left 和 margin-right

      - 按照 left、right、middle 顺序布局
      - 优点：简单，兼容性好
      - 缺点：浮动布局脱离文档流，需要清除浮动，否则会带来问题，比如：父容器高度塌陷等

    - **绝对布局**：左右两侧绝对定位 中间设置 margin-left margin-right

      - 按照 left、middle、right 顺序布局
      - 优点：方便快捷，问题少
      - 缺点：
        - 元素脱离文档流，导致后面的元素也会脱离文档流，可使用性比较差。
        - 如果中间栏含有最小宽度限制，或是含有宽度的内部元素，当浏览器宽度小到一定程度，会发生层重叠的情况

    - **BFC 三栏布局**：左侧左浮，右侧右浮，中间设置 overflow: hidden 触发 BFC

      - BFC 区域，不会与浮动元素重叠
      - 缺点：主要内容模块无法最先加载，当页面中内容较多时会影响用户体验

    - **flex 布局**：父容器 display: flex，middle 元素 flex：1

      - 按照 left、middle、right 顺序布局
      - 优点：移动端首选
      - 缺点：不兼容 ie9 及以下

    - **table 布局**：父容器设置 display:table，子元素 display:table-cell

      - 按照 left、middle、right 顺序布局
      - 优点：兼容性好
      - 缺点：无法设置栏间距

    - **grid 布局**：父容器设置 display:grid 和 grid-template-columns，子元素设置 min-height

      - **等 grid 看完再回来完善这里**

    - **margin 负值法**

      - **双飞翼布局**(浮动元素 margin 负值)

        - middle 放在 content 里，left 和 right 在 content 外

          ```html
          <div class="content">
            <div class="middle"></div>
          </div>
          <div class="left"></div>
          <div class="right"></div>
          ```

        - content 左浮

        - middle 设置 margin-left 和 margin-right

        - left 左浮设置 margin-left 负值

        - right 右浮，设置 margin-left 负值

        ```css
        .content {
          float: left;
          width: 100%;
        }
        .main {
          height: 200px;
          margin-left: 110px;
          margin-right: 220px;
          background-color: green;
        }
        .left {
          float: left;
          height: 200px;
          width: 100px;
          margin-left: -100%;
          background-color: red;
        }
        .right {
          width: 200px;
          height: 200px;
          float: right;
          margin-left: -200px;
          background-color: blue;
        }
        ```

        - 优点：主体内容可以优先加载

      - **圣杯布局**

        - 按照 middle、left、right 布局
        - middle、left、right 全都左浮
        - 父容器设置 margin-left 和 margin-right
        - left 设置 margin-left 负值和 left 负值
        - right 设置 margin-left 负值和 right 负值

        ```css
        .container {
          margin-left: 120px;
          margin-right: 220px;
        }
        .main {
          float: left;
          width: 100%;
          height: 300px;
          background-color: red;
        }

        .left {
          float: left;
          width: 100px;
          height: 300px;
          margin-left: -100%;
          position: relative;
          left: -120px;
          background-color: blue;
        }
        .right {
          float: left;
          width: 200px;
          height: 300px;
          margin-left: -200px;
          position: relative;
          right: -220px;
          background-color: green;
        }
        ```

25. **CSS modules**

26. **移动端用什么距离单位**

27. **逻辑像素, 物理像素, 设备像素比**

28. **背景属性**

    - background
    - background-color
    - background-image
    - background-repeat
    - background-position
      - (表示相对于左侧的偏移量 background-position-x，表示相对于右侧的偏移量 background-position-y)
    - background-clip
      - border-box
      - padding-box：将图片裁剪到内边距盒子以内
      - content-box：把图片位于内边距及其之外的部分裁剪掉
    - background-attachment
      - fixed 让背景图在页面滚动时"粘"在页面上
      - scroll(默认值) 会让背景图片相对于元素本身固定
      - local 会让背景图片相对于元素中的内容固定
    - background-size 背景大小
      - contain 可以让浏览器尽可能保持图片最大化，同时不改变图片的宽高比
      - cover 图片会缩放以保证覆盖元素的每一个像素，同时不会变形
    
30. **什么情况下会发生边距叠加**

    - 当**一个元素出现在另一个元素上面**时，第一个元素的下外边距与第二个元素的上外边距会发生合并
    - 当**一个元素包含在另一个元素中**时（假设**没有内边距或边框把外边距分隔开**），它们的上和/或下外边距也会发生合并
    - **外边距自身发生合并**：空元素设置外边距，但是没有设置边框或填充，上外边距与下外边距会发生合并。**如果这个外边距遇到另一个元素的外边距，它还会发生合并**
    - 注意：**只有普通文档流中块框的垂直外边距才会发生合并。行内框、浮动框或绝对定位之间的外边距不会合并**
    - **防止外边距重叠解决方案**
      - 外层元素**padding代替margin**
      - **内层元素设置透明边框**：border:1px solid transparent;
      - **内层元素设置绝对定位**：postion:absolute;
      - **外层元素设置overflow:hidden**
      - **设置内层元素为浮动元素或者行内元素**：float:left; display:inline-block;
      - 内层元素设置**padding:1px**

> 参考链接
>
> 1. https://www.cnblogs.com/ainyi/p/9777841.html
> 2. https://www.jianshu.com/p/56b7302d7f7f
> 3. https://blog.csdn.net/qq_41638795/article/details/83304388
> 4. https://www.jianshu.com/p/9fbb75a9f87a
> 5. https://www.jianshu.com/p/fdcc92914a3e
> 6. https://blog.csdn.net/margin_0px/article/details/82991627
> 7. https://juejin.im/post/5afa98bf51882542c832e5ec
> 8. https://zhuanlan.zhihu.com/p/25070186?refer=learncoding
> 9. https://zhuanlan.zhihu.com/p/25070186?refer=learncoding
> 10. https://juejin.im/post/6844903975792164872
> 11. https://www.cnblogs.com/jf-67/p/8987341.html
> 12. https://juejin.im/post/5ce607a7e51d454f6f16eb3d#heading-37
> 13. https://www.cnblogs.com/Lina-zhu/p/8891616.html
> 14. https://blog.csdn.net/eva_lu/article/details/79633044
> 15. https://www.runoob.com/w3cnote/css-position-static-relative-absolute-fixed.html ★
> 16. https://blog.csdn.net/u013516618/article/details/52624314
