/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
// 方法一：滑动窗口
var minWindow = function (s, t) {
  let need = {};
  // 窗口的字符
  let window = {};

  for (let a of t) {
    // 统计需要的字符
    need[a] = (need[a] || 0) + 1;
  }

  let left = 0;
  let right = 0;
  let valid = 0;
  // 最小覆盖子串的起始索引及长度
  let start = 0;
  let len = Number.MAX_VALUE;

  while (right < s.length) {
    let c = s[right]; // 即将移入窗口的字符
    // 右移窗口
    right++;
    // 当前字符在需要的字符中，则更新当前窗口统计
    if (need[c]) {
      window[c] = (window[c] || 0) + 1;
      if (window[c] == need[c]) {
        // 当前窗口和需要的字符匹配时，验证数量增加1
        valid++;
      }
    }
    // 当验证数量与需要的字符个数一致时，就应该收缩窗口了
    while (valid === Object.keys(need).length) {
      // 更新最小覆盖子串
      if (right - left < len) {
        start = left;
        len = right - left;
      }
      // 即将移出窗口的字符
      let d = s[left];
      left++;
      if (need[d]) {
        if (window[d] === need[d]) {
          valid--;
        }
        window[d]--;
      }
    }
  }

  return len === Number.MAX_VALUE ? '' : s.substr(start, len);
};
