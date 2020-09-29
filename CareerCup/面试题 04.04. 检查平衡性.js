// 实现一个函数，检查二叉树是否平衡。在这个问题中，平衡树的定义如下：任意一个节点，其两棵子树的高度差不超过 1。

// 示例 1:
// 给定二叉树 [3,9,20,null,null,15,7]
//     3
//    / \
//   9  20
//     /  \
//    15   7
// 返回 true 。

// 示例 2:
// 给定二叉树 [1,2,2,3,3,null,null,4,4]
//       1
//      / \
//     2   2
//    / \
//   3   3
//  / \
// 4   4
// 返回 false 。

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
// 方法一：DFS
var isBalanced = function (root) {
  const dfs = (node) => {
    if (!node) return 0;
    let left = dfs(node.left);
    let right = dfs(node.right);
    // 判断只要一次左右树相差为 -1；一直向上返回-1
    if (left == -1 || right == -1) return -1;
    if (Math.abs(left - right) <= 1) {
      return Math.max(left, right) + 1;
    } else {
      return -1;
    }
  };
  return dfs(root) > -1;
};

// 方法二：递归
// 先各计算左右子树的高度
var isBalanced = function (root) {
  if (!root) return true;
  let leftHeight = getHeight(root.left);
  let rightHeight = getHeight(root.right);
  if (Math.abs(leftHeight - rightHeight) > 1) return false;
  return isBalanced(root.left) && isBalanced(root.right);
};

function getHeight(node) {
  if (!node) return 0;
  return Math.max(getHeight(node.left) + 1, getHeight(node.right) + 1);
}
