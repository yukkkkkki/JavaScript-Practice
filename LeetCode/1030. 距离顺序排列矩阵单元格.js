// 给出 R 行 C 列的矩阵，其中的单元格的整数坐标为 (r, c)，满足 0 <= r < R 且 0 <= c < C。

// 另外，我们在该矩阵中给出了一个坐标为 (r0, c0) 的单元格。

// 返回矩阵中的所有单元格的坐标，并按到 (r0, c0) 的距离从最小到最大的顺序排，其中，两单元格(r1, c1) 和 (r2, c2) 之间的距离是曼哈顿距离，|r1 - r2| + |c1 - c2|。（你可以按任何满足此条件的顺序返回答案。）

// 示例 1：
// 输入：R = 1, C = 2, r0 = 0, c0 = 0
// 输出：[[0,0],[0,1]]
// 解释：从 (r0, c0) 到其他单元格的距离为：[0,1]

// 示例 2：
// 输入：R = 2, C = 2, r0 = 0, c0 = 1
// 输出：[[0,1],[0,0],[1,1],[1,0]]
// 解释：从 (r0, c0) 到其他单元格的距离为：[0,1,1,2]
// [[0,1],[1,1],[0,0],[1,0]] 也会被视作正确答案。

// 示例 3：
// 输入：R = 2, C = 3, r0 = 1, c0 = 2
// 输出：[[1,2],[0,2],[1,1],[0,1],[1,0],[0,0]]
// 解释：从 (r0, c0) 到其他单元格的距离为：[0,1,1,2,2,3]
// 其他满足题目要求的答案也会被视为正确，例如 [[1,2],[1,1],[0,2],[1,0],[0,1],[0,0]]。

/**
 * @param {number} R
 * @param {number} C
 * @param {number} r0
 * @param {number} c0
 * @return {number[][]}
 */

// 方法一：BFS
// 思路：从原点开始，找四周的点入列
// 节点出列,继续找四周的点(矩阵内)入列,同时避开曾入列的节点
// 入列点的顺序,是按曼哈顿距离从小大大,并不用计算距离
var allCellsDistOrder = function (R, C, r0, c0) {
  const res = [];
  const visited = new Array(R);
  for (let i = 0; i < R; i++) {
    visited[i] = new Array(C).fill(false);
  }

  const q = [[r0, c0]];
  visited[r0][c0] = true;

  while (q.length) {
    const cur = q.shift();
    const x = cur[0],
      y = cur[1];
    res.push(cur);

    if (x + 1 < R && !visited[x + 1][y]) {
      q.push([x + 1, y]);
      visited[x + 1][y] = true;
    }
    if (x - 1 >= 0 && !visited[x - 1][y]) {
      q.push([x - 1, y]);
      visited[x - 1][y] = true;
    }
    if (y - 1 >= 0 && !visited[x][y - 1]) {
      q.push([x, y - 1]);
      visited[x][y - 1] = true;
    }
    if (y + 1 < C && !visited[x][y + 1]) {
      q.push([x, y + 1]);
      visited[x][y + 1] = true;
    }
  }
  return res;
};

// 方法二：直接排序
var allCellsDistOrder = function (R, C, r0, c0) {
  const res = new Array(R * C);
  for (let i = 0; i < R * C; i++) {
    res[i] = [];
  }
  // console.log(res);
  for (let i = 0; i < R; i++) {
    for (let j = 0; j < C; j++) {
      res[i * C + j] = [i, j];
    }
  }
  res.sort(
    (a, b) =>
      Math.abs(a[0] - r0) +
      Math.abs(a[1] - c0) -
      (Math.abs(b[0] - r0) + Math.abs(b[1] - c0))
  );
  return res;
};
// 时间复杂度：O(RClog(RC))；空间复杂度：O(log(RC))

// 方法三：桶排序
// 思路：在枚举所有点时，我们可以直接按照哈曼顿距离分桶
// 把相同距离的坐标丢到一个数组里（桶），用一个map管理
// 然后按距离从小到大遍历这些桶，把桶里的坐标，逐个加入结果数组
var allCellsDistOrder = function (R, C, r0, c0) {
  const res = [];
  const hash = {};
  for (let i = 0; i < R; i++) {
    for (let j = 0; j < C; j++) {
      const d = dist(i, j, r0, c0);
      if (!hash[d]) {
        hash[d] = [[i, j]];
      } else {
        hash[d].push([i, j]);
      }
    }
  }
  for (let d = 0; d <= R + C - 2; d++) {
    if (!hash[d]) continue;
    for (const pair of hash[d]) {
      res.push(pair);
    }
  }
  return res;
};

function dist(r1, c1, r2, c2) {
  return Math.abs(r1 - r2) + Math.abs(c1 - c2);
}
console.log(allCellsDistOrder2(2, 3, 1, 2));
