// 给定一个 N 叉树，返回其节点值的后序遍历。

// 例如，给定一个 3叉树 :

// 返回其后序遍历: [5,6,3,2,4,1].

/**
 * // Definition for a Node.
 * function Node(val,children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * @param {Node} root
 * @return {number[]}
 */
// 方法一：迭代 栈方法
var postorder = function (root) {
  const res = [];
  if (!root) return res;

  const stack = [root];
  while (stack.length) {
    let node = stack.pop();
    if (node) res.unshift(node.val);
    if (node.children) {
      for (item of node.children) {
        stack.push(item);
      }
    }
  }
  return res;
};
