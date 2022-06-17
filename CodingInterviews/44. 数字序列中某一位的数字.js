/**
 * @param {number} n
 * @return {number}
 */
// 方法一：
// 1位数： 1-9 9个数字
// 2位数： 10-99 9 * 10个数字 9 * 10 * 2个字符
// 3位数： 100-999 9 * 100个数字 9 * 100 * 3个字符
// 解题步骤
// 找到 n的区间
// 找到 n在此区间中的哪个数字上面
// 找到 n在这个数字中的位置并返回
var findNthDigit = function (n) {
  if (n <= 9) return n;

  let i = 1; //几位数
  let num = 9;
  while (n >= num) {
    n -= num;
    i++;
    num = 9 * 10 ** (i - 1) * i;
  }

  //此时n就是i位数里面的第几个字符
  // 然后找到是哪个数字
  n--; //变为下标
  let start = 10 ** (i - 1) + parseInt(n / i) + '';
  return start[n % i];
};

// 方法二
var findNthDigit = function (n) {
  if (n < 10) return n;
  let sum = 10,
    i = 1;
  while (n > sum) {
    n -= sum;
    sum = 9 * Math.pow(10, i) * ++i;
  }
  return (sum / 9 / i + parseInt(n / i) + '')[n % i];
};
