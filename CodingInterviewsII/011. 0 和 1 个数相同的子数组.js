/**
 * @param {number[]} nums
 * @return {number}
 */
// 方法一：前缀和 + 哈希表
// 「0 和 1 的数量相同」等价于「1 的数量减去 0 的数量等于 0」
// 可以将数组中的 0 视作 −1，则原问题转换成「求最长的连续子数组，其元素和为 0」。
var findMaxLength = function (nums) {
  let maxLength = 0;
  const map = new Map();
  let count = 0; // 存储 newNums 的前缀和
  map.set(count, -1);
  const n = nums.length;

  for (let i = 0; i < n; i++) {
    const num = nums[i];
    // 更新前缀和
    if (num === 1) {
      count++;
    } else count--;

    // 使用哈希表存储每个前缀和第一次出现的下标
    if (map.has(count)) {
      const prevIndex = map.get(count);
      // nums 从下标 prevIndex + 1 到下标 i 的子数组中有相同数量的 0 和 1
      // 该子数组的长度为 i − prevIndex
      maxLength = Math.max(maxLength, i - prevIndex);
    } else {
      map.set(count, i);
    }
  }

  return maxLength;
};
// 时间复杂度：O(n)
// 空间复杂度：O(n)
