// 返回字符串 text 中按字典序排列最小的子序列，该子序列包含 text 中所有不同字符一次。

// 示例 1：
// 输入："cdadabcc"
// 输出："adbc"

// 示例 2：
// 输入："abcd"
// 输出："abcd"

// 示例 3：
// 输入："ecbacba"
// 输出："eacb"

// 示例 4：
// 输入："leetcode"
// 输出："letcod"

/**
 * @param {string} s
 * @return {string}
 */
var smallestSubsequence = function (s) {
  if (!s || !(s.length > 0)) {
    return '';
  }
  const stack = [s[0]];
  for (let i = 1; i < s.length; i += 1) {
    if (stack.indexOf(s[i]) === -1) {
      if (
        stack[stack.length - 1] > s[i] &&
        s.slice(i).indexOf(stack[stack.length - 1]) !== -1
      ) {
        stack.pop();
        if (stack.length > 0) {
          i--;
          continue;
        }
      }
      stack.push(s[i]);
    }
  }
  return stack.join('');
};
