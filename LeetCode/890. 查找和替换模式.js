/**
 * @param {string[]} words
 * @param {string} pattern
 * @return {string[]}
 */
// 方法一：构造双摄
// 即 word 的每个字母需要映射到 pattern 的对应字母
// 并且 pattern 的每个字母也需要映射到 word 的对应字母
var findAndReplacePattern = function (words, pattern) {
  const result = [];
  for (const word of words) {
    if (match(word, pattern) && match(pattern, word)) {
      result.push(word);
    }
  }
  return result;
};
const match = (word, pattern) => {
  // 仅当 word 中相同字母映射到 pattern 中的相同字母时返回 true
  const map = new Map();
  for (let i = 0; i < word.length; i++) {
    const x = word[i];
    const y = pattern[i];
    if (!map.has(x)) {
      map.set(x, y);
    } else if (map.get(x) !== y) {
      // word 中的同一字母必须映射到 pattern 中的同一字母上
      return false;
    }
  }

  return true;
};
// 时间复杂度：O(nm)
// 空间复杂度：O(m)
