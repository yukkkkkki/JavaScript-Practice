/**
 * @param {string[]} words
 * @param {string} order
 * @return {boolean}
 */
// 方法一：直接遍历
// 只需要依次检测 strs 中的字符串前一个字符串和后一个字符串在给定的字母表下小的字典序即可
var isAlienSorted = function (words, order) {
  // 首先将给定的 order 转化为字典序索引 index
  const index = new Array(26).fill(0);
  for (let i = 0; i < order.length; ++i) {
    index[order[i].charCodeAt() - 'a'.charCodeAt()] = i;
  }

  // 依次检测第 i 个单词 words[i] 与第 i - 1 个单词 words[i − 1] 的字典序大小
  for (let i = 1; i < words.length; i++) {
    let valid = false;
    for (let j = 0; j < words[i - 1].length && j < words[i].length; j++) {
      let prev = index[words[i - 1][j].charCodeAt() - 'a'.charCodeAt()];
      let curr = index[words[i][j].charCodeAt() - 'a'.charCodeAt()];

      if (prev < curr) {
        valid = true;
        break;
      } else if (prev > curr) {
        return false;
      }
    }
    if (!valid) {
      /* 比较两个字符串的长度 */
      if (words[i - 1].length > words[i].length) {
        return false;
      }
    }
  }
  return true;
};
// 时间复杂度：O(m*n)
// 空间复杂度：O(C)

// 方法二
// 所谓的翻译就是从 hlabcdefgijkmnopqrstuvwxyz到 abcdefghigklmnopqrstuvwxyz 的映射，之后判断字符串大小即可
var isAlienSorted = function (words, order) {
  const dict = {};
  for (let i = 0; i < order.length; i++) {
    dict[order[i]] = i;
  }

  words = words.map((word) => {
    return word.split('').reduce((res, w) => {
      return res + String.fromCharCode(97 + dict[w]);
    }, '');
  });

  for (let i = 1; i < words.length; i++) {
    if (words[i] < words[i - 1]) return false;
  }

  return true;
};
