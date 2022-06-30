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
var largestValues = function (root) {
  if (root === null) return [];

  const res = [];
  const queue = [root];
  while (queue.length) {
    const levelSize = queue.length;
    let max = -Number.MAX_VALUE;

    for (let i = 0; i < levelSize; i++) {
      let node = queue.shift();
      max = Math.max(max, node.val);

      node.left && queue.push(node.left);
      node.right && queue.push(node.right);
    }

    res.push(max);
  }

  return res;
};
// 时间复杂度：O(n)
// 空间复杂度：O(n)

let root = [1, 3, 2, 5, 3, null, 9];

console.log(largestValues(root));
