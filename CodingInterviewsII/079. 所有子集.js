/**
 * @param {number[]} nums
 * @return {number[][]}
 */
// 方法一：回溯 DFS
var subsets = function (nums) {
  const res = [];

  const backTrack = (idx, path) => {
    if (idx === nums.length) {
      res.push(path.slice());
      return;
    }

    // 选择这个数
    path.push(nums[idx]);
    backTrack(idx + 1, path);
    path.pop(); // 撤销该选择
    // 不选择这个数
    backTrack(idx + 1, path);
  };

  backTrack(0, []);
  return res;
};
// 时间复杂度：平均：O(n x 2^n)
// 空间复杂度：O(n)
