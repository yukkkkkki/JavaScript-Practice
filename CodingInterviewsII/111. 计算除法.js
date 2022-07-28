/**
 * @param {string[][]} equations
 * @param {number[]} values
 * @param {string[][]} queries
 * @return {number[]}
 */
// 方法一：广度优先搜索
var calcEquation = function (equations, values, queries) {
  let nvars = 0;
  const variables = new Map();

  const n = equations.length;
  for (let i = 0; i < n; i++) {
    if (!variables.has(equations[i][0])) {
      variables.set(equations[i][0], nvars++);
    }
    if (!variables.has(equations[i][1])) {
      variables.set(equations[i][1], nvars++);
    }
  }

  // 对于每个点，存储其直接连接到的所有点及对应的权值
  const edges = new Array(nvars).fill(0);
  for (let i = 0; i < nvars; i++) {
    edges[i] = [];
  }

  for (let i = 0; i < n; i++) {
    const va = variables.get(equations[i][0]);
    const vb = variables.get(equations[i][1]);
    edges[va].push([vb, values[i]]);
    edges[vb].push([va, 1.0 / values[i]]);
  }

  const queriesCount = queries.length;
  const ret = [];
  for (let i = 0; i < queriesCount; i++) {
    const query = queries[i];
    let result = -1.0;
    if (variables.has(query[0]) && variables.has(query[1])) {
      const ia = variables.get(query[0]);
      const ib = variables.get(query[1]);

      if (ia === ib) {
        result = 1.0;
      } else {
        const points = [];
        points.push(ia);
        const ratios = new Array(nvars).fill(-1.0);
        ratios[ia] = 1.0;

        while (points.length && ratios[ib] < 0) {
          const x = points.pop();
          for (const [y, val] of edges[x]) {
            if (ratios[y] < 0) {
              ratios[y] = ratios[x] * val;
              points.push(y);
            }
          }
        }

        result = ratios[ib];
      }
    }

    ret[i] = result;
  }

  return ret;
};
// 时间复杂度：O(ML + Q⋅(L+M))，其中 M 为边的数量，Q 为询问的数量，L 为字符串的平均长度
// 空间复杂度：O(NL + M)
