// 给定 S 和 T 两个字符串，当它们分别被输入到空白的文本编辑器后，判断二者是否相等，并返回结果。 # 代表退格字符。

// 注意：如果对空文本输入退格字符，文本继续为空。

// 示例 1：
// 输入：S = "ab#c", T = "ad#c"
// 输出：true
// 解释：S 和 T 都会变成 “ac”。

// 示例 2：
// 输入：S = "ab##", T = "c#d#"
// 输出：true
// 解释：S 和 T 都会变成 “”。

// 示例 3：
// 输入：S = "a##c", T = "#a#c"
// 输出：true
// 解释：S 和 T 都会变成 “c”。

// 示例 4：
// 输入：S = "a#c", T = "b"
// 输出：false
// 解释：S 会变成 “c”，但 T 仍然是 “b”。

/**
 * @param {string} S
 * @param {string} T
 * @return {boolean}
 */
// 方法一：栈
var backspaceCompare = function (S, T) {
  let Sstack = [];
  let Tstack = [];
  let s = 0;
  let t = 0;
  while (s < S.length) {
    if (S[s] == '#') {
      Sstack.pop();
    } else {
      Sstack.push(S[s]);
    }
    s++;
  }
  while (t < T.length) {
    if (T[t] == '#') {
      Tstack.pop();
    } else {
      Tstack.push(T[t]);
    }
    t++;
  }
  return Sstack.join('') == Tstack.join('');
};

// 方法二：双指针
// 思路：
// 定义 skip 表示当前待删除的字符的数量。每次我们遍历到一个字符
// 若该字符为退格符，则我们需要多删除一个普通字符，skip++;
// 若该字符为普通字符
//   若 skip 为 0，则说明当前字符不需要删去
//   若 skip 不为 0，则说明当前字符需要删去，skip--;
var backspaceCompare = function (S, T) {
  let i = S.length - 1,
    j = T.length - 1;
  let skipS = 0,
    skipT = 0;
  while (i >= 0 || j >= 0) {
    while (i >= 0) {
      if (S.charAt(i) == '#') {
        skipS++;
        i--;
      } else if (skipS > 0) {
        skipS--;
        i--;
      } else {
        break;
      }
    }
    while (j >= 0) {
      if (T.charAt(j) == '#') {
        skipT++;
        j--;
      } else if (skipT > 0) {
        skipT--;
        j--;
      } else {
        break;
      }
    }
    if (i >= 0 && j >= 0) {
      if (S.charAt(i) !== T.charAt(j)) {
        return false;
      }
    } else {
      if (i >= 0 || j >= 0) {
        return false;
      }
    }
    i--;
    j--;
  }
  return true;
};
// console.log(backspaceCompare('a#c', 'b'));
