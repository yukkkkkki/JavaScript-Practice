/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
// 方法一：双指针
// 两个指针扫长串和短串
// 如果短串走完了，说明短串中的字符在长串中都有匹配
// 否则，短串没有走完，长串走完了，说明长串考察完了也没能找齐短串的所有字符
var isSubsequence = function (s, t) {
  const n = s.length;
  const m = t.length;
  let i = 0;
  let j = 0;

  while (i < n && j < m) {
    // 如果指向的字符相同，两个指针都移动
    if (s[i] == t[j]) i++;
    // 如果不相同，短串的指针不动，长串的指针移动
    j++;
  }

  return i === n;
};
// 时间复杂度：O(n + m)
// 空间复杂度：O(1)

// 方法二：递归
var isSubsequence = function (s, t) {
  if (s.length == 0) return true;
  let i = 0;
  while (i < t.length) {
    if (s[0] == t[i]) {
      const rest_sub = s.substring(1);
      const rest_str = t.substring(i + 1);
      return isSubsequence(rest_sub, rest_str);
    }
    i++;
  }
  return false;
};

// 方法三：利用栈
var isSubsequence = function (s, t) {
  const sStack = s.split('');
  const tArray = t.split('');
  for (let i = 0; i < tArray.length; i++) {
    if (tArray[i] === sStack[0]) {
      sStack.shift();
    }

    if (sStack.length === 0) {
      return true;
    }
  }
  if (sStack.length === 0) {
    return true;
  }
  return false;
};
