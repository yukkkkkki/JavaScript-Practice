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
 * @return {TreeNode}
 */
// 方法一：中序遍历
// 不需要维护完整的中序遍历序列，只需要在中序遍历的过程中维护上一个访问的节点和当前访问的节点
// 如果上一个访问的节点是节点 p，则当前访问的节点即为节点 p 的后继节点
var inorderSuccessor = function (root, p) {
  const stack = [];
  let prev = null;
  let curr = root;

  while (stack.length || curr) {
    while (curr) {
      stack.push(curr);
      curr = curr.left;
    }

    curr = stack.pop();
    if (prev === p) {
      return curr;
    }
    prev = curr;
    curr = curr.right;
  }
  return null;
};
// 时间复杂度：O(n)
// 空间复杂度：O(n)

// 方法一：利用二叉搜索树的性质
// 二叉搜索树的一个性质是中序遍历序列单调递增，因此二叉搜索树中的节点 p 的后继节点满足以下条件：
// 后继节点的节点值大于 p 的节点值；
// 后继节点是节点值大于 p 的节点值的所有节点中节点值最小的一个节点。
var inorderSuccessor = function (root, p) {
  let successor = null;
  if (p.right) {
    successor = p.right;
    while (successor.left) {
      successor = successor.left;
    }
    return successor;
  }

  let node = root;
  while (node) {
    if (node.val > p.val) {
      successor = node;
      node = node.left;
    } else {
      node = node.right;
    }
  }
  return successor;
};
// 时间复杂度：O(n)
// 空间复杂度：O(1)
