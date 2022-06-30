/**
 * @param {string} s
 * @return {boolean}
 */
// 方法一：贪心
var validPalindrome = function (s) {
  let low = 0;
  let high = s.length - 1;

  while (low < high) {
    let c1 = s[low];
    let c2 = s[high];
    if (c1 === c2) {
      low++;
      high--;
    } else {
      // 两个字符中必须有一个被删除，分成两种情况：
      // 1. 删除左指针对应的字符，留下子串 s[low + 1 : high]
      // 2. 删除右指针对应的字符，留下子串 s[low : high − 1]
      return (
        checkPalindrome(s, low, high - 1) || checkPalindrome(s, low + 1, high)
      );
    }
  }
  return true;
};
const checkPalindrome = (s, low, high) => {
  for (let i = low, j = high; i < j; i++, j--) {
    if (s[i] !== s[j]) return false;
  }
  return true;
};
// 时间复杂度：O(n)
// 空间复杂度：O(1)
