/**
 * @param {string[]} words
 */
// 方法一：计算每个单词的前缀后缀组合可能性
// 预先计算出每个单词的前缀后缀组合可能性，用特殊符号连接，作为键，对应的最大下标作为值保存入哈希表。检索时，同样用特殊符号连接前后缀，在哈希表中进行搜索
var WordFilter = function (words) {
  this.dictionary = new Map();
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const m = word.length;
    for (let prefLen = 1; prefLen <= m; prefLen++) {
      for (let suffLen = 1; suffLen <= m; suffLen++) {
        this.dictionary.set(
          word.substring(0, prefLen) + '#' + word.substring(m - suffLen),
          i
        );
      }
    }
  }
};

/**
 * @param {string} pref
 * @param {string} suff
 * @return {number}
 */
WordFilter.prototype.f = function (pref, suff) {
  if (this.dictionary.has(pref + '#' + suff)) {
    return this.dictionary.get(pref + '#' + suff);
  }
  return -1;
};

/**
 * Your WordFilter object will be instantiated and called as such:
 * var obj = new WordFilter(words)
 * var param_1 = obj.f(pref,suff)
 */
