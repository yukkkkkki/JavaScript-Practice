window.onload = function () {
  var move = document.getElementById("move"); //第四个canvas
  if (move.getContext) {
    /**匀速直线来回运动（4）begin**/
    var mv = move.getContext("2d");
    var speedX = 5, //x轴速度
      speedY = 7, //y轴速度
      startPointX = 30, //x坐标
      startPointY = 30; //y坐标
    var run = function (runItem) {
      runItem.clearRect(0, 0, 500, 500);
      //判断是否碰壁
      if (startPointX > 470 || startPointX < 30) {
        speedX = -speedX;
      }
      if (startPointY > 470 || startPointY < 30) {
        speedY = -speedY;
      }
      startPointX += speedX;
      startPointY += speedY;
      runItem.beginPath();
      runItem.arc(startPointX, startPointY, 30, 0, 2 * Math.PI, true);
      mv.fillStyle = "pink";
      runItem.closePath();
      runItem.fill();
      requestAnimationFrame(function () {
        run(mv);
      });
    };
    run(mv);
    /**匀速直线来回运动（4）end**/
  } else {
    console.log("不支持Canvas");
  }
};
