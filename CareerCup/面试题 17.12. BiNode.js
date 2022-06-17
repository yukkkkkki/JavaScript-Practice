/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
// 方法一：中序遍历
// 二叉搜索树的中序遍历，可以得到升序的结果
// 在进行中序遍历的时候，记录一下前一个结点，然后让前一个节点的右指针指向当前节点，即可连成链表
var convertBiNode = function (root) {
  let dummy = new TreeNode(-1);
  let pre = dummy;

  // 中序遍历：左根右
  const dfs = (node) => {
    if (!node) return null;
    dfs(node.left);

    // 置空左指针
    node.left = null;
    // 上一个节点的右节点指向当前节点
    pre.right = node;

    // 更新 pre 节点
    pre = node;
    dfs(node.right);
  };

  dfs(root);
  return dummy.right;
};
