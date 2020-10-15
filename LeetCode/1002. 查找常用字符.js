// 给定仅有小写字母组成的字符串数组 A，返回列表中的每个字符串中都显示的全部字符（包括重复字符）组成的列表。例如，如果一个字符在每个字符串中出现 3 次，但不是 4 次，则需要在最终答案中包含该字符 3 次。

// 你可以按任意顺序返回答案。

// 示例 1：
// 输入：["bella","label","roller"]
// 输出：["e","l","l"]

// 示例 2：
// 输入：["cool","lock","cook"]
// 输出：["c","o"]

/**
 * @param {string[]} A
 * @return {string[]}
 */

// 方法一：计数
// 思路：
// minfreq[c]存储字符c在所有字符串中出现次数的最小值
// freq[c]统计s中每个字符c出现的次数，统计完之后将每一个minfreq[c]更新为其本身与freq[c]比较的较小值
// 如此，当我们遍历完所有字符后，minfreq[c]就存储了字符c在所有字符串中出现次数的最小值
// 用长度为26的数组分别表示minfreq和freq
var commonChars = function (A) {
  const hash = {};
  //建立以第一个字符串为基准的字符数量映射
  for (let item of A[0]) {
    hash[item] ? hash[item]++ : (hash[item] = 1);
  }
  //然后依次以这个为基准去循环执行后面的字符串
  for (let i = 1; i < A.length; i++) {
    let tmpHash = {};
    //建立以当前字符串为基准的字符数量映射
    for (let j = 0; j < A[i].length; j++) {
      tmpHash[A[i][j]] ? tmpHash[A[i][j]]++ : (tmpHash[A[i][j]] = 1);
    }
    //如果当前字符串的字符数量比基准小，则把基准设为最小值
    for (let key of Object.keys(hash)) {
      hash[key] = Math.min(hash[key], tmpHash[key] || 0);
    }
  }

  let res = [];
  for (let key of Object.keys(hash)) {
    if (hash[key]) {
      // console.log(key + '-' + hash[key]);
      let cur = new Array(hash[key]).fill(key);
      // console.log(cur);
      res.push(...cur);
    }
  }
  return res;
};

console.log(commonChars(['cool', 'lock', 'cook']));
