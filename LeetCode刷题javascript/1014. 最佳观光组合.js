// 给定正整数数组 A，A[i] 表示第 i 个观光景点的评分，并且两个景点 i 和 j 之间的距离为 j - i。

// 一对景点（i < j）组成的观光组合的得分为（A[i] + A[j] + i - j）：景点的评分之和减去它们两者之间的距离。

// 返回一对观光景点能取得的最高分。

// 示例：
// 输入：[8,1,5,2,6]
// 输出：11
// 解释：i = 0, j = 2, A[i] + A[j] + i - j = 8 + 5 + 0 - 2 = 11


// 方法一：动态规划
// i<j，A[i] + A[j] + i−j的最大值，即 (A[i] + i)+(A[j] − j)的最大值
// 遍历一遍数组，每一项 A[j] − j ，都往前找最大的 A[i] + i
// 用 dp 数组存出现过的 A[i] + i最大值
// dp[i]：第 i 项之前的 A[m] + m 的最大值，即从 0 到 i − 1项的 A[m] + m 的最大值
const maxScoreSightseeingPair = (A) => {
  const dp = new Array(A.length);
  let res = 0;
  dp[0] = 0;
  for (let i = 1; i < A.length; i++) {
    dp[i] = Math.max(dp[i - 1], A[i - 1] + i - 1);
    res = Math.max(res, dp[i] + A[i] - i);
  }
  return res;
}

// 降维，优化
// 当前 dp[i] 和 dp[i−1]之前的项无关——用一个变量存就行，迭代时更新一下
const maxScoreSightseeingPair = (A) => {
  let res = 0;
  let prev = 0;
  for (let i = 1; i < A.length; i++) {
    //prev是前i-1个元素中A[m]+m的最大值
    prev = Math.max(prev, A[i - 1] + i - 1);
    res = Math.max(res, prev + A[i] - i);
  }
  return res;
}