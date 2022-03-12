/**
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var findTheWinner = function (n, k) {
  let p = 0;
  for (let i = 2; i <= n; i++) {
    p = (p + k) % i;
  }
  return p + 1;
};
