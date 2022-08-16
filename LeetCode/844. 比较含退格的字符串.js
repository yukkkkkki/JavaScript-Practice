/**
 * @param {string} S
 * @param {string} T
 * @return {boolean}
 */
// 方法一：栈
var backspaceCompare = function (S, T) {
  return build(S) === build(T);
};
const build = (s) => {
  let i = 0;
  let stack = [];

  while (i < s.length) {
    if (s[i] === "#") stack.pop();
    else stack.push(s[i]);

    i++;
  }

  return stack.join("");
};
// 时间复杂度：O(n + m)
// 空间复杂度：O(n + m)

// 方法二：双指针
// 定义 skip 表示当前待删除的字符的数量。每次我们遍历到一个字符
// 若该字符为退格符，则我们需要多删除一个普通字符，skip++;
// 若该字符为普通字符
//   若 skip 为 0，则说明当前字符不需要删去
//   若 skip 不为 0，则说明当前字符需要删去，skip--;
var backspaceCompare = function (S, T) {
  let i = S.length - 1;
  let j = T.length - 1;
  let skipS = 0;
  let skipT = 0;

  while (i >= 0 || j >= 0) {
    while (i >= 0) {
      if (S.charAt(i) == "#") {
        skipS++;
        i--;
      } else if (skipS > 0) {
        skipS--;
        i--;
      } else break;
    }

    while (j >= 0) {
      if (T.charAt(j) == "#") {
        skipT++;
        j--;
      } else if (skipT > 0) {
        skipT--;
        j--;
      } else break;
    }

    if (i >= 0 && j >= 0) {
      if (S.charAt(i) !== T.charAt(j)) return false;
    } else {
      if (i >= 0 || j >= 0) return false;
    }

    i--;
    j--;
  }

  return true;
};
// console.log(backspaceCompare('a#c', 'b'));
