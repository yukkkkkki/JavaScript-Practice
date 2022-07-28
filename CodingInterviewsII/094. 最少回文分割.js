/**
 * @param {string} s
 * @return {number}
 */
// 方法一：动态规划
var minCut = function (s) {
  const n = s.length;
  const g = new Array(n).fill(0).map(() => new Array(n).fill(true));

  // g[i][j] 表示 s[i...j] 是否为回文串
  // g[i][j] = true, i >= j
  // g[i][j] = g(i + 1, j − 1) ∧ (s[i] = s[j]), otherwise
  for (let i = n - 1; i >= 0; i--) {
    for (let j = i + 1; j < n; j++) {
      g[i][j] = s[i] === s[j] && g[i + 1][j - 1];
    }
  }

  // f[i] 表示字符串的前缀 s[0...i] 的最少分割次数
  // f[i] = min(f[j], f[j] + 1)
  // 即枚举最后一个回文串的起始位置 j + 1, 保证 s[j + 1...i] 是一个回文串，则 f[i] 可以从 f[j] 转移而来，附加 1 次额外的分割次数
  const f = new Array(n).fill(Number.MAX_SAFE_INTEGER);
  for (let i = 0; i < n; i++) {
    if (g[0][i]) {
      f[i] = 0;
    } else {
      for (let j = 0; j < i; j++) {
        if (g[j + 1][i]) {
          f[i] = Math.min(f[i], f[j] + 1);
        }
      }
    }
  }

  return f[n - 1];
};
// 时间复杂度：O(n^2)
// 空间复杂度：O(n^2)
