// 给定两个字符串形式的非负整数 num1 和num2 ，计算它们的和。

// 提示：
//     num1 和num2 的长度都小于 5100
//     num1 和num2 都只包含数字 0-9
//     num1 和num2 都不包含任何前导零
//     你不能使用任何內建 BigInteger 库， 也不能直接将输入的字符串转换为整数形式

// 方法一：String.slice函数反向遍历
var addStrings = function (num1, num2) {
  let str = "";
  const len = Math.max(num1.length, num2.length);
  let step = 0;
  for (let i = -1; i >= -len; i--) {
    const n1 = num1.slice(i, i + 1 || undefined) - 0;
    const n2 = num2.slice(i, i + 1 || undefined) - 0;
    const res = n1 + n2 + step;
    if (res > 9) {
      step = 1;
      str = res - 10 + str;
    } else {
      step = 0;
      str = res + str;
    }
  }
  return step === 0 ? str : step + str;
};

// 方法二
var addStrings = function (num1, num2) {
  while (num1.length > num2.length) num2 = "0" + num2;
  while (num1.length < num2.length) num1 = "0" + num1; // 先补0对齐
  let res = "";
  let carry = 0;
  for (let i = num1.length - 1; i >= 0; i--) {
    const sum = +num1[i] + +num2[i] + carry;
    res = (sum % 10) + res;
    carry = sum > 9 ? 1 : 0;
  }
  return carry == 1 ? "1" + res : res;
};

// 方法三：模拟
// 我们定义两个指针 i 和 j 分别指向 num1 和 num2 的末尾，即最低位，
// 同时定义一个变量 add 维护当前是否有进位，然后从末尾到开头逐位相加即可。
// 这里我们统一在指针当前下标处于负数的时候返回 0，等价于对位数较短的数字进行了补零操作，这样就可以除去两个数字位数不同情况的处理
var addStrings = function (num1, num2) {
  let i = num1.length - 1,
    j = num2.length - 1,
    add = 0;
  const ans = [];
  while (i >= 0 || j >= 0 || add !== 0) {
    const x = i >= 0 ? num1.charAt(i) - "0" : 0;
    const y = j >= 0 ? num2.charAt(j) - "0" : 0;
    const result = x + y + add;
    ans.push(result % 10);
    add = Math.floor(result / 10);
    i -= 1;
    j -= 1;
  }
  return ans.reverse().join("");
};
