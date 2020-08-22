// 写一个函数，输入 n ，求斐波那契（Fibonacci）数列的第 n 项。斐波那契数列的定义如下：

// F(0) = 0,   F(1) = 1
// F(N) = F(N - 1) + F(N - 2), 其中 N > 1.

// 斐波那契数列由 0 和 1 开始，之后的斐波那契数就是由之前的两数相加而得出。

// 答案需要取模 1e9+7（1000000007），如计算初始结果为：1000000008，请返回 1。

// 示例 1：
// 输入：n = 2
// 输出：1

// 示例 2：
// 输入：n = 5
// 输出：5

// 方法一
var fib = function (n) {
  if (n === 0) return 0;
  if (n === 1) return 1;

  let a = 1,
    b = 0;
  for (let i = 1; i < n; i++) {
    let t = b;
    b = a;
    a = (t + a) % 1000000007;
  }
  return a;
};

// 方法二：递归
var fib = function (n) {
  let fibonacci = [0, 1];
  for (let i = 2; i <= n; i++) {
    fibonacci[i] = (fibonacci[i - 1] + fibonacci[i - 2]) % (1e9 + 7);
  }
  return fibonacci[n];
};
