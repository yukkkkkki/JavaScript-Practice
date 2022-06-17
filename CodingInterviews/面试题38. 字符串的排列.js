/**
 * @param {string} s
 * @return {string[]}
 */
// 回溯
var permutation = function (s) {
  let len = s.length;
  let res = new Set();
  dfs('', s);
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
