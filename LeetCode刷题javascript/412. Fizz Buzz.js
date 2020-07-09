// 写一个程序，输出从 1 到 n 数字的字符串表示。
// 1. 如果 n 是3的倍数，输出“Fizz”；
// 2. 如果 n 是5的倍数，输出“Buzz”；
// 3.如果 n 同时是3和5的倍数，输出 “FizzBuzz”。

// 示例：
// n = 15,

// 返回:
// [
//     "1",
//     "2",
//     "Fizz",
//     "4",
//     "Buzz",
//     "Fizz",
//     "7",
//     "8",
//     "Fizz",
//     "Buzz",
//     "11",
//     "Fizz",
//     "13",
//     "14",
//     "FizzBuzz"
// ]

// 方法一：遍历
// 只需要判断 1 - n 的每个数字是否能被 3、5、15 整除，输出对应的字符串即可
var fizzBuzz = function (n) {
  const arr = [];
  for (let i = 1; i <= n; i += 1) {
    if (i % 15 === 0) {
      arr.push("FizzBuzz");
    } else if (i % 3 === 0) {
      arr.push("Fizz");
    } else if (i % 5 === 0) {
      arr.push("Buzz");
    } else {
      arr.push(i.toString());
    }
  }
  return arr;
};
// 时间复杂度： O(n); 空间复杂度： O(n)

// 方法二：字符串相加
var fizzBuzz = function (n) {
  const arr = [];
  for (let i = 1; i <= n; i += 1) {
    let str = "";
    if (i % 3 === 0) {
      str += "Fizz";
    }
    if (i % 5 === 0) {
      str += "Buzz";
    }
    if (i % 3 !== 0 && i % 5 !== 0) {
      str += i;
    }
    arr.push(str);
  }
  return arr;
};
