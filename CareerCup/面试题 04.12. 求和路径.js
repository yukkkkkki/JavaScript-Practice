// 给定一棵二叉树，其中每个节点都含有一个整数数值(该值或正或负)。设计一个算法，打印节点数值总和等于某个给定值的所有路径的数量。注意，路径不一定非得从二叉树的根节点或叶节点开始或结束，但是其方向必须向下(只能从父节点指向子节点方向)。

// 示例:
// 给定如下二叉树，以及目标和 sum = 22，

//               5
//              / \
//             4   8
//            /   / \
//           11  13  4
//          /  \    / \
//         7    2  5   1

// 返回:
// 3
// 解释：和为 22 的路径有：[5,4,11,2], [5,8,4,5], [4,11,7]
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} sum
 * @return {number}
 */
// 方法一：回溯
var pathSum = function (root, sum) {
  if (!root) return root;
  let res = 0;

  const backTrack = (node, curSum) => {
    if (!node) return;
    if (curSum === sum) {
      res++;
    }
    if (node.left) {
      backTrack(node.left, curSum + node.left.val);
    }
    if (node.right) {
      backTrack(node.right, curSum + node.right.val);
    }
  };

  const bst = (node) => {
    if (!node) return;
    bst(node.left);
    bst(node.right);
    backTrack(node, node.val);
  };

  bst(root, res);
  return res;
};
