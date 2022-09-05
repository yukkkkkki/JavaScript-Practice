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
 * @param {number} val
 * @return {TreeNode}
 */
// 方法一：遍历右子节点
var insertIntoMaxTree = function (root, val) {
  let parent = null;
  let cur = root;

  while (cur) {
    if (val > cur.val) {
      if (!parent) {
        // 当 val < root.val，新树以 val 作为根节点，并将原来的树作为新的根节点的左子树
        return new TreeNode(val, root, null);
      }

      // 当 cur.val < val，可以停止遍历
      // 构造一个新的节点，以 val 为值且以 cur 为左子树
      let node = new TreeNode(val, cur, null);
      parent.right = node;
      return root;
    } else {
      // 新的树会以 val 作为根节点，并将原来的树作为新的根节点的左子树
      parent = cur;
      cur = cur.right;
    }
  }

  parent.right = new TreeNode(val);
  return root;
};
// 时间复杂度：O(n)
// 空间复杂度：O(1)
