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
var invertTree = function (root) {
  if (!root) return null;

  // 交换
  let temp = root.left;
  root.left = root.right;
  root.right = temp;

  // 递归处理左右子树
  invertTree(root.left);
  invertTree(root.right);

  return root;
};

// 方法二：层序遍历 + 左右交换
var invertTree = function (root) {
  if (!root) return null;
  let queue = [root];

  while (queue.length) {
    let node = queue.pop();

    let temp = node.left;
    node.left = node.right;
    node.right = temp;

    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }

  return root;
};
