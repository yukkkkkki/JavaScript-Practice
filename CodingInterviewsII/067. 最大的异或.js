/**
 * @param {number[]} nums
 * @return {number}
 */
// 方法一：哈希表
// aj = x ^ ai 蕴含着：
// pre^k(aj) = pre^k(x) ^ pre^k(ai)
// pre^k(x) 对于我们来说是已知的，因此将所有的 pre^k(aj) 放入哈希表中
// 之后，枚举 i，计算 pre^k(x) ^ pre^k(ai)
var findMaximumXOR = function (nums) {
  const HIGH_BIT = 30;
  let x = 0;
  for (let k = HIGH_BIT; k >= 0; k--) {
    const seen = new Set();
    // 将所有的 pre^k(a_j) 放入哈希表中
    for (const num of nums) {
      // 如果只想保留从最高位开始到第 k 个二进制位为止的部分
      // 只需将其右移 k 位
      seen.add(num >> k);
    }

    // 目前 x 包含从最高位开始到第 k+1 个二进制位为止的部分
    // 我们将 x 的第 k 个二进制位置为 1，即为 x = x*2+1
    const xNext = x * 2 + 1;
    let found = false;

    // 枚举 i
    for (const num of nums) {
      if (seen.has(xNext ^ (num >> k))) {
        found = true;
        break;
      }
    }

    if (found) {
      x = xNext;
    } else {
      // 如果没有找到满足等式的 a_i 和 a_j，那么 x 的第 k 个二进制位只能为 0
      // 即为 x = x * 2
      x = xNext - 1;
    }
  }
  return x;
};
// 时间复杂度：O(nlogc); C 是数组中的元素范围
// 空间复杂度：O(n)
