// 给定一个非空二叉树，返回其最大路径和。

// 本题中，路径被定义为一条从树中任意节点出发，达到任意节点的序列。该路径至少包含一个节点，且不一定经过根节点。

// 示例 1:
// 输入: [1,2,3]
//        1
//       / \
//      2   3
// 输出: 6

// 示例 2:
// 输入: [-10,9,20,null,null,15,7]
//    -10
//    / \
//   9  20
//     /  \
//    15   7
// 输出: 42
var maxPathSum = function (root) {
  // 纪录保持者
  let maxSum = Number.MAX_SAFE_INTEGER;

  const dfs = (root) => {
    if (root == null) return 0; // 递归的出口
    let left = Math.max(0, dfs(root.left));
    let right = Math.max(0, dfs(root.right));
    //当前子树的maxSum挑战最大值
    maxSum = Math.max(maxSum, left + root.val + right);
    // 向父节点提供的最大和，要包括自己
    return root.val + Math.max(left, right);
  };
  dfs(root);
  return maxSum;
};
