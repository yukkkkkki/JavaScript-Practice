/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
// 方法一：
var lowestCommonAncestor = function (root, p, q) {
  if (!root) return null;
  // p 和 q 相等,则直接返回 p || q
  if (p.val === q.val) return q;

  // 若不相等，则判断 p 和 q 在向左还是向右
  while (root) {
    // 若 p 和 q 都小于root， 则 root = root.left
    if (root.val < q.val && root.val < p.val) {
      root = root.right;
    } else if (root.val > q.val && root.val > p.val) {
      // 若 p 和 q 都大于root， 则 root = root.right
      root = root.left;
    } else {
      // 如果 p 和 q 对下一步的路线出现了分歧，说明 p 和 q 在当前的节点上就要分道扬镳了
      // 当前的 root 是临别前一起走的最后一站
      return root;
    }
  }
};
