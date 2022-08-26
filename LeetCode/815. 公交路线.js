/**
 * @param {number[][]} routes
 * @param {number} source
 * @param {number} target
 * @return {number}
 */
// 方法一：优化建图 + 广度优先搜索
// 遍历所有公交路线，记录每一个车站属于哪些公交路线
// 然后我们遍历每一个车站，如果有多条公交路线经过该点，则在这些公交路线之间连边
// 使用哈希映射来实时维护「车站所属公交路线列表」
var numBusesToDestination = function (routes, source, target) {
  if (source === target) return 0;

  const n = routes.length;
  const edge = new Array(n).fill(0).map(() => new Array(n).fill(0));
  const rec = new Map();

  for (let i = 0; i < n; i++) {
    // 当前枚举到公交路线 i 中的车站 site
    for (const site of routes[i]) {
      const list = rec.get(site) || [];
      for (const j of list) {
        edge[i][j] = edge[j][i] = true;
      }
      list.push(i);
      rec.set(site, list);
    }
  }

  const dis = new Array(n).fill(-1);
  const queue = [];
  for (const bus of rec.get(source) || []) {
    dis[bus] = 1;
    queue.push(bus);
  }
  while (queue.length) {
    const x = queue.shift();
    for (let y = 0; y < n; y++) {
      if (edge[x][y] && dis[y] === -1) {
        dis[y] = dis[x] + 1;
        queue.push(y);
      }
    }
  }

  let result = Number.MAX_VALUE;
  for (const bus of rec.get(target) || []) {
    if (dis[bus] !== -1) {
      result = Math.min(result, dis[bus]);
    }
  }

  return result === Number.MAX_VALUE ? -1 : result;
};
// 时间复杂度：O(nm + n^2)
// 空间复杂度：O(n^2 + m)
