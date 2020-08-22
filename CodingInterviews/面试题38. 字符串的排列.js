// 输入一个字符串，打印出该字符串中字符的所有排列。

// 你可以以任意顺序返回这个字符串数组，但里面不能有重复元素。

// 示例:
// 输入：s = "abc"
// 输出：["abc","acb","bac","bca","cab","cba"]

// 回溯
var permutation = function (s) {
  let len = s.length;
  let res = new Set();
  dfs("", s);
  return Array.from(res);

  /**
   * @param {string} str // 已拼接字符串
   * @param {string} rs // 剩余字符串
   */

  function dfs(str, rs) {
    if (str.length == len) res.add(str);
    let l = len - str.length;
    for (let i = 0; i < l; i++) {
      t = rs.slice(0, i) + rs.slice(i + 1);
      dfs(str + rs[i], t);
    }
  }
};
