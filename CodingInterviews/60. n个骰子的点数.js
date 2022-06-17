/**
 * @param {number} n
 * @return {number[]}
 */
// 方法一：动态规划
var dicesProbability = function (n) {
  let dp = new Array(6).fill(1 / 6);

  for (let i = 2; i <= n; i++) {
    // n个骰子对应 5n + 1个和
    // temp[0] 是每个骰子都是 1 的概率，i 个骰子对应和为 i
    let temp = new Array(5 * i + 1).fill(0);
    // 遍历上一次的骰子每一个和对应的概率
    for (let j = 0; j < dp.length; j++) {
      // 这一次分别摇到 1 - 6，每一次的概率都是 1/6
      for (let k = 0; k < 6; k++) {
        temp[j + k] += dp[j] / 6;
      }
    }

    dp = temp;
  }
  return dp;
};

// 方法二：递归
var dicesProbability = function (n) {
  let sum = 0;
  let res = new Array(n * 6 - n + 1).fill(0);
  const dfs = (s, n) => {
    if (n === 0) {
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
