// 给定一个非空整数数组， 除了某个元素只出现一次以外， 其余每个元素均出现两次。 找出那个只出现了一次的元素。

// 说明：
// 你的算法应该具有线性时间复杂度。 你可以不使用额外空间来实现吗？

// 示例 1:
// 输入: [2, 2, 1]
// 输出: 1

// 示例 2:
// 输入: [4, 1, 2, 1, 2]
// 输出: 4

// 方法一：
var singleNumber = function (nums) {
  // 先排序。再暴力
  nums = nums.sort();
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== nums[i - 1] && nums[i] !== nums[i + 1]) return nums[i];
  }
};

// 方法二：哈希(这个效果更好)
var singleNumber = function (nums) {
  let numsObj = {};
  for (let i = 0; i < nums.length; i++) {
    if (numsObj[nums[i]]) {
      delete numsObj[nums[i]];
    } else {
      numsObj[nums[i]] = 1;
    }
  }
  return Object.keys(numsObj)[0];
};

// 方法三
// 思路
// 将数组遍历，并通过过滤的方法，将值相同的数归集为数组的一个元素
// 由于除了一个元素，其他元素都会出现两次，所有只要找到过滤的集合的长度为1的那个集合
// 该集合第一个元素即是该元素。
// 详解
// 1. 遍历数组，由于需要返回值，这里使用map方法
// 2. 使用过滤函数，过滤数组中值与当前遍历的元素的值相同的元素
// 3. 现在得到了一个存在多个集合的数组，而数组中唯一值的那个元素的集合肯定值存在它自己
// 4. 查询这个集合中长度只有1的集合，再取这个集合的第一个元素，即是只出现一次的数字
var singleNumber = function (nums) {
  let numsGroup = nums.map((num) => nums.filter((v) => v === num));
  return numsGroup.find((num) => num.length === 1)[0];
};

// 方法二
var singleNumber = function (nums) {
  return nums.reduce((accumulator, currentValue) => accumulator ^ currentValue);
};
