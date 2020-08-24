// 数字 n 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 有效的 括号组合。

// 示例：
// 输入：n = 3
// 输出：[
//        "((()))",
//        "(()())",
//        "(())()",
//        "()(())",
//        "()()()"
//      ]

// 方法一：DFS回溯
var generateParenthesis = function (n) {
  let res = [];
  function backTrack(left, right, n, s) {
    // 终止条件：如果左右括弧都用完则结束
    if (left === n && right === n) {
      res.push(s);
      return;
    }

    // 如果左括弧未用完则继续增加左括弧
    if (left < n) {
      backTrack(left + 1, right, n, s + '(');
    }
    // 如果右括弧少于左括弧则继续增加右括弧
    if (left > right) {
      backTrack(left, right + 1, n, s + ')');
    }
  }

  backTrack(0, 0, n, '');
  return res;
};

// console.log(generateParenthesis(3));

// 方法二：动态规划
// f(n) == ((f0))f(n-1) + (f(1))f(n-2) + (f(2))f(n-3) + ... +(f(i))f(n-i-1) + ... + (f(n-1))
var generateParenthesis = function (n) {
  var results = [['']];
  for (let i = 1; i <= n; i++) {
    let res = [];
    for (let j = 0; j < i; j++) {
      let first = results[j];
      let second = results[i - j - 1];
      for (let key in first) {
        let tmpFirst = first[key];
        for (let secondKey in second) {
          let tmpSecond = second[secondKey];
          res.push('(' + tmpFirst + ')' + tmpSecond);
        }
      }
    }
    results.push(res);
  }
  return results[results.length - 1];
};
