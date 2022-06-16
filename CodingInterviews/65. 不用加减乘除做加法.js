/**
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
// 方法一：位运算 迭代
// a + b，等价于 (a ^ b) + ((a & b) << 1)
// 1. 按位加法（不进位）分四种情况 1 + 1 = 0, 0 + 0 = 0, 1 + 0 = 1, 0 + 1 = 1 刚好与位运算的异或运算 (^) 结果相同。
// 2. 进位值 1 + 1 = 1, 0 + 0 = 0, 1 + 0 = 1, 0 + 1 = 1 刚好与位运算的与运算 (&) 结果相同。
// 3. 进位值需要向前进一位，与位运算左移运算符 (<<) 结果相同
var add = function (a, b) {
  while (b !== 0) {
    let sum = a ^ b;
    let carry = (a & b) << 1;
    a = sum;
    b = carry;
  }

  return a;
};

// 方法二：位运算 递归
var add = function (a, b) {
  if (a == 0) return b;
  if (b == 0) return a;
  return add(a ^ b, (a & b) << 1);
};
