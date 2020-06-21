window.onload = function () {
  var chessboard = document.getElementById("chessboard"); //棋盘canvas
  if (chessboard.getContext) {
    var ctx = chessboard.getContext("2d");

    /**棋盘begin**/
    var cb = chessboard.getContext("2d");
    var lineNum = 19, //棋盘线数
      lineLong = 25, //格子间距
      chessSize = parseInt(lineLong / 3) - 1, //棋子大小
      cbStart = (500 - (lineNum - 1) * lineLong) / 2; //棋盘起始线位置
    //棋盘绘制
    var chessboardDraw = function () {
      for (var j = 0; j < lineNum; j++) {
        //横线
        cb.moveTo(cbStart, cbStart + j * lineLong);
        cb.lineTo(cbStart + (lineNum - 1) * lineLong, cbStart + j * lineLong);
        //竖线
        cb.moveTo(cbStart + j * lineLong, cbStart);
        cb.lineTo(cbStart + j * lineLong, cbStart + (lineNum - 1) * lineLong);
      }
      cb.stroke(); //描边
    };
    chessboardDraw();
    /**棋盘end**/

    /**棋子begin**/
    var chesses = function (x, y, color) {
      //x:x坐标，y:y坐标，color:颜色
      cb.beginPath();
      //arc(x, y, r, startAngle, endAngle, anticlockwise) 以(x, y)为圆心，以r为半径，
      //从 startAngle弧度开始到endAngle弧度结束。anticlosewise是布尔值，true表示逆时针，false表示顺时针。(默认是顺时针)
      cb.arc(x, y, chessSize, 0, Math.PI * 2, false);
      var grd = ctx.createRadialGradient(x, y, chessSize, x, y - 2, 0);
      if (color == "#fff") {
        grd.addColorStop(0, "#fff");
        grd.addColorStop(1, "#e6e6e6");
      } else {
        grd.addColorStop(0, color);
        grd.addColorStop(1, "#fff");
      }
      cb.fillStyle = grd; //填充颜色
      cb.fill();
      cb.closePath(); //闭合路径
      cb.stroke();
    };
    // chesses(200, 50, "#000");
    // chesses(225, 50, "#fff");
    // chesses(225, 75, "#000");
    // chesses(200, 50, "red");
    // chesses(225, 50, "blue");
    // chesses(225, 75, "red");
    chesses(25, 25, "red");
    chesses(225, 50, "blue");
    chesses(225, 75, "red");
    /**棋子end**/

    /**点阵数字begin**/
    //数字数组
    var numArr = [
      //0
      [
        [0, 1, 1, 1, 1, 1, 0],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [0, 1, 1, 1, 1, 1, 0],
      ],
      //1
      [
        [0, 0, 0, 1, 0, 0, 0],
        [0, 0, 1, 1, 0, 0, 0],
        [0, 1, 0, 1, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 0],
      ],
      //2
      [
        [0, 1, 1, 1, 1, 1, 0],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 1, 0],
        [0, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 1, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1],
      ],
      //3
      [
        [0, 1, 1, 1, 1, 1, 0],
        [1, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [0, 1, 1, 1, 1, 1, 0],
      ],
      //4
      [
        [0, 0, 0, 0, 0, 1, 0],
        [0, 0, 0, 0, 1, 1, 0],
        [0, 0, 0, 1, 0, 1, 0],
        [0, 0, 1, 0, 0, 1, 0],
        [0, 1, 0, 0, 0, 1, 0],
        [1, 0, 0, 0, 0, 1, 0],
        [1, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 1, 0],
        [0, 0, 0, 0, 0, 1, 0],
        [0, 0, 0, 0, 0, 1, 0],
        [0, 0, 0, 0, 0, 1, 0],
      ],
      //5
      [
        [1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 0],
      ],
      //6
      [
        [0, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 0],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [0, 1, 1, 1, 1, 1, 0],
      ],
      //7
      [
        [1, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 1, 0],
        [0, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 1, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0],
      ],
      //8
      [
        [0, 1, 1, 1, 1, 1, 0],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [0, 1, 1, 1, 1, 1, 0],
      ],
      //9
      [
        [0, 1, 1, 1, 1, 1, 0],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [0, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [0, 1, 1, 1, 1, 1, 0],
      ],
    ];
    //绘制数字

    var numDraw = function (num) {
      //num:要绘制的数字 0-9
      var leftMove = parseInt((lineNum - 7) / 2), //左偏移量
        topMove = parseInt((lineNum - 10) / 2); //上偏移量
      if (num > 9) {
        return;
      } else {
        for (var q = 0; q < numArr[num].length; q++) {
          //q:竖格,w:横个
          for (var w = 0; w < numArr[num][q].length; w++) {
            numArr[num][q][w] == 1
              ? chesses(
                  cbStart + (leftMove + w) * lineLong,
                  cbStart + (q + topMove) * lineLong,
                  "#000"
                )
              : "";
          }
        }
      }
    };
    numDraw(9);
    /**点阵数字end**/

    /**倒计时begin**/
    var countDown = function () {
      var time = 10;
      setInterval(function () {
        time = time == 0 ? 9 : time - 1;
        //cb.clearRect(0,0,500,500); //这种方法清除画布有bug，1，6，7白点待解决
        cb.fillStyle = "#fff";
        cb.beginPath();
        cb.fillRect(0, 0, 500, 500);
        cb.closePath();
        chessboardDraw(lineNum, lineLong);
        numDraw(time);
      }, 1000);
    };
    countDown();
    /**倒计时end**/
  } else {
    console.log("不支持Canvas");
  }
};
