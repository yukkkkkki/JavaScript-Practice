// 输入一棵二叉树的根节点，求该树的深度。从根节点到叶节点依次经过的节点（含根、叶节点）形成树的一条路径，最长路径的长度为树的深度。

// 例如：
// 给定二叉树 [3,9,20,null,null,15,7]，
//     3
//    / \
//   9  20
//     /  \
//    15   7
// 返回它的最大深度 3 。

// 方法一
var maxDepth = function (root) {
  if (!root) return 0;
  return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
};

// 方法二
var maxDepth = function (root) {
  if (!root) return 0;
  else {
    let leftDepth = maxDepth(root.left),
      rightDepth = maxDepth(root.right);
    let childDepth = leftDepth > rightDepth ? leftDepth : rightDepth;
    return childDepth + 1;
  }
};
