/**
 * @param {string} S
 * @return {number}
 */
// 方法一：栈
// 思路：
// 当我们遇到一个左括号(时，将深度加一，并且新的深度的得分置为0
// 当我们遇到一个右括号)时，我们将当前深度的得分乘2并加到上一层的深度
// 例外情况，如果遇到的是 ()，那么只将得分加一
var scoreOfParentheses = function (S) {
  const n = S.length;
  const stack = [0];
  if (n === 0) return stack;
  for (let i = 0; i < n; i++) {
    if (S[i] === "(") {
      stack.push(0);
    } else {
      let v = stack.pop();
      let w = stack.pop();
      stack.push(w + Math.max(2 * v, 1));
    }
  }
  return stack.pop();
};

// 方法二:分治
var scoreOfParentheses = function (S) {
  const n = S.length;
  const help = (S, i, j) => {
    let ans = 0,
      bal = 0;
    for (let k = i; k < j; ++k) {
      bal += S.charAt(k) == "(" ? 1 : -1;
      if (bal == 0) {
        if (k - i == 1) ans++;
        else ans += 2 * help(S, i + 1, k);
        i = k + 1;
      }
    }
    return ans;
  };
  return help(S, 0, n);
};
