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
 * @return {TreeNode}
 */
// 方法一：递归
var pruneTree = function (root) {
  // 判断以 node 为根的子树中是否包含 1
  const containsOne = (node) => {
    if (!node) return false;
    let a1 = containsOne(node.left);
    let a2 = containsOne(node.right);
    // 左右孩子为根的子树不包含 1，那我们就需要把对应的指针置为空
    if (!a1) node.left = null;
    if (!a2) node.right = null;
    return node.val === 1 || a1 || a2;
  };
  // 递归结束之后，如果整颗二叉树都不包含 1，那么我们返回 null，否则我们返回原来的根节点
  return containsOne(root) ? root : null;
};
// 时间复杂度 : O(n)
// 空间复杂度 : O(H)
