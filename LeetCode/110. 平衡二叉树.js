/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
// 方法一：自顶向下的递归
// 类似于二叉树的前序遍历
var isBalanced = function (root) {
  if (!root) return true;
  else {
    // 首先计算左右子树的高度
    // 如果左右子树的高度差是否不超过 1，再分别递归地遍历左右子节点，并判断左子树和右子树是否平衡
    return (
      Math.abs(height(root.left) - height(root.right)) <= 1 &&
      isBalanced(root.left) &&
      isBalanced(root.right)
    );
  }
};
// 计算二叉树中的任意一个节点 node 的高度
var height = (node) => {
  if (node === null) return 0;
  else {
    return Math.max(height(node.left), height(node.right)) + 1;
  }
};
// 时间复杂度：O(n^2);
// 空间复杂度：O(n)

// 方法二：自底向上的递归
// 类似于后序遍历
// 对于当前遍历到的节点，先递归地判断其左右子树是否平衡，再判断以当前节点为根的子树是否平衡
var isBalanced = function (root) {
  return height(root) >= 0;
};
// 对于每个节点，函数 height 只会被调用一次
var height = function (node) {
  if (!node) return 0;

  let leftHeight = height(node.left);
  let rightHeight = height(node.right);
  if (
    leftHeight == -1 ||
    rightHeight == -1 ||
    Math.abs(leftHeight - rightHeight) > 1
  ) {
    // 子树不平衡
    return -1;
  } else {
    return Math.max(leftHeight, rightHeight) + 1;
  }
};
// 时间复杂度：O(n);
// 空间复杂度：O(n)
