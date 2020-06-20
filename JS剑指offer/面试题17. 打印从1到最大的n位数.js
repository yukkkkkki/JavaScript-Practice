// 输入数字 n，按顺序打印出从 1 到最大的 n 位十进制数。比如输入 3，则打印出 1、2、3 一直到最大的 3 位数 999。

// 示例 1:

// 输入: n = 1
// 输出: [1,2,3,4,5,6,7,8,9]

// 说明：

//     用返回一个整数列表来代替打印
//     n 为正整数
var printNumbers = function (n) {
  if (n === 0) return [];
  let result = [];
  for (let i = 1; i < Math.pow(10, n); i++) {
    result.push(i);
  }
  return result;
};

var printNumbers2 = function (n) {
  let max = 1;
  let x = 10;
  while (n) {
    if (n & 1) {
      max = max * x;
    }
    x = x * x;
    n = n >> 1;
  }

  const res = [];
  for (let i = 1; i < max; i++) {
    res.push(i);
  }
  return res;
};

var printNumbers3 = function (n) {
  const max = 10 ** n - 1;
  const res = [];
  for (let i = 1; i <= max; i++) {
    res.push(i);
  }
  return res;
};
