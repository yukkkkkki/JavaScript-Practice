// 递归乘法。 写一个递归函数，不使用 * 运算符， 实现两个正整数的相乘。可以使用加号、减号、位移，但要吝啬一些。

// 示例1:
//  输入：A = 1, B = 10
//  输出：10

// 示例2:
//  输入：A = 3, B = 4
//  输出：12
/**
 * @param {number} A
 * @param {number} B
 * @return {number}
 */
// 方法一：for循环
var multiply = function (A, B) {
  let res = 0;
  for (let i = 0; i < B; i++) {
    res += A;
  }
  return res;
};
// 方法二：递归解法
var multiply = function (A, B) {
  let max = Math.max(A, B);
  let min = Math.min(A, B);
  const recursion = (value) => {
    if (value < 1) return 0;
    return (max += recursion(value - 1));
  };
  return recursion(min);
};
