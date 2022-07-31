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
// 方法一：深度优先搜索 DFS
var maxLevelSum = function (root) {
  const sum = [];

  const dfs = (node, level) => {
    if (level === sum.length) {
      sum.push(node.val);
    } else {
      sum.splice(level, 1, sum[level] + node.val);
    }

    node.left && dfs(node.left, level + 1);
    node.right && dfs(node.right, level + 1);
  };

  dfs(root, 0);
  let res = 0;
  for (let i = 0; i < sum.length; i++) {
    if (sum[i] > sum[res]) {
      res = i;
    }
  }
  return res + 1;
};
// 时间复杂度：O(n)
// 空间复杂度：O(n)

// 方法二：广度优先搜索 BFS
var maxLevelSum = function (root) {
  if (root === null) return 0;

  const queue = [root];

  let depth = 1; // 记录 BFS 走到的层数
  let res = 0;
  let maxSum = Number.MIN_SAFE_INTEGER;

  while (queue.length) {
    let size = queue.length;
    let curSum = 0;

    for (let i = 0; i < size; i++) {
      let node = queue.shift();
      curSum += node.val;

      node.left && queue.push(node.left);
      node.right && queue.push(node.right);
    }

    if (curSum > maxSum) {
      maxSum = curSum;
      res = depth;
    }
    depth++;
  }

  return res;
};
// 时间复杂度：O(n)
// 空间复杂度：O(n)
