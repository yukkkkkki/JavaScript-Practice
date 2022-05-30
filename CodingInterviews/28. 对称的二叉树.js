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
// 方法一：递归
var isSymmetric = function (root) {
  if (!root) return null;

  var help = function (left, right) {
    if (!left && !right) return true;
    if (!left || !right) return false;
    return (
      left.val === right.val &&
      help(left.left, right.right) &&
      help(left.right, right.left)
    );
  };

  return help(root.left, root.right);
};

// 方法二：BFS法
var isSymmetric = function (root) {
  let queue = [root, root];

  while (queue.length) {
    let size = queue.length;

    // 一次循环出列两个，所以每次+2
    for (let i = 0; i < size; i += 2) {
      // 左右子树分别出列
      let left = queue.shift();
      let right = queue.shift();

      // 不满足对称
      if ((left && !right) || (!left && right)) return false;

      if (left && right) {
        if (left.val !== right.val) return false;
        queue.push(left.left, right.right);
        queue.push(left.right, right.left);
      }
    }
  }

  return true;
};
