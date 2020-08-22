// 给定一个包括 n 个整数的数组 nums 和 一个目标值 target。找出 nums 中的三个整数，使得它们的和与 target 最接近。返回这三个数的和。假定每组输入只存在唯一答案。

// 示例：
// 输入：nums = [-1,2,1,-4], target = 1
// 输出：2
// 解释：与 target 最接近的和是 2 (-1 + 2 + 1 = 2) 。

// 提示：
//     3 <= nums.length <= 10^3
//     -10^3 <= nums[i] <= 10^3
//     -10^4 <= target <= 10^4

// 解题思路
//     给一个目标值，找三个数，使他们之和最接近目标值
//     先将数组从小到大排序，从左到右先固定一个数，头尾双指针进行扫描
//     如果 sum 大于 target，就左移右指针，否则右移左指针

var threeSumClosest = function (nums, target) {
  nums.sort((a, b) => a - b);
  let res = nums[0] + nums[1] + nums[nums.length - 1];
  for (let i = 0; i < nums.length - 2; i++) {
    const n1 = nums[i];
    let left = i + 1;
    let right = nums.length - 1;
    while (left < right) {
      const n2 = nums[left];
      const n3 = nums[right];
      const sum = n1 + n2 + n3;
      sum > target ? right-- : left++;
      if (Math.abs(sum - target) < Math.abs(res - target)) {
        res = sum;
      }
    }
  }
  return res;
};
