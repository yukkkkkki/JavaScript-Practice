/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
// 方法一：滑动窗口
var checkInclusion = function (s1, s2) {
  const n = s1.length;
  const m = s2.length;
  if (n > m) return false;

  const cnt1 = new Array(26).fill(0);
  // 统计当前遍历的子串中各个字符的个数
  const cnt2 = new Array(26).fill(0);

  for (let i = 0; i < n; i++) {
    ++cnt1[s1[i].charCodeAt() - 'a'.charCodeAt()];
    ++cnt2[s2[i].charCodeAt() - 'a'.charCodeAt()];
  }

  if (cnt1.toString() === cnt2.toString()) return true;

  // 使用一个固定长度为 n 的滑动窗口来维护 cnt2
  // 滑动窗口每向右滑动一次，就多统计一次进入窗口的字符，少统计一次离开窗口的字符
  for (let i = n; i < m; i++) {
    ++cnt2[s2[i].charCodeAt() - 'a'.charCodeAt()];
    --cnt2[s2[i - n].charCodeAt() - 'a'.charCodeAt()];

    if (cnt1.toString() === cnt2.toString()) return true;
  }

  return false;
};
// 时间复杂度：O(n + m +∣Σ∣)
// 空间复杂度：O(∣Σ∣)

// 方法一：双指针
var checkInclusion = function (s1, s2) {
  const n = s1.length;
  const m = s2.length;
  if (n > m) return false;

  const cnt = new Array(26).fill(0);
  for (let i = 0; i < n; i++) {
    --cnt[s1[i].charCodeAt() - 'a'.charCodeAt()];
  }

  let left = 0;
  for (let right = 0; right < m; right++) {
    // right 每向右移动一次，就统计一次进入区间的字符 x
    const x = s2[right].charCodeAt() - 'a'.charCodeAt();
    ++cnt[x];

    while (cnt[x] > 0) {
      // 减少离开区间的字符的 cnt 值直到 cnt[x] ≤ 0
      --cnt[s2[left].charCodeAt() - 'a'.charCodeAt()];
      ++left;
    }

    if (right - left + 1 === n) return true;
  }

  return false;
};
// 时间复杂度：O(n + m +∣Σ∣)
// 空间复杂度：O(∣Σ∣)
