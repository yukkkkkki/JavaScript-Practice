// 小扣出去秋游，途中收集了一些红叶和黄叶，他利用这些叶子初步整理了一份秋叶收藏集 leaves， 字符串 leaves 仅包含小写字符 r 和 y， 其中字符 r 表示一片红叶，字符 y 表示一片黄叶。
// 出于美观整齐的考虑，小扣想要将收藏集中树叶的排列调整成「红、黄、红」三部分。每部分树叶数量可以不相等，但均需大于等于 1。每次调整操作，小扣可以将一片红叶替换成黄叶或者将一片黄叶替换成红叶。请问小扣最少需要多少次调整操作才能将秋叶收藏集调整完毕。

// 示例 1：
// 输入：leaves = "rrryyyrryyyrr"
// 输出：2
// 解释：调整两次，将中间的两片红叶替换成黄叶，得到 "rrryyyyyyyyrr"

// 示例 2：
// 输入：leaves = "ryr"
// 输出：0
// 解释：已符合要求，不需要额外操作

// 提示：
// 3 <= leaves.length <= 10^5
// leaves 中只包含字符 'r' 和字符 'y'

/**
 * @param {string} leaves
 * @return {number}
 */

// 方法一：动态规划
// 思路：
// dp[i][j]：对第0片到第i片叶子进行调整操作，并且第i片叶子处于状态j时的最小操作次数
// 当 j = 0
//    dp[i][0] = dp[i - 1][0] + isYellow(i),
//    其中isYellow(i)为示性函数，第i片叶子为黄色时为1， 红色时为0
// 当 j = 1
//    dp[i][1] = min(dp[i - 1][0], dp[i - 1][1]) + isRed(i)
//    其中isYellow(i)为示性函数，第i片叶子为红色时为1， 黄色时为0
// 当 j = 2
//    dp[i][2] = min(dp[i - 1][1], dp[i - 1][2]) + isYellow(i)
// dp[0][0] = isYellow(0)
var minimumOperations = function (leaves) {
  const n = leaves.length;
  const dp = new Array(n).fill(0).map(() => new Array(3).fill(0));
  const isYellow = (char) => {
    return char == 'y';
  };
  const isRed = (char) => {
    return char == 'r';
  };
  dp[0][0] = isRed(leaves[0]) ? 0 : 1;
  dp[0][1] = dp[0][2] = dp[1][2] = Number.MAX_SAFE_INTEGER;
  for (let i = 1; i < n; i++) {
    dp[i][0] = dp[i - 1][0] + (isYellow(leaves[i]) ? 1 : 0);
    dp[i][1] =
      Math.min(dp[i - 1][0], dp[i - 1][1]) + (isRed(leaves[i]) ? 1 : 0);
    if (i >= 2) {
      dp[i][2] =
        Math.min(dp[i - 1][1], dp[i - 1][2]) + (isYellow(leaves[i]) ? 1 : 0);
    }
  }
  return dp[n - 1][2];
};
// 时间复杂度：O(n); 空间复杂度：O(n)

// 降维
var minimumOperations = function (leaves) {
  const n = leaves.length;
  let dp = [leaves[0] === 'r' ? 0 : 1, Infinity, Infinity];
  for (let i = 1; i < n; i++) {
    let isRed = leaves[i] === 'r';
    dp = [
      dp[0] + (isRed ? 0 : 1),
      Math.min(dp[0], dp[1]) + (isRed ? 1 : 0),
      Math.min(dp[1], dp[2]) + (isRed ? 0 : 1),
    ];
  }
  return dp[2];
};
// console.log(minimumOperations('rrryyyrryyyrr'));
