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
// 方法一：广度优先搜索 BFS
var rightSideView = function (root) {
  let rightmostValueAtDepth = new Map();
  let max_depth = -1;

  const nodeStack = new Array();
  const depthStack = new Array();
  nodeStack.push(root);
  depthStack.push(0);

  while (nodeStack.length) {
    let node = nodeStack.pop();
    let depth = depthStack.pop();

    if (node !== null) {
      max_depth = Math.max(max_depth, depth);
      if (!rightmostValueAtDepth.has(depth)) {
        rightmostValueAtDepth.set(depth, node.val);
      }

      nodeStack.push(node.left);
      nodeStack.push(node.right);
      depthStack.push(depth + 1);
      depthStack.push(depth + 1);
    }
  }

  const rightView = [];
  for (let depth = 0; depth <= max_depth; depth++) {
    rightView.push(rightmostValueAtDepth.get(depth));
  }
  return rightView;
};
// 时间复杂度 : O(n)
// 空间复杂度 : O(n)

// 方法二：深度优先搜索 DFS
var rightSideView = function (root) {
  const res = [];
  const dfs = (node, level) => {
    if (!node) return;
    res[level] = node.val;
    dfs(node.left, level + 1);
    dfs(node.right, level + 1);
  };
  dfs(root, 0);
  return res;
};
// 时间复杂度 : O(n)
// 空间复杂度 : O(n)
