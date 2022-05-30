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
 * @return {boolean}
 */
// 方法一：层序遍历 判断节点值
// 广度优先搜索
var isUnivalTree = function (root) {
  let queue = [root];

  while (queue.length) {
    let node = queue.shift();
    if (node.val !== root.val) return false;

    node.left && queue.push(node.left);
    node.right && queue.push(node.right);
  }

  return true;
};
