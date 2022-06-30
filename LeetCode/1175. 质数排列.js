/**
 * @param {number} n
 * @return {number}
 */
// 方法一：质数判断 + 组合数学
const MOD = 1000000007;
var numPrimeArrangements = function (n) {
  let numPrimes = 0;
  for (let i = 2; i <= n; i++) {
    if (isPrime(i)) {
      numPrimes++;
    }
  }

  let res = 1;
  let m = n - numPrimes;
  while (numPrimes > 0) {
    res = res % MOD;
    res *= numPrimes;
    numPrimes--;
  }

  while (m > 0) {
    res = res % MOD;
    res *= m;
    m--;
  }

  return res;
};
const isPrime = (n) => {
  if (n === 1) return false;

  for (let i = 2; i * i <= n; i++) {
    if (n % i === 0) return false;
  }
  return true;
};
// 时间复杂度：O(n^{3/2})
// 空间复杂度：O(1)
