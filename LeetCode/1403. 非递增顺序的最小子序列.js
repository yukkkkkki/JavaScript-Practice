/**
 * @param {number[]} nums
 * @return {number[]}
 */
// 方法一：贪心
// 按照从大到小的顺序依次从原始数组中取出数据，直到取出的数据之和 curr 大于数组中剩余的元素之和为止
var minSubsequence = function (nums) {
  const total = _.sum(nums);
  nums.sort((a, b) => a - b);

  const res = [];
  let curr = 0;
  for (let i = nums.length - 1; i >= 0; i--) {
    curr += nums[i];
    res.push(nums[i]);

    if (total - curr < curr) {
      break;
    }
  }

  return res;
};
// 时间复杂度：O(nlogn)
// 空间复杂度：O(logn)
