/**
 * @param {string} S
 * @return {string[]}
 */
// 方法一：回溯
var letterCasePermutation = function (S) {
  const res = [];
  const n = S.length;

  const backTrack = (i, temp) => {
    if (i === n) return res.push(temp);
    if (isNaN(S[i])) {
      backTrack(i + 1, temp + S[i].toLowerCase());
      backTrack(i + 1, temp + S[i].toUpperCase());
    } else {
      backTrack(i + 1, temp + S[i]);
    }
  };

  backTrack(0, '');
  return res;
};
