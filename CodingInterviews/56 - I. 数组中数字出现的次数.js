/**
 * @param {number[]} nums
 * @return {number[]}
 */
// 方法一：分组位异或
// 异或 a ^ b：将 a 和 b 的二进制每一位进行运算，得出的数字。
// 运算逻辑：如果同一位的数字相同则为 0，不同则为 1
// 异或的规律：
// 1. 任何数和本身异或则为 0
// 2. 任何数和 0 异或是 本身
// 3. 异或满足交换律。 即 a ^ b ^ c ，等价于 a ^ c ^ b
var singleNumbers = function (nums) {
  let res = 0; // 所有数字异或的结果
  let a = 0;
  let b = 0;
  for (const num of nums) {
    res ^= num;
  }

  let h = 1; // 找到第一位不是 0 的
  while ((res & h) === 0) {
    h <<= 1;
  }

  for (const num of nums) {
    if ((h & num) === 0) {
      // 同一位的数字相同
      a ^= num;
    } else {
      // 同一位的数字不同
      b ^= num;
    }
  }

  return [a, b];
};
// 时间复杂度：O(N)
// 空间复杂度：O(1)
