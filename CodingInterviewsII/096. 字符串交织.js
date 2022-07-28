/**
 * @param {string} s1
 * @param {string} s2
 * @param {string} s3
 * @return {boolean}
 */
// 方法一：动态规划
// f[i][j] 表示 s1 的前 i 个元素和 s2 的前 j 个元素是否能交织组成 s3 的前 i + j 个元素
// 如果 s1 的第 i 个元素和 s3 的第 i + j 个元素相等
// 那么 s1 的前 i 个元素和 s2 的前 j 个元素是否能交织组成 s3 的前 i + j 个元素,
// 取决于 s1 的前 i - 1 个元素和 s2 的前 j 个元素是否能交织组成 s3 的前 i + j - 1 个元素
// 即，f[i][j] 取决于 f[i - 1][j]，若 f[i - 1][j] 为 true，则 f[i][j] 也为真
// f[i][j] = [f[i - 1][j] and s1[i - 1] == s3[p]] or [f[i][j - 1] and s2[j - 1] == s3[p]]
var isInterleave = function (s1, s2, s3) {
  const n = s1.length;
  const m = s2.length;
  const t = s3.length;
  if (n + m !== t) return false;

  const f = new Array(n + 1).fill(false).map(() => new Array(m + 1));
  f[0][0] = true;

  for (let i = 0; i <= n; i++) {
    for (let j = 0; j <= m; j++) {
      let p = i + j - 1;
      if (i > 0) {
        f[i][j] = f[i][j] || (f[i - 1][j] && s1.charAt(i - 1) === s3.charAt(p));
      }

      if (j > 0) {
        f[i][j] = f[i][j] || (f[i][j - 1] && s2.charAt(j - 1) === s3.charAt(p));
      }
    }
  }

  return f[n][m];
};

// 滚动数组优化
var isInterleave = function (s1, s2, s3) {
  const n = s1.length;
  const m = s2.length;
  const t = s3.length;
  if (n + m !== t) return false;

  const f = new Array(m + 1).fill(false);
  f[0] = true;
  for (let i = 0; i <= n; i++) {
    for (let j = 0; j <= m; j++) {
      let p = i + j - 1;
      if (i > 0) {
        f[j] &= s1[i - 1] === s3[p];
      }

      if (j > 0) {
        f[j] |= f[j - 1] && s2[j - 1] == s3[p];
      }
    }
  }

  return f[m];
};
// 时间复杂度：O(nm)
// 空间复杂度：O(m)
