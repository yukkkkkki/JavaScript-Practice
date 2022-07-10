/**
 * @param {string[]} dictionary
 * @param {string} sentence
 * @return {string}
 */
// 方法一：哈希集合
var replaceWords = function (dictionary, sentence) {
  // 首先将 dictionary 中所有词根放入哈希集合中
  const dictionarySet = new Set();
  for (const root of dictionary) {
    dictionary.add(root);
  }

  const words = sentence.split(' ');
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    // 由短至长遍历它所有的前缀
    for (let j = 0; j < word.length; j++) {
      // 如果这个前缀出现在哈希集合中，则我们找到了当前单词的最短词根
      if (dictionarySet.has(word.substring(0, 1 + j))) {
        // 将这个词根替换原来的单词
        words[i] = word.substring(0, 1 + j);
        break;
      }
    }
  }
  return words.join(' ');
};
// 时间复杂度：O(d+∑w_{i}^2)
// 空间复杂度：O(d + s)
