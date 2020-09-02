// 括号。设计一种算法，打印n对括号的所有合法的（例如，开闭一一对应）组合。

// 说明：解集不能包含重复的子集。

// 例如，给出 n = 3，生成结果为：
// [
//   "((()))",
//   "(()())",
//   "(())()",
//   "()(())",
//   "()()()"
// ]

// 方法一：回溯
var generateParenthesis = function (n) {
  let res = [];

  /**
   * l 代表左括号使用的数量
   * r 代表右括号使用的数量
   * current 代表当前拼接的字符
   * 注意：当 l > r 的时候，才可以使用右括号, l < n才可以使用左括号
   * 终止条件：l + r === 2n
   */
  const backTrack = (l, r, current) => {
    if (l + r == 2 * n) {
      res.push(current);
      return;
    }

    // 使用左括号
    if (l < n) {
      backTrack(l + 1, r, current + '(');
    }

    // 使用有括号
    if (l > r) {
      backTrack(l, r + 1, current + ')');
    }
  };

  backTrack(0, 0, '');
  return res;
};

// 参考：
作者：lhz960904
链接：https://leetcode-cn.com/problems/bracket-lcci/solution/javascript-hui-su-suan-fa-xiang-xi-zhu-shi-by-lhz9/