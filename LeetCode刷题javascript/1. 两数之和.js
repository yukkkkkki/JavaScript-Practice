// 给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。

// 你可以假设每种输入只会对应一个答案。但是，数组中同一个元素不能使用两遍。

// 示例:
// 给定 nums = [2, 7, 11, 15], target = 9
// 因为 nums[0] + nums[1] = 2 + 7 = 9
// 所以返回 [0, 1]

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

// 方法二 利用map
// 思路
// 1. 将每个元素的值和它的索引添加到表中
// 2. 检查每个元素所对应的目标元素（target - nums[i]）是否存在于表中
const twoSum = (nums, target) => {
  const prevNums = {};
  for (let i = 0; i < nums.length; i++) {
    const curNum = nums[i]; // 当前项
    const targetNum = target - curNum; // 希望从过去的数字中找到的呼应项
    const targetNumIndex = prevNums[targetNum]; // 在prevNums中找targetNum的索引
    if (targetNumIndex !== undefined) {
      return [targetNumIndex, i];
    }
    prevNums[curNum] = i; // 往prevNums存当前curNum和对应的i
  }
};
// 时间复杂度： O(n)
// 空间复杂度： O(n)
