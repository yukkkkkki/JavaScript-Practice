/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function (root, p, q) {
  if (!root) return null;
  // p 和 q 相等
  if (p.val === q.val) return q;
  // 不相等，则判断 p 和 q 在向左还是向右
  while (root) {
    if (root.val < q.val && root.val < p.val) {
      // p 和 q 都大于 root 时，去右子树找
      root = root.right;
    } else if (root.val > q.val && root.val > p.val) {
      // p 和 q 都小于 root 时，去左子树找
      root = root.left;
    } else {
      return root;
    }
  }
};
