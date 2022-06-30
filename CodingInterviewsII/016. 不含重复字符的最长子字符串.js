/**
 * @param {string} s
 * @return {number}
 */
// 方法一：滑动窗口
// 示例:
// 以 (a)bcabcbb 开始的最长字符串为 (abc)abcbb
// 以 a(b)cabcbb 开始的最长字符串为 a(bca)bcbb
// 以 ab(c)abcbb 开始的最长字符串为 ab(cab)cbb
// 以 abc(a)bcbb 开始的最长字符串为 abc(abc)bb
// 以 abca(b)cbb 开始的最长字符串为 abca(bc)bb
// 以 abcab(c)bb 开始的最长字符串为 abcab(cb)b
// 以 abcabc(b)b 开始的最长字符串为 abcabc(b)b
// 以 abcabcb(b) 开始的最长字符串为 abcabcb(b)
var lengthOfLongestSubstring = function (s) {
  const occ = new Set();
  const n = s.length;

  let rk = -1;
  let res = 0;
  for (let i = 0; i < n; i++) {
    // 左指针向右移动一格，移除一个字符
    if (i !== 0) occ.delete(s.charAt(i - 1));

    // 不断地向右移动右指针，但需要保证这两个指针对应的子串中没有重复的字符
    while (rk + 1 < n && !occ.has(s.charAt(rk + 1))) {
      occ.add(s.charAt(rk + 1));
      rk++;
    }

    res = Math.max(res, rk - i + 1);
  }

  return res;
};
// 时间复杂度：O(N)
// 空间复杂度：O(|Σ|)
