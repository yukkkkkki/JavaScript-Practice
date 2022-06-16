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
 * @param {number} key
 * @return {TreeNode}
 */
// 方法一：递归
// 二叉搜索树有以下性质：
// 左子树的所有节点（如果有）的值均小于当前节点的值；
// 右子树的所有节点（如果有）的值均大于当前节点的值；
// 左子树和右子树均为二叉搜索树。
var deleteNode = function (root, key) {
  if (!root) return null;

  // 值为 key 的节点可能存在于 root 的左子树中，需要递归地在 root.left 调用 deleteNode
  if (root.val > key) {
    root.left = deleteNode(root.left, key);
    return root;
  }

  // 值为 key 的节点可能存在于 root 的右子树中，需要递归地在 root.right 调用 deleteNode
  if (root.val < key) {
    root.right = deleteNode(root.right, key);
    return root;
  }

  // root 即为要删除的节点
  if (root.val === key) {
    // root 为叶子节点，没有子树 -> 直接将它删除，即返回空
    if (!root.left && !root.right) return null;

    // root 只有左子树，没有右子树 -> 将它的左子树作为新的子树，返回它的左子节点
    if (!root.right) return root.left;
    // root 只有右子树，没有左子树 -> 将它的右子树作为新的子树，返回它的右子节点
    if (!root.left) return root.right;

    // root 有左右子树
    // 将 root 的后继节点 successor 作为新的根节点替代 root，并将 successor 从 root 的右子树中删除
    let successor = root.right; // （比 root 大的最小节点，即它的右子树中的最小节点）
    while (successor.left) {
      successor = successor.left;
    }
    root.right = deleteNode(root.right, successor.val);
    successor.right = root.right;
    successor.left = root.left;
    return successor;
  }

  return root;
};
// 时间复杂度：O(n)
// 空间复杂度：O(n)
