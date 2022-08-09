/**
 * @param {string} secret
 * @param {string} guess
 * @return {string}
 */
// 方法一：遍历
// 在 secret[i] !== guess[i] 时，分别统计 secret 和 guess 的各个字符的出现次数，记在两个长度为 10 的数组中
// 对于 0-9 的每位数字，取其在secret 和 guess 中的出现次数的最小值
// 累加每位数字出现次数的最小值，即为奶牛的个数
var getHint = function (secret, guess) {
  let bulls = 0;
  let cows = 0;
  const cntB = new Array(10).fill(0);
  const cntC = new Array(10).fill(0);

  // 遍历 secret 和 guess
  for (let i = 0; i < secret.length; i++) {
    // 统计满足 secret[i] = guess[i] 的下标个数，即为公牛的个数
    if (secret[i] === guess[i]) bulls++;
    else {
      cntB[secret[i].charCodeAt() - "0".charCodeAt()]++;
      cntC[guess[i].charCodeAt() - "0".charCodeAt()]++;
    }
  }

  for (let i = 0; i < 10; i++) {
    cows += Math.min(cntB[i], cntC[i]);
  }

  return bulls + "A" + cows + "B";
};
// 时间复杂度：o(n)
// 空间复杂度：o(c)

console.log(getHint("1123", "0111"));
