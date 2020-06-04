// 给定一棵二叉搜索树，请找出其中第k大的节点。

// 示例 1:
// 输入: root = [3,1,4,null,2], k = 1
//    3
//   / \
//  1   4
//   \
//    2
// 输出: 4

// 示例 2:
// 输入: root = [5,3,6,2,4,null,null,1], k = 3
//        5
//       / \
//      3   6
//     / \
//    2   4
//   /
//  1
// 输出: 4

// 限制：
// 1 ≤ k ≤ 二叉搜索树元素个数
// 中序遍历，搜索二叉树的中序遍历是有序的
var kthLargest = function (root, k) {
  let arr = [];

  function dfs(node) {
    if (!node) return
    dfs(node.left)
    arr.push(node.val)
    dfs(node.right)
  }
  dfs(root);
  return arr[arr.length - k];
};