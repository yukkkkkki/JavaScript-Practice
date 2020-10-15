// 给你一棵所有节点为非负值的二叉搜索树，请你计算树中任意两节点的差的绝对值的最小值。

// 示例：
// 输入：

//    1
//     \
//      3
//     /
//    2

// 输出：
// 1
// 解释：
// 最小绝对差为 1，其中 2 和 1 的差的绝对值为 1（或者 2 和 3）。

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */

// 方法一：中序遍历
// 思路：
// 在中序遍历的过程中用pre变量保存前驱节点的值
var getMinimumDifference = function (root) {
  let res = Number.MAX_SAFE_INTEGER,
    pre = -1;

  const stack = [];
  while (root || stack.length) {
    while (root) {
      stack.push(root);
      root = root.left;
    }
    root = stack.pop();
    if (pre == -1) {
      pre = root.val;
    } else {
      res = Math.min(res, root.val - pre);
      pre = root.val;
    }
    root = root.right;
  }
  return res;
};
