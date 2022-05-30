/**
 * @param {string} p
 * @return {number}
 */
// 方法一：动态规划
// dp[α] 表示 p 中以字符 α 结尾且在 s 中的子串的最长长度
var findSubstringInWraproundString = function (p) {
  const dp = new Array(26).fill(0);
  let k = 0;
  for (let i = 0; i < p.length; i++) {
    // 字符之差为 1 或 -25
    if (i > 0 && (p[i].charCodeAt() - p[i - 1].charCodeAt() + 26) % 26 === 1) {
      // 如果 p[i] 是 p[i−1] 在字母表中的下一个字母，则将 k 加一
      ++k;
    } else {
      // 表示重新开始计算连续递增的子串长度
      k = 1;
    }

    // 用 k 更新 dp[p[i]] 的最大值
    dp[p[i].charCodeAt() - 'a'.charCodeAt()] = Math.max(
      dp[p[i].charCodeAt() - 'a'.charCodeAt()],
      k
    );
  }
  return _.sum(dp);
};
// 时间复杂度：O(n)
//空间复杂度：O(|Σ|)
