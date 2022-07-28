/**
 * @param {number[][]} grid
 * @return {number}
 */
// 方法一：深度优先搜索
// 为了确保每个土地访问不超过一次，我们每次经过一块土地时，将这块土地的值置为 00。这样我们就不会多次访问同一土地
var maxAreaOfIsland = function (grid) {
  const n = grid.length;
  const m = grid[0].length;

  const dfs = (cur_i, cur_j) => {
    if (
      cur_i < 0 ||
      cur_i === n ||
      cur_j < 0 ||
      cur_j === m ||
      grid[cur_i][cur_j] !== 1
    ) {
      return 0;
    }

    grid[cur_i][cur_j] = 0;
    let dir = [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0]
    ];
    let res = 1;
    for (let ind = 0; ind < 4; ind++) {
      let next_i = cur_i + dir[ind][0];
      let next_j = cur_j + dir[ind][1];
      res += dfs(next_i, next_j);
    }

    return res;
  };

  let result = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      result = Math.max(result, dfs(i, j));
    }
  }
  return result;
};
// 时间复杂度：O(m x n)
// 空间复杂度：O(m x n)

// 方法二：广度优先搜索
var maxAreaOfIsland = function (grid) {
  const n = grid.length;
  const m = grid[0].length;

  let res = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      let cur = 0;
      const queuei = [i];
      const queuej = [j];

      while (queuei.length) {
        let cur_i = queuei.shift();
        let cur_j = queuej.shift();

        if (
          cur_i < 0 ||
          cur_j < 0 ||
          cur_i == n ||
          cur_j == m ||
          grid[cur_i][cur_j] !== 1
        ) {
          continue;
        }

        cur++;
        grid[cur_i][cur_j] = 0;

        let di = [0, 0, 1, -1];
        let dj = [1, -1, 0, 0];
        for (let ind = 0; ind < 4; ind++) {
          let next_i = cur_i + di[ind];
          let next_j = cur_j + dj[ind];

          queuei.push(next_i);
          queuej.push(next_j);
        }
      }

      res = Math.max(res, cur);
    }
  }

  return res;
};
// 时间复杂度：O(m x n)
// 空间复杂度：O(m x n)
