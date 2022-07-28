/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
// 方法一：回溯
var combinationSum2 = function (candidates, target) {
  const res = [];
  candidates.sort((a, b) => a - b);

  const backTrack = (idx, sum, path) => {
    if (sum === target) {
      res.push(path.slice());
      return;
    }

    for (let i = idx; i < candidates.length; i++) {
      if (sum + candidates[i] > target) break;

      if (i > idx && candidates[i] === candidates[i - 1]) continue;

      // 选择当前
      path.push(candidates[i]);
      backTrack(i + 1, sum + candidates[i], path);
      // 撤销操作
      path.pop();
    }
  };

  backTrack(0, 0, []);
  return res;
};
// 时间复杂度：O(2^n x n)
// 空间复杂度：O(n)
