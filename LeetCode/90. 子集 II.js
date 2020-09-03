// 给定一个可能包含重复元素的整数数组 nums，返回该数组所有可能的子集（幂集）。

// 说明：解集不能包含重复的子集。

// 示例:
// 输入: [1,2,2]
// 输出:
// [
//   [2],
//   [1],
//   [1,2,2],
//   [2,2],
//   [1,2],
//   []
// ]

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
// 回溯
var subsetsWithDup = function (nums) {
  const n = nums.length;
  const res = [];
  nums.sort((a, b) => a - b);

  const backTrack = (start, tmpPath) => {
    res.push(tmpPath);
    if (tmpPath.length === n) return;
    for (let i = start; i < n; i++) {
      if (i > start && nums[i] === nums[i - 1]) continue; // 剪枝
      tmpPath.push(nums[i]);
      backTrack(i + 1, tmpPath.slice());
      tmpPath.pop();
    }
  };

  backTrack(0, []);
  return res;
};
