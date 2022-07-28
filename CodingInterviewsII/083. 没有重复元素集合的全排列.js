/**
 * @param {number[]} nums
 * @return {number[][]}
 */
// 方法一：回溯
var permute = function (nums) {
  const res = [];

  const backTrack = (idx, path) => {
    if (path.length === nums.length) {
      res.push(path.slice());
      return;
    }

    for (let i = 0; i < nums.length; i++) {
      if (path.indexOf(nums[i]) !== -1) continue;

      path.push(nums[i]);
      backTrack(idx + 1, path);
      path.pop();
    }
  };

  backTrack(0, []);
  return res;
};
// 时间复杂度：O(n x n!)
// 空间复杂度：O(n)
