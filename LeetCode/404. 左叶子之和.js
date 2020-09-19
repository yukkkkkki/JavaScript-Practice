// 计算给定二叉树的所有左叶子之和。

// 示例：

//     3
//    / \
//   9  20
//     /  \
//    15   7

// 在这个二叉树中，有两个左叶子，分别是 9 和 15，所以返回 24
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
// 方法一：DFS回溯
var sumOfLeftLeaves = function (root) {
  if (root == null) return 0;
  let sum = 0;

  const backTrack = (root, isLeft) => {
    if (root.left == null && root.right == null) {
      if (isLeft) sum += root.val;
      return;
    }
    if (root.left) backTrack(root.left, true);
    if (root.right) backTrack(root.right, false);
  };

  backTrack(root, false);
  return sum;
};

// 方法二：BFS
// 维护一个队列去遍历节点。
// 首先判断root是否存在，再把它入列。
// 让节点出列，出列就会把它们的左右子节点入列，不同的是，左子节点如果是左叶子节点，则它的节点值要累加给sum。
// 当队列为空，就遍历完所有节点，sum也累加好了。
var sumOfLeftLeaves = function (root) {
  if (!root) return 0;
  let sum = 0;
  const queue = [];
  queue.push(root);

  while (queue.length) {
    const cur = queue.shift();
    if (cur.left) {
      if (cur.left.left == null && cur.left.right == null) {
        sum += cur.left.val;
      }
      queue.push(cur.left);
    }
    if (cur.right) {
      queue.push(cur.right);
    }
  }
  return sum;
};
