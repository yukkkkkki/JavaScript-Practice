/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
// 方法一：动态规划
// 因为每次只能交换相同位置的两个数，所以 i 一定至少满足：
// (1) nums1[i] > nums1[i - 1] && nums2[i] > nums2[i - 1]
// (2) nums1[i] > nums2[i - 1] && nums2[i] > nums1[i - 1]
// dp[i][0]，到 i 为止 nums1, nums2 满足严格递增，且 i 不进行交换操作的最小次数
// dp[i][1], 到 i 为止 nums1, nums2 满足严格递增，且 i 进行交换操作的最小次数

// 当满足 (1) 不满足 (2)
// dp[i][0] = dp[i - 1][0];
// dp[i][1] = dp[i - 1][1];

// 当满足 (2) 不满足 (1)
// dp[i][0] = dp[i - 1][1]
// dp[i][1] = dp[i - 1][0] + 1

// 当满足 (1) 和 (2)
// dp[i][0] = min(dp[i - 1][0], dp[i - 1][1])
// dp[i][1] = min(dp[i - 1][1], dp[i - 1][0])

// 初始化：dp[0][0] = 0, dp[0][1] = 1
// 优化：滚动数组
var minSwap = function (nums1, nums2) {
  const n = nums1.length;
  let a = 0;
  let b = 1;

  for (let i = 1; i < n; i++) {
    let at = a;
    let bt = b;
    a = b = n;

    if (nums1[i] > nums1[i - 1] && nums2[i] > nums2[i - 1]) {
      a = Math.min(a, at);
      b = Math.min(b, bt + 1);
    }

    if (nums1[i] > nums2[i - 1] && nums2[i] > nums1[i - 1]) {
      a = Math.min(a, bt);
      b = Math.min(b, at + 1);
    }
  }
  return Math.min(at, bt);
};
// 时间复杂度：O(n)
// 空间复杂度：O(1)
