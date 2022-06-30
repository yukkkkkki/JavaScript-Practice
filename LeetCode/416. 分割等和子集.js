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
    if (memo.has(key)) return memo.get(key);

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
var canPartition = function (nums) {
  const n = nums.length;
  if (n < 2) return false;

  let sum = 0;
  let maxNum = 0;
  for (const num of nums) {
    sum += num;
    maxNum = maxNum > num ? maxNum : num;
  }
  if (sum & 1) return false;

  const target = Math.floor(sum / 2);
  if (maxNum > target) return false;

  // dp[i][j]：从数组 [0, i] 下标范围内选取若干个正整数，是否存在一种选取方案使得被选取的正整数的和等于 j
  const dp = new Array(n).fill(0).map((v) => new Array(target + 1, false));
  // base case
  for (let i = 0; i < n; i++) {
    // 不选取任何正整数，则被选取的正整数 = 0
    // 因此对于所有 0 <= i < n，都有 dp[i][0] = true
    dp[i][0] = true;
  }
  // 当 i == 0, 只有一个正整数nums[0] 可以被选取
  dp[0][nums[0]] = true;

  for (let i = 1; i < n; i++) {
    const num = nums[i];
    for (let j = 1; j <= target; j++) {
      if (j >= num) {
        // 对于当前的数字 nums[i]，可以选取也可以不选取
        // 两种情况只要有一个为 true，就有dp[i][j] = true
        dp[i][j] = dp[i - 1][j] | dp[i - 1][j - num];
      } else {
        // 在选取的数字的和等于 j 的情况下无法选取当前的数字 nums[i]
        dp[i][j] = dp[i - 1][j];
      }
    }
  }
  return dp[n - 1][target];
};
// 时间复杂度：O(n * target)
// 空间复杂度：O(target)
