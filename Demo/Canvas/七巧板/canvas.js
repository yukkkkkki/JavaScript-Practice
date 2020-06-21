window.onload = function () {
  var tangram = document.getElementById("tangram"); //七巧板canvas

  if (tangram.getContext) {
    /**七巧板begin**/
    var qqb = tangram.getContext("2d");

    var tangramArray = [
      {
        //绿色大三角
        start: [0, 0], //起始点
        points: [
          [500, 0],
          [250, 250],
        ], //途径的点
        color: "#cce894", //颜色
      },
      {
        //蓝色大三角
        start: [0, 0],
        points: [
          [250, 250],
          [0, 500],
        ],
        color: "#6ac1d4",
      },
      {
        //红色平行四边形
        start: [500, 0],
        points: [
          [375, 125],
          [375, 375],
          [500, 250],
        ],
        color: "#f03e62",
      },
      {
        //黄色小三角形
        start: [250, 250],
        points: [
          [375, 125],
          [375, 375],
        ],
        color: "#faf226",
      },
      {
        //紫色正方形
        start: [250, 250],
        points: [
          [125, 375],
          [250, 500],
          [375, 375],
        ],
        color: "#a796c2",
      },
      {
        //粉色小三角形
        start: [0, 500],
        points: [
          [125, 375],
          [250, 500],
        ],
        color: "#f394c9",
      },
      {
        //橙色中三角形
        start: [250, 500],
        points: [
          [500, 250],
          [500, 500],
        ],
        color: "#facb2e",
      },
    ];

    for (var i = 0; i < tangramArray.length; i++) {
      qqb.beginPath(); //开始路径
      qqb.moveTo(tangramArray[i].start[0], tangramArray[i].start[1]); //起始点
      //绘制图形
      for (var k = 0; k < tangramArray[i].points.length; k++) {
        qqb.lineTo(tangramArray[i].points[k][0], tangramArray[i].points[k][1]);
      }
      qqb.lineTo(tangramArray[i].start[0], tangramArray[i].start[1]); //闭合图形
      qqb.fillStyle = tangramArray[i].color; //填充颜色
      qqb.fill(); //填充闭合区域。如果path没有闭合，则fill会自动闭合路径
    }
    /**七巧板（2）end**/
  } else {
    console.log("不支持Canvas");
  }
};
