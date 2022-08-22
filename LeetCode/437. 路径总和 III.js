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
 * @param {number} targetSum
 * @return {number}
 */
// 方法一：深度优先搜索 DFS
var pathSum = function (root, targetSum) {
  if (root === null) return 0;

  let res = rootSum(root, targetSum);
  res += pathSum(root.left, targetSum);
  res += pathSum(root.right, targetSum);
  return res;
};
// 以节点 root 为起点向下且满足路径总和为 targetSum 的路径数目
const rootSum = (root, targetSum) => {
  let res = 0;
  if (!root) return 0;

  const val = root.val;
  if (val === targetSum) res++;

  res += rootSum(root.left, targetSum - val);
  res += rootSum(root.right, targetSum - val);
  return res;
};
// 时间复杂度：O(n^2);
// 空间复杂度：O(n)

// 方法二：前缀和
var pathSum = function (root, targetSum) {
  const prefix = new Map();
  prefix.set(0, 1);
  return dfs(root, prefix, 0, targetSum);
};
const dfs = (root, prefix, curr, targetSum) => {
  if (!root) return 0;

  let res = 0;
  curr += root.val;

  res = prefix.get(curr - targetSum) || 0;
  prefix.set(curr, (prefix.get(curr) || 0) + 1);

  res += dfs(root.left, prefix, curr, targetSum);
  res += dfs(root.right, prefix, curr, targetSum);
  prefix.set(curr, (prefix.get(curr) || 0) - 1);

  return res;
};
// 时间复杂度：O(n);
// 空间复杂度：O(n)
