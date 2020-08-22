// 有 n 个气球，编号为0 到 n-1，每个气球上都标有一个数字，这些数字存在数组 nums 中。

// 现在要求你戳破所有的气球。如果你戳破气球 i ，就可以获得 nums[left] * nums[i] * nums[right] 个硬币。 这里的 left 和 right 代表和 i 相邻的两个气球的序号。注意当你戳破了气球 i 后，气球 left 和气球 right 就变成了相邻的气球。

// 求所能获得硬币的最大数量。

// 说明:
//     你可以假设 nums[-1] = nums[n] = 1，但注意它们不是真实存在的所以并不能被戳破。
//     0 ≤ n ≤ 500, 0 ≤ nums[i] ≤ 100

// 示例:
// 输入: [3,1,5,8]
// 输出: 167
// 解释: nums = [3,1,5,8] --> [3,5,8] -->   [3,8]   -->  [8]  --> []
//      coins =  3*1*5      +  3*5*8    +  1*3*8      + 1*8*1   = 167

// 方法一：记忆化搜索
// 思路及算法
// 我们观察戳气球的操作，发现这会导致两个气球从不相邻变成相邻，使得后续操作难以处理。于是我们倒过来看这些操作，将全过程看作是每次添加一个气球。
// 我们定义方法 solve，令 solve(i,j) 表示将开区间 (i,j) 内的位置全部填满气球能够得到的最多硬币数。
// 由于是开区间，因此区间两端的气球的编号就是 i 和 j，对应着 val[i] 和 val[j]。

//     当 i≥j−1 时，开区间中没有气球，solve(i,j) 的值为 0；

//     当 i<j−1 时，我们枚举开区间 (i,j) 内的全部位置 mid，令 mid 为当前区间第一个添加的气球，该操作能得到的硬币数为 val[i]× val[mid] × val[j]。
//     同时我们递归地计算分割出的两区间对 solve(i,j) 的贡献，这三项之和的最大值，即为 solve(i,j) 的值。
//     这样问题就转化为求 solve(i,mid) 和 solve(mid,j)，可以写出方程：
//             ⁡mid=i+1
// solve(i,j)= max val[i] × val[mid] × val[j] + solve(i,mid) + solve(mid,j), i < j−1
//             j−1
//             0,                                                          , i ≥ j−1

// 为了防止重复计算，我们存储 solve 的结果，使用记忆化搜索的方法优化时间复杂度。
var maxCoins = function (nums) {
  let n = nums.length;
  let val = [1, ...nums, 1];
  const memo = new Array(n + 2).fill().map(() => new Array(n + 2).fill(null));
  return solve(val, 0, n + 1, memo);
};

function solve(val, left, right, memo) {
  if (memo[left][right] != null) return memo[left][right];
  let max = 0;
  for (let k = left + 1; k < right; k++) {
    max = Math.max(
      max,
      solve(val, left, k, memo) +
        val[left] * val[k] * val[right] +
        solve(val, k, right, memo)
    );
  }
  memo[left][right] = max;
  return memo[left][right];
}
// 时间复杂度：O(n^3)，其中 n 是气球数量。区间数为 n^2，区间迭代复杂度为 O(n)，最终复杂度为 O(n^2 * n) = O(n^3)。
// 空间复杂度：O(n^2)，其中 n 是气球数量。缓存大小为区间的个数。

// 方法二：动态规划
// 按照方法一的思路，我们发现我们可以通过变换计算顺序，从「自顶向下」的记忆化搜索变为「自底向上」的动态规划。
// 令 dp[i][j] 表示填满开区间 (i,j) 能得到的最多硬币数，那么边界条件是 i ≥ j−1，此时有 dp[i][j]=0。
// 可以写出状态转移方程：
//           k=i+1
// dp[i][j] = max⁡ val[i] × val[k] × val[j] + dp[i][k] + dp[k][j], i < j−1
//            j−1
//            0,                                                , i ≥ j−1
// 最终答案即为 dp[0][n+1]。实现时要注意到动态规划的次序。
var maxCoins = function (nums) {
  if (nums.length == 0) return 0;
  let n = nums.length;
  let val = [1, ...nums, 1];
  let dp = Array.apply(null, Array(n + 2)).map((t) => Array(n + 2).fill(0));

  for (let i = n - 1; i >= 0; i--) {
    for (let j = i + 1; j < n + 2; j++) {
      for (let k = i + 1; k < j; k++) {
        dp[i][j] = Math.max(
          dp[i][j],
          dp[i][k] + dp[k][j] + val[i] * val[k] * val[j]
        );
      }
    }
  }
  return dp[0][n + 1];
};
// 时间复杂度：O(n^3)，其中 n 是气球数量。状态数为 n^2，状态转移复杂度为 O(n)，最终复杂度为 O(n^2 \times n) = O(n^3)。
// 空间复杂度：O(n^2)，其中 n 是气球数量。
