/**
 * @param {string} s
 * @param {string[]} dictionary
 * @return {string}
 */
// 方法一：双指针
// 需要解决的问题：
// 如何判断 dictionary 中的字符串 t 是否可以通过删除 s 中的某些字符得到；
// 如何找到长度最长且字典序最小的字符串
var findLongestWord = function (s, dictionary) {
  let res = '';
  for (const t of dictionary) {
    let i = 0;
    let j = 0;
    while (i < t.length && j < s.length) {
      // 匹配成功则 i 和 j 同时右移
      if (t[i] === s[j]) {
        ++i;
      }
      // 匹配失败则 j 右移，i 不变
      ++j;
    }

    // 最终如果 i 移动到 t 的末尾，则说明 t 是 s 的子序列
    if (i === t.length) {
      if (t.length > res.length || (t.length === res.length && t < res)) {
        res = t;
      }
    }
  }
  return res;
};
// 时间复杂度：O(d×(m+n))
// 空间复杂度：O(1)
