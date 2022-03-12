// x^n
function fn(num, n) {
  let res = 1;
  while (n) {
    res = res * num;
    n--;
  }
  return res;
}

function fn2(arr) {
  const res = [];

  function helper(item) {
    if (!Array.isArray(item)) res.push(item);
    else {
      for (let i of item) {
        helper(i);
      }
    }
  }

  arr.map((item) => {
    helper(item);
  });

  return res;
}

// 点到直线距离 S=(x1y2-x1y3+x2y3-x2y1+x3y1-x2y2) / 2。
function fn3(dot, line) {
  let res;
  let S =
    dot.x * line[0].y -
    dot.x * line[1].y +
    line[0].x * line[1].y -
    line[0].x * dot.y +
    line[1].x * dot.y -
    line[0].x * line[0].y;

  res =
    (S * 2) /
    Math.sqrt(
      Math.pow(line[0].x - line[1].x, 2) + Math.pow(line[0].y - line[1].y, 2)
    );
  // let sinA =
  //   (dot.y - line[0].y) /
  //   Math.sqrt(Math.pow(dot.x - line[0].x, 2), Math.pow(dot.y - line[0].y, 2));

  // res = sinA *
}


