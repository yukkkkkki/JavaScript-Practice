// 给定一个只包含正整数的非空数组。是否可以将这个数组分割成两个子集，使得两个子集的元素和相等。

// 注意:
// 每个数组中的元素不会超过 100
// 数组的大小不会超过 200

// 示例 1:
// 输入: [1, 5, 11, 5]
// 输出: true
// 解释: 数组可以分割成 [1, 5, 5] 和 [11].
//

// 示例 2:
// 输入: [1, 2, 3, 5]
// 输出: false
// 解释: 数组不能分割成两个元素和相等的子集.

/**
 * @param {number[]} nums
 * @return {boolean}
 */

// 方法一：DFS 回溯
var canPartition = function (nums) {
  const n = nums.length;
  let sum = nums.reduce((pre, cur) => pre + cur);
  if (sum % 2 !== 0) return false;
  // nums.sort((a, b) => a - b);
  // console.log(nums);
  let target = sum / 2;

  const backTrack = (target, index) => {
    if (target == 0) return true;
    if (target < 0 || index >= n) return false;
    if (backTrack(target - nums[index], index + 1)) {
      return true;
    }
    let j = index + 1;
    while (j < n && nums[index] == nums[j]) {
      j++;
    }
    return backTrack(target, j);
  };

  return backTrack(target, 0);
};
// 超时了呵呵

// 方法二：记忆化递归
var canPartition = function (nums) {
  const n = nums.length;
  let sum = nums.reduce((pre, cur) => pre + cur);
  if (sum % 2 !== 0) return false;
  let target = sum / 2;
  const memo = new Map();

  const backTrack = (curSum, index) => {
    const key = curSum + '&' + index;
    if (memo.has(key)) {
      return memo.get(key);
    }
    if (index > n - 1 || curSum > target) {
      return false;
    }
    if (curSum == target) return true;
    let res =
      backTrack(curSum + nums[index], index + 1) ||
      backTrack(curSum, index + 1);
    memo.set(key, res);
    return res;
  };
  return backTrack(0, 0);
};

// 方法三：动态规划
// 思路：
// dp[i][j]：从数组[0, i]下标范围内选取若干个正整数，是否存在一种选取方案使得被选取的正整数的和等于j
// 边界情况
//     若 不选取任何正整数，则被选取的正整数 = 0，因此对于所有 0 <= i < n，都有dp[i][0] = true
//     当 i == 0, 只有一个正整数nums[0] 可以被选取，因此dp[0][nums[0]] = true
// 当 i > 0 且 j > 0
//   若 j >= nums[i]，则对于当前的数字 nums[i]，可以选取也可以不选取，两种情况只要有一个为true，就有dp[i][j] = true
//        若不选取nums[i]，dp[i][j] = dp[i - 1][j]
//        若选取nums[i]，dp[i][j] = dp[i - 1][j - nums[i]]
//   若 j < nums[i]，则在选取的数字的和等于j的情况下无法选取当前的数字 nums[i]，因此有dp[i][j] = dp[i - 1][j]
var canPartition = function (nums) {
  const n = nums.length;
  if (n < 2) return false;
  let sum = 0,
    maxNum = 0;
  for (let num of nums) {
    sum += num;
    maxNum = maxNum > num ? maxNum : num;
  }
  if (sum & 1) return false;
  const target = sum / 2;
  if (maxNum > target) return false;

  const dp = new Array(n).fill(0).map((v) => new Array(target + 1, false));
  // base case
  for (let i = 0; i < n; i++) {
    dp[i][0] = true;
  }
  dp[0][nums[0]] = true;

  for (let i = 1; i < n; i++) {
    const num = nums[i];
    for (let j = 1; j <= target; j++) {
      if (j >= num) {
        dp[i][j] = dp[i - 1][j] || dp[i - 1][j - num];
      } else {
        dp[i][j] = dp[i - 1][j];
      }
    }
  }
  return dp[n - 1][target];
};

// console.log(canPartition([14, 9, 8, 4, 3, 2]));

var canPartition = function (nums) {
  const n = nums.length;
  if (n < 2) return false;
  let sum = 0,
    maxNum = 0;
  for (const num of nums) {
    sum += num;
    maxNum = maxNum > num ? maxNum : num;
  }
  if (sum & 1) return false;
  const target = Math.floor(sum / 2);
  if (maxNum > target) return false;

  const dp = new Array(n).fill(0).map((v) => new Array(target + 1, false));
  // base case
  for (let i = 0; i < n; i++) {
    dp[i][0] = true;
  }
  dp[0][nums[0]] = true;

  for (let i = 1; i < n; i++) {
    const num = nums[i];
    for (let j = 1; j <= target; j++) {
      if (j >= num) {
        dp[i][j] = dp[i - 1][j] | dp[i - 1][j - num];
      } else {
        dp[i][j] = dp[i - 1][j];
      }
    }
  }
  return dp[n - 1][target];
};
