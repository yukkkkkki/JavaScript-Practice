/**
 * @param {number} n
 * @return {boolean}
 */
// 方法一：哈希表
// 当平方和出现两次相同的结果则说明它不是快乐数
var isHappy = function (n) {
  let set = new Set();
  while (true) {
    n = getSum(n);
    if (n === 1) return true;
    else {
      if (set.has(n)) return false;
      else set.add(n);
    }
  }
};
const getSum = (n) => {
  let sum = 0;
  while (n > 0) {
    sum += (n % 10) * (n % 10);
    n = parseInt(n / 10);
  }
  return sum;
};
// 时间复杂度：O(logn)
// 空间复杂度：O(logn)
