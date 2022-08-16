/**
 * @param {string[]} words
 * @param {number} k
 * @return {string[]}
 */
// 方法一：哈希表 + 排序
var topKFrequent = function (words, k) {
  const cnt = new Map();
  for (const word of words) {
    cnt.set(word, (cnt.get(word) || 0) + 1);
  }

  const res = [];
  for (const entry of cnt.keys()) {
    res.push(entry);
  }
  res.sort((word1, word2) => {
    return cnt.get(word1) === cnt.get(word2)
      ? word1.localeCompare(word2)
      : cnt.get(word2) - cnt.get(word1);
  });

  return res.slice(0, k);
};
// 时间复杂度：O(l x n + l x mlogn)
// 空间复杂度：O(l x m)
