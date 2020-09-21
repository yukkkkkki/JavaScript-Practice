// 有个内含单词的超大文本文件，给定任意两个单词，找出在这个文件中这两个单词的最短距离(相隔单词数)。如果寻找过程在这个文件中会重复多次，而每次寻找的单词不同，你能对此优化吗?

// 示例：
// 输入：words = ["I","am","a","student","from","a","university","in","a","city"], word1 = "a", word2 = "student"
// 输出：1
/**
 * @param {string[]} words
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */

// 方法一：双指针
// 思路：用两个指针一直记录两个单词出现的下标，在一次遍历数组的循环中，不断记录两个下标差值的最小值，返回结果即可。
// 时间复杂度：O(n); 空间复杂度：O(1)
var findClosest = function (words, word1, word2) {
  let i = 0,
    res = words.length - 1;
  for (let j = 0; j < words.length; j++) {
    if (words[j] == word1 || words[j] == word2) {
      if (words[j] !== words[i] && (words[i] == word1 || words[i] == word2)) {
        res = Math.min(res, j - i);
      }
      i = j;
    }
  }
  return res;
};

// 方法二：暴力法
var findClosest = function (words, word1, word2) {
  let min = Number.MAX_VALUE;
  let w1 = -1,
    w2 = -1;
  for (let i = 0; i < words.length; i++) {
    if (words[i] === word1) w1 = i;
    if (words[i] === word2) w2 = i;
    if (w1 > 0 && w2 > 0) min = Math.min(min, Math.abs(w2 - w1));
  }
  return min;
};

console.log(
  findClosest(
    ['I', 'am', 'a', 'student', 'from', 'a', 'university', 'in', 'a', 'city'],
    'a',
    'student'
  )
);
