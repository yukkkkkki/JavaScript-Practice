/**
 * @param {number} n
 * @return {number[]}
 */
// 方法一：迭代
var twoSum = function (n) {
  if (n < 1) return [];
  const res = [0, 1, 1, 1, 1, 1, 1];
  for (let i = 1; i < n; i++) {
    for (let j = 6 * n; j > 0; j--) {
      res[j] = res
        .slice(Math.max(0, j - 6), j)
        .reduce((acc, cur) => acc + cur, 0);
    }
  }
  return res
    .slice(1)
    .map((num) => num / Math.pow(6, n))
    .filter(Boolean);
};

// 方法二：动态规划
// 两个骰子甩出来的点数和：sum = x + y
// x为一个骰子【也可以理解为新的一个】甩出来的点数，y为前几个骰子甩出来的和
// 状态转移方程：
//     dp[sum] = dp[sum] + dp[y] * 1/6
var twoSum = function (n) {
  let dp = [1 / 6, 1 / 6, 1 / 6, 1 / 6, 1 / 6, 1 / 6];
  for (let i = 2; i <= n; i++) {
    const temp = [];
    for (let j = 1; j <= 6; j++) {
      for (let k = 0; k < dp.length; k++) {
        const sum = k + j - 1;
        temp[sum] = (temp[sum] || 0) + (dp[k] * 1) / 6;
      }
    }
    dp = temp;
  }
  return dp;
};

// 方法三：递归
var twoSum = function (n) {
  let sum = 0;
  let res = new Array(n * 6 - n + 1).fill(0);

  const dfs = (s, n) => {
    if (n == 0) {
      sum++;
      res[s]++;
      return;
    }
    for (let i = 0; i < 6; i++) {
      dfs(s + i, n - 1);
    }
  };

  dfs(0, n);
  return res.map((i) => i / sum);
};
