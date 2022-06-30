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
 * @return {boolean}
 */
//  方法一：递归
// 解题思路
// sum —— 从根节点到叶子节点的路径上的节点值相加的目标和
// 递归。转为判断：左、右子树（root.left、root.right）能否找出满足和为 sum - root.val 的路径
// 每遍历一个节点，就让 sum 减去当前节点值，当遍历到叶子节点时，已经没有子节点了，如果 sum - 当前叶子节点值，变为 0 ，就是找到了从根节点到叶子节点的和为 sum 的路径，返回true
// 时间复杂度：O(n)，每个节点被遍历了一次
var hasPathSum = function (root, sum) {
  if (root == null) return false;
  if (root.left == null && root.right == null) {
    return sum - root.val == 0;
  }
  return (
    hasPathSum(root.left, sum - root.val) ||
    hasPathSum(root.right, sum - root.val)
  );
};
