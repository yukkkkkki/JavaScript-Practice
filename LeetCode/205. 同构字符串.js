/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
// 方法一：哈希表
// 维护两张哈希表
// 第一张哈希表 s2t 以 s 中字符为键，映射至 t 的字符为值
// 第二张哈希表 t2s 以 t 中字符为键，映射至 s 的字符为值
var isIsomorphic = function (s, t) {
  const s2t = {};
  const t2s = {};
  const n = s.length;

  for (let i = 0; i < n; i++) {
    const x = s[i];
    const y = t[i];

    // 当前下标 index 对应的字符 s[index] 已经存在映射且不为 t[index]
    // 或当前下标 index 对应的字符 t[index] 已经存在映射且不为 s[index]时，说明两个字符串无法构成同构
    if ((s2t[x] && s2t[x] !== y) || (t2s[y] && t2s[y] !== x)) {
      return false;
    }

    s2t[x] = y;
    t2s[y] = x;
  }

  return true;
};
// 时间复杂度：O(n)
// 空间复杂度：O(|Σ|)
