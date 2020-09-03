// 给定一个字符串S，通过将字符串S中的每个字母转变大小写，我们可以获得一个新的字符串。返回所有可能得到的字符串集合。

// 示例：
// 输入：S = "a1b2"
// 输出：["a1b2", "a1B2", "A1b2", "A1B2"]

// 输入：S = "3z4"
// 输出：["3z4", "3Z4"]

// 输入：S = "12345"
// 输出：["12345"]

/**
 * @param {string} S
 * @return {string[]}
 */
// 回溯
var letterCasePermutation = function (S) {
  const res = [];

  const backTrack = (start, tmpStr) => {
    res.push(tmpStr);
    for (let i = start; i < tmpStr.length; i++) {
      if (tmpStr[i] >= 'a' && tmpStr[i] <= 'z') {
        backTrack(
          i + 1,
          tmpStr.slice(0, i) + tmpStr[i].toUpperCase() + tmpStr.slice(i + 1)
        );
      } else if (tmpStr[i] >= 'A' && tmpStr[i] <= 'Z') {
        backTrack(
          i + 1,
          tmpStr.slice(0, i) + tmpStr[i].toLowerCase() + tmpStr.slice(i + 1)
        );
      }
    }
  };

  backTrack(0, S);
  return res;
};
