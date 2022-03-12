/**
 * @param {number} n
 * @return {number}
 */
// 方法一：二分查找
var findNthDigit = function (n) {
  let low = 1,
    high = 9;
  while (low < high) {
    const mid = Math.floor((high - low) / 2) + low;
    if (totalDigits(mid) < n) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }
  const d = low;
  const prevDigits = totalDigits(d - 1);
  const index = n - prevDigits - 1;
  const start = Math.floor(Math.pow(10, d - 1));
  const num = start + Math.floor(index / d);
  const digitIndex = index % d;
  const digit =
    Math.floor(num / Math.floor(Math.pow(10, d - digitIndex - 1))) % 10;
  return digit;
};

const totalDigits = (length) => {
  let digits = 0;
  let curLength = 1,
    curCount = 9;
  while (curLength <= length) {
    digits += curLength * curCount;
    curLength++;
    curCount *= 10;
  }
  return digits;
};

// 作者：LeetCode-Solution
// 链接：https://leetcode-cn.com/problems/nth-digit/solution/di-n-wei-shu-zi-by-leetcode-solution-mdl2/
