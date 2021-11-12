/**
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
// 方法一：动态规划
var kInversePairs = function (n, k) {
  const MOD = 1000000007;
  let f = new Array(n + 1).fill(0).map((r) => new Array(k + 1).fill(0));
  // 不用任何数字可以构成一个空数组，它包含 0 个逆序对
  f[0][0] = 1;

  for (let i = 1; i <= n; i++) {
    for (let j = 0; j <= k; j++) {
      // 当 f[i][j] 中的 j<0 时，逆序对数不可能小于0，所以为0
      f[i][j] =
        (j - 1 >= 0 ? f[i][j - 1] : 0) -
        (j - i >= 0 ? f[i - 1][j - i] : 0) +
        f[i - 1][j];
      // 数值处理
      if (f[i][j] >= MOD) {
        f[i][j] -= MOD;
      } else if (f[i][j] < 0) {
        f[i][j] += MOD;
      }
    }
  }
  return f[n][k];
};
