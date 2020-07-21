// 给定一个整数 n，生成所有由 1 ... n 为节点所组成的 二叉搜索树 。

// 示例：
// 输入：3
// 输出：
// [
//   [1,null,3,2],
//   [3,2,null,1],
//   [3,1,null,null,2],
//   [2,1,3],
//   [1,null,2,null,3]
// ]
// 解释：
// 以上的输出对应以下 5 种不同结构的二叉搜索树：

//    1         3     3      2      1
//     \       /     /      / \      \
//      3     2     1      1   3      2
//     /     /       \                 \
//    2     1         2                 3
// 方法一：递归
var generateTrees = function (n) {
  if (n == 0) return [];

  const getAllBSTs = (low, high) => {
    if (low > high) return [null];
    if (low == high) return [new TreeNode(low)];
    const res = [];
    for (let i = low; i <= high; i++) {
      const leftBSTs = getAllBSTs(low, i - 1);
      const rightBSTs = getAllBSTs(i + 1, high);
      for (const leftBST of leftBSTs) {
        for (const rightBST of rightBSTs) {
          const root = new TreeNode(i);
          root.left = leftBST;
          root.right = rightBST;
          res.push(root);
        }
      }
    }
    return res;
  };
  return getAllBSTs(1, n);
};

// 记忆化递归
var generateTrees = function (n) {
  if (n == 0) return [];
  const memo = new Array(n + 1).fill().map(() => new Array(n + 1).fill(0));

  const getAllBSTs = (low, high) => {
    if (low > high) return [null];
    if (memo[low][high]) return memo[low][high];
    if (low == high) return [new TreeNode(low)];
    const res = [];
    for (let i = low; i <= high; i++) {
      const leftBSTs = getAllBSTs(low, i - 1);
      const rightBSTs = getAllBSTs(i + 1, high);
      for (const leftBST of leftBSTs) {
        for (const rightBST of rightBSTs) {
          const root = new TreeNode(i);
          root.left = leftBST;
          root.right = rightBST;
          res.push(root);
        }
      }
    }
    return (memo[low][high] = res);
  };
  return getAllBSTs(1, n);
};
