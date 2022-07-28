// 方法一：枚举每个字典中的字符串判断
var MagicDictionary = function () {};

/**
 * @param {string[]} dictionary
 * @return {void}
 */
MagicDictionary.prototype.buildDict = function (dictionary) {
  this.words = dictionary;
};

/**
 * @param {string} searchWord
 * @return {boolean}
 */
MagicDictionary.prototype.search = function (searchWord) {
  for (const word of this.words) {
    if (word.length !== searchWord.length) {
      continue;
    }

    let diff = 0;
    for (let i = 0; i < word.length; i++) {
      if (word[i] !== searchWord[i]) {
        diff++;
        if (diff > 1) break;
      }
    }

    if (diff === 1) return true;
  }

  return false;
};

/**
 * Your MagicDictionary object will be instantiated and called as such:
 * var obj = new MagicDictionary()
 * obj.buildDict(dictionary)
 * var param_2 = obj.search(searchWord)
 */
// 时间复杂度：O(qnl)
// 空间复杂度：O(nl)
