# Canvas

1. Canvas 元素

   - 只有两个属性**——** `width`和`height`（可选，默认为300 x 150）

   - 二维网格

   - 左上角（0， 0）

   - 栅格：

     ![image](https://mdn.mozillademos.org/files/224/Canvas_default_grid.png)

2. getContext()：用于获得渲染上下文和它的绘画功能

   ```javascript
   var canvas = document.getElementById('tutorial');
   var ctx = canvas.getContext('2d'); // 2D图像
   ```

   - 通过简单的测试`getContext()`方法的存在，脚本可以检查编程支持性

   ```javascript
   var canvas = document.getElementById('tutorial');
   
   if (canvas.getContext){
     var ctx = canvas.getContext('2d');
     // drawing code here
   } else {
     // canvas-unsupported code here
   }
   ```

3. 绘制矩形

   - `fillRect(x, y, width, height)` 绘制一个填充的矩形
     - x与y指定了在canvas画布上所绘制的矩形的左上角（相对于原点）的坐标。width和height设置矩形的尺寸。
   - `strokeRect(x, y, width, height)` 绘制一个矩形的边框
   - `clearRect(x, y, width, height) `清除指定矩形区域，让清除部分完全透明。

4. 绘制路径

   -  路径：通过不同颜色和宽度的线段或曲线相连形成的不同形状的点的集合
   - 步骤：
     - 创建路径起始点 `beginPath()`
     - 使用画图命令画出路径 
     - 把路径封闭 `closePath()`
     - 路径生成后，通过描边 `stroke()` 或填充路径区域 `fill()`来渲染图形 
   - 移动笔触 `moveTo(x, y)`：将笔触移动到指定的坐标x以及y上（设置起点）
   - 直线：`lineTo(x, y)`：绘制一条从当前位置到指定x以及y位置的直线
   
   