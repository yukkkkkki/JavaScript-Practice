/**
 * @param {number} n
 * @param {number[][]} paths
 * @return {number[]}
 */
// 方法一：回溯
var gardenNoAdj = function (n, paths) {
  // 保存每个不能一样的花园
  const map = {};
  for (const [p1, p2] of paths) {
    map[p1] = map[p1] || [];
    map[p2] = map[p2] || [];
    map[p1].push(p2);
    map[p2].push(p1);
  }

  let res = null;
  const list = [];

  const dfs = () => {
    if (list.length === n) return (res = [...list]);

    // 下一个花园的索引
    const idx = list.length + 1;
    for (const k of [1, 2, 3, 4]) {
      if (res) continue;
      // 判断能不能继续
      const cannot = map[idx]?.some((i) => list[i - 1] === k);
      if (cannot) continue;

      list.push(k);
      dfs();
      list.pop();
    }
  };

  dfs();
  return res;
};
