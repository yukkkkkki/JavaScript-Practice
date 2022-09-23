/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
// 方法一：回溯
var combinationSum = function (candidates, target) {
  const res = [];
  const n = candidates.length;

  const backTrack = (path, newTarget, start) => {
    if (newTarget < 0) return;
    if (newTarget === 0) {
      res.push(path.slice());
      return;
    }

    for (let i = start; i < n; i++) {
      path.push(candidates[i]);
      backTrack(path, newTarget - candidates[i], i);
      path.pop();
    }
  };

  backTrack([], target, 0);
  return res;
};

console.log(combinationSum([2, 3, 6, 7], 7));
