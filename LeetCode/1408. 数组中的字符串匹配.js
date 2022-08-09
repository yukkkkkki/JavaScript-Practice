/**
 * @param {string[]} words
 * @return {string[]}
 */
// 方法一：暴力枚举
var stringMatching = function (words) {
  const res = [];
  for (let i = 0; i < words.length; i++) {
    for (let j = 0; j < words.length; j++) {
      if (i !== j && words[j].indexOf(words[i]) !== -1) {
        res.push(words[i]);
        break;
      }
    }
  }

  return res;
};
// 时间复杂度：O(n^2 x L^2)
// 空间复杂度：O(1)
