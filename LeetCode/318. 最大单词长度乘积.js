/**
 * @param {string[]} words
 * @return {number}
 */
// 方法一：位运算
// 每一个单词存一个对应的26长度的二进制位
// 两个单词做 & 运算，若结果为 0 则表示没有重复字母
var maxProduct = function (words) {
  const len = words.length;
  let result = 0;
  let bits = new Array(len).fill(0);

  // 构建每一个单词的二进制值
  let a = 'a'.charCodeAt();
  for (let i = 0; i < len; i++) {
    let word = words[i];
    for (let j = 0; j < word.length; j++) {
      bits[i] = bits[i] | (1 << (word[j].charCodeAt() - a));
    }
  }

  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      if ((bits[i] & bits[j]) === 0) {
        result = Math.max(result, words[i].length * words[j].length);
      }
    }
  }

  return result;
};
