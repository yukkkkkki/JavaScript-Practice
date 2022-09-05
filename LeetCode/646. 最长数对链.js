/**
 * @param {number[][]} pairs
 * @return {number}
 */
// 方法一：动态规划
var findLongestChain = function (pairs) {
  // dp[i]：以 pairs[i] 为结尾的最长数对链的长度
  const n = pairs.length;
  pairs.sort((a, b) => a[0] - b[0]);
  const dp = new Array(n).fill(1);

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (pairs[i][0] > pairs[j][1]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
  }

  return dp[n - 1];
};
// 时间复杂度：O(n^2)
// 空间复杂度：O(n)

// 方法二：最长递增子序列
var findLongestChain = function (pairs) {
  pairs.sort((a, b) => a[0] - b[0]);
  const arr = [];
  for (const p of pairs) {
    let [x, y] = p;
    if (arr.length === 0 || x > arr[arr.length - 1]) {
      arr.push(y);
    } else {
      const idx = binarySearch(arr, x);
      arr[idx] = Math.min(arr[idx], y);
    }
  }
  return arr.length;
};
const binarySearch = (arr, x) => {
  let low = 0;
  let high = arr.length - 1;
  while (low < high) {
    const mid = low + Math.floor((high - low) / 2);
    if (arr[mid] >= x) {
      high = mid;
    } else {
      low = mid + 1;
    }
  }
};
// 时间复杂度：O(nlogn)
// 空间复杂度：O(n)

// 方法三：贪心
var findLongestChain = function (pairs) {
  let curr = -Number.MAX_VALUE;
  let res = 0;
  pairs.sort((a, b) => a[1] - b[1]);
  for (const p of pairs) {
    if (curr < p[0]) {
      curr = p[1];
      res++;
    }
  }
  return res;
};
// 时间复杂度：O(nlogn)
// 空间复杂度：O(logn)
