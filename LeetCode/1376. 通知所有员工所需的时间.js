/**
 * @param {number} n
 * @param {number} headID
 * @param {number[]} manager
 * @param {number[]} informTime
 * @return {number}
 */
// 方法一：自上而下递归
var numOfMinutes = function (n, headID, manager, informTime) {
  const map = new Map();

  for (let i = 0; i < n; i++) {
    let higher = manager[i];
    if (map.has(higher)) {
      map.get(higher).push(i);
    } else {
      map.set(higher, [i]);
    }
  }

  const dfs = (id, time) => {
    let curTime = time;
    for (let next of map.get(id) || []) {
      curTime = Math.max(dfs(next, time + informTime[next]), curTime);
    }
    return curTime;
  };

  let res = dfs(headID, informTime[headID]);
  return res;
};
