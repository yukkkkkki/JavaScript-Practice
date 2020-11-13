// 给定一个二叉树，在树的最后一行找到最左边的值。

// 示例 1:
// 输入:
//     2
//    / \
//   1   3
// 输出:
// 1

// 示例 2:
// 输入:
//         1
//        / \
//       2   3
//      /   / \
//     4   5   6
//        /
//       7
// 输出:
// 7

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
// 方法一：广度优先遍历 BFS
var findBottomLeftValue = function (root) {
  if (!root) return 0;
  const queue = [root];
  let leftVal = root.val;

  while (queue.length) {
    let count = queue.length;
    leftVal = queue[0].val;
    for (let i = 0; i < count; i++) {
      let node = queue.shift();
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }
  return leftVal;
};
