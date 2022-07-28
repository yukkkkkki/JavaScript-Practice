/**
 * @param {number[][]} edges
 * @return {number[]}
 */
// 方法一：并查集
var findRedundantConnection = function (edges) {
  const n = edges.length;
  const parent = new Array(n + 1).fill(0).map((v, i) => i);

  // 遍历每一条边，判断这条边连接的两个顶点是否属于相同的连通分量
  for (let i = 0; i < n; i++) {
    const edge = edges[i];
    const [node1, node2] = edge;

    // 两个顶点属于不同的连通分量
    // 说明在遍历到当前的边之前，这两个顶点之间不连通
    // 因此当前的边不会导致环出现，合并这两个顶点的连通分量
    if (find(parent, node1) !== find(parent, node2)) {
      union(parent, node1, node2);
    } else {
      // 两个顶点属于相同的连通分量，则说明在遍历到当前的边之前，这两个顶点之间已经连通
      // 将当前的边作为答案返回
      return edge;
    }
  }

  return [0];
};
const union = (parent, ind1, ind2) => {
  parent[find(parent, ind1)] = find(parent, ind2);
};
const find = (parent, ind) => {
  if (parent[ind] !== ind) {
    parent[ind] = find(parent, parent[ind]);
  }
  return parent[ind];
};
// 时间复杂度：O(nlogn)
// 空间复杂度：O(n)
