# 弹性盒子

Flex 是 Flexible Box 的缩写，意为"弹性布局"，用来为盒状模型提供最大的灵活性。
设为 Flex 布局以后，子元素的 float、clear 和 vertical-align 属性将失效。
它即可以应用于容器中，也可以应用于行内元素。

## 声明定义

使用 display:flex(块级弹性盒子) 或 display:inline-flex(内联级弹性盒子)

## flex-direction：用于控制盒子元素排列的方向

- row：从左到右水平排列元素（默认值）
- row-reverse: 从右向左排列元素
- column：从上到下垂直排列元素
- column-reverse：从下到上垂直排列元素

## flex-wrap：规定 flex 容器是单行或者多行，同时横轴的方向决定了新行堆叠的方向。

- nowrap：元素不拆行或不拆列（默认值）
- wrap：容器元素在必要的时候拆行或拆列。
- wrap-reverse：容器元素在必要的时候拆行或拆列，但是以相反的顺序

**水平排列反向换行**

```
flex-direction: row;
flex-wrap: wrap-reverse;
```

**垂直元素换行**

```
flex-direction: column;
flex-wrap: wrap;
```

**垂直元素反向换行**

```
flex-direction: column;
flex-wrap: wrap-reverse;
```

## flex-flow：是 flex-direction 与 flex-wrap 的组合简写模式

从右向左排列，换行向上拆分行
`flex-flow: row-reverse wrap-reverse;`

## justify-content：用于控制元素在**主轴**上的排列方式

- flex-start：元素紧靠主轴起点
- flex-end：元素紧靠主轴终点
- center：元素从弹性容器中心开始
- space-between：第一个元素靠起点，最后一个元素靠终点，余下元素平均分配空间
- space-around：每个元素两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍
- space-evenly：元素间距离平均分配

## align-items：用于控制容器(中所有)元素在**交叉轴**上的排列方式

- center：元素位于容器的中心
- flex-start：元素位于容器的交叉轴开头
- flex-end：元素位于容器的交叉轴结尾
- stretch：元素被拉伸以适应容器（默认值）

如果设置了 width | height | min-height | min-width | max-width | max-height ，将影响 stretch 的结果，因为 stretch 优先级你于宽高设置。

## align-content：只适用于多行显示的弹性容器，作用是当 flex 容器在交叉轴上有多余的空间时，对元素的对齐处理

- stretch：将空间平均分配给元素
- flex-start：元素紧靠主轴起点
- flex-end：元素紧靠主轴终点
- center：元素从弹性容器中心开始
- space-between：第一个元素靠起点，最后一个元素靠终点，余下元素平均分配空间
- space-around：每个元素两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍
- space-evenly：元素间距离平均分配

# 弹性元素

放在容器盒子中的元素即为容器元素。

- 不能使用 float 与 clear 规则
- 弹性元素均为块元素
- 绝对定位的弹性元素不参与弹性布局

## align-self：用于控制单个元素在交叉轴上的排列方式

- stretch：将空间平均分配给元素
- flex-start：元素紧靠主轴起点
- flex-end：元素紧靠主轴终点
- center：元素从弹性容器中心开始

## flex-grow：用于将弹性盒子的可用空间，分配给弹性元素。以使用整数或小数声明。

如果弹性元素设置了宽度，将把（弹性盒子-弹性元素宽度和）后按照 flex-grow 进行分配

## flex-shrink：与 flex-grow 相反 flex-shrink 是在弹性盒子装不下元素时定义的缩小值

## flex-basis：定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。

可以是长度单位，也可以是百分比。
优先级：flex-basis > width、height

## flex：是 flex-grow、flex-shrink 、flex-basis 缩写组合。

> 建议使用 flex 面不要单独使用 flex-grow / flew-shrink / flex-basis 。

## order：用于控制弹性元素的位置，默认为 order:0 数值越小越在前面，可以负数或整数

> 原文：http://houdunren.gitee.io/note/css/10%20%E5%BC%B9%E6%80%A7%E5%B8%83%E5%B1%80.html#%E8%87%AA%E5%8A%A8%E7%A9%BA%E9%97%B4
