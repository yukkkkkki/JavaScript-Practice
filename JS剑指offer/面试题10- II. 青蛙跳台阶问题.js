// 一只青蛙一次可以跳上1级台阶，也可以跳上2级台阶。求该青蛙跳上一个 n 级的台阶总共有多少种跳法。

// 答案需要取模 1e9+7（1000000007），如计算初始结果为：1000000008，请返回 1。

// 示例 1：
// 输入：n = 2
// 输出：2

// 示例 2：
// 输入：n = 7
// 输出：21

// 数组记录
var numWays = function (n) {
  const arr = new Array(n + 1).fill(0);
  arr[0] = 1;
  arr[1] = 1;
  arr[2] = 2;
  for (let i = 3; i <= n; i++) {
    arr[i] = (arr[i - 1] + arr[i - 2]) % 1000000007;
  }
  return arr[n];
};

// 方法二
var numWays = function (n) {
  if (n <= 0) return 1;
  if (n <= 2) return n;
  let i = 2,
    cur = 2,
    pre = 1,
    res = 0;
  while (i++ < n) {
    res = (pre + cur) % 1000000007;
    pre = cur;
    cur = res;
  }
  return res;
};
