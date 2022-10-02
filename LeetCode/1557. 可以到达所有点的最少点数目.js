/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number[]}
 */
// 方法一：寻找入度为零的节点
var findSmallestSetOfVertices = function (n, edges) {
  // 初始化入度是否为0的数组
  const flag = new Array(n).fill(true);
  for (const [from, to] of edges) {
    flag[to] = false;
  }

  const res = [];
  for (let i = 0; i < n; i++) {
    if (flag[i]) res.push(i);
  }
  return res;
};
// 时间复杂度：O(m + n)
// 空间复杂度：O(n)
