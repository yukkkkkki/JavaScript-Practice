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
    const levelSize = queue.length;
    const cur = [];

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      cur.push(node.val);

      node.left && queue.push(node.left);
      node.right && queue.push(node.right);
    }

    res.push(cur[levelSize - 1]);
  }

  return res;
};
