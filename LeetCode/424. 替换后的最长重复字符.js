/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
// 方法一：滑动窗口
// 每次右指针右移，如果区间仍然满足条件，那么左指针不移动，否则左指针至多右移一格，保证区间长度不减小
var characterReplacement = function (s, k) {
  // 用来记录滑动窗口内字母出现的次数
  let num = new Array(26).fill(0);
  const n = s.length;
  let maxn = 0;
  let left = 0;
  let right = 0;

  while (right < n) {
    // 一个字母进入窗口，在 num 中将次数加一，并且更新最大字母重复次数
    num[s[right].charCodeAt() - "A".charCodeAt()]++;
    maxn = Math.max(maxn, num[s[right].charCodeAt() - "A".charCodeAt()]);

    // 判断当前窗口字符是否符合规则
    // 如果当前窗口长度 - 最大字母出现次数 > 最大替换次数 K，则不符合规则
    if (right - left + 1 - maxn > k) {
      num[s[left].charCodeAt() - "A".charCodeAt()]--;
      left++;
    }

    right++;
  }

  return right - left;
};
// 时间复杂度：O(n)
// 空间复杂度：O(|Σ|)
