// 给你一个整数数组 arr，请你帮忙统计数组中每个数的出现次数。

// 如果每个数的出现次数都是独一无二的，就返回 true；否则返回 false。

// 示例 1：
// 输入：arr = [1,2,2,1,1,3]
// 输出：true
// 解释：在该数组中，1 出现了 3 次，2 出现了 2 次，3 只出现了 1 次。没有两个数的出现次数相同。

// 示例 2：
// 输入：arr = [1,2]
// 输出：false

// 示例 3：
// 输入：arr = [-3,0,1,-3,1,1,1,-3,10,0]
// 输出：true

/**
 * @param {number[]} arr
 * @return {boolean}
 */
// 方法一：哈希表
// 思路：先用哈希表记录每个数字的出现次数；随后再利用新的哈希表，统计不同的出现次数的数目
var uniqueOccurrences = function (arr) {
  const occur = new Map();
  for (let item of arr) {
    if (occur.has(item)) {
      occur.set(item, occur.get(item) + 1);
    } else {
      occur.set(item, 1);
    }
  }
  const times = new Set();
  for (let [key, value] of occur) {
    times.add(value);
  }
  return times.size == occur.size;
};
// 时间复杂度：O(N)；空间复杂度：O(N)
console.log(uniqueOccurrences([1, 2, 2, 1, 1, 3]));
