/**
 * @param {number} n
 * @return {number}
 */
// 方法一：递归
var fib = function (n) {
  if (n == 0 || n == 1) return n;
  return fib(n - 1) + fib(n - 2);
};

// 方法二：动态规划
// F(n) = F(n − 1) + F(n − 2)
var fib = function (n) {
  if (n < 2) return n;
  let p = 0;
  let q = 0;
  let r = 1;

  for (let i = 2; i <= n; i++) {
    p = q;
    q = r;
    r = p + q;
  }

  return r;
};

console.log(fib(4));
