// 请实现一个函数，输入一个整数，输出该数二进制表示中 1 的个数。例如，把 9 表示成二进制是 1001，有 2 位是 1。因此，如果输入 9，则该函数输出 2。

// 示例 1：
// 输入：00000000000000000000000000001011
// 输出：3
// 解释：输入的二进制串 00000000000000000000000000001011 中，共有三位为 '1'。

// 示例 2：
// 输入：00000000000000000000000010000000
// 输出：1
// 解释：输入的二进制串 00000000000000000000000010000000 中，共有一位为 '1'。

// 示例 3：
// 输入：11111111111111111111111111111101
// 输出：31
// 解释：输入的二进制串 11111111111111111111111111111101 中，共有 31 位为 '1'。

// 方法一
var hammingWeight = function (n) {
  let count = 0;

  while (n) {
    count++;
    n = (n - 1) & n;
  }
  return count;
};

// 方法二
var hammingWeight = function (n) {
  let count = 0,
    flag = 1;

  while (flag) {
    if (n & flag) count++;
    flag = flag << 1;
  }
  return count;
};

// 方法三
var hammingWeight = function (n) {
  var newStr = n.toString(2);
  var count = 0;
  for (let i = 0; i < newStr.length; i++) {
    if (newStr[i] == "1") {
      count++;
    }
  }
  return count;
};

// 方法四
var hammingWeight = function (n) {
  const r = n.toString(2).match(/1/g);
  return r ? r.length : 0;
};
