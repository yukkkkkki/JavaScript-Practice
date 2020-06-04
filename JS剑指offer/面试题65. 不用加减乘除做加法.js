// 写一个函数，求两个整数之和，要求在函数体内不得使用 “+”、“-”、“*”、“/” 四则运算符号。

// 示例:
// 输入: a = 1, b = 1
// 输出: 2

// 位运算
var add = function (a, b) {
  let sum, carry;
  while (b !== 0) {
    sum = a ^ b;
    carry = (a & b) << 1;
    a = sum;
    b = carry;
  }
  return a;
};

// 方法二：计算a+b，等价于(a^b)+((a&b)<<1)。
var add = function (a, b) {
  if (a == 0) return b;
  if (b == 0) return a;
  return add((a ^ b), ((a & b) << 1));
};
// 作者： zero0011
// 链接： https: //leetcode-cn.com/problems/bu-yong-jia-jian-cheng-chu-zuo-jia-fa-lcof/solution/javascriptde-di-gui-jie-fa-yo-by-zero0011/