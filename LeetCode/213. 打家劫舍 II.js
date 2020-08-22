// 你是一个专业的小偷，计划偷窃沿街的房屋，每间房内都藏有一定的现金。这个地方所有的房屋都围成一圈，这意味着第一个房屋和最后一个房屋是紧挨着的。同时，相邻的房屋装有相互连通的防盗系统，如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警。

// 给定一个代表每个房屋存放金额的非负整数数组，计算你在不触动警报装置的情况下，能够偷窃到的最高金额。

// 示例 1:
// 输入: [2,3,2]
// 输出: 3
// 解释: 你不能先偷窃 1 号房屋（金额 = 2），然后偷窃 3 号房屋（金额 = 2）, 因为他们是相邻的。

// 示例 2:
// 输入: [1,2,3,1]
// 输出: 4
// 解释: 你可以先偷窃 1 号房屋（金额 = 1），然后偷窃 3 号房屋（金额 = 3）。
//      偷窃到的最高金额 = 1 + 3 = 4 。

// 思路
// 这道题增加了一个条件，房子是环形的，其实这个条件只影响最后一个房子偷不偷
// 当0号房子偷了，最后一个房子就不能偷，当0号房子没偷，则最后一个房子可以偷。

// 所以我们可以用一个二维数组保存当前状态。
// dp[i][0] 表示小偷走到第i, 没有偷第一个房子的最大值
// dp[i][1] 表示小偷走到i, 偷了第一个房子的最大值。

// 那么状态转移方程怎么确定呢？
// 对于第i个房子，如果前一个房子我偷了就不能偷这个房子，所以我走到第i个房子，能够获得的最大值为前一个房子能够获得的最大值。
// 此时 dp[i] = dp[i-1];
// 对于前一个房子我没有偷，那么我就可以偷这个房子，所以我走到第i个房子，能够获得的最大值为前两个房子能够获得的最大值 + 当前房子的价值。
// 此时 dp[i] = dp[i-2] + nums[i]
// 状态转移方程就确定了。

// 特殊情况处理？
// 当i是最后一个房间的时候
//     dp[i-1][0] = Math.max(dp[i-1][0], dp[i-2][0] + nums[i]);
//     //如果第一个房间没有被偷，那么最后一个房间就是个正常的房间。
//     dp[i-1][1] = dp[i-1];
//     //如果第一个房间被偷了，那么最后一个房间就不能偷了，此时我们只有一个选择，就是不偷，只能等于dp[i-1];

// 剩下的就是边界状态了。
// dp[0][0] = 0; 走到第0房子的时候，不偷，那不就是只有0；
// dp[0][1] = nums[0]; 走到第0房子的时候，偷了，那不就是收获了nums[0] ;
// dp[1][0] = nums[1]; 走到第1房子的时候，如果第零个房子我没有偷，那我就可以偷第一个房子，一共收获了nums[1] ;
// dp[1][1] = nums[0]; 走到第1房子的时候，如果第零个房子我偷了，那我就不能偷第1个房子，一共收获了nums[0] ;

// 我们还可以再次优化空间，我们观察状态转移方程，发现，其实只用了
// dp[i-1][0]
// dp[i-1][1]
// dp[i-2][0]
// dp[i-2][1]
// 四个状态，所以我们可以用四个基本数据类型保存这四个状态，空间复杂度优化为O(1);
// 注意每次循环要用 temp 保存dp[i-1]，因为当前的dp[i-1],在下一次就是dp[i-2]了。
// 代码在最下面。

// 作者：stack_pop
// 链接：https://leetcode-cn.com/problems/house-robber-ii/solution/js-dong-tai-gui-hua-by-stack_pop-16/

// 方法一：动态规划
// 此题可以分为两种情况
//     偷第一家，不能偷最后一家
//     不偷第一家，能偷最后一家

// 因此在代码中，直接截取掉第一个和最后一个数字分解成两个子问题求解即可。
var rob = function (nums) {
  let len = nums.length;
  if (len === 0) return 0;
  if (len === 1) return nums[0];

  function dpGO(nums) {
    let n = nums.length;
    let dp = Array.from(new Array(n), () => new Array(n));
    dp[0][0] = 0;
    dp[0][1] = nums[0];

    for (let i = 1; i < nums.length; i++) {
      dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1]);
      dp[i][1] = nums[i] + dp[i - 1][0];
    }
    return Math.max(dp[n - 1][0], dp[n - 1][1]);
  }

  let need1 = dpGO(nums.slice(1));
  let need2 = dpGO(nums.slice(0, nums.length - 1));
  return Math.max(need1, need2);
};

// 动态规划降维
var rob = function (nums) {
  let len = nums.length;
  if (len === 0) return 0;
  if (len === 1) return nums[0];

  function dpGO(nums) {
    let dp = new Array(len - 1);
    dp[0] = 0;
    dp[1] = nums[0];
    let res = dp[1];
    for (let i = 2; i < len; i++) {
      dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i - 1]);
      res = Math.max(res, dp[i]);
    }
    return res;
  }

  let need1 = dpGO(nums.slice(1));
  let need2 = dpGO(nums.slice(0, nums.length - 1));
  return Math.max(need1, need2);
};

// 方法三：动态规划-去维
var rob = function (nums) {
  let len = nums.length;
  if (len === 0) return 0;
  if (len === 1) return nums[0];

  function dpGO(nums) {
    var prevMax = 0;
    var currMax = 0;
    for (let i = 0; i < nums.length; i++) {
      let temp = currMax;
      currMax = Math.max(currMax, prevMax + nums[i]);
      prevMax = temp;
    }
    return currMax;
  }

  var need1 = dpGO(nums.slice(1));
  var need2 = dpGO(nums.slice(0, nums.length - 1));
  return Math.max(need1, need2);
};
