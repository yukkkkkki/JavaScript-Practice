/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
// 方法一：广度优先遍历
var levelOrder = function (root) {
  if (!root) return [];

  const ans = [];
  const nodeQueue = [root];

  let isOrderLeft = true;

  while (nodeQueue.length) {
    let levelList = [];
    const size = nodeQueue.length;

    for (let i = 0; i < size; ++i) {
      const node = nodeQueue.shift();
      // 奇数层从左往右，偶数层从右往左
      isOrderLeft ? levelList.push(node.val) : levelList.unshift(node.val);

      node.left && nodeQueue.push(node.left);
      node.right && nodeQueue.push(node.right);
    }
    ans.push(levelList);
    isOrderLeft = !isOrderLeft;
  }

  return ans;
};
