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
// 方法一：递归
var lowestCommonAncestor = function (root, p, q) {
  let res;

  const dfs = (root, p, q) => {
    if (!root) return false;

    const lson = dfs(root.left, p, q);
    const rson = dfs(root.right, p, q);

    // 符合条件的最近公共祖先 root 一定满足如下条件
    // 左子树和右子树均包含 p 节点或 q 节点，如果左子树包含的是 p 节点，那么右子树只能包含 q 节点，反之亦然
    // x 恰好是 p 节点或 q 节点，且它的左子树或右子树有一个包含了另一个节点的情况
    if (
      (lson && rson) ||
      ((root.val === p.val || root.val === q.val) && (lson || rson))
    ) {
      res = root;
    }
    return lson || rson || root.val === p.val || root.val === q.val;
  };

  dfs(root, p, q);
};
// 时间复杂度：O(N)
// 空间复杂度：O(N)

// 方法二：
var lowestCommonAncestor = function (root, p, q) {
  if (!root || p.val === root.val || q.val === root.val) return root;

  let lson = lowestCommonAncestor(root.left, p, q);
  let rson = lowestCommonAncestor(root.right, p, q);

  // l、r 非空时，说明 p、q 分居 root 的两侧，root 就是 LCA
  // l、r 任一为空，说明 LCA 位于另一子树或其祖先中
  return lson == null ? rson : rson == null ? lson : root;
};
