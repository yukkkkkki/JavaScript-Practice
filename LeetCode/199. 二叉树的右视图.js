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
 * @return {number[]}
 */
// 层序遍历
var rightSideView = function (root) {
  if (!root) return [];

  const res = [];
  const queue = [root];

  while (queue.length) {
    const size = queue.length;
    const cur = [];

    for (let i = 0; i < size; i++) {
      const node = queue.shift();
      cur.push(node.val);

      node.left && queue.push(node.left);
      node.right && queue.push(node.right);
    }

    res.push(cur[size - 1]);
  }

  return res;
};
