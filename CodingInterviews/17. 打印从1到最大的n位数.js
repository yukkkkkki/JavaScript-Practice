/**
 * @param {number} n
 * @return {number[]}
 */
// 方法一：DFS
var printNumbers = function (n) {
  let result = [];
  const dfs = (str, len) => {
    // 到达指定长度，返回
    if (str.length === len) {
      return result.push(str * 1);
    }

    for (let i = 0; i <= 9; i++) {
      // 例如 1，加 0 以后变成 10，然后继续 dfs ，然后撤销变成 1，方便下次变成 11 ，再下次变成 12，一直递归 + 回溯，深度优先搜索下去直到等于 len
      str += i;
      dfs(str, len);
      str = str.substring(0, str.length - 1);
    }
  };

  // 外层 i 控制长度，即 11 是两位，111 是三位     内层 j 控制该字符串第一位是什么，即首位
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= 9; j++) {
      dfs(j.toString(), i);
    }
  }

  return result;
};

// 方法二：
var printNumbers = function (n) {
  if (n === 0) return [];
  let result = [];
  for (let i = 1; i < Math.pow(10, n); i++) {
    result.push(i);
  }
  return result;
};
