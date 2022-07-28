/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
// 方法一：回溯
var combinationSum = function (candidates, target) {
  const res = [];
  const backTrack = (target, idx, path) => {
    if (idx === candidates.length) return;

    if (target === 0) {
      res.push(path.slice());
      return;
    }

    // 直接跳过
    backTrack(target, idx + 1, path);

    // 选择当前数
    if (target - candidates[idx] >= 0) {
      path.push(candidates[idx]);
      backTrack(target - candidates[idx], idx, path);
      path.pop();
    }
  };

  backTrack(target, 0, []);
  return res;
};
// 时间复杂度：O(S)，其中 S 为所有可行解的长度之和
// 空间复杂度：O(target)
