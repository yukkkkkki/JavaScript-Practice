/**
 * @param {string[]} words
 * @return {string}
 */
// 方法一：哈希集合
var longestWord = function (words) {
  // 按照单词的长度升序排序，如果单词的长度相同则按照字典序降序排序
  words.sort((a, b) => {
    if (a.length !== b.length) {
      return a.length - b.length;
    } else {
      return b.localeCompare(a);
    }
  });

  let longest = '';
  let candidates = new Set();
  candidates.add('');
  const n = words.length;

  for (let i = 0; i < n; i++) {
    const word = words[i];
    // 判断当前单词去掉最后一个字母之后的前缀是否在哈希集合中
    if (candidates.has(word.slice(0, word.length - 1))) {
      candidates.add(word);
      longest = word;
    }
  }

  return longest;
};

// 时间复杂度：O(\sum_{0 < i < n} li · logn)
// 空间复杂度：O(\sum_{0 < i < n} li · logn)

let words = ['w', 'wo', 'wor', 'worl', 'world'];
console.log(longestWord(words));
