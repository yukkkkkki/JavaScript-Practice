/**
 * @param {number[]} nums
 * @return {number}
 */
// 方法一：动态规划
// dp[i] 为考虑前 i 个元素，以第 i 个数字结尾的最长上升子序列的长度
// dp[i] = max(dp[j]) + 1 (0 <= j < i && num[j] < num[i])
var lengthOfLIS = function (nums) {
  const n = nums.length;

  if (n === 0) return 0;
  const dp = new Array(n);
  dp[0] = 1;
  let maxans = 1;

  for (let i = 1; i < n; i++) {
    dp[i] = 1;
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
    maxans = Math.max(maxans, dp[i]);
  }
  return maxans;
};
// 时间复杂度：O(n^2)
// 空调复杂度：O(n)

// 方法二：贪心 + 二分查找
var lengthOfLIS = function (nums) {
  let len = 1;
  const n = nums.length;
  if (n === 0) return 0;

  const d = new Array(n + 1).fill(0);
  d[len] = nums[0];

  for (let i = 1; i < n; i++) {
    if (nums[i] > d[len]) {
      d[++len] = nums[i];
    } else {
      let l = 1;
      let r = len;
      let pos = 0;
      while (l <= r) {
        let mid = (l + r) >> 1;
        if (d[mid] < nums[i]) {
          pos = mid;
          l = mid + 1;
        } else {
          r = mid - 1;
        }
      }
      d[pos + 1] = nums[i];
    }
  }
  return len;
};
// 时间复杂度：O(nlogn)
// 空调复杂度：O(n)
