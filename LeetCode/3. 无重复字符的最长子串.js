/**
 * @param {string} s
 * @return {number}
 */
// 方法一
var lengthOfLongestSubstring = function (s) {
  const len = s.length;
  let res = 0;
  let temp = '';
  for (let i = 0; i < len; i++) {
    if (temp.indexOf(s[i]) === -1) {
      temp += s[i];
      res = Math.max(res, temp.length);
    } else {
      temp = temp.slice(temp.indexOf(s[i]) + 1);
      temp += s[i];
    }
  }
  return res;
};

// 方法二：哈希表 Map
var lengthOfLongestSubstring = function (s) {
  let map = new Map();
  let max = 0;
  for (let i = 0, j = 0; j < s.length; j++) {
    if (map.has(s[j])) {
      i = Math.max(map.get(s[j]) + 1, i);
    }

    max = Math.max(max, j - i + 1);
    map.set(s[j], j);
  }
  return max;
};

// 方法三：滑动窗口
// 以 (a)bcabcbb 开始的最长字符串为 (abc)abcbb；
// 以 a(b)cabcbb 开始的最长字符串为 a(bca)bcbb；
// 以 ab(c)abcbb 开始的最长字符串为 ab(cab)cbb；
// 以 abc(a)bcbb 开始的最长字符串为 abc(abc)bb；
// 以 abca(b)cbb 开始的最长字符串为 abca(bc)bb；
// 以 abcab(c)bb 开始的最长字符串为 abcab(cb)b；
// 以 abcabc(b)b 开始的最长字符串为 abcabc(b)b；
// 以 abcabcb(b) 开始的最长字符串为 abcabcb(b)。
var lengthOfLongestSubstring = function (s) {
  const occ = new Set();
  const n = s.length;
  // 右指针
  let rk = -1;
  let ans = 0;

  // 左指针向右移动一格，表示开始枚举下一个字符作为起始位置
  for (let i = 0; i < n; i++) {
    if (i != 0) {
      // 左指针向右移动一格，移除一个字符
      occ.delete(s.charAt(i - 1));
    }

    // 不断地向右移动右指针，需保证这左右指针对应的子串中没有重复的字符
    while (rk + 1 < n && !occ.has(s.charAt(rk + 1))) {
      occ.add(s.charAt(rk + 1));
      rk++;
    }

    // 第 i 到 rk 个字符是一个极长的无重复字符子串
    ans = Math.max(ans, rk - i + 1);
  }
  return ans;
};
// 时间复杂度：O(N)
// 空间复杂度：O(∣Σ∣)
