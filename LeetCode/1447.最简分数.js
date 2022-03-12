/**
 * @param {number} n
 * @return {string[]}
 */
// 方法一：数学
var simplifiedFractions = function (n) {
  const ans = [];
  for (let i = 2; i <= n; i++) {
    for (let j = 1; j < i; j++) {
      // 若分子分母的最大公约数为 11
      if (help(j, i) == 1) {
        ans.push(j + '/' + i);
      }
    }
  }
  return ans;
};

const help = (a, b) => {
  if (b === 0) {
    return a;
  }
  return help(b, a % b);
};
// 时间复杂度：O(n^2log n)
// 空间复杂度：O(1)
