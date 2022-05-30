/**
 * @param {number} maxChoosableInteger
 * @param {number} desiredTotal
 * @return {boolean}
 */
// 方法一：记忆化搜索 + 状态压缩
var canIWin = function (maxChoosableInteger, desiredTotal) {
  const memo = new Map();

  // 已经被使用的数字的集合 usedNumbers，这些数字的和为 currentTotal
  // 当某方行动时，如果他能在未选择的数字中选出一个 i，使得 i + currentTotal ≥ desiredTotal，则他能获胜
  // 否则，需要继续通过搜索来判断获胜方
  const dfs = (
    maxChoosableInteger,
    usedNumbers,
    desiredTotal,
    currentTotal
  ) => {
    if (!memo.has(usedNumbers)) {
      let res = false;
      for (let i = 0; i < maxChoosableInteger; i++) {
        if (((usedNumbers >> i) & 1) === 0) {
          if (i + 1 + currentTotal >= desiredTotal) {
            res = true;
            break;
          }
          if (
            !dfs(
              maxChoosableInteger,
              usedNumbers | (1 << i),
              desiredTotal,
              currentTotal + i + 1
            )
          ) {
            res = true;
            break;
          }
        }
      }
      memo.set(usedNumbers, res);
    }
    return memo.get(usedNumbers);
  };

  // 当所有数字选完仍无法到达 desiredTotal 时，两人都无法获胜，返回 false
  if (((1 + maxChoosableInteger) * maxChoosableInteger) / 2 < desiredTotal) {
    return false;
  }

  return dfs(maxChoosableInteger, 0, desiredTotal, 0);
};
// 时间复杂度：O(2^n * n)
// 空间复杂度：O(2^n)
