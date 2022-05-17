/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
// 方法一：双指针
// 在保证 cnt 的值不为正的情况下，去考察是否存在一个区间，其长度恰好为 n
// 初始时，仅统计 s1，则 cnt 的值均不为正，且元素值之和为 −n
var checkInclusion = function (s1, s2) {
  const n = s1.length;
  const m = s2.length;
  if (n > m) return false;

  const cnt = new Array(26).fill(0);
  for (let i = 0; i < n; i++) {
    --cnt[s1[i].charCodeAt() - 'a'.charCodeAt()];
  }

  // 用两个指针 l 和 r 表示考察的区间 [left, right]
  let l = 0;
  // r 每向右移动一次，就统计一次进入区间的字符 x
  for (let r = 0; r < m; r++) {
    const x = s2[r].charCodeAt() - 'a'.charCodeAt();
    ++cnt[x];

    // 为保证 cnt 的值不为正，若此时 cnt[x] > 0，则向右移动 l
    // 减少离开区间的字符的 cnt 值直到 cnt[x] ≤ 0
    while (cnt[x] > 0) {
      --cnt[s2[l].charCodeAt() - 'a'.charCodeAt()];
      ++l;
    }

    if (r - l + 1 === n) return true;
  }
  return false;
};
// 时间复杂度：O(n+m+∣Σ∣)
// 空间复杂度：O(∣Σ∣)

// 方法二：滑动窗口
// 遍历 s2 中的每个长度为 n 的子串，判断子串和 s1 中每个字符的个数是否相等，若相等则说明该子串是 s1 的一个排列
// 使用两个数组 cnt1 和 cnt2，cnt1 统计 s1 中各个字符的个数，cnt2 统计当前遍历的子串中各个字符的个数。
var checkInclusion = function (s1, s2) {
  const n = s1.length;
  const m = s2.length;

  if (n > m) return false;

  const cnt1 = new Array(26).fill(0);
  const cnt2 = new Array(26).fill(0);

  for (let i = 0; i < n; i++) {
    ++cnt1[s1[i].charCodeAt() - 'a'.charCodeAt()];
    ++cnt2[s2[i].charCodeAt() - 'a'.charCodeAt()];
  }

  if (cnt1.toString() === cnt2.toString()) {
    return true;
  }

  for (let i = n; i < m; i++) {
    // 滑动窗口每向右滑动一次，就多统计一次进入窗口的字符，少统计一次离开窗口的字符
    ++cnt2[s2[i].charCodeAt() - 'a'.charCodeAt()];
    --cnt2[s2[i - n].charCodeAt() - 'a'.charCodeAt()];
    if (cnt1.toString() === cnt2.toString()) {
      return true;
    }
  }

  return false;
};
