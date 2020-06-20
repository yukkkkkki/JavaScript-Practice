// 求 1+2+...+n ，要求不能使用乘除法、for、while、if、else、switch、case等关键字及条件判断语句（A?B:C）。

// 示例 1：
// 输入: n = 3
// 输出: 6

// 示例 2：
// 输入: n = 9
// 输出: 45

// 方法一：递归 + &&逻辑符短路
var sumNums = function (n) {
  return n && n + sumNums(n - 1);
};

// 方法二：reduce
var sumNums = function (n) {
  return new Array(n).fill(0).reduce((acc, currentValue, index) => {
    return (acc += index);
  }, n);
};

// 方法三：map
var sumNums = function (n) {
  let num = n;
  new Array(n).fill(0).map((item, index) => {
    num += index;
  });
  return num;
};
