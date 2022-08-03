/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
// 方法一 暴力法
// 遍历每个元素 x ，并查找是否存在一个值与 target - x 相等的目标元素。
// 时间复杂度： O(n2)
var twoSum = function (nums, target) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[j] === target - nums[i]) {
        return [i, j];
      }
    }
  }
};

// 方法二：哈希表
// 将每个元素的值和它的索引添加到表中
// 检查每个元素所对应的目标元素（target - nums[i]）是否存在于表中
var twoSum = function (nums, target) {
  const map = new Map();

  for (let i = 0; i < nums.length; i++) {
    if (map.has(target - nums[i])) {
      return [map.get(target - nums[i]), i];
    }
    map.set(nums[i], i);
  }

  return [];
};
// 时间复杂度： O(n)
// 空间复杂度： O(n)
