/**
 * @param {number} n
 * @return {number}
 */
// 方法一：动态规划方法
// f(n) = max(f(i) * f(n - i)) (0 < i <n)
var cuttingRope = function (n) {
  if (n < 2) return 0;
  if (n == 2) return 1;
  if (n == 3) return 2;

  var p = Array(n + 1);
  p[0] = 0;
  p[1] = 1;
  p[2] = 2;
  p[3] = 3;

  var max = 0;
  for (let i = 4; i <= n; ++i) {
    max = 0;
    for (let j = 1; j <= i / 2; ++j) {
      var temp = p[j] * p[i - j];
      if (max < temp) max = temp;
      p[i] = max;
    }
  }
  max = p[n];
  return max;
};

// 动态规划(2)
// 状态数组dp[i] 表示：数字 i 拆分为至少两个正整数之和的最大乘积
// 为了方便计算， dp 的长度是 n + 1， 值初始化为 1。显然dp[2] 等于 1
// 外层循环从 3 开始遍历，一直到 n 停止
// 内层循环 j 从 1 开始遍历，一直到 i 之前停止，它代表着数字 i 可以拆分成 j + (i - j)
// 但 j * (i - j) 不一定是最大乘积， 因为i - j不一定大于dp[i - j](数字i - j拆分成整数之和的最大乘积)
// 选择最大的值作为 dp[i] 的结果。
// dp[i] = max(dp[i], j * (i - j), j * dp[i - j])
var cuttingRope = function (n) {
  const dp = new Array(n + 1).fill(1);
  for (let i = 3; i <= n; ++i) {
    for (let j = 1; j < i; ++j) {
      dp[i] = Math.max(dp[i], j * (i - j), j * dp[i - j]);
    }
  }
  return dp[n];
};

// 方法二：贪心法
// 8 拆分为 3 + 3 + 2，此时乘积是最大的。
// 然后就推测出来一个整数，要拆成多个 2 和 3 的和，保证乘积最大。
// 原理很容易理解，因为 2 和 3 可以合成任何数字
// - 例如 5 = 2 + 3，但是 5 < 2 * 3
// - 例如 6 = 3 + 3，但是 6 < 3 * 3
// 所以根据贪心算法，就尽量将原数拆成更多的 3，然后再拆成更多的 2，保证拆出来的整数的乘积结果最大。

// 但上面的解法还有不足
// 如果整数 n 的形式是 3k + 1，例如 7。
// 按照上面规则，会拆分成 "3 + 3 + 1"
// 但是在乘法操作中，1 是没作用的。
// 此时，应该将 1 和 3 变成 4，也就是 "3 + 3 + 1" 变成 "3 + 4"，此时乘积最大。

// 所以算法的整体思路是：
// n 除 3 的结果为 a， 余数是 b
// 当 b 为 0， 直接将 a 个 3 相乘
// 当 b 为 1， 将（ a - 1） 个 3 相乘， 再乘以 4
// 当 b 为 2， 将 a 个 3 相乘， 再乘以 2
var cuttingRope = function (n) {
  if (n === 2) return 1;
  if (n === 3) return 2;

  const a = Math.floor(n / 3);
  const b = n % 3;
  if (b === 0) return Math.pow(3, a);
  if (b === 1) return Math.pow(3, a - 1) * 4;

  return Math.pow(3, a) * 2;
};

// 作者： xin - tan
// 链接： https: //leetcode-cn.com/problems/jian-sheng-zi-lcof/solution/shuang-jie-fa-dong-tai-gui-hua-tan-xin-fa-fu-zha-2/
