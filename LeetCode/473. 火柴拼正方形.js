/**
 * @param {number[]} matchsticks
 * @return {boolean}
 */
// 方法一：回溯
var makesquare = function (matchsticks) {
  const totalLen = _.sum(matchsticks);
  // 所有火柴的总长度如果不是 4 的倍数，那么不可能拼成正方形
  if (totalLen % 4 !== 0) return false;

  matchsticks.sort((a, b) => a - b);
  for (let i = 0, j = matchsticks.length - 1; i < j; i++, j--) {
    const temp = matchsticks[i];
    matchsticks[i] = matchsticks[j];
    matchsticks[j] = temp;
  }

  // 记录 4 条边已经放入的火柴总长度
  const edges = new Array(4).fill(0);
  return dfs(0, matchsticks, edges, Math.floor(totalLen / 4));
};
const dfs = (index, matchsticks, edges, len) => {
  if (index === matchsticks.length) return true;

  for (let i = 0; i < len; i++) {
    edges[i] += matchsticks[index];
    // 第 index 火柴，尝试把它放入其中一条边内且满足放入后该边的火柴总长度不超过 len
    // 然后继续枚举第 index+1 根火柴的放置情况
    if (edges[i] <= len && dfs(index + 1, matchsticks, edges, len)) {
      return true;
    }
    edges[i] -= matchsticks[index];
  }

  return false;
};
// 时间复杂度：O(4^n)
// 空间复杂度：O(n)