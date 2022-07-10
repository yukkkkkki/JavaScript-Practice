/**
 * @param {number[][]} grid
 * @return {number}
 */
// 方法一：动态规划
// f[k][x1][x2] 表示两个人分别从 (x1, k - x1) 和 (x2, k - x2) 同时出发，到达 (n - 1, n - 1) 时摘到的樱桃个数之和的最大值
// 如果 (x1, k - x1) 或 (x2, k - x2) 是荆棘，则 f[k][x1][x2] = -∞，表示不合法的情况
// 枚举 A 和 B 上一步的走法，来计算 f[k][x1][x2]，有四种情况：
//   都往右：从 f[k - 1][x1][x2] 转移过来
//   A 往下，B 往右：从 f[k - 1][x1 - 1][x2] 转移过来
//   A 往右，B 往下：从 f[k - 1][x1][x2 - 1] 转移过来
//   都往下：从 f[k - 1][x1 - 1][x2 - 1] 转移过来
// 取这四种情况的最大值，加上 grid[x1][k - x1] 和 grid[x2][k - x2] 的值，就得到了 f[k][x1][x2]
// 如果 x1 = x2，则只需加上 grid[x1][k - x1]
// 最后答案为 max(f[2n - 2][n - 1][n - 1], 0)，取 max 是因为路径可能被荆棘挡住，无法从 (0, 0) 到达 (n - 1, n - 1)
var cherryPickup = function (grid) {
  const n = grid.length;
  const f = new Array(n * 2 - 1)
    .fill(0)
    .map(() =>
      new Array(n).fill(0).map(() => new Array(n).fill(-Number.MAX_VALUE))
    );

  f[0][0][0] = grid[0][0];
  for (let k = 1; k < n * 2 - 1; k++) {
    for (let x1 = Math.max(k - n + 1, 0); x1 <= Math.min(k, n - 1); x1++) {
      const y1 = k - x1;
      if (grid[x1][y1] === -1) continue;

      for (let x2 = x1; x2 <= Math.min(k, n - 1); x2++) {
        let y2 = k - x2;
        if (grid[x2][y2] === -1) continue;

        // 都往右
        let res = f[k - 1][x1][x2];
        // 往下，往右
        if (x1 > 0) res = Math.max(res, f[k - 1][x1 - 1][x2]);
        // 往右，往下
        if (x2 > 0) res = Math.max(res, f[k - 1][x1][x2 - 1]);
        // 都往下
        if (x1 > 0 && x2 > 0) res = Math.max(res, f[k - 1][x1 - 1][x2 - 1]);

        res += grid[x1][y1];
        if (x2 !== x1) res += grid[x2][y2];
        f[k][x1][x2] = res;
      }
    }
  }

  return Math.max(f[n * 2 - 2][n - 1][n - 1], 0);
};

// 降维
var cherryPickup = function (grid) {
  const n = grid.length;
  const f = new Array(n)
    .fill(0)
    .map(() => new Array(n).fill(-Number.MAX_VALUE));
  f[0][0] = grid[0][0];

  for (let k = 1; k < n * 2 - 1; k++) {
    for (let x1 = Math.min(k, n - 1); x1 >= Math.max(k - n + 1, 0); x1--) {
      for (let x2 = Math.min(k, n - 1); x2 >= x1; x2--) {
        const y1 = k - x1;
        const y2 = k - x2;

        if (grid[x1][y1] === -1 || grid[x2][y2] === -1) {
          f[x1][x2] = -Number.MAX_VALUE;
          continue;
        }

        // 都往右
        let res = f[x1][x2];
        // 往下，往右
        if (x1 > 0) res = Math.max(res, f[x1 - 1][x2]);
        // 往右，往下
        if (x2 > 0) res = Math.max(res, f[x1][x2 - 1]);
        //都往下
        if (x1 > 0 && x2 > 0) res = Math.max(res, f[x1 - 1][x2 - 1]);

        res += grid[x1][y1];
        if (x2 !== x1) res += grid[x2][y2];
        f[x1][x2] = res;
      }
    }
  }

  return Math.max(f[n - 1][n - 1], 0);
};
// 时间复杂度：O(n^3)
// 空间复杂度：O(n^2)
