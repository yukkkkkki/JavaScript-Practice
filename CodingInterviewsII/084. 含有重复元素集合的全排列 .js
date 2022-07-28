/**
 * @param {number[]} nums
 * @return {number[][]}
 */
// 方法一：回溯
var permuteUnique = function (nums) {
  const res = [];
  const vis = new Array(nums.length).fill(false);
  nums.sort((a, b) => a - b);

  const backTrack = (idx, path) => {
    if (idx === nums.length) {
      res.push(path.slice());
      return;
    }

    for (let i = 0; i < nums.length; i++) {
      // 保证了对于重复数的集合，一定是从左往右逐个填入的
      if (vis[i] || (i > 0 && nums[i] === nums[i - 1] && !vis[i - 1])) {
        continue;
      }

      path.push(nums[i]);
      vis[i] = true;
      backTrack(idx + 1, path);
      vis[i] = false;
      path.pop();
    }
  };

  backTrack(0, []);
  return res;
};
// 时间复杂度：O(n x n!)
// 空间复杂度：O(n)
