/**
 * @param {number} n
 * @return {string[]}
 */
// 方法一：回溯
var generateParenthesis = function (n) {
  const res = [];
  const backTrack = (left, right, path) => {
    if (left === right && left === n) {
      res.push(path);
      return;
    }

    if (left < right || left > n) {
      return;
    }

    backTrack(left + 1, right, path + '(');
    backTrack(left, right + 1, path + ')');
  };

  backTrack(0, 0, '');
  return res;
};
