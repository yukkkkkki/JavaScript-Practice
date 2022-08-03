/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
// 方法一：分情况讨论
// 分别考虑 k = 1 和 k > 1 的两种情况
// 当 k = 1 时:
//    每次只能取 s 的首个字符并将其移动到末尾，因此对于给定的字符串，可能的移动方法是唯一的，移动后的结果也是唯一的。
//    对于长度为 n 的字符串 s，经过 0 次到 n - 1 次移动之后分别得到 n 个字符串，这 n 个字符串中的字典序最小的字符串即为答案。
// 当 k > 1 时：
//    一定可以经过移动将 s 变成升序字符串，因此将字符串 s 升序排序之后得到的字符串即为答案
var orderlyQueue = function (s, k) {
  if (k === 1) {
    let res = s;
    for (let i = 0; i < s.length - 1; i++) {
      const n = s.length;
      s = s.substring(1, n) + s[0];
      res = res < s ? res : s;
    }
    return res;
  }

  return [...s].sort().join("");
};
// 时间复杂度：O(n^2)
// 空间复杂度：O(n)
