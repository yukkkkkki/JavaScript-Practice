// 设计一个函数把两个数字相加。不得使用 + 或者其他算术运算符。

// 示例:
// 输入: a = 1, b = 1
// 输出: 2

/**
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
var add = function (a, b) {
  if (a == 0) return b;
  if (b == 0) return a;
  let sumA = a ^ b;
  let sumB = (a & b) << 1;
  return add(sumA, sumB);
};
