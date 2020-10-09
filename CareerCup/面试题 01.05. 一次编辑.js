// 字符串有三种编辑操作:插入一个字符、删除一个字符或者替换一个字符。 给定两个字符串，编写一个函数判定它们是否只需要一次(或者零次)编辑。

// 示例 1:
// 输入:
// first = "pale"
// second = "ple"
// 输出: True
//

// 示例 2:
// 输入:
// first = "pales"
// second = "pal"
// 输出: False

/**
 * @param {string} first
 * @param {string} second
 * @return {boolean}
 */
// 方法一
var oneEditAway = function (first, second) {
  let diff = first.length - second.length;
  // 编辑少于2次，也就是字符串的长度差小于2
  if (Math.abs(diff) > 1) return false;
  var maxLength = diff > 0 ? first.length : second.length;
  var fArr = Array.from(first);
  var sArr = Array.from(second);
  for (let i = 0; i < maxLength; i++) {
    if (fArr[i] !== sArr[i]) {
      // 如果相差 0 个字符，替换一个字符
      if (diff === 0) {
        sArr.splice(i, 1, fArr[i]);
      } else if (diff > 0) {
        sArr.splice(i, 0, fArr[i]);
      } else {
        fArr.splice(i, 0, sArr[i]);
      }
      break;
    }
  }
  // 判断操作后两个字符串是否相等
  return fArr.join() === sArr.join();
};
