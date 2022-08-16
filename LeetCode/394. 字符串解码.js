/**
 * @param {string} s
 * @return {string}
 */
// 方法一：栈操作
var decodeString = function (s) {
  let numStack = [];
  let strStack = [];

  let num = 0;
  let result = "";

  for (let i = 0; i < s.length; i++) {
    const item = s[i];
    if (!isNaN(item)) {
      num = num * 10 + parseInt(item);
    } else if (item === "[") {
      strStack.push(result);
      result = "";
      numStack.push(num);
      num = 0;
    } else if (item === "]") {
      const repeatTimes = numStack.pop(); // 从栈中获取次数
      result = strStack.pop() + result.repeat(repeatTimes);
    } else {
      result += item;
    }
  }

  return result;
};
// 时间复杂度：O(S)
// 空间复杂度：O(S)
