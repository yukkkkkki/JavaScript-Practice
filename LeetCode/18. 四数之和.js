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
// 方法一：排序 + 回溯
var fourSum = function (nums, target) {
  nums.sort((a, b) => a - b);

  const backTrack = (start, tmpRes) => {
    if (tmpRes.length === 4) {
      let sum = tmpRes.reduce((prev, curr) => prev + curr);
      if (sum === target) {
        res.push(tmpRes.slice());
      }
      return;
    }

    for (let i = start; i < nums.length; i++) {
      if (nums[i] == nums[i - 1] && i > start) {
        continue;
      }

      tmpRes.push(nums[i]);
      backTrack(i + 1, tmpRes);
      tmpRes.pop();
    }
  };

  let res = [];
  backTrack(0, []);
  return res;
};
// console.log(fourSum([1, 0, -1, 0, -2, 2], 0));
