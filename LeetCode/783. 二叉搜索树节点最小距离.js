// 给定一个二叉搜索树的根节点 root，返回树中任意两节点的差的最小值。

// 示例：
// 输入: root = [4,2,6,1,3,null,null]
// 输出: 1
// 解释:
// 注意，root是树节点对象(TreeNode object)，而不是数组。

// 给定的树 [4,2,6,1,3,null,null] 可表示为下图:

//           4
//         /   \
//       2      6
//      / \
//     1   3

// 最小的差值是 1, 它是节点1和节点2的差值, 也是节点3和节点2的差值。

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
// pre变量保存前驱节点的值
var minDiffInBST = function (root) {
  let res = Number.MAX_SAFE_INTEGER;
  let pre = -1;

  const stack = [];
  while (stack.length || root) {
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
