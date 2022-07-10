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
// 方法一：BFS 广度优先搜索
var largestValues = function (root) {
  if (!root) return [];

  const res = [];
  const queue = [root];
  while (queue.length) {
    const size = queue.length;
    let max = -Number.MAX_VALUE;
    for (let i = 0; i < size; i++) {
      let node = queue.shift();
      max = Math.max(node.val, max);
      node.left && queue.push(node.left);
      node.right && queue.push(node.right);
    }
    res.push(max);
  }

  return res;
};
// 时间复杂度：O(n)
// 空间复杂度：O(n)

// 方法二：DFS 深度优先搜索
var largestValues = function (root) {
  if (!root) return [];

  const res = [];
  const dfs = (res, root, curHeight) => {
    if (curHeight === res.length) {
      res.push(root.val);
    } else {
      res.splice(curHeight, 1, Math.max(res[curHeight], root.val));
    }

    root.left && dfs(res, root.left, curHeight + 1);
    root.right && dfs(res, root.right, curHeight + 1);
  };

  dfs(res, root, 0);
  return res;
};
// 时间复杂度：O(n)
// 空间复杂度：O(height)
