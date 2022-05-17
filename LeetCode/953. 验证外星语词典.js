/**
 * @param {string[]} words
 * @param {string} order
 * @return {boolean}
 */
// 方法一：直接遍历
// 依次检测 words 中的字符串前一个字符串和后一个字符串在给定的字母表下小的字典序即可
var isAlienSorted = function (words, order) {
  // 将给定的 order 转化为字典序索引 index，index[i] 表示字符 i 在字母表 order 的排序索引
  const index = new Array(26).fill(0);
  for (let i = 0; i < order.length; i++) {
    index[order[i].charCodeAt() - 'a'.charCodeAt()] = i;
  }

  for (let i = 1; i < words.length; i++) {
    let valid = false;
    for (let j = 0; j < words[i - 1].length && j < words[i].length; j++) {
      // 检测第 i 个单词 words[i] 与第 i - 1 个单词 words[i - 1] 的字典序大小
      let prev = index[words[i - 1][j].charCodeAt() - 'a'.charCodeAt()];
      let curr = index[words[i][j].charCodeAt() - 'a'.charCodeAt()];
      if (prev < curr) {
        valid = true;
        break;
      } else if (prev > curr) {
        return false;
      }
    }

    // 特殊情况：words[i - 1].length > words[i].length 且 words[i] 的前 m 个字符与 words[i - 1] 的前 m 个字符相等
    // 此时 words[i - 1] 的字典序大于 words[i] 的字典序
    if (!valid) {
      if (words[i - 1].length > words[i].length) {
        return false;
      }
    }
  }

  return true;
};
// 时间复杂度：O(m×n)
// 空间复杂度：O(C)
