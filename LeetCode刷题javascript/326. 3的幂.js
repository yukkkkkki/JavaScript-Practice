// 给定一个整数，写一个函数来判断它是否是 3 的幂次方。

// 示例 1:
// 输入: 27
// 输出: true

// 示例 2:
// 输入: 0
// 输出: false

// 示例 3:
// 输入: 9
// 输出: true

// 示例 4:
// 输入: 45
// 输出: false

// 方法一：循环求解
// 利用循环解决。排除特殊情况后，用待确定的数字 n ，循环除以 3，看是否能被 3整除。
var isPowerOfThree = function (n) {
  if (n < 1) return false;
  while (n > 1) {
    if (n % 3 !== 0) {
      return false;
    } else {
      n = n / 3;
    }
  }
  return true;
};
// 时间复杂度：O(n)；空间复杂度：O(1)

// 方法二：递归求解
var isPowerOfThree = function (n) {
  if (n === 1) return true;
  if (n <= 0) return false;
  if (n % 3 === 0) {
    return isPowerOfThree(n / 3);
  }
  return false;
};
// 时间复杂度：O(n)；空间复杂度：O(n)

// 方法三
// 1、判断特殊情况 n <= 0 时，直接返回 false
// 2、求计算机允许情况下 3 的最大次幂， 记为 maxPow
// 3、求 3 的 maxPow 次幂值
// 4、判断 3 的 maxPow 次幂值是否能整除待定值 n
var isPowerOfThree = function (n) {
  if (n <= 0) return false;
  const maxPow = parseInt(Math.log(0x7fffffff) / Math.log(3));
  const maxValue = Math.pow(3, maxPow);
  return maxValue % n === 0;
};
// 时间复杂度：O(1)；空间复杂度：O(n)
