// 给定一组不含重复元素的整数数组 nums，返回该数组所有可能的子集（幂集）。

// 说明：解集不能包含重复的子集。

// 示例:

// 输入: nums = [1,2,3]
// 输出:
// [
//   [3],
//   [1],
//   [2],
//   [1,2,3],
//   [1,3],
//   [2,3],
//   [1,2],
//   []
// ]

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
// 方法一：回溯
var subsets = function (nums) {
  const n = nums.length;
  const res = [];

  const backTrack = (start, tmpPath) => {
    res.push(tmpPath);
    for (let i = start; i < n; i++) {
      tmpPath.push(nums[i]);
      backTrack(i + 1, tmpPath.slice());
      tmpPath.pop();
    }
  };

  backTrack(0, []);
  return res;
};

console.log(subsets([1, 2, 3]));
