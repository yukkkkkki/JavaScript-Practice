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
// 在中序遍历的过程中维护上一个访问的节点和当前访问的节点
// 如果上一个访问的节点是节点 p，则当前访问的节点即为节点 p 的中序后继
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
    if (prev === p) return curr;
    prev = curr;
    curr = curr.right;
  }

  return null;
};
// 时间复杂度：O(n)
// 空间复杂度：O(n)

// 方法二：利用二叉搜索树的性质
// 如果节点 p 的右子树不为空，则节点 p 的中序后继在其右子树中，在其右子树中定位到最左边的节点，即为节点 p 的中序后继
// 如果节点 p 的右子树为空，则需要从根节点开始遍历寻找节点 p 的祖先节点。
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
