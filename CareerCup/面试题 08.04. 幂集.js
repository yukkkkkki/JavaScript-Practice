// 幂集。编写一种方法，返回某集合的所有子集。集合中不包含重复的元素。

// 说明：解集不能包含重复的子集。

// 示例:
//  输入： nums = [1,2,3]
//  输出：
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

// 方法一：回溯法
var subsets = function (nums) {
  const n = nums.length;
  const res = [];

  const backTrack = (start, tmpPath) => {
    res.push(tmpPath.slice());
    for (let i = start; i < n; i++) {
      tmpPath.push(nums[i]);
      backTrack(i + 1, tmpPath);
      tmpPath.pop();
    }
  };

  backTrack(0, []);
  return res;
};
