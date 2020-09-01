// 给定一个表示分数的非负整数数组。 玩家 1 从数组任意一端拿取一个分数，随后玩家 2 继续从剩余数组任意一端拿取分数，然后玩家 1 拿，…… 。每次一个玩家只能拿取一个分数，分数被拿取之后不再可取。直到没有剩余分数可取时游戏结束。最终获得分数总和最多的玩家获胜。

// 给定一个表示分数的数组，预测玩家1是否会成为赢家。你可以假设每个玩家的玩法都会使他的分数最大化。

// 示例 1：
// 输入：[1, 5, 2]
// 输出：False
// 解释：一开始，玩家1可以从1和2中进行选择。
// 如果他选择 2（或者 1 ），那么玩家 2 可以从 1（或者 2 ）和 5 中进行选择。如果玩家 2 选择了 5 ，那么玩家 1 则只剩下 1（或者 2 ）可选。
// 所以，玩家 1 的最终分数为 1 + 2 = 3，而玩家 2 为 5 。
// 因此，玩家 1 永远不会成为赢家，返回 False 。

// 示例 2：
// 输入：[1, 5, 233, 7]
// 输出：True
// 解释：玩家 1 一开始选择 1 。然后玩家 2 必须从 5 和 7 中进行选择。无论玩家 2 选择了哪个，玩家 1 都可以选择 233 。
//      最终，玩家 1（234 分）比玩家 2（12 分）获得更多的分数，所以返回 True，表示玩家 1 可以成为赢家。

// 方法一：递归
// 思路：
// 为了判断哪个玩家可以获胜，需要计算一个总分，为先手得分与后手得分之差。
// 当数组中的所有数字都被拿取时，如果总分大于或等于 00，则先手获胜，反之则后手获胜。
// 由于每次只能从数组的任意一端拿取数字，因此可以保证数组中剩下的部分一定是连续的。
// 假设数组当前剩下的部分为下标 start 到下标 end，其中 0 ≤ start ≤ end < nums.length。
// 如果 start = end，则只剩一个数字，当前玩家只能拿取这个数字。
// 如果 start < end，则当前玩家可以选择 nums[start] 或 nums[end]，然后轮到另一个玩家在数组剩下的部分选取数字。这是一个递归的过程。

// 计算总分时，需要记录当前玩家是先手还是后手，判断当前玩家的得分应该记为正还是负。
// 当数组中剩下的数字多于 1 个时，当前玩家会选择最优的方案，使得自己的分数最大化，因此对两种方案分别计算当前玩家可以得到的分数，其中的最大值为当前玩家最多可以得到的分数。
var PredictTheWinner = function (nums) {
  if (nums.length <= 2) return true;

  // turn 用来记录当前玩家是先手还是后手
  const help = (start, end, turn) => {
    if (start === end) return nums[start] * turn;
    let socreStart = nums[start] * turn + help(start + 1, end, -turn);
    let socreEnd = nums[end] * turn + help(start, end - 1, -turn);
    return Math.max(socreStart * turn, socreEnd * turn) * turn;
  };

  return help(0, nums.length - 1, 1) >= 0;
};

// 递归方法二
var PredictTheWinner = function (nums) {
  if (nums.length <= 2) return true;
  const help = (start, end) => {
    if (start === end) return nums[start];
    const startScore = nums[start] - help(start + 1, end);
    const endScore = nums[end] - help(start, end - 1);
    return Math.max(startScore, endScore);
  };

  return help(0, nums.length - 1) >= 0;
};

// 方法二：记忆化递归
var PredictTheWinner = function (nums) {
  const len = nums.length;
  if (len <= 2) return true;
  const memo = new Array(len)
    .fill(0)
    .map((i) => new Array(len).fill(undefined));
  // console.log(memo)

  const help = (start, end) => {
    if (memo[start][end] !== undefined) return memo[start][end];
    if (start === end) {
      memo[start][end] = nums[start];
      return memo[start][end];
    }
    const startScore = nums[start] - help(start + 1, end);
    const endScore = nums[end] - help(start, end - 1);
    memo[start][end] = Math.max(startScore, endScore);
    return memo[start][end];
  };

  return help(0, nums.length - 1) >= 0;
};

// 方法三：动态规划
var PredictTheWinner = function (nums) {
  const n = nums.length;
  const dp = new Array(n);
  for (let i = 0; i < n; i++) {
    dp[i] = new Array(n);
  }
  // base case
  // dp[i][j]：当前玩家在数组[i:j]中先手，赢过对方的分数
  for (let i = 0; i < n; i++) {
    dp[i][i] = nums[i];
  }
  for (let i = n - 2; i >= 0; i--) {
    for (let j = i + 1; j < n; j++) {
      const a = nums[i] - dp[i + 1][j];
      const b = nums[j] - dp[i][j - 1];
      dp[i][j] = Math.max(a, b);
    }
  }

  return dp[0][n - 1] >= 0;
};
