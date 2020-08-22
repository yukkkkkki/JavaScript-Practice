// 给定一个由整数组成的非空数组所表示的非负整数，在该数的基础上加一。

// 最高位数字存放在数组的首位， 数组中每个元素只存储单个数字。

// 你可以假设除了整数 0 之外，这个整数不会以零开头。

// 示例 1:
// 输入: [1,2,3]
// 输出: [1,2,4]
// 解释: 输入数组表示数字 123。

// 示例 2:
// 输入: [4,3,2,1]
// 输出: [4,3,2,2]
// 解释: 输入数组表示数字 4321

// 方法一：
// 把数组转化为数字加一，然后再转为数组
var plusOne = function (digits) {
  return (BigInt(digits.join("")) + 1n).toString().split("");
};
// 时间复杂度：O(n); 空间复杂度：O(1)

// 方法二：进位相加
var plusOne = function (digits) {
  let carry = 1;
  for (let i = digits.length; i > 0; i--) {
    let temp = parseInt((digits[i - 1] + carry) / 10);
    digits[i - 1] = (digits[i - 1] + carry) % 10;
    carry = temp;
  }
  if (carry === 1) digits.unshift(carry);
  return digits;
};
// 时间复杂度：O(n); 空间复杂度：O(1)