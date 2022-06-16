/**
 * @param {number} n
 * @return {number}
 */
// 方法一：递归 + && 逻辑符短路
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
