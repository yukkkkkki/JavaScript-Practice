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
var pathSum = function (root, targetSum) {
  if (!root) return 0;

  let res = rootSum(root, targetSum);
  res += pathSum(root.left, targetSum);
  res += pathSum(root.right, targetSum);

  return res;
};

// 计算以节点 root 为起点向下且满足路径总和为 targetSum 的路径数目
const rootSum = (root, targetSum) => {
  let res = 0;

  if (!root) return 0;
  const val = root.val;
  if (val === targetSum) res++;

  res += rootSum(root.left, targetSum - val);
  res += rootSum(root.right, targetSum - val);
  return res;
};
// 时间复杂度：O(n^2)
// 空间复杂度：O(n)
