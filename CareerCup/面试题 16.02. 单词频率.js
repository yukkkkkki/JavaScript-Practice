// 设计一个方法，找出任意指定单词在一本书中的出现频率。

// 你的实现应该支持如下操作：

//     WordsFrequency(book)构造函数，参数为字符串数组构成的一本书
//     get(word)查询指定单词在书中出现的频率

// 示例：
// WordsFrequency wordsFrequency = new WordsFrequency({"i", "have", "an", "apple", "he", "have", "a", "pen"});
// wordsFrequency.get("you"); //返回0，"you"没有出现过
// wordsFrequency.get("have"); //返回2，"have"出现2次
// wordsFrequency.get("an"); //返回1
// wordsFrequency.get("apple"); //返回1
// wordsFrequency.get("pen"); //返回1

// 方法一：Map
/**
 * @param {string[]} book
 */
var WordsFrequency = function (book) {
  this.book = new Map();
  for (let i = 0; i < book.length; i++) {
    if (this.book.has(book[i])) {
      this.book.set(book[i], this.book.get(book[i]) + 1);
    } else {
      this.book.set(book[i], 1);
    }
  }
};

/**
 * @param {string} word
 * @return {number}
 */
WordsFrequency.prototype.get = function (word) {
  return this.book.has(word) ? this.book.get(word) : 0;
};

/**
 * Your WordsFrequency object will be instantiated and called as such:
 * var obj = new WordsFrequency(book)
 * var param_1 = obj.get(word)
 */
