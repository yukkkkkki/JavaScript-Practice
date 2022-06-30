/**
 * @param {string[]} words
 * @return {number}
 */
// 方法一：位运算
var maxProduct = function (words) {
  const n = words.length;
  // 记录每个单词的位掩码表示
  const masks = new Array(n).fill(0);

  for (let i = 0; i < n; i++) {
    const word = words[i];
    const len = word.length;
    // 使用位运算预处理每个单词
    for (let j = 0; j < len; j++) {
      // 使用位掩码的最低 26 位分别表示每个字母是否在这个单词中出现
      masks[i] |= 1 << (word[j].charCodeAt() - 'a'.charCodeAt());
    }
  }

  let maxProd = 0;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      // 判断第 i 个单词和第 j 个单词是否有公共字母
      if ((masks[i] & masks[j]) === 0) {
        maxProd = Math.max(maxProd, words[i].length * words[j].length);
      }
    }
  }

  return maxProd;
};
// 时间复杂度：O(L + n^2)
// 空间复杂度：O(n)
