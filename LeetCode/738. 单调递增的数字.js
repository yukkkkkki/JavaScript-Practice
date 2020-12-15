// 给定一个非负整数 N，找出小于或等于 N 的最大的整数，同时这个整数需要满足其各个位数上的数字是单调递增。

// （当且仅当每个相邻位数上的数字 x 和 y 满足 x <= y 时，我们称这个整数是单调递增的。）

// 示例 1:
// 输入: N = 10
// 输出: 9

// 示例 2:
// 输入: N = 1234
// 输出: 1234

// 示例 3:
// 输入: N = 332
// 输出: 299

/**
 * @param {number} N
 * @return {number}
 */
// 方法一：贪心
// 思路：从贪心的角度考虑，我们需要尽量让高位与 NN 的对应数位相等，故尝试让 strN[i−1] 自身数位减 1。
// 此时已经不再受 N 的限制，直接将 [i,n−1] 的位置上的数全部变为 9 即可
// 当 strN[i−1] 自身数位减 1 后可能会使得 strN[i−1] 和 strN[i−2] 不再满足递增的关系，
// 因此我们需要从 i-1 开始递减比较相邻数位的关系，直到找到第一个位置 j 使得 strN[j] 自身数位减 1 后 strN[j−1] 和 strN[j] 仍然保持递增关系，
// 或者位置 j 已经到最左边（即 j 的值为 0），此时我们将 [j+1,n−1] 的数全部变为 9 才能得到最终正确的答案。
var monotoneIncreasingDigits = function (N) {
  const strN = N.toString()
    .split('')
    .map((v) => +v);
  let i = 1;
  while (i < strN.length && strN[i - 1] <= strN[i]) {
    i += 1;
  }
  if (i < strN.length) {
    while (i > 0 && strN[i - 1] > strN[i]) {
      strN[i - 1] -= 1;
      i -= 1;
    }
    for (i += 1; i < strN.length; ++i) {
      strN[i] = 9;
    }
  }
  return parseInt(strN.join(''));
};
