/**
 * @param {character[]} tasks
 * @param {number} n
 * @return {number}
 */
// 方法一：构造
var leastInterval = function (tasks, n) {
  const freq = _.countBy(tasks);

  // 最多的执行次数
  const maxExec = Math.max(...Object.values(freq));
  // 具有最多执行次数的任务数量
  let maxCount = 0;
  Object.values(freq).forEach((v) => {
    if (v === maxExec) maxCount++;
  });

  return Math.max((maxExec - 1) * (n + 1) + maxCount, tasks.length);
};
// 时间复杂度：O(|task| + |Σ|);
// 空间复杂度：O(|Σ|)

console.log(leastInterval(["A", "A", "A", "B", "B", "B"], 2));
