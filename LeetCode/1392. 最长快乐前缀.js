/**
 * @param {string} s
 * @return {string}
 */
// 方法一：KMP 求 next 数组算法
var longestPrefix = function (s) {
  const n = s.length;
  let j = -1; // 前缀表统一减 1
  // next[i] 表示关于字符串 s 的子串 s[0..i] 最长的既是前缀也是后缀的字符串，但这个字符串不能是 s[0..i] 本身
  let next = [j];

  for (let i = 1; i < n; i++) {
    // 处理前后缀不相同情况
    while (j >= 0 && s[i] !== s[j + 1]) {
      j = next[j];
    }

    // 处理前后缀相同情况
    if (s[i] === s[j + 1]) {
      j++;
    }
    next.push(j);
  }

  return s.substring(0, next[next.length - 1] + 1);
};
// 时间复杂度：O(N)
// 空间复杂度：O(N)

let s = 'ababab';
console.log(longestPrefix(s));
