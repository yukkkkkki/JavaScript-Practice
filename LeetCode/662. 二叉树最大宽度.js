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
 * @return {number}
 */
// 方法一：广度优先搜索
var widthOfBinaryTree = function (root) {
  let res = 0;
  const queue = [[root, 0]];

  let left = 0; // 记录当前层最左边节点的计数值
  let right = 0; // 记录当前层最右边节点的计数值

  while (queue.length) {
    left = queue[0][1];
    const size = queue.length;

    for (let i = 0; i < size; i++) {
      const [node, index] = queue.shift();
      right = index;

      node.left && queue.push([node.left, 2 * (index - left)]);
      node.right && queue.push([node.right, 2 * (index - left) + 1]);
    }
    res = Math.max(res, right - left + 1);
  }

  return res;
};
// 时间复杂度：O(n)
// 空间复杂度：O(n)
