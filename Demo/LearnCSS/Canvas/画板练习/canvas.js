window.onload = function () {
  var canvas = document.getElementById("tutorial"); //第一个canvas

  if (canvas.getContext) {
    /**画板练习（1）begin**/
    var ctx = canvas.getContext("2d");
    //两个矩形
    ctx.fillStyle = "rgb(200,0,0)";
    ctx.fillRect(10, 10, 55, 50);
    ctx.fillStyle = "rgba(0,0,200,0.5)";
    //ctx.fillRect(30,30,55,50);
    ctx.strokeRect(30, 30, 55, 50);
    ctx.clearRect(15, 15, 20, 25);

    //直线
    ctx.beginPath(); //新建一条path
    ctx.moveTo(100, 50); //把画笔移动到指定的坐标
    ctx.lineTo(200, 50); //绘制一条从当前位置到指定坐标(200, 50)的直线.
    //闭合路径。会拉一条从当前点到path起始点的直线。如果当前点与起始点重合，则什么都不做
    ctx.closePath();
    ctx.stroke(); //绘制路径。

    //三角形
    ctx.beginPath();
    ctx.moveTo(50, 100);
    ctx.lineTo(200, 100);
    ctx.lineTo(200, 300);
    ctx.fillStyle = "rgba(255,0,200,0.5)"; //填充颜色
    ctx.fill(); //填充闭合区域。如果path没有闭合，则fill会自动闭合路径
    ctx.closePath(); //虽然我们只绘制了两条线段，但是closePath会closePath，仍然是一个3角形
    ctx.stroke(); //描边。stroke不会自动closePath()

    //圆
    ctx.beginPath();
    //arc(x, y, r, startAngle, endAngle, anticlockwise) 以(x, y)为圆心，以r为半径，
    //从 startAngle弧度开始到endAngle弧度结束。anticlosewise是布尔值，true表示逆时针，false表示顺时针。(默认是顺时针)
    ctx.arc(250, 50, 40, 0, Math.PI * 2, false);
    var grd1 = ctx.createRadialGradient(245, 45, 40, 245, 40, 0);
    grd1.addColorStop(0, "red");
    grd1.addColorStop(1, "pink");
    ctx.fillStyle = grd1;
    ctx.fill();
    ctx.closePath(); //闭合路径
    ctx.stroke();

    /**画板练习（1）end**/
  } else {
    console.log("不支持Canvas");
  }
};
