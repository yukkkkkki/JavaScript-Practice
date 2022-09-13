/**
 * @param {string[]} words
 * @return {number}
 */
// 方法一：哈希 + 贪心
var longestPalindrome = function (words) {
  let map = {}; // 统计 words 中每个单词的出现次数
  let res = 0;

  for (let i = 0; i < words.length; i++) {
    const reverseWord = words[i][1] + words[i][0];
    if (map[reverseWord]) {
      res += 4;
      map[reverseWord] -= 1;
    } else {
      map[words[i]] = (map[words[i]] || 0) + 1;
    }
  }

  for (let word in map) {
    if (map[word] && word[0] == word[1]) {
      return res + 2;
    }
  }

  return res;
};
