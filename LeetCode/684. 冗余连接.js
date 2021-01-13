// 在本问题中, 树指的是一个连通且无环的无向图。

// 输入一个图，该图由一个有着N个节点 (节点值不重复1, 2, ..., N) 的树及一条附加的边构成。附加的边的两个顶点包含在1到N中间，这条附加的边不属于树中已存在的边。

// 结果图是一个以边组成的二维数组。每一个边的元素是一对[u, v] ，满足 u < v，表示连接顶点u 和v的无向图的边。

// 返回一条可以删去的边，使得结果图是一个有着N个节点的树。如果有多个答案，则返回二维数组中最后出现的边。答案边 [u, v] 应满足相同的格式 u < v。

// 示例 1：
// 输入: [[1,2], [1,3], [2,3]]
// 输出: [2,3]
// 解释: 给定的无向图为:
//   1
//  / \
// 2 - 3

// 示例 2：
// 输入: [[1,2], [2,3], [3,4], [1,4], [1,5]]
// 输出: [1,4]
// 解释: 给定的无向图为:
// 5 - 1 - 2
//     |   |
//     4 - 3

/**
 * @param {number[][]} edges
 * @return {number[]}
 */
// 方法一：并查集
// 思路：
// 遍历每一条边，判断这条边连接的两个顶点是否属于相同的连通分量。
// 如果两个顶点属于不同的连通分量，则说明在遍历到当前的边之前，这两个顶点之间不连通，因此当前的边不会导致环出现，合并这两个顶点的连通分量。
// 如果两个顶点属于相同的连通分量，则说明在遍历到当前的边之前，这两个顶点之间已经连通，因此当前的边导致环出现，为附加的边，将当前的边作为答案返回。
var findRedundantConnection = function (edges) {
  const nodesCount = edges.length;
  const parent = new Array(nodesCount + 1).fill(0).map((value, index) => index);
  for (let i = 0; i < nodesCount; i++) {
    const edge = edges[i];
    const node1 = edge[0],
      node2 = edge[1];
    if (find(parent, node1) != find(parent, node2)) {
      union(parent, node1, node2);
    } else {
      return edge;
    }
  }
  return [0];
};
const union = (parent, index1, index2) => {
  parent[find(parent, index1)] = find(parent, index2);
};
const find = (parent, index) => {
  if (parent[index] !== index) {
    parent[index] = find(parent, parent[index]);
  }
  return parent[index];
};
