// 桌上有 n 堆力扣币，每堆的数量保存在数组 coins 中。我们每次可以选择任意一堆，拿走其中的一枚或者两枚，求拿完所有力扣币的最少次数。

// 示例 1：
// 输入：[4,2,1]
// 输出：4
// 解释：第一堆力扣币最少需要拿 2 次，第二堆最少需要拿 1 次，第三堆最少需要拿 1 次，总共 4 次即可拿完。

// 示例 2：
// 输入：[2,3,10]
// 输出：8

/**
 * @param {number[]} coins
 * @return {number}
 */

// 思路：假设一堆有 x 枚硬币，既然我们的目的是尽早拿完所有硬币堆，那么两枚两枚的拿显然是更快的。
// 求单堆硬币最小次数：(x+1) // 2
// 拿完所有硬币堆只需要循环对所有硬币堆都计算一次，然后求和就可以了
var minCount = function (coins) {
  let num = 0;
  for (let i = 0; i < coins.length; i++) {
    num += coins[i] % 2 == 0 ? coins[i] / 2 : parseInt(coins[i] / 2) + 1;
  }
  return num;
};
