// 字符串压缩。利用字符重复出现的次数，编写一种方法，实现基本的字符串压缩功能。比如，字符串aabcccccaaa会变为a2b1c5a3。若“压缩”后的字符串没有变短，则返回原先的字符串。你可以假设字符串中只包含大小写英文字母（a至z）。

// 示例1:
//  输入："aabcccccaaa"
//  输出："a2b1c5a3"

// 示例2:
//  输入："abbccd"
//  输出："abbccd"
//  解释："abbccd"压缩后为"a1b2c2d1"，比原字符串长度更长。

/**
 * @param {string} S
 * @return {string}
 */
var compressString = function (S) {
  let res = '';
  let curChar = S[0];
  let curCount = 1;
  for (let i = 1; i < S.length; ++i) {
    if (S[i] == curChar) {
      curCount++;
    } else {
      res += curChar + curCount.toString();
      curChar = S[i];
      curCount = 1;
    }
  }
  res += curChar + curCount.toString();
  return res.length >= S.length ? S : res;
};

// console.log(compressString('abbccd'));
