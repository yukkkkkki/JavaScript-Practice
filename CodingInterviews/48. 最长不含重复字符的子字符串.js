/**
 * @param {string} s
 * @return {number}
 */
// 方法一：滑动窗口
var lengthOfLongestSubstring = function (s) {
  const occ = new Set();
  const n = s.length;

  // 右指针，初始值为 -1，相当于在字符串的左边界的左侧，还没有开始移动
  let rk = -1;
  let res = 0;
  for (let i = 0; i < n; i++) {
    // 左指针向右移动一格，移除一个字符
    if (i != 0) occ.delete(s.charAt(i - 1));

    while (rk + 1 < n && !occ.has(s.charAt(rk + 1))) {
      // 不断地移动右指针
      occ.add(s.charAt(rk + 1));
      ++rk;
    }

    // 第 i 到 rk 个字符是一个极长的无重复字符子串
    res = Math.max(res, rk - i + 1);
  }

  return res;
};
// 时间复杂度：O(N)
// 空间复杂度：O(∣Σ∣)
