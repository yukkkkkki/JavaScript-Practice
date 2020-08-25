// 给定一个 没有重复 数字的序列，返回其所有可能的全排列。

// 示例:
// 输入: [1,2,3]
// 输出:
// [
//   [1,2,3],
//   [1,3,2],
//   [2,1,3],
//   [2,3,1],
//   [3,1,2],
//   [3,2,1]
// ]

// 方法一：DFS回溯
var permute = function (nums) {
  let res = [];

  const backTrack = (res, path) => {
    if (path.length === nums.length) {
      res.push([...path]);
      return;
    }
    for (let i = 0; i < nums.length; i++) {
      if (path.indexOf(nums[i]) === -1) {
        path.push(nums[i]);
        backTrack(res, path);
        path.pop();
      }
    }
  };
  backTrack(res, []);
  return res;
};

// 简化版
var permute = function (nums, res = []) {
  let backTrack = (path = []) => {
    if (path.length === nums.length) res.push(path);
    for (let n of nums) {
      !path.includes(n) && backTrack(path.concat(n));
    }
  };
  backTrack();
  return res;
};
