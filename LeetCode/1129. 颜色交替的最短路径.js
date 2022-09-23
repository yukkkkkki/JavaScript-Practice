/**
 * @param {number} n
 * @param {number[][]} redEdges
 * @param {number[][]} blueEdges
 * @return {number[]}
 */
// 方法一：BFS
var shortestAlternatingPaths = function (n, redEdges, blueEdges) {
  const res = new Array(n).fill(-1);
  const map = Array.from({ length: n }, () => []);
  for (const [v, w] of redEdges) {
    map[v].push(w);
  }
  for (const [v, w] of blueEdges) {
    map[v].push(w | 128);
  }

  const vis = new Set();
  let queue = [0, 128];
  let step = -1;

  while (queue.length) {
    const tmp = [];
    step++;
    for (const f of queue) {
      vis.add(f);
      const idx = f & -129;
      if (res[idx] === -1) res[idx] = step;
      for (const t of map[idx]) {
        if (vis.has(t)) continue;
        // 同色
        if ((f & 128) === (t & 128)) continue;
        tmp.push(t);
      }
    }
    queue = tmp;
  }
  return res;
};
