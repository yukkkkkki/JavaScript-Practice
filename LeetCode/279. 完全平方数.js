/**
 * @param {number} n
 * @return {number}
 */
// 方法一：动态规划
var numSquares = function (n) {
  // dp[i]：表示最少需要多少个数的平方来表示整数 i
  // 边界条件：f[0] = 0
  const dp = new Array(n + 1).fill(0);

  for (let i = 1; i <= n; i++) {
    let minn = Number.MAX_VALUE;
    for (let j = 1; j * j <= i; j++) {
      minn = Math.min(minn, dp[i - j * j]);
    }
    dp[i] = minn + 1;
  }
  return dp[n];
};
// 时间复杂度：O(nsqrt{n})
// 空间复杂度：O(n)

// 方法二：数学
// 四平方和定理：
// 当且仅当 n !== 4^k * (8m + 7) 时，n 可以被表示为至多三个正整数的平方和
// 当且仅当 n == 4^k * (8m + 7) 时，n 只能被表示为四个正整数的平方和
var numSquares = function (n) {
  if (isPerfectSquare(n)) return 1;
  if (checkAnswer4(n)) return 4;

  for (let i = 1; i * i <= n; i++) {
    let j = n - i * i;
    if (isPerfectSquare(j)) return 2;
  }

  return 3;
};
const isPerfectSquare = (x) => {
  const y = Math.floor(Math.sqrt(x));
  return y * y == x;
};
// 判断是否能表示为 4^k*(8m+7)
const checkAnswer4 = (x) => {
  while (x % 4 === 0) {
    x /= 4;
  }
  return x % 8 == 7;
};
// 时间复杂度：O(sqrt{n})
// 空间复杂度：O(1)
