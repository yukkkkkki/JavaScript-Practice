// 给定一个包含 n 个整数的数组 nums 和一个目标值 target，判断 nums 中是否存在四个元素 a，b，c 和 d ，使得 a + b + c + d 的值与 target 相等？找出所有满足条件且不重复的四元组。

// 注意：
// 答案中不可以包含重复的四元组。

// 示例：
// 给定数组 nums = [1, 0, -1, 0, -2, 2]，和 target = 0。
// 满足要求的四元组集合为：
// [
//   [-1,  0, 0, 1],
//   [-2, -1, 1, 2],
//   [-2,  0, 0, 2]
// ]

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
// 方法一：排序 + 双指针
var fourSum = function (nums, target) {
  let res = [];
  nums.sort((a, b) => a - b);

  const backTrack = (start, tmpPath) => {
    if (tmpPath.length == 4) {
      let curSum = tmpPath.reduce((prev, acc) => prev + acc);
      if (curSum == target) {
        res.push(tmpPath.slice());
      }
      return;
    }

    for (let i = start; i < nums.length; i++) {
      if (nums[i] == nums[i - 1] && i > start) {
        continue;
      }
      tmpPath.push(nums[i]);
      backTrack(i + 1, tmpPath);
      tmpPath.pop();
    }
  };

  backTrack(0, []);
  return res;
};

// console.log(fourSum([1, 0, -1, 0, -2, 2], 0));
