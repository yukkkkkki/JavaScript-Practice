/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
// 方法一：回溯法
var combinationSum = function (candidates, target) {
  const res = [];
  const n = candidates.length;

  const backTrack = (tmpPath, target, start) => {
    if (target < 0) return;

    if (target === 0) {
      res.push(tmpPath);
      return;
    }

    for (let i = start; i < n; i++) {
      tmpPath.push(candidates[i]);
      backTrack(tmpPath.slice(), target - candidates[i], i);
      tmpPath.pop();
    }
  };

  backTrack([], target, 0);
  return res;
};

// console.log(combinationSum([2, 3, 6, 7], 7));
