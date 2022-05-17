// 你是一个专业的小偷，计划偷窃沿街的房屋。每间房内都藏有一定的现金
// 影响你偷窃的唯一制约因素就是相邻的房屋装有相互连通的防盗系统，如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警。

// 给定一个代表每个房屋存放金额的非负整数数组，计算你 不触动警报装置的情况下 ，一夜之内能够偷窃到的最高金额。

// 示例 1:
// 输入: [1,2,3,1]
// 输出: 4
// 解释: 偷窃 1 号房屋 (金额 = 1) ，然后偷窃 3 号房屋 (金额 = 3)。
//      偷窃到的最高金额 = 1 + 3 = 4 。

// 示例 2:
// 输入: [2,7,9,3,1]
// 输出: 12
// 解释: 偷窃 1 号房屋 (金额 = 2), 偷窃 3 号房屋 (金额 = 9)，接着偷窃 5 号房屋 (金额 = 1)。
//      偷窃到的最高金额 = 2 + 9 + 1 = 12 。

// 动态规划
// 偷窃第 k 间房屋，那么就不能偷窃第 k-1 间房屋，偷窃总金额为前 k-2 间房屋的最高总金额与第 k 间房屋的金额之和
// 不偷窃第 k 间房屋，偷窃总金额为前 k−1 间房屋的最高总金额
// 故状态转移方程：dp[n] = MAX( dp[n - 1], dp[n - 2] + num[n])
var rob = function (nums) {
  const len = nums.length;
  if (len == 0) return 0;

  const dp = new Array(len + 1);
  dp[0] = 0;
  dp[1] = nums[0];
  
  for (let i = 2; i <= len; i++) {
    dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i - 1]);
  }
  return dp[len];
};
// 时间复杂度：O(n)
// 时间复杂度：O(1)

// 方法二
// 原理还是动态规划，只不过把dp[i-1]和dp[i-2]换成用两个数表示
var rob = function (nums) {
  const len = nums.length;
  if (len === 0) return 0;
  if (len === 1) return nums[0];

  let preMax = nums[0];
  let curMax = Math.max(nums[0], nums[1]);
  let res = curMax;

  for (let i = 2; i < len; i++) {
    let temp = curMax;
    curMax = Math.max(nums[i] + preMax, curMax);
    preMax = temp;
    res = Math.max(curMax, res);
  }
  return res;
};
