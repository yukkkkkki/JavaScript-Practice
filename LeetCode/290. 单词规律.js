// 给定一种规律 pattern 和一个字符串 str ，判断 str 是否遵循相同的规律。

// 这里的 遵循 指完全匹配，例如， pattern 里的每个字母和字符串 str 中的每个非空单词之间存在着双向连接的对应规律。

// 示例1:
// 输入: pattern = "abba", str = "dog cat cat dog"
// 输出: true

// 示例 2:
// 输入:pattern = "abba", str = "dog cat cat fish"
// 输出: false

// 示例 3:
// 输入: pattern = "aaaa", str = "dog cat cat dog"
// 输出: false

// 示例 4:
// 输入: pattern = "abba", str = "dog dog dog dog"
// 输出: false

/**
 * @param {string} pattern
 * @param {string} s
 * @return {boolean}
 */
// 方法一：哈希表
// 枚举 pattern 中的每一个字符，利用双指针来均摊线性地找到该字符在 str 中对应的字符串
// 每次确定一个字符与字符串的组合，我们就检查是否出现冲突，最后再检查两字符串是否比较完毕
var wordPattern = function (pattern, s) {
  const word2ch = new Map();
  const ch2word = new Map();
  const words = s.split(' ');
  if (pattern.length !== words.length) return false;

  for (const [i, word] of words.entries()) {
    const ch = pattern[i];
    if (
      (word2ch.has(word) && word2ch.get(word) !== ch) ||
      (ch2word.has(ch) && ch2word.get(ch) !== word)
    ) {
      return false;
    }

    word2ch.set(word, ch);
    ch2word.set(ch, word);
  }
  return true;
};

console.log(wordPattern('abba', 'dog cat cat dog'));
