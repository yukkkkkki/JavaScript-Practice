/**
 * @param {number[]} chalk
 * @param {number} k
 * @return {number}
 */
// 方法一：模拟
var chalkReplacer = function (chalk, k) {
  const n = chalk.length;
  let total = 0;
  for (const num of chalk) {
    total += num;
  }
  k %= total;
  let res = -1;
  for (let i = 0; i < n; i++) {
    if (chalk[i] > k) {
      res = i;
      break;
    }
    k -= chalk[i];
  }
  return res;
};
// 时间复杂度：O(n)
// 空调复杂度：O(1)

// 方法二：前缀和 + 二分查找
var chalkReplacer = function (chalk, k) {
  const n = chalk.length;
  if (chalk[0] > k) return 0;

  for (let i = 1; i < n; i++) {
    chalk[i] += chalk[i - 1];
    if (chalk[i] > k) return i;
  }

  k %= chalk[n - 1];
  return binarySearch(chalk, k);
};

const binarySearch = (arr, target) => {
  let low = 0;
  let high = arr.length - 1;
  while (low < high) {
    const mid = Math.floor((high - low) / 2) + low;
    if (arr[mid] <= target) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }
  return low;
};
// 时间复杂度：O(n)
// 空调复杂度：O(1)
