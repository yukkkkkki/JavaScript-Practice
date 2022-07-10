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
// 方法一：BFS
var findBottomLeftValue = function (root) {
  if (!root) return null;

  let res = null;
  const queue = [root];
  while (queue.length) {
    const p = queue.shift();
    p.right && queue.push(p.right);
    p.left && queue.push(p.left);
    res = p.val;
  }

  return res;
};
// 时间复杂度：O(n)
// 空间复杂度：O(n)

// 方法一：DFS
var findBottomLeftValue = function (root) {
  const dfs = (root, height) => {
    if (!root) return;

    height++;
    dfs(root.left, height);
    dfs(root.right, height);
    if (height > curHeight) {
      curHeight = height;
      curVal = root.val;
    }
  };

  let curHeight = 0;
  dfs(root, 0);
  return curVal;
};
// 时间复杂度：O(n)
// 空间复杂度：O(n)
