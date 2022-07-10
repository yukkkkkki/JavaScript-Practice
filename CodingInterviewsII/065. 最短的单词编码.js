/**
 * @param {string[]} words
 * @return {number}
 */
// 方法一：前缀树
// 当前单词是否属于某个单词的后缀 —> 单词倒序是否属于某个单词的前缀 —> 前缀树
var minimumLengthEncoding = function (words) {
  // 前缀树
  let root = {};
  let result = 0;
  // 根据单词长度进行排序
  words.sort((a, b) => b.length - a.length);

  // 开始插入字符串，长的先开始
  for (let word of words) {
    let flag = false;
    let curr = root;
    // 单词倒叙：后缀 ——> 前缀
    for (let i = word.length - 1; i >= 0; i--) {
      let s = word[i];
      if (!curr[s]) {
        curr[s] = {};
        // 标记改元素不属于其他元素的后缀(/前缀/子字符串)
        flag = true;
      }
      curr = curr[s];
    }
    // 如果一个单词属于其他字符串的前缀，则不需要加上他的长度
    // 否则 result += (单词长度＋1)
    if (flag) result += word.length + 1;
  }

  return result;
};
