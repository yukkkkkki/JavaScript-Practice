/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
// 方法一：回溯
var combine = function (n, k) {
  const res = [];
  if (k <= 0 || n <= 0) return res;

  const backTrack = (start, path) => {
    if (path.length === k) {
      res.push(path.slice());
      return;
    }

    for (let i = start; i <= n; i++) {
      path.push(i); // 考虑选择当前位置
      backTrack(i + 1, path); // 向下继续选择
      path.pop(); // 撤销选择
    }
  };

  backTrack(1, []);
  return res;
};
// 时间复杂度：O({n \choose k} \times k)
// 空间复杂度：O(n)
