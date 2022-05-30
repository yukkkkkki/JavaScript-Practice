/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
// 方法一：回溯
var combine = function (n, k) {
  if (k == 0) return [[]];

  const res = [];
  const backTrack = (start, tmpPath) => {
    // 回溯出口
    if (tmpPath.length === k) {
      res.push(tmpPath.slice());
      return;
    }

    // 回溯主体
    for (let i = start; i <= n; i++) {
      // 进行其他的操作;
      tmpPath.push(i);
      // 标记已经搜索过的节点
      backTrack(i + 1, tmpPath);
      // 状态返回
      tmpPath.pop();
    }
  };

  backTrack(1, []);
  return res;
};
