// 给你一个未排序的整数数组，请你找出其中没有出现的最小的正整数。

// 示例 1:
// 输入: [1,2,0]
// 输出: 3

// 示例 2:
// 输入: [3,4,-1,1]
// 输出: 2

// 示例 3:
// 输入: [7,8,9,11,12]
// 输出: 1

// 方法一
var firstMissingPositive = function (nums) {
  for (let i = 0; i < nums.length; i++) {
    while (
      nums[i] >= 1 && // 对1~nums.length范围内的元素进行安排
      nums[i] <= nums.length && // 已经出现在理想位置的，就不用交换
      nums[nums[i] - 1] !== nums[i]
    ) {
      // 交换
      const temp = nums[nums[i] - 1];
      nums[nums[i] - 1] = nums[i];
      nums[i] = temp;
    }
  }
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] != i + 1) {
      return i + 1;
    }
  }
  return nums.length + 1;
};

// 方法二
var firstMissingPositive = function (nums) {
  const set = new Set();
  for (let i = 0; i < nums.length; i++) {
    set.add(nums[i]);
  }
  for (let i = 1; i <= nums.length + 1; i++) {
    if (!set.has(i)) {
      return i;
    }
  }
};
