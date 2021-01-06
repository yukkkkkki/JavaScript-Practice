// 给你一个变量对数组 equations 和一个实数值数组 values 作为已知条件，其中 equations[i] = [Ai, Bi] 和 values[i] 共同表示等式 Ai / Bi = values[i] 。每个 Ai 或 Bi 是一个表示单个变量的字符串。
// 另有一些以数组 queries 表示的问题，其中 queries[j] = [Cj, Dj] 表示第 j 个问题，请你根据已知条件找出 Cj / Dj = ? 的结果作为答案。
// 返回 所有问题的答案 。如果存在某个无法确定的答案，则用 -1.0 替代这个答案。

//
// 注意：输入总是有效的。你可以假设除法运算中不会出现除数为 0 的情况，且不存在任何矛盾的结果。

// 示例 1：
// 输入：equations = [["a","b"],["b","c"]], values = [2.0,3.0], queries = [["a","c"],["b","a"],["a","e"],["a","a"],["x","x"]]
// 输出：[6.00000,0.50000,-1.00000,1.00000,-1.00000]
// 解释：
// 条件：a / b = 2.0, b / c = 3.0
// 问题：a / c = ?, b / a = ?, a / e = ?, a / a = ?, x / x = ?
// 结果：[6.0, 0.5, -1.0, 1.0, -1.0 ]

// 示例 2：
// 输入：equations = [["a","b"],["b","c"],["bc","cd"]], values = [1.5,2.5,5.0], queries = [["a","c"],["c","b"],["bc","cd"],["cd","bc"]]
// 输出：[3.75000,0.40000,5.00000,0.20000]

// 示例 3：
// 输入：equations = [["a","b"]], values = [0.5], queries = [["a","b"],["b","a"],["a","c"],["x","y"]]
// 输出：[0.50000,2.00000,-1.00000,-1.00000]
//

// 提示：
// 1 <= equations.length <= 20
// equations[i].length == 2
// 1 <= Ai.length, Bi.length <= 5
// values.length == equations.length
// 0.0 < values[i] <= 20.0
// 1 <= queries.length <= 20
// queries[i].length == 2
// 1 <= Cj.length, Dj.length <= 5
// Ai, Bi, Cj, Dj 由小写英文字母与数字组成

/**
 * @param {string[][]} equations
 * @param {number[]} values
 * @param {string[][]} queries
 * @return {number[]}
 */
// 方法一：邻接表 + dfs
var calcEquation = function (equations, values, queries) {
  let map = new Map(),
    res = [];
  let visit = new Map(); // visit 数组标记在搜索过程中是否访问过

  const dfs = (src, dst) => {
    // 若可达，且找到了目的节点，返回 1.0 表示成功到达
    if (src === dst) {
      return 1.0;
    }

    let adjs = map.get(src);

    // 遍历 src 的所有边，若未访问过，则对其调用 dfs 获取路径积
    for (let i = 0; i < adjs.length; ++i) {
      let next = adjs[i];
      if (!visit.get(next[0])) {
        visit.set(next[0], true);

        let ret = dfs(next[0], dst);

        visit.set(next[0], false);
        // 若可达 dst，则返回当前边权与后续的边权积 ret 的乘积
        if (ret !== -1.0) {
          return next[1] * ret;
        }
      }
    }

    // 否则，不可达，返回 -1.0
    return -1.0;
  };

  // 创建邻接表
  for (let i = 0; i < equations.length; ++i) {
    let e = equations[i],
      v = values[i];

    if (!map.has(e[0])) {
      map.set(e[0], []);
      visit.set(e[0], false);
    }
    if (!map.has(e[1])) {
      map.set(e[1], []);
      visit.set(e[1], false);
    }

    let adj1 = map.get(e[0]);
    let adj2 = map.get(e[1]);
    adj1.push([e[1], v]);
    adj2.push([e[0], 1 / v]);
  }

  for (let q of queries) {
    let n0 = q[0],
      n1 = q[1];
    if (map.has(n0) && map.has(n1)) {
      visit.set(n0, true);
      res.push(dfs(n0, n1));
      visit.set(n0, false);
    } else {
      res.push(-1.0);
    }
  }
  return res;
};
