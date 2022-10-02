/**
 * @param {number} n
 * @param {number[][]} trust
 * @return {number}
 */
//  方法一：计算各节点的入度和出度
// 统计每个节点的入度和出度
// 根据题意，在法官存在的情况下，法官不相信任何人，每个人（除了法官外）都信任法官，且只有一名法官。
// 因此法官这个节点的入度是 n-1, 出度是 0。
var findJudge = function (n, trust) {
  const inDeg = new Array(n + 1).fill(0);
  const outDeg = new Array(n + 1).fill(0);

  for (const edge of trust) {
    const [x, y] = edge;
    inDeg[y]++;
    outDeg[x]++;
  }

  for (let i = 1; i <= n; i++) {
    if (inDeg[i] === n - 1 && outDeg[i] === 0) {
      return i;
    }
  }

  return -1;
};
// 时间复杂度：O(n + m)
// 空间复杂度：O(n)
