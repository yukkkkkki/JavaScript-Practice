// 实现一个函数，检查一棵二叉树是否为二叉搜索树。

// 示例 1:
// 输入:
//     2
//    / \
//   1   3
// 输出: true

// 示例 2:
// 输入:
//     5
//    / \
//   1   4
//      / \
//     3   6
// 输出: false
// 解释: 输入为: [5,1,4,null,null,3,6]。
//      根节点的值为 5 ，但是其右子节点值为 4 。

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isValidBST = function (root) {
  if (!root) return true;
  const stack = [];
  let pre = Number.MIN_SAFE_INTEGER;
  while (stack.length || root) {
    // 左子节点们入栈
    while (root) {
      stack.push(root);
      root = root.left;
    }
    root = stack.pop(); // 直到左子节点没有左子节点，出栈
    if (pre >= root.val) return false; // 判断当前的值是否比pre大
    pre = root.val;
    root = root.right;
  }
  return true;
};
