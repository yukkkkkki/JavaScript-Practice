// 整数转换。编写一个函数，确定需要改变几个位才能将整数A转成整数B。

// 示例1:
//  输入：A = 29 （或者0b11101）, B = 15（或者0b01111）
//  输出：2

// 示例2:
//  输入：A = 1，B = 2
//  输出：2

// 提示:
// A，B范围在[-2147483648, 2147483647]之间

/**
 * @param {number} A
 * @param {number} B
 * @return {number}
 */
// 方法一：异或运算
var convertInteger = function (A, B) {
  let res = A ^ B;
  let num = 0;
  while (res !== 0) {
    res &= res - 1;
    num++;
  }
  return num;
};

convertInteger(29, 15);
